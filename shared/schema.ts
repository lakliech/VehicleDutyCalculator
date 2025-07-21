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

// Video Call Appointments for virtual vehicle viewings
export const videoCallAppointments = pgTable("video_call_appointments", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull(),
  buyerId: text("buyer_id").notNull(), // User requesting the call
  sellerId: text("seller_id").notNull(), // Listing owner
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull().default(30), // Duration in minutes
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled, rescheduled
  meetingLink: text("meeting_link"), // Video call link (Zoom/Meet/etc)
  notes: text("notes"), // Additional notes from buyer
  sellerNotes: text("seller_notes"), // Notes from seller
  cancellationReason: text("cancellation_reason"), // Reason for cancellation
  completionNotes: text("completion_notes"), // Post-call notes
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Test Drive Appointments for physical vehicle inspection
export const testDriveAppointments = pgTable("test_drive_appointments", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull(),
  buyerId: text("buyer_id").notNull(),
  sellerId: text("seller_id").notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull().default(60), // Duration in minutes
  meetingLocation: text("meeting_location").notNull(), // Where to meet
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled, no_show, rescheduled
  documentsRequired: text("documents_required").array(), // Required documents (license, etc)
  additionalRequirements: text("additional_requirements"), // Insurance, deposit, etc
  buyerNotes: text("buyer_notes"), // Notes from buyer
  sellerNotes: text("seller_notes"), // Notes from seller
  completionNotes: text("completion_notes"), // Post-test drive notes
  rating: integer("rating"), // Buyer rating of experience (1-5)
  cancellationReason: text("cancellation_reason"), // Reason for cancellation
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
  createdAt: true,
});

// Insert schemas for appointments
export const insertVideoCallAppointmentSchema = createInsertSchema(videoCallAppointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestDriveAppointmentSchema = createInsertSchema(testDriveAppointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schemas for appointment modifications
export const updateVideoCallAppointmentSchema = z.object({
  appointmentDate: z.string().datetime().optional(),
  duration: z.number().min(15).max(180).optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled']).optional(),
  meetingLink: z.string().url().optional().or(z.literal('')),
  notes: z.string().optional(),
  sellerNotes: z.string().optional(),
  cancellationReason: z.string().optional(),
  completionNotes: z.string().optional(),
});

export const updateTestDriveAppointmentSchema = z.object({
  appointmentDate: z.string().datetime().optional(),
  duration: z.number().min(30).max(240).optional(),
  meetingLocation: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled', 'no_show', 'rescheduled']).optional(),
  documentsRequired: z.array(z.string()).optional(),
  additionalRequirements: z.string().optional(),
  buyerNotes: z.string().optional(),
  sellerNotes: z.string().optional(),
  completionNotes: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  cancellationReason: z.string().optional(),
});

// Seller availability settings
export const sellerAvailability = pgTable("seller_availability", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: text("start_time").notNull(), // HH:MM format (24-hour)
  endTime: text("end_time").notNull(), // HH:MM format (24-hour)
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Seller appointment preferences
export const sellerAppointmentPreferences = pgTable("seller_appointment_preferences", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  autoApprove: boolean("auto_approve").default(false),
  minimumAdvanceNoticeHours: integer("minimum_advance_notice_hours").default(2),
  maxAppointmentsPerDay: integer("max_appointments_per_day").default(10),
  allowWeekends: boolean("allow_weekends").default(true),
  defaultTestDriveLocation: text("default_test_drive_location"),
  defaultMeetingDuration: integer("default_meeting_duration").default(30), // in minutes
  bufferTimeBetweenAppointments: integer("buffer_time_between_appointments").default(15), // in minutes
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blocked time slots for sellers
export const sellerBlockedSlots = pgTable("seller_blocked_slots", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  startDateTime: timestamp("start_date_time").notNull(),
  endDateTime: timestamp("end_date_time").notNull(),
  reason: text("reason"),
  isRecurring: boolean("is_recurring").default(false),
  recurrencePattern: text("recurrence_pattern"), // 'daily', 'weekly', 'monthly'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas for availability management
export const insertSellerAvailabilitySchema = createInsertSchema(sellerAvailability).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSellerAppointmentPreferencesSchema = createInsertSchema(sellerAppointmentPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSellerBlockedSlotsSchema = createInsertSchema(sellerBlockedSlots).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type VideoCallAppointment = typeof videoCallAppointments.$inferSelect;
export type InsertVideoCallAppointment = typeof insertVideoCallAppointmentSchema._type;
export type TestDriveAppointment = typeof testDriveAppointments.$inferSelect;
export type InsertTestDriveAppointment = typeof insertTestDriveAppointmentSchema._type;
export type SellerAvailability = typeof sellerAvailability.$inferSelect;
export type InsertSellerAvailability = z.infer<typeof insertSellerAvailabilitySchema>;
export type SellerAppointmentPreferences = typeof sellerAppointmentPreferences.$inferSelect;
export type InsertSellerAppointmentPreferences = z.infer<typeof insertSellerAppointmentPreferencesSchema>;
export type SellerBlockedSlots = typeof sellerBlockedSlots.$inferSelect;
export type InsertSellerBlockedSlots = z.infer<typeof insertSellerBlockedSlotsSchema>;

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

// Dealer Profiles for enhanced dealer management
export const dealerProfiles = pgTable("dealer_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(), // Links to app_users
  dealerName: text("dealer_name").notNull(), // Business name
  businessName: text("business_name"), // Official business name if different
  logoUrl: varchar("logo_url", { length: 500 }), // Company logo
  businessLocation: text("business_location").notNull(), // Physical address
  mapCoordinates: text("map_coordinates"), // lat,lng for map pin
  phoneNumbers: text("phone_numbers").array(), // Multiple phone numbers
  emailAddress: varchar("email_address", { length: 255 }),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  websiteUrl: varchar("website_url", { length: 255 }),
  socialMediaLinks: json("social_media_links").$type<{facebook?: string; instagram?: string; twitter?: string; linkedin?: string}>(),
  businessHours: json("business_hours").$type<{[key: string]: {open: string; close: string; closed?: boolean}}>(), // Days of week with hours
  yearsInBusiness: integer("years_in_business"),
  registrationDate: timestamp("registration_date").defaultNow().notNull(),
  dealerBio: text("dealer_bio"), // Short description
  specialties: text("specialties").array(), // Types of vehicles they specialize in
  servicesOffered: text("services_offered").array(), // financing, trade-ins, warranties, etc.
  isVerified: boolean("is_verified").default(false),
  verificationBadge: text("verification_badge"), // trusted-dealer, premium-dealer, certified-dealer
  verificationDate: timestamp("verification_date"),
  verifiedBy: varchar("verified_by", { length: 255 }), // Admin who verified
  status: text("status").notNull().default("pending"), // pending, approved, rejected, suspended
  suspensionReason: text("suspension_reason"),
  suspendedAt: timestamp("suspended_at"),
  suspendedBy: varchar("suspended_by", { length: 255 }),
  listingLimit: integer("listing_limit").default(10), // Based on package
  packageType: text("package_type").default("free"), // free, basic, premium, enterprise
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Dealer Reviews and Ratings
export const dealerReviews = pgTable("dealer_reviews", {
  id: serial("id").primaryKey(),
  dealerId: integer("dealer_id").references(() => dealerProfiles.id).notNull(),
  reviewerId: varchar("reviewer_id", { length: 255 }).notNull(), // User who left review
  rating: integer("rating").notNull(), // 1-5 stars
  reviewTitle: text("review_title"),
  reviewText: text("review_text").notNull(),
  transactionType: text("transaction_type"), // purchase, inquiry, service
  vehicleInvolved: text("vehicle_involved"), // Make/model if applicable
  communicationRating: integer("communication_rating"), // 1-5
  professionelismRating: integer("professionalism_rating"), // 1-5
  timelinessRating: integer("timeliness_rating"), // 1-5
  overallExperience: text("overall_experience"), // excellent, good, fair, poor
  wouldRecommend: boolean("would_recommend"),
  isVerifiedPurchase: boolean("is_verified_purchase").default(false),
  dealerResponse: text("dealer_response"), // Dealer's response to review
  dealerResponseDate: timestamp("dealer_response_date"),
  status: text("status").default("active"), // active, hidden, reported, removed
  moderationNotes: text("moderation_notes"),
  moderatedBy: varchar("moderated_by", { length: 255 }),
  moderatedAt: timestamp("moderated_at"),
  helpfulVotes: integer("helpful_votes").default(0),
  reportedCount: integer("reported_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Dealer Analytics for performance tracking
export const dealerAnalytics = pgTable("dealer_analytics", {
  id: serial("id").primaryKey(),
  dealerId: integer("dealer_id").references(() => dealerProfiles.id).notNull(),
  date: timestamp("date").notNull(), // Daily analytics
  profileViews: integer("profile_views").default(0),
  listingViews: integer("listing_views").default(0),
  inquiries: integer("inquiries").default(0),
  phoneClicks: integer("phone_clicks").default(0),
  whatsappClicks: integer("whatsapp_clicks").default(0),
  emailClicks: integer("email_clicks").default(0),
  websiteClicks: integer("website_clicks").default(0),
  directContacts: integer("direct_contacts").default(0),
  favoriteAdds: integer("favorite_adds").default(0),
  shareClicks: integer("share_clicks").default(0),
  newReviews: integer("new_reviews").default(0),
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }),
  responseTime: integer("response_time"), // Average response time in minutes
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }), // inquiries to sales
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Dealer Verification Documents
export const dealerVerificationDocs = pgTable("dealer_verification_docs", {
  id: serial("id").primaryKey(),
  dealerId: integer("dealer_id").references(() => dealerProfiles.id).notNull(),
  documentType: text("document_type").notNull(), // business_license, tax_certificate, id_copy, premises_photo
  documentUrl: varchar("document_url", { length: 500 }).notNull(),
  documentName: text("document_name").notNull(),
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
  verificationStatus: text("verification_status").default("pending"), // pending, approved, rejected
  verifiedBy: varchar("verified_by", { length: 255 }),
  verificationDate: timestamp("verification_date"),
  verificationNotes: text("verification_notes"),
  expiryDate: timestamp("expiry_date"), // For documents that expire
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Dealer Invitations for user onboarding to dealerships
export const dealerInvitations = pgTable("dealer_invitations", {
  id: serial("id").primaryKey(),
  dealerId: integer("dealer_id").references(() => dealerProfiles.id).notNull(),
  invitationToken: varchar("invitation_token", { length: 255 }).notNull().unique(), // Unique invitation URL token
  invitedEmail: varchar("invited_email", { length: 255 }), // Optional email for targeted invitations
  invitationType: text("invitation_type").default("general"), // general, email, referral
  status: text("status").default("active"), // active, used, expired, revoked
  maxUses: integer("max_uses").default(1), // How many times this invitation can be used
  currentUses: integer("current_uses").default(0), // How many times it has been used
  expiresAt: timestamp("expires_at"), // Optional expiration date
  invitedUserId: varchar("invited_user_id", { length: 255 }), // Set when invitation is accepted
  acceptedAt: timestamp("accepted_at"), // When invitation was accepted
  createdBy: varchar("created_by", { length: 255 }).notNull(), // User ID of dealer who created invitation
  metadata: json("metadata").$type<{
    invitationMessage?: string;
    redirectUrl?: string;
    customParams?: Record<string, any>;
  }>(), // Additional invitation data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Dealer User Associations for tracking users associated with dealers
export const dealerUserAssociations = pgTable("dealer_user_associations", {
  id: serial("id").primaryKey(),
  dealerId: integer("dealer_id").references(() => dealerProfiles.id).notNull(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  associationType: text("association_type").default("invitation"), // invitation, direct_signup, referral
  invitationId: integer("invitation_id").references(() => dealerInvitations.id), // Link to invitation if applicable
  status: text("status").default("active"), // active, inactive, suspended
  associationDate: timestamp("association_date").defaultNow().notNull(),
  lastInteraction: timestamp("last_interaction"),
  metadata: json("metadata").$type<{
    source?: string;
    notes?: string;
    referralCode?: string;
  }>(), // Additional association data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

// Dealer profile schemas
export const dealerProfileSchema = createInsertSchema(dealerProfiles).omit({
  id: true,
  userId: true,
  registrationDate: true,
  isVerified: true,
  verificationDate: true,
  verifiedBy: true,
  status: true,
  suspensionReason: true,
  suspendedAt: true,
  suspendedBy: true,
  adminNotes: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  dealerName: z.string().min(2, "Dealer name must be at least 2 characters"),
  businessLocation: z.string().min(5, "Business location is required"),
  phoneNumbers: z.array(z.string()).min(1, "At least one phone number is required"),
  emailAddress: z.string().email("Valid email address required").optional(),
  dealerBio: z.string().max(500, "Bio must be under 500 characters").optional(),
});

// Dealer invitation schemas
export const dealerInvitationSchema = createInsertSchema(dealerInvitations).omit({
  id: true,
  invitedUserId: true,
  acceptedAt: true,
  currentUses: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  dealerId: z.number(),
  invitationType: z.enum(["general", "email", "referral"]).default("general"),
  invitedEmail: z.string().email().optional(),
  maxUses: z.number().min(1).max(100).default(1),
  expiresAt: z.string().datetime().optional(),
});

export const dealerUserAssociationSchema = createInsertSchema(dealerUserAssociations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dealerReviewSchema = createInsertSchema(dealerReviews).omit({
  id: true,
  dealerId: true,
  reviewerId: true,
  dealerResponse: true,
  dealerResponseDate: true,
  status: true,
  moderationNotes: true,
  moderatedBy: true,
  moderatedAt: true,
  helpfulVotes: true,
  reportedCount: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
  communicationRating: z.number().min(1).max(5).optional(),
  professionelismRating: z.number().min(1).max(5).optional(),
  timelinessRating: z.number().min(1).max(5).optional(),
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

// Dealer types
export type DealerProfile = typeof dealerProfiles.$inferSelect;
export type InsertDealerProfile = z.infer<typeof dealerProfileSchema>;
export type DealerReview = typeof dealerReviews.$inferSelect;
export type InsertDealerReview = z.infer<typeof dealerReviewSchema>;
export type DealerAnalytics = typeof dealerAnalytics.$inferSelect;
export type DealerVerificationDoc = typeof dealerVerificationDocs.$inferSelect;

// Financial Services Tables for Loan Pre-approval and Trade-in
export const bankPartners = pgTable("bank_partners", {
  id: serial("id").primaryKey(),
  bankName: text("bank_name").notNull(),
  bankCode: varchar("bank_code", { length: 10 }).notNull().unique(),
  logoUrl: varchar("logo_url", { length: 500 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  websiteUrl: varchar("website_url", { length: 255 }),
  apiEndpoint: varchar("api_endpoint", { length: 255 }), // For integration
  apiKey: varchar("api_key", { length: 255 }), // Encrypted API key
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const loanProducts = pgTable("loan_products", {
  id: serial("id").primaryKey(),
  bankId: integer("bank_id").references(() => bankPartners.id).notNull(),
  productName: text("product_name").notNull(),
  productType: text("product_type").notNull(), // 'new_vehicle', 'used_vehicle', 'refinancing'
  minLoanAmount: decimal("min_loan_amount", { precision: 12, scale: 2 }).notNull(),
  maxLoanAmount: decimal("max_loan_amount", { precision: 12, scale: 2 }).notNull(),
  minInterestRate: decimal("min_interest_rate", { precision: 5, scale: 2 }).notNull(), // Annual percentage
  maxInterestRate: decimal("max_interest_rate", { precision: 5, scale: 2 }).notNull(),
  minTenureMonths: integer("min_tenure_months").notNull(),
  maxTenureMonths: integer("max_tenure_months").notNull(),
  maxFinancingPercentage: decimal("max_financing_percentage", { precision: 6, scale: 2 }).notNull(), // 80% = 80.00 or 0.80
  minDownPaymentPercentage: decimal("min_down_payment_percentage", { precision: 6, scale: 2 }).notNull(),
  processingFeeRate: decimal("processing_fee_rate", { precision: 6, scale: 2 }), // As percentage of loan amount
  processingFeeFixed: decimal("processing_fee_fixed", { precision: 10, scale: 2 }), // Fixed amount
  insuranceRequired: boolean("insurance_required").default(true),
  guarantorRequired: boolean("guarantor_required").default(false),
  minMonthlyIncome: decimal("min_monthly_income", { precision: 10, scale: 2 }),
  maxAge: integer("max_age"), // Maximum borrower age
  eligibilityCriteria: json("eligibility_criteria").$type<string[]>(), // Array of criteria
  requiredDocuments: json("required_documents").$type<string[]>(), // Array of required documents
  features: json("features").$type<string[]>(), // Array of product features
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const loanApplications = pgTable("loan_applications", {
  id: serial("id").primaryKey(),
  applicationNumber: varchar("application_number", { length: 20 }).notNull().unique(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  loanProductId: integer("loan_product_id").references(() => loanProducts.id).notNull(),
  vehicleListingId: integer("vehicle_listing_id").references(() => carListings.id), // Optional - for specific vehicle
  
  // Applicant Information
  applicantName: text("applicant_name").notNull(),
  applicantEmail: varchar("applicant_email", { length: 255 }).notNull(),
  applicantPhone: varchar("applicant_phone", { length: 20 }).notNull(),
  nationalId: varchar("national_id", { length: 20 }).notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),
  maritalStatus: text("marital_status").notNull(), // 'single', 'married', 'divorced', 'widowed'
  employmentStatus: text("employment_status").notNull(), // 'employed', 'self_employed', 'business_owner', 'unemployed'
  employerName: text("employer_name"),
  jobTitle: text("job_title"),
  monthlyIncome: decimal("monthly_income", { precision: 10, scale: 2 }).notNull(),
  monthlyExpenses: decimal("monthly_expenses", { precision: 10, scale: 2 }),
  
  // Loan Details
  requestedAmount: decimal("requested_amount", { precision: 12, scale: 2 }).notNull(),
  downPaymentAmount: decimal("down_payment_amount", { precision: 12, scale: 2 }).notNull(),
  preferredTenureMonths: integer("preferred_tenure_months").notNull(),
  
  // Vehicle Information (if specific vehicle)
  vehicleMake: text("vehicle_make"),
  vehicleModel: text("vehicle_model"),
  vehicleYear: integer("vehicle_year"),
  vehiclePrice: decimal("vehicle_price", { precision: 12, scale: 2 }),
  
  // Application Status
  status: text("status").notNull().default("pending"), // 'pending', 'pre_approved', 'approved', 'rejected', 'withdrawn'
  preApprovalAmount: decimal("pre_approval_amount", { precision: 12, scale: 2 }),
  approvedInterestRate: decimal("approved_interest_rate", { precision: 5, scale: 2 }),
  approvedTenureMonths: integer("approved_tenure_months"),
  remarks: text("remarks"),
  
  // Documents
  uploadedDocuments: json("uploaded_documents").$type<Array<{url: string; name: string; type: string}>>(),
  
  // Tracking
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by", { length: 255 }),
  expiresAt: timestamp("expires_at"), // Pre-approval expiry
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tradeInEvaluations = pgTable("trade_in_evaluations", {
  id: serial("id").primaryKey(),
  evaluationNumber: varchar("evaluation_number", { length: 20 }).notNull().unique(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id),
  
  // Vehicle Information
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  mileage: integer("mileage").notNull(),
  engineSize: integer("engine_size"),
  fuelType: text("fuel_type").notNull(),
  transmission: text("transmission").notNull(),
  bodyType: text("body_type").notNull(),
  exteriorColor: text("exterior_color"),
  condition: text("condition").notNull(), // 'excellent', 'good', 'fair', 'poor'
  
  // Condition Details
  hasAccidents: boolean("has_accidents").default(false),
  accidentDetails: text("accident_details"),
  serviceHistory: text("service_history"), // 'complete', 'partial', 'none'
  hasModifications: boolean("has_modifications").default(false),
  modificationDetails: text("modification_details"),
  hasDefects: boolean("has_defects").default(false),
  defectDetails: text("defect_details"),
  
  // Evaluation Results
  marketValue: decimal("market_value", { precision: 10, scale: 2 }),
  tradeInValue: decimal("trade_in_value", { precision: 10, scale: 2 }),
  privatePartyValue: decimal("private_party_value", { precision: 10, scale: 2 }),
  dealerRetailValue: decimal("dealer_retail_value", { precision: 10, scale: 2 }),
  
  // Factors affecting value
  depreciationFactor: decimal("depreciation_factor", { precision: 5, scale: 4 }),
  conditionAdjustment: decimal("condition_adjustment", { precision: 5, scale: 4 }),
  mileageAdjustment: decimal("mileage_adjustment", { precision: 5, scale: 4 }),
  marketDemandFactor: decimal("market_demand_factor", { precision: 5, scale: 4 }),
  
  // Contact Information
  ownerName: text("owner_name").notNull(),
  ownerPhone: varchar("owner_phone", { length: 20 }).notNull(),
  ownerEmail: varchar("owner_email", { length: 255 }),
  location: text("location").notNull(),
  
  // Images
  images: text("images").array(), // Array of image URLs
  
  // Status
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'expired'
  evaluatedBy: varchar("evaluated_by", { length: 255 }),
  evaluatedAt: timestamp("evaluated_at"),
  expiresAt: timestamp("expires_at"), // Evaluation validity
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const loanCalculations = pgTable("loan_calculations", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }), // For anonymous calculations
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id),
  
  // Loan Parameters
  vehiclePrice: decimal("vehicle_price", { precision: 12, scale: 2 }).notNull(),
  downPayment: decimal("down_payment", { precision: 12, scale: 2 }).notNull(),
  loanAmount: decimal("loan_amount", { precision: 12, scale: 2 }).notNull(),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }).notNull(),
  tenureMonths: integer("tenure_months").notNull(),
  
  // Calculation Results
  monthlyPayment: decimal("monthly_payment", { precision: 10, scale: 2 }).notNull(),
  totalInterest: decimal("total_interest", { precision: 12, scale: 2 }).notNull(),
  totalPayable: decimal("total_payable", { precision: 12, scale: 2 }).notNull(),
  processingFee: decimal("processing_fee", { precision: 10, scale: 2 }),
  insuranceCost: decimal("insurance_cost", { precision: 10, scale: 2 }),
  
  // Additional costs
  registrationFees: decimal("registration_fees", { precision: 10, scale: 2 }),
  transferFees: decimal("transfer_fees", { precision: 10, scale: 2 }),
  totalInitialCost: decimal("total_initial_cost", { precision: 12, scale: 2 }),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

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

// Smart Pricing Intelligence Tables
// Market price analysis data
export const marketPriceAnalysis = pgTable("market_price_analysis", {
  id: serial("id").primaryKey(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  engineCapacity: integer("engine_capacity"),
  bodyType: varchar("body_type", { length: 50 }),
  averagePrice: decimal("average_price", { precision: 12, scale: 2 }).notNull(),
  medianPrice: decimal("median_price", { precision: 12, scale: 2 }).notNull(),
  priceRange: json("price_range"), // {min: number, max: number, percentile_25: number, percentile_75: number}
  sampleSize: integer("sample_size").notNull(),
  lastUpdated: text("last_updated").default("now()").notNull(),
  createdAt: text("created_at").default("now()").notNull(),
});

// AI pricing recommendations
export const pricingRecommendations = pgTable("pricing_recommendations", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  currentPrice: decimal("current_price", { precision: 12, scale: 2 }).notNull(),
  recommendedPrice: decimal("recommended_price", { precision: 12, scale: 2 }).notNull(),
  priceAdjustment: decimal("price_adjustment", { precision: 8, scale: 2 }).notNull(), // percentage change
  marketPosition: varchar("market_position", { length: 20 }).notNull(), // 'above', 'below', 'competitive'
  confidence: decimal("confidence", { precision: 3, scale: 2 }).notNull(), // 0.00 to 1.00
  reasoning: text("reasoning").notNull(),
  factors: json("factors"), // Array of factors affecting price
  seasonalAdjustment: decimal("seasonal_adjustment", { precision: 5, scale: 2 }),
  depreciationForecast: json("depreciation_forecast"), // 3, 6, 12 month projections
  alertType: varchar("alert_type", { length: 30 }), // 'overpriced', 'underpriced', 'optimal', 'seasonal_opportunity'
  isActive: boolean("is_active").default(true).notNull(),
  acknowledgedBy: varchar("acknowledged_by", { length: 255 }),
  acknowledgedAt: text("acknowledged_at"),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Seasonal pricing trends
export const seasonalPricingTrends = pgTable("seasonal_pricing_trends", {
  id: serial("id").primaryKey(),
  vehicleCategory: varchar("vehicle_category", { length: 100 }).notNull(),
  make: varchar("make", { length: 100 }),
  bodyType: varchar("body_type", { length: 50 }),
  month: integer("month").notNull(), // 1-12
  seasonality: varchar("seasonality", { length: 20 }).notNull(), // 'peak', 'low', 'moderate'
  avgPriceMultiplier: decimal("avg_price_multiplier", { precision: 4, scale: 3 }).notNull(), // 1.000 = baseline
  demandLevel: varchar("demand_level", { length: 20 }).notNull(), // 'very_high', 'high', 'moderate', 'low', 'very_low'
  supplyLevel: varchar("supply_level", { length: 20 }).notNull(),
  recommendations: text("recommendations").notNull(),
  bestBuyingOpportunity: boolean("best_buying_opportunity").default(false).notNull(),
  bestSellingOpportunity: boolean("best_selling_opportunity").default(false).notNull(),
  historicalData: json("historical_data"), // Array of year-over-year data
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Price alerts and notifications
export const priceAlerts = pgTable("price_alerts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  listingId: integer("listing_id").references(() => carListings.id),
  alertType: varchar("alert_type", { length: 30 }).notNull(), // 'price_drop', 'overpriced', 'underpriced', 'market_shift', 'seasonal_opportunity'
  vehicleFilters: json("vehicle_filters"), // For general market alerts
  currentPrice: decimal("current_price", { precision: 12, scale: 2 }),
  targetPrice: decimal("target_price", { precision: 12, scale: 2 }),
  priceDeviation: decimal("price_deviation", { precision: 5, scale: 2 }), // percentage from market average
  alertMessage: text("alert_message").notNull(),
  priority: varchar("priority", { length: 10 }).default("medium").notNull(), // 'low', 'medium', 'high', 'urgent'
  isActive: boolean("is_active").default(true).notNull(),
  triggered: boolean("triggered").default(false).notNull(),
  triggeredAt: text("triggered_at"),
  acknowledgedAt: text("acknowledged_at"),
  expiresAt: text("expires_at"),
  createdAt: text("created_at").default("now()").notNull(),
});

// Depreciation forecasts
export const depreciationForecasts = pgTable("depreciation_forecasts", {
  id: serial("id").primaryKey(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  engineCapacity: integer("engine_capacity"),
  currentValue: decimal("current_value", { precision: 12, scale: 2 }).notNull(),
  forecast3Months: decimal("forecast_3_months", { precision: 12, scale: 2 }).notNull(),
  forecast6Months: decimal("forecast_6_months", { precision: 12, scale: 2 }).notNull(),
  forecast12Months: decimal("forecast_12_months", { precision: 12, scale: 2 }).notNull(),
  forecast24Months: decimal("forecast_24_months", { precision: 12, scale: 2 }).notNull(),
  depreciationRate: decimal("depreciation_rate", { precision: 5, scale: 4 }).notNull(), // annual rate
  factorsConsidered: json("factors_considered"), // Array of factors affecting depreciation
  confidence: decimal("confidence", { precision: 3, scale: 2 }).notNull(),
  lastUpdated: text("last_updated").default("now()").notNull(),
  createdAt: text("created_at").default("now()").notNull(),
});

// Market insights generated by AI
export const marketInsights = pgTable("market_insights", {
  id: serial("id").primaryKey(),
  insightType: varchar("insight_type", { length: 50 }).notNull(), // 'trend', 'opportunity', 'warning', 'forecast'
  category: varchar("category", { length: 100 }), // vehicle category or 'general'
  title: varchar("title", { length: 200 }).notNull(),
  summary: text("summary").notNull(),
  detailedAnalysis: text("detailed_analysis").notNull(),
  actionableRecommendations: json("actionable_recommendations"), // Array of recommendations
  affectedVehicles: json("affected_vehicles"), // Array of make/model/year combinations
  confidenceLevel: decimal("confidence_level", { precision: 3, scale: 2 }).notNull(),
  priority: varchar("priority", { length: 10 }).default("medium").notNull(),
  validUntil: text("valid_until"),
  isPublic: boolean("is_public").default(false).notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Insert and select types for Smart Pricing Intelligence tables
export const insertMarketPriceAnalysisSchema = createInsertSchema(marketPriceAnalysis);
export type InsertMarketPriceAnalysis = typeof marketPriceAnalysis.$inferInsert;
export type MarketPriceAnalysis = typeof marketPriceAnalysis.$inferSelect;

export const insertPricingRecommendationSchema = createInsertSchema(pricingRecommendations);
export type InsertPricingRecommendation = typeof pricingRecommendations.$inferInsert;
export type PricingRecommendation = typeof pricingRecommendations.$inferSelect;

export const insertSeasonalPricingTrendSchema = createInsertSchema(seasonalPricingTrends);
export type InsertSeasonalPricingTrend = typeof seasonalPricingTrends.$inferInsert;
export type SeasonalPricingTrend = typeof seasonalPricingTrends.$inferSelect;

export const insertPriceAlertSchema = createInsertSchema(priceAlerts);
export type InsertPriceAlert = typeof priceAlerts.$inferInsert;
export type PriceAlert = typeof priceAlerts.$inferSelect;

export const insertDepreciationForecastSchema = createInsertSchema(depreciationForecasts);
export type InsertDepreciationForecast = typeof depreciationForecasts.$inferInsert;
export type DepreciationForecast = typeof depreciationForecasts.$inferSelect;

export const insertMarketInsightSchema = createInsertSchema(marketInsights);
export type InsertMarketInsight = typeof marketInsights.$inferInsert;
export type MarketInsight = typeof marketInsights.$inferSelect;

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
  replyToMessageId: integer("reply_to_message_id"), // for threading
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

// Daily listing performance analytics - Enhanced for comprehensive seller analytics
export const dailyListingAnalytics = pgTable("daily_listing_analytics", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format  
  totalViews: integer("total_views").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  phoneClicks: integer("phone_clicks").default(0),
  inquiries: integer("inquiries").default(0),
  favorites: integer("favorites").default(0),
  shares: integer("shares").default(0),
  impressions: integer("impressions").default(0),
  clickThroughRate: decimal("click_through_rate", { precision: 5, scale: 4 }).default("0.0000"),
  deviceDesktop: integer("device_desktop").default(0),
  deviceMobile: integer("device_mobile").default(0),
  deviceTablet: integer("device_tablet").default(0),
  locationNairobi: integer("location_nairobi").default(0),
  locationMombasa: integer("location_mombasa").default(0),
  locationKisumu: integer("location_kisumu").default(0),
  locationOther: integer("location_other").default(0),
  trafficSourceSearch: integer("traffic_source_search").default(0),
  trafficSourceDirect: integer("traffic_source_direct").default(0),
  trafficSourceSocial: integer("traffic_source_social").default(0),
  trafficSourceReferral: integer("traffic_source_referral").default(0),
  peakHourMorning: integer("peak_hour_morning").default(0),
  peakHourAfternoon: integer("peak_hour_afternoon").default(0),
  peakHourEvening: integer("peak_hour_evening").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Detailed listing view tracking for seller analytics
export const listingViews = pgTable("listing_views", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  viewerId: text("viewer_id"), // Anonymous or user ID
  sessionId: text("session_id"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  deviceType: text("device_type"), // 'mobile', 'tablet', 'desktop'
  location: text("location"), // City/County if available
  referrer: text("referrer"), // Where they came from
  searchQuery: text("search_query"), // What they searched for
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
  timeSpent: integer("time_spent"), // Seconds spent on listing page
  isUniqueVisitor: boolean("is_unique_visitor").default(true),
  scrollDepth: integer("scroll_depth"), // Percentage scrolled
  actionsPerformed: json("actions_performed"), // Array of actions on the page
});

// Search impressions tracking for seller insights
export const searchImpressions = pgTable("search_impressions", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  searchQuery: text("search_query"),
  searchFilters: json("search_filters"), // Applied filters as JSON
  position: integer("position"), // Position in search results
  wasClicked: boolean("was_clicked").default(false),
  viewerId: text("viewer_id"),
  deviceType: text("device_type"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Market benchmarking data for competitive analysis
export const marketBenchmarks = pgTable("market_benchmarks", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  bodyType: text("body_type"),
  fuelType: text("fuel_type"),
  transmission: text("transmission"),
  averagePrice: decimal("average_price", { precision: 12, scale: 2 }),
  priceRange: json("price_range"), // { min, max, median }
  averageDaysOnMarket: integer("average_days_on_market"),
  totalListings: integer("total_listings"),
  location: text("location"), // City/region
  performanceMetrics: json("performance_metrics"), // Average views, inquiries, etc.
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Listing quality scores for seller guidance
export const listingQualityScores = pgTable("listing_quality_scores", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  overallScore: integer("overall_score").notNull(), // 0-100
  photoScore: integer("photo_score").notNull(), // Based on number and quality of photos
  descriptionScore: integer("description_score").notNull(), // Completeness and quality
  completenessScore: integer("completeness_score").notNull(), // All required fields filled
  competitivenessScore: integer("competitiveness_score"), // Price vs market
  photoCount: integer("photo_count"),
  missingFields: json("missing_fields"), // Array of missing field names
  suggestedImprovements: json("suggested_improvements"), // Array of improvement suggestions
  benchmarkComparison: json("benchmark_comparison"), // vs similar listings
  lastCalculated: timestamp("last_calculated").defaultNow().notNull(),
});

// Search keywords that led to listing views
export const searchKeywords = pgTable("search_keywords", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  keyword: text("keyword").notNull(),
  searchCount: integer("search_count").default(1),
  clickCount: integer("click_count").default(0),
  conversionCount: integer("conversion_count").default(0), // Led to inquiry
  lastSearched: timestamp("last_searched").defaultNow().notNull(),
});

// Promotion effectiveness tracking
export const promotionTracking = pgTable("promotion_tracking", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  promotionType: text("promotion_type").notNull(), // 'featured', 'boost', 'top_listing'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  viewsBefore: integer("views_before"),
  viewsAfter: integer("views_after"),
  inquiriesBefore: integer("inquiries_before"),
  inquiriesAfter: integer("inquiries_after"),
  leadConversion: decimal("lead_conversion", { precision: 5, scale: 4 }), // Conversion rate
  roi: decimal("roi", { precision: 10, scale: 2 }), // Return on investment
  effectivenessScore: integer("effectiveness_score"), // 0-100
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Listing performance recommendations for sellers
export const listingRecommendations = pgTable("listing_recommendations", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id).notNull(),
  recommendationType: text("recommendation_type").notNull(), // 'price_adjustment', 'photo_improvement', 'description_update'
  priority: text("priority").notNull(), // 'low', 'medium', 'high', 'critical'
  title: text("title").notNull(),
  description: text("description").notNull(),
  expectedImpact: text("expected_impact"), // Expected improvement description
  actionRequired: json("action_required"), // Specific steps to take
  isActive: boolean("is_active").default(true),
  implementedAt: timestamp("implemented_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

// Schemas for new analytics tables
export const listingViewsSchema = createInsertSchema(listingViews).omit({
  id: true,
  viewedAt: true,
});

export const searchImpressionsSchema = createInsertSchema(searchImpressions).omit({
  id: true,
  createdAt: true,
});

export const marketBenchmarksSchema = createInsertSchema(marketBenchmarks).omit({
  id: true,
  lastUpdated: true,
});

export const listingQualityScoresSchema = createInsertSchema(listingQualityScores).omit({
  id: true,
  lastCalculated: true,
});

export const searchKeywordsSchema = createInsertSchema(searchKeywords).omit({
  id: true,
  lastSearched: true,
});

export const promotionTrackingSchema = createInsertSchema(promotionTracking).omit({
  id: true,
  createdAt: true,
});

export const listingRecommendationsSchema = createInsertSchema(listingRecommendations).omit({
  id: true,
  createdAt: true,
});

// Type exports for analytics
export type PhoneClickTracking = typeof phoneClickTracking.$inferSelect;
export type InsertPhoneClickTracking = z.infer<typeof phoneClickTrackingSchema>;
export type DailyListingAnalytics = typeof dailyListingAnalytics.$inferSelect;
export type InsertDailyListingAnalytics = z.infer<typeof dailyListingAnalyticsSchema>;
export type ListingViews = typeof listingViews.$inferSelect;
export type InsertListingViews = z.infer<typeof listingViewsSchema>;
export type SearchImpressions = typeof searchImpressions.$inferSelect;
export type InsertSearchImpressions = z.infer<typeof searchImpressionsSchema>;
export type MarketBenchmarks = typeof marketBenchmarks.$inferSelect;
export type InsertMarketBenchmarks = z.infer<typeof marketBenchmarksSchema>;
export type ListingQualityScores = typeof listingQualityScores.$inferSelect;
export type InsertListingQualityScores = z.infer<typeof listingQualityScoresSchema>;
export type SearchKeywords = typeof searchKeywords.$inferSelect;
export type InsertSearchKeywords = z.infer<typeof searchKeywordsSchema>;
export type PromotionTracking = typeof promotionTracking.$inferSelect;
export type InsertPromotionTracking = z.infer<typeof promotionTrackingSchema>;
export type ListingRecommendations = typeof listingRecommendations.$inferSelect;
export type InsertListingRecommendations = z.infer<typeof listingRecommendationsSchema>;

// ==============================
// FINANCIAL SERVICES VALIDATION SCHEMAS
// ==============================

// Financial services validation schemas
export const loanApplicationSchema = createInsertSchema(loanApplications).omit({
  id: true,
  applicationNumber: true,
  status: true,
  preApprovalAmount: true,
  approvedInterestRate: true,
  approvedTenureMonths: true,
  remarks: true,
  submittedAt: true,
  reviewedAt: true,
  reviewedBy: true,
  expiresAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  applicantName: z.string().min(2, "Name must be at least 2 characters"),
  applicantEmail: z.string().email("Valid email required"),
  applicantPhone: z.string().min(10, "Valid phone number required"),
  nationalId: z.string().min(8, "Valid National ID required"),
  monthlyIncome: z.number().min(20000, "Minimum monthly income is KES 20,000"),
  requestedAmount: z.number().min(100000, "Minimum loan amount is KES 100,000"),
  downPaymentAmount: z.number().min(0, "Down payment cannot be negative"),
});

export const tradeInEvaluationSchema = createInsertSchema(tradeInEvaluations).omit({
  id: true,
  evaluationNumber: true,
  marketValue: true,
  tradeInValue: true,
  privatePartyValue: true,
  dealerRetailValue: true,
  depreciationFactor: true,
  conditionAdjustment: true,
  mileageAdjustment: true,
  marketDemandFactor: true,
  status: true,
  evaluatedBy: true,
  evaluatedAt: true,
  expiresAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.number().min(1990).max(new Date().getFullYear(), "Year must be valid"),
  mileage: z.number().min(0, "Mileage cannot be negative"),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerPhone: z.string().min(10, "Valid phone number required"),
  location: z.string().min(1, "Location is required"),
});

export const loanCalculationSchema = createInsertSchema(loanCalculations).omit({
  id: true,
  sessionId: true,
  monthlyPayment: true,
  totalInterest: true,
  totalPayable: true,
  processingFee: true,
  insuranceCost: true,
  registrationFees: true,
  transferFees: true,
  totalInitialCost: true,
  createdAt: true,
}).extend({
  vehiclePrice: z.number().min(50000, "Vehicle price must be at least KES 50,000"),
  downPayment: z.number().min(0, "Down payment cannot be negative"),
  loanAmount: z.number().min(10000, "Loan amount must be at least KES 10,000"),
  interestRate: z.number().min(0.1).max(35, "Interest rate must be between 0.1% and 35%"),
  tenureMonths: z.number().min(6).max(84, "Tenure must be between 6 and 84 months"),
});

// Financial services types
export type BankPartner = typeof bankPartners.$inferSelect;
export type LoanProduct = typeof loanProducts.$inferSelect;
export type LoanApplication = typeof loanApplications.$inferSelect;
export type TradeInEvaluation = typeof tradeInEvaluations.$inferSelect;
export type LoanCalculation = typeof loanCalculations.$inferSelect;
export type InsertLoanApplication = z.infer<typeof loanApplicationSchema>;
export type InsertTradeInEvaluation = z.infer<typeof tradeInEvaluationSchema>;
export type InsertLoanCalculation = z.infer<typeof loanCalculationSchema>;

// ==============================
// ADVERTISEMENT MANAGEMENT SCHEMA
// ==============================

// Advertisement positions on the website
export const adPositions = pgTable("ad_positions", {
  id: serial("id").primaryKey(),
  positionName: text("position_name").notNull().unique(), // "header_banner", "sidebar_right", "homepage_hero", etc.
  displayName: text("display_name").notNull(), // "Header Banner", "Right Sidebar", "Homepage Hero"
  description: text("description").notNull(),
  dimensions: text("dimensions").notNull(), // "728x90", "300x250", "1200x400"
  location: text("location").notNull(), // "homepage", "buy_cars", "sell_cars", "duty_calculator", "all_pages"
  maxAdsSimultaneous: integer("max_ads_simultaneous").default(1), // How many ads can show at once
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0), // For display ordering
  pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).notNull(),
  pricePerWeek: decimal("price_per_week", { precision: 10, scale: 2 }).notNull(),
  pricePerMonth: decimal("price_per_month", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Advertisement content and campaigns
export const advertisements = pgTable("advertisements", {
  id: serial("id").primaryKey(),
  advertiserName: text("advertiser_name").notNull(),
  advertiserEmail: text("advertiser_email").notNull(),
  advertiserPhone: text("advertiser_phone"),
  campaignName: text("campaign_name").notNull(),
  adTitle: text("ad_title").notNull(),
  adDescription: text("ad_description"),
  adImageUrl: text("ad_image_url").notNull(),
  adTargetUrl: text("ad_target_url").notNull(), // Where the ad clicks lead
  adType: text("ad_type").notNull(), // "banner", "floating", "interstitial", "native"
  
  // Display settings
  backgroundColor: varchar("background_color", { length: 7 }), // Hex color code
  textColor: varchar("text_color", { length: 7 }), // Hex color code
  borderStyle: text("border_style"), // "solid", "dashed", "none"
  animationType: text("animation_type"), // "none", "fade", "slide", "bounce"
  
  // Targeting options
  targetAudience: text("target_audience").array(), // ["car_buyers", "car_sellers", "duty_calculators"]
  targetLocations: text("target_locations").array(), // ["nairobi", "mombasa", "kisumu"] or ["all"]
  targetDevices: text("target_devices").array(), // ["desktop", "mobile", "tablet"]
  
  // Budget and billing
  totalBudget: decimal("total_budget", { precision: 12, scale: 2 }).notNull(),
  dailyBudget: decimal("daily_budget", { precision: 10, scale: 2 }),
  costModel: text("cost_model").notNull(), // "fixed_period", "per_click", "per_impression"
  
  // Status and approval
  status: text("status").notNull().default("pending"), // "pending", "approved", "active", "paused", "completed", "rejected"
  approvedBy: text("approved_by"), // Admin user ID who approved
  approvedAt: timestamp("approved_at"),
  rejectionReason: text("rejection_reason"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Advertisement placements - assigns ads to positions with scheduling
export const adPlacements = pgTable("ad_placements", {
  id: serial("id").primaryKey(),
  advertisementId: integer("advertisement_id").references(() => advertisements.id, { onDelete: "cascade" }).notNull(),
  positionId: integer("position_id").references(() => adPositions.id, { onDelete: "cascade" }).notNull(),
  
  // Scheduling
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  
  // Display settings for this placement
  displayOrder: integer("display_order").default(0), // Priority when multiple ads in same position
  showDuration: integer("show_duration").default(30), // Seconds to show (for rotating ads)
  
  // Performance tracking
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  
  // Billing for this placement
  periodType: text("period_type").notNull(), // "daily", "weekly", "monthly", "custom"
  periodsBooked: integer("periods_booked").notNull(),
  totalCost: decimal("total_cost", { precision: 12, scale: 2 }).notNull(),
  amountPaid: decimal("amount_paid", { precision: 12, scale: 2 }).default("0"),
  paymentStatus: text("payment_status").notNull().default("pending"), // "pending", "paid", "overdue"
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  uniquePlacement: {
    name: "unique_ad_position_period",
    columns: [table.advertisementId, table.positionId, table.startDate],
  },
}));

// Advertisement analytics and performance tracking
export const adAnalytics = pgTable("ad_analytics", {
  id: serial("id").primaryKey(),
  placementId: integer("placement_id").references(() => adPlacements.id, { onDelete: "cascade" }).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format
  
  // Performance metrics
  impressions: integer("impressions").default(0),
  uniqueImpressions: integer("unique_impressions").default(0),
  clicks: integer("clicks").default(0),
  uniqueClicks: integer("unique_clicks").default(0),
  conversions: integer("conversions").default(0),
  
  // Audience breakdown
  desktopViews: integer("desktop_views").default(0),
  mobileViews: integer("mobile_views").default(0),
  tabletViews: integer("tablet_views").default(0),
  
  // Geographic breakdown
  nairobiViews: integer("nairobi_views").default(0),
  mombasaViews: integer("mombasa_views").default(0),
  otherLocationsViews: integer("other_locations_views").default(0),
  
  // Time-based metrics
  avgViewDuration: integer("avg_view_duration").default(0), // in seconds
  peakHour: integer("peak_hour"), // Hour of day with most views (0-23)
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  uniqueDailyAnalytics: {
    name: "unique_placement_date",
    columns: [table.placementId, table.date],
  },
}));

// Floating ads configuration for homepage
export const floatingAds = pgTable("floating_ads", {
  id: serial("id").primaryKey(),
  advertisementId: integer("advertisement_id").references(() => advertisements.id, { onDelete: "cascade" }).notNull(),
  
  // Display configuration
  positionX: text("position_x").notNull(), // "left", "center", "right", "10px", "50%"
  positionY: text("position_y").notNull(), // "top", "center", "bottom", "10px", "50%"
  width: text("width").notNull(), // "300px", "50%", "auto"
  height: text("height").notNull(), // "250px", "auto"
  zIndex: integer("z_index").default(1000),
  
  // Behavior configuration
  showDelay: integer("show_delay").default(0), // Seconds before showing
  hideDuration: integer("hide_duration").notNull(), // Seconds before auto-hiding
  isCloseable: boolean("is_closeable").default(true), // Can user close it?
  closeButtonStyle: text("close_button_style").default("top-right"), // "top-right", "top-left", "none"
  
  // Trigger configuration
  triggerEvent: text("trigger_event").default("page_load"), // "page_load", "scroll", "time_spent", "exit_intent"
  triggerValue: integer("trigger_value"), // Scroll percentage, time in seconds, etc.
  
  // Frequency control
  showOncePerSession: boolean("show_once_per_session").default(false),
  showOncePerDay: boolean("show_once_per_day").default(false),
  maxShowsPerUser: integer("max_shows_per_user"), // Total shows per user
  
  // Animation settings
  enterAnimation: text("enter_animation").default("fade"), // "fade", "slide-up", "slide-down", "bounce", "zoom"
  exitAnimation: text("exit_animation").default("fade"), // "fade", "slide-up", "slide-down", "zoom-out"
  animationDuration: integer("animation_duration").default(500), // milliseconds
  
  // Scheduling
  isActive: boolean("is_active").default(true),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Advertisement schemas
export const adPositionSchema = createInsertSchema(adPositions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const advertisementSchema = createInsertSchema(advertisements).omit({
  id: true,
  status: true,
  approvedBy: true,
  approvedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  advertiserEmail: z.string().email("Valid email is required"),
  adTitle: z.string().min(5, "Ad title must be at least 5 characters"),
  adTargetUrl: z.string().url("Valid URL is required"),
  totalBudget: z.number().min(1000, "Minimum budget is KES 1,000"),
  targetAudience: z.array(z.string()).min(1, "At least one target audience required"),
});

export const adPlacementSchema = createInsertSchema(adPlacements).omit({
  id: true,
  isActive: true,
  impressions: true,
  clicks: true,
  conversions: true,
  amountPaid: true,
  paymentStatus: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  totalCost: z.number().min(100, "Minimum cost is KES 100"),
});

export const floatingAdSchema = createInsertSchema(floatingAds).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  hideDuration: z.number().min(5, "Minimum hide duration is 5 seconds").max(300, "Maximum hide duration is 5 minutes"),
  startTime: z.string().transform(str => new Date(str)),
  endTime: z.string().transform(str => new Date(str)),
});

// Advertisement types
export type AdPosition = typeof adPositions.$inferSelect;
export type Advertisement = typeof advertisements.$inferSelect;
export type AdPlacement = typeof adPlacements.$inferSelect;
export type AdAnalytics = typeof adAnalytics.$inferSelect;
export type FloatingAd = typeof floatingAds.$inferSelect;
export type InsertAdPosition = z.infer<typeof adPositionSchema>;
export type InsertAdvertisement = z.infer<typeof advertisementSchema>;
export type InsertAdPlacement = z.infer<typeof adPlacementSchema>;
export type InsertFloatingAd = z.infer<typeof floatingAdSchema>;
