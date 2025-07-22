import { Router } from 'express';
import { BillingEngine } from '../services/billing-engine';
import { storage } from '../storage';
import { eq } from 'drizzle-orm';

const router = Router();

// Auth middleware - supports both session and token authentication
const authenticateUser = async (req: any, res: any, next: any) => {
  // Check for session-based authentication first (both Google OAuth and username/password)
  if (req.user && req.user.id) {
    // Session authentication is working properly
    return next();
  }
  
  // Check if Passport authentication exists but user object is incomplete
  if (req.isAuthenticated && req.isAuthenticated()) {
    // Session exists but user object might be incomplete, try to load user
    if (req.session && req.session.passport && req.session.passport.user) {
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
  
  // Fallback to token-based authentication
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Bearer ')) {
    console.log('Authentication failed:', {
      hasUser: !!req.user,
      isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
      sessionPassport: req.session?.passport,
      hasAuthHeader: !!auth
    });
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = auth.substring(7);
  
  // For now, using simple token validation
  // In production, implement proper JWT validation
  try {
    const user = await storage.getUserById(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
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

// ==========================================
// USER BILLING ROUTES
// ==========================================

/**
 * Get user's account information
 */
router.get('/account', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const account = await BillingEngine.getOrCreateUserAccount(userId);
    res.json(account);
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({ error: 'Failed to get account information' });
  }
});

/**
 * Get user's account summary
 */
router.get('/account/summary', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const summary = await BillingEngine.getAccountSummary(userId);
    res.json(summary);
  } catch (error) {
    console.error('Get account summary error:', error);
    res.status(500).json({ error: 'Failed to get account summary' });
  }
});

/**
 * Get user's billing history
 */
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const limit = parseInt(req.query.limit as string) || 50;
    const history = await BillingEngine.getUserBillingHistory(userId, limit);
    res.json(history);
  } catch (error) {
    console.error('Get billing history error:', error);
    res.status(500).json({ error: 'Failed to get billing history' });
  }
});

/**
 * Process one-time payment
 */
router.post('/pay', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { productId, amount, paymentMethod, metadata } = req.body;

    if (!productId || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await BillingEngine.processOneTimePayment(
      userId,
      productId,
      amount,
      paymentMethod,
      metadata
    );

    res.json(result);
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

/**
 * Process credit top-up
 */
router.post('/topup', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const result = await BillingEngine.processCreditTopUp(userId, amount);
    res.json(result);
  } catch (error) {
    console.error('Credit top-up error:', error);
    res.status(500).json({ error: 'Credit top-up failed' });
  }
});

// ==========================================
// SUBSCRIPTION MANAGEMENT ROUTES
// ==========================================

/**
 * Get user's subscriptions
 */
router.get('/subscriptions', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const subscriptions = await BillingEngine.getUserSubscriptions(userId);
    res.json(subscriptions);
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ error: 'Failed to get subscriptions' });
  }
});

/**
 * Create new subscription
 */
router.post('/subscriptions', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { productId, subscriptionType, paymentMethod } = req.body;

    if (!productId || !subscriptionType || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['monthly', 'yearly'].includes(subscriptionType)) {
      return res.status(400).json({ error: 'Invalid subscription type' });
    }

    const result = await BillingEngine.processSubscriptionPayment(
      userId,
      productId,
      subscriptionType,
      paymentMethod
    );

    res.json(result);
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ error: 'Subscription creation failed' });
  }
});

/**
 * Cancel subscription
 */
router.delete('/subscriptions/:id', authenticateUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const subscriptionId = parseInt(req.params.id);

    if (isNaN(subscriptionId)) {
      return res.status(400).json({ error: 'Invalid subscription ID' });
    }

    const result = await BillingEngine.cancelSubscription(subscriptionId, userId);
    res.json(result);
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    res.status(500).json({ error: 'Subscription cancellation failed' });
  }
});

// ==========================================
// ADMIN BILLING ROUTES
// ==========================================

/**
 * Get revenue analytics (Admin only)
 */
router.get('/admin/analytics', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

    const analytics = await BillingEngine.getRevenueAnalytics(startDate, endDate);
    res.json(analytics);
  } catch (error) {
    console.error('Revenue analytics error:', error);
    res.status(500).json({ error: 'Failed to get revenue analytics' });
  }
});

/**
 * Process recurring billing (Admin only)
 */
router.post('/admin/recurring-billing', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const result = await BillingEngine.processRecurringBilling();
    res.json(result);
  } catch (error) {
    console.error('Recurring billing error:', error);
    res.status(500).json({ error: 'Recurring billing failed' });
  }
});

/**
 * Get all user accounts (Admin only)
 */
router.get('/admin/accounts', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const { userAccounts, appUsers } = await import('../../shared/schema-minimal');
    const { db } = await import('../db');
    const { desc } = await import('drizzle-orm');

    const accounts = await db
      .select({
        id: userAccounts.id,
        userId: userAccounts.userId,
        accountNumber: userAccounts.accountNumber,
        creditBalance: userAccounts.creditBalance,
        totalEarned: userAccounts.totalEarned,
        totalSpent: userAccounts.totalSpent,
        accountType: userAccounts.accountType,
        status: userAccounts.status,
        createdAt: userAccounts.createdAt,
        userEmail: appUsers.email,
        userFirstName: appUsers.firstName,
        userLastName: appUsers.lastName
      })
      .from(userAccounts)
      .leftJoin(appUsers, eq(userAccounts.userId, appUsers.id))
      .orderBy(desc(userAccounts.createdAt))
      .limit(100);

    res.json(accounts.map(account => ({
      ...account,
      creditBalance: parseFloat(account.creditBalance || '0'),
      totalEarned: parseFloat(account.totalEarned || '0'),
      totalSpent: parseFloat(account.totalSpent || '0'),
      userName: `${account.userFirstName || ''} ${account.userLastName || ''}`.trim() || 'Unknown User'
    })));
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ error: 'Failed to get accounts' });
  }
});

/**
 * Get all active subscriptions (Admin only)
 */
router.get('/admin/subscriptions', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const { userProductSubscriptions, appUsers } = await import('../../shared/schema-minimal');
    const { products } = await import('../../shared/product-catalog-schema');
    const { db } = await import('../db');
    const { desc, eq } = await import('drizzle-orm');

    const subscriptions = await db
      .select({
        id: userProductSubscriptions.id,
        userId: userProductSubscriptions.userId,
        productId: userProductSubscriptions.productId,
        subscriptionType: userProductSubscriptions.subscriptionType,
        status: userProductSubscriptions.status,
        currentPeriodStart: userProductSubscriptions.currentPeriodStart,
        currentPeriodEnd: userProductSubscriptions.currentPeriodEnd,
        nextBillingDate: userProductSubscriptions.nextBillingDate,
        lastPaymentDate: userProductSubscriptions.lastPaymentDate,
        createdAt: userProductSubscriptions.createdAt,
        productName: products.name,
        productPrice: products.basePrice,
        userEmail: appUsers.email,
        userFirstName: appUsers.firstName,
        userLastName: appUsers.lastName
      })
      .from(userProductSubscriptions)
      .leftJoin(products, eq(userProductSubscriptions.productId, products.id))
      .leftJoin(appUsers, eq(userProductSubscriptions.userId, appUsers.id))
      .orderBy(desc(userProductSubscriptions.createdAt))
      .limit(100);

    res.json(subscriptions.map(sub => ({
      ...sub,
      productPrice: parseFloat(sub.productPrice || '0'),
      userName: `${sub.userFirstName || ''} ${sub.userLastName || ''}`.trim() || 'Unknown User'
    })));
  } catch (error) {
    console.error('Get admin subscriptions error:', error);
    res.status(500).json({ error: 'Failed to get subscriptions' });
  }
});

/**
 * Update account balance (Admin only)
 */
router.post('/admin/accounts/:id/balance', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const accountId = parseInt(req.params.id);
    const { amount, type, description } = req.body;

    if (isNaN(accountId) || !amount || !type || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['credit', 'debit'].includes(type)) {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }

    await BillingEngine.updateAccountBalance(accountId, amount, type, description);
    res.json({ success: true });
  } catch (error) {
    console.error('Update account balance error:', error);
    res.status(500).json({ error: 'Failed to update account balance' });
  }
});

export default router;