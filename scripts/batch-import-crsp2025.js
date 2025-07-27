#!/usr/bin/env node

import fs from 'fs';

// Read the CSV and create simple INSERT/UPDATE statements
async function createBatchImports() {
  try {
    const csvContent = fs.readFileSync('attached_assets/CRSP2025_1753595396478.csv', 'utf-8');
    const lines = csvContent.split('\n').slice(1); // Skip header
    
    let insertStatements = [];
    let updateStatements = [];
    let successCount = 0;
    let skipCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      try {
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
        
        if (!make || !model || !crsp2025Str) {
          skipCount++;
          continue;
        }
        
        const crsp2025 = cleanCrspValue(crsp2025Str);
        if (!crsp2025) {
          skipCount++;
          continue;
        }
        
        const engineCapacity = cleanEngineCapacity(engineCapacityStr);
        const fuelType = normalizeFuelType(fuel);
        const cleanSeating = cleanSeatingValue(seating);
        
        // Create UPDATE statement for existing records
        const updateSql = `UPDATE vehicle_references 
SET crsp_2025 = ${crsp2025},
    transmission = ${transmission ? `'${escapeSql(transmission)}'` : 'transmission'},
    drive_configuration = ${driveConfig ? `'${escapeSql(driveConfig)}'` : 'drive_configuration'},
    engine_capacity = ${engineCapacity || 'engine_capacity'},
    body_type = ${bodyType ? `'${escapeSql(bodyType)}'` : 'body_type'},
    gvw = ${gvw ? `'${escapeSql(gvw)}'` : 'gvw'},
    seating = ${cleanSeating ? `'${cleanSeating}'` : 'seating'},
    fuel_type = ${fuelType ? `'${escapeSql(fuelType)}'` : 'fuel_type'},
    model_number = ${modelNumber ? `'${escapeSql(modelNumber)}'` : 'model_number'}
WHERE UPPER(make) = '${escapeSql(make.toUpperCase())}' AND model = '${escapeSql(model)}';`;
        
        updateStatements.push(updateSql);
        
        // Create INSERT statement for new records
        const insertSql = `INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT '${escapeSql(make.toUpperCase())}', '${escapeSql(model)}', ${modelNumber ? `'${escapeSql(modelNumber)}'` : 'NULL'}, ${transmission ? `'${escapeSql(transmission)}'` : 'NULL'}, ${driveConfig ? `'${escapeSql(driveConfig)}'` : 'NULL'}, ${engineCapacity || 'NULL'}, ${bodyType ? `'${escapeSql(bodyType)}'` : 'NULL'}, ${gvw ? `'${escapeSql(gvw)}'` : 'NULL'}, ${cleanSeating ? `'${cleanSeating}'` : 'NULL'}, ${fuelType ? `'${escapeSql(fuelType)}'` : 'NULL'}, ${crsp2025}, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = '${escapeSql(make.toUpperCase())}' AND model = '${escapeSql(model)}'
);`;
        
        insertStatements.push(insertSql);
        successCount++;
        
      } catch (error) {
        console.error(`Error processing line ${i + 2}:`, error.message);
        skipCount++;
      }
    }
    
    // Write SQL files in batches
    const batchSize = 100;
    let batchNumber = 1;
    
    // Write update batches
    for (let i = 0; i < updateStatements.length; i += batchSize) {
      const batch = updateStatements.slice(i, i + batchSize);
      const filename = `scripts/crsp2025-update-batch-${batchNumber}.sql`;
      fs.writeFileSync(filename, batch.join('\n\n'));
      console.log(`Created update batch ${batchNumber}: ${filename} (${batch.length} statements)`);
      batchNumber++;
    }
    
    batchNumber = 1;
    
    // Write insert batches 
    for (let i = 0; i < insertStatements.length; i += batchSize) {
      const batch = insertStatements.slice(i, i + batchSize);
      const filename = `scripts/crsp2025-insert-batch-${batchNumber}.sql`;
      fs.writeFileSync(filename, batch.join('\n\n'));
      console.log(`Created insert batch ${batchNumber}: ${filename} (${batch.length} statements)`);
      batchNumber++;
    }
    
    console.log(`\nBatch Import files generated:`);
    console.log(`Processed records: ${successCount}`);
    console.log(`Skipped records: ${skipCount}`);
    
  } catch (error) {
    console.error('Failed to create batch imports:', error);
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
    return null;
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

createBatchImports();