import { users, type User, type InsertUser, dutyRates, type DutyRate, type DutyCalculation, type DutyResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getDutyRates(): Promise<DutyRate[]>;
  getDutyRateByVehicleType(vehicleType: string): Promise<DutyRate | undefined>;
  calculateDuty(calculation: DutyCalculation): Promise<DutyResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private dutyRatesData: Map<string, DutyRate>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.dutyRatesData = new Map();
    this.currentId = 1;
    this.initializeDutyRates();
  }

  private initializeDutyRates() {
    const rates: DutyRate[] = [
      {
        id: 1,
        vehicleType: "car",
        baseFee: "350.00",
        valueRate: "0.0700",
        engineSurchargeRate: "0.0125",
      },
      {
        id: 2,
        vehicleType: "motorcycle",
        baseFee: "150.00",
        valueRate: "0.0500",
        engineSurchargeRate: "0.0050",
      },
      {
        id: 3,
        vehicleType: "truck",
        baseFee: "500.00",
        valueRate: "0.0800",
        engineSurchargeRate: "0.0200",
      },
      {
        id: 4,
        vehicleType: "suv",
        baseFee: "400.00",
        valueRate: "0.0750",
        engineSurchargeRate: "0.0150",
      },
      {
        id: 5,
        vehicleType: "van",
        baseFee: "375.00",
        valueRate: "0.0725",
        engineSurchargeRate: "0.0140",
      },
      {
        id: 6,
        vehicleType: "bus",
        baseFee: "750.00",
        valueRate: "0.0900",
        engineSurchargeRate: "0.0250",
      },
    ];

    rates.forEach(rate => {
      this.dutyRatesData.set(rate.vehicleType, rate);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDutyRates(): Promise<DutyRate[]> {
    return Array.from(this.dutyRatesData.values());
  }

  async getDutyRateByVehicleType(vehicleType: string): Promise<DutyRate | undefined> {
    return this.dutyRatesData.get(vehicleType);
  }

  async calculateDuty(calculation: DutyCalculation): Promise<DutyResult> {
    const rate = await this.getDutyRateByVehicleType(calculation.vehicleType);
    
    if (!rate) {
      throw new Error(`No duty rate found for vehicle type: ${calculation.vehicleType}`);
    }

    const baseFee = parseFloat(rate.baseFee);
    const valueRate = parseFloat(rate.valueRate);
    const engineSurchargeRate = parseFloat(rate.engineSurchargeRate || "0");

    // Calculate value-based duty
    const valueDuty = calculation.vehicleValue * valueRate;

    // Calculate engine surcharge (per 100cc above 1000cc)
    let engineSurcharge = 0;
    if (calculation.engineSize > 1000) {
      const excessCC = calculation.engineSize - 1000;
      const surchargeUnits = Math.ceil(excessCC / 100);
      engineSurcharge = surchargeUnits * (calculation.vehicleValue * engineSurchargeRate);
    }

    // Calculate age discount (5% per year after 3 years, max 25%)
    let ageDiscount = 0;
    if (calculation.vehicleAge > 3) {
      const discountYears = Math.min(calculation.vehicleAge - 3, 5);
      ageDiscount = (baseFee + valueDuty + engineSurcharge) * (discountYears * 0.05);
    }

    // Commercial usage surcharge (10%)
    let commercialSurcharge = 0;
    if (calculation.usage === "commercial") {
      commercialSurcharge = (baseFee + valueDuty + engineSurcharge) * 0.10;
    }

    // Electric vehicle discount (20%)
    let electricDiscount = 0;
    if (calculation.fuelType === "electric") {
      electricDiscount = (baseFee + valueDuty + engineSurcharge) * 0.20;
    }

    // Hybrid vehicle discount (10%)
    let hybridDiscount = 0;
    if (calculation.fuelType === "hybrid") {
      hybridDiscount = (baseFee + valueDuty + engineSurcharge) * 0.10;
    }

    const totalDuty = Math.max(0, baseFee + valueDuty + engineSurcharge + commercialSurcharge - ageDiscount - electricDiscount - hybridDiscount);

    const breakdown = [
      {
        label: "Base Registration Fee",
        amount: baseFee,
        description: "Fixed fee based on vehicle type"
      },
      {
        label: `Value-based Duty (${(valueRate * 100).toFixed(1)}%)`,
        amount: valueDuty,
        description: "Calculated on vehicle market value"
      }
    ];

    if (engineSurcharge > 0) {
      breakdown.push({
        label: "Engine Size Surcharge",
        amount: engineSurcharge,
        description: "Additional fee for large engines"
      });
    }

    if (commercialSurcharge > 0) {
      breakdown.push({
        label: "Commercial Use Surcharge (10%)",
        amount: commercialSurcharge,
        description: "Additional fee for commercial vehicles"
      });
    }

    if (ageDiscount > 0) {
      breakdown.push({
        label: "Age Discount",
        amount: -ageDiscount,
        description: "Discount for older vehicles"
      });
    }

    if (electricDiscount > 0) {
      breakdown.push({
        label: "Electric Vehicle Discount (20%)",
        amount: -electricDiscount,
        description: "Environmental incentive"
      });
    }

    if (hybridDiscount > 0) {
      breakdown.push({
        label: "Hybrid Vehicle Discount (10%)",
        amount: -hybridDiscount,
        description: "Environmental incentive"
      });
    }

    return {
      baseFee,
      valueDuty,
      engineSurcharge,
      ageDiscount,
      totalDuty,
      breakdown
    };
  }
}

export const storage = new MemStorage();
