import { pgTable, text, integer, boolean, timestamp, decimal, serial, uuid, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// ========================================
// SUBSCRIPTION & BILLING SYSTEM
// ========================================

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "Basic", "Professional", "Enterprise"
  description: text("description"),
  priceKes: decimal("price_kes", { precision: 10, scale: 2 }).notNull(),
  billingCycle: text("billing_cycle").notNull(), // "monthly", "yearly"
  features: jsonb("features").$type<string[]>().notNull().default([]),
  limits: jsonb("limits").$type<{
    maxListings?: number;
    calculationsPerMonth?: number;
    valuationsPerMonth?: number;
    apiCallsPerMonth?: number;
    storageGb?: number;
  }>().notNull().default({}),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  planId: integer("plan_id").notNull().references(() => subscriptionPlans.id),
  status: text("status").notNull(), // "active", "cancelled", "suspended", "past_due"
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  cancelledAt: timestamp("cancelled_at"),
  trialEnd: timestamp("trial_end"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => ({
  userIdIdx: index("user_subscriptions_user_id_idx").on(table.userId),
  statusIdx: index("user_subscriptions_status_idx").on(table.status)
}));

export const billingTransactions = pgTable("billing_transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  subscriptionId: integer("subscription_id").references(() => userSubscriptions.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("KES"),
  type: text("type").notNull(), // "subscription", "one_time", "refund", "addon"
  status: text("status").notNull(), // "pending", "paid", "failed", "refunded"
  paymentMethod: text("payment_method"), // "mpesa", "card", "bank_transfer"
  paymentReference: text("payment_reference"),
  description: text("description"),
  metadata: jsonb("metadata").default({}),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  userIdIdx: index("billing_transactions_user_id_idx").on(table.userId),
  statusIdx: index("billing_transactions_status_idx").on(table.status),
  paymentRefIdx: index("billing_transactions_payment_ref_idx").on(table.paymentReference)
}));

// ========================================
// USAGE TRACKING & LIMITS
// ========================================

export const usageTracking = pgTable("usage_tracking", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  featureType: text("feature_type").notNull(), // "duty_calculation", "valuation", "api_call", "listing"
  resourceId: text("resource_id"), // listing_id, calculation_id, etc.
  usageCount: integer("usage_count").notNull().default(1),
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  userFeatureIdx: index("usage_tracking_user_feature_idx").on(table.userId, table.featureType),
  periodIdx: index("usage_tracking_period_idx").on(table.periodStart, table.periodEnd)
}));

export const featureLimits = pgTable("feature_limits", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").notNull().references(() => subscriptionPlans.id),
  featureType: text("feature_type").notNull(),
  limitValue: integer("limit_value"), // null = unlimited
  resetPeriod: text("reset_period").notNull(), // "monthly", "daily", "yearly"
  isEnabled: boolean("is_enabled").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// ========================================
// FINANCIAL SERVICES INTEGRATION
// ========================================

export const loanReferrals = pgTable("loan_referrals", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  loanApplicationId: text("loan_application_id"), // External reference to loan applications
  bankPartnerId: integer("bank_partner_id").notNull(),
  vehicleListingId: integer("vehicle_listing_id"),
  requestedAmount: decimal("requested_amount", { precision: 12, scale: 2 }).notNull(),
  approvedAmount: decimal("approved_amount", { precision: 12, scale: 2 }),
  status: text("status").notNull(), // "referred", "under_review", "approved", "rejected", "disbursed"
  referralFee: decimal("referral_fee", { precision: 10, scale: 2 }),
  feeStatus: text("fee_status").notNull().default("pending"), // "pending", "earned", "paid"
  referredAt: timestamp("referred_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  userIdIdx: index("loan_referrals_user_id_idx").on(table.userId),
  statusIdx: index("loan_referrals_status_idx").on(table.status),
  feeStatusIdx: index("loan_referrals_fee_status_idx").on(table.feeStatus)
}));

export const insuranceReferrals = pgTable("insurance_referrals", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  vehicleListingId: integer("vehicle_listing_id"),
  insuranceType: text("insurance_type").notNull(), // "comprehensive", "third_party", "commercial"
  insuranceProvider: text("insurance_provider").notNull(),
  premiumAmount: decimal("premium_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(), // "quoted", "purchased", "active", "cancelled"
  referralFee: decimal("referral_fee", { precision: 10, scale: 2 }),
  feeStatus: text("fee_status").notNull().default("pending"),
  quotedAt: timestamp("quoted_at").defaultNow().notNull(),
  purchasedAt: timestamp("purchased_at"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// ========================================
// LISTING MONETIZATION
// ========================================

export const listingPackages = pgTable("listing_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "Basic", "Featured", "Premium", "Spotlight"
  description: text("description"),
  priceKes: decimal("price_kes", { precision: 10, scale: 2 }).notNull(),
  durationDays: integer("duration_days").notNull(),
  features: jsonb("features").$type<{
    featured?: boolean;
    topPlacement?: boolean;
    highlightedBorder?: boolean;
    extraPhotos?: number;
    videoAllowed?: boolean;
    socialMediaPromotion?: boolean;
    analyticsAccess?: boolean;
    prioritySupport?: boolean;
  }>().notNull().default({}),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const listingPromotions = pgTable("listing_promotions", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull(),
  packageId: integer("package_id").notNull().references(() => listingPackages.id),
  userId: text("user_id").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: text("status").notNull(), // "active", "expired", "cancelled"
  amountPaid: decimal("amount_paid", { precision: 10, scale: 2 }).notNull(),
  paymentTransactionId: integer("payment_transaction_id").references(() => billingTransactions.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  listingIdIdx: index("listing_promotions_listing_id_idx").on(table.listingId),
  statusIdx: index("listing_promotions_status_idx").on(table.status),
  dateRangeIdx: index("listing_promotions_date_range_idx").on(table.startDate, table.endDate)
}));

// ========================================
// ANALYTICS & REPORTING MONETIZATION
// ========================================

export const analyticsPackages = pgTable("analytics_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "Basic Analytics", "Pro Analytics", "Enterprise Reports"
  description: text("description"),
  priceKes: decimal("price_kes", { precision: 10, scale: 2 }).notNull(),
  billingCycle: text("billing_cycle").notNull(), // "monthly", "yearly", "one_time"
  features: jsonb("features").$type<{
    advancedDashboard?: boolean;
    competitorAnalysis?: boolean;
    marketTrends?: boolean;
    customReports?: boolean;
    apiAccess?: boolean;
    dataExport?: boolean;
    realTimeUpdates?: boolean;
  }>().notNull().default({}),
  dataRetentionMonths: integer("data_retention_months").notNull().default(12),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const userAnalyticsSubscriptions = pgTable("user_analytics_subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  packageId: integer("package_id").notNull().references(() => analyticsPackages.id),
  status: text("status").notNull(), // "active", "cancelled", "suspended"
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  autoRenew: boolean("auto_renew").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// ========================================
// API MONETIZATION
// ========================================

export const apiPlans = pgTable("api_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "Developer", "Business", "Enterprise"
  description: text("description"),
  priceKes: decimal("price_kes", { precision: 10, scale: 2 }).notNull(),
  requestsPerMonth: integer("requests_per_month"), // null = unlimited
  rateLimit: integer("rate_limit_per_minute").notNull().default(60),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  planId: integer("plan_id").notNull().references(() => apiPlans.id),
  keyHash: text("key_hash").notNull().unique(),
  name: text("name").notNull(),
  lastUsed: timestamp("last_used"),
  isActive: boolean("is_active").notNull().default(true),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  userIdIdx: index("api_keys_user_id_idx").on(table.userId),
  keyHashIdx: index("api_keys_key_hash_idx").on(table.keyHash)
}));

export const apiUsage = pgTable("api_usage", {
  id: serial("id").primaryKey(),
  apiKeyId: integer("api_key_id").notNull().references(() => apiKeys.id),
  endpoint: text("endpoint").notNull(),
  method: text("method").notNull(),
  statusCode: integer("status_code").notNull(),
  responseTime: integer("response_time_ms"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: jsonb("metadata").default({})
}, (table) => ({
  apiKeyIdIdx: index("api_usage_api_key_id_idx").on(table.apiKeyId),
  timestampIdx: index("api_usage_timestamp_idx").on(table.timestamp)
}));

// ========================================
// PARTNER REVENUE SHARING
// ========================================

export const revenueSharing = pgTable("revenue_sharing", {
  id: serial("id").primaryKey(),
  partnerId: text("partner_id").notNull(),
  partnerType: text("partner_type").notNull(), // "bank", "insurance", "dealership", "service_provider"
  transactionType: text("transaction_type").notNull(), // "loan_referral", "insurance_sale", "lead_generation"
  transactionId: text("transaction_id").notNull(),
  grossRevenue: decimal("gross_revenue", { precision: 12, scale: 2 }).notNull(),
  partnerShare: decimal("partner_share", { precision: 12, scale: 2 }).notNull(),
  platformShare: decimal("platform_share", { precision: 12, scale: 2 }).notNull(),
  sharePercentage: decimal("share_percentage", { precision: 5, scale: 2 }).notNull(),
  status: text("status").notNull(), // "pending", "calculated", "paid", "disputed"
  periodMonth: text("period_month").notNull(), // "2025-01"
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  partnerIdIdx: index("revenue_sharing_partner_id_idx").on(table.partnerId),
  periodIdx: index("revenue_sharing_period_idx").on(table.periodMonth),
  statusIdx: index("revenue_sharing_status_idx").on(table.status)
}));

// ========================================
// RELATIONS
// ========================================

export const subscriptionPlansRelations = relations(subscriptionPlans, ({ many }) => ({
  subscriptions: many(userSubscriptions),
  limits: many(featureLimits)
}));

export const userSubscriptionsRelations = relations(userSubscriptions, ({ one, many }) => ({
  plan: one(subscriptionPlans, {
    fields: [userSubscriptions.planId],
    references: [subscriptionPlans.id]
  }),
  transactions: many(billingTransactions)
}));

export const billingTransactionsRelations = relations(billingTransactions, ({ one }) => ({
  subscription: one(userSubscriptions, {
    fields: [billingTransactions.subscriptionId],
    references: [userSubscriptions.id]
  })
}));

// ========================================
// ZOD SCHEMAS
// ========================================

export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
export const insertUserSubscriptionSchema = createInsertSchema(userSubscriptions);
export const insertBillingTransactionSchema = createInsertSchema(billingTransactions);
export const insertUsageTrackingSchema = createInsertSchema(usageTracking);
export const insertLoanReferralSchema = createInsertSchema(loanReferrals);
export const insertListingPackageSchema = createInsertSchema(listingPackages);
export const insertListingPromotionSchema = createInsertSchema(listingPromotions);
export const insertApiPlanSchema = createInsertSchema(apiPlans);
export const insertApiKeySchema = createInsertSchema(apiKeys);

// Types
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type BillingTransaction = typeof billingTransactions.$inferSelect;
export type UsageTracking = typeof usageTracking.$inferSelect;
export type LoanReferral = typeof loanReferrals.$inferSelect;
export type ListingPackage = typeof listingPackages.$inferSelect;
export type ListingPromotion = typeof listingPromotions.$inferSelect;
export type ApiPlan = typeof apiPlans.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;