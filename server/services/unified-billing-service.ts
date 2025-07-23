import { db } from '../db';
import { 
  products,
  subscriptionPlans, 
  userSubscriptions, 
  userProductAccess,
  appUsers,
  paymentTransactions,
  userAccounts,
  accountCreditTransactions
} from '../../shared/schema-minimal';
import { eq, and, gte, desc, inArray, sum, count } from 'drizzle-orm';
import { PaystackService } from './paystack-service';

/**
 * Unified Billing Service - Consolidates all payment, subscription, and product management
 * Replaces: MonetizationService, BillingEngine, SubscriptionProductService
 */
export class UnifiedBillingService {

  // ========================================
  // SUBSCRIPTION & PRODUCT MANAGEMENT
  // ========================================

  /**
   * Get all subscription plans with included products
   */
  static async getSubscriptionPlans() {
    try {
      const plans = await db.select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.isActive, true))
        .orderBy(subscriptionPlans.sortOrder);

      // Return plans with basic structure expected by frontend
      return plans.map(plan => ({
        ...plan,
        monthly_price: plan.priceKes, // Map priceKes to expected monthly_price
        products: []
      }));
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      return [];
    }
  }

  /**
   * Get user's current subscription with full details
   */
  static async getUserSubscription(userId: string) {
    try {
      const subscriptions = await db.select({
        subscription: userSubscriptions,
        plan: subscriptionPlans
      })
      .from(userSubscriptions)
      .leftJoin(subscriptionPlans, eq(userSubscriptions.planId, subscriptionPlans.id))
      .where(and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, 'active'),
        gte(userSubscriptions.endDate, new Date())
      ))
      .limit(1);

      if (subscriptions.length === 0) return null;

      const { subscription, plan } = subscriptions[0];
      
      return { 
        subscription: {
          ...subscription,
          subscription_type: plan?.name || 'Unknown'
        }, 
        plan, 
        products: [] 
      };
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      return null;
    }
  }

  /**
   * Get all user's product access (subscription + direct purchases)
   */
  static async getUserProductAccess(userId: string) {
    // Get subscription products
    const subscriptionData = await this.getUserSubscription(userId);
    const subscriptionProducts = subscriptionData?.products || [];

    // Get direct product access
    const directAccess = await db.select({
      access: userProductAccess,
      product: products
    })
    .from(userProductAccess)
    .leftJoin(products, eq(userProductAccess.productId, products.id))
    .where(and(
      eq(userProductAccess.userId, userId),
      eq(userProductAccess.isActive, true)
    ));

    const directProducts = directAccess
      .filter(item => item.product && (!item.access.expiresAt || item.access.expiresAt > new Date()))
      .map(item => ({
        ...item.product!,
        accessType: item.access.accessType,
        usageCount: item.access.usageCount,
        usageLimit: item.access.usageLimit
      }));

    // Combine and deduplicate
    const allProducts = [...subscriptionProducts, ...directProducts];
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    return {
      subscription: subscriptionData,
      products: uniqueProducts
    };
  }

  // ========================================
  // PAYMENT & BILLING MANAGEMENT
  // ========================================

  /**
   * Create subscription with payment
   */
  static async createSubscription(userId: string, planId: number, billingType: 'monthly' | 'yearly') {
    const plan = await db.select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.id, planId))
      .limit(1);

    if (!plan[0]) {
      throw new Error('Subscription plan not found');
    }

    const planData = plan[0];
    const amount = billingType === 'yearly' ? planData.yearlyPrice : planData.monthlyPrice;

    // Initialize payment with Paystack
    const paymentData = await PaystackService.initializePayment({
      email: '', // Will be filled from user data
      amount: parseFloat(amount) * 100, // Convert to kobo
      metadata: {
        type: 'subscription',
        planId,
        billingType,
        userId
      }
    });

    return paymentData;
  }

  /**
   * Process subscription payment completion
   */
  static async processSubscriptionPayment(paymentRef: string, userId: string) {
    // Verify payment with Paystack
    const paymentVerification = await PaystackService.verifyPayment(paymentRef);
    
    if (paymentVerification.status !== 'success') {
      throw new Error('Payment verification failed');
    }

    const { planId, billingType } = paymentVerification.metadata;
    
    // Create subscription record
    const startDate = new Date();
    const endDate = new Date();
    if (billingType === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const subscription = await db.insert(userSubscriptions).values({
      userId,
      planId: parseInt(planId),
      status: 'active',
      subscriptionType: billingType,
      currentPeriodStart: startDate,
      currentPeriodEnd: endDate,
      nextBillingDate: endDate
    }).returning();

    // Grant product access based on plan
    const plan = await db.select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.id, parseInt(planId)))
      .limit(1);

    if (plan[0]?.productIds) {
      const accessPromises = plan[0].productIds.map(productId =>
        db.insert(userProductAccess).values({
          userId,
          productId,
          subscriptionId: subscription[0].id,
          accessType: 'subscription',
          isActive: true
        })
      );
      await Promise.all(accessPromises);
    }

    return subscription[0];
  }

  /**
   * Get user account summary
   */
  static async getAccountSummary(userId: string) {
    try {
      // Get account info
      const accounts = await db.select()
        .from(userAccounts)
        .where(eq(userAccounts.userId, userId))
        .limit(1);

      let account = accounts[0];
      if (!account) {
        // Create account if doesn't exist with proper account number
        const accountCount = await db.select().from(userAccounts);
        const accountNumber = `ACC${String(accountCount.length + 1).padStart(6, '0')}`;
        
        const newAccount = await db.insert(userAccounts).values({
          userId,
          accountNumber,
          creditBalance: 0,
          totalEarned: 0,
          totalSpent: 0,
          accountType: 'standard',
          status: 'active'
        }).returning();
        account = newAccount[0];
      }

      // Get subscription info
      const subscription = await this.getUserSubscription(userId);

      // Get recent transactions
      const recentTransactions = await db.select()
        .from(paymentTransactions)
        .where(eq(paymentTransactions.userId, userId))
        .orderBy(desc(paymentTransactions.createdAt))
        .limit(5);

      return {
        account,
        subscription,
        recentTransactions
      };
    } catch (error) {
      console.error('Error fetching account summary:', error);
      return {
        account: null,
        subscription: null,
        recentTransactions: []
      };
    }
  }

  /**
   * Get billing history
   */
  static async getBillingHistory(userId: string, limit: number = 20) {
    return await db.select()
      .from(paymentTransactions)
      .where(eq(paymentTransactions.userId, userId))
      .orderBy(desc(paymentTransactions.createdAt))
      .limit(limit);
  }

  /**
   * Process credit top-up
   */
  static async topUpCredits(userId: string, amount: number) {
    // Initialize payment
    const paymentData = await PaystackService.initializePayment({
      email: '', // Will be filled from user data
      amount: amount * 100, // Convert to kobo
      metadata: {
        type: 'credit_topup',
        userId
      }
    });

    return paymentData;
  }

  /**
   * Process credit top-up completion
   */
  static async processCreditTopUp(paymentRef: string, userId: string) {
    const paymentVerification = await PaystackService.verifyPayment(paymentRef);
    
    if (paymentVerification.status !== 'success') {
      throw new Error('Payment verification failed');
    }

    const amount = paymentVerification.amount / 100; // Convert from kobo

    // Update account balance
    const accounts = await db.select()
      .from(userAccounts)
      .where(eq(userAccounts.userId, userId))
      .limit(1);

    let account = accounts[0];
    if (!account) {
      account = (await db.insert(userAccounts).values({
        userId,
        balance: amount.toString(),
        status: 'active'
      }).returning())[0];
    } else {
      const newBalance = parseFloat(account.balance) + amount;
      await db.update(userAccounts)
        .set({ balance: newBalance.toString() })
        .where(eq(userAccounts.userId, userId));
    }

    // Create credit transaction record
    await db.insert(accountCreditTransactions).values({
      userId,
      transactionType: 'credit_purchase',
      amount: amount.toString(),
      description: `Credit top-up via ${paymentVerification.channel}`,
      referenceId: paymentRef
    });

    return account;
  }

  // ========================================
  // USAGE & FEATURE MANAGEMENT
  // ========================================

  /**
   * Check if user has access to a feature
   */
  static async hasFeatureAccess(userId: string, featureName: string): Promise<boolean> {
    const userAccess = await this.getUserProductAccess(userId);
    
    return userAccess.products.some(product => 
      product.features && product.features.includes(featureName)
    );
  }

  /**
   * Track usage for a feature
   */
  static async trackUsage(userId: string, productId: number, count: number = 1) {
    await db.update(userProductAccess)
      .set({ 
        usageCount: count // In production, this should increment existing count
      })
      .where(and(
        eq(userProductAccess.userId, userId),
        eq(userProductAccess.productId, productId),
        eq(userProductAccess.isActive, true)
      ));
  }

  /**
   * Check usage limits
   */
  static async checkUsageLimits(userId: string, featureName: string) {
    const userAccess = await this.getUserProductAccess(userId);
    
    const relevantProduct = userAccess.products.find(product => 
      product.features && product.features.includes(featureName)
    );

    if (!relevantProduct) {
      return { hasAccess: false, limit: 0, used: 0, remaining: 0 };
    }

    const limit = relevantProduct.limits?.[featureName] || 0;
    const used = relevantProduct.usageCount || 0;
    const remaining = Math.max(0, limit - used);

    return {
      hasAccess: true,
      limit,
      used,
      remaining,
      percentage: limit > 0 ? (used / limit) * 100 : 0
    };
  }

  // ========================================
  // ADMIN FUNCTIONS
  // ========================================

  /**
   * Get revenue analytics
   */
  static async getRevenueAnalytics(period: string = 'month') {
    const startDate = new Date();
    const endDate = new Date();

    if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Get total revenue
    const revenueQuery = await db.select({
      total: sum(paymentTransactions.amount)
    })
    .from(paymentTransactions)
    .where(and(
      eq(paymentTransactions.status, 'completed'),
      gte(paymentTransactions.createdAt, startDate)
    ));

    // Get transaction count
    const transactionQuery = await db.select({
      count: count()
    })
    .from(paymentTransactions)
    .where(and(
      eq(paymentTransactions.status, 'completed'),
      gte(paymentTransactions.createdAt, startDate)
    ));

    // Get active subscriptions
    const subscriptionQuery = await db.select({
      count: count()
    })
    .from(userSubscriptions)
    .where(eq(userSubscriptions.status, 'active'));

    return {
      totalRevenue: revenueQuery[0]?.total || 0,
      totalTransactions: transactionQuery[0]?.count || 0,
      activeSubscriptions: subscriptionQuery[0]?.count || 0,
      period
    };
  }

  /**
   * Initialize default data
   */
  static async initializeDefaults() {
    // Check if products exist
    const existingProducts = await db.select().from(products).limit(1);
    
    if (existingProducts.length === 0) {
      // Insert default products
      await db.insert(products).values([
        {
          name: 'Premium Listings',
          description: 'Enhanced vehicle listing features with priority placement',
          productType: 'listing_package',
          basePrice: '2500.00',
          features: ['priority_placement', 'featured_badge', 'enhanced_photos'],
          limits: { monthly_listings: 50, photo_uploads: 20 }
        },
        {
          name: 'Analytics Pro',
          description: 'Advanced analytics and market insights',
          productType: 'analytics_package',
          basePrice: '1500.00',
          features: ['detailed_analytics', 'market_reports', 'price_predictions'],
          limits: { report_downloads: 10, api_calls: 1000 }
        },
        {
          name: 'API Access',
          description: 'Developer API access for integrations',
          productType: 'api_access',
          basePrice: '5000.00',
          features: ['full_api_access', 'webhooks', 'priority_support'],
          limits: { api_calls: 10000, webhooks: 5 }
        }
      ]);
    }

    // Check if subscription plans exist
    const existingPlans = await db.select().from(subscriptionPlans).limit(1);
    
    if (existingPlans.length === 0) {
      const allProducts = await db.select().from(products);
      
      await db.insert(subscriptionPlans).values([
        {
          name: 'Basic',
          description: 'Essential features for individual sellers',
          monthlyPrice: '2500.00',
          yearlyPrice: '25000.00',
          productIds: [allProducts[0]?.id].filter(Boolean),
          features: ['Basic listing features', 'Standard support'],
          limits: { monthly_listings: 10, photo_uploads: 5 },
          sortOrder: 1
        },
        {
          name: 'Professional',
          description: 'Advanced features for professional dealers',
          monthlyPrice: '8000.00',
          yearlyPrice: '80000.00',
          productIds: allProducts.slice(0, 2).map(p => p.id),
          features: ['Premium listings', 'Analytics dashboard', 'Priority support'],
          limits: { monthly_listings: 100, photo_uploads: 20 },
          sortOrder: 2
        },
        {
          name: 'Enterprise',
          description: 'Full platform access for large dealerships',
          monthlyPrice: '20000.00',
          yearlyPrice: '200000.00',
          productIds: allProducts.map(p => p.id),
          features: ['All features', 'API access', 'Dedicated support'],
          limits: { monthly_listings: 500, photo_uploads: 50 },
          sortOrder: 3
        }
      ]);
    }

    console.log('✅ Unified billing system defaults initialized');
  }
}