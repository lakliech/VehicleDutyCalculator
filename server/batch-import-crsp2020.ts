import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { db } from "./db";
import { vehicleReferences } from "@shared/schema";
import { eq, and } from "drizzle-orm";

interface CRSP2020Record {
  make: string;
  model: string;
  engineCapacity: number;
  bodyType: string;
  driveConfiguration: string;
  seating: string;
  fuel: string;
  gvw: string;
  crsp2020: number;
}

async function batchImportCRSP2020() {
  console.log("Starting optimized CRSP 2020 batch import...");
  
  const records: CRSP2020Record[] = [];
  
  try {
    const stream = createReadStream("attached_assets/crsp2020_1751896282356.csv");
    
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    });

    for await (const record of stream.pipe(parser)) {
      // Parse the CRSP value
      const crspString = record["CRSP(KES)"] || record["CRSP(KES) "];
      let crspValue = 0;
      
      if (crspString && crspString.trim() !== '') {
        const cleanCrsp = crspString.replace(/[",\s]/g, '');
        crspValue = parseFloat(cleanCrsp);
        
        if (isNaN(crspValue)) {
          crspValue = 0;
        }
      }

      // Parse engine capacity
      let engineCapacity = 0;
      const engineString = record["Engine Capacity"];
      if (engineString && engineString.trim() !== '') {
        engineCapacity = parseInt(engineString);
        if (isNaN(engineCapacity)) {
          engineCapacity = 0;
        }
      }

      const recordData: CRSP2020Record = {
        make: record.MAKE?.trim() || '',
        model: record.MODEL?.trim() || '',
        engineCapacity: engineCapacity,
        bodyType: record["Body Type "]?.trim() || '',
        driveConfiguration: record["Drive configuration"]?.trim() || '',
        seating: record.seating?.trim() || '',
        fuel: record.Fuel?.toLowerCase()?.trim() || '',
        gvw: record.GVW?.trim() || '',
        crsp2020: crspValue
      };

      if (recordData.make && recordData.model && recordData.crsp2020 > 0) {
        records.push(recordData);
      }
    }

    console.log(`Parsed ${records.length} valid records from CSV`);

    let addedCount = 0;
    let updatedCount = 0;
    const batchSize = 50;

    // Process records in batches
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      
      for (const record of batch) {
        try {
          // Try to find existing vehicle
          const existingVehicles = await db
            .select()
            .from(vehicleReferences)
            .where(
              and(
                eq(vehicleReferences.make, record.make),
                eq(vehicleReferences.model, record.model),
                eq(vehicleReferences.engineCapacity, record.engineCapacity)
              )
            );

          if (existingVehicles.length > 0) {
            // Update existing vehicle with CRSP 2020 data
            const existingVehicle = existingVehicles[0];
            await db
              .update(vehicleReferences)
              .set({
                crsp2020: record.crsp2020,
                bodyType: existingVehicle.bodyType || record.bodyType || null,
                driveConfiguration: existingVehicle.driveConfiguration || record.driveConfiguration || null,
                seating: existingVehicle.seating || record.seating || null,
                fuelType: existingVehicle.fuelType || record.fuel || null,
                gvw: existingVehicle.gvw || record.gvw || null,
              })
              .where(eq(vehicleReferences.id, existingVehicle.id));
            
            updatedCount++;
          } else {
            // Insert new vehicle
            await db
              .insert(vehicleReferences)
              .values({
                make: record.make,
                model: record.model,
                engineCapacity: record.engineCapacity,
                bodyType: record.bodyType || null,
                driveConfiguration: record.driveConfiguration || null,
                seating: record.seating || null,
                fuelType: record.fuel || null,
                gvw: record.gvw || null,
                crsp2020: record.crsp2020,
                crspKes: null,
                discontinuationYear: null,
              });
            
            addedCount++;
          }
        } catch (error) {
          console.error(`Error processing ${record.make} ${record.model}:`, error);
        }
      }

      // Log progress every batch
      const processed = i + batch.length;
      console.log(`Processed ${processed}/${records.length} records (${Math.round(processed/records.length*100)}%) - Added: ${addedCount}, Updated: ${updatedCount}`);
    }

    console.log(`\nImport completed successfully!`);
    console.log(`Total processed: ${records.length}`);
    console.log(`New vehicles added: ${addedCount}`);
    console.log(`Existing vehicles updated: ${updatedCount}`);

    // Final count check
    const finalCount = await db
      .select({ count: vehicleReferences.id })
      .from(vehicleReferences)
      .where(eq(vehicleReferences.crsp2020, null));
    
    const totalWithCrsp2020 = await db
      .select({ count: vehicleReferences.id })
      .from(vehicleReferences);

    console.log(`\nDatabase status after import:`);
    console.log(`Total vehicles: ${totalWithCrsp2020.length}`);
    console.log(`Vehicles with CRSP 2020 values: ${totalWithCrsp2020.length - finalCount.length}`);

  } catch (error) {
    console.error("Import failed:", error);
    throw error;
  }
}

// Run the import
batchImportCRSP2020()
  .then(() => {
    console.log("CRSP 2020 import completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("CRSP 2020 import failed:", error);
    process.exit(1);
  });