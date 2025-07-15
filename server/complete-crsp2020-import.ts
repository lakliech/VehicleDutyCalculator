import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { db } from "./db";
import { vehicleReferences } from "@shared/schema";
import { eq, and } from "drizzle-orm";

async function completeCRSP2020Import() {
  console.log("Completing CRSP 2020 import by adding missing vehicles...");
  
  const records: any[] = [];
  
  try {
    const stream = createReadStream("attached_assets/crsp2020_1751896282356.csv");
    
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    });

    // Parse CSV data
    for await (const record of stream.pipe(parser)) {
      const crspString = record["CRSP(KES)"] || record["CRSP(KES) "];
      let crspValue = 0;
      
      if (crspString && crspString.trim() !== '') {
        const cleanCrsp = crspString.replace(/[",\s]/g, '');
        crspValue = parseFloat(cleanCrsp);
        
        if (isNaN(crspValue)) {
          crspValue = 0;
        }
      }

      let engineCapacity = 0;
      const engineString = record["Engine Capacity"];
      if (engineString && engineString.trim() !== '') {
        engineCapacity = parseInt(engineString);
        if (isNaN(engineCapacity)) {
          engineCapacity = 0;
        }
      }

      const recordData = {
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
    let existingCount = 0;

    // Process each record to find missing vehicles
    for (const record of records) {
      try {
        // Check if vehicle exists
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

        if (existingVehicles.length === 0) {
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
          console.log(`Added new vehicle: ${record.make} ${record.model} ${record.engineCapacity}cc`);
        } else {
          existingCount++;
        }

        // Log progress every 100 records
        if ((addedCount + existingCount) % 100 === 0) {
          const processed = addedCount + existingCount;
          console.log(`Processed ${processed}/${records.length} records (${Math.round(processed/records.length*100)}%) - Added: ${addedCount}, Existing: ${existingCount}`);
        }

      } catch (error) {
        console.error(`Error processing ${record.make} ${record.model}:`, error);
      }
    }

    // Get final statistics
    const totalVehicles = await db.select().from(vehicleReferences);
    const withCrsp2020 = await db.select().from(vehicleReferences).where(eq(vehicleReferences.crsp2020, null));

    console.log(`\nImport completed successfully!`);
    console.log(`New vehicles added: ${addedCount}`);
    console.log(`Existing vehicles found: ${existingCount}`);
    console.log(`Total vehicles in database: ${totalVehicles.length}`);
    console.log(`Vehicles with CRSP 2020 values: ${totalVehicles.length - withCrsp2020.length}`);
    console.log(`CRSP 2020 coverage: ${Math.round(((totalVehicles.length - withCrsp2020.length) / totalVehicles.length) * 100)}%`);

  } catch (error) {
    console.error("Import failed:", error);
    throw error;
  }
}

// Run the import
completeCRSP2020Import()
  .then(() => {
    console.log("CRSP 2020 import completion successful");
    process.exit(0);
  })
  .catch((error) => {
    console.error("CRSP 2020 import completion failed:", error);
    process.exit(1);
  });