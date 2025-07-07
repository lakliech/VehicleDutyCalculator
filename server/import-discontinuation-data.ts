import { db } from "./db";
import { vehicleReferences } from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { readFileSync } from "fs";
import { join } from "path";

interface DiscontinuationRecord {
  make: string;
  model: string;
  engineCapacity: number;
  bodyType: string;
  driveConfiguration: string;
  seating: string;
  fuel: string;
  discontinuationYear: string;
}

async function importDiscontinuationData() {
  try {
    console.log("Starting discontinuation data import...");
    
    // Read the CSV file
    const csvPath = join(process.cwd(), "attached_assets", "disco_1751891513891.csv");
    const csvContent = readFileSync(csvPath, "utf-8");
    
    // Parse CSV lines
    const lines = csvContent.split("\n");
    const headers = lines[0].split(",");
    console.log("Headers:", headers);
    
    let processedCount = 0;
    let updatedCount = 0;
    let errors = 0;
    
    for (let i = 2; i < lines.length; i++) { // Skip header and empty first line
      const line = lines[i].trim();
      if (!line) continue;
      
      try {
        const values = line.split(",");
        if (values.length < 8) continue;
        
        const record: DiscontinuationRecord = {
          make: values[0]?.trim() || "",
          model: values[1]?.trim() || "",
          engineCapacity: parseInt(values[2]?.trim()) || 0,
          bodyType: values[3]?.trim() || "",
          driveConfiguration: values[4]?.trim() || "",
          seating: values[5]?.trim() || "",
          fuel: values[6]?.trim()?.toLowerCase() || "",
          discontinuationYear: values[7]?.trim() || ""
        };
        
        // Skip if no make or model
        if (!record.make || !record.model) continue;
        
        // Parse discontinuation year - treat "unknown" and empty as null
        let discontinuationYear: number | null = null;
        if (record.discontinuationYear && 
            record.discontinuationYear.toLowerCase() !== "unknown" && 
            record.discontinuationYear !== "") {
          const year = parseInt(record.discontinuationYear);
          if (!isNaN(year) && year > 1900 && year <= new Date().getFullYear()) {
            discontinuationYear = year;
          }
        }
        
        // Find matching vehicle in database
        const existingVehicles = await db
          .select()
          .from(vehicleReferences)
          .where(
            and(
              sql`UPPER(${vehicleReferences.make}) = UPPER(${record.make})`,
              sql`UPPER(${vehicleReferences.model}) = UPPER(${record.model})`
            )
          );
        
        if (existingVehicles.length > 0) {
          // Update all matching vehicles with discontinuation year
          for (const vehicle of existingVehicles) {
            await db
              .update(vehicleReferences)
              .set({ discontinuationYear })
              .where(eq(vehicleReferences.id, vehicle.id));
            
            updatedCount++;
            console.log(`Updated ${record.make} ${record.model} with discontinuation year: ${discontinuationYear || 'null'}`);
          }
        } else {
          console.log(`No match found for: ${record.make} ${record.model}`);
        }
        
        processedCount++;
        
        // Progress update every 100 records
        if (processedCount % 100 === 0) {
          console.log(`Processed ${processedCount} records, updated ${updatedCount} vehicles`);
        }
        
      } catch (error) {
        console.error(`Error processing line ${i}:`, error);
        errors++;
      }
    }
    
    console.log("\nImport completed!");
    console.log(`Total records processed: ${processedCount}`);
    console.log(`Vehicles updated: ${updatedCount}`);
    console.log(`Errors: ${errors}`);
    
  } catch (error) {
    console.error("Failed to import discontinuation data:", error);
  }
}

// Run the import if this file is executed directly
importDiscontinuationData()
  .then(() => {
    console.log("Import process finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Import process failed:", error);
    process.exit(1);
  });

export { importDiscontinuationData };