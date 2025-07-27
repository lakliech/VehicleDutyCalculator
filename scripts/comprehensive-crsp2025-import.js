import fs from 'fs';
import { Pool } from 'pg';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function comprehensiveImport() {
  console.log('Starting comprehensive CRSP 2025 import...');
  
  try {
    const csvContent = fs.readFileSync('attached_assets/CRSP2025_1753595396478.csv', 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Skip header line
    const dataLines = lines.slice(1);
    console.log(`Found ${dataLines.length} data records to process`);
    
    let successCount = 0;
    let skipCount = 0;
    let updateCount = 0;
    
    const client = await pool.connect();
    
    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i];
      if (!line.trim()) continue;
      
      try {
        const fields = parseCSVLine(line);
        if (fields.length < 11) {
          console.log(`Skipping line ${i + 2}: insufficient fields`);
          skipCount++;
          continue;
        }
        
        const [make, model, modelNumber, transmission, driveConfig, engineCapacity, bodyType, gvw, seating, fuel, crsp2025Raw] = fields;
        
        if (!make || !model || !crsp2025Raw) {
          skipCount++;
          continue;
        }
        
        // Clean and parse CRSP value
        const crsp2025 = cleanCrspValue(crsp2025Raw);
        if (!crsp2025 || crsp2025 <= 0) {
          skipCount++;
          continue;
        }
        
        // Clean other fields
        const cleanMake = cleanField(make)?.toUpperCase();
        const cleanModel = cleanField(model);
        const cleanModelNumber = cleanField(modelNumber);
        const cleanTransmission = cleanField(transmission);
        const cleanDriveConfig = cleanField(driveConfig);
        const cleanBodyType = cleanField(bodyType);
        const cleanGvw = cleanField(gvw);
        const cleanSeating = cleanField(seating);
        const cleanFuel = cleanField(fuel)?.toLowerCase();
        
        // Parse engine capacity
        let engineCap = null;
        if (engineCapacity && engineCapacity.trim()) {
          const engineStr = engineCapacity.replace(/[^\d]/g, '');
          if (engineStr) {
            engineCap = parseInt(engineStr);
          }
        }
        
        if (!cleanMake || !cleanModel) {
          skipCount++;
          continue;
        }

        // Check if record exists and update or insert
        const existingQuery = `
          SELECT id, crsp_2025 
          FROM vehicle_references 
          WHERE UPPER(make) = $1 AND model = $2 
          AND (engine_capacity = $3 OR (engine_capacity IS NULL AND $3 IS NULL))
          LIMIT 1
        `;
        
        const existingResult = await client.query(existingQuery, [cleanMake, cleanModel, engineCap]);
        
        if (existingResult.rows.length > 0) {
          // Update existing record
          const updateQuery = `
            UPDATE vehicle_references 
            SET crsp_2025 = $1,
                model_number = COALESCE($2, model_number),
                transmission = COALESCE($3, transmission),
                drive_configuration = COALESCE($4, drive_configuration),
                body_type = COALESCE($5, body_type),
                gvw = COALESCE($6, gvw),
                seating = COALESCE($7, seating),
                fuel_type = COALESCE($8, fuel_type)
            WHERE id = $9
          `;
          
          await client.query(updateQuery, [
            crsp2025,
            cleanModelNumber,
            cleanTransmission,
            cleanDriveConfig,
            cleanBodyType,
            cleanGvw,
            cleanSeating,
            cleanFuel,
            existingResult.rows[0].id
          ]);
          
          updateCount++;
        } else {
          // Insert new record
          const insertQuery = `
            INSERT INTO vehicle_references (
              make, model, model_number, transmission, drive_configuration, 
              engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
          `;
          
          await client.query(insertQuery, [
            cleanMake,
            cleanModel,
            cleanModelNumber,
            cleanTransmission,
            cleanDriveConfig,
            engineCap,
            cleanBodyType,
            cleanGvw,
            cleanSeating,
            cleanFuel,
            crsp2025
          ]);
          
          successCount++;
        }
        
        // Progress indicator
        if ((i + 1) % 100 === 0) {
          console.log(`Processed ${i + 1}/${dataLines.length} records...`);
        }
        
      } catch (error) {
        console.error(`Error processing line ${i + 2}:`, error.message);
        skipCount++;
      }
    }
    
    client.release();
    
    console.log('\n=== IMPORT COMPLETE ===');
    console.log(`New records inserted: ${successCount}`);
    console.log(`Existing records updated: ${updateCount}`);
    console.log(`Records skipped: ${skipCount}`);
    console.log(`Total processed: ${successCount + updateCount + skipCount}`);
    
    // Get final statistics
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_vehicles,
        COUNT(crsp_2025) as crsp_2025_coverage,
        COUNT(DISTINCT make) as makes_with_crsp2025
      FROM vehicle_references 
      WHERE crsp_2025 IS NOT NULL
    `);
    
    const stats = statsResult.rows[0];
    console.log(`\n=== FINAL STATISTICS ===`);
    console.log(`Total vehicles with CRSP 2025: ${stats.crsp_2025_coverage}`);
    console.log(`Vehicle makes with CRSP 2025: ${stats.makes_with_crsp2025}`);
    
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await pool.end();
  }
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

function cleanField(field) {
  if (!field) return null;
  return field.replace(/^["'\s]+|["'\s]+$/g, '').trim() || null;
}

function cleanCrspValue(valueStr) {
  if (!valueStr) return null;
  
  // Remove quotes, spaces, commas and extract numeric value
  const cleanStr = valueStr.replace(/[",\s]/g, '');
  const numericMatch = cleanStr.match(/[\d.]+/);
  
  if (numericMatch) {
    const value = parseFloat(numericMatch[0]);
    return value > 0 ? value : null;
  }
  
  return null;
}

// Run the import
comprehensiveImport();