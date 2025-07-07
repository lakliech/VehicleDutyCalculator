import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';
import { db } from './db';
import { heavyMachinery } from '@shared/schema';

interface HeavyMachineryRecord {
  make: string;
  model: string;
  powerSpec: string;
  powerValue: number | null;
  category: string;
  driveType: string | null;
  crspKes: number;
  description: string;
}

function cleanCrspValue(value: string): number {
  // Remove quotes, commas, and convert to number
  const cleaned = value.replace(/[",]/g, '').trim();
  return parseFloat(cleaned);
}

function cleanText(value: string): string {
  return value.replace(/[""]/g, '').trim();
}

function extractPowerValue(powerSpec: string): number | null {
  const match = powerSpec.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function extractDriveType(model: string): string | null {
  if (model.includes('4WD')) return '4WD';
  if (model.includes('2WD')) return '2WD';
  return null;
}

function categorizeEquipment(make: string, model: string): string {
  const modelLower = model.toLowerCase();
  const makeLower = make.toLowerCase();
  
  if (modelLower.includes('excavator')) return 'Excavator';
  if (modelLower.includes('backhoe')) return 'Backhoe Loader';
  if (modelLower.includes('wheel loader')) return 'Wheel Loader';
  if (modelLower.includes('dozer')) return 'Bulldozer';
  if (modelLower.includes('hammer') || modelLower.includes('breaker')) return 'Hammer/Breaker';
  if (modelLower.includes('combine')) return 'Combine Harvester';
  if (modelLower.includes('roller')) return 'Road Roller';
  if (modelLower.includes('cane loader')) return 'Cane Loader';
  if (modelLower.includes('cane harvester')) return 'Cane Harvester';
  if (modelLower.includes('utility vehicle')) return 'Utility Vehicle';
  if (modelLower.includes('golf car')) return 'Golf Cart';
  if (makeLower.includes('massey') || makeLower.includes('john deere') || makeLower.includes('case')) {
    return 'Agricultural Tractor';
  }
  
  return 'Heavy Machinery';
}

async function importHeavyMachineryData() {
  console.log('Starting heavy machinery data import...');
  
  const csvPath = join(process.cwd(), 'attached_assets', 'tractors_1751904628624.csv');
  const records: HeavyMachineryRecord[] = [];
  
  return new Promise<void>((resolve, reject) => {
    createReadStream(csvPath)
      .pipe(parse({ 
        delimiter: ',',
        columns: false,
        skip_empty_lines: true,
        relax_quotes: true
      }))
      .on('data', (row: string[]) => {
        // Skip header row
        if (row[0] === 'MAKE' || row[0] === '﻿MAKE') {
          return;
        }
        
        const make = cleanText(row[0]);
        const model = cleanText(row[1]);
        const powerSpec = row[2] ? cleanText(row[2]) : '';
        const crspValue = row[3];
        
        // Only process rows with valid data
        if (make && model && crspValue && !isNaN(cleanCrspValue(crspValue))) {
          const powerValue = powerSpec ? extractPowerValue(powerSpec) : null;
          const driveType = extractDriveType(model);
          const category = categorizeEquipment(make, model);
          const description = powerSpec 
            ? `${make} ${model} (${powerSpec})`
            : `${make} ${model}`;
            
          records.push({
            make,
            model,
            powerSpec,
            powerValue,
            category,
            driveType,
            crspKes: cleanCrspValue(crspValue),
            description
          });
        }
      })
      .on('end', async () => {
        try {
          console.log(`Parsed ${records.length} heavy machinery records`);
          
          // Clear existing data
          await db.delete(heavyMachinery);
          
          // Insert new data in batches
          const batchSize = 100;
          for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            await db.insert(heavyMachinery).values(batch);
          }
          
          console.log('Heavy machinery data import completed successfully');
          resolve();
        } catch (error) {
          console.error('Error inserting heavy machinery data:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error reading heavy machinery CSV:', error);
        reject(error);
      });
  });
}

export { importHeavyMachineryData };

// Auto-run the import
importHeavyMachineryData()
  .then(() => {
    console.log('✓ Heavy machinery import completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });