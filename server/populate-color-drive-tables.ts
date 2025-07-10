import { db } from './db';
import { vehicleColors, driveConfigurations } from '@shared/schema';

const exteriorColors = [
  "White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", 
  "Orange", "Brown", "Purple", "Pink", "Gold", "Beige", "Maroon", "Navy Blue",
  "Pearl White", "Metallic Gray", "Dark Blue", "Burgundy", "Bronze", "Champagne",
  "Metallic Silver", "Metallic Blue", "Metallic Red", "Matte Black", "Cream"
];

const interiorColors = [
  "Black", "Gray", "Beige", "Brown", "Tan", "Cream", "Charcoal", "Ivory", 
  "Red", "Blue", "White", "Camel", "Dark Gray", "Light Gray", "Saddle Brown"
];

const driveConfigOptions = [
  { configName: "2wd", displayName: "2WD", description: "Two Wheel Drive - Front or rear wheels are powered" },
  { configName: "4wd", displayName: "4WD", description: "Four Wheel Drive - All four wheels can be powered, typically for off-road use" },
  { configName: "awd", displayName: "AWD", description: "All Wheel Drive - All four wheels are continuously powered" }
];

async function populateColorAndDriveTables() {
  try {
    console.log("Populating vehicle colors...");
    
    // Insert exterior colors
    for (const color of exteriorColors) {
      await db.insert(vehicleColors).values({
        colorName: color,
        colorType: 'exterior',
        isActive: true
      }).onConflictDoNothing();
    }
    
    // Insert interior colors
    for (const color of interiorColors) {
      await db.insert(vehicleColors).values({
        colorName: color,
        colorType: 'interior',
        isActive: true
      }).onConflictDoNothing();
    }
    
    console.log("Populating drive configurations...");
    
    // Insert drive configurations
    for (const config of driveConfigOptions) {
      await db.insert(driveConfigurations).values({
        configName: config.configName,
        displayName: config.displayName,
        description: config.description,
        isActive: true
      }).onConflictDoNothing();
    }
    
    console.log("✓ Successfully populated color and drive configuration tables");
    
  } catch (error) {
    console.error("Error populating tables:", error);
    throw error;
  }
}

// Run the script if called directly
populateColorAndDriveTables()
  .then(() => {
    console.log("Population completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Population failed:", error);
    process.exit(1);
  });

export { populateColorAndDriveTables };