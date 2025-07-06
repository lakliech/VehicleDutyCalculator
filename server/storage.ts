import { vehicles, calculations, depreciationRates, taxRates, vehicleCategoryRules, type Vehicle, type Calculation, type InsertVehicle, type InsertCalculation, type DutyCalculation, type DutyResult, type DepreciationRate, type TaxRate, type VehicleCategoryRule } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, or, desc, sql } from "drizzle-orm";

export interface IStorage {
  calculateDuty(calculation: DutyCalculation): Promise<DutyResult>;
  saveCalculation(vehicleData: InsertVehicle, calculationData: Omit<InsertCalculation, 'vehicleId'>): Promise<{ vehicle: Vehicle; calculation: Calculation }>;
  getCalculationHistory(limit?: number): Promise<Array<Vehicle & { calculation: Calculation }>>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Depreciation rates and tax rates are now stored in the database
  }

  // Get depreciation rate based on vehicle type and age from database
  private async getDepreciationRate(vehicleType: 'direct' | 'previouslyRegistered', ageYears: number): Promise<number> {
    const rates = await db
      .select()
      .from(depreciationRates)
      .where(
        and(
          eq(depreciationRates.importType, vehicleType),
          sql`CAST(${depreciationRates.minYears} AS DECIMAL) <= ${ageYears}`,
          sql`CAST(${depreciationRates.maxYears} AS DECIMAL) >= ${ageYears}`
        )
      )
      .limit(1);

    if (rates.length > 0) {
      return Number(rates[0].rate);
    }

    // Fallback for edge cases
    if (vehicleType === 'direct' && ageYears > 8) {
      return 0.65;
    } else if (vehicleType === 'previouslyRegistered' && ageYears > 15) {
      return 0.95;
    }
    
    return 0;
  }

  async calculateDuty(calculation: DutyCalculation): Promise<DutyResult> {
    const { vehicleCategory, vehicleValue, vehicleAge, isDirectImport, engineSize } = calculation;

    // Apply depreciation
    const depreciationRate = await this.getDepreciationRate(
      isDirectImport ? 'direct' : 'previouslyRegistered',
      vehicleAge
    );
    const depreciatedPrice = vehicleValue * (1 - depreciationRate);

    // Get tax rates for the vehicle category
    const taxRateData = await db
      .select()
      .from(taxRates)
      .where(eq(taxRates.vehicleCategory, vehicleCategory))
      .limit(1);

    if (taxRateData.length === 0) {
      throw new Error(`Tax rates not found for vehicle category: ${vehicleCategory}`);
    }

    const taxRate = taxRateData[0];

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
      registrationFees: 0,
      totalPayable: 0,
      breakdown: []
    };

    // Calculate using database tax rates
    // Determine customs value based on category
    const customsValueRate = vehicleCategory === 'largeEngine' ? 0.4244 : 
                           vehicleCategory === 'primeMover' || vehicleCategory === 'trailer' ? 0.62696 : 
                           0.45977;
    
    result.customsValue = depreciatedPrice * customsValueRate;
    
    // Apply import duty from database
    result.importDuty = result.customsValue * Number(taxRate.importDutyRate);
    
    // Calculate excise value and duty
    if (vehicleCategory === 'primeMover' || vehicleCategory === 'trailer') {
      result.exciseValue = 0;
      result.exciseDuty = 0;
      result.vatValue = result.customsValue + result.importDuty;
    } else {
      result.exciseValue = result.customsValue + result.importDuty;
      
      // Apply excise duty (either percentage or fixed amount for motorcycles)
      if (vehicleCategory === 'motorcycle' && taxRate.exciseDutyFixed) {
        result.exciseDuty = taxRate.exciseDutyFixed;
      } else {
        result.exciseDuty = result.exciseValue * Number(taxRate.exciseDutyRate);
      }
      
      result.vatValue = result.exciseValue + result.exciseDuty;
    }
    
    // Apply VAT
    result.vat = result.vatValue * Number(taxRate.vatRate);
    
    // Apply RDL and IDF only for direct imports
    if (isDirectImport && taxRate.rdlRate && taxRate.idfRate) {
      result.rdl = result.vatValue * Number(taxRate.rdlRate);
      result.idfFees = result.vatValue * Number(taxRate.idfRate);
    } else {
      result.rdl = 0;
      result.idfFees = 0;
    }

    // Calculate registration fees based on engine size
    result.registrationFees = engineSize < 2000 ? 10000 : 13000;

    // Calculate total taxes
    if (isDirectImport) {
      result.totalTaxes = result.importDuty + result.exciseDuty + result.vat + result.rdl + result.idfFees;
    } else {
      result.totalTaxes = result.importDuty + result.exciseDuty + result.vat;
    }

    // Calculate total payable including registration fees
    result.totalPayable = result.totalTaxes + result.registrationFees;

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

    // Add registration fees to breakdown
    if (result.registrationFees > 0) {
      result.breakdown.push({
        label: "Registration Fees (Estimate)",
        amount: result.registrationFees,
        description: `Estimated registration fees for ${engineSize < 2000 ? 'vehicles below 2000cc' : 'vehicles 2000cc and above'}`
      });
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
