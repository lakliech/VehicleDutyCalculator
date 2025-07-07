import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';
import { db } from './db';
import { vehicleReferences } from '@shared/schema';
import { sql } from 'drizzle-orm';

interface CRSP2020Record {
  make: string;
  model: string;
  engineCapacity: number;
  bodyType: string;
  driveConfiguration: string;
  seating: string;
  fuel: string;
  gvw: string;
  crsp2020: number;
}

async function addMissingVehicles() {
  const csvPath = join(process.cwd(), 'attached_assets', 'crsp2020_1751896282356.csv');
  const records: CRSP2020Record[] = [];

  console.log('📖 Reading CRSP2020 CSV file...');

  return new Promise<void>((resolve, reject) => {
    createReadStream(csvPath)
      .pipe(parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }))
      .on('data', (row: any) => {
        // Get column names - handling BOM character
        const columns = Object.keys(row);
        const makeKey = columns.find(k => k.includes('MAKE')) || 'MAKE';
        const modelKey = columns.find(k => k.includes('MODEL')) || 'MODEL';
        const engineKey = columns.find(k => k.includes('Engine')) || 'Engine Capacity';
        const bodyKey = columns.find(k => k.includes('Body')) || 'Body Type';
        const driveKey = columns.find(k => k.includes('Drive')) || 'Drive configuration';
        const seatingKey = columns.find(k => k.includes('seating')) || 'seating';
        const fuelKey = columns.find(k => k.includes('Fuel')) || 'Fuel';
        const gvwKey = columns.find(k => k.includes('GVW')) || 'GVW';
        const crspKey = columns.find(k => k.includes('CRSP')) || 'CRSP(KES)';
        
        // Parse and clean the data
        const engineCapacity = row[engineKey] ? Math.round(parseFloat(row[engineKey].replace(/[^\d.]/g, ''))) : null;
        const crsp2020 = row[crspKey] ? parseFloat(row[crspKey].replace(/[^\d.,]/g, '').replace(/,/g, '')) : null;

        if (row[makeKey] && row[modelKey] && engineCapacity && crsp2020) {
          const record: CRSP2020Record = {
            make: row[makeKey].trim().toUpperCase(),
            model: row[modelKey].trim().toUpperCase(),
            engineCapacity,
            bodyType: row[bodyKey]?.trim() || '',
            driveConfiguration: row[driveKey]?.trim() || '',
            seating: row[seatingKey]?.trim() || '',
            fuel: row[fuelKey]?.trim().toLowerCase() || '',
            gvw: row[gvwKey]?.trim() || '',
            crsp2020
          };
          records.push(record);
        }
      })
      .on('end', async () => {
        try {
          console.log(`📊 Found ${records.length} vehicles in CRSP2020 CSV`);
          
          // Get all existing vehicles from database
          console.log('🔍 Checking existing vehicles in database...');
          const existingVehicles = await db
            .select({
              make: vehicleReferences.make,
              model: vehicleReferences.model,
              engineCapacity: vehicleReferences.engineCapacity
            })
            .from(vehicleReferences);

          console.log(`📋 Found ${existingVehicles.length} existing vehicles in database`);

          // Create a Set of existing vehicle combinations for fast lookup
          const existingSet = new Set(
            existingVehicles.map(v => 
              `${v.make?.toUpperCase()}-${v.model?.toUpperCase()}-${v.engineCapacity || 0}`
            )
          );

          // Find vehicles that don't exist in the database
          const newVehicles = records.filter(record => {
            const key = `${record.make}-${record.model}-${record.engineCapacity}`;
            return !existingSet.has(key);
          });

          console.log(`🆕 Found ${newVehicles.length} new vehicles to add`);

          if (newVehicles.length === 0) {
            console.log('✅ No new vehicles to add - all CRSP2020 vehicles already exist in database');
            resolve();
            return;
          }

          // Group vehicles by make for better logging
          const vehiclesByMake = newVehicles.reduce((acc, vehicle) => {
            if (!acc[vehicle.make]) acc[vehicle.make] = [];
            acc[vehicle.make].push(vehicle);
            return acc;
          }, {} as Record<string, CRSP2020Record[]>);

          console.log('📈 New vehicles by make:');
          Object.entries(vehiclesByMake).forEach(([make, vehicles]) => {
            console.log(`  ${make}: ${vehicles.length} vehicles`);
          });

          // Insert new vehicles in batches
          console.log('💾 Adding new vehicles to database...');
          const batchSize = 100;
          let added = 0;

          for (let i = 0; i < newVehicles.length; i += batchSize) {
            const batch = newVehicles.slice(i, i + batchSize);
            
            const vehicleInserts = batch.map(record => ({
              make: record.make,
              model: record.model,
              engineCapacity: record.engineCapacity,
              bodyType: record.bodyType || null,
              driveConfiguration: record.driveConfiguration || null,
              seating: record.seating || null,
              fuelType: record.fuel || null,
              gvw: record.gvw || null,
              crsp2020: record.crsp2020,
              crspKes: null // Will be populated when current CRSP data is available
            }));

            await db.insert(vehicleReferences).values(vehicleInserts);
            added += batch.length;
            
            console.log(`✅ Added batch ${Math.ceil((i + batchSize) / batchSize)} - ${added}/${newVehicles.length} vehicles`);
          }

          console.log(`🎉 Successfully added ${added} new vehicles from CRSP2020 data!`);
          
          // Show final statistics
          const finalCount = await db
            .select({ count: sql<number>`count(*)` })
            .from(vehicleReferences);
          
          console.log(`📊 Total vehicles in database: ${finalCount[0].count}`);
          console.log(`📈 Vehicles with CRSP2020 data: ${added + records.length - newVehicles.length}`);

          resolve();
        } catch (error) {
          console.error('❌ Error adding missing vehicles:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV:', error);
        reject(error);
      });
  });
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addMissingVehicles()
    .then(() => {
      console.log('✅ Missing vehicles addition complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Failed to add missing vehicles:', error);
      process.exit(1);
    });
}

export { addMissingVehicles };