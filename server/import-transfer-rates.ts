import { db } from "./db";
import { vehicleTransferRates } from "@shared/schema";

interface TransferRate {
  vehicleType: string;
  minEngineCapacity: number | null;
  maxEngineCapacity: number | null;
  specialType: string | null;
  transferFee: number;
  description: string;
}

async function importTransferRates() {
  console.log("Importing vehicle transfer rates...");
  
  const transferRatesData: TransferRate[] = [
    {
      vehicleType: "vehicle",
      minEngineCapacity: 0,
      maxEngineCapacity: 1000,
      specialType: null,
      transferFee: 2210,
      description: "1000cc & below"
    },
    {
      vehicleType: "vehicle",
      minEngineCapacity: 1001,
      maxEngineCapacity: 1200,
      specialType: null,
      transferFee: 2440,
      description: "1001-1200cc"
    },
    {
      vehicleType: "vehicle",
      minEngineCapacity: 1201,
      maxEngineCapacity: 1500,
      specialType: null,
      transferFee: 2615,
      description: "1201-1500cc"
    },
    {
      vehicleType: "vehicle",
      minEngineCapacity: 1501,
      maxEngineCapacity: 1700,
      specialType: null,
      transferFee: 2960,
      description: "1501-1700cc"
    },
    {
      vehicleType: "vehicle",
      minEngineCapacity: 1701,
      maxEngineCapacity: 2000,
      specialType: null,
      transferFee: 3245,
      description: "1701-2000cc"
    },
    {
      vehicleType: "vehicle",
      minEngineCapacity: 2001,
      maxEngineCapacity: 2500,
      specialType: null,
      transferFee: 4395,
      description: "2001-2500cc"
    },
    {
      vehicleType: "vehicle",
      minEngineCapacity: 2501,
      maxEngineCapacity: 3000,
      specialType: null,
      transferFee: 5505,
      description: "2501-3000cc"
    },
    {
      vehicleType: "vehicle",
      minEngineCapacity: 3001,
      maxEngineCapacity: 999999,
      specialType: null,
      transferFee: 6465,
      description: "3001 and above"
    },
    {
      vehicleType: "trailer",
      minEngineCapacity: null,
      maxEngineCapacity: null,
      specialType: "trailer_less_than_four_wheels",
      transferFee: 1580,
      description: "A trailer less than four wheels"
    },
    {
      vehicleType: "trailer",
      minEngineCapacity: null,
      maxEngineCapacity: null,
      specialType: "trailer_four_wheels_or_more",
      transferFee: 2240,
      description: "A trailer with four wheels or more"
    },
    {
      vehicleType: "tractor",
      minEngineCapacity: null,
      maxEngineCapacity: null,
      specialType: "tractor",
      transferFee: 1580,
      description: "Tractor"
    }
  ];

  // Clear existing transfer rates
  await db.delete(vehicleTransferRates);

  // Insert new transfer rates
  await db.insert(vehicleTransferRates).values(transferRatesData);

  console.log(`Successfully imported ${transferRatesData.length} transfer rates`);
}

// Run if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  importTransferRates()
    .then(() => {
      console.log("Transfer rates import completed");
      process.exit(0);
    })
    .catch(error => {
      console.error("Error importing transfer rates:", error);
      process.exit(1);
    });
}

export { importTransferRates };