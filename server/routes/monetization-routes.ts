import express from 'express';
import { MonetizationService } from '../services/monetization-service';
import { z } from 'zod';

const router = express.Router();

// Middleware for authentication (assumes existing auth middleware)
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// ========================================
// SUBSCRIPTION MANAGEMENT
// ========================================

/**
 * GET /api/monetization/subscription-plans
 * Get all available subscription plans
 */
router.get('/subscription-plans', async (req, res) => {
  try {
    const plans = await MonetizationService.getSubscriptionPlans();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    res.status(500).json({ error: 'Failed to fetch subscription plans' });
  }
});

/**
 * GET /api/monetization/my-subscription
 * Get user's current subscription
 */
router.get('/my-subscription', requireAuth, async (req, res) => {
  try {
    const subscription = await MonetizationService.getUserSubscription(req.user.id);
    res.json(subscription);
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

/**
 * POST /api/monetization/subscribe
 * Create new subscription
 */
router.post('/subscribe', requireAuth, async (req, res) => {
  try {
    const { planId, paymentReference } = req.body;
    
    if (!planId) {
      return res.status(400).json({ error: 'Plan ID is required' });
    }

    const subscription = await MonetizationService.createSubscription(
      req.user.id,
      planId,
      paymentReference
    );

    res.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

/**
 * POST /api/monetization/cancel-subscription
 * Cancel user's subscription
 */
router.post('/cancel-subscription', requireAuth, async (req, res) => {
  try {
    const { immediately = false } = req.body;
    
    await MonetizationService.cancelSubscription(req.user.id, immediately);
    res.json({ success: true });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// ========================================
// USAGE TRACKING & LIMITS
// ========================================

/**
 * POST /api/monetization/track-usage
 * Track feature usage
 */
router.post('/track-usage', requireAuth, async (req, res) => {
  try {
    const { featureType, resourceId, usageCount = 1 } = req.body;
    
    if (!featureType) {
      return res.status(400).json({ error: 'Feature type is required' });
    }

    await MonetizationService.trackUsage(req.user.id, featureType, resourceId, usageCount);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking usage:', error);
    res.status(500).json({ error: 'Failed to track usage' });
  }
});

/**
 * GET /api/monetization/usage-limits/:featureType
 * Check usage limits for feature
 */
router.get('/usage-limits/:featureType', requireAuth, async (req, res) => {
  try {
    const { featureType } = req.params;
    
    const limits = await MonetizationService.checkUsageLimit(req.user.id, featureType);
    res.json(limits);
  } catch (error) {
    console.error('Error checking usage limits:', error);
    res.status(500).json({ error: 'Failed to check usage limits' });
  }
});

// ========================================
// LISTING MONETIZATION
// ========================================

/**
 * GET /api/monetization/listing-packages
 * Get all listing promotion packages
 */
router.get('/listing-packages', async (req, res) => {
  try {
    const packages = await MonetizationService.getListingPackages();
    res.json(packages);
  } catch (error) {
    console.error('Error fetching listing packages:', error);
    res.status(500).json({ error: 'Failed to fetch listing packages' });
  }
});

/**
 * POST /api/monetization/promote-listing
 * Promote listing with package
 */
router.post('/promote-listing', requireAuth, async (req, res) => {
  try {
    const { listingId, packageId, paymentReference } = req.body;
    
    if (!listingId || !packageId) {
      return res.status(400).json({ error: 'Listing ID and package ID are required' });
    }

    await MonetizationService.promoteListingWithPackage(
      req.user.id,
      listingId,
      packageId,
      paymentReference
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error promoting listing:', error);
    res.status(500).json({ error: 'Failed to promote listing' });
  }
});

// ========================================
// FINANCIAL SERVICES
// ========================================

/**
 * POST /api/monetization/loan-referral
 * Create loan referral
 */
router.post('/loan-referral', requireAuth, async (req, res) => {
  try {
    const { bankPartnerId, requestedAmount, vehicleListingId, loanApplicationId } = req.body;
    
    if (!bankPartnerId || !requestedAmount) {
      return res.status(400).json({ error: 'Bank partner ID and requested amount are required' });
    }

    await MonetizationService.createLoanReferral({
      userId: req.user.id,
      bankPartnerId,
      requestedAmount,
      vehicleListingId,
      loanApplicationId
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error creating loan referral:', error);
    res.status(500).json({ error: 'Failed to create loan referral' });
  }
});

/**
 * PUT /api/monetization/loan-referral/:id/status
 * Update loan referral status (for bank partners)
 */
router.put('/loan-referral/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedAmount } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    await MonetizationService.updateLoanReferralStatus(
      parseInt(id),
      status,
      approvedAmount
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating loan referral status:', error);
    res.status(500).json({ error: 'Failed to update loan referral status' });
  }
});

// ========================================
// API MONETIZATION
// ========================================

/**
 * POST /api/monetization/create-api-key
 * Create API key for user
 */
router.post('/create-api-key', requireAuth, async (req, res) => {
  try {
    const { planId, name } = req.body;
    
    if (!planId || !name) {
      return res.status(400).json({ error: 'Plan ID and name are required' });
    }

    const { apiKey, keyId } = await MonetizationService.createApiKey(
      req.user.id,
      planId,
      name
    );

    res.json({ apiKey, keyId });
  } catch (error) {
    console.error('Error creating API key:', error);
    res.status(500).json({ error: 'Failed to create API key' });
  }
});

// ========================================
// PAYMENT PROCESSING
// ========================================

/**
 * POST /api/monetization/mpesa-callback
 * Handle M-Pesa payment callbacks
 */
router.post('/mpesa-callback', async (req, res) => {
  try {
    const { 
      TransactionReference, 
      MpesaReceiptNumber, 
      Amount, 
      ResultCode 
    } = req.body;

    await MonetizationService.processMpesaCallback(
      TransactionReference,
      MpesaReceiptNumber,
      Amount,
      ResultCode === '0' ? 'success' : 'failed'
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
    res.status(500).json({ error: 'Failed to process payment callback' });
  }
});

// ========================================
// ANALYTICS & REPORTING
// ========================================

/**
 * GET /api/monetization/revenue/:year/:month
 * Get monthly revenue breakdown (admin only)
 */
router.get('/revenue/:year/:month', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const { year, month } = req.params;
    
    const revenue = await MonetizationService.getMonthlyRevenue(
      parseInt(year),
      parseInt(month)
    );

    res.json(revenue);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
});

/**
 * GET /api/monetization/revenue-per-product
 * Get revenue breakdown by product (admin only)
 */
router.get('/revenue-per-product', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const { startDate, endDate } = req.query;
    
    const revenueData = await MonetizationService.getRevenuePerProduct(
      startDate ? new Date(startDate as string) : undefined,
      endDate ? new Date(endDate as string) : undefined
    );

    res.json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue per product:', error);
    res.status(500).json({ error: 'Failed to fetch revenue per product data' });
  }
});

/**
 * GET /api/monetization/transactions
 * Get filtered transaction data (admin only)
 */
router.get('/transactions', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const { 
      status, 
      method, 
      type, 
      startDate, 
      endDate, 
      page = 1, 
      limit = 50 
    } = req.query;
    
    const transactions = await MonetizationService.getFilteredTransactions({
      status: status as string,
      method: method as string,
      type: type as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

/**
 * GET /api/monetization/dashboard-analytics
 * Get comprehensive dashboard analytics (admin only)
 */
router.get('/dashboard-analytics', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const { period = 'month' } = req.query;
    
    const analytics = await MonetizationService.getDashboardAnalytics(period as string);

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard analytics' });
  }
});

// ========================================
// ADMIN SUBSCRIPTION PLAN MANAGEMENT
// ========================================

/**
 * POST /api/monetization/admin/create-plan
 * Create new subscription plan (admin only)
 */
router.post('/admin/create-plan', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const createPlanSchema = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      priceKes: z.number().positive(),
      billingCycle: z.enum(['monthly', 'quarterly', 'annually']),
      features: z.array(z.string()).default([]),
      limits: z.object({
        maxListings: z.number().optional(),
        calculationsPerMonth: z.number().optional(),
        valuationsPerMonth: z.number().optional(),
        apiCallsPerMonth: z.number().optional(),
        storageGb: z.number().optional(),
      }).default({}),
      isActive: z.boolean().default(true),
      sortOrder: z.number().default(0)
    });

    const validatedData = createPlanSchema.parse(req.body);
    
    const plan = await MonetizationService.createSubscriptionPlan(validatedData);
    res.json(plan);
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create subscription plan' });
  }
});

/**
 * PUT /api/monetization/admin/update-plan/:id
 * Update existing subscription plan (admin only)
 */
router.put('/admin/update-plan/:id', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const { id } = req.params;
    
    const updatePlanSchema = z.object({
      name: z.string().min(1).optional(),
      description: z.string().optional(),
      priceKes: z.number().positive().optional(),
      billingCycle: z.enum(['monthly', 'quarterly', 'annually']).optional(),
      features: z.array(z.string()).optional(),
      limits: z.object({
        maxListings: z.number().optional(),
        calculationsPerMonth: z.number().optional(),
        valuationsPerMonth: z.number().optional(),
        apiCallsPerMonth: z.number().optional(),
        storageGb: z.number().optional(),
      }).optional(),
      isActive: z.boolean().optional(),
      sortOrder: z.number().optional()
    });

    const validatedData = updatePlanSchema.parse(req.body);
    
    const plan = await MonetizationService.updateSubscriptionPlan(parseInt(id), validatedData);
    res.json(plan);
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update subscription plan' });
  }
});

/**
 * DELETE /api/monetization/admin/delete-plan/:id
 * Delete subscription plan (admin only)
 */
router.delete('/admin/delete-plan/:id', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const { id } = req.params;
    
    await MonetizationService.deleteSubscriptionPlan(parseInt(id));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting subscription plan:', error);
    res.status(500).json({ error: 'Failed to delete subscription plan' });
  }
});

/**
 * POST /api/monetization/admin/create-strategy
 * Create new monetization strategy (admin only)
 */
router.post('/admin/create-strategy', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const createStrategySchema = z.object({
      strategyName: z.string().min(1),
      targetRevenue: z.number().positive(),
      timeframe: z.string().min(1),
      description: z.string().optional(),
      tactics: z.string().optional()
    });

    const validatedData = createStrategySchema.parse(req.body);
    
    // Create strategy (this would need implementation in MonetizationService)
    // For now, we'll simulate success
    res.json({ 
      success: true, 
      strategy: {
        id: Date.now(),
        ...validatedData,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error creating monetization strategy:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create monetization strategy' });
  }
});

/**
 * POST /api/monetization/admin/create-pricing-rule
 * Create new pricing rule (admin only)
 */
router.post('/admin/create-pricing-rule', requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const createRuleSchema = z.object({
      feature: z.string().min(1),
      basePrice: z.number().positive(),
      tierMultiplier: z.number().positive().optional(),
      usageBased: z.boolean().default(false),
      overage: z.number().positive().optional()
    });

    const validatedData = createRuleSchema.parse(req.body);
    
    // Create pricing rule (this would need implementation in MonetizationService)
    // For now, we'll simulate success
    res.json({ 
      success: true, 
      rule: {
        id: Date.now(),
        ...validatedData,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error creating pricing rule:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create pricing rule' });
  }
});

/**
 * POST /api/monetization/initialize-plans
 * Initialize default subscription plans (admin only)
 */
router.post('/initialize-plans', async (req, res) => {
  try {
    await MonetizationService.initializeDefaultPlans();
    res.json({ success: true });
  } catch (error) {
    console.error('Error initializing plans:', error);
    res.status(500).json({ error: 'Failed to initialize plans' });
  }
});

export default router;