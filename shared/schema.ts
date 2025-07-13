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
  year: z.number().min(1990).max(new Date().getFullYear()).optional(),
  mileage: z.number().min(0).optional(),
  transmission: z.enum(['automatic', 'manual', 'cvt']).optional(),
  fuelType: z.enum(['petrol', 'diesel', 'hybrid', 'electric']).optional(),
  engineSize: z.number().min(1).optional(),
  driveConfiguration: z.enum(['2WD', '4WD', 'AWD']).optional(),
  bodyType: z.enum(['sedan', 'suv', 'hatchback', 'wagon', 'coupe', 'convertible', 'pickup', 'van', 'minivan']).optional(),
  exteriorColor: z.string().optional(),
  interiorColor: z.string().optional(),
  condition: z.enum(['new', 'used', 'locally-used', 'foreign-used']).optional(),
  vinNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
});

// Schema for admin meta field updates
export const adminMetaUpdateSchema = z.object({
  status: z.enum(['pending', 'active', 'verified', 'rejected', 'archived']),
  featured: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  expirationDate: z.string().nullable().optional(), // ISO date string or null
  listingSource: z.enum(['user-submitted', 'agent', 'walk-in', 'api-imported']).optional(),
  sellerId: z.string().optional(), // For reassigning
  adminNotes: z.string().nullable().optional(), // Allow null/empty strings
});

// Schema for media management operations
export const mediaManagementSchema = z.object({
  action: z.enum(['upload', 'delete', 'reorder', 'set_featured']),
  images: z.array(z.string()).optional(),
  deleteIndex: z.number().optional(),
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

export type AdminCredential = typeof adminCredentials.$inferSelect;
export type InsertAdminCredential = z.infer<typeof adminCredentialSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;

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

// Messages table for tracking conversations
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  sellerId: text("seller_id").notNull(),
  buyerId: text("buyer_id").notNull(),
  message: text("message").notNull(),
  messageType: text("message_type").notNull().default("text"), // text, image, etc.
  isRead: boolean("is_read").default(false).notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Conversations table for organizing messages
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  sellerId: text("seller_id").notNull(),
  buyerId: text("buyer_id").notNull(),
  lastMessageId: integer("last_message_id").references(() => messages.id),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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

export const messageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const conversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dailyListingAnalyticsSchema = createInsertSchema(dailyListingAnalytics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PhoneClickTracking = typeof phoneClickTracking.$inferSelect;
export type InsertPhoneClickTracking = z.infer<typeof phoneClickTrackingSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof messageSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof conversationSchema>;
export type DailyListingAnalytics = typeof dailyListingAnalytics.$inferSelect;
export type InsertDailyListingAnalytics = z.infer<typeof dailyListingAnalyticsSchema>;
