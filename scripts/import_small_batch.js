#!/usr/bin/env node

// Simple import script for CRSP 2025 data using smaller batches
import fs from 'fs';
import { db } from '../server/db.js';

async function importSmallBatch() {
  try {
    console.log('Starting small batch import for CRSP 2025...');
    
    // Read one of the smaller batch files
    const batchContent = fs.readFileSync('scripts/crsp2025_batch_aa', 'utf-8');
    
    // Parse the content to extract vehicle data
    const lines = batchContent.split('\n').filter(line => line.trim());
    
    let importCount = 0;
    
    for (const line of lines) {
      if (line.includes("'") && line.includes(',')) {
        try {
          // Extract data using regex
          const match = line.match(/'([^']+)'/g);
          if (match && match.length >= 10) {
            const make = match[0].replace(/'/g, '');
            const model = match[1].replace(/'/g, '');
            const model_number = match[2] === 'NULL' ? null : match[2].replace(/'/g, '');
            const transmission = match[3].replace(/'/g, '');
            const drive_configuration = match[4].replace(/'/g, '');
            const engine_capacity = match[5].replace(/'/g, '');
            const body_type = match[6] === 'NULL' ? null : match[6].replace(/'/g, '');
            const gvw = match[7] === 'NULL' ? null : match[7].replace(/'/g, '');
            const seating = match[8] === 'NULL' ? null : match[8].replace(/'/g, '');
            const fuel_type = match[9].replace(/'/g, '');
            
            // Extract CRSP value (numeric at end)
            const crspMatch = line.match(/(\d+\.?\d*)\s*\)/);
            const crsp_2025 = crspMatch ? parseFloat(crspMatch[1]) : null;
            
            if (make && model && crsp_2025) {
              await db.insert(vehicleReferences2025).values({
                make,
                model, 
                model_number,
                transmission,
                drive_configuration,
                engine_capacity,
                body_type,
                gvw,
                seating,
                fuel_type,
                crsp_2025
              });
              
              importCount++;
              
              if (importCount % 10 === 0) {
                console.log(`Imported ${importCount} records...`);
              }
            }
          }
        } catch (error) {
          console.log(`Failed to import line: ${line.substring(0, 100)}...`);
        }
      }
    }
    
    console.log(`Import completed! Total records imported: ${importCount}`);
    
    // Verify import
    const result = await db.execute('SELECT COUNT(*) as count FROM vehicle_references_2025');
    console.log(`Total records in database: ${result.rows[0].count}`);
    
  } catch (error) {
    console.error('Import failed:', error);
  }
}

importSmallBatch();