#!/usr/bin/env node

// Progressive CRSP 2025 import using SQL tool approach
import fs from 'fs';
import path from 'path';
import { db } from '../server/db.js';

async function progressiveImport() {
  try {
    console.log('🚀 Starting progressive CRSP 2025 import...');
    
    // Read the original CSV file and process it directly
    const csvPath = 'attached_assets/CRSP2025_1753605083938.csv';
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').slice(1); // Skip header
    
    console.log(`📊 Found ${lines.length} records in CSV`);
    
    // Get current count in database
    const currentResult = await db.execute('SELECT COUNT(*) as count FROM vehicle_references_2025');
    const currentCount = parseInt(currentResult.rows[0].count);
    console.log(`📈 Current database count: ${currentCount}`);
    
    let imported = 0;
    let skipped = 0;
    const batchSize = 10; // Small batches to avoid timeout
    
    for (let i = 0; i < lines.length; i += batchSize) {
      const batch = lines.slice(i, i + batchSize);
      
      for (const line of batch) {
        if (!line.trim()) continue;
        
        try {
          const columns = line.split(',');
          if (columns.length < 12) continue;
          
          const make = columns[0]?.replace(/"/g, '').trim();
          const model = columns[1]?.replace(/"/g, '').trim();
          const model_number = columns[2]?.replace(/"/g, '').trim() || null;
          const transmission = columns[3]?.replace(/"/g, '').trim();
          const drive_configuration = columns[4]?.replace(/"/g, '').trim();
          const engine_capacity = columns[5]?.replace(/"/g, '').trim();
          const body_type = columns[6]?.replace(/"/g, '').trim() || null;
          const gvw = columns[7]?.replace(/"/g, '').trim() || null;
          const seating = columns[8]?.replace(/"/g, '').trim() || null;
          const fuel_type = columns[9]?.replace(/"/g, '').trim();
          const crsp_2025 = parseFloat(columns[10]?.replace(/"/g, '').replace(/,/g, '')) || null;
          
          if (make && model && crsp_2025) {
            // Check if record already exists
            const existsResult = await db.execute(
              'SELECT COUNT(*) as count FROM vehicle_references_2025 WHERE make = ? AND model = ? AND crsp_2025 = ?',
              [make, model, crsp_2025]
            );
            
            if (existsResult.rows[0].count === 0) {
              await db.execute(`
                INSERT INTO vehicle_references_2025 
                (make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `, [make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025]);
              
              imported++;
            } else {
              skipped++;
            }
          }
        } catch (error) {
          console.log(`⚠️ Failed to import line ${i}: ${error.message}`);
        }
      }
      
      // Progress update every 10 batches (100 records)
      if ((i / batchSize) % 10 === 0) {
        const totalResult = await db.execute('SELECT COUNT(*) as count FROM vehicle_references_2025');
        console.log(`📈 Progress: ${totalResult.rows[0].count} total records, ${imported} newly imported, ${skipped} skipped`);
      }
      
      // Small delay to prevent overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Final count
    const finalResult = await db.execute('SELECT COUNT(*) as count FROM vehicle_references_2025');
    console.log(`🎉 Import completed!`);
    console.log(`📊 Final count: ${finalResult.rows[0].count} records`);
    console.log(`✅ Newly imported: ${imported} records`);
    console.log(`⏭️ Skipped duplicates: ${skipped} records`);
    
    // Show makes breakdown
    const makesResult = await db.execute(`
      SELECT make, COUNT(*) as count 
      FROM vehicle_references_2025 
      GROUP BY make 
      ORDER BY count DESC 
      LIMIT 15
    `);
    
    console.log('🏭 Makes breakdown:');
    makesResult.rows.forEach(row => {
      console.log(`  ${row.make}: ${row.count} vehicles`);
    });
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  }
}

progressiveImport();