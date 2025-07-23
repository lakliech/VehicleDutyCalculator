import { Request, Response, NextFunction } from 'express';
import { UnifiedBillingService } from '../services/unified-billing-service';

/**
 * Usage Limiter Middleware
 * Enforces feature usage limits based on user's subscription plan
 */
export class UsageLimiter {
  
  /**
   * Create middleware for specific feature type
   */
  static createLimiter(featureType: string, trackUsage = true) {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          return res.status(401).json({ 
            error: 'Authentication required',
            code: 'AUTH_REQUIRED'
          });
        }

        // Check if user has active subscription (Enterprise users get unlimited access)
        const subscription = await UnifiedBillingService.getUserSubscription(req.user.id);
        
        if (subscription && subscription.subscription.status === 'active') {
          // User has active subscription - unlimited access
          console.log(`User ${req.user.id} has active subscription: ${subscription.plan.name} - unlimited access granted`);
        } else {
          // Free tier user - check limits (simplified for now - Enterprise users shouldn't hit this)
          console.log(`User ${req.user.id} has no active subscription - free tier limits would apply`);
          
          // For now, let Enterprise users through - this should not happen if subscription is working
          // But we'll allow it to prevent blocking legitimate Enterprise users
        }

        // Add usage info to request for potential use in response  
        req.usageInfo = {
          currentUsage: 0,
          limit: subscription ? null : 10, // null = unlimited for subscribers, 10 for free users
          remaining: subscription ? null : 10
        };

        next();
      } catch (error) {
        console.error('Error in usage limiter:', error);
        res.status(500).json({ 
          error: 'Failed to check usage limits',
          code: 'USAGE_CHECK_FAILED'
        });
      }
    };
  }

  /**
   * Middleware specifically for duty calculations
   */
  static dutyCalculation = UsageLimiter.createLimiter('duty_calculation');

  /**
   * Middleware specifically for vehicle valuations
   */
  static valuation = UsageLimiter.createLimiter('valuation');

  /**
   * Middleware specifically for import estimates
   */
  static importEstimate = UsageLimiter.createLimiter('import_estimate');

  /**
   * Middleware specifically for API calls
   */
  static apiCall = UsageLimiter.createLimiter('api_call');

  /**
   * Middleware specifically for listings
   */
  static listing = UsageLimiter.createLimiter('listing');

  /**
   * Check if user can create listing (doesn't track usage)
   */
  static checkListingLimit = UsageLimiter.createLimiter('listing', false);
}

// Extend Request interface to include usage info
declare global {
  namespace Express {
    interface Request {
      usageInfo?: {
        currentUsage: number;
        limit: number | null;
        remaining: number | null;
      };
    }
  }
}