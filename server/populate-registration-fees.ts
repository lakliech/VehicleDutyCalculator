import { db } from "./db";
import { registrationFees } from "@shared/schema";

const feeRanges = [
  { min: 0, max: 1000, fee: 7360, description: "0-1000cc vehicles" },
  { min: 1001, max: 1250, fee: 8490, description: "1001-1250cc vehicles" },
  { min: 1251, max: 1500, fee: 9365, description: "1251-1500cc vehicles" },
  { min: 1501, max: 1750, fee: 10710, description: "1501-1750cc vehicles" },
  { min: 1751, max: 2000, fee: 11995, description: "1751-2000cc vehicles" },
  { min: 2001, max: 2500, fee: 15445, description: "2001-2500cc vehicles" },
  { min: 2501, max: 3000, fee: 18755, description: "2501-3000cc vehicles" },
  { min: 3001, max: 50000, fee: 21215, description: "3000cc and above vehicles" },
];

async function populateRegistrationFees() {
  try {
    console.log("Clearing existing registration fees...");
    await db.delete(registrationFees);

    console.log("Inserting new registration fee structure...");
    for (const range of feeRanges) {
      await db.insert(registrationFees).values({
        minEngineCapacity: range.min,
        maxEngineCapacity: range.max,
        fee: range.fee,
        description: range.description,
      });
      console.log(`Added fee range: ${range.min}-${range.max}cc = KES ${range.fee.toLocaleString()}`);
    }

    console.log("✅ Registration fees populated successfully!");
  } catch (error) {
    console.error("❌ Error populating registration fees:", error);
    process.exit(1);
  }
}

// Run if this file is executed directly
populateRegistrationFees()
  .then(() => process.exit(0))
  .catch(console.error);

export { populateRegistrationFees };