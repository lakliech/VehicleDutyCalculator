import { db } from '../db';
import { 
  paymentTransactions, userAccounts, accountCreditTransactions, 
  paymentSchedules, userProductSubscriptions, appUsers, carListings
} from '../../shared/schema-minimal';
import { products, productCategories } from '../../shared/product-catalog-schema';
import { eq, and, gte, lte, desc, sum, count, sql } from 'drizzle-orm';
import { PaystackService } from './paystack-service';
import { startOfMonth, endOfMonth, addMonths, addDays, isBefore, isAfter } from 'date-fns';

/**
 * Comprehensive Billing Engine
 * Manages all billing operations, subscriptions, payments, and revenue tracking
 */
export class BillingEngine {

  // ==========================================
  // ACCOUNT MANAGEMENT
  // ==========================================

  /**
   * Get or create user account with credit balance
   */
  static async getOrCreateUserAccount(userId: string): Promise<{
    id: number;
    userId: string;
    accountNumber: string;
    creditBalance: number;
    totalEarned: number;
    totalSpent: number;
    accountType: string;
    status: string;
  }> {
    // Check if account exists
    const existingAccount = await db
      .select()
      .from(userAccounts)
      .where(eq(userAccounts.userId, userId))
      .limit(1);

    if (existingAccount.length > 0) {
      return {
        ...existingAccount[0],
        creditBalance: parseFloat(existingAccount[0].creditBalance || '0'),
        totalEarned: parseFloat(existingAccount[0].totalEarned || '0'),
        totalSpent: parseFloat(existingAccount[0].totalSpent || '0')
      };
    }

    // Create new account
    const accountNumber = `ACC-${Date.now()}-${userId.substring(0, 8)}`;
    const [newAccount] = await db
      .insert(userAccounts)
      .values({
        userId,
        accountNumber,
        creditBalance: '0.00',
        totalEarned: '0.00',
        totalSpent: '0.00',
        accountType: 'standard',
        status: 'active'
      })
      .returning();

    return {
      ...newAccount,
      creditBalance: parseFloat(newAccount.creditBalance || '0'),
      totalEarned: parseFloat(newAccount.totalEarned || '0'),
      totalSpent: parseFloat(newAccount.totalSpent || '0')
    };
  }

  /**
   * Update account balance after transaction
   */
  static async updateAccountBalance(
    accountId: number,
    amount: number,
    transactionType: 'credit' | 'debit',
    description: string,
    paymentTransactionId?: number
  ): Promise<void> {
    const account = await db
      .select()
      .from(userAccounts)
      .where(eq(userAccounts.id, accountId))
      .limit(1);

    if (!account[0]) throw new Error('Account not found');

    const currentBalance = parseFloat(account[0].creditBalance || '0');
    const newBalance = transactionType === 'credit' 
      ? currentBalance + amount 
      : currentBalance - amount;

    if (newBalance < 0 && transactionType === 'debit') {
      throw new Error('Insufficient credit balance');
    }

    // Update account balance
    await db
      .update(userAccounts)
      .set({
        creditBalance: newBalance.toFixed(2),
        totalEarned: transactionType === 'credit' 
          ? (parseFloat(account[0].totalEarned || '0') + amount).toFixed(2)
          : account[0].totalEarned,
        totalSpent: transactionType === 'debit'
          ? (parseFloat(account[0].totalSpent || '0') + amount).toFixed(2)
          : account[0].totalSpent,
        updatedAt: new Date()
      })
      .where(eq(userAccounts.id, accountId));

    // Record credit transaction
    await db
      .insert(accountCreditTransactions)
      .values({
        accountId,
        transactionId: paymentTransactionId,
        amount: (transactionType === 'credit' ? amount : -amount).toFixed(2),
        type: transactionType,
        description,
        createdAt: new Date()
      });
  }

  // ==========================================
  // PAYMENT PROCESSING
  // ==========================================

  /**
   * Process one-time payment
   */
  static async processOneTimePayment(
    userId: string,
    productId: number,
    amount: number,
    paymentMethod: 'paystack' | 'credit',
    metadata?: any
  ): Promise<{
    success: boolean;
    transactionId?: number;
    paystackUrl?: string;
    error?: string;
  }> {
    try {
      const account = await this.getOrCreateUserAccount(userId);
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (!product[0]) {
        return { success: false, error: 'Product not found' };
      }

      const reference = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      if (paymentMethod === 'credit') {
        // Pay with account credits
        if (account.creditBalance < amount) {
          return { success: false, error: 'Insufficient credit balance' };
        }

        // Create transaction record
        const [transaction] = await db
          .insert(paymentTransactions)
          .values({
            userId,
            accountId: account.id,
            reference,
            amount: amount.toFixed(2),
            currency: 'KES',
            status: 'completed',
            method: 'credit',
            type: 'purchase',
            description: `Purchase: ${product[0].name}`,
            productId,
            metadata: JSON.stringify(metadata || {}),
            paidAt: new Date()
          })
          .returning();

        // Update account balance
        await this.updateAccountBalance(
          account.id,
          amount,
          'debit',
          `Purchase: ${product[0].name}`,
          transaction.id
        );

        return { success: true, transactionId: transaction.id };

      } else {
        // Pay with Paystack
        const user = await db
          .select()
          .from(appUsers)
          .where(eq(appUsers.id, userId))
          .limit(1);

        if (!user[0]) {
          return { success: false, error: 'User not found' };
        }

        // Create pending transaction
        const [transaction] = await db
          .insert(paymentTransactions)
          .values({
            userId,
            accountId: account.id,
            reference,
            amount: amount.toFixed(2),
            currency: 'KES',
            status: 'pending',
            method: 'card',
            type: 'purchase',
            description: `Purchase: ${product[0].name}`,
            productId,
            metadata: JSON.stringify(metadata || {})
          })
          .returning();

        // Initialize Paystack payment
        const paystackResult = await PaystackService.initializePayment({
          amount: amount * 100, // Convert to kobo
          email: user[0].email,
          reference,
          metadata: {
            userId,
            productId,
            transactionId: transaction.id,
            ...metadata
          }
        });

        if (!paystackResult.success) {
          return { success: false, error: 'Payment initialization failed' };
        }

        return { 
          success: true, 
          transactionId: transaction.id,
          paystackUrl: paystackResult.data.authorization_url
        };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  }

  /**
   * Process subscription payment
   */
  static async processSubscriptionPayment(
    userId: string,
    productId: number,
    subscriptionType: 'monthly' | 'yearly',
    paymentMethod: 'paystack' | 'credit'
  ): Promise<{
    success: boolean;
    subscriptionId?: number;
    transactionId?: number;
    paystackUrl?: string;
    error?: string;
  }> {
    try {
      const account = await this.getOrCreateUserAccount(userId);
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (!product[0]) {
        return { success: false, error: 'Product not found' };
      }

      const basePrice = parseFloat(product[0].basePrice || '0');
      const subscriptionPrice = subscriptionType === 'yearly' ? basePrice * 12 * 0.9 : basePrice; // 10% discount for yearly

      // Check for existing active subscription
      const existingSubscription = await db
        .select()
        .from(userProductSubscriptions)
        .where(and(
          eq(userProductSubscriptions.userId, userId),
          eq(userProductSubscriptions.productId, productId),
          eq(userProductSubscriptions.status, 'active')
        ))
        .limit(1);

      if (existingSubscription.length > 0) {
        return { success: false, error: 'User already has an active subscription for this product' };
      }

      const now = new Date();
      const periodEnd = subscriptionType === 'yearly' 
        ? addMonths(now, 12) 
        : addMonths(now, 1);

      // Create subscription record
      const [subscription] = await db
        .insert(userProductSubscriptions)
        .values({
          userId,
          productId,
          subscriptionType,
          status: 'pending',
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
          nextBillingDate: periodEnd
        })
        .returning();

      // Process payment
      const paymentResult = await this.processOneTimePayment(
        userId,
        productId,
        subscriptionPrice,
        paymentMethod,
        { subscriptionId: subscription.id, subscriptionType }
      );

      if (paymentResult.success) {
        // Update subscription status
        await db
          .update(userProductSubscriptions)
          .set({ 
            status: 'active',
            lastPaymentDate: now
          })
          .where(eq(userProductSubscriptions.id, subscription.id));

        return {
          success: true,
          subscriptionId: subscription.id,
          transactionId: paymentResult.transactionId,
          paystackUrl: paymentResult.paystackUrl
        };
      } else {
        // Remove pending subscription
        await db
          .delete(userProductSubscriptions)
          .where(eq(userProductSubscriptions.id, subscription.id));

        return paymentResult;
      }
    } catch (error) {
      console.error('Subscription payment error:', error);
      return { success: false, error: 'Subscription payment failed' };
    }
  }

  /**
   * Process credit top-up
   */
  static async processCreditTopUp(
    userId: string,
    amount: number
  ): Promise<{
    success: boolean;
    transactionId?: number;
    paystackUrl?: string;
    error?: string;
  }> {
    try {
      const account = await this.getOrCreateUserAccount(userId);
      const user = await db
        .select()
        .from(appUsers)
        .where(eq(appUsers.id, userId))
        .limit(1);

      if (!user[0]) {
        return { success: false, error: 'User not found' };
      }

      const reference = `TOPUP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create pending transaction
      const [transaction] = await db
        .insert(paymentTransactions)
        .values({
          userId,
          accountId: account.id,
          reference,
          amount: amount.toFixed(2),
          currency: 'KES',
          status: 'pending',
          method: 'card',
          type: 'credit_purchase',
          description: `Account Credit Top-up: KES ${amount.toFixed(2)}`
        })
        .returning();

      // Initialize Paystack payment
      const paystackResult = await PaystackService.initializePayment({
        amount: amount * 100, // Convert to kobo
        email: user[0].email,
        reference,
        metadata: {
          userId,
          transactionId: transaction.id,
          type: 'credit_topup'
        }
      });

      if (!paystackResult.success) {
        return { success: false, error: 'Payment initialization failed' };
      }

      return { 
        success: true, 
        transactionId: transaction.id,
        paystackUrl: paystackResult.data.authorization_url
      };
    } catch (error) {
      console.error('Credit top-up error:', error);
      return { success: false, error: 'Credit top-up failed' };
    }
  }

  // ==========================================
  // SUBSCRIPTION MANAGEMENT
  // ==========================================

  /**
   * Get user's active subscriptions
   */
  static async getUserSubscriptions(userId: string): Promise<Array<{
    id: number;
    productId: number;
    productName: string;
    subscriptionType: string;
    status: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    nextBillingDate: Date;
    lastPaymentDate: Date;
  }>> {
    const subscriptions = await db
      .select({
        id: userProductSubscriptions.id,
        productId: userProductSubscriptions.productId,
        productName: products.name,
        subscriptionType: userProductSubscriptions.subscriptionType,
        status: userProductSubscriptions.status,
        currentPeriodStart: userProductSubscriptions.currentPeriodStart,
        currentPeriodEnd: userProductSubscriptions.currentPeriodEnd,
        nextBillingDate: userProductSubscriptions.nextBillingDate,
        lastPaymentDate: userProductSubscriptions.lastPaymentDate
      })
      .from(userProductSubscriptions)
      .leftJoin(products, eq(userProductSubscriptions.productId, products.id))
      .where(eq(userProductSubscriptions.userId, userId))
      .orderBy(desc(userProductSubscriptions.createdAt));

    return subscriptions.map(sub => ({
      ...sub,
      currentPeriodStart: sub.currentPeriodStart || new Date(),
      currentPeriodEnd: sub.currentPeriodEnd || new Date(),
      nextBillingDate: sub.nextBillingDate || new Date(),
      lastPaymentDate: sub.lastPaymentDate || new Date()
    }));
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(subscriptionId: number, userId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const subscription = await db
        .select()
        .from(userProductSubscriptions)
        .where(and(
          eq(userProductSubscriptions.id, subscriptionId),
          eq(userProductSubscriptions.userId, userId)
        ))
        .limit(1);

      if (!subscription[0]) {
        return { success: false, error: 'Subscription not found' };
      }

      if (subscription[0].status === 'cancelled') {
        return { success: false, error: 'Subscription already cancelled' };
      }

      await db
        .update(userProductSubscriptions)
        .set({
          status: 'cancelled',
          cancelledAt: new Date()
        })
        .where(eq(userProductSubscriptions.id, subscriptionId));

      return { success: true };
    } catch (error) {
      console.error('Subscription cancellation error:', error);
      return { success: false, error: 'Subscription cancellation failed' };
    }
  }

  /**
   * Process recurring billing for all active subscriptions
   */
  static async processRecurringBilling(): Promise<{
    processed: number;
    successful: number;
    failed: number;
    errors: string[];
  }> {
    const now = new Date();
    const errors: string[] = [];
    let processed = 0;
    let successful = 0;
    let failed = 0;

    try {
      // Get all subscriptions due for billing
      const dueSubscriptions = await db
        .select()
        .from(userProductSubscriptions)
        .leftJoin(products, eq(userProductSubscriptions.productId, products.id))
        .where(and(
          eq(userProductSubscriptions.status, 'active'),
          lte(userProductSubscriptions.nextBillingDate, now)
        ));

      for (const subscription of dueSubscriptions) {
        processed++;
        
        try {
          const basePrice = parseFloat(subscription.products?.basePrice || '0');
          const subscriptionPrice = subscription.user_product_subscriptions.subscriptionType === 'yearly' 
            ? basePrice * 12 * 0.9 
            : basePrice;

          // Try to charge with credits first
          const account = await this.getOrCreateUserAccount(subscription.user_product_subscriptions.userId);
          
          if (account.creditBalance >= subscriptionPrice) {
            // Charge with credits
            const reference = `RECURRING-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            const [transaction] = await db
              .insert(paymentTransactions)
              .values({
                userId: subscription.user_product_subscriptions.userId,
                accountId: account.id,
                reference,
                amount: subscriptionPrice.toFixed(2),
                currency: 'KES',
                status: 'completed',
                method: 'credit',
                type: 'subscription',
                description: `Recurring subscription: ${subscription.products?.name}`,
                productId: subscription.user_product_subscriptions.productId,
                paidAt: new Date()
              })
              .returning();

            await this.updateAccountBalance(
              account.id,
              subscriptionPrice,
              'debit',
              `Recurring subscription: ${subscription.products?.name}`,
              transaction.id
            );

            // Update subscription for next billing cycle
            const nextBillingDate = subscription.user_product_subscriptions.subscriptionType === 'yearly'
              ? addMonths(subscription.user_product_subscriptions.nextBillingDate || now, 12)
              : addMonths(subscription.user_product_subscriptions.nextBillingDate || now, 1);

            await db
              .update(userProductSubscriptions)
              .set({
                lastPaymentDate: now,
                nextBillingDate,
                currentPeriodStart: now,
                currentPeriodEnd: nextBillingDate
              })
              .where(eq(userProductSubscriptions.id, subscription.user_product_subscriptions.id));

            successful++;
          } else {
            // Mark subscription as payment failed
            await db
              .update(userProductSubscriptions)
              .set({
                status: 'payment_failed',
                nextBillingDate: addDays(now, 3) // Retry in 3 days
              })
              .where(eq(userProductSubscriptions.id, subscription.user_product_subscriptions.id));

            failed++;
            errors.push(`Insufficient credits for subscription ${subscription.user_product_subscriptions.id}`);
          }
        } catch (error) {
          failed++;
          errors.push(`Failed to process subscription ${subscription.user_product_subscriptions.id}: ${error}`);
        }
      }

      return { processed, successful, failed, errors };
    } catch (error) {
      console.error('Recurring billing error:', error);
      return { processed, successful, failed, errors: [...errors, `System error: ${error}`] };
    }
  }

  // ==========================================
  // REVENUE ANALYTICS
  // ==========================================

  /**
   * Get revenue analytics for admin dashboard
   */
  static async getRevenueAnalytics(
    startDate?: Date,
    endDate?: Date
  ): Promise<{
    totalRevenue: number;
    totalTransactions: number;
    averageTransactionValue: number;
    revenueByMethod: Array<{ method: string; revenue: number; count: number }>;
    revenueByProduct: Array<{ productName: string; revenue: number; count: number }>;
    dailyRevenue: Array<{ date: string; revenue: number; transactions: number }>;
    subscriptionMetrics: {
      activeSubscriptions: number;
      monthlyRecurringRevenue: number;
      yearlyRecurringRevenue: number;
      churnRate: number;
    };
  }> {
    const start = startDate || startOfMonth(new Date());
    const end = endDate || endOfMonth(new Date());

    // Total revenue and transactions
    const totalStats = await db
      .select({
        totalRevenue: sum(paymentTransactions.amount),
        totalTransactions: count()
      })
      .from(paymentTransactions)
      .where(and(
        eq(paymentTransactions.status, 'completed'),
        gte(paymentTransactions.createdAt, start),
        lte(paymentTransactions.createdAt, end)
      ));

    const totalRevenue = parseFloat(totalStats[0]?.totalRevenue || '0');
    const totalTransactions = parseInt(totalStats[0]?.totalTransactions || '0');

    // Revenue by payment method
    const methodRevenue = await db
      .select({
        method: paymentTransactions.method,
        revenue: sum(paymentTransactions.amount),
        count: count()
      })
      .from(paymentTransactions)
      .where(and(
        eq(paymentTransactions.status, 'completed'),
        gte(paymentTransactions.createdAt, start),
        lte(paymentTransactions.createdAt, end)
      ))
      .groupBy(paymentTransactions.method);

    // Revenue by product
    const productRevenue = await db
      .select({
        productName: products.name,
        revenue: sum(paymentTransactions.amount),
        count: count()
      })
      .from(paymentTransactions)
      .leftJoin(products, eq(paymentTransactions.productId, products.id))
      .where(and(
        eq(paymentTransactions.status, 'completed'),
        gte(paymentTransactions.createdAt, start),
        lte(paymentTransactions.createdAt, end)
      ))
      .groupBy(products.name);

    // Daily revenue
    const dailyRevenue = await db
      .select({
        date: sql`DATE(${paymentTransactions.createdAt})`,
        revenue: sum(paymentTransactions.amount),
        transactions: count()
      })
      .from(paymentTransactions)
      .where(and(
        eq(paymentTransactions.status, 'completed'),
        gte(paymentTransactions.createdAt, start),
        lte(paymentTransactions.createdAt, end)
      ))
      .groupBy(sql`DATE(${paymentTransactions.createdAt})`)
      .orderBy(sql`DATE(${paymentTransactions.createdAt})`);

    // Subscription metrics
    const activeSubscriptions = await db
      .select({ count: count() })
      .from(userProductSubscriptions)
      .where(eq(userProductSubscriptions.status, 'active'));

    const monthlySubscriptions = await db
      .select({
        revenue: sum(products.basePrice)
      })
      .from(userProductSubscriptions)
      .leftJoin(products, eq(userProductSubscriptions.productId, products.id))
      .where(and(
        eq(userProductSubscriptions.status, 'active'),
        eq(userProductSubscriptions.subscriptionType, 'monthly')
      ));

    const yearlySubscriptions = await db
      .select({
        revenue: sum(sql`${products.basePrice} * 12 * 0.9`)
      })
      .from(userProductSubscriptions)
      .leftJoin(products, eq(userProductSubscriptions.productId, products.id))
      .where(and(
        eq(userProductSubscriptions.status, 'active'),
        eq(userProductSubscriptions.subscriptionType, 'yearly')
      ));

    return {
      totalRevenue,
      totalTransactions,
      averageTransactionValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
      revenueByMethod: methodRevenue.map(m => ({
        method: m.method || 'Unknown',
        revenue: parseFloat(m.revenue || '0'),
        count: parseInt(m.count || '0')
      })),
      revenueByProduct: productRevenue.map(p => ({
        productName: p.productName || 'Unknown',
        revenue: parseFloat(p.revenue || '0'),
        count: parseInt(p.count || '0')
      })),
      dailyRevenue: dailyRevenue.map(d => ({
        date: d.date as string,
        revenue: parseFloat(d.revenue || '0'),
        transactions: parseInt(d.transactions || '0')
      })),
      subscriptionMetrics: {
        activeSubscriptions: parseInt(activeSubscriptions[0]?.count || '0'),
        monthlyRecurringRevenue: parseFloat(monthlySubscriptions[0]?.revenue || '0'),
        yearlyRecurringRevenue: parseFloat(yearlySubscriptions[0]?.revenue || '0'),
        churnRate: 0 // TODO: Calculate churn rate
      }
    };
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================

  /**
   * Get user's billing history
   */
  static async getUserBillingHistory(userId: string, limit: number = 50): Promise<Array<{
    id: number;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    method: string;
    type: string;
    description: string;
    productName?: string;
    createdAt: Date;
    paidAt?: Date;
  }>> {
    const history = await db
      .select({
        id: paymentTransactions.id,
        reference: paymentTransactions.reference,
        amount: paymentTransactions.amount,
        currency: paymentTransactions.currency,
        status: paymentTransactions.status,
        method: paymentTransactions.method,
        type: paymentTransactions.type,
        description: paymentTransactions.description,
        productName: products.name,
        createdAt: paymentTransactions.createdAt,
        paidAt: paymentTransactions.paidAt
      })
      .from(paymentTransactions)
      .leftJoin(products, eq(paymentTransactions.productId, products.id))
      .where(eq(paymentTransactions.userId, userId))
      .orderBy(desc(paymentTransactions.createdAt))
      .limit(limit);

    return history.map(h => ({
      ...h,
      amount: parseFloat(h.amount),
      createdAt: h.createdAt || new Date(),
      paidAt: h.paidAt || undefined
    }));
  }

  /**
   * Get detailed account summary
   */
  static async getAccountSummary(userId: string): Promise<{
    account: {
      id: number;
      accountNumber: string;
      creditBalance: number;
      totalEarned: number;
      totalSpent: number;
      accountType: string;
      status: string;
    };
    activeSubscriptions: number;
    totalTransactions: number;
    lastPaymentDate?: Date;
    nextBillingDate?: Date;
  }> {
    const account = await this.getOrCreateUserAccount(userId);
    const subscriptions = await this.getUserSubscriptions(userId);
    const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
    
    const transactionCount = await db
      .select({ count: count() })
      .from(paymentTransactions)
      .where(eq(paymentTransactions.userId, userId));

    const lastPayment = await db
      .select({ paidAt: paymentTransactions.paidAt })
      .from(paymentTransactions)
      .where(and(
        eq(paymentTransactions.userId, userId),
        eq(paymentTransactions.status, 'completed')
      ))
      .orderBy(desc(paymentTransactions.paidAt))
      .limit(1);

    const nextBilling = subscriptions
      .filter(s => s.status === 'active')
      .reduce((earliest, sub) => {
        if (!earliest || sub.nextBillingDate < earliest) {
          return sub.nextBillingDate;
        }
        return earliest;
      }, null as Date | null);

    return {
      account,
      activeSubscriptions,
      totalTransactions: parseInt(transactionCount[0]?.count || '0'),
      lastPaymentDate: lastPayment[0]?.paidAt || undefined,
      nextBillingDate: nextBilling || undefined
    };
  }
}