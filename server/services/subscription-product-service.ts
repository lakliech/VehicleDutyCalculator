import { db } from '../db';
import { 
  products, 
  subscriptionPlans, 
  userSubscriptions, 
  userProductAccess,
  appUsers
} from '../../shared/schema-minimal';
import { eq, and, gte, desc, inArray } from 'drizzle-orm';

/**
 * Service for managing subscription-to-product relationships
 * and determining user access to products based on subscriptions
 */
export class SubscriptionProductService {

  /**
   * Get all available products
   */
  static async getAllProducts() {
    return await db.select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(products.sortOrder, products.name);
  }

  /**
   * Get all subscription plans with their included products
   */
  static async getSubscriptionPlansWithProducts() {
    const plans = await db.select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.isActive, true))
      .orderBy(subscriptionPlans.sortOrder);

    // Get products for each plan
    const plansWithProducts = await Promise.all(plans.map(async (plan) => {
      if (plan.productIds && plan.productIds.length > 0) {
        const planProducts = await db.select()
          .from(products)
          .where(and(
            inArray(products.id, plan.productIds),
            eq(products.isActive, true)
          ));
        
        return {
          ...plan,
          products: planProducts
        };
      }
      
      return {
        ...plan,
        products: []
      };
    }));

    return plansWithProducts;
  }

  /**
   * Get user's current subscription with included products
   */
  static async getUserSubscriptionWithProducts(userId: string) {
    // Get active subscription
    const subscriptions = await db.select({
      subscription: userSubscriptions,
      plan: subscriptionPlans
    })
    .from(userSubscriptions)
    .leftJoin(subscriptionPlans, eq(userSubscriptions.planId, subscriptionPlans.id))
    .where(and(
      eq(userSubscriptions.userId, userId),
      eq(userSubscriptions.status, 'active'),
      gte(userSubscriptions.currentPeriodEnd, new Date())
    ))
    .limit(1);

    if (subscriptions.length === 0) {
      return null;
    }

    const { subscription, plan } = subscriptions[0];
    
    if (!plan) {
      return { subscription, plan: null, products: [] };
    }

    // Get products included in the plan
    let planProducts = [];
    if (plan.productIds && plan.productIds.length > 0) {
      planProducts = await db.select()
        .from(products)
        .where(and(
          inArray(products.id, plan.productIds),
          eq(products.isActive, true)
        ));
    }

    return {
      subscription,
      plan,
      products: planProducts
    };
  }

  /**
   * Get all products a user has access to (via subscription or direct access)
   */
  static async getUserProductAccess(userId: string) {
    // Get products from active subscription
    const subscriptionAccess = await this.getUserSubscriptionWithProducts(userId);
    const subscriptionProducts = subscriptionAccess?.products || [];

    // Get direct product access (one-time purchases, trials, etc.)
    const directAccess = await db.select({
      access: userProductAccess,
      product: products
    })
    .from(userProductAccess)
    .leftJoin(products, eq(userProductAccess.productId, products.id))
    .where(and(
      eq(userProductAccess.userId, userId),
      eq(userProductAccess.isActive, true),
      // Check if not expired (or no expiration date)
      // Note: Using a simple approach here, in production you'd want more sophisticated date handling
    ));

    const directProducts = directAccess
      .filter(item => item.product && (!item.access.expiresAt || item.access.expiresAt > new Date()))
      .map(item => ({
        ...item.product!,
        accessType: item.access.accessType,
        usageCount: item.access.usageCount,
        usageLimit: item.access.usageLimit
      }));

    // Combine and deduplicate products
    const allProducts = [...subscriptionProducts, ...directProducts];
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    return {
      subscription: subscriptionAccess,
      products: uniqueProducts
    };
  }

  /**
   * Check if user has access to a specific product
   */
  static async hasProductAccess(userId: string, productId: number): Promise<boolean> {
    const userAccess = await this.getUserProductAccess(userId);
    return userAccess.products.some(product => product.id === productId);
  }

  /**
   * Grant user access to a product (for direct purchases or trials)
   */
  static async grantProductAccess(userId: string, productId: number, accessType: string, options: {
    subscriptionId?: number;
    expiresAt?: Date;
    usageLimit?: number;
  } = {}) {
    return await db.insert(userProductAccess).values({
      userId,
      productId,
      subscriptionId: options.subscriptionId,
      accessType,
      expiresAt: options.expiresAt,
      usageLimit: options.usageLimit,
      isActive: true
    }).returning();
  }

  /**
   * Revoke user access to a product
   */
  static async revokeProductAccess(userId: string, productId: number) {
    return await db.update(userProductAccess)
      .set({ 
        isActive: false,
        revokedAt: new Date()
      })
      .where(and(
        eq(userProductAccess.userId, userId),
        eq(userProductAccess.productId, productId)
      ));
  }

  /**
   * Update usage count for a product
   */
  static async incrementProductUsage(userId: string, productId: number, count: number = 1) {
    // Check if user has access first
    const hasAccess = await this.hasProductAccess(userId, productId);
    if (!hasAccess) {
      throw new Error('User does not have access to this product');
    }

    // Update usage count in direct access records
    await db.update(userProductAccess)
      .set({ 
        usageCount: db.select({ count: userProductAccess.usageCount }).from(userProductAccess).where(
          and(
            eq(userProductAccess.userId, userId),
            eq(userProductAccess.productId, productId),
            eq(userProductAccess.isActive, true)
          )
        ).then(result => (result[0]?.count || 0) + count) as any
      })
      .where(and(
        eq(userProductAccess.userId, userId),
        eq(userProductAccess.productId, productId),
        eq(userProductAccess.isActive, true)
      ));
  }

  /**
   * Initialize default products if they don't exist
   */
  static async initializeDefaultProducts() {
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
        },
        {
          name: 'Premium Support',
          description: '24/7 priority customer support',
          productType: 'premium_support',
          basePrice: '1000.00',
          features: ['priority_support', 'phone_support', 'dedicated_manager'],
          limits: { support_tickets: 20 }
        }
      ]);

      console.log('✅ Default products initialized');
    }
  }

  /**
   * Initialize default subscription plans with product associations
   */
  static async initializeDefaultSubscriptionPlans() {
    const existingPlans = await db.select().from(subscriptionPlans).limit(1);
    
    if (existingPlans.length === 0) {
      // First ensure products exist
      await this.initializeDefaultProducts();
      
      // Get product IDs
      const allProducts = await db.select().from(products);
      const premiumListings = allProducts.find(p => p.name === 'Premium Listings');
      const analyticsPro = allProducts.find(p => p.name === 'Analytics Pro');
      const apiAccess = allProducts.find(p => p.name === 'API Access');
      const premiumSupport = allProducts.find(p => p.name === 'Premium Support');

      // Insert default subscription plans
      await db.insert(subscriptionPlans).values([
        {
          name: 'Basic',
          description: 'Essential features for individual sellers',
          monthlyPrice: '2500.00',
          yearlyPrice: '25000.00',
          productIds: premiumListings ? [premiumListings.id] : [],
          features: ['Basic listing features', 'Standard support'],
          limits: { monthly_listings: 10, photo_uploads: 5 },
          sortOrder: 1
        },
        {
          name: 'Professional',
          description: 'Advanced features for professional dealers',
          monthlyPrice: '8000.00',
          yearlyPrice: '80000.00',
          productIds: [premiumListings, analyticsPro, premiumSupport].filter(Boolean).map(p => p!.id),
          features: ['Premium listings', 'Analytics dashboard', 'Priority support'],
          limits: { monthly_listings: 100, photo_uploads: 20, api_calls: 1000 },
          sortOrder: 2
        },
        {
          name: 'Enterprise',
          description: 'Full platform access for large dealerships',
          monthlyPrice: '20000.00',
          yearlyPrice: '200000.00',
          productIds: [premiumListings, analyticsPro, apiAccess, premiumSupport].filter(Boolean).map(p => p!.id),
          features: ['All features', 'API access', 'Dedicated support', 'Custom integrations'],
          limits: { monthly_listings: 500, photo_uploads: 50, api_calls: 10000 },
          sortOrder: 3
        }
      ]);

      console.log('✅ Default subscription plans initialized');
    }
  }
}