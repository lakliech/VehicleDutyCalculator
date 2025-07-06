import { db, pool } from "./db";
import { depreciationRates, taxRates, vehicleCategoryRules } from "@shared/schema";

async function populateComputationTables() {
  console.log("Starting to populate computation tables...");

  try {
    // Clear existing data
    await db.delete(depreciationRates);
    await db.delete(taxRates);
    await db.delete(vehicleCategoryRules);

    // Insert depreciation rates for direct imports
    const directImportRates = [
      { importType: 'direct', minYears: '0', maxYears: '0.5', rate: '0.05', description: '0-6 months: 5%' },
      { importType: 'direct', minYears: '0.5', maxYears: '1', rate: '0.10', description: 'Over 6 months up to 1 year: 10%' },
      { importType: 'direct', minYears: '1', maxYears: '2', rate: '0.15', description: '>1 <=2 years: 15%' },
      { importType: 'direct', minYears: '2', maxYears: '3', rate: '0.20', description: '>2 <=3 years: 20%' },
      { importType: 'direct', minYears: '3', maxYears: '4', rate: '0.30', description: '>3 <=4 years: 30%' },
      { importType: 'direct', minYears: '4', maxYears: '5', rate: '0.40', description: '>4 <=5 years: 40%' },
      { importType: 'direct', minYears: '5', maxYears: '6', rate: '0.50', description: '>5 <=6 years: 50%' },
      { importType: 'direct', minYears: '6.01', maxYears: '6.99', rate: '0.60', description: '>6 <7 years: 60%' },
      { importType: 'direct', minYears: '7', maxYears: '8', rate: '0.65', description: '>=7 <=8 years: 65%' }
    ];

    // Insert depreciation rates for previously registered vehicles
    const previouslyRegisteredRates = [
      { importType: 'previouslyRegistered', minYears: '0', maxYears: '1', rate: '0.20', description: '1 year: 20%' },
      { importType: 'previouslyRegistered', minYears: '1', maxYears: '2', rate: '0.30', description: '2 years: 30%' },
      { importType: 'previouslyRegistered', minYears: '2', maxYears: '3', rate: '0.40', description: '3 years: 40%' },
      { importType: 'previouslyRegistered', minYears: '3', maxYears: '4', rate: '0.50', description: '4 years: 50%' },
      { importType: 'previouslyRegistered', minYears: '4', maxYears: '5', rate: '0.60', description: '5 years: 60%' },
      { importType: 'previouslyRegistered', minYears: '5', maxYears: '6', rate: '0.65', description: '6 years: 65%' },
      { importType: 'previouslyRegistered', minYears: '6', maxYears: '7', rate: '0.70', description: '7 years: 70%' },
      { importType: 'previouslyRegistered', minYears: '7', maxYears: '8', rate: '0.75', description: '8 years: 75%' },
      { importType: 'previouslyRegistered', minYears: '8', maxYears: '9', rate: '0.80', description: '9 years: 80%' },
      { importType: 'previouslyRegistered', minYears: '9', maxYears: '10', rate: '0.85', description: '10 years: 85%' },
      { importType: 'previouslyRegistered', minYears: '10', maxYears: '11', rate: '0.90', description: '11 years: 90%' },
      { importType: 'previouslyRegistered', minYears: '11', maxYears: '12', rate: '0.90', description: '12 years: 90%' },
      { importType: 'previouslyRegistered', minYears: '12', maxYears: '13', rate: '0.90', description: '13 years: 90%' },
      { importType: 'previouslyRegistered', minYears: '13', maxYears: '14', rate: '0.90', description: '14 years: 90%' },
      { importType: 'previouslyRegistered', minYears: '14', maxYears: '15', rate: '0.90', description: '15 years: 90%' },
      { importType: 'previouslyRegistered', minYears: '15', maxYears: '100', rate: '0.95', description: 'Over 15 years: 95%' }
    ];

    await db.insert(depreciationRates).values([...directImportRates, ...previouslyRegisteredRates]);
    console.log("✓ Inserted depreciation rates");

    // Insert tax rates for different vehicle categories
    const taxRateData = [
      { vehicleCategory: 'under1500cc', importDutyRate: '0.25', exciseDutyRate: '0.25', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'over1500cc', importDutyRate: '0.25', exciseDutyRate: '0.30', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'largeEngine', importDutyRate: '0.25', exciseDutyRate: '0.35', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'electric', importDutyRate: '0.10', exciseDutyRate: '0.10', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'schoolBus', importDutyRate: '0.25', exciseDutyRate: '0', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'primeMover', importDutyRate: '0.10', exciseDutyRate: '0.25', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'trailer', importDutyRate: '0.10', exciseDutyRate: '0.25', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'ambulance', importDutyRate: '0', exciseDutyRate: '0.25', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'motorcycle', importDutyRate: '0.25', exciseDutyRate: '0', exciseDutyFixed: 12195, vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'specialPurpose', importDutyRate: '0.25', exciseDutyRate: '0.10', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' },
      { vehicleCategory: 'heavyMachinery', importDutyRate: '0.10', exciseDutyRate: '0.25', vatRate: '0.16', rdlRate: '0.015', idfRate: '0.025' }
    ];

    await db.insert(taxRates).values(taxRateData);
    console.log("✓ Inserted tax rates");

    // Insert vehicle category rules for automatic detection
    const categoryRules = [
      { category: 'electric', fuelType: 'electric', priority: 10, description: 'Electric vehicles' },
      { category: 'largeEngine', minEngineSize: 3001, fuelType: 'petrol', priority: 9, description: 'Petrol engines over 3000cc' },
      { category: 'largeEngine', minEngineSize: 2501, fuelType: 'diesel', priority: 9, description: 'Diesel engines over 2500cc' },
      { category: 'over1500cc', minEngineSize: 1500, maxEngineSize: 3000, fuelType: 'petrol', priority: 5, description: 'Petrol engines 1500-3000cc' },
      { category: 'over1500cc', minEngineSize: 1500, maxEngineSize: 2500, fuelType: 'diesel', priority: 5, description: 'Diesel engines 1500-2500cc' },
      { category: 'under1500cc', maxEngineSize: 1499, priority: 1, description: 'Engines under 1500cc' }
    ];

    await db.insert(vehicleCategoryRules).values(categoryRules);
    console.log("✓ Inserted vehicle category rules");

    console.log("\n✅ All computation tables populated successfully!");

  } catch (error) {
    console.error("Error populating tables:", error);
  } finally {
    await pool.end();
  }
}

// Run the script
populateComputationTables().catch(console.error);