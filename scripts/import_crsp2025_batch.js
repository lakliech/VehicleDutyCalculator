#!/usr/bin/env node

import fs from 'fs';
import { Pool } from '@neondatabase/serverless';

async function importBatch() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('🚀 Starting batch CRSP 2025 import...');
    
    // Read the full SQL file
    const sqlContent = fs.readFileSync('scripts/crsp2025_inserts.sql', 'utf-8');
    
    // Split into individual INSERT statements
    const statements = sqlContent
      .split('\n\n')
      .filter(stmt => stmt.trim().startsWith('INSERT'))
      .map(stmt => stmt.trim().replace(/;$/, ''));
    
    console.log(`📊 Found ${statements.length} INSERT statements`);
    
    // Group statements into batches of 50
    const batchSize = 50;
    const batches = [];
    
    for (let i = 0; i < statements.length; i += batchSize) {
      batches.push(statements.slice(i, i + batchSize));
    }
    
    console.log(`📦 Created ${batches.length} batches of ${batchSize} statements each`);
    
    // Import each batch
    let totalImported = 0;
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      
      try {
        // Combine statements in batch
        const batchSql = batch.join(';\n') + ';';
        
        await pool.query(batchSql);
        totalImported += batch.length;
        
        console.log(`✅ Batch ${i + 1}/${batches.length} completed (${totalImported}/${statements.length} total)`);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log(`❌ Error in batch ${i + 1}:`, error.message);
        
        // Try importing individual statements in this batch
        let batchImported = 0;
        for (const stmt of batch) {
          try {
            await pool.query(stmt);
            batchImported++;
          } catch (stmtError) {
            console.log(`⚠️ Failed individual statement: ${stmt.substring(0, 100)}...`);
          }
        }
        
        totalImported += batchImported;
        console.log(`🔄 Batch ${i + 1} partial success: ${batchImported}/${batch.length} statements`);
      }
      
      // Progress update every 10 batches
      if ((i + 1) % 10 === 0) {
        const result = await pool.query('SELECT COUNT(*) as count FROM vehicle_references_2025');
        console.log(`📈 Progress update: ${result.rows[0].count} records in database`);
      }
    }
    
    // Final verification
    const finalResult = await pool.query(`
      SELECT 
        COUNT(*) as total_records,
        COUNT(DISTINCT make) as unique_makes 
      FROM vehicle_references_2025
    `);
    
    console.log('🎉 Import completed!');
    console.log(`📊 Final results: ${finalResult.rows[0].total_records} records, ${finalResult.rows[0].unique_makes} makes`);
    
    // Show makes breakdown
    const makesResult = await pool.query(`
      SELECT make, COUNT(*) as count 
      FROM vehicle_references_2025 
      GROUP BY make 
      ORDER BY count DESC 
      LIMIT 10
    `);
    
    console.log('🏭 Top makes:');
    makesResult.rows.forEach(row => {
      console.log(`  ${row.make}: ${row.count} vehicles`);
    });
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await pool.end();
  }
}

// Run the import
importBatch();