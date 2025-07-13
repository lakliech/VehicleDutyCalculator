import { pgTable, text, serial, integer, decimal, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
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
  driveConfiguration: text("drive_configuration"), // 2wd, 4wd, awd
  exteriorColor: text("exterior_color"),
  interiorColor: text("interior_color"),
  condition: text("condition"), // excellent, good, fair, poor
  vinNumber: text("vin_number"), // VIN/Chassis number
  registrationNumber: text("registration_number"), // Vehicle registration number
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  negotiable: boolean("negotiable").default(true),
  description: text("description"),
  features: text("features").array(), // Array of features/accessories
  images: text("images").array(), // Array of image URLs
  videos: text("videos").array(), // Array of video URLs
  documents: json("documents").$type<Array<{url: string; name: string; type: 'logbook' | 'inspection' | 'ownership' | 'other'}>>(), // Array of document objects
  location: text("location").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  status: text("status").notNull().default("active"), // active, sold, suspended, archived
  isVerified: boolean("is_verified").default(false),
  viewCount: integer("view_count").default(0),
  favoriteCount: integer("favorite_count").default(0),
  featured: boolean("featured").default(false),
  // Enhanced listing management fields
  isFlagged: boolean("is_flagged").default(false),
  flagReason: text("flag_reason"),
  flaggedAt: timestamp("flagged_at"),
  flaggedBy: varchar("flagged_by", { length: 255 }),
  soldAt: timestamp("sold_at"),
  soldBy: varchar("sold_by", { length: 255 }),
  archivedAt: timestamp("archived_at"),
  archivedBy: varchar("archived_by", { length: 255 }),
  // Admin meta fields
  expirationDate: timestamp("expiration_date"),
  listingSource: text("listing_source").default("user-submitted"), // user-submitted, agent, walk-in, api-imported
  verifiedBadgeType: text("verified_badge_type"), // trusted-seller, dealer, agent
  adminNotes: text("admin_notes"),
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

export const carComparisons = pgTable("car_comparisons", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  listingIds: text("listing_ids").array().notNull(), // Array of listing IDs
  comparisonName: text("comparison_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reference tables for vehicle options
export const vehicleColors = pgTable("vehicle_colors", {
  id: serial("id").primaryKey(),
  colorName: text("color_name").notNull().unique(),
  colorType: text("color_type").notNull(), // 'exterior' or 'interior'
  hexCode: varchar("hex_code", { length: 7 }), // Optional hex color code
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const driveConfigurations = pgTable("drive_configurations", {
  id: serial("id").primaryKey(),
  configName: text("config_name").notNull().unique(),
  displayName: text("display_name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
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
}).extend({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  price: z.number().min(50000, "Price must be at least 50,000 KES"),
});

// Schema for admin updates with comprehensive vehicle details
export const adminUpdateListingSchema = z.object({
  // Basic fields
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().min(1, "Price must be greater than 0").optional(),
  negotiable: z.boolean().optional(),
  location: z.string().min(1, "Location is required").optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(['pending', 'active', 'verified', 'rejected', 'archived']).optional(),
  featured: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  sellerId: z.string().optional(), // For reassigning to another user
  
  // Vehicle details
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.coerce.number().min(1990).max(new Date().getFullYear()).optional(),
  mileage: z.coerce.number().min(0).optional(),
  transmission: z.enum(['automatic', 'manual', 'cvt']).optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  fuelType: z.enum(['petrol', 'diesel', 'hybrid', 'electric']).optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  engineSize: z.coerce.number().min(1).optional().nullable().transform(val => val === null ? undefined : val),
  driveConfiguration: z.enum(['2WD', '4WD', 'AWD']).optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  bodyType: z.enum(['sedan', 'suv', 'hatchback', 'wagon', 'coupe', 'convertible', 'pickup', 'van', 'minivan']).optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  exteriorColor: z.string().optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  interiorColor: z.string().optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  condition: z.enum(['new', 'used', 'locally-used', 'foreign-used']).optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  vinNumber: z.string().optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
  registrationNumber: z.string().optional().or(z.literal('')).transform(val => val === '' ? undefined : val),
});

// Schema for admin meta field updates
export const adminMetaUpdateSchema = z.object({
  status: z.enum(['pending', 'active', 'inactive', 'rejected', 'archived']).optional(),
  featured: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  expirationDate: z.string().nullable().optional(), // ISO date string or null
  listingSource: z.enum(['user-submitted', 'agent', 'walk-in', 'api-imported']).optional(),
  sellerId: z.string().optional(), // For reassigning
  adminNotes: z.string().nullable().optional(), // Allow null/empty strings
});

// Schema for media management operations
export const mediaManagementSchema = z.object({
  action: z.enum(['upload', 'delete', 'reorder', 'set_featured', 'upload_video', 'delete_video', 'upload_document', 'delete_document']),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  documents: z.array(z.object({
    url: z.string(),
    name: z.string(),
    type: z.enum(['logbook', 'inspection', 'ownership', 'other'])
  })).optional(),
  deleteIndex: z.number().optional(),
  deleteVideoIndex: z.number().optional(),
  deleteDocumentIndex: z.number().optional(),
  featuredIndex: z.number().optional(),
  newOrder: z.array(z.number()).optional(),
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
export type CarComparison = typeof carComparisons.$inferSelect;
export type VehicleColor = typeof vehicleColors.$inferSelect;
export type DriveConfiguration = typeof driveConfigurations.$inferSelect;

// User management and authentication tables
export const userRoles = pgTable("user_roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // user, editor, admin, superadmin
  description: text("description"),
  permissions: text("permissions").array(), // Array of permission strings
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminCredentials = pgTable("admin_credentials", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  permissions: text("permissions").array(), // Array of permission strings
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const appUsers = pgTable("app_users", {
  id: varchar("id", { length: 255 }).primaryKey(), // User ID from auth system
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
  passwordHash: varchar("password_hash", { length: 255 }), // For email/password authentication
  oauthProvider: varchar("oauth_provider", { length: 50 }), // 'google', 'facebook', 'apple', etc.
  roleId: integer("role_id").references(() => userRoles.id).notNull().default(1), // Default to 'user' role
  status: varchar("status", { length: 20 }).default("active"), // 'active', 'suspended', 'pending'
  isActive: boolean("is_active").default(true),
  isEmailVerified: boolean("is_email_verified").default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  deviceInfo: text("device_info"),
  ipAddress: varchar("ip_address", { length: 45 }),
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  activityType: text("activity_type").notNull(), // login, logout, listing_created, listing_updated, etc.
  entityType: text("entity_type"), // listing, calculation, inquiry, etc.
  entityId: text("entity_id"), // ID of the entity being acted upon
  description: text("description"),
  metadata: text("metadata"), // JSON string for additional data
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Update car listings table to include approval workflow
export const listingApprovals = pgTable("listing_approvals", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  reviewerId: varchar("reviewer_id", { length: 255 }).references(() => appUsers.id),
  status: text("status").notNull().default("pending"), // pending, approved, rejected, changes_requested
  reviewNotes: text("review_notes"),
  rejectionReason: text("rejection_reason"),
  requestedChanges: text("requested_changes").array(),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User preferences and settings
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  receiveEmailNotifications: boolean("receive_email_notifications").default(true),
  receiveSmsNotifications: boolean("receive_sms_notifications").default(true),
  receiveWhatsappNotifications: boolean("receive_whatsapp_notifications").default(true),
  preferredCurrency: text("preferred_currency").default("KES"),
  preferredLanguage: text("preferred_language").default("en"),
  autoRenewListings: boolean("auto_renew_listings").default(true),
  publicProfile: boolean("public_profile").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User dashboard metrics and stats
export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  totalListings: integer("total_listings").default(0),
  activeListings: integer("active_listings").default(0),
  soldListings: integer("sold_listings").default(0),
  totalViews: integer("total_views").default(0),
  totalInquiries: integer("total_inquiries").default(0),
  totalDutyCalculations: integer("total_duty_calculations").default(0),
  totalTransferCalculations: integer("total_transfer_calculations").default(0),
  totalValuations: integer("total_valuations").default(0),
  lastActivityAt: timestamp("last_activity_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schemas for user management
export const userRoleSchema = createInsertSchema(userRoles).omit({
  id: true,
  createdAt: true,
});

export const appUserSchema = createInsertSchema(appUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const userRegistrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const listingApprovalSchema = createInsertSchema(listingApprovals).omit({
  id: true,
  createdAt: true,
  reviewedAt: true,
});

// Type exports for user management
export type UserRole = typeof userRoles.$inferSelect;
export type InsertUserRole = z.infer<typeof userRoleSchema>;
export type AppUser = typeof appUsers.$inferSelect;
export type InsertAppUser = z.infer<typeof appUserSchema>;
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserSession = typeof userSessions.$inferSelect;
export type UserActivity = typeof userActivities.$inferSelect;
export type ListingApproval = typeof listingApprovals.$inferSelect;
export type InsertListingApproval = z.infer<typeof listingApprovalSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type UserStats = typeof userStats.$inferSelect;

// Password reset tokens table
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;

// Admin credentials schemas
export const adminCredentialSchema = createInsertSchema(adminCredentials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Admin audit log table for tracking all admin actions
export const adminAuditLog = pgTable("admin_audit_log", {
  id: serial("id").primaryKey(),
  adminId: varchar("admin_id", { length: 255 }).notNull(),
  adminUsername: varchar("admin_username", { length: 100 }).notNull(),
  action: varchar("action", { length: 100 }).notNull(), // 'approve_listing', 'reject_listing', 'edit_listing', 'ban_user', etc.
  entityType: varchar("entity_type", { length: 50 }).notNull(), // 'listing', 'user', 'admin', etc.
  entityId: varchar("entity_id", { length: 255 }).notNull(),
  details: text("details"), // JSON string with action details
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: text("created_at").default("now()").notNull(),
});

// Listing flags table for user reports and admin flags
export const listingFlags = pgTable("listing_flags", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  reporterId: varchar("reporter_id", { length: 255 }), // null if admin flag
  reporterEmail: varchar("reporter_email", { length: 255 }),
  flagType: varchar("flag_type", { length: 50 }).notNull(), // 'spam', 'fraud', 'inappropriate', 'duplicate', etc.
  reason: text("reason").notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // 'pending', 'resolved', 'dismissed'
  reviewedBy: varchar("reviewed_by", { length: 255 }),
  reviewedAt: text("reviewed_at"),
  resolution: text("resolution"),
  createdAt: text("created_at").default("now()").notNull(),
});

// Automated flag rules table - defines trigger counts and actions for each flag type
export const autoFlagRules = pgTable("auto_flag_rules", {
  id: serial("id").primaryKey(),
  flagType: varchar("flag_type", { length: 100 }).notNull().unique(),
  displayName: varchar("display_name", { length: 150 }).notNull(),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // content, misleading, suspicious, behavior, platform
  triggerCount: integer("trigger_count").notNull(),
  actionType: varchar("action_type", { length: 50 }).notNull(), // hide_images, suspend_listing, lock_account, etc.
  actionDescription: text("action_description").notNull(),
  severity: varchar("severity", { length: 20 }).notNull(), // low, medium, high, critical
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Flag count tracking table - tracks how many times each flag type has been reported per listing
export const flagCountTracking = pgTable("flag_count_tracking", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  flagType: varchar("flag_type", { length: 100 }).notNull(),
  flagCount: integer("flag_count").default(1).notNull(),
  lastFlaggedAt: text("last_flagged_at").default("now()").notNull(),
  actionTriggered: boolean("action_triggered").default(false).notNull(),
  actionTriggeredAt: text("action_triggered_at"),
  actionType: varchar("action_type", { length: 50 }),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Automated actions log table - tracks all automated actions taken
export const automatedActionsLog = pgTable("automated_actions_log", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  flagType: varchar("flag_type", { length: 100 }).notNull(),
  actionType: varchar("action_type", { length: 50 }).notNull(),
  triggerCount: integer("trigger_count").notNull(),
  actionDescription: text("action_description").notNull(),
  executedBy: varchar("executed_by", { length: 50 }).default("system").notNull(),
  success: boolean("success").default(true).notNull(),
  errorMessage: text("error_message"),
  rollbackId: integer("rollback_id"), // for reversible actions
  createdAt: text("created_at").default("now()").notNull(),
});

// Seller reputation tracking based on flag patterns
export const sellerReputationTracking = pgTable("seller_reputation_tracking", {
  id: serial("id").primaryKey(),
  sellerId: varchar("seller_id", { length: 255 }).notNull().unique(),
  reputationScore: integer("reputation_score").default(100).notNull(), // 0-100
  totalFlags: integer("total_flags").default(0).notNull(),
  highSeverityFlags: integer("high_severity_flags").default(0).notNull(),
  criticalFlags: integer("critical_flags").default(0).notNull(),
  isHighRisk: boolean("is_high_risk").default(false).notNull(),
  isRestricted: boolean("is_restricted").default(false).notNull(),
  restrictionReason: text("restriction_reason"),
  restrictedAt: text("restricted_at"),
  restrictedUntil: text("restricted_until"),
  lastFlaggedAt: text("last_flagged_at"),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Listing analytics table for tracking views and interactions
export const listingAnalytics = pgTable("listing_analytics", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  inquiryCount: integer("inquiry_count").default(0).notNull(),
  favoriteCount: integer("favorite_count").default(0).notNull(),
  shareCount: integer("share_count").default(0).notNull(),
  lastViewedAt: text("last_viewed_at"),
  avgTimeOnListing: integer("avg_time_on_listing"), // in seconds
  trafficSource: varchar("traffic_source", { length: 50 }), // 'organic', 'paid', 'referral', 'direct'
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Admin notes table for internal communication about listings
export const adminNotes = pgTable("admin_notes", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  adminId: varchar("admin_id", { length: 255 }).notNull(),
  adminUsername: varchar("admin_username", { length: 100 }).notNull(),
  note: text("note").notNull(),
  isInternal: boolean("is_internal").default(true).notNull(), // true for admin-only, false for visible to seller
  createdAt: text("created_at").default("now()").notNull(),
});

// User warnings table for tracking seller behavior
export const userWarnings = pgTable("user_warnings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  adminId: varchar("admin_id", { length: 255 }).notNull(),
  warningType: varchar("warning_type", { length: 50 }).notNull(), // 'spam', 'fraud', 'policy_violation', etc.
  severity: varchar("severity", { length: 20 }).notNull(), // 'low', 'medium', 'high', 'critical'
  description: text("description").notNull(),
  relatedListingId: integer("related_listing_id").references(() => carListings.id),
  acknowledged: boolean("acknowledged").default(false).notNull(),
  acknowledgedAt: text("acknowledged_at"),
  expiresAt: text("expires_at"), // null for permanent warnings
  createdAt: text("created_at").default("now()").notNull(),
});

// Admin templates table for standard responses
export const adminTemplates = pgTable("admin_templates", {
  id: serial("id").primaryKey(),
  templateType: varchar("template_type", { length: 50 }).notNull(), // 'approval', 'rejection', 'warning', etc.
  title: varchar("title", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  content: text("content").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  usageCount: integer("usage_count").default(0).notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Insert and select types for new admin management tables
export const insertAdminAuditLogSchema = createInsertSchema(adminAuditLog);
export type InsertAdminAuditLog = typeof adminAuditLog.$inferInsert;
export type AdminAuditLog = typeof adminAuditLog.$inferSelect;

export const insertListingFlagSchema = createInsertSchema(listingFlags);
export type InsertListingFlag = typeof listingFlags.$inferInsert;
export type ListingFlag = typeof listingFlags.$inferSelect;

export const insertListingAnalyticsSchema = createInsertSchema(listingAnalytics);
export type InsertListingAnalytics = typeof listingAnalytics.$inferInsert;
export type ListingAnalytics = typeof listingAnalytics.$inferSelect;

export const insertAdminNoteSchema = createInsertSchema(adminNotes);
export type InsertAdminNote = typeof adminNotes.$inferInsert;
export type AdminNote = typeof adminNotes.$inferSelect;

export const insertUserWarningSchema = createInsertSchema(userWarnings);
export type InsertUserWarning = typeof userWarnings.$inferInsert;
export type UserWarning = typeof userWarnings.$inferSelect;

export const insertAdminTemplateSchema = createInsertSchema(adminTemplates);
export type InsertAdminTemplate = typeof adminTemplates.$inferInsert;
export type AdminTemplate = typeof adminTemplates.$inferSelect;

// Automated flagging schema types
export const insertAutoFlagRuleSchema = createInsertSchema(autoFlagRules);
export type InsertAutoFlagRule = typeof autoFlagRules.$inferInsert;
export type AutoFlagRule = typeof autoFlagRules.$inferSelect;

export const insertFlagCountTrackingSchema = createInsertSchema(flagCountTracking);
export type InsertFlagCountTracking = typeof flagCountTracking.$inferInsert;
export type FlagCountTracking = typeof flagCountTracking.$inferSelect;

export const insertAutomatedActionsLogSchema = createInsertSchema(automatedActionsLog);
export type InsertAutomatedActionsLog = typeof automatedActionsLog.$inferInsert;
export type AutomatedActionsLog = typeof automatedActionsLog.$inferSelect;

export const insertSellerReputationTrackingSchema = createInsertSchema(sellerReputationTracking);
export type InsertSellerReputationTracking = typeof sellerReputationTracking.$inferInsert;
export type SellerReputationTracking = typeof sellerReputationTracking.$inferSelect;

export type AdminCredential = typeof adminCredentials.$inferSelect;
export type InsertAdminCredential = z.infer<typeof adminCredentialSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;

// ==============================
// COMPREHENSIVE MESSAGING SYSTEM
// ==============================

// Conversations table - represents a conversation between multiple participants
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'listing_inquiry', 'duty_calculation', 'transfer_request', 'general_support', 'admin_moderation'
  title: text("title").notNull(), // Auto-generated based on type and context
  context: text("context"), // JSON object with relevant context (listingId, calculationId, etc.)
  status: text("status").notNull().default("active"), // 'active', 'archived', 'closed', 'escalated'
  priority: text("priority").notNull().default("normal"), // 'low', 'normal', 'high', 'urgent'
  isModerated: boolean("is_moderated").default(false), // true if admin is monitoring
  moderatorId: varchar("moderator_id", { length: 255 }), // admin user ID if moderated
  lastMessageAt: timestamp("last_message_at"),
  lastActivityAt: timestamp("last_activity_at").defaultNow(),
  participantCount: integer("participant_count").default(2),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Conversation participants - who is part of each conversation
export const conversationParticipants = pgTable("conversation_participants", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  role: text("role").notNull(), // 'buyer', 'seller', 'admin', 'moderator', 'participant'
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  leftAt: timestamp("left_at"), // null if still active participant
  isActive: boolean("is_active").default(true),
  lastReadMessageId: integer("last_read_message_id"), // for read receipts
  notificationsEnabled: boolean("notifications_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Messages table - individual messages within conversations
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  senderId: varchar("sender_id", { length: 255 }).references(() => appUsers.id).notNull(),
  messageType: text("message_type").notNull().default("text"), // 'text', 'image', 'file', 'system', 'template'
  content: text("content").notNull(),
  metadata: text("metadata"), // JSON for attachments, system message details, etc.
  replyToMessageId: integer("reply_to_message_id").references(() => messages.id), // for threading
  isSystemMessage: boolean("is_system_message").default(false),
  isEdited: boolean("is_edited").default(false),
  editedAt: timestamp("edited_at"),
  isDeleted: boolean("is_deleted").default(false),
  deletedAt: timestamp("deleted_at"),
  deliveryStatus: text("delivery_status").default("sent"), // 'sent', 'delivered', 'read', 'failed'
  readCount: integer("read_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Message attachments table
export const messageAttachments = pgTable("message_attachments", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").references(() => messages.id, { onDelete: "cascade" }).notNull(),
  fileName: text("file_name").notNull(),
  originalName: text("original_name").notNull(),
  fileSize: integer("file_size").notNull(), // in bytes
  mimeType: text("mime_type").notNull(),
  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"), // for images/videos
  isPublic: boolean("is_public").default(false),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Message read receipts for tracking who read what
export const messageReadReceipts = pgTable("message_read_receipts", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").references(() => messages.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  readAt: timestamp("read_at").defaultNow().notNull(),
});

// Message templates for common responses (admin and user)
export const messageTemplates = pgTable("message_templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'greeting', 'pricing_inquiry', 'viewing_request', 'admin_response', etc.
  isAdminOnly: boolean("is_admin_only").default(false),
  isActive: boolean("is_active").default(true),
  usageCount: integer("usage_count").default(0),
  tags: text("tags").array(), // for categorization and search
  createdBy: varchar("created_by", { length: 255 }).references(() => appUsers.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Conversation analytics for insights
export const conversationAnalytics = pgTable("conversation_analytics", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  messageCount: integer("message_count").default(0),
  participantCount: integer("participant_count").default(0),
  avgResponseTime: integer("avg_response_time"), // in minutes
  firstResponseTime: integer("first_response_time"), // in minutes
  resolutionTime: integer("resolution_time"), // in minutes
  satisfactionRating: integer("satisfaction_rating"), // 1-5 scale, null if not rated
  outcome: text("outcome"), // 'sale_completed', 'no_response', 'price_negotiation', 'viewing_scheduled', etc.
  leadQuality: text("lead_quality"), // 'hot', 'warm', 'cold', 'spam'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Notification preferences per conversation type
export const messageNotificationSettings = pgTable("message_notification_settings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  conversationType: text("conversation_type").notNull(),
  emailEnabled: boolean("email_enabled").default(true),
  smsEnabled: boolean("sms_enabled").default(false),
  pushEnabled: boolean("push_enabled").default(true),
  digestFrequency: text("digest_frequency").default("immediate"), // 'immediate', 'hourly', 'daily', 'never'
  quietHoursStart: text("quiet_hours_start"), // "22:00"
  quietHoursEnd: text("quiet_hours_end"), // "08:00"
  weekendsEnabled: boolean("weekends_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blocked users and spam prevention
export const blockedUsers = pgTable("blocked_users", {
  id: serial("id").primaryKey(),
  blockerId: varchar("blocker_id", { length: 255 }).references(() => appUsers.id).notNull(),
  blockedId: varchar("blocked_id", { length: 255 }).references(() => appUsers.id).notNull(),
  reason: text("reason"), // 'spam', 'harassment', 'inappropriate', 'other'
  blockType: text("block_type").default("messaging"), // 'messaging', 'complete', 'viewing'
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // Unique constraint to prevent duplicate blocks
}, (table) => ({
  uniqueBlock: {
    name: "unique_user_block",
    columns: [table.blockerId, table.blockedId],
  },
}));

// Schemas for messaging system
export const conversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastMessageAt: true,
  lastActivityAt: true,
  participantCount: true,
});

export const messageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deliveryStatus: true,
  readCount: true,
  isEdited: true,
  editedAt: true,
  isDeleted: true,
  deletedAt: true,
});

export const participantSchema = createInsertSchema(conversationParticipants).omit({
  id: true,
  createdAt: true,
  joinedAt: true,
});

export const messageTemplateSchema = createInsertSchema(messageTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usageCount: true,
});

// New conversation request schema
export const newConversationSchema = z.object({
  type: z.enum(['listing_inquiry', 'duty_calculation', 'transfer_request', 'general_support']),
  title: z.string().min(5, "Title must be at least 5 characters"),
  context: z.object({
    listingId: z.number().optional(),
    calculationId: z.number().optional(),
    vehicleInfo: z.object({
      make: z.string(),
      model: z.string(),
      year: z.number(),
    }).optional(),
  }).optional(),
  recipientId: z.string().min(1, "Recipient is required"),
  initialMessage: z.string().min(10, "Initial message must be at least 10 characters"),
});

// Type exports for messaging system
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof conversationSchema>;
export type ConversationParticipant = typeof conversationParticipants.$inferSelect;
export type InsertConversationParticipant = z.infer<typeof participantSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof messageSchema>;
export type MessageAttachment = typeof messageAttachments.$inferSelect;
export type MessageReadReceipt = typeof messageReadReceipts.$inferSelect;
export type MessageTemplate = typeof messageTemplates.$inferSelect;
export type InsertMessageTemplate = z.infer<typeof messageTemplateSchema>;
export type ConversationAnalytics = typeof conversationAnalytics.$inferSelect;
export type MessageNotificationSettings = typeof messageNotificationSettings.$inferSelect;
export type BlockedUser = typeof blockedUsers.$inferSelect;
export type NewConversation = z.infer<typeof newConversationSchema>;

// Vehicle Valuation Schema (old version - to be replaced)

// Manual vehicle data for proration
export interface ManualVehicleData {
  make: string;
  model: string;
  engineCapacity: number;
  referenceVehicle: VehicleReference;
  proratedCrsp: number;
}

// ==============================
// INSURANCE QUOTES SCHEMA
// ==============================

export const insuranceQuotes = pgTable("insurance_quotes", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id"), // Optional - can be from database or manual entry
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engineCapacity: integer("engine_capacity"),
  vehicleValue: decimal("vehicle_value", { precision: 12, scale: 2 }).notNull(),
  vehicleCategory: text("vehicle_category").notNull(), // private, commercial, motorcycle, etc.
  
  // Driver information
  driverAge: integer("driver_age").notNull(),
  drivingExperience: integer("driving_experience").notNull(), // years
  previousClaims: integer("previous_claims").default(0),
  hasAccidentHistory: boolean("has_accident_history").default(false),
  
  // Coverage information
  coverageType: text("coverage_type").notNull(), // comprehensive, third_party, fire_theft
  excess: decimal("excess", { precision: 10, scale: 2 }).default("50000"), // deductible amount
  location: text("location").notNull(), // affects premium rates
  
  // Quote results
  annualPremium: decimal("annual_premium", { precision: 10, scale: 2 }).notNull(),
  monthlyPremium: decimal("monthly_premium", { precision: 10, scale: 2 }),
  coverageDetails: text("coverage_details"), // JSON string
  riskFactors: text("risk_factors"), // JSON string
  recommendations: text("recommendations"),
  
  // Contact information
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insurance coverage types reference table
export const insuranceCoverageTypes = pgTable("insurance_coverage_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // comprehensive, third_party, fire_theft
  description: text("description").notNull(),
  baseRate: decimal("base_rate", { precision: 5, scale: 4 }).notNull(), // percentage of vehicle value
  minPremium: decimal("min_premium", { precision: 10, scale: 2 }).notNull(),
  maxPremium: decimal("max_premium", { precision: 10, scale: 2 }),
  features: text("features").notNull(), // JSON array of covered items
});

// Insurance risk factors table
export const insuranceRiskFactors = pgTable("insurance_risk_factors", {
  id: serial("id").primaryKey(),
  factor: text("factor").notNull(), // age, experience, location, vehicle_type, etc.
  category: text("category").notNull(),
  multiplier: decimal("multiplier", { precision: 5, scale: 4 }).notNull(),
  description: text("description"),
});

// Insurance schemas
export const insuranceQuoteSchema = createInsertSchema(insuranceQuotes).omit({
  id: true,
  createdAt: true,
});

export const insuranceCoverageTypeSchema = createInsertSchema(insuranceCoverageTypes).omit({
  id: true,
});

export const insuranceRiskFactorSchema = createInsertSchema(insuranceRiskFactors).omit({
  id: true,
});

export type InsuranceQuote = typeof insuranceQuotes.$inferSelect;
export type InsertInsuranceQuote = z.infer<typeof insuranceQuoteSchema>;
export type InsuranceCoverageType = typeof insuranceCoverageTypes.$inferSelect;
export type InsertInsuranceCoverageType = z.infer<typeof insuranceCoverageTypeSchema>;
export type InsuranceRiskFactor = typeof insuranceRiskFactors.$inferSelect;
export type InsertInsuranceRiskFactor = z.infer<typeof insuranceRiskFactorSchema>;

// ==============================
// IMPORT ESTIMATOR SCHEMA
// ==============================

export const importEstimates = pgTable("import_estimates", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id"), // Optional - can be from database or manual entry
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engineCapacity: integer("engine_capacity"),
  
  // CIF information
  cifCurrency: text("cif_currency").notNull(), // USD, JPY, GBP
  cifAmount: decimal("cif_amount", { precision: 12, scale: 2 }).notNull(),
  exchangeRate: decimal("exchange_rate", { precision: 10, scale: 4 }).notNull(),
  cifKes: decimal("cif_kes", { precision: 12, scale: 2 }).notNull(),
  
  // Cost breakdown
  dutyPayable: decimal("duty_payable", { precision: 12, scale: 2 }).notNull(),
  clearingCharges: decimal("clearing_charges", { precision: 10, scale: 2 }).notNull(),
  transportCost: decimal("transport_cost", { precision: 10, scale: 2 }).default("0"),
  serviceFeePercentage: decimal("service_fee_percentage", { precision: 5, scale: 2 }).notNull(),
  serviceFeeAmount: decimal("service_fee_amount", { precision: 10, scale: 2 }).notNull(),
  totalPayable: decimal("total_payable", { precision: 12, scale: 2 }).notNull(),
  
  // Contact information
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Clearing charges table
export const clearingCharges = pgTable("clearing_charges", {
  id: serial("id").primaryKey(),
  vehicleCategory: text("vehicle_category").notNull(),
  minEngineCapacity: integer("min_engine_capacity"),
  maxEngineCapacity: integer("max_engine_capacity"),
  baseFee: decimal("base_fee", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Currency exchange rates table
export const exchangeRates = pgTable("exchange_rates", {
  id: serial("id").primaryKey(),
  currency: text("currency").notNull(), // USD, JPY, GBP
  rate: decimal("rate", { precision: 10, scale: 4 }).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Import estimator schemas
export const importEstimateSchema = createInsertSchema(importEstimates).omit({
  id: true,
  createdAt: true,
  vehicleId: true,
  cifKes: true,
  dutyPayable: true,
  clearingCharges: true,
  serviceFeeAmount: true,
  totalPayable: true,
}).extend({
  vehicleCategory: z.string().optional(),
  // Transform numbers to strings for decimal fields
  cifAmount: z.number().transform(val => val.toString()),
  exchangeRate: z.number().transform(val => val.toString()),
  transportCost: z.number().optional().transform(val => val?.toString() || "0"),
  serviceFeePercentage: z.number().transform(val => val.toString()),
});

export const clearingChargeSchema = createInsertSchema(clearingCharges).omit({
  id: true,
  createdAt: true,
});

export const exchangeRateSchema = createInsertSchema(exchangeRates).omit({
  id: true,
  lastUpdated: true,
});

export type ImportEstimate = typeof importEstimates.$inferSelect;
export type InsertImportEstimate = z.infer<typeof importEstimateSchema>;
export type ClearingCharge = typeof clearingCharges.$inferSelect;
export type InsertClearingCharge = z.infer<typeof clearingChargeSchema>;
export type ExchangeRate = typeof exchangeRates.$inferSelect;
export type InsertExchangeRate = z.infer<typeof exchangeRateSchema>;

// Updated Vehicle Valuation Schema with Image Analysis
export const vehicleValuationsWithImages = pgTable("vehicle_valuations_with_images", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id"), // Reference to vehicle_references
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engineCapacity: integer("engine_capacity"),
  fuelType: text("fuel_type"),
  mileage: integer("mileage").notNull(),
  condition: text("condition").notNull(), // excellent, good, fair, poor
  location: text("location").notNull(),
  
  // Image analysis results
  frontImageUrl: text("front_image_url"),
  reverseImageUrl: text("reverse_image_url"),
  leftSideImageUrl: text("left_side_image_url"),
  rightSideImageUrl: text("right_side_image_url"),
  
  // AI analysis results
  frontImageAnalysis: text("front_image_analysis"),
  reverseImageAnalysis: text("reverse_image_analysis"),
  leftSideImageAnalysis: text("left_side_image_analysis"),
  rightSideImageAnalysis: text("right_side_image_analysis"),
  
  // Damage assessment
  frontDamageScore: integer("front_damage_score").default(0), // 0-100 (0 = no damage, 100 = severely damaged)
  reverseDamageScore: integer("reverse_damage_score").default(0),
  leftSideDamageScore: integer("left_side_damage_score").default(0),
  rightSideDamageScore: integer("right_side_damage_score").default(0),
  overallDamageScore: integer("overall_damage_score").default(0),
  
  // Valuation results
  basePrice: decimal("base_price", { precision: 12, scale: 2 }).notNull(),
  depreciatedValue: decimal("depreciated_value", { precision: 12, scale: 2 }).notNull(),
  adjustedValue: decimal("adjusted_value", { precision: 12, scale: 2 }).notNull(),
  damageDiscount: decimal("damage_discount", { precision: 5, scale: 4 }).default("0"), // as decimal (0.10 = 10% discount)
  finalMarketValue: decimal("final_market_value", { precision: 12, scale: 2 }).notNull(),
  confidenceScore: integer("confidence_score").default(70),
  
  // Customer information
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const vehicleValuationWithImagesSchema = createInsertSchema(vehicleValuationsWithImages).omit({
  id: true,
  createdAt: true,
  vehicleId: true,
  frontImageUrl: true,
  reverseImageUrl: true,
  leftSideImageUrl: true,
  rightSideImageUrl: true,
  frontImageAnalysis: true,
  reverseImageAnalysis: true,
  leftSideImageAnalysis: true,
  rightSideImageAnalysis: true,
  frontDamageScore: true,
  reverseDamageScore: true,
  leftSideDamageScore: true,
  rightSideDamageScore: true,
  overallDamageScore: true,
  basePrice: true,
  depreciatedValue: true,
  adjustedValue: true,
  damageDiscount: true,
  finalMarketValue: true,
  confidenceScore: true,
}).extend({
  mileage: z.number(),
  year: z.number(),
  engineCapacity: z.number().optional(),
  // Image files as base64 strings
  frontImage: z.string().optional(),
  reverseImage: z.string().optional(),
  leftSideImage: z.string().optional(),
  rightSideImage: z.string().optional(),
});

export type VehicleValuationWithImages = typeof vehicleValuationsWithImages.$inferSelect;
export type InsertVehicleValuationWithImages = z.infer<typeof vehicleValuationWithImagesSchema>;

// ==============================
// MESSAGING AND ANALYTICS SCHEMA
// ==============================

// Phone click tracking table
export const phoneClickTracking = pgTable("phone_click_tracking", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  sellerId: text("seller_id").notNull(),
  clickerUserId: text("clicker_user_id"), // null if anonymous
  clickerIp: text("clicker_ip"),
  clickTimestamp: timestamp("click_timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Note: Comprehensive messaging system tables are defined above in the MESSAGING SYSTEM section

// Daily listing performance analytics
export const dailyListingAnalytics = pgTable("daily_listing_analytics", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format
  views: integer("views").default(0).notNull(),
  phoneClicks: integer("phone_clicks").default(0).notNull(),
  messagesSent: integer("messages_sent").default(0).notNull(),
  favorites: integer("favorites").default(0).notNull(),
  shares: integer("shares").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Messaging and analytics schemas
export const phoneClickTrackingSchema = createInsertSchema(phoneClickTracking).omit({
  id: true,
  createdAt: true,
});

// Note: Messaging schemas are defined above in the MESSAGING SYSTEM section

export const dailyListingAnalyticsSchema = createInsertSchema(dailyListingAnalytics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PhoneClickTracking = typeof phoneClickTracking.$inferSelect;
export type InsertPhoneClickTracking = z.infer<typeof phoneClickTrackingSchema>;
// Note: Message and Conversation types are defined above in the MESSAGING SYSTEM section
export type DailyListingAnalytics = typeof dailyListingAnalytics.$inferSelect;
export type InsertDailyListingAnalytics = z.infer<typeof dailyListingAnalyticsSchema>;
