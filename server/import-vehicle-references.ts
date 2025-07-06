import { db } from "./db";
import { vehicleReferences } from "@shared/schema";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { fileURLToPath } from "url";

async function importVehicleReferences() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const csvPath = path.join(__dirname, "../attached_assets/CRSP_1751827963022.csv");
  
  if (!fs.existsSync(csvPath)) {
    console.error("CSV file not found at:", csvPath);
    return;
  }

  const records: any[] = [];
  const parser = fs
    .createReadStream(csvPath)
    .pipe(parse({
      columns: false,
      skip_empty_lines: true,
      from_line: 4, // Skip the header rows
      trim: true,
    }));

  parser.on("data", (row) => {
    // Check if it's not an empty row
    if (row[0] && row[0].trim() !== "") {
      const crspValue = row[8] ? row[8].replace(/,/g, "").replace(/"/g, "") : null;
      
      const record = {
        make: row[0]?.trim() || "",
        model: row[1]?.trim() || "",
        engineCapacity: row[2] ? parseInt(row[2]) : null,
        bodyType: row[3]?.trim() || null,
        driveConfiguration: row[4]?.trim() || null,
        seating: row[5]?.trim() || null,
        fuelType: row[6]?.trim() || null,
        gvw: row[7]?.trim() || null,
        crspKes: crspValue ? parseFloat(crspValue) : null,
      };

      // Only add if we have valid make and model
      if (record.make && record.model) {
        records.push(record);
      }
    }
  });

  parser.on("end", async () => {
    console.log(`Parsed ${records.length} vehicle records`);
    
    try {
      // Insert in batches to avoid overwhelming the database
      const batchSize = 100;
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        await db.insert(vehicleReferences).values(batch);
        console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(records.length / batchSize)}`);
      }
      
      console.log("Import completed successfully!");
      process.exit(0);
    } catch (error) {
      console.error("Error importing data:", error);
      process.exit(1);
    }
  });

  parser.on("error", (err) => {
    console.error("Error parsing CSV:", err);
    process.exit(1);
  });
}

// Run the import
importVehicleReferences();