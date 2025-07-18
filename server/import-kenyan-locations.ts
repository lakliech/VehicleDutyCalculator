#!/usr/bin/env node

import { db } from "./db";
import { kenyanLocations } from "@shared/schema-minimal";
import fs from "fs";
import path from "path";

interface LocationData {
  county: string;
  area: string;
}

async function importKenyanLocations() {
  try {
    console.log("Starting Kenyan locations import...");
    
    // Read the CSV file
    const csvPath = path.join(process.cwd(), "attached_assets", "towns_1752864829852.csv");
    const csvContent = fs.readFileSync(csvPath, "utf-8");
    
    // Parse CSV data
    const lines = csvContent.split("\n");
    const locations: LocationData[] = [];
    
    // Skip header line and process data
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const [county, area] = line.split(",");
        if (county && area) {
          locations.push({
            county: county.trim().replace(/^﻿/, ""), // Remove BOM if present
            area: area.trim()
          });
        }
      }
    }
    
    console.log(`Found ${locations.length} location entries`);
    
    // Clear existing data
    await db.delete(kenyanLocations);
    console.log("Cleared existing location data");
    
    // Insert new data in batches
    const batchSize = 100;
    for (let i = 0; i < locations.length; i += batchSize) {
      const batch = locations.slice(i, i + batchSize);
      await db.insert(kenyanLocations).values(batch);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(locations.length / batchSize)}`);
    }
    
    console.log("Kenyan locations import completed successfully!");
    
    // Display summary
    const summary = await db
      .select({
        county: kenyanLocations.county,
        count: db.raw("COUNT(*)")
      })
      .from(kenyanLocations)
      .groupBy(kenyanLocations.county)
      .orderBy(kenyanLocations.county);
    
    console.log("\nLocation summary by county:");
    summary.forEach((row: any) => {
      console.log(`${row.county}: ${row.count} areas`);
    });
    
  } catch (error) {
    console.error("Error importing Kenyan locations:", error);
    process.exit(1);
  }
}

// Run the import
importKenyanLocations().then(() => {
  console.log("Import script completed");
  process.exit(0);
});