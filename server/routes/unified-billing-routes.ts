import { Router } from 'express';
import { UnifiedBillingService } from '../services/unified-billing-service';
import { paystackService } from '../services/paystack-service';
import { storage } from '../storage';

const router = Router();

// Auth middleware
const authenticateUser = async (req: any, res: any, next: any) => {
  if (req.user && req.user.id) return next();
  
  if (req.isAuthenticated && req.isAuthenticated()) {
    if (req.session?.passport?.user) {
      try {
        const user = await storage.getUserById(req.session.passport.user);
        if (user) {
          req.user = user;
          return next();
        }
      } catch (error) {
        console.error('Failed to load user from session:', error);
      }
    }
  }
  
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = auth.substring(7);
  try {
    const user = await storage.getUserById(token);
    if (!user) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const requireRole = (roles: string[]) => {
  return async (req: any, res: any, next: any) => {
    const userRole = await storage.getUserRole(req.user.id);
    if (!userRole || !roles.includes(userRole.name)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
};

// ========================================
// SUBSCRIPTION MANAGEMENT
// ========================================

/**
 * GET /api/unified-billing/plans
 * Get all subscription plans with products
 */
router.get('/plans', async (req, res) => {
  try {
    const plans = await UnifiedBillingService.getSubscriptionPlans();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    res.status(500).json({ error: 'Failed to fetch subscription plans' });
  }
});

/**
 * GET /api/unified-billing/my-subscription
 * Get user's current subscription
 */
router.get('/my-subscription', authenticateUser, async (req, res) => {
  try {
    const subscription = await UnifiedBillingService.getUserSubscription(req.user.id);
    res.json(subscription);
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

/**
 * GET /api/unified-billing/product-access
 * Get user's product access
 */
router.get('/product-access', authenticateUser, async (req, res) => {
  try {
    const access = await UnifiedBillingService.getUserProductAccess(req.user.id);
    res.json(access);
  } catch (error) {
    console.error('Error fetching product access:', error);
    res.status(500).json({ error: 'Failed to fetch product access' });
  }
});

/**
 * POST /api/unified-billing/subscribe
 * Initialize subscription payment
 */
router.post('/subscribe', authenticateUser, async (req, res) => {
  try {
    const { planId, billingType = 'monthly' } = req.body;
    
    if (!planId) {
      return res.status(400).json({ error: 'Plan ID required' });
    }

    if (!req.user?.email) {
      return res.status(400).json({ error: 'User email is required' });
    }

    const result = await UnifiedBillingService.initializeSubscriptionPayment(
      req.user.id, 
      req.user.email, 
      planId, 
      billingType
    );
    res.json(result);
  } catch (error) {
    console.error('Error initializing subscription payment:', error);
    res.status(500).json({ error: 'Failed to initialize subscription payment' });
  }
});

/**
 * POST /api/unified-billing/verify-payment
 * Verify subscription payment and complete subscription
 */
router.post('/verify-payment', authenticateUser, async (req, res) => {
  try {
    const { reference } = req.body;
    
    if (!reference) {
      return res.status(400).json({ error: 'Payment reference required' });
    }

    // Verify payment with Paystack
    const verification = await paystackService.verifyPayment(reference);
    
    if (!verification.success) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Extract subscription metadata
    const metadata = verification.data.metadata;
    const planId = metadata.plan_id;
    const billingType = metadata.billing_type;

    // Complete subscription
    const result = await UnifiedBillingService.completeSubscription(
      req.user.id, 
      planId, 
      billingType, 
      reference
    );

    res.json(result);
  } catch (error) {
    console.error('Error verifying subscription payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

/**
 * POST /api/unified-billing/cancel
 * Cancel user subscription
 */
router.post('/cancel', authenticateUser, async (req, res) => {
  try {
    const { immediately = false } = req.body;
    
    const result = await UnifiedBillingService.cancelUserSubscription(req.user.id, immediately);
    res.json(result);
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// ========================================
// ACCOUNT & BILLING MANAGEMENT
// ========================================

/**
 * GET /api/unified-billing/account-summary
 * Get user account summary
 */
router.get('/account-summary', authenticateUser, async (req, res) => {
  try {
    const summary = await UnifiedBillingService.getAccountSummary(req.user.id);
    res.json(summary);
  } catch (error) {
    console.error('Error fetching account summary:', error);
    res.status(500).json({ error: 'Failed to fetch account summary' });
  }
});

/**
 * GET /api/unified-billing/billing-history
 * Get billing history
 */
router.get('/billing-history', authenticateUser, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const history = await UnifiedBillingService.getBillingHistory(
      req.user.id, 
      parseInt(limit as string)
    );
    res.json(history);
  } catch (error) {
    console.error('Error fetching billing history:', error);
    res.status(500).json({ error: 'Failed to fetch billing history' });
  }
});

/**
 * POST /api/unified-billing/topup-credits
 * Initialize credit top-up
 */
router.post('/topup-credits', authenticateUser, async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount required' });
    }

    const paymentData = await UnifiedBillingService.topUpCredits(req.user.id, amount);
    res.json(paymentData);
  } catch (error) {
    console.error('Error initiating credit top-up:', error);
    res.status(500).json({ error: 'Failed to initiate credit top-up' });
  }
});

/**
 * POST /api/unified-billing/verify-topup
 * Verify credit top-up payment
 */
router.post('/verify-topup', authenticateUser, async (req, res) => {
  try {
    const { paymentRef } = req.body;
    
    if (!paymentRef) {
      return res.status(400).json({ error: 'Payment reference required' });
    }

    const account = await UnifiedBillingService.processCreditTopUp(paymentRef, req.user.id);
    res.json(account);
  } catch (error) {
    console.error('Error verifying credit top-up:', error);
    res.status(500).json({ error: 'Failed to verify credit top-up' });
  }
});

// ========================================
// FEATURE ACCESS & USAGE
// ========================================

/**
 * GET /api/unified-billing/feature-access/:featureName
 * Check feature access
 */
router.get('/feature-access/:featureName', authenticateUser, async (req, res) => {
  try {
    const { featureName } = req.params;
    const hasAccess = await UnifiedBillingService.hasFeatureAccess(req.user.id, featureName);
    res.json({ featureName, hasAccess });
  } catch (error) {
    console.error('Error checking feature access:', error);
    res.status(500).json({ error: 'Failed to check feature access' });
  }
});

/**
 * GET /api/unified-billing/usage-limits/:featureName
 * Get usage limits for feature
 */
router.get('/usage-limits/:featureName', authenticateUser, async (req, res) => {
  try {
    const { featureName } = req.params;
    const limits = await UnifiedBillingService.checkUsageLimits(req.user.id, featureName);
    res.json(limits);
  } catch (error) {
    console.error('Error checking usage limits:', error);
    res.status(500).json({ error: 'Failed to check usage limits' });
  }
});

/**
 * POST /api/unified-billing/track-usage
 * Track feature usage
 */
router.post('/track-usage', authenticateUser, async (req, res) => {
  try {
    const { productId, count = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }

    await UnifiedBillingService.trackUsage(req.user.id, productId, count);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking usage:', error);
    res.status(500).json({ error: 'Failed to track usage' });
  }
});

// ========================================
// ADMIN ENDPOINTS
// ========================================

/**
 * GET /api/unified-billing/admin/analytics
 * Get revenue analytics (admin only)
 */
router.get('/admin/analytics', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    const analytics = await UnifiedBillingService.getRevenueAnalytics(period as string);
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching revenue analytics:', error);
    res.status(500).json({ error: 'Failed to fetch revenue analytics' });
  }
});

/**
 * POST /api/unified-billing/initialize
 * Initialize default products and plans
 */
router.post('/initialize', async (req, res) => {
  try {
    await UnifiedBillingService.initializeDefaults();
    res.json({ success: true, message: 'Defaults initialized successfully' });
  } catch (error) {
    console.error('Error initializing defaults:', error);
    res.status(500).json({ error: 'Failed to initialize defaults' });
  }
});

export default router;