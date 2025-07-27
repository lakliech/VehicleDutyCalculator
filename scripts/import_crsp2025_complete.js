#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Pool } from '@neondatabase/serverless';

// Clean CRSP value by removing quotes, commas, and spaces
function cleanCrspValue(value) {
  if (!value || value.trim() === '') {
    return null;
  }
  
  // Remove quotes, spaces, and commas
  const cleaned = value.replace(/[",\s]/g, '');
  
  try {
    return parseFloat(cleaned);
  } catch {
    return null;
  }
}

// Parse engine capacity, handling both numeric and kWh values
function parseEngineCapacity(value) {
  if (!value || value.trim() === '') {
    return null;
  }
  
  const strValue = String(value).trim();
  
  // Handle electric vehicle kWh values
  if (strValue.includes('kWh') || strValue.includes('EV')) {
    return strValue;
  }
  
  // Handle numeric values
  try {
    const numeric = strValue.replace(/[^\d.]/g, '');
    if (numeric && !isNaN(numeric)) {
      return numeric;
    }
  } catch (e) {
    // Ignore parsing errors
  }
  
  return strValue;
}

// Parse seating to integer
function parseSeating(value) {
  if (!value || value.trim() === '') {
    return null;
  }
  
  try {
    const num = parseInt(value);
    return isNaN(num) ? null : num;
  } catch {
    return null;
  }
}

// Clean and normalize text fields
function cleanText(value) {
  if (!value) return null;
  return String(value).trim() || null;
}

async function importCrsp2025Data() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('🚀 Starting CRSP 2025 data import...');
    
    // Read and parse CSV file
    const csvFilePath = path.join(process.cwd(), 'attached_assets', 'CRSP2025_1753605083938.csv');
    console.log('📁 Reading CSV file:', csvFilePath);
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = csvContent.split('\n');
    
    console.log(`📊 Found ${lines.length} lines in CSV file`);
    
    // Parse header line to get column positions
    const headerLine = lines[0];
    console.log('📋 Header:', headerLine);
    
    let importedCount = 0;
    let skippedCount = 0;
    
    // Process data lines (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        skippedCount++;
        continue;
      }
      
      try {
        // Parse CSV line manually to handle commas within quoted values
        const columns = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            columns.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        columns.push(current.trim());
        
        if (columns.length < 11) {
          console.log(`⚠️ Skipping line ${i}: insufficient columns (${columns.length})`);
          skippedCount++;
          continue;
        }
        
        // Extract data from columns
        const make = cleanText(columns[0]);
        const model = cleanText(columns[1]);
        const modelNumber = cleanText(columns[2]);
        const transmission = cleanText(columns[3]);
        const driveConfiguration = cleanText(columns[4]);
        const engineCapacity = parseEngineCapacity(columns[5]);
        const bodyType = cleanText(columns[6]);
        const gvw = cleanText(columns[7]);
        const seating = parseSeating(columns[8]);
        const fuelType = cleanText(columns[9]);
        const crsp2025 = cleanCrspValue(columns[10]);
        
        // Skip rows without essential data
        if (!make || !model) {
          console.log(`⚠️ Skipping line ${i}: missing make or model`);
          skippedCount++;
          continue;
        }
        
        // Insert into database
        await pool.query(`
          INSERT INTO vehicle_references_2025 
          (make, model, model_number, transmission, drive_configuration, 
           engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [make, model, modelNumber, transmission, driveConfiguration, 
            engineCapacity, bodyType, gvw, seating, fuelType, crsp2025]);
        
        importedCount++;
        
        if (importedCount % 100 === 0) {
          console.log(`📈 Imported ${importedCount} records...`);
        }
        
      } catch (error) {
        console.log(`❌ Error processing line ${i}:`, error.message);
        console.log(`📄 Line content:`, line.substring(0, 100) + '...');
        skippedCount++;
        continue;
      }
    }
    
    console.log('✅ Import completed!');
    console.log(`📊 Imported: ${importedCount} records`);
    console.log(`⚠️ Skipped: ${skippedCount} records`);
    
    // Verify import
    const result = await pool.query('SELECT COUNT(*) as count, COUNT(DISTINCT make) as makes FROM vehicle_references_2025');
    console.log(`🔍 Verification: ${result.rows[0].count} total records, ${result.rows[0].makes} unique makes`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await pool.end();
  }
}

// Run the import
importCrsp2025Data();