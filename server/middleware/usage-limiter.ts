import { Request, Response, NextFunction } from 'express';
import { MonetizationService } from '../services/monetization-service';

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

        // Check usage limits
        const limits = await MonetizationService.checkUsageLimit(req.user.id, featureType);
        
        if (!limits.allowed) {
          return res.status(429).json({
            error: 'Usage limit exceeded',
            code: 'USAGE_LIMIT_EXCEEDED',
            currentUsage: limits.currentUsage,
            limit: limits.limit,
            featureType,
            upgradeRequired: true
          });
        }

        // Track usage if enabled
        if (trackUsage) {
          await MonetizationService.trackUsage(req.user.id, featureType);
        }

        // Add usage info to request for potential use in response
        req.usageInfo = {
          currentUsage: limits.currentUsage + (trackUsage ? 1 : 0),
          limit: limits.limit,
          remaining: limits.limit ? limits.limit - limits.currentUsage - (trackUsage ? 1 : 0) : null
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