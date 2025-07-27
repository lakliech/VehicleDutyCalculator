#!/usr/bin/env node

import fs from 'fs';

// Read the CSV and create SQL statements
async function createSQLImport() {
  try {
    const csvContent = fs.readFileSync('attached_assets/CRSP2025_1753595396478.csv', 'utf-8');
    const lines = csvContent.split('\n').slice(1); // Skip header
    
    let sqlStatements = [];
    let successCount = 0;
    let skipCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      try {
        // Parse CSV line manually to handle quoted fields
        const fields = parseCSVLine(line);
        
        if (fields.length < 11) continue;
        
        const make = cleanField(fields[0]);
        const model = cleanField(fields[1]);
        const modelNumber = cleanField(fields[2]);
        const transmission = cleanField(fields[3]);
        const driveConfig = cleanField(fields[4]);
        const engineCapacityStr = cleanField(fields[5]);
        const bodyType = cleanField(fields[6]);
        const gvw = cleanField(fields[7]);
        const seating = cleanField(fields[8]);
        const fuel = cleanField(fields[9]);
        const crsp2025Str = cleanField(fields[10]);
        
        // Skip if missing essential data
        if (!make || !model || !crsp2025Str) {
          skipCount++;
          continue;
        }
        
        // Clean and convert CRSP value
        const crsp2025 = cleanCrspValue(crsp2025Str);
        if (!crsp2025) {
          skipCount++;
          continue;
        }
        
        // Clean engine capacity
        const engineCapacity = cleanEngineCapacity(engineCapacityStr);
        
        // Normalize fuel type
        const fuelType = normalizeFuelType(fuel);
        
        // Clean seating
        const cleanSeating = cleanSeatingValue(seating);
        
        // Create SQL statement
        const sql = `
INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)
VALUES ('${escapeSql(make.toUpperCase())}', '${escapeSql(model)}', ${modelNumber ? `'${escapeSql(modelNumber)}'` : 'NULL'}, ${transmission ? `'${escapeSql(transmission)}'` : 'NULL'}, ${driveConfig ? `'${escapeSql(driveConfig)}'` : 'NULL'}, ${engineCapacity || 'NULL'}, ${bodyType ? `'${escapeSql(bodyType)}'` : 'NULL'}, ${gvw ? `'${escapeSql(gvw)}'` : 'NULL'}, ${cleanSeating ? `'${cleanSeating}'` : 'NULL'}, ${fuelType ? `'${escapeSql(fuelType)}'` : 'NULL'}, ${crsp2025})
ON CONFLICT (make, model, model_number) 
DO UPDATE SET 
  crsp_2025 = EXCLUDED.crsp_2025,
  transmission = COALESCE(EXCLUDED.transmission, vehicle_references.transmission),
  drive_configuration = COALESCE(EXCLUDED.drive_configuration, vehicle_references.drive_configuration),
  engine_capacity = COALESCE(EXCLUDED.engine_capacity, vehicle_references.engine_capacity),
  body_type = COALESCE(EXCLUDED.body_type, vehicle_references.body_type),
  gvw = COALESCE(EXCLUDED.gvw, vehicle_references.gvw),
  seating = COALESCE(EXCLUDED.seating, vehicle_references.seating),
  fuel_type = COALESCE(EXCLUDED.fuel_type, vehicle_references.fuel_type);`;
        
        sqlStatements.push(sql);
        successCount++;
        
      } catch (error) {
        console.error(`Error processing line ${i + 2}:`, error.message);
        skipCount++;
      }
    }
    
    // Write SQL file
    const sqlContent = sqlStatements.join('\n\n');
    fs.writeFileSync('scripts/crsp2025-import.sql', sqlContent);
    
    console.log(`\nSQL Import file generated:`);
    console.log(`Processed records: ${successCount}`);
    console.log(`Skipped records: ${skipCount}`);
    console.log(`SQL file: scripts/crsp2025-import.sql`);
    
  } catch (error) {
    console.error('Failed to create SQL import:', error);
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
  
  const cleaned = valueStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function cleanEngineCapacity(engineStr) {
  if (!engineStr) return null;
  
  if (engineStr.toUpperCase().includes('KWH')) {
    return null; // Skip electric vehicles
  }
  
  const numbers = engineStr.match(/\d+/);
  return numbers ? parseInt(numbers[0]) : null;
}

function normalizeFuelType(fuelStr) {
  if (!fuelStr) return null;
  
  const fuelMap = {
    'GASOLINE': 'petrol',
    'PETROL': 'petrol',
    'DIESEL': 'diesel',
    'ELECTRIC': 'electric',
    'HYBRID': 'hybrid',
    'PLUG-IN HYBRID': 'hybrid'
  };
  
  const fuel = fuelStr.toUpperCase().trim();
  return fuelMap[fuel] || fuel.toLowerCase();
}

function cleanSeatingValue(seatingStr) {
  if (!seatingStr) return null;
  
  try {
    const num = parseInt(parseFloat(seatingStr));
    return isNaN(num) ? null : num.toString();
  } catch {
    return null;
  }
}

function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

createSQLImport();