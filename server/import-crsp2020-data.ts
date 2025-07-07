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

async function importCRSP2020Data() {
  console.log("Starting CRSP 2020 data import...");
  
  const records: CRSP2020Record[] = [];
  
  try {
    const stream = createReadStream("attached_assets/crsp2020_1751896282356.csv");
    
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true, // Handle BOM character
    });

    for await (const record of stream.pipe(parser)) {
      // Debug: log the first few records to understand structure
      if (records.length < 3) {
        console.log("Record keys:", Object.keys(record));
        console.log("Sample record:", record);
      }

      // Parse the CRSP value - remove commas and quotes
      const crspString = record["CRSP(KES)"] || record["CRSP(KES) "];
      let crspValue = 0;
      
      if (crspString && crspString.trim() !== '') {
        // Remove quotes, commas, and spaces, then parse as float
        const cleanCrsp = crspString.replace(/[",\s]/g, '');
        crspValue = parseFloat(cleanCrsp);
        
        if (isNaN(crspValue)) {
          console.warn(`Invalid CRSP value for ${record.MAKE} ${record.MODEL}: ${crspString}`);
          crspValue = 0;
        }
      }

      // Parse engine capacity
      let engineCapacity = 0;
      const engineString = record["Engine Capacity"];
      if (engineString && engineString.trim() !== '') {
        engineCapacity = parseInt(engineString);
        if (isNaN(engineCapacity)) {
          console.warn(`Invalid engine capacity for ${record.MAKE} ${record.MODEL}: ${engineString}`);
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

    for (const record of records) {
      try {
        // Try to find existing vehicle by make, model, and engine capacity
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
              // Update other fields if they're missing or empty
              bodyType: existingVehicle.bodyType || record.bodyType || null,
              driveConfiguration: existingVehicle.driveConfiguration || record.driveConfiguration || null,
              seating: existingVehicle.seating || record.seating || null,
              fuelType: existingVehicle.fuelType || record.fuel || null,
              gvw: existingVehicle.gvw || record.gvw || null,
            })
            .where(eq(vehicleReferences.id, existingVehicle.id));
          
          updatedCount++;
          console.log(`Updated ${record.make} ${record.model} ${record.engineCapacity}cc with CRSP 2020: ${record.crsp2020.toLocaleString()}`);
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
              // No current CRSP value for new vehicles from 2020 data
              crspKes: null,
              discontinuationYear: null,
            });
          
          addedCount++;
          console.log(`Added new vehicle: ${record.make} ${record.model} ${record.engineCapacity}cc with CRSP 2020: ${record.crsp2020.toLocaleString()}`);
        }

        // Log progress every 100 records
        if ((addedCount + updatedCount) % 100 === 0) {
          console.log(`Processed ${addedCount + updatedCount} records, added ${addedCount} new vehicles, updated ${updatedCount} vehicles`);
        }
      } catch (error) {
        console.error(`Error processing ${record.make} ${record.model}:`, error);
      }
    }

    console.log(`CRSP 2020 import completed successfully!`);
    console.log(`Total processed: ${addedCount + updatedCount} vehicles`);
    console.log(`New vehicles added: ${addedCount}`);
    console.log(`Existing vehicles updated: ${updatedCount}`);

  } catch (error) {
    console.error("Failed to import CRSP 2020 data:", error);
  }
}

// Run the import if this file is executed directly
importCRSP2020Data()
  .then(() => {
    console.log("Import process finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Import process failed:", error);
    process.exit(1);
  });

export { importCRSP2020Data };