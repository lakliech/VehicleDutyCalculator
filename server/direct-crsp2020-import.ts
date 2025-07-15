import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { db } from "./db";

interface CRSP2020Record {
  make: string;
  model: string;
  engineCapacity: number;
  crsp2020: number;
}

async function directCRSP2020Import() {
  console.log("Starting direct CRSP 2020 import using SQL bulk operations...");
  
  const records: CRSP2020Record[] = [];
  
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

      const recordData: CRSP2020Record = {
        make: record.MAKE?.trim() || '',
        model: record.MODEL?.trim() || '',
        engineCapacity: engineCapacity,
        crsp2020: crspValue
      };

      if (recordData.make && recordData.model && recordData.crsp2020 > 0) {
        records.push(recordData);
      }
    }

    console.log(`Parsed ${records.length} valid records from CSV`);

    // Create temporary table for bulk operations
    console.log("Creating temporary table for bulk update...");
    
    await db.execute(`
      CREATE TEMP TABLE temp_crsp2020 (
        make TEXT,
        model TEXT,
        engine_capacity INTEGER,
        crsp_2020 NUMERIC
      )
    `);

    // Insert all records into temp table in batches
    console.log("Inserting data into temporary table...");
    const batchSize = 100;
    let insertedCount = 0;

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      
      const values = batch.map(record => 
        `('${record.make.replace(/'/g, "''")}', '${record.model.replace(/'/g, "''")}', ${record.engineCapacity}, ${record.crsp2020})`
      ).join(',');

      await db.execute(`
        INSERT INTO temp_crsp2020 (make, model, engine_capacity, crsp_2020) 
        VALUES ${values}
      `);

      insertedCount += batch.length;
      console.log(`Inserted ${insertedCount}/${records.length} records (${Math.round(insertedCount/records.length*100)}%)`);
    }

    // Bulk update existing records
    console.log("Performing bulk update of existing vehicles...");
    
    const updateResult = await db.execute(`
      UPDATE vehicle_references 
      SET crsp_2020 = temp_crsp2020.crsp_2020
      FROM temp_crsp2020 
      WHERE vehicle_references.make = temp_crsp2020.make 
        AND vehicle_references.model = temp_crsp2020.model 
        AND vehicle_references.engine_capacity = temp_crsp2020.engine_capacity
    `);

    console.log(`Updated existing vehicles with CRSP 2020 data`);

    // Insert new vehicles that don't exist
    console.log("Inserting new vehicles from CRSP 2020 data...");
    
    await db.execute(`
      INSERT INTO vehicle_references (make, model, engine_capacity, crsp_2020, created_at)
      SELECT make, model, engine_capacity, crsp_2020, NOW()
      FROM temp_crsp2020
      WHERE NOT EXISTS (
        SELECT 1 FROM vehicle_references vr 
        WHERE vr.make = temp_crsp2020.make 
          AND vr.model = temp_crsp2020.model 
          AND vr.engine_capacity = temp_crsp2020.engine_capacity
      )
    `);

    console.log("Inserted new vehicles from CRSP 2020 data");

    // Clean up temp table
    await db.execute(`DROP TABLE temp_crsp2020`);

    // Get final statistics
    const totalVehicles = await db.execute(`SELECT COUNT(*) as count FROM vehicle_references`);
    const withCrsp2020 = await db.execute(`SELECT COUNT(*) as count FROM vehicle_references WHERE crsp_2020 IS NOT NULL`);

    console.log(`\nImport completed successfully!`);
    console.log(`Total vehicles in database: ${totalVehicles.rows[0].count}`);
    console.log(`Vehicles with CRSP 2020 values: ${withCrsp2020.rows[0].count}`);
    console.log(`CRSP 2020 coverage: ${Math.round((withCrsp2020.rows[0].count / totalVehicles.rows[0].count) * 100)}%`);

  } catch (error) {
    console.error("Import failed:", error);
    throw error;
  }
}

// Run the import
directCRSP2020Import()
  .then(() => {
    console.log("Direct CRSP 2020 import completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Direct CRSP 2020 import failed:", error);
    process.exit(1);
  });