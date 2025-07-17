import { Router } from 'express';
import { SubscriptionProductService } from '../services/subscription-product-service';
import { storage } from '../storage';

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

// ========================================
// PRODUCT MANAGEMENT
// ========================================

/**
 * GET /api/subscription-products/products
 * Get all available products
 */
router.get('/products', async (req, res) => {
  try {
    const products = await SubscriptionProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * GET /api/subscription-products/plans
 * Get all subscription plans with their included products
 */
router.get('/plans', async (req, res) => {
  try {
    const plans = await SubscriptionProductService.getSubscriptionPlansWithProducts();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    res.status(500).json({ error: 'Failed to fetch subscription plans' });
  }
});

// ========================================
// USER ACCESS MANAGEMENT
// ========================================

/**
 * GET /api/subscription-products/user-access
 * Get user's product access based on subscription and direct access
 */
router.get('/user-access', authenticateUser, async (req, res) => {
  try {
    const userAccess = await SubscriptionProductService.getUserProductAccess(req.user.id);
    res.json(userAccess);
  } catch (error) {
    console.error('Error fetching user product access:', error);
    res.status(500).json({ error: 'Failed to fetch user product access' });
  }
});

/**
 * GET /api/subscription-products/user-subscription
 * Get user's current subscription with products
 */
router.get('/user-subscription', authenticateUser, async (req, res) => {
  try {
    const subscription = await SubscriptionProductService.getUserSubscriptionWithProducts(req.user.id);
    res.json(subscription);
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    res.status(500).json({ error: 'Failed to fetch user subscription' });
  }
});

/**
 * GET /api/subscription-products/check-access/:productId
 * Check if user has access to a specific product
 */
router.get('/check-access/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const hasAccess = await SubscriptionProductService.hasProductAccess(req.user.id, productId);
    res.json({ hasAccess, productId });
  } catch (error) {
    console.error('Error checking product access:', error);
    res.status(500).json({ error: 'Failed to check product access' });
  }
});

/**
 * POST /api/subscription-products/grant-access
 * Grant user access to a product (admin only or for direct purchases)
 */
router.post('/grant-access', authenticateUser, async (req, res) => {
  try {
    const { userId, productId, accessType, subscriptionId, expiresAt, usageLimit } = req.body;
    
    if (!userId || !productId || !accessType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const access = await SubscriptionProductService.grantProductAccess(
      userId, 
      productId, 
      accessType, 
      {
        subscriptionId,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        usageLimit
      }
    );

    res.json(access[0]);
  } catch (error) {
    console.error('Error granting product access:', error);
    res.status(500).json({ error: 'Failed to grant product access' });
  }
});

/**
 * POST /api/subscription-products/revoke-access
 * Revoke user access to a product (admin only)
 */
router.post('/revoke-access', authenticateUser, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await SubscriptionProductService.revokeProductAccess(userId, productId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error revoking product access:', error);
    res.status(500).json({ error: 'Failed to revoke product access' });
  }
});

/**
 * POST /api/subscription-products/track-usage
 * Track usage for a product
 */
router.post('/track-usage', authenticateUser, async (req, res) => {
  try {
    const { productId, count = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    await SubscriptionProductService.incrementProductUsage(req.user.id, productId, count);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking usage:', error);
    res.status(500).json({ error: error.message || 'Failed to track usage' });
  }
});

// ========================================
// ADMIN ENDPOINTS
// ========================================

/**
 * POST /api/subscription-products/initialize
 * Initialize default products and subscription plans (admin only)
 */
router.post('/initialize', async (req, res) => {
  try {
    await SubscriptionProductService.initializeDefaultProducts();
    await SubscriptionProductService.initializeDefaultSubscriptionPlans();
    res.json({ success: true, message: 'Default products and plans initialized' });
  } catch (error) {
    console.error('Error initializing defaults:', error);
    res.status(500).json({ error: 'Failed to initialize defaults' });
  }
});

export default router;