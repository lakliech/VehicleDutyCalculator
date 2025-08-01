import { Router } from 'express';
import { analyticsService } from '../services/analytics-service';
import { hybridCacheService } from '../services/hybrid-cache-service';
import { mongoConnection } from '../db/mongodb';

const router = Router();

// Middleware to track page views
router.use('/api/*', async (req, res, next) => {
  try {
    // Track API requests for analytics
    const startTime = Date.now();
    
    res.on('finish', async () => {
      const duration = Date.now() - startTime;
      
      await analyticsService.trackPerformance({
        type: 'api',
        operation: `${req.method} ${req.path}`,
        duration,
        success: res.statusCode < 400,
        errorMessage: res.statusCode >= 400 ? `HTTP ${res.statusCode}` : undefined,
        metadata: {
          userId: (req as any).user?.id,
          endpoint: req.path,
          queryType: req.method
        }
      });
    });
    
    next();
  } catch (error) {
    console.error('Analytics tracking error:', error);
    next();
  }
});

// Get popular searches
router.get('/api/analytics/popular-searches', async (req, res) => {
  try {
    const timeframe = req.query.timeframe as 'day' | 'week' | 'month' || 'week';
    const limit = parseInt(req.query.limit as string) || 10;
    
    const popularSearches = await analyticsService.getPopularSearches(timeframe, limit);
    
    res.json({
      success: true,
      data: popularSearches,
      timeframe,
      generatedAt: new Date()
    });
  } catch (error) {
    console.error('Failed to get popular searches:', error);
    res.status(500).json({ success: false, message: 'Failed to get analytics data' });
  }
});

// Get user activity summary
router.get('/api/analytics/user/:userId/activity', async (req, res) => {
  try {
    const { userId } = req.params;
    const days = parseInt(req.query.days as string) || 30;
    
    // Verify user can access this data (same user or admin)
    const requestingUser = (req as any).user;
    if (!requestingUser || (requestingUser.id !== userId && requestingUser.role?.name !== 'Admin')) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const activitySummary = await analyticsService.getUserActivitySummary(userId, days);
    
    res.json({
      success: true,
      data: activitySummary
    });
  } catch (error) {
    console.error('Failed to get user activity:', error);
    res.status(500).json({ success: false, message: 'Failed to get user activity' });
  }
});

// Get daily analytics (admin only)
router.get('/api/analytics/daily', async (req, res) => {
  try {
    const requestingUser = (req as any).user;
    if (!requestingUser || requestingUser.role?.name !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    
    const date = req.query.date as string; // YYYY-MM-DD format
    const analytics = await analyticsService.generateDailyAnalytics(date);
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Failed to get daily analytics:', error);
    res.status(500).json({ success: false, message: 'Failed to generate analytics' });
  }
});

// Get cache statistics
router.get('/api/analytics/cache-stats', async (req, res) => {
  try {
    const requestingUser = (req as any).user;
    if (!requestingUser || requestingUser.role?.name !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    
    const cacheStats = await hybridCacheService.getCacheStats();
    
    res.json({
      success: true,
      data: cacheStats
    });
  } catch (error) {
    console.error('Failed to get cache stats:', error);
    res.status(500).json({ success: false, message: 'Failed to get cache statistics' });
  }
});

// Clear cache (admin only)
router.post('/api/analytics/cache/clear', async (req, res) => {
  try {
    const requestingUser = (req as any).user;
    if (!requestingUser || requestingUser.role?.name !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    
    const { tags } = req.body;
    
    if (tags && Array.isArray(tags)) {
      await hybridCacheService.invalidateByTags(tags);
    } else {
      await hybridCacheService.invalidateAll();
    }
    
    res.json({
      success: true,
      message: 'Cache cleared successfully'
    });
  } catch (error) {
    console.error('Failed to clear cache:', error);
    res.status(500).json({ success: false, message: 'Failed to clear cache' });
  }
});

// Health check for MongoDB and analytics services
router.get('/api/analytics/health', async (req, res) => {
  try {
    const mongoHealth = await mongoConnection.healthCheck();
    const analyticsHealth = await analyticsService.healthCheck();
    const cacheHealth = await hybridCacheService.healthCheck();
    
    const overallHealth = mongoHealth.status === 'healthy' && 
                         analyticsHealth.status === 'healthy' && 
                         cacheHealth.status === 'healthy';
    
    res.json({
      status: overallHealth ? 'healthy' : 'degraded',
      services: {
        mongodb: mongoHealth,
        analytics: analyticsHealth,
        cache: cacheHealth
      },
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Track custom events (for frontend integration)
router.post('/api/analytics/track', async (req, res) => {
  try {
    const { event, data } = req.body;
    const userId = (req as any).user?.id;
    const sessionId = req.sessionID || 'anonymous';
    
    switch (event) {
      case 'page_view':
        await analyticsService.trackPageView({
          userId,
          sessionId,
          pageUrl: data.pageUrl,
          pageTitle: data.pageTitle,
          userAgent: req.headers['user-agent'] || '',
          referrer: data.referrer,
          duration: data.duration
        });
        break;
        
      case 'search':
        await analyticsService.trackSearch({
          query: data.query,
          resultsCount: data.resultsCount,
          userId,
          sessionId,
          filters: data.filters || {},
          executionTime: data.executionTime || 0,
          source: 'user_search'
        });
        break;
        
      case 'user_action':
        await analyticsService.trackUserBehavior({
          userId: userId || 'anonymous',
          sessionId,
          action: data.action,
          metadata: {
            ...data.metadata,
            pageUrl: data.pageUrl || req.headers.referer || '',
            userAgent: req.headers['user-agent'] || ''
          }
        });
        break;
        
      default:
        return res.status(400).json({ success: false, message: 'Unknown event type' });
    }
    
    res.json({ success: true, message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Failed to track event:', error);
    res.status(500).json({ success: false, message: 'Failed to track event' });
  }
});

export default router;