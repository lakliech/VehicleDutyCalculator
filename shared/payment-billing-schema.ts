import { pgTable, serial, text, integer, decimal, boolean, timestamp, jsonb, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

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
  'airtel_money'
]);

// Transaction type enum
export const transactionTypeEnum = pgEnum('transaction_type', [
  'purchase',          // One-time purchase
  'subscription',      // Recurring subscription
  'credit_purchase',   // Buying account credits
  'credit_deduction',  // Using account credits
  'refund',           // Refund transaction
  'penalty',          // Late fees, etc.
  'bonus'             // Promotional credits
]);

// User accounts (wallet/credit system)
export const userAccounts = pgTable('user_accounts', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  creditBalance: decimal('credit_balance', { precision: 10, scale: 2 }).default('0.00'),
  reservedBalance: decimal('reserved_balance', { precision: 10, scale: 2 }).default('0.00'), // Reserved for pending transactions
  totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).default('0.00'),
  totalEarned: decimal('total_earned', { precision: 10, scale: 2 }).default('0.00'),
  lastTopUp: timestamp('last_top_up'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Payment transactions
export const paymentTransactions = pgTable('payment_transactions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  transactionRef: text('transaction_ref').notNull().unique(), // Paystack reference
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('KES'),
  paymentMethod: paymentMethodEnum('payment_method'),
  status: paymentStatusEnum('status').default('pending'),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  description: text('description'),
  
  // Paystack specific fields
  paystackReference: text('paystack_reference'),
  paystackStatus: text('paystack_status'),
  paystackGatewayResponse: text('paystack_gateway_response'),
  paystackPaidAt: timestamp('paystack_paid_at'),
  paystackChannel: text('paystack_channel'),
  paystackFees: decimal('paystack_fees', { precision: 10, scale: 2 }),
  
  // Product/service details
  productId: integer('product_id'), // References products table
  subscriptionId: integer('subscription_id'), // References user_product_subscriptions
  entityType: text('entity_type'), // 'listing', 'feature', 'subscription', etc.
  entityId: text('entity_id'), // ID of the item being paid for
  
  // Metadata
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Account credit transactions (for tracking credit usage)
export const creditTransactions = pgTable('credit_transactions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  accountId: integer('account_id').references(() => userAccounts.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(), // Positive for credit, negative for debit
  balanceAfter: decimal('balance_after', { precision: 10, scale: 2 }).notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  description: text('description').notNull(),
  
  // Reference to related payment transaction
  paymentTransactionId: integer('payment_transaction_id').references(() => paymentTransactions.id),
  
  // What the credits were used for
  entityType: text('entity_type'), // 'listing', 'feature', 'boost', etc.
  entityId: text('entity_id'),
  
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow()
});

// Payment schedules (for pay-on-delivery items)
export const paymentSchedules = pgTable('payment_schedules', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  productId: integer('product_id'), // What product this payment is for
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('KES'),
  
  // Schedule details
  dueDate: timestamp('due_date').notNull(),
  paymentTrigger: text('payment_trigger').notNull(), // 'listing_activation', 'feature_usage', etc.
  
  // Status tracking
  status: paymentStatusEnum('status').default('pending'),
  paymentTransactionId: integer('payment_transaction_id').references(() => paymentTransactions.id),
  
  // What triggers the payment
  entityType: text('entity_type'), // 'listing', 'boost', etc.
  entityId: text('entity_id'),
  
  // Metadata
  description: text('description'),
  metadata: jsonb('metadata'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Invoice system for business customers
export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  invoiceNumber: text('invoice_number').notNull().unique(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal('paid_amount', { precision: 10, scale: 2 }).default('0.00'),
  currency: text('currency').default('KES'),
  
  status: paymentStatusEnum('status').default('pending'),
  dueDate: timestamp('due_date').notNull(),
  
  // Invoice details
  description: text('description'),
  billingAddress: jsonb('billing_address'),
  lineItems: jsonb('line_items'), // Array of invoice line items
  
  paymentTransactionId: integer('payment_transaction_id').references(() => paymentTransactions.id),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Payment methods stored for users
export const savedPaymentMethods = pgTable('saved_payment_methods', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  
  // Card details (encrypted/tokenized)
  cardLast4: text('card_last4'),
  cardBrand: text('card_brand'),
  cardExpMonth: integer('card_exp_month'),
  cardExpYear: integer('card_exp_year'),
  
  // Mobile money details
  phoneNumber: text('phone_number'),
  
  // Paystack authorization code
  authorizationCode: text('authorization_code'),
  
  isDefault: boolean('is_default').default(false),
  isActive: boolean('is_active').default(true),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Create insert schemas
export const insertUserAccountSchema = createInsertSchema(userAccounts);
export const insertPaymentTransactionSchema = createInsertSchema(paymentTransactions);
export const insertCreditTransactionSchema = createInsertSchema(creditTransactions);
export const insertPaymentScheduleSchema = createInsertSchema(paymentSchedules);
export const insertInvoiceSchema = createInsertSchema(invoices);
export const insertSavedPaymentMethodSchema = createInsertSchema(savedPaymentMethods);

// Create select types
export type UserAccount = typeof userAccounts.$inferSelect;
export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type PaymentSchedule = typeof paymentSchedules.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type SavedPaymentMethod = typeof savedPaymentMethods.$inferSelect;

// Create insert types
export type InsertUserAccount = z.infer<typeof insertUserAccountSchema>;
export type InsertPaymentTransaction = z.infer<typeof insertPaymentTransactionSchema>;
export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
export type InsertPaymentSchedule = z.infer<typeof insertPaymentScheduleSchema>;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type InsertSavedPaymentMethod = z.infer<typeof insertSavedPaymentMethodSchema>;

// Validation schemas for API endpoints
export const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default('KES'),
  productId: z.number().optional(),
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  paymentMethod: z.enum(['card', 'mobile_money', 'bank_transfer', 'ussd', 'bank', 'mpesa', 'airtel_money']).optional(),
  metadata: z.object({}).optional()
});

export const topUpAccountSchema = z.object({
  amount: z.number().min(100), // Minimum KES 100
  paymentMethod: z.enum(['card', 'mobile_money', 'bank_transfer', 'ussd', 'bank', 'mpesa', 'airtel_money']).optional()
});

export const processPaymentSchema = z.object({
  transactionRef: z.string(),
  paystackReference: z.string()
});

export const schedulePaymentSchema = z.object({
  productId: z.number(),
  amount: z.number().min(1),
  dueDate: z.string().datetime(),
  paymentTrigger: z.string(),
  entityType: z.string(),
  entityId: z.string(),
  description: z.string().optional()
});