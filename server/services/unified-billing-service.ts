import { pool } from '../db';

/**
 * Unified Billing Service - Simple service for subscription plans
 * Works with existing database structure
 */
export class UnifiedBillingService {

  /**
   * Get all subscription plans from products table
   */
  static async getSubscriptionPlans() {
    try {
      // Get subscription plans
      const plansResult = await pool.query(`
        SELECT * FROM products 
        WHERE category_id = 2 AND is_active = true 
        ORDER BY sort_order
      `);

      // Get features for all subscription plans
      const planIds = plansResult.rows.map(plan => plan.id);
      
      const featuresResult = await pool.query(`
        SELECT product_id, name, description, limit_value, limit_type 
        FROM product_features 
        WHERE product_id = ANY($1) AND is_included = true
        ORDER BY product_id, sort_order, name
      `, [planIds]);

      // Group features by product_id
      const featuresByPlan = featuresResult.rows.reduce((acc: any, feature: any) => {
        if (!acc[feature.product_id]) {
          acc[feature.product_id] = [];
        }
        acc[feature.product_id].push({
          name: feature.name,
          description: feature.description,
          limit: feature.limit_value || 'unlimited',
          type: feature.limit_type || 'feature'
        });
        return acc;
      }, {});

      // Return plans with features
      return plansResult.rows.map((plan: any) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        basePrice: parseFloat(plan.base_price),
        monthly_price: parseFloat(plan.base_price),
        billingType: plan.billing_type,
        features: featuresByPlan[plan.id] || [],
        sortOrder: plan.sort_order
      }));
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      return [];
    }
  }

  /**
   * Get user's current subscription
   */
  static async getUserSubscription(userId: string) {
    try {
      // Check for user subscription in user_product_subscriptions table
      const result = await pool.query(`
        SELECT ups.*, p.name as plan_name, p.base_price 
        FROM user_product_subscriptions ups
        LEFT JOIN products p ON ups.product_id = p.id
        WHERE ups.user_id = $1 AND ups.status = 'active'
        LIMIT 1
      `, [userId]);

      if (result.rows.length === 0) {
        return null;
      }

      const subscription = result.rows[0];
      return {
        subscription: {
          ...subscription,
          subscription_type: subscription.plan_name || 'Free Plan'
        },
        plan: {
          id: subscription.product_id,
          name: subscription.plan_name,
          basePrice: parseFloat(subscription.base_price || '0')
        }
      };
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      return null;
    }
  }

  /**
   * Subscribe user to a plan
   */
  static async subscribeUserToPlan(userId: string, planId: number) {
    try {
      // Get plan details
      const planResult = await pool.query(`
        SELECT * FROM products WHERE id = $1
      `, [planId]);

      if (planResult.rows.length === 0) {
        throw new Error('Plan not found');
      }

      const plan = planResult.rows[0];

      // Create subscription
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // Add 1 month

      await pool.query(`
        INSERT INTO user_product_subscriptions 
        (user_id, product_id, status, current_period_start, current_period_end, next_billing_date)
        VALUES ($1, $2, 'active', NOW(), $3, $3)
      `, [userId, planId, endDate.toISOString()]);

      return { success: true, plan };
    } catch (error) {
      console.error('Error subscribing user to plan:', error);
      throw error;
    }
  }

  /**
   * Cancel user subscription
   */
  static async cancelUserSubscription(userId: string, immediately: boolean = false) {
    try {
      if (immediately) {
        // Cancel immediately
        await pool.query(`
          UPDATE user_product_subscriptions 
          SET status = 'cancelled', current_period_end = NOW()
          WHERE user_id = $1 AND status = 'active'
        `, [userId]);
      } else {
        // Cancel at period end
        await pool.query(`
          UPDATE user_product_subscriptions 
          SET status = 'cancelled'
          WHERE user_id = $1 AND status = 'active'
        `, [userId]);
      }

      return { success: true };
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  }

  /**
   * Get user's billing history
   */
  static async getBillingHistory(userId: string) {
    try {
      const result = await pool.query(`
        SELECT pt.*, p.name as product_name 
        FROM payment_transactions pt
        LEFT JOIN products p ON pt.reference LIKE '%' || p.id || '%'
        WHERE pt.user_id = $1
        ORDER BY pt.created_at DESC
        LIMIT 50
      `, [userId]);

      return result.rows;
    } catch (error) {
      console.error('Error fetching billing history:', error);
      return [];
    }
  }

  /**
   * Get account summary for user
   */
  static async getAccountSummary(userId: string) {
    try {
      // Get current subscription
      const subscription = await this.getUserSubscription(userId);
      
      // Get account credits (if applicable)
      const creditsResult = await pool.query(`
        SELECT COALESCE(SUM(amount), 0) as total_credits
        FROM account_credit_transactions 
        WHERE user_id = $1 AND type = 'credit'
      `, [userId]);

      const totalCredits = parseFloat(creditsResult.rows[0]?.total_credits || '0');

      return {
        subscription,
        totalCredits,
        accountStatus: subscription ? 'active' : 'free'
      };
    } catch (error) {
      console.error('Error fetching account summary:', error);
      return {
        subscription: null,
        totalCredits: 0,
        accountStatus: 'free'
      };
    }
  }

  /**
   * Check user's product access
   */
  static async getProductAccess(userId: string) {
    try {
      const subscription = await this.getUserSubscription(userId);
      
      return {
        hasActiveSubscription: !!subscription,
        planName: subscription?.subscription?.subscription_type || 'Free Plan',
        accessLevel: subscription ? 'premium' : 'basic'
      };
    } catch (error) {
      console.error('Error checking product access:', error);
      return {
        hasActiveSubscription: false,
        planName: 'Free Plan',
        accessLevel: 'basic'
      };
    }
  }
}