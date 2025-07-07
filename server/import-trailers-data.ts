import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';
import { db } from './db';
import { trailers } from '@shared/schema';

interface TrailerRecord {
  type: string;
  specifications: string;
  crspKes: number;
  make: string;
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

async function importTrailersData() {
  console.log('Starting trailers data import...');
  
  const csvPath = join(process.cwd(), 'attached_assets', 'trailers_1751904613805.csv');
  const records: TrailerRecord[] = [];
  
  return new Promise<void>((resolve, reject) => {
    createReadStream(csvPath)
      .pipe(parse({ 
        delimiter: ',',
        columns: false,
        skip_empty_lines: false,
        relax_quotes: true
      }))
      .on('data', (row: string[]) => {
        // Skip header rows and empty rows
        if (!row[0] || row[0].includes('CMC MOTORS') || row[0].includes('HIGH SPEED') || row[0].trim() === '') {
          return;
        }
        
        const type = cleanText(row[0]);
        const specifications = row[1] ? cleanText(row[1]) : '';
        const crspValue = row[2];
        const make = row[3] ? cleanText(row[3]) : '';
        
        // Only process rows with valid data
        if (type && crspValue && make && !isNaN(cleanCrspValue(crspValue))) {
          const description = specifications 
            ? `${type} (${specifications})`
            : type;
            
          records.push({
            type,
            specifications,
            crspKes: cleanCrspValue(crspValue),
            make,
            description
          });
        }
      })
      .on('end', async () => {
        try {
          console.log(`Parsed ${records.length} trailer records`);
          
          // Clear existing data
          await db.delete(trailers);
          
          // Insert new data in batches
          const batchSize = 100;
          for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            await db.insert(trailers).values(batch);
          }
          
          console.log('Trailers data import completed successfully');
          resolve();
        } catch (error) {
          console.error('Error inserting trailers data:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error reading trailers CSV:', error);
        reject(error);
      });
  });
}

export { importTrailersData };

// Auto-run the import
importTrailersData()
  .then(() => {
    console.log('✓ Trailers import completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });