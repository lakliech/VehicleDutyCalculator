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

// System features table (reference/configuration table for system capabilities)
export const systemFeatures = pgTable('system_features', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  capability: text('capability').notNull(), // What system capability this represents (e.g., 'photo_upload', 'listing_duration')
  limitType: limitTypeEnum('limit_type').default('unlimited'),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Product-feature associations table (links products to features with specific configurations)
export const productFeatureAssociations = pgTable('product_feature_associations', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id).notNull(),
  featureId: integer('feature_id').references(() => systemFeatures.id).notNull(),
  limitValue: integer('limit_value'), // Product-specific limit for count-based features
  limitDuration: integer('limit_duration'), // Product-specific limit for duration-based features
  limitSize: integer('limit_size'), // Product-specific limit for size-based features
  limitFrequency: integer('limit_frequency'), // Product-specific frequency limits
  frequencyPeriod: integer('frequency_period'), // Product-specific time period in hours
  constraintConfig: jsonb('constraint_config'), // Product-specific constraint configuration
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
  featureId: integer('feature_id').references(() => systemFeatures.id),
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

export const updateProductSchema = createInsertSchema(products)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    basePrice: z.string().transform((val) => val === '' ? null : parseFloat(val)).optional(),
    categoryId: z.string().transform((val) => val === '' ? null : parseInt(val)).optional(),
    sortOrder: z.number().optional().default(0)
  })
  .partial();
export const insertSystemFeatureSchema = createInsertSchema(systemFeatures)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    sortOrder: z.number().optional().default(0)
  });

export const insertProductFeatureAssociationSchema = createInsertSchema(productFeatureAssociations)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    additionalCost: z.string().transform((val) => val === '' ? '0' : val).optional().default('0'),
    sortOrder: z.number().optional().default(0),
    limitValue: z.number().optional().nullable(),
    limitDuration: z.number().optional().nullable(),
    limitSize: z.number().optional().nullable(),
    limitFrequency: z.number().optional().nullable(),
    frequencyPeriod: z.number().optional().nullable(),
    constraintConfig: z.record(z.any()).optional().nullable(),
    isIncluded: z.boolean().optional().default(true)
  });

export const updateProductFeatureAssociationSchema = createInsertSchema(productFeatureAssociations)
  .omit({ id: true, createdAt: true, updatedAt: true, productId: true, featureId: true })
  .extend({
    additionalCost: z.string().transform((val) => val === '' ? '0' : val).optional().default('0'),
    sortOrder: z.number().optional().default(0),
    limitValue: z.number().optional().nullable(),
    limitDuration: z.number().optional().nullable(),
    limitSize: z.number().optional().nullable(),
    limitFrequency: z.number().optional().nullable(),
    frequencyPeriod: z.number().optional().nullable(),
    constraintConfig: z.record(z.any()).optional().nullable(),
    isIncluded: z.boolean().optional().default(true)
  })
  .partial();
export const insertProductPricingSchema = createInsertSchema(productPricing).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserProductSubscriptionSchema = createInsertSchema(userProductSubscriptions).omit({ id: true, createdAt: true, updatedAt: true });
export const insertProductBundleSchema = createInsertSchema(productBundles).omit({ id: true, createdAt: true, updatedAt: true });

// Select types
export type ProductCategory = typeof productCategories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type SystemFeature = typeof systemFeatures.$inferSelect;
export type ProductFeatureAssociation = typeof productFeatureAssociations.$inferSelect;
export type ProductPricing = typeof productPricing.$inferSelect;
export type UserProductSubscription = typeof userProductSubscriptions.$inferSelect;
export type ProductBundle = typeof productBundles.$inferSelect;

// Insert types
export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type InsertSystemFeature = z.infer<typeof insertSystemFeatureSchema>;
export type InsertProductFeatureAssociation = z.infer<typeof insertProductFeatureAssociationSchema>;
export type UpdateProductFeatureAssociation = z.infer<typeof updateProductFeatureAssociationSchema>;
export type InsertProductPricing = z.infer<typeof insertProductPricingSchema>;
export type InsertUserProductSubscription = z.infer<typeof insertUserProductSubscriptionSchema>;
export type InsertProductBundle = z.infer<typeof insertProductBundleSchema>;