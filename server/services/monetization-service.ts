import { db } from '../db';
import { 
  subscriptionPlans, userSubscriptions, billingTransactions, usageTracking, 
  featureLimits, loanReferrals, insuranceReferrals, listingPackages, 
  listingPromotions, analyticsPackages, apiPlans, apiKeys, apiUsage,
  revenueSharing, type SubscriptionPlan, type UserSubscription,
  type BillingTransaction, type UsageTracking as UsageTrackingType
} from '../../shared/monetization-schema';
import { userProductSubscriptions } from '../../shared/product-catalog-schema';
import { eq, and, gte, lte, desc, sum, count, sql } from 'drizzle-orm';
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
    try {
      // Check if we have any subscriptions for this user
      const subscriptions = await db.select()
        .from(userProductSubscriptions)
        .where(and(
          eq(userProductSubscriptions.userId, userId),
          eq(userProductSubscriptions.status, 'active')
        ))
        .limit(1);

      return subscriptions[0] || null;
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      return null; // Return null instead of throwing to allow usage limiter to continue
    }
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

  /**
   * Create new subscription plan (admin only)
   */
  static async createSubscriptionPlan(planData: {
    name: string;
    description?: string;
    priceKes: number;
    billingCycle: 'monthly' | 'quarterly' | 'annually';
    features?: string[];
    limits?: {
      maxListings?: number;
      calculationsPerMonth?: number;
      valuationsPerMonth?: number;
      apiCallsPerMonth?: number;
      storageGb?: number;
    };
    isActive?: boolean;
    sortOrder?: number;
  }): Promise<SubscriptionPlan> {
    const [plan] = await db.insert(subscriptionPlans).values({
      ...planData,
      features: planData.features || [],
      limits: planData.limits || {},
      isActive: planData.isActive !== undefined ? planData.isActive : true,
      sortOrder: planData.sortOrder || 0,
      priceKes: planData.priceKes.toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    return plan;
  }

  /**
   * Update existing subscription plan (admin only)
   */
  static async updateSubscriptionPlan(
    planId: number, 
    updateData: Partial<{
      name: string;
      description: string;
      priceKes: number;
      billingCycle: 'monthly' | 'quarterly' | 'annually';
      features: string[];
      limits: {
        maxListings?: number;
        calculationsPerMonth?: number;
        valuationsPerMonth?: number;
        apiCallsPerMonth?: number;
        storageGb?: number;
      };
      isActive: boolean;
      sortOrder: number;
    }>
  ): Promise<SubscriptionPlan> {
    const plan = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, planId)).limit(1);
    if (!plan[0]) throw new Error('Subscription plan not found');

    const updatePayload: any = {
      ...updateData,
      updatedAt: new Date()
    };

    if (updateData.priceKes !== undefined) {
      updatePayload.priceKes = updateData.priceKes.toString();
    }

    const [updatedPlan] = await db.update(subscriptionPlans)
      .set(updatePayload)
      .where(eq(subscriptionPlans.id, planId))
      .returning();

    return updatedPlan;
  }

  /**
   * Delete subscription plan (admin only)
   */
  static async deleteSubscriptionPlan(planId: number): Promise<void> {
    const plan = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, planId)).limit(1);
    if (!plan[0]) throw new Error('Subscription plan not found');

    // Check if any users are subscribed to this plan
    const activeSubscriptions = await db.select()
      .from(userSubscriptions)
      .where(and(
        eq(userSubscriptions.planId, planId),
        eq(userSubscriptions.status, 'active')
      ))
      .limit(1);

    if (activeSubscriptions.length > 0) {
      throw new Error('Cannot delete plan with active subscriptions');
    }

    await db.delete(subscriptionPlans).where(eq(subscriptionPlans.id, planId));
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
    const usageDate = now.toISOString().split('T')[0]; // Convert to date format

    // Use direct SQL to match actual table structure
    await db.execute(sql`
      INSERT INTO usage_tracking (user_id, feature_type, usage_count, usage_date, created_at)
      VALUES (${userId}, ${featureType}, ${usageCount}, ${usageDate}, ${now.toISOString()})
    `);
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
    try {
      const now = new Date();
      const periodStart = startOfMonth(now);
      const periodEnd = endOfMonth(now);

      // Use direct SQL since the actual table has usage_date not usageDate
      const result = await db.execute(sql`
        SELECT COALESCE(SUM(usage_count), 0) as total
        FROM usage_tracking 
        WHERE user_id = ${userId} 
        AND feature_type = ${featureType}
        AND usage_date >= ${periodStart.toISOString().split('T')[0]}
        AND usage_date <= ${periodEnd.toISOString().split('T')[0]}
      `);

      return parseInt(result.rows[0]?.total || '0');
    } catch (error) {
      console.error('Error fetching current usage:', error);
      return 0; // Return 0 to allow usage when there's an error
    }
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

  /**
   * Get revenue breakdown by product
   */
  static async getRevenuePerProduct(startDate?: Date, endDate?: Date): Promise<{
    productRevenue: Array<{
      productId: number;
      productName: string;
      categoryName: string;
      totalRevenue: number;
      transactionCount: number;
      avgTransactionAmount: number;
    }>;
    totalRevenue: number;
  }> {
    const start = startDate || new Date(new Date().getFullYear(), 0, 1); // Default to start of year
    const end = endDate || new Date(); // Default to now
    
    // Import product schemas
    const { products, productCategories } = await import('../../shared/product-catalog-schema');
    const { paymentTransactions } = await import('../../shared/payment-billing-schema');
    
    // Get revenue by product
    const productRevenue = await db.select({
      productId: products.id,
      productName: products.name,
      categoryName: productCategories.name,
      totalRevenue: sum(paymentTransactions.amount),
      transactionCount: count(paymentTransactions.id),
      avgTransactionAmount: sum(paymentTransactions.amount).mapWith(Number)
    })
    .from(paymentTransactions)
    .innerJoin(products, eq(paymentTransactions.productId, products.id))
    .innerJoin(productCategories, eq(products.categoryId, productCategories.id))
    .where(and(
      eq(paymentTransactions.status, 'completed'),
      gte(paymentTransactions.createdAt, start),
      lte(paymentTransactions.createdAt, end)
    ))
    .groupBy(products.id, products.name, productCategories.name)
    .orderBy(desc(sum(paymentTransactions.amount)));

    // Calculate total revenue
    const totalRevenue = productRevenue.reduce((sum, item) => sum + parseFloat(item.totalRevenue || '0'), 0);

    return {
      productRevenue: productRevenue.map(item => ({
        productId: item.productId,
        productName: item.productName,
        categoryName: item.categoryName,
        totalRevenue: parseFloat(item.totalRevenue || '0'),
        transactionCount: item.transactionCount,
        avgTransactionAmount: parseFloat(item.totalRevenue || '0') / item.transactionCount
      })),
      totalRevenue
    };
  }

  /**
   * Get filtered transaction data
   */
  static async getFilteredTransactions(filters: {
    status?: string;
    method?: string;
    type?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{
    transactions: Array<{
      id: number;
      userId: string;
      userName: string;
      userEmail: string;
      reference: string;
      amount: number;
      currency: string;
      status: string;
      method: string;
      type: string;
      provider?: string;
      description: string;
      productName?: string;
      categoryName?: string;
      listingTitle?: string;
      listingId?: number;
      createdAt: Date;
      paidAt?: Date;
    }>;
    totalCount: number;
    totalPages: number;
  }> {
    const { paymentTransactions, appUsers, carListings } = await import('../../shared/schema-minimal');
    const { products, productCategories } = await import('../../shared/product-catalog-schema');
    
    // Build where conditions
    const whereConditions: any[] = [];
    
    if (filters.status && filters.status !== 'all') {
      whereConditions.push(eq(paymentTransactions.status, filters.status));
    }
    if (filters.method && filters.method !== 'all') {
      whereConditions.push(eq(paymentTransactions.method, filters.method));
    }
    if (filters.type && filters.type !== 'all') {
      whereConditions.push(eq(paymentTransactions.type, filters.type));
    }
    if (filters.startDate) {
      whereConditions.push(gte(paymentTransactions.createdAt, filters.startDate));
    }
    if (filters.endDate) {
      whereConditions.push(lte(paymentTransactions.createdAt, filters.endDate));
    }

    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const offset = (page - 1) * limit;

    // Get transactions with product info, user info, and listing info
    const transactions = await db.select({
      id: paymentTransactions.id,
      userId: paymentTransactions.userId,
      userFirstName: appUsers.firstName,
      userLastName: appUsers.lastName,
      userEmail: appUsers.email,
      reference: paymentTransactions.reference,
      amount: paymentTransactions.amount,
      currency: paymentTransactions.currency,
      status: paymentTransactions.status,
      method: paymentTransactions.method,
      type: paymentTransactions.type,
      provider: paymentTransactions.provider,
      description: paymentTransactions.description,
      productName: products.name,
      categoryName: productCategories.name,
      listingTitle: carListings.title,
      listingId: paymentTransactions.listingId,
      createdAt: paymentTransactions.createdAt,
      paidAt: paymentTransactions.paidAt,
    })
    .from(paymentTransactions)
    .leftJoin(appUsers, eq(paymentTransactions.userId, appUsers.id))
    .leftJoin(products, eq(paymentTransactions.productId, products.id))
    .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
    .leftJoin(carListings, eq(paymentTransactions.listingId, carListings.id))
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
    .orderBy(desc(paymentTransactions.createdAt))
    .limit(limit)
    .offset(offset);

    // Get total count
    const totalCountResult = await db.select({ count: count() })
      .from(paymentTransactions)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalCount = totalCountResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      transactions: transactions.map(t => ({
        id: t.id,
        userId: t.userId,
        userName: `${t.userFirstName || ''} ${t.userLastName || ''}`.trim() || 'Unknown User',
        userEmail: t.userEmail || '',
        reference: t.reference,
        amount: parseFloat(t.amount),
        currency: t.currency,
        status: t.status,
        method: t.method,
        type: t.type,
        provider: t.provider,
        description: t.description,
        productName: t.productName,
        categoryName: t.categoryName,
        listingTitle: t.listingTitle,
        listingId: t.listingId,
        createdAt: t.createdAt,
        paidAt: t.paidAt,
      })),
      totalCount,
      totalPages
    };
  }

  /**
   * Get comprehensive dashboard analytics
   */
  static async getDashboardAnalytics(period: string): Promise<{
    totalRevenue: number;
    revenueGrowth: number;
    totalTransactions: number;
    transactionGrowth: number;
    topProducts: Array<{
      productName: string;
      revenue: number;
      transactionCount: number;
    }>;
    revenueByCategory: Array<{
      categoryName: string;
      revenue: number;
      percentage: number;
    }>;
    monthlyRevenue: Array<{
      month: string;
      revenue: number;
    }>;
    transactionsByStatus: Array<{
      status: string;
      count: number;
      percentage: number;
    }>;
  }> {
    const { paymentTransactions } = await import('../../shared/payment-billing-schema');
    const { products, productCategories } = await import('../../shared/product-catalog-schema');
    
    // Calculate date ranges
    const endDate = new Date();
    const startDate = new Date();
    
    if (period === 'year') {
      startDate.setFullYear(endDate.getFullYear() - 1);
    } else if (period === 'quarter') {
      startDate.setMonth(endDate.getMonth() - 3);
    } else {
      startDate.setMonth(endDate.getMonth() - 1);
    }

    // Get total revenue and transaction count
    const totalStats = await db.select({
      totalRevenue: sum(paymentTransactions.amount),
      totalTransactions: count(paymentTransactions.id)
    })
    .from(paymentTransactions)
    .where(and(
      eq(paymentTransactions.status, 'completed'),
      gte(paymentTransactions.createdAt, startDate),
      lte(paymentTransactions.createdAt, endDate)
    ));

    const totalRevenue = parseFloat(totalStats[0]?.totalRevenue || '0');
    const totalTransactions = totalStats[0]?.totalTransactions || 0;

    // Get previous period stats for growth calculation
    const previousStartDate = new Date(startDate);
    const previousEndDate = new Date(startDate);
    previousStartDate.setTime(startDate.getTime() - (endDate.getTime() - startDate.getTime()));

    const previousStats = await db.select({
      totalRevenue: sum(paymentTransactions.amount),
      totalTransactions: count(paymentTransactions.id)
    })
    .from(paymentTransactions)
    .where(and(
      eq(paymentTransactions.status, 'completed'),
      gte(paymentTransactions.createdAt, previousStartDate),
      lte(paymentTransactions.createdAt, previousEndDate)
    ));

    const previousRevenue = parseFloat(previousStats[0]?.totalRevenue || '0');
    const previousTransactions = previousStats[0]?.totalTransactions || 0;

    const revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    const transactionGrowth = previousTransactions > 0 ? ((totalTransactions - previousTransactions) / previousTransactions) * 100 : 0;

    // Get top products
    const topProducts = await db.select({
      productName: products.name,
      revenue: sum(paymentTransactions.amount),
      transactionCount: count(paymentTransactions.id)
    })
    .from(paymentTransactions)
    .innerJoin(products, eq(paymentTransactions.productId, products.id))
    .where(and(
      eq(paymentTransactions.status, 'completed'),
      gte(paymentTransactions.createdAt, startDate),
      lte(paymentTransactions.createdAt, endDate)
    ))
    .groupBy(products.id, products.name)
    .orderBy(desc(sum(paymentTransactions.amount)))
    .limit(5);

    // Get revenue by category
    const revenueByCategory = await db.select({
      categoryName: productCategories.name,
      revenue: sum(paymentTransactions.amount)
    })
    .from(paymentTransactions)
    .innerJoin(products, eq(paymentTransactions.productId, products.id))
    .innerJoin(productCategories, eq(products.categoryId, productCategories.id))
    .where(and(
      eq(paymentTransactions.status, 'completed'),
      gte(paymentTransactions.createdAt, startDate),
      lte(paymentTransactions.createdAt, endDate)
    ))
    .groupBy(productCategories.id, productCategories.name)
    .orderBy(desc(sum(paymentTransactions.amount)));

    // Get transactions by status
    const transactionsByStatus = await db.select({
      status: paymentTransactions.status,
      count: count(paymentTransactions.id)
    })
    .from(paymentTransactions)
    .where(and(
      gte(paymentTransactions.createdAt, startDate),
      lte(paymentTransactions.createdAt, endDate)
    ))
    .groupBy(paymentTransactions.status);

    return {
      totalRevenue,
      revenueGrowth,
      totalTransactions,
      transactionGrowth,
      topProducts: topProducts.map(p => ({
        productName: p.productName,
        revenue: parseFloat(p.revenue || '0'),
        transactionCount: p.transactionCount
      })),
      revenueByCategory: revenueByCategory.map(c => ({
        categoryName: c.categoryName,
        revenue: parseFloat(c.revenue || '0'),
        percentage: totalRevenue > 0 ? (parseFloat(c.revenue || '0') / totalRevenue) * 100 : 0
      })),
      monthlyRevenue: [], // TODO: Implement monthly breakdown
      transactionsByStatus: transactionsByStatus.map(t => ({
        status: t.status,
        count: t.count,
        percentage: totalTransactions > 0 ? (t.count / totalTransactions) * 100 : 0
      }))
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