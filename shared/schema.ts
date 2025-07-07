import { pgTable, text, serial, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  vehicleCategory: text("vehicle_category").notNull(),
  vehicleValue: decimal("vehicle_value", { precision: 10, scale: 2 }).notNull(),
  engineSize: integer("engine_size"),
  vehicleAge: integer("vehicle_age").notNull(),
  isDirectImport: boolean("is_direct_import").notNull(),
  fuelType: text("fuel_type"),
  createdAt: text("created_at").default("now()").notNull(),
});

export const calculations = pgTable("calculations", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  customsValue: decimal("customs_value", { precision: 10, scale: 2 }).notNull(),
  importDuty: decimal("import_duty", { precision: 10, scale: 2 }).notNull(),
  exciseDuty: decimal("excise_duty", { precision: 10, scale: 2 }).notNull(),
  vat: decimal("vat", { precision: 10, scale: 2 }).notNull(),
  rdl: decimal("rdl", { precision: 10, scale: 2 }).notNull(),
  idfFees: decimal("idf_fees", { precision: 10, scale: 2 }).notNull(),
  totalTaxes: decimal("total_taxes", { precision: 10, scale: 2 }).notNull(),
  depreciationRate: decimal("depreciation_rate", { precision: 5, scale: 4 }).notNull(),
  depreciatedPrice: decimal("depreciated_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: text("created_at").default("now()").notNull(),
});

// Depreciation rates for different import types and age ranges
export const depreciationRates = pgTable("depreciation_rates", {
  id: serial("id").primaryKey(),
  importType: text("import_type").notNull(), // 'direct' or 'previouslyRegistered'
  minYears: decimal("min_years", { precision: 5, scale: 2 }).notNull(),
  maxYears: decimal("max_years", { precision: 5, scale: 2 }).notNull(),
  rate: decimal("rate", { precision: 5, scale: 4 }).notNull(), // Depreciation percentage as decimal (0.05 = 5%)
  description: text("description"),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Tax rates for different vehicle categories
export const taxRates = pgTable("tax_rates", {
  id: serial("id").primaryKey(),
  vehicleCategory: text("vehicle_category").notNull(),
  importDutyRate: decimal("import_duty_rate", { precision: 5, scale: 4 }).notNull(), // as decimal (0.25 = 25%)
  exciseDutyRate: decimal("excise_duty_rate", { precision: 5, scale: 4 }).notNull(),
  exciseDutyFixed: integer("excise_duty_fixed"), // For motorcycles (fixed amount in KES)
  vatRate: decimal("vat_rate", { precision: 5, scale: 4 }).notNull(),
  rdlRate: decimal("rdl_rate", { precision: 5, scale: 4 }), // Railway Development Levy (for direct imports)
  idfRate: decimal("idf_rate", { precision: 5, scale: 4 }), // Import Declaration Fee (for direct imports)
  effectiveDate: text("effective_date").default("now()").notNull(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Vehicle category rules for automatic category detection
export const vehicleCategoryRules = pgTable("vehicle_category_rules", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  minEngineSize: integer("min_engine_size"), // in cc
  maxEngineSize: integer("max_engine_size"), // in cc
  fuelType: text("fuel_type"), // 'petrol', 'diesel', 'electric', null for any
  priority: integer("priority").notNull().default(0), // Higher priority rules are checked first
  description: text("description"),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

export const vehicleReferences = pgTable("vehicle_references", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  engineCapacity: integer("engine_capacity"),
  bodyType: text("body_type"),
  driveConfiguration: text("drive_configuration"),
  seating: text("seating"),
  fuelType: text("fuel_type"),
  gvw: text("gvw"),
  crspKes: decimal("crsp_kes", { precision: 12, scale: 2 }),
  crsp2020: decimal("crsp_2020", { precision: 12, scale: 2 }),
  discontinuationYear: integer("discontinuation_year"),
  createdAt: text("created_at").default("now()").notNull(),
});

// Trailers reference table
export const trailers = pgTable("trailers", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // e.g., "Skeleton Trailer", "Flatbed Trailer"
  specifications: text("specifications"), // e.g., "3 Axel", "3 Axel/ 6.4 Ton"
  make: text("make").notNull(), // e.g., "CMC", "KEHAR", "RANDON"
  crspKes: decimal("crsp_kes", { precision: 12, scale: 2 }).notNull(),
  description: text("description"), // Full description combining type and specs
  createdAt: text("created_at").default("now()").notNull(),
});

// Tractors and heavy machinery reference table
export const heavyMachinery = pgTable("heavy_machinery", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(), // e.g., "MASSEY FERGUSON", "VOLVO CE EQUIPMENTS"
  model: text("model").notNull(), // e.g., "MF-385-2WD", "BACKHOE LOADER(BL61B)"
  powerSpec: text("power_spec"), // Horsepower/CC/KW specification
  powerValue: integer("power_value"), // Extracted numeric power value
  category: text("category"), // e.g., "Tractor", "Excavator", "Wheel Loader"
  driveType: text("drive_type"), // e.g., "2WD", "4WD"
  crspKes: decimal("crsp_kes", { precision: 12, scale: 2 }).notNull(),
  description: text("description"), // Full description
  createdAt: text("created_at").default("now()").notNull(),
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
  createdAt: true,
});

export const dutyCalculationSchema = z.object({
  vehicleCategory: z.enum([
    "under1500cc",
    "over1500cc",
    "largeEngine",
    "electric",
    "schoolBus",
    "primeMover",
    "trailer",
    "ambulance",
    "motorcycle",
    "specialPurpose",
    "heavyMachinery"
  ]),
  vehicleValue: z.number().min(0),
  engineSize: z.number().min(1, "Engine size is required"),
  vehicleAge: z.number().min(0).max(50),
  isDirectImport: z.boolean(),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid", "other"]).optional(),
});

export const dutyResultSchema = z.object({
  currentRetailPrice: z.number(),
  depreciationRate: z.number(),
  depreciatedPrice: z.number(),
  customsValue: z.number(),
  importDuty: z.number(),
  exciseValue: z.number(),
  exciseDuty: z.number(),
  vatValue: z.number(),
  vat: z.number(),
  rdl: z.number(),
  idfFees: z.number(),
  totalTaxes: z.number(),
  registrationFees: z.number(),
  totalPayable: z.number(),
  usedCrsp2020: z.boolean().optional(),
  breakdown: z.array(z.object({
    label: z.string(),
    amount: z.number(),
    description: z.string().optional(),
  })),
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;
export type DepreciationRate = typeof depreciationRates.$inferSelect;
export type TaxRate = typeof taxRates.$inferSelect;
export type VehicleCategoryRule = typeof vehicleCategoryRules.$inferSelect;
export type VehicleReference = typeof vehicleReferences.$inferSelect;
export type Trailer = typeof trailers.$inferSelect;
export type HeavyMachinery = typeof heavyMachinery.$inferSelect;
export type DutyCalculation = z.infer<typeof dutyCalculationSchema>;
export type DutyResult = z.infer<typeof dutyResultSchema>;

// Manual vehicle data for proration
export interface ManualVehicleData {
  make: string;
  model: string;
  engineCapacity: number;
  referenceVehicle: VehicleReference;
  proratedCrsp: number;
}
