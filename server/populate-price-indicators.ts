import { db } from "./db";
import { priceIndicators } from "@shared/schema";

async function populatePriceIndicators() {
  console.log("Populating price indicators table...");

  try {
    // Clear existing data
    await db.delete(priceIndicators);

    // Insert price indicator ranges
    const indicators = [
      {
        minPercentage: "70.01",
        maxPercentage: null, // No upper limit
        label: "Price is High",
        colorClass: "text-red-600 bg-red-50 border-red-200",
        description: "Price is above 70% of CRSP value",
        isActive: true,
      },
      {
        minPercentage: "50.00",
        maxPercentage: "70.00",
        label: "Competitive Price",
        colorClass: "text-blue-600 bg-blue-50 border-blue-200",
        description: "Price is between 50-70% of CRSP value",
        isActive: true,
      },
      {
        minPercentage: "40.00",
        maxPercentage: "49.99",
        label: "Good Deal",
        colorClass: "text-green-600 bg-green-50 border-green-200",
        description: "Price is between 40-50% of CRSP value",
        isActive: true,
      },
      {
        minPercentage: "0.00",
        maxPercentage: "39.99",
        label: "Be Careful",
        colorClass: "text-orange-600 bg-orange-50 border-orange-200",
        description: "Price is below 40% of CRSP value - verify vehicle condition",
        isActive: true,
      },
    ];

    await db.insert(priceIndicators).values(indicators);

    console.log(`Successfully populated ${indicators.length} price indicators.`);
  } catch (error) {
    console.error("Error populating price indicators:", error);
    throw error;
  }
}

// Run the script if called directly
if (require.main === module) {
  populatePriceIndicators()
    .then(() => {
      console.log("Price indicators population completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to populate price indicators:", error);
      process.exit(1);
    });
}

export { populatePriceIndicators };