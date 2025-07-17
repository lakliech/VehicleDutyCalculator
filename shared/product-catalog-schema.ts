import { pgTable, serial, text, integer, decimal, boolean, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Billing type enum
export const billingTypeEnum = pgEnum('billing_type', [
  'per_period',      // Monthly/yearly subscriptions
  'per_listing',     // Per listing fee
  'per_policy',      // Per insurance policy
  'per_report',      // Per report/calculation
  'per_item',        // Per item/transaction
  'one_time',        // One-time payment
  'pay_per_boost'    // Pay per advertising boost
]);

// Feature limit type enum
export const limitTypeEnum = pgEnum('limit_type', [
  'count',          // Limited by number of uses (e.g., 5 photos)
  'duration',       // Limited by time (e.g., 30 days listing)
  'size',           // Limited by file size (e.g., 5MB per photo)
  'frequency',      // Limited by frequency (e.g., 3 times per day)
  'concurrent',     // Limited by concurrent usage (e.g., 2 active listings)
  'boolean',        // True/false feature (e.g., featured listing)
  'unlimited'       // No limits
]);

// Product categories table
export const productCategories = pgTable('product_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Products table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').references(() => productCategories.id),
  name: text('name').notNull(),
  description: text('description'),
  basePrice: decimal('base_price', { precision: 10, scale: 2 }),
  billingType: billingTypeEnum('billing_type').notNull(),
  targetUsers: text('target_users'),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Product features table
export const productFeatures = pgTable('product_features', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  name: text('name').notNull(),
  description: text('description'),
  limitType: limitTypeEnum('limit_type').default('unlimited'),
  limitValue: integer('limit_value'), // Number for count-based limits
  limitDuration: integer('limit_duration'), // Days for duration-based limits
  limitSize: integer('limit_size'), // Size in MB for size-based limits
  limitFrequency: integer('limit_frequency'), // Frequency per time period
  frequencyPeriod: integer('frequency_period'), // Time period in hours for frequency limits
  constraintConfig: jsonb('constraint_config'), // Additional flexible constraint configuration
  isIncluded: boolean('is_included').default(true),
  additionalCost: decimal('additional_cost', { precision: 10, scale: 2 }).default('0'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Product pricing tiers (for different billing cycles, volumes, etc.)
export const productPricing = pgTable('product_pricing', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  tierName: text('tier_name'), // e.g., "Monthly", "Annual", "Volume 1-10"
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  billingCycle: integer('billing_cycle'), // Days for billing cycle (30, 365, etc.)
  minQuantity: integer('min_quantity').default(1),
  maxQuantity: integer('max_quantity'),
  discountPercentage: decimal('discount_percentage', { precision: 5, scale: 2 }).default('0'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// User product subscriptions
export const userProductSubscriptions = pgTable('user_product_subscriptions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  productId: integer('product_id').references(() => products.id),
  pricingId: integer('pricing_id').references(() => productPricing.id),
  startDate: timestamp('start_date').defaultNow(),
  endDate: timestamp('end_date'),
  isActive: boolean('is_active').default(true),
  autoRenew: boolean('auto_renew').default(false),
  usageCount: integer('usage_count').default(0),
  lastUsed: timestamp('last_used'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Feature usage tracking
export const featureUsage = pgTable('feature_usage', {
  id: serial('id').primaryKey(),
  subscriptionId: integer('subscription_id').references(() => userProductSubscriptions.id),
  featureId: integer('feature_id').references(() => productFeatures.id),
  usageCount: integer('usage_count').default(0),
  lastUsed: timestamp('last_used'),
  resetDate: timestamp('reset_date'), // When usage count resets based on billing cycle
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Product bundles (for combining multiple products)
export const productBundles = pgTable('product_bundles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }),
  discountPercentage: decimal('discount_percentage', { precision: 5, scale: 2 }).default('0'),
  billingType: billingTypeEnum('billing_type').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Bundle products mapping
export const bundleProducts = pgTable('bundle_products', {
  id: serial('id').primaryKey(),
  bundleId: integer('bundle_id').references(() => productBundles.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity').default(1),
  createdAt: timestamp('created_at').defaultNow()
});

// Insert schemas
export const insertProductCategorySchema = createInsertSchema(productCategories).omit({ id: true, createdAt: true, updatedAt: true });
export const insertProductSchema = createInsertSchema(products)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    basePrice: z.string().transform((val) => val === '' ? null : parseFloat(val)).optional(),
    categoryId: z.string().transform((val) => val === '' ? null : parseInt(val)).optional(),
    sortOrder: z.number().optional().default(0)
  });
export const insertProductFeatureSchema = createInsertSchema(productFeatures)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    additionalCost: z.number().optional().default(0),
    sortOrder: z.number().optional().default(0),
    limitValue: z.number().optional().nullable(),
    limitDuration: z.number().optional().nullable(),
    limitSize: z.number().optional().nullable(),
    limitFrequency: z.number().optional().nullable(),
    frequencyPeriod: z.number().optional().nullable(),
    constraintConfig: z.record(z.any()).optional().nullable(),
    isIncluded: z.boolean().optional().default(true)
  });
export const insertProductPricingSchema = createInsertSchema(productPricing).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserProductSubscriptionSchema = createInsertSchema(userProductSubscriptions).omit({ id: true, createdAt: true, updatedAt: true });
export const insertProductBundleSchema = createInsertSchema(productBundles).omit({ id: true, createdAt: true, updatedAt: true });

// Select types
export type ProductCategory = typeof productCategories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductFeature = typeof productFeatures.$inferSelect;
export type ProductPricing = typeof productPricing.$inferSelect;
export type UserProductSubscription = typeof userProductSubscriptions.$inferSelect;
export type ProductBundle = typeof productBundles.$inferSelect;

// Insert types
export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertProductFeature = z.infer<typeof insertProductFeatureSchema>;
export type InsertProductPricing = z.infer<typeof insertProductPricingSchema>;
export type InsertUserProductSubscription = z.infer<typeof insertUserProductSubscriptionSchema>;
export type InsertProductBundle = z.infer<typeof insertProductBundleSchema>;