import { db } from "./db";
import { sql } from "drizzle-orm";

async function migratePaymentTables() {
  console.log("Starting payment tables migration...");
  
  try {
    // Create enums first
    await db.execute(sql`
      CREATE TYPE payment_status AS ENUM (
        'pending',
        'processing',
        'completed',
        'failed',
        'cancelled',
        'refunded',
        'partially_refunded'
      );
    `);

    await db.execute(sql`
      CREATE TYPE payment_method AS ENUM (
        'card',
        'mobile_money',
        'bank_transfer',
        'ussd',
        'bank',
        'mpesa',
        'airtel_money',
        'credit'
      );
    `);

    await db.execute(sql`
      CREATE TYPE transaction_type AS ENUM (
        'purchase',
        'subscription',
        'credit_purchase',
        'credit_deduction',
        'refund',
        'penalty',
        'bonus'
      );
    `);

    // Create user_accounts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_accounts (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES app_users(id) NOT NULL,
        account_number TEXT NOT NULL UNIQUE,
        credit_balance NUMERIC(12, 2) DEFAULT 0.00,
        total_earned NUMERIC(12, 2) DEFAULT 0.00,
        total_spent NUMERIC(12, 2) DEFAULT 0.00,
        account_type TEXT DEFAULT 'standard',
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create payment_transactions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS payment_transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES app_users(id) NOT NULL,
        account_id INTEGER REFERENCES user_accounts(id),
        reference TEXT NOT NULL UNIQUE,
        paystack_reference TEXT,
        amount NUMERIC(12, 2) NOT NULL,
        currency TEXT DEFAULT 'KES',
        status payment_status DEFAULT 'pending',
        method payment_method DEFAULT 'card',
        type transaction_type DEFAULT 'purchase',
        description TEXT,
        metadata JSON,
        product_id INTEGER,
        listing_id INTEGER,
        processing_fee NUMERIC(12, 2),
        net_amount NUMERIC(12, 2),
        paystack_fee_paid NUMERIC(12, 2),
        processed_at TIMESTAMP,
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create account_credit_transactions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS account_credit_transactions (
        id SERIAL PRIMARY KEY,
        account_id INTEGER REFERENCES user_accounts(id) NOT NULL,
        transaction_id INTEGER REFERENCES payment_transactions(id),
        amount NUMERIC(12, 2) NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        reference_type TEXT,
        reference_id TEXT,
        metadata JSON,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create payment_schedules table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS payment_schedules (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES app_users(id) NOT NULL,
        product_id INTEGER,
        listing_id INTEGER,
        amount NUMERIC(12, 2) NOT NULL,
        payment_type TEXT NOT NULL,
        schedule_type TEXT NOT NULL,
        scheduled_date TIMESTAMP,
        description TEXT,
        metadata JSON,
        status TEXT DEFAULT 'pending',
        processed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create user_product_subscriptions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_product_subscriptions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES app_users(id) NOT NULL,
        product_id INTEGER,
        subscription_type TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        current_period_start TIMESTAMP,
        current_period_end TIMESTAMP,
        last_payment_date TIMESTAMP,
        next_billing_date TIMESTAMP,
        cancelled_at TIMESTAMP,
        metadata JSON,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Create indexes for better performance
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_user_accounts_user_id ON user_accounts(user_id);
      CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON payment_transactions(user_id);
      CREATE INDEX IF NOT EXISTS idx_payment_transactions_reference ON payment_transactions(reference);
      CREATE INDEX IF NOT EXISTS idx_payment_transactions_paystack_reference ON payment_transactions(paystack_reference);
      CREATE INDEX IF NOT EXISTS idx_account_credit_transactions_account_id ON account_credit_transactions(account_id);
      CREATE INDEX IF NOT EXISTS idx_payment_schedules_user_id ON payment_schedules(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_product_subscriptions_user_id ON user_product_subscriptions(user_id);
    `);

    console.log("Payment tables migration completed successfully!");
    
  } catch (error) {
    console.error("Error during payment tables migration:", error);
    throw error;
  }
}

// Run the migration
migratePaymentTables().catch(console.error);