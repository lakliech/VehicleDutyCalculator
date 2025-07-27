#!/usr/bin/env node

import fs from 'fs';
import { parse } from 'csv-parse';
import { Pool } from '@neondatabase/serverless';

// Clean CRSP value string and convert to decimal
function cleanCrspValue(valueStr) {
  if (!valueStr || valueStr.trim() === '') {
    return null;
  }
  
  // Remove quotes, spaces, and commas
  const cleaned = valueStr.toString().trim().replace(/['"]+/g, '').replace(/,/g, '').replace(/ /g, '');
  
  // Try to extract numeric value
  try {
    return parseFloat(cleaned);
  } catch (error) {
    return null;
  }
}

// Extract numeric engine capacity from string
function cleanEngineCapacity(engineStr) {
  if (!engineStr || engineStr.trim() === '') {
    return null;
  }
  
  const str = engineStr.toString().trim();
  
  // Handle electric vehicles with kWh
  if (str.toUpperCase().includes('KWH')) {
    return null; // Skip electric vehicles for engine capacity
  }
  
  // Extract numeric values
  const numbers = str.match(/\d+/);
  if (numbers && numbers.length > 0) {
    return parseInt(numbers[0]);
  }
  
  return null;
}

// Clean seating number
function cleanSeating(seatingStr) {
  if (!seatingStr || seatingStr.trim() === '') {
    return null;
  }
  
  try {
    return parseInt(parseFloat(seatingStr)).toString();
  } catch (error) {
    return null;
  }
}

// Normalize fuel type values
function normalizeFuelType(fuelStr) {
  if (!fuelStr || fuelStr.trim() === '') {
    return null;
  }
  
  const fuelMap = {
    'GASOLINE': 'petrol',
    'PETROL': 'petrol',
    'DIESEL': 'diesel',
    'ELECTRIC': 'electric',
    'HYBRID': 'hybrid',
    'PLUG-IN HYBRID': 'hybrid'
  };
  
  const fuelUpper = fuelStr.toString().trim().toUpperCase();
  return fuelMap[fuelUpper] || fuelUpper.toLowerCase();
}

async function main() {
  try {
    // Database connection
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      console.error('ERROR: DATABASE_URL environment variable not set');
      return;
    }
    
    const pool = new Pool({ connectionString: DATABASE_URL });
    
    // Read and parse CSV file
    const csvContent = fs.readFileSync('attached_assets/CRSP2025_1753595396478.csv', 'utf-8');
    
    const parser = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    
    const rows = [];
    for await (const row of parser) {
      rows.push(row);
    }
    
    console.log(`Found ${rows.length} records in CRSP 2025 CSV`);
    
    let successfulImports = 0;
    let skippedRecords = 0;
    
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      
      try {
        const make = row['Make'] && row['Make'].trim() ? row['Make'].trim().toUpperCase() : null;
        const model = row['Model'] && row['Model'].trim() ? row['Model'].trim() : null;
        const modelNumber = row['Model \nnumber'] && row['Model \nnumber'].trim() ? row['Model \nnumber'].trim() : null;
        const transmission = row['Transmission'] && row['Transmission'].trim() ? row['Transmission'].trim() : null;
        const driveConfig = row['Drive\nConfiguration'] && row['Drive\nConfiguration'].trim() ? row['Drive\nConfiguration'].trim() : null;
        const engineCapacity = cleanEngineCapacity(row['Engine \nCapacity']);
        const bodyType = row['Body \nType '] && row['Body \nType '].trim() ? row['Body \nType '].trim() : null;
        const gvw = row['GVW'] && row['GVW'].trim() ? row['GVW'].trim() : null;
        const seating = cleanSeating(row['Seating']);
        const fuelType = normalizeFuelType(row['Fuel']);
        const crsp2025 = cleanCrspValue(row['CRSP2025']);
        
        if (!make || !model || !crsp2025) {
          console.log(`Skipping row ${index}: Missing required data (make=${make}, model=${model}, crsp2025=${crsp2025})`);
          skippedRecords++;
          continue;
        }
        
        // Check if record already exists (by make, model, and model_number)
        const existingQuery = `
          SELECT id FROM vehicle_references 
          WHERE UPPER(make) = $1 AND model = $2 AND ($3::text IS NULL OR model_number = $3)
        `;
        const existingResult = await pool.query(existingQuery, [make, model, modelNumber]);
        
        if (existingResult.rows.length > 0) {
          // Update existing record with CRSP2025 value
          const updateQuery = `
            UPDATE vehicle_references 
            SET crsp_2025 = $1,
                transmission = $2,
                drive_configuration = $3,
                engine_capacity = $4,
                body_type = $5,
                gvw = $6,
                seating = $7,
                fuel_type = $8,
                model_number = $9
            WHERE id = $10
          `;
          await pool.query(updateQuery, [
            crsp2025, transmission, driveConfig, engineCapacity,
            bodyType, gvw, seating, fuelType, modelNumber, existingResult.rows[0].id
          ]);
        } else {
          // Insert new record
          const insertQuery = `
            INSERT INTO vehicle_references 
            (make, model, model_number, transmission, drive_configuration, 
             engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          `;
          await pool.query(insertQuery, [
            make, model, modelNumber, transmission, driveConfig,
            engineCapacity, bodyType, gvw, seating, fuelType, crsp2025
          ]);
        }
        
        successfulImports++;
        
        if (successfulImports % 100 === 0) {
          console.log(`Processed ${successfulImports} records...`);
        }
        
      } catch (error) {
        console.error(`Error processing row ${index}:`, error.message);
        continue;
      }
    }
    
    console.log(`\nImport completed:`);
    console.log(`Successfully imported/updated: ${successfulImports} records`);
    console.log(`Skipped records: ${skippedRecords}`);
    
    // Verify import
    const countResult = await pool.query('SELECT COUNT(*) FROM vehicle_references WHERE crsp_2025 IS NOT NULL');
    console.log(`Total records with CRSP 2025 values: ${countResult.rows[0].count}`);
    
    await pool.end();
    
  } catch (error) {
    console.error('Import failed:', error);
  }
}

main();