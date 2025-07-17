import { Request, Response, NextFunction } from 'express';
import { MonetizationService } from '../services/monetization-service';

/**
 * API Authentication Middleware
 * Handles API key authentication and rate limiting for monetized API access
 */
export class ApiAuthMiddleware {

  /**
   * Authenticate API key and check rate limits
   */
  static async authenticate(req: Request & { apiUser?: any }, res: Response, next: NextFunction) {
    try {
      // Extract API key from header
      const authHeader = req.headers.authorization;
      const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

      if (!apiKey) {
        return res.status(401).json({
          error: 'API key required',
          code: 'API_KEY_MISSING',
          message: 'Include API key in Authorization header as: Bearer YOUR_API_KEY'
        });
      }

      // Validate API key
      const validation = await MonetizationService.validateApiKey(apiKey);

      if (!validation.valid) {
        return res.status(401).json({
          error: 'Invalid API key',
          code: 'API_KEY_INVALID'
        });
      }

      if (validation.rateLimitExceeded) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Rate limit: ${validation.plan.rateLimit} requests per minute`
        });
      }

      // Add API user info to request
      req.apiUser = {
        keyId: validation.keyData.id,
        userId: validation.keyData.userId,
        plan: validation.plan,
        keyName: validation.keyData.name
      };

      // Track API usage (fire and forget)
      MonetizationService.trackApiUsage(
        validation.keyData.id,
        req.path,
        req.method,
        200 // Will be updated in response middleware
      ).catch(console.error);

      next();
    } catch (error) {
      console.error('Error in API authentication:', error);
      res.status(500).json({
        error: 'Authentication service error',
        code: 'AUTH_SERVICE_ERROR'
      });
    }
  }

  /**
   * Track API response for analytics
   */
  static trackResponse(req: Request & { apiUser?: any }, res: Response, next: NextFunction) {
    const originalSend = res.send;
    const startTime = Date.now();

    res.send = function(data) {
      const responseTime = Date.now() - startTime;
      
      // Track API usage with response details
      if (req.apiUser) {
        MonetizationService.trackApiUsage(
          req.apiUser.keyId,
          req.path,
          req.method,
          res.statusCode,
          responseTime
        ).catch(console.error);
      }

      return originalSend.call(this, data);
    };

    next();
  }

  /**
   * Apply both authentication and response tracking
   */
  static apply = [
    ApiAuthMiddleware.authenticate,
    ApiAuthMiddleware.trackResponse
  ];
}

// Extend Request interface
declare global {
  namespace Express {
    interface Request {
      apiUser?: {
        keyId: number;
        userId: string;
        plan: any;
        keyName: string;
      };
    }
  }
}