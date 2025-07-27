import fs from 'fs';
import { parse } from 'csv-parse';
import { Pool } from '@neondatabase/serverless';

function cleanCrspValue(value) {
  if (!value || value.trim() === '') {
    return null;
  }
  
  // Remove quotes, spaces, and commas
  const cleaned = value.replace(/[",\s]/g, '');
  
  try {
    return parseFloat(cleaned);
  } catch (e) {
    return null;
  }
}

function parseEngineCapacity(value) {
  if (!value || value.trim() === '') {
    return null;
  }
  
  // Handle electric vehicle kWh values
  if (value.includes('kWh')) {
    return value.trim();
  }
  
  // Handle numeric values
  try {
    const numeric = value.replace(/[^\d.]/g, '');
    if (numeric) {
      return numeric;
    }
  } catch (e) {
    // Return original value if parsing fails
  }
  
  return value.trim();
}

function parseSeating(value) {
  if (!value || value.trim() === '') {
    return null;
  }
  
  try {
    return parseInt(value);
  } catch (e) {
    return null;
  }
}

async function importCRSP2025Data() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const csvData = fs.readFileSync('attached_assets/CRSP2025_1753605083938.csv', 'utf-8');
    
    const records = await new Promise((resolve, reject) => {
      parse(csvData, {
        columns: true,
        skip_empty_lines: true
      }, (err, records) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(records);
      });
    });

    let importedCount = 0;
    let skippedCount = 0;
    
    console.log(`📊 Processing ${records.length} records...`);
    
    for (const row of records) {
      try {
        // Extract and clean the data (handle BOM character in first column)
        const make = (row['﻿Make'] || row['Make'])?.trim();
        const model = row['Model']?.trim();
        const modelNumber = row['Model \nnumber']?.trim() || null;
        const transmission = row['Transmission']?.trim() || null;
        const driveConfig = row['Drive\nConfiguration']?.trim() || null;
        const engineCapacity = parseEngineCapacity(row['Engine \nCapacity']);
        const bodyType = row['Body \nType ']?.trim() || null;
        const gvw = row['GVW']?.trim() || null;
        const seating = parseSeating(row['Seating']);
        const fuelType = row['Fuel']?.trim() || null;
        const crsp2025 = cleanCrspValue(row['CRSP2025']);
        
        // Skip rows without essential data
        if (!make || !model) {
          skippedCount++;
          continue;
        }
        
        // Insert into database
        await pool.query(`
          INSERT INTO vehicle_references_2025 
          (make, model, model_number, transmission, drive_configuration, 
           engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [make, model, modelNumber, transmission, driveConfig, 
            engineCapacity, bodyType, gvw, seating, fuelType, crsp2025]);
        
        importedCount++;
        
        if (importedCount % 100 === 0) {
          console.log(`Imported ${importedCount} records...`);
        }
        
      } catch (e) {
        console.error(`Error processing row: ${e.message}`);
        skippedCount++;
        continue;
      }
    }
    
    console.log('✅ Import completed!');
    console.log(`📊 Imported: ${importedCount} records`);
    console.log(`⚠️ Skipped: ${skippedCount} records`);
    
    return { imported: importedCount, skipped: skippedCount };
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the import
importCRSP2025Data()
  .then(result => {
    console.log('🎉 CRSP2025 data import successful!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Import failed:', error);
    process.exit(1);
  });