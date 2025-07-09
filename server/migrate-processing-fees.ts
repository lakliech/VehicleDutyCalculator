import { db } from "./db";
import { processingFees, taxRates } from "@shared/schema";
import { eq } from "drizzle-orm";

async function migrateProcessingFees() {
  console.log("Starting processing fees migration...");

  try {
    // Insert standard processing fees
    const feesToInsert = [
      {
        feeType: 'rdl',
        feeName: 'Railway Development Levy',
        rate: '0.015', // 1.5%
        applicableToImportType: 'direct',
        calculationBase: 'customsValue',
        description: 'Infrastructure development fee for railways - 1.5% of customs value',
        isActive: true,
      },
      {
        feeType: 'idf',
        feeName: 'Import Declaration Fee',
        rate: '0.025', // 2.5%
        applicableToImportType: 'direct',
        calculationBase: 'customsValue', 
        description: 'Processing fee for import documentation - 2.5% of customs value',
        isActive: true,
      }
    ];

    for (const fee of feesToInsert) {
      // Check if fee already exists
      const existing = await db
        .select()
        .from(processingFees)
        .where(eq(processingFees.feeType, fee.feeType))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(processingFees).values(fee);
        console.log(`✅ Inserted ${fee.feeName} (${fee.feeType})`);
      } else {
        console.log(`⚠️  ${fee.feeName} already exists, skipping`);
      }
    }

    console.log("✅ Processing fees migration completed successfully");

  } catch (error) {
    console.error("❌ Error during processing fees migration:", error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProcessingFees()
    .then(() => {
      console.log("Migration completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

export { migrateProcessingFees };