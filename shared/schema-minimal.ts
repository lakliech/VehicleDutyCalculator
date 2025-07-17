import { pgTable, text, serial, integer, decimal, boolean, timestamp, varchar, json, numeric, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Payment status enum
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
  'refunded',
  'partially_refunded'
]);

// Payment method enum
export const paymentMethodEnum = pgEnum('payment_method', [
  'card',
  'mobile_money',
  'bank_transfer',
  'ussd',
  'bank',
  'mpesa',
  'airtel_money',
  'credit'
]);

// Transaction type enum
export const transactionTypeEnum = pgEnum('transaction_type', [
  'purchase',
  'subscription',
  'credit_purchase',
  'credit_deduction',
  'refund',
  'penalty',
  'bonus'
]);

// Essential tables for marketplace functionality

// ==============================
// USER AUTHENTICATION & MANAGEMENT
// ==============================

export const appUsers = pgTable("app_users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 255 }),
  profileImageUrl: varchar("profile_image_url", { length: 255 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  oauthProvider: varchar("oauth_provider", { length: 255 }),
  isActive: boolean("is_active").default(true),
  isEmailVerified: boolean("is_email_verified").default(false),
  status: varchar("status", { length: 50 }).default("active"), // active, suspended, banned
  roleId: integer("role_id"),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// CAR LISTINGS 
// ==============================

export const carListings = pgTable("car_listings", {
  id: serial("id").primaryKey(),
  sellerId: varchar("seller_id", { length: 255 }).references(() => appUsers.id).notNull(),
  title: text("title").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engineSize: integer("engine_size"), // in cc
  mileage: integer("mileage"), // in km
  fuelType: text("fuel_type"), // petrol, diesel, electric, hybrid
  bodyType: text("body_type"), // sedan, suv, hatchback, etc.
  transmission: text("transmission"), // manual, automatic
  driveConfiguration: text("drive_configuration"), // 2WD, 4WD, AWD
  exteriorColor: text("exterior_color"),
  interiorColor: text("interior_color"),
  color: text("color"), // legacy color field
  condition: text("condition"),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  negotiable: boolean("negotiable").default(true),
  location: text("location").notNull(),
  description: text("description"),
  features: json("features").$type<string[]>(), // array of feature strings
  documents: json("documents"), // array of document objects
  images: json("images").$type<string[]>(), // array of image URLs
  videos: json("videos").$type<string[]>(),
  viewCount: integer("view_count").default(0),
  favoriteCount: integer("favorite_count").default(0),
  status: text("status").default("pending"), // pending, active, inactive, sold, rejected, archived
  phoneNumber: varchar("phone_number", { length: 50 }),
  whatsappNumber: varchar("whatsapp_number", { length: 50 }),
  isVerified: boolean("is_verified").default(false),
  featured: boolean("featured").default(false),
  isFlagged: boolean("is_flagged").default(false),
  flagReason: text("flag_reason"),
  flaggedAt: timestamp("flagged_at"),
  flaggedBy: varchar("flagged_by", { length: 255 }),
  soldAt: timestamp("sold_at"),
  soldBy: varchar("sold_by", { length: 255 }),
  archivedAt: timestamp("archived_at"),
  archivedBy: varchar("archived_by", { length: 255 }),
  expirationDate: timestamp("expiration_date"),
  listingSource: text("listing_source"),
  verifiedBadgeType: text("verified_badge_type"),
  adminNotes: text("admin_notes"),
  vinNumber: text("vin_number"),
  registrationNumber: text("registration_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// MESSAGING SYSTEM
// ==============================

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'listing_inquiry', 'general_support', etc.
  title: text("title").notNull(),
  context: text("context"), // JSON object with relevant context (listingId, etc.)
  status: text("status").notNull().default("active"), // 'active', 'archived', 'closed'
  lastMessageAt: timestamp("last_message_at"),
  participantCount: integer("participant_count").default(2),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversationParticipants = pgTable("conversation_participants", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  role: text("role").notNull(), // 'buyer', 'seller', 'admin'
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true),
  lastReadMessageId: integer("last_read_message_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  senderId: varchar("sender_id", { length: 255 }).references(() => appUsers.id).notNull(),
  messageType: text("message_type").notNull().default("text"), // 'text', 'image', 'file', 'system'
  content: text("content").notNull(),
  metadata: text("metadata"), // JSON for attachments, etc.
  readCount: integer("read_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// APPOINTMENTS
// ==============================

export const videoCallAppointments = pgTable("video_call_appointments", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id, { onDelete: "cascade" }).notNull(),
  buyerId: varchar("buyer_id", { length: 255 }).references(() => appUsers.id).notNull(),
  sellerId: varchar("seller_id", { length: 255 }).references(() => appUsers.id).notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull().default(30), // in minutes
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed, no_show
  meetingLink: text("meeting_link"),
  notes: text("notes"),
  sellerNotes: text("seller_notes"),
  cancellationReason: text("cancellation_reason"),
  completionNotes: text("completion_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testDriveAppointments = pgTable("test_drive_appointments", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id, { onDelete: "cascade" }).notNull(),
  buyerId: varchar("buyer_id", { length: 255 }).references(() => appUsers.id).notNull(),
  sellerId: varchar("seller_id", { length: 255 }).references(() => appUsers.id).notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull().default(60), // in minutes
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed, no_show
  meetingLocation: text("meeting_location"),
  buyerNotes: text("buyer_notes"),
  sellerNotes: text("seller_notes"),
  cancellationReason: text("cancellation_reason"),
  completionNotes: text("completion_notes"),
  documentsRequired: json("documents_required").$type<string[]>(),
  additionalRequirements: text("additional_requirements"),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// SELLER AVAILABILITY
// ==============================

export const sellerAvailability = pgTable("seller_availability", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0 = Sunday, 1 = Monday, etc.
  startTime: text("start_time").notNull(), // HH:MM format
  endTime: text("end_time").notNull(), // HH:MM format
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sellerBlockedSlots = pgTable("seller_blocked_slots", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  startDateTime: timestamp("start_date_time").notNull(),
  endDateTime: timestamp("end_date_time").notNull(),
  reason: text("reason"),
  isRecurring: boolean("is_recurring").default(false),
  recurrencePattern: text("recurrence_pattern"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sellerAppointmentPreferences = pgTable("seller_appointment_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  autoApprove: boolean("auto_approve").default(false),
  minimumAdvanceNoticeHours: integer("minimum_advance_notice_hours").default(24),
  maxAppointmentsPerDay: integer("max_appointments_per_day").default(5),
  allowWeekends: boolean("allow_weekends").default(true),
  defaultTestDriveLocation: text("default_test_drive_location"),
  defaultMeetingDuration: integer("default_meeting_duration").default(60),
  bufferTimeBetweenAppointments: integer("buffer_time_between_appointments").default(30),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// PRICING TABLES
// ==============================

export const seasonalPricingTrends = pgTable("seasonal_pricing_trends", {
  id: serial("id").primaryKey(),
  month: integer("month").notNull(),
  seasonality: varchar("seasonality", { length: 50 }).notNull(),
  avgPriceMultiplier: numeric("avg_price_multiplier").notNull(),
  demandLevel: varchar("demand_level", { length: 50 }).notNull(),
  supplyLevel: varchar("supply_level", { length: 50 }).notNull(),
  recommendations: text("recommendations").notNull(),
  bestBuyingOpportunity: boolean("best_buying_opportunity"),
  bestSellingOpportunity: boolean("best_selling_opportunity"),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const priceAlerts = pgTable("price_alerts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  listingId: integer("listing_id").references(() => carListings.id),
  alertType: varchar("alert_type", { length: 50 }).notNull(),
  alertMessage: text("alert_message").notNull(),
  priority: varchar("priority", { length: 20 }).default("medium"),
  currentPrice: numeric("current_price", { precision: 12, scale: 2 }),
  targetPrice: numeric("target_price", { precision: 12, scale: 2 }),
  priceDeviation: numeric("price_deviation", { precision: 5, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const marketInsights = pgTable("market_insights", {
  id: serial("id").primaryKey(),
  insightType: varchar("insight_type", { length: 50 }).notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  detailedAnalysis: text("detailed_analysis"),
  actionableRecommendations: json("actionable_recommendations").$type<string[]>(),
  priority: varchar("priority", { length: 20 }).default("medium"),
  confidenceLevel: numeric("confidence_level", { precision: 3, scale: 2 }),
  category: varchar("category", { length: 100 }),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const depreciationForecasts = pgTable("depreciation_forecasts", {
  id: serial("id").primaryKey(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  engineCapacity: integer("engine_capacity"),
  currentValue: numeric("current_value", { precision: 12, scale: 2 }),
  threeMonthForecast: numeric("three_month_forecast", { precision: 12, scale: 2 }),
  sixMonthForecast: numeric("six_month_forecast", { precision: 12, scale: 2 }),
  twelveMonthForecast: numeric("twelve_month_forecast", { precision: 12, scale: 2 }),
  confidenceLevel: numeric("confidence_level", { precision: 3, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const marketPriceAnalysis = pgTable("market_price_analysis", {
  id: serial("id").primaryKey(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  engineCapacity: integer("engine_capacity"),
  averagePrice: numeric("average_price", { precision: 12, scale: 2 }),
  medianPrice: numeric("median_price", { precision: 12, scale: 2 }),
  minPrice: numeric("min_price", { precision: 12, scale: 2 }),
  maxPrice: numeric("max_price", { precision: 12, scale: 2 }),
  listingCount: integer("listing_count"),
  priceRange: varchar("price_range", { length: 50 }),
  marketTrend: varchar("market_trend", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==============================
// USER ACTIVITIES (SIMPLIFIED)
// ==============================

export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  activityType: text("activity_type").notNull(),
  description: text("description"),
  entityType: text("entity_type"), // 'listing', 'user', etc.
  entityId: text("entity_id"),
  metadata: text("metadata"), // JSON for additional data
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==============================
// FINANCIAL SERVICES
// ==============================

export const bankPartners = pgTable("bank_partners", {
  id: serial("id").primaryKey(),
  bankName: text("bank_name").notNull(),
  logoUrl: text("logo_url"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  website: text("website"),
  websiteUrl: varchar("website_url", { length: 255 }),
  bankCode: varchar("bank_code", { length: 50 }),
  apiEndpoint: varchar("api_endpoint", { length: 255 }),
  apiKey: varchar("api_key", { length: 255 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const loanProducts = pgTable("loan_products", {
  id: serial("id").primaryKey(),
  bankId: integer("bank_id").references(() => bankPartners.id).notNull(),
  productName: text("product_name").notNull(),
  productType: text("product_type").notNull(),
  minLoanAmount: numeric("min_loan_amount", { precision: 12, scale: 2 }),
  maxLoanAmount: numeric("max_loan_amount", { precision: 12, scale: 2 }),
  minInterestRate: numeric("min_interest_rate", { precision: 5, scale: 2 }),
  maxInterestRate: numeric("max_interest_rate", { precision: 5, scale: 2 }),
  minTenureMonths: integer("min_tenure_months"),
  maxTenureMonths: integer("max_tenure_months"),
  maxFinancingPercentage: numeric("max_financing_percentage", { precision: 6, scale: 2 }),
  minDownPaymentPercentage: numeric("min_down_payment_percentage", { precision: 6, scale: 2 }),
  processingFeeRate: numeric("processing_fee_rate", { precision: 6, scale: 2 }),
  processingFeeFixed: numeric("processing_fee_fixed", { precision: 10, scale: 2 }),
  insuranceRequired: boolean("insurance_required").default(false),
  guarantorRequired: boolean("guarantor_required").default(false),
  minMonthlyIncome: numeric("min_monthly_income", { precision: 10, scale: 2 }),
  maxAge: integer("max_age"),
  eligibilityCriteria: json("eligibility_criteria"),
  requiredDocuments: json("required_documents"),
  features: json("features"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const loanApplications = pgTable("loan_applications", {
  id: serial("id").primaryKey(),
  applicationNumber: text("application_number").notNull().unique(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  loanProductId: integer("loan_product_id").references(() => loanProducts.id),
  vehicleListingId: integer("vehicle_listing_id").references(() => carListings.id),
  applicantName: text("applicant_name").notNull(),
  applicantEmail: text("applicant_email").notNull(),
  applicantPhone: text("applicant_phone").notNull(),
  nationalId: text("national_id").notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),
  maritalStatus: text("marital_status"),
  employmentStatus: text("employment_status").notNull(),
  employerName: text("employer_name"),
  jobTitle: text("job_title"),
  monthlyIncome: numeric("monthly_income", { precision: 12, scale: 2 }).notNull(),
  monthlyExpenses: numeric("monthly_expenses", { precision: 12, scale: 2 }),
  requestedAmount: numeric("requested_amount", { precision: 12, scale: 2 }).notNull(),
  downPaymentAmount: numeric("down_payment_amount", { precision: 12, scale: 2 }),
  preferredTenureMonths: integer("preferred_tenure_months").notNull(),
  purposeOfLoan: text("purpose_of_loan"),
  vehicleMake: text("vehicle_make"),
  vehicleModel: text("vehicle_model"),
  vehicleYear: integer("vehicle_year"),
  vehiclePrice: numeric("vehicle_price", { precision: 12, scale: 2 }),
  additionalNotes: text("additional_notes"),
  status: text("status").default("pending"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by", { length: 255 }),
  preApprovalAmount: numeric("pre_approval_amount", { precision: 12, scale: 2 }),
  approvedInterestRate: numeric("approved_interest_rate", { precision: 5, scale: 2 }),
  approvedTenureMonths: integer("approved_tenure_months"),
  remarks: text("remarks"),
});

// ==============================
// PAYMENT & BILLING TABLES
// ==============================

export const userAccounts = pgTable("user_accounts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  accountNumber: text("account_number").notNull().unique(),
  creditBalance: numeric("credit_balance", { precision: 12, scale: 2 }).default("0.00"),
  totalEarned: numeric("total_earned", { precision: 12, scale: 2 }).default("0.00"),
  totalSpent: numeric("total_spent", { precision: 12, scale: 2 }).default("0.00"),
  accountType: text("account_type").default("standard"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const paymentTransactions = pgTable("payment_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  accountId: integer("account_id").references(() => userAccounts.id),
  reference: text("reference").notNull().unique(),
  paystackReference: text("paystack_reference"),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").default("KES"),
  status: paymentStatusEnum("status").default("pending"),
  method: paymentMethodEnum("method").default("card"),
  type: transactionTypeEnum("type").default("purchase"),
  description: text("description"),
  metadata: json("metadata"),
  productId: integer("product_id"),
  listingId: integer("listing_id"),
  processingFee: numeric("processing_fee", { precision: 12, scale: 2 }),
  netAmount: numeric("net_amount", { precision: 12, scale: 2 }),
  paystackFeePaid: numeric("paystack_fee_paid", { precision: 12, scale: 2 }),
  processedAt: timestamp("processed_at"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accountCreditTransactions = pgTable("account_credit_transactions", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id").references(() => userAccounts.id).notNull(),
  transactionId: integer("transaction_id").references(() => paymentTransactions.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  type: text("type").notNull(),
  description: text("description"),
  referenceType: text("reference_type"),
  referenceId: text("reference_id"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const paymentSchedules = pgTable("payment_schedules", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  productId: integer("product_id"),
  listingId: integer("listing_id"),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  paymentType: text("payment_type").notNull(),
  scheduleType: text("schedule_type").notNull(),
  scheduledDate: timestamp("scheduled_date"),
  description: text("description"),
  metadata: json("metadata"),
  status: text("status").default("pending"),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userProductSubscriptions = pgTable("user_product_subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  productId: integer("product_id"),
  subscriptionType: text("subscription_type").notNull(),
  status: text("status").default("active"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  lastPaymentDate: timestamp("last_payment_date"),
  nextBillingDate: timestamp("next_billing_date"),
  cancelledAt: timestamp("cancelled_at"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// TYPES & SCHEMAS
// ==============================

export type AppUser = typeof appUsers.$inferSelect;
export type InsertAppUser = typeof appUsers.$inferInsert;
export const insertAppUserSchema = createInsertSchema(appUsers).omit({ id: true, createdAt: true, updatedAt: true });

export type CarListing = typeof carListings.$inferSelect;
export type InsertCarListing = typeof carListings.$inferInsert;
export const insertCarListingSchema = createInsertSchema(carListings).omit({ id: true, createdAt: true, updatedAt: true });

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

export type VideoCallAppointment = typeof videoCallAppointments.$inferSelect;
export type InsertVideoCallAppointment = typeof videoCallAppointments.$inferInsert;

export type TestDriveAppointment = typeof testDriveAppointments.$inferSelect;
export type InsertTestDriveAppointment = typeof testDriveAppointments.$inferInsert;

export type UserActivity = typeof userActivities.$inferSelect;
export type InsertUserActivity = typeof userActivities.$inferInsert;

// ==============================
// PASSPORT USER INTERFACE
// ==============================

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
}

// Import product catalog schema
export * from './product-catalog-schema';