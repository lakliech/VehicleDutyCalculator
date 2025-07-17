import { db } from '../db';
import { 
  subscriptionPlans, userSubscriptions, billingTransactions, usageTracking, 
  featureLimits, loanReferrals, insuranceReferrals, listingPackages, 
  listingPromotions, analyticsPackages, apiPlans, apiKeys, apiUsage,
  revenueSharing, type SubscriptionPlan, type UserSubscription,
  type BillingTransaction, type UsageTracking as UsageTrackingType
} from '../../shared/monetization-schema';
import { eq, and, gte, lte, desc, sum, count } from 'drizzle-orm';
import { startOfMonth, endOfMonth, addMonths } from 'date-fns';

/**
 * Comprehensive Monetization Service
 * Handles all subscription, billing, usage tracking, and financial integrations
 */
export class MonetizationService {

  // ========================================
  // SUBSCRIPTION MANAGEMENT
  // ========================================

  /**
   * Get all available subscription plans
   */
  static async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return await db.select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.isActive, true))
      .orderBy(subscriptionPlans.sortOrder);
  }

  /**
   * Get user's current subscription
   */
  static async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    const subscriptions = await db.select()
      .from(userSubscriptions)
      .where(and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, 'active')
      ))
      .limit(1);

    return subscriptions[0] || null;
  }

  /**
   * Create new subscription for user
   */
  static async createSubscription(
    userId: string, 
    planId: number, 
    paymentReference?: string
  ): Promise<UserSubscription> {
    const plan = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, planId)).limit(1);
    if (!plan[0]) throw new Error('Subscription plan not found');

    const now = new Date();
    const periodEnd = plan[0].billingCycle === 'yearly' 
      ? addMonths(now, 12) 
      : addMonths(now, 1);

    const [subscription] = await db.insert(userSubscriptions).values({
      userId,
      planId,
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd
    }).returning();

    // Create billing transaction
    await this.createBillingTransaction({
      userId,
      subscriptionId: subscription.id,
      amount: plan[0].priceKes,
      type: 'subscription',
      status: paymentReference ? 'paid' : 'pending',
      paymentReference,
      description: `Subscription to ${plan[0].name} plan`
    });

    return subscription;
  }

  /**
   * Cancel subscription at period end
   */
  static async cancelSubscription(userId: string, immediately = false): Promise<void> {
    const subscription = await this.getUserSubscription(userId);
    if (!subscription) throw new Error('No active subscription found');

    await db.update(userSubscriptions)
      .set({
        cancelAtPeriodEnd: !immediately,
        status: immediately ? 'cancelled' : 'active',
        cancelledAt: immediately ? new Date() : null,
        updatedAt: new Date()
      })
      .where(eq(userSubscriptions.id, subscription.id));
  }

  // ========================================
  // BILLING & PAYMENTS
  // ========================================

  /**
   * Create billing transaction
   */
  static async createBillingTransaction(transaction: {
    userId: string;
    subscriptionId?: number;
    amount: string;
    type: string;
    status: string;
    paymentReference?: string;
    description?: string;
    paymentMethod?: string;
  }): Promise<BillingTransaction> {
    const [billing] = await db.insert(billingTransactions).values({
      ...transaction,
      currency: 'KES',
      createdAt: new Date()
    }).returning();

    return billing;
  }

  /**
   * Process M-Pesa payment callback
   */
  static async processMpesaCallback(
    transactionReference: string,
    mpesaReference: string,
    amount: number,
    status: 'success' | 'failed'
  ): Promise<void> {
    await db.update(billingTransactions)
      .set({
        status: status === 'success' ? 'paid' : 'failed',
        paymentMethod: 'mpesa',
        processedAt: new Date(),
        metadata: { mpesaReference }
      })
      .where(eq(billingTransactions.paymentReference, transactionReference));

    if (status === 'success') {
      // Activate subscription if payment was for subscription
      const transaction = await db.select()
        .from(billingTransactions)
        .where(eq(billingTransactions.paymentReference, transactionReference))
        .limit(1);

      if (transaction[0]?.subscriptionId) {
        await db.update(userSubscriptions)
          .set({ status: 'active', updatedAt: new Date() })
          .where(eq(userSubscriptions.id, transaction[0].subscriptionId));
      }
    }
  }

  // ========================================
  // USAGE TRACKING & LIMITS
  // ========================================

  /**
   * Track feature usage
   */
  static async trackUsage(
    userId: string,
    featureType: string,
    resourceId?: string,
    usageCount = 1
  ): Promise<void> {
    const now = new Date();
    const periodStart = startOfMonth(now);
    const periodEnd = endOfMonth(now);

    await db.insert(usageTracking).values({
      userId,
      featureType,
      resourceId,
      usageCount,
      periodStart,
      periodEnd,
      createdAt: now
    });
  }

  /**
   * Check if user has exceeded usage limits
   */
  static async checkUsageLimit(
    userId: string,
    featureType: string
  ): Promise<{ allowed: boolean; currentUsage: number; limit: number | null }> {
    const subscription = await this.getUserSubscription(userId);
    
    if (!subscription) {
      // Free tier limits
      const freeLimit = this.getFreeTierLimit(featureType);
      const currentUsage = await this.getCurrentUsage(userId, featureType);
      return {
        allowed: currentUsage < freeLimit,
        currentUsage,
        limit: freeLimit
      };
    }

    // Get plan limits
    const limits = await db.select()
      .from(featureLimits)
      .where(and(
        eq(featureLimits.planId, subscription.planId),
        eq(featureLimits.featureType, featureType),
        eq(featureLimits.isEnabled, true)
      ))
      .limit(1);

    const limit = limits[0]?.limitValue || null; // null = unlimited
    const currentUsage = await this.getCurrentUsage(userId, featureType);

    return {
      allowed: limit === null || currentUsage < limit,
      currentUsage,
      limit
    };
  }

  /**
   * Get current month usage for feature
   */
  private static async getCurrentUsage(userId: string, featureType: string): Promise<number> {
    const now = new Date();
    const periodStart = startOfMonth(now);
    const periodEnd = endOfMonth(now);

    const result = await db.select({ total: sum(usageTracking.usageCount) })
      .from(usageTracking)
      .where(and(
        eq(usageTracking.userId, userId),
        eq(usageTracking.featureType, featureType),
        gte(usageTracking.periodStart, periodStart),
        lte(usageTracking.periodEnd, periodEnd)
      ));

    return parseInt(result[0]?.total || '0');
  }

  /**
   * Get free tier limits by feature
   */
  private static getFreeTierLimit(featureType: string): number {
    const freeLimits: { [key: string]: number } = {
      'duty_calculation': 3,
      'valuation': 2,
      'import_estimate': 2,
      'api_call': 100,
      'listing': 1
    };
    return freeLimits[featureType] || 0;
  }

  // ========================================
  // FINANCIAL SERVICES INTEGRATION
  // ========================================

  /**
   * Create loan referral
   */
  static async createLoanReferral(data: {
    userId: string;
    bankPartnerId: number;
    requestedAmount: string;
    vehicleListingId?: number;
    loanApplicationId?: string;
  }): Promise<void> {
    const referralFee = this.calculateLoanReferralFee(parseFloat(data.requestedAmount));
    
    await db.insert(loanReferrals).values({
      ...data,
      status: 'referred',
      referralFee: referralFee.toString(),
      referredAt: new Date(),
      createdAt: new Date()
    });
  }

  /**
   * Update loan referral status
   */
  static async updateLoanReferralStatus(
    referralId: number,
    status: string,
    approvedAmount?: number
  ): Promise<void> {
    const updateData: any = { status, processedAt: new Date() };
    
    if (approvedAmount) {
      updateData.approvedAmount = approvedAmount.toString();
      updateData.referralFee = this.calculateLoanReferralFee(approvedAmount).toString();
    }

    if (status === 'disbursed') {
      updateData.feeStatus = 'earned';
    }

    await db.update(loanReferrals)
      .set(updateData)
      .where(eq(loanReferrals.id, referralId));
  }

  /**
   * Calculate loan referral fee (3-5% of loan amount)
   */
  private static calculateLoanReferralFee(loanAmount: number): number {
    const feePercentage = 0.04; // 4% average
    return Math.round(loanAmount * feePercentage);
  }

  // ========================================
  // LISTING MONETIZATION
  // ========================================

  /**
   * Get listing packages
   */
  static async getListingPackages(): Promise<any[]> {
    return await db.select()
      .from(listingPackages)
      .where(eq(listingPackages.isActive, true))
      .orderBy(listingPackages.sortOrder);
  }

  /**
   * Promote listing with package
   */
  static async promoteListingWithPackage(
    userId: string,
    listingId: number,
    packageId: number,
    paymentReference?: string
  ): Promise<void> {
    const packageData = await db.select()
      .from(listingPackages)
      .where(eq(listingPackages.id, packageId))
      .limit(1);

    if (!packageData[0]) throw new Error('Listing package not found');

    const now = new Date();
    const endDate = new Date(now.getTime() + packageData[0].durationDays * 24 * 60 * 60 * 1000);

    // Create billing transaction
    const transaction = await this.createBillingTransaction({
      userId,
      amount: packageData[0].priceKes,
      type: 'listing_promotion',
      status: paymentReference ? 'paid' : 'pending',
      paymentReference,
      description: `Listing promotion: ${packageData[0].name}`
    });

    // Create listing promotion
    await db.insert(listingPromotions).values({
      listingId,
      packageId,
      userId,
      startDate: now,
      endDate,
      status: 'active',
      amountPaid: packageData[0].priceKes,
      paymentTransactionId: transaction.id,
      createdAt: now
    });
  }

  // ========================================
  // API MONETIZATION
  // ========================================

  /**
   * Create API key for user
   */
  static async createApiKey(
    userId: string,
    planId: number,
    name: string
  ): Promise<{ apiKey: string; keyId: number }> {
    const apiKey = this.generateApiKey();
    const keyHash = await this.hashApiKey(apiKey);

    const [key] = await db.insert(apiKeys).values({
      userId,
      planId,
      keyHash,
      name,
      createdAt: new Date()
    }).returning();

    return { apiKey, keyId: key.id };
  }

  /**
   * Validate API key and check rate limits
   */
  static async validateApiKey(apiKey: string): Promise<{
    valid: boolean;
    keyData?: any;
    plan?: any;
    rateLimitExceeded?: boolean;
  }> {
    const keyHash = await this.hashApiKey(apiKey);
    
    const keyData = await db.select()
      .from(apiKeys)
      .innerJoin(apiPlans, eq(apiKeys.planId, apiPlans.id))
      .where(and(
        eq(apiKeys.keyHash, keyHash),
        eq(apiKeys.isActive, true)
      ))
      .limit(1);

    if (!keyData[0]) {
      return { valid: false };
    }

    // Check rate limit (simplified - in production use Redis)
    const rateLimitExceeded = await this.checkApiRateLimit(keyData[0].api_keys.id);

    return {
      valid: true,
      keyData: keyData[0].api_keys,
      plan: keyData[0].api_plans,
      rateLimitExceeded
    };
  }

  /**
   * Track API usage
   */
  static async trackApiUsage(
    apiKeyId: number,
    endpoint: string,
    method: string,
    statusCode: number,
    responseTime?: number
  ): Promise<void> {
    await db.insert(apiUsage).values({
      apiKeyId,
      endpoint,
      method,
      statusCode,
      responseTime,
      timestamp: new Date()
    });
  }

  // ========================================
  // REVENUE ANALYTICS
  // ========================================

  /**
   * Get monthly revenue breakdown
   */
  static async getMonthlyRevenue(year: number, month: number): Promise<{
    subscriptions: number;
    listings: number;
    loanReferrals: number;
    insurance: number;
    apiUsage: number;
    total: number;
  }> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Get subscription revenue
    const subscriptionRevenue = await db.select({ total: sum(billingTransactions.amount) })
      .from(billingTransactions)
      .where(and(
        eq(billingTransactions.type, 'subscription'),
        eq(billingTransactions.status, 'paid'),
        gte(billingTransactions.createdAt, startDate),
        lte(billingTransactions.createdAt, endDate)
      ));

    // Get listing promotion revenue
    const listingRevenue = await db.select({ total: sum(billingTransactions.amount) })
      .from(billingTransactions)
      .where(and(
        eq(billingTransactions.type, 'listing_promotion'),
        eq(billingTransactions.status, 'paid'),
        gte(billingTransactions.createdAt, startDate),
        lte(billingTransactions.createdAt, endDate)
      ));

    // Get loan referral fees
    const loanRevenue = await db.select({ total: sum(loanReferrals.referralFee) })
      .from(loanReferrals)
      .where(and(
        eq(loanReferrals.feeStatus, 'earned'),
        gte(loanReferrals.createdAt, startDate),
        lte(loanReferrals.createdAt, endDate)
      ));

    const subscriptions = parseFloat(subscriptionRevenue[0]?.total || '0');
    const listings = parseFloat(listingRevenue[0]?.total || '0');
    const loanReferrals = parseFloat(loanRevenue[0]?.total || '0');
    const insurance = 0; // TODO: Implement insurance revenue tracking
    const apiUsage = 0; // TODO: Implement API usage revenue

    return {
      subscriptions,
      listings,
      loanReferrals,
      insurance,
      apiUsage,
      total: subscriptions + listings + loanReferrals + insurance + apiUsage
    };
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  private static generateApiKey(): string {
    return 'gk_' + Math.random().toString(36).substr(2, 32);
  }

  private static async hashApiKey(apiKey: string): Promise<string> {
    // In production, use proper hashing like bcrypt
    return Buffer.from(apiKey).toString('base64');
  }

  private static async checkApiRateLimit(keyId: number): Promise<boolean> {
    // Simplified rate limiting - in production use Redis with sliding window
    const oneMinuteAgo = new Date(Date.now() - 60000);
    
    const recentCalls = await db.select({ count: count() })
      .from(apiUsage)
      .where(and(
        eq(apiUsage.apiKeyId, keyId),
        gte(apiUsage.timestamp, oneMinuteAgo)
      ));

    return (recentCalls[0]?.count || 0) > 60; // Default 60 calls per minute
  }

  /**
   * Initialize default subscription plans
   */
  static async initializeDefaultPlans(): Promise<void> {
    const plans = [
      {
        name: 'Basic',
        description: 'Perfect for individual sellers',
        priceKes: '2500.00',
        billingCycle: 'monthly',
        features: ['Basic Analytics', 'Email Support', 'Standard Listings'],
        limits: { maxListings: 10, calculationsPerMonth: 50, valuationsPerMonth: 20 },
        sortOrder: 1
      },
      {
        name: 'Professional', 
        description: 'Ideal for dealerships and professionals',
        priceKes: '8000.00',
        billingCycle: 'monthly',
        features: ['Advanced Analytics', 'Priority Support', 'Unlimited Listings', 'Smart Pricing'],
        limits: { calculationsPerMonth: 500, valuationsPerMonth: 200, apiCallsPerMonth: 10000 },
        sortOrder: 2
      },
      {
        name: 'Enterprise',
        description: 'Complete solution for large operations',
        priceKes: '20000.00',
        billingCycle: 'monthly',
        features: ['Custom Analytics', 'Dedicated Support', 'White-label Options', 'API Access'],
        limits: { apiCallsPerMonth: 100000, storageGb: 100 },
        sortOrder: 3
      }
    ];

    for (const plan of plans) {
      await db.insert(subscriptionPlans).values(plan).onConflictDoNothing();
    }
  }
}