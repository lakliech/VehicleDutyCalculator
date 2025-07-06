import { vehicles, calculations, type Vehicle, type Calculation, type InsertVehicle, type InsertCalculation, type DutyCalculation, type DutyResult } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  calculateDuty(calculation: DutyCalculation): Promise<DutyResult>;
  saveCalculation(vehicleData: InsertVehicle, calculationData: Omit<InsertCalculation, 'vehicleId'>): Promise<{ vehicle: Vehicle; calculation: Calculation }>;
  getCalculationHistory(limit?: number): Promise<Array<Vehicle & { calculation: Calculation }>>;
}

export class DatabaseStorage implements IStorage {
  private directImportDepreciation: Array<{ minYears: number; maxYears: number; rate: number }>;
  private previouslyRegisteredDepreciation: Array<{ years: number; rate: number }>;

  constructor() {
    // Depreciation rates for direct imports (updated to match KRA rates)
    this.directImportDepreciation = [
      { minYears: 0, maxYears: 0.5, rate: 0.05 },   // 0-6 months: 5%
      { minYears: 0.5, maxYears: 1, rate: 0.10 },   // Over 6 months: 10%
      { minYears: 1, maxYears: 2, rate: 0.15 },     // >1 <=2 years: 15%
      { minYears: 2, maxYears: 3, rate: 0.20 },     // >2 <=3 years: 20%
      { minYears: 3, maxYears: 4, rate: 0.30 },     // >3 <=4 years: 30%
      { minYears: 4, maxYears: 5, rate: 0.40 },     // >4 <=5 years: 40%
      { minYears: 5, maxYears: 6, rate: 0.50 },     // >5 <=6 years: 50%
      { minYears: 6, maxYears: 7, rate: 0.60 },     // >6 <=7 years: 60%
      { minYears: 7, maxYears: 8, rate: 0.65 }      // >7 <=8 years: 65%
    ];

    // Depreciation rates for previously registered vehicles
    this.previouslyRegisteredDepreciation = [
      { years: 1, rate: 0.2 },
      { years: 2, rate: 0.35 },
      { years: 3, rate: 0.5 },
      { years: 4, rate: 0.6 },
      { years: 5, rate: 0.7 },
      { years: 6, rate: 0.75 },
      { years: 7, rate: 0.8 },
      { years: 8, rate: 0.83 },
      { years: 9, rate: 0.86 },
      { years: 10, rate: 0.89 },
      { years: 11, rate: 0.9 },
      { years: 12, rate: 0.91 },
      { years: 13, rate: 0.92 },
      { years: 14, rate: 0.93 },
      { years: 15, rate: 0.94 },
      { years: 16, rate: 0.95 } // For over 15 years
    ];
  }

  // Get depreciation rate based on vehicle type and age
  private getDepreciationRate(vehicleType: 'direct' | 'previouslyRegistered', ageYears: number): number {
    if (vehicleType === 'direct') {
      // Find the appropriate depreciation rate based on age range
      for (const range of this.directImportDepreciation) {
        if (ageYears > range.minYears && ageYears <= range.maxYears) {
          return range.rate;
        }
      }
      // For vehicles older than 8 years, apply maximum depreciation
      if (ageYears > 8) {
        return 0.65; // Maximum depreciation rate for direct imports
      }
      return 0; // No depreciation for brand new vehicles
    } else if (vehicleType === 'previouslyRegistered') {
      for (const item of this.previouslyRegisteredDepreciation) {
        if (ageYears <= item.years) {
          return item.rate;
        }
      }
      return this.previouslyRegisteredDepreciation[this.previouslyRegisteredDepreciation.length - 1].rate;
    }
    return 0;
  }

  async calculateDuty(calculation: DutyCalculation): Promise<DutyResult> {
    const { vehicleCategory, vehicleValue, vehicleAge, isDirectImport } = calculation;

    // Apply depreciation
    const depreciationRate = this.getDepreciationRate(
      isDirectImport ? 'direct' : 'previouslyRegistered',
      vehicleAge
    );
    const depreciatedPrice = vehicleValue * (1 - depreciationRate);

    // Initialize result object
    const result: DutyResult = {
      currentRetailPrice: vehicleValue,
      depreciationRate: depreciationRate,
      depreciatedPrice: depreciatedPrice,
      customsValue: 0,
      importDuty: 0,
      exciseValue: 0,
      exciseDuty: 0,
      vatValue: 0,
      vat: 0,
      rdl: 0,
      idfFees: 0,
      totalTaxes: 0,
      breakdown: []
    };

    // Calculate based on vehicle category
    switch (vehicleCategory) {
      case 'under1500cc':
        result.customsValue = depreciatedPrice * 0.45977;
        result.importDuty = result.customsValue * 0.35;
        result.exciseValue = result.customsValue + result.importDuty;
        result.exciseDuty = result.exciseValue * 0.2;
        result.vatValue = result.exciseValue + result.exciseDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0069;
        result.idfFees = result.vatValue * 0.0115;
        break;

      case 'over1500cc':
        result.customsValue = depreciatedPrice * 0.45977;
        result.importDuty = result.customsValue * 0.35;
        result.exciseValue = result.customsValue + result.importDuty;
        result.exciseDuty = result.exciseValue * 0.25;
        result.vatValue = result.exciseValue + result.exciseDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0069;
        result.idfFees = result.vatValue * 0.0115;
        break;

      case 'largeEngine':
        // For petrol >3000cc or diesel >2500cc
        result.customsValue = depreciatedPrice * 0.4244;
        result.importDuty = result.customsValue * 0.35;
        result.exciseValue = result.customsValue + result.importDuty;
        result.exciseDuty = result.exciseValue * 0.35;
        result.vatValue = result.exciseValue + result.exciseDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0064;
        result.idfFees = result.vatValue * 0.0106;
        break;

      case 'electric':
        result.customsValue = depreciatedPrice * 0.45977;
        result.importDuty = result.customsValue * 0.25;
        result.exciseValue = result.customsValue + result.importDuty;
        result.exciseDuty = result.exciseValue * 0.1;
        result.vatValue = result.exciseValue + result.exciseDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0069;
        result.idfFees = result.vatValue * 0.0115;
        break;

      case 'schoolBus':
        result.customsValue = depreciatedPrice * 0.45977;
        result.importDuty = result.customsValue * 0.35;
        result.exciseValue = result.customsValue + result.importDuty;
        result.exciseDuty = result.exciseValue * 0.25;
        result.vatValue = result.exciseValue + result.exciseDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0069;
        result.idfFees = result.vatValue * 0.0115;
        break;

      case 'primeMover':
        result.customsValue = depreciatedPrice * 0.62696;
        result.importDuty = result.customsValue * 0.25;
        result.exciseValue = 0;
        result.exciseDuty = 0;
        result.vatValue = result.customsValue + result.importDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0094;
        result.idfFees = result.vatValue * 0.0157;
        break;

      case 'trailer':
        result.customsValue = depreciatedPrice * 0.62696;
        result.importDuty = isDirectImport ? result.customsValue * 0.35 : result.customsValue * 0.36;
        result.exciseValue = 0;
        result.exciseDuty = 0;
        result.vatValue = result.customsValue + result.importDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0094;
        result.idfFees = result.vatValue * 0.0157;
        break;

      case 'ambulance':
        result.customsValue = depreciatedPrice * 0.57471;
        result.importDuty = 0;
        result.exciseValue = result.customsValue;
        result.exciseDuty = result.exciseValue * 0.25;
        result.vatValue = result.exciseValue + result.exciseDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0086;
        result.idfFees = result.vatValue * 0.0144;
        break;

      case 'motorcycle':
        result.customsValue = depreciatedPrice * 0.55172;
        result.importDuty = result.customsValue * 0.25;
        result.exciseValue = 0;
        result.exciseDuty = 12952.83; // Fixed amount
        result.vatValue = result.customsValue + result.importDuty + result.exciseDuty;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0083;
        result.idfFees = result.vatValue * 0.0138;
        break;

      case 'specialPurpose':
        result.customsValue = depreciatedPrice * 0.68966;
        result.importDuty = 0;
        result.exciseValue = 0;
        result.exciseDuty = 0;
        result.vatValue = isDirectImport ? result.customsValue : 0;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0103;
        result.idfFees = result.vatValue * 0.0172;
        break;

      case 'heavyMachinery':
        result.customsValue = isDirectImport ? depreciatedPrice * 0.68966 : 800;
        result.importDuty = 0;
        result.exciseValue = 0;
        result.exciseDuty = 0;
        result.vatValue = 800;
        result.vat = result.vatValue * 0.16;
        result.rdl = result.vatValue * 0.0103;
        result.idfFees = result.vatValue * 0.0172;
        break;

      default:
        throw new Error('Unknown vehicle category');
    }

    // Calculate total taxes
    if (isDirectImport) {
      result.totalTaxes = result.importDuty + result.exciseDuty + result.vat + result.rdl + result.idfFees;
    } else {
      result.totalTaxes = result.importDuty + result.exciseDuty + result.vat;
    }

    // Build breakdown
    result.breakdown = [];
    
    if (depreciationRate > 0) {
      result.breakdown.push({
        label: `Depreciation (${(depreciationRate * 100).toFixed(0)}%)`,
        amount: -(vehicleValue - depreciatedPrice),
        description: `${isDirectImport ? 'Direct import' : 'Previously registered'} vehicle ${vehicleAge} years old`
      });
    }

    if (result.importDuty > 0) {
      result.breakdown.push({
        label: "Import Duty",
        amount: result.importDuty,
        description: "Customs duty on imported vehicles"
      });
    }

    if (result.exciseDuty > 0) {
      result.breakdown.push({
        label: "Excise Duty",
        amount: result.exciseDuty,
        description: vehicleCategory === 'motorcycle' ? "Fixed excise duty for motorcycles" : "Excise tax based on vehicle type"
      });
    }

    if (result.vat > 0) {
      result.breakdown.push({
        label: "VAT (16%)",
        amount: result.vat,
        description: "Value Added Tax"
      });
    }

    if (isDirectImport) {
      if (result.rdl > 0) {
        result.breakdown.push({
          label: "Railway Development Levy",
          amount: result.rdl,
          description: "RDL for infrastructure development"
        });
      }

      if (result.idfFees > 0) {
        result.breakdown.push({
          label: "Import Declaration Fee",
          amount: result.idfFees,
          description: "IDF processing fee"
        });
      }
    }

    // Round all values to 2 decimal places
    for (const key in result) {
      if (typeof result[key as keyof DutyResult] === 'number') {
        (result as any)[key] = Math.round((result as any)[key] * 100) / 100;
      }
    }

    // Round breakdown amounts
    result.breakdown = result.breakdown.map(item => ({
      ...item,
      amount: Math.round(item.amount * 100) / 100
    }));

    return result;
  }

  async saveCalculation(vehicleData: InsertVehicle, calculationData: Omit<InsertCalculation, 'vehicleId'>): Promise<{ vehicle: Vehicle; calculation: Calculation }> {
    try {
      // Insert vehicle first
      const [vehicle] = await db
        .insert(vehicles)
        .values(vehicleData)
        .returning();

      // Insert calculation with vehicle ID
      const [calculation] = await db
        .insert(calculations)
        .values({
          ...calculationData,
          vehicleId: vehicle.id,
        })
        .returning();

      return { vehicle, calculation };
    } catch (error) {
      console.error("Failed to save calculation:", error);
      throw new Error("Failed to save calculation to database");
    }
  }

  async getCalculationHistory(limit: number = 10): Promise<Array<Vehicle & { calculation: Calculation }>> {
    try {
      const results = await db
        .select()
        .from(vehicles)
        .leftJoin(calculations, eq(vehicles.id, calculations.vehicleId))
        .orderBy(vehicles.createdAt)
        .limit(limit);

      return results
        .filter(result => result.calculations) // Only return vehicles that have calculations
        .map(result => ({
          ...result.vehicles,
          calculation: result.calculations!,
        }));
    } catch (error) {
      console.error("Failed to fetch calculation history:", error);
      throw new Error("Failed to fetch calculation history");
    }
  }
}

export const storage = new DatabaseStorage();
