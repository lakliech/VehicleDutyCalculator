import { pgTable, text, serial, integer, decimal, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
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

// Tax rates for different vehicle categories (main taxes only)
export const taxRates = pgTable("tax_rates", {
  id: serial("id").primaryKey(),
  vehicleCategory: text("vehicle_category").notNull(),
  importDutyRate: decimal("import_duty_rate", { precision: 5, scale: 4 }).notNull(), // as decimal (0.25 = 25%)
  exciseDutyRate: decimal("excise_duty_rate", { precision: 5, scale: 4 }).notNull(),
  exciseDutyFixed: integer("excise_duty_fixed"), // For motorcycles (fixed amount in KES)
  vatRate: decimal("vat_rate", { precision: 5, scale: 4 }).notNull(),
  effectiveDate: text("effective_date").default("now()").notNull(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Processing fees table for fixed percentage fees like IDF and RDL
export const processingFees = pgTable("processing_fees", {
  id: serial("id").primaryKey(),
  feeType: text("fee_type").notNull(), // 'rdl', 'idf', etc.
  feeName: text("fee_name").notNull(), // 'Railway Development Levy', 'Import Declaration Fee'
  rate: decimal("rate", { precision: 5, scale: 4 }).notNull(), // Fee percentage as decimal (0.015 = 1.5%)
  applicableToImportType: text("applicable_to_import_type").notNull(), // 'direct', 'previouslyRegistered', 'both'
  calculationBase: text("calculation_base").notNull(), // 'customsValue', 'vatValue', etc.
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
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

// Registration fees table based on engine capacity ranges
export const registrationFees = pgTable("registration_fees", {
  id: serial("id").primaryKey(),
  minEngineCapacity: integer("min_engine_capacity").notNull(),
  maxEngineCapacity: integer("max_engine_capacity").notNull(),
  fee: integer("fee").notNull(), // in KES
  description: text("description"),
  createdAt: text("created_at").default("now()").notNull(),
});

// Vehicle transfer rates table
export const vehicleTransferRates = pgTable("vehicle_transfer_rates", {
  id: serial("id").primaryKey(),
  vehicleType: text("vehicle_type").notNull(), // 'vehicle', 'trailer', 'tractor'
  minEngineCapacity: integer("min_engine_capacity"), // null for trailers/tractors
  maxEngineCapacity: integer("max_engine_capacity"), // null for trailers/tractors
  specialType: text("special_type"), // 'trailer_less_than_four_wheels', 'trailer_four_wheels_or_more', 'tractor'
  transferFee: decimal("transfer_fee", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;
export type DepreciationRate = typeof depreciationRates.$inferSelect;
export type TaxRate = typeof taxRates.$inferSelect;
export type ProcessingFee = typeof processingFees.$inferSelect;
export type VehicleCategoryRule = typeof vehicleCategoryRules.$inferSelect;
export type VehicleReference = typeof vehicleReferences.$inferSelect;
export type Trailer = typeof trailers.$inferSelect;
export type HeavyMachinery = typeof heavyMachinery.$inferSelect;
export type RegistrationFee = typeof registrationFees.$inferSelect;
export type VehicleTransferRate = typeof vehicleTransferRates.$inferSelect;
export type DutyCalculation = z.infer<typeof dutyCalculationSchema>;
export type DutyResult = z.infer<typeof dutyResultSchema>;

// Car marketplace tables for selling and buying
export const carListings = pgTable("car_listings", {
  id: serial("id").primaryKey(),
  sellerId: varchar("seller_id", { length: 255 }).notNull(), // User ID from auth system
  title: text("title").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engineSize: integer("engine_size"), // in cc
  mileage: integer("mileage"), // in km
  fuelType: text("fuel_type"), // petrol, diesel, electric, hybrid
  bodyType: text("body_type"), // sedan, hatchback, suv, etc.
  transmission: text("transmission"), // manual, automatic
  color: text("color"),
  condition: text("condition"), // excellent, good, fair, poor
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  negotiable: boolean("negotiable").default(true),
  description: text("description"),
  features: text("features").array(), // Array of features/accessories
  images: text("images").array(), // Array of image URLs
  location: text("location").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  status: text("status").notNull().default("active"), // active, sold, suspended
  isVerified: boolean("is_verified").default(false),
  viewCount: integer("view_count").default(0),
  favoriteCount: integer("favorite_count").default(0),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const carInquiries = pgTable("car_inquiries", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  buyerName: text("buyer_name").notNull(),
  buyerPhone: varchar("buyer_phone", { length: 20 }).notNull(),
  buyerEmail: varchar("buyer_email", { length: 255 }),
  message: text("message"),
  inquiryType: text("inquiry_type").notNull(), // viewing, purchase, finance, trade
  preferredContactMethod: text("preferred_contact_method"), // phone, whatsapp, email
  status: text("status").notNull().default("pending"), // pending, contacted, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const carValuations = pgTable("car_valuations", {
  id: serial("id").primaryKey(),
  registrationNumber: varchar("registration_number", { length: 20 }),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engineSize: integer("engine_size"), // in cc
  mileage: integer("mileage"), // in km
  condition: text("condition").notNull(), // excellent, good, fair, poor
  estimatedValue: decimal("estimated_value", { precision: 12, scale: 2 }),
  sellerName: text("seller_name").notNull(),
  sellerPhone: varchar("seller_phone", { length: 20 }).notNull(),
  sellerEmail: varchar("seller_email", { length: 255 }),
  purpose: text("purpose").notNull(), // selling, insurance, loan, curiosity
  status: text("status").notNull().default("pending"), // pending, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savedSearches = pgTable("saved_searches", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  searchName: text("search_name").notNull(),
  filters: text("filters").notNull(), // JSON string of search filters
  alertEnabled: boolean("alert_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const favoriteListings = pgTable("favorite_listings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schemas for marketplace functionality
export const carListingSchema = createInsertSchema(carListings).omit({
  id: true,
  sellerId: true,
  status: true,
  isVerified: true,
  viewCount: true,
  favoriteCount: true,
  createdAt: true,
  updatedAt: true,
});

export const carInquirySchema = createInsertSchema(carInquiries).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const carValuationSchema = createInsertSchema(carValuations).omit({
  id: true,
  estimatedValue: true,
  status: true,
  createdAt: true,
});

export type CarListing = typeof carListings.$inferSelect;
export type InsertCarListing = z.infer<typeof carListingSchema>;
export type CarInquiry = typeof carInquiries.$inferSelect;
export type InsertCarInquiry = z.infer<typeof carInquirySchema>;
export type CarValuation = typeof carValuations.$inferSelect;
export type InsertCarValuation = z.infer<typeof carValuationSchema>;
export type SavedSearch = typeof savedSearches.$inferSelect;
export type FavoriteListing = typeof favoriteListings.$inferSelect;

// Manual vehicle data for proration
export interface ManualVehicleData {
  make: string;
  model: string;
  engineCapacity: number;
  referenceVehicle: VehicleReference;
  proratedCrsp: number;
}
