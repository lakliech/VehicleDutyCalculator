import { getMongoCollections } from '../db/mongodb';
import { 
  UserAnalytics, 
  UserAnalyticsInsert,
  SearchAnalytics,
  SearchAnalyticsInsert,
  PageView,
  PerformanceMetrics,
  DailyAnalytics 
} from '../../shared/mongodb-schemas';
import crypto from 'crypto';

export class AnalyticsService {
  private collections = getMongoCollections();

  constructor() {
    // Gracefully handle MongoDB unavailability
    if (!this.collections) {
      console.log('MongoDB not available, analytics will be logged to console only');
    }
  }

  // User behavior tracking
  async trackUserBehavior(data: UserAnalyticsInsert): Promise<void> {
    try {
      const analyticsData: UserAnalytics = {
        ...data,
        timestamp: data.timestamp || new Date()
      };

      if (this.collections) {
        await this.collections.userAnalytics.insertOne(analyticsData);
      } else {
        console.log('📊 User Analytics:', JSON.stringify(analyticsData, null, 2));
      }
    } catch (error) {
      console.error('Failed to track user behavior:', error);
    }
  }

  // Search analytics tracking
  async trackSearch(data: SearchAnalyticsInsert): Promise<void> {
    try {
      const searchData: SearchAnalytics = {
        ...data,
        timestamp: data.timestamp || new Date()
      };

      if (this.collections) {
        await this.collections.searchAnalytics.insertOne(searchData);
      } else {
        console.log('🔍 Search Analytics:', JSON.stringify(searchData, null, 2));
      }
    } catch (error) {
      console.error('Failed to track search:', error);
    }
  }

  // Page view tracking
  async trackPageView(data: Omit<PageView, 'timestamp'>): Promise<void> {
    try {
      const pageViewData: PageView = {
        ...data,
        timestamp: new Date()
      };

      if (this.collections) {
        await this.collections.pageViews.insertOne(pageViewData);
      } else {
        console.log('📄 Page View:', JSON.stringify(pageViewData, null, 2));
      }
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  // Performance tracking
  async trackPerformance(data: Omit<PerformanceMetrics, 'timestamp'>): Promise<void> {
    try {
      const performanceData: PerformanceMetrics = {
        ...data,
        timestamp: new Date()
      };

      if (this.collections) {
        await this.collections.performanceMetrics.insertOne(performanceData);
      } else {
        console.log('⚡ Performance:', JSON.stringify(performanceData, null, 2));
      }
    } catch (error) {
      console.error('Failed to track performance:', error);
    }
  }

  // Get popular searches
  async getPopularSearches(timeframe: 'day' | 'week' | 'month' = 'week', limit: number = 10): Promise<Array<{ query: string; count: number }>> {
    if (!this.collections) {
      return [];
    }

    try {
      const timeframeStart = this.getTimeframeStart(timeframe);
      
      const results = await this.collections.searchAnalytics.aggregate([
        { 
          $match: { 
            timestamp: { $gte: timeframeStart },
            source: 'user_search' // Only count actual user searches
          } 
        },
        { 
          $group: { 
            _id: '$query', 
            count: { $sum: 1 },
            avgResultsCount: { $avg: '$resultsCount' },
            avgExecutionTime: { $avg: '$executionTime' }
          } 
        },
        { $sort: { count: -1 } },
        { $limit: limit },
        {
          $project: {
            query: '$_id',
            count: 1,
            avgResultsCount: { $round: ['$avgResultsCount', 0] },
            avgExecutionTime: { $round: ['$avgExecutionTime', 2] },
            _id: 0
          }
        }
      ]).toArray();

      return results as Array<{ query: string; count: number }>;
    } catch (error) {
      console.error('Failed to get popular searches:', error);
      return [];
    }
  }

  // Get user activity summary
  async getUserActivitySummary(userId: string, days: number = 30): Promise<any> {
    if (!this.collections) {
      return null;
    }

    try {
      const since = new Date();
      since.setDate(since.getDate() - days);

      const activity = await this.collections.userAnalytics.aggregate([
        { 
          $match: { 
            userId,
            timestamp: { $gte: since }
          } 
        },
        {
          $group: {
            _id: '$action',
            count: { $sum: 1 },
            lastActivity: { $max: '$timestamp' }
          }
        },
        {
          $project: {
            action: '$_id',
            count: 1,
            lastActivity: 1,
            _id: 0
          }
        }
      ]).toArray();

      // Get total session count
      const sessions = await this.collections.userAnalytics.aggregate([
        { 
          $match: { 
            userId,
            timestamp: { $gte: since }
          } 
        },
        {
          $group: {
            _id: '$sessionId'
          }
        },
        {
          $count: 'totalSessions'
        }
      ]).toArray();

      return {
        userId,
        period: `${days} days`,
        activity,
        totalSessions: sessions[0]?.totalSessions || 0,
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Failed to get user activity summary:', error);
      return null;
    }
  }

  // Generate daily analytics summary
  async generateDailyAnalytics(date?: string): Promise<DailyAnalytics | null> {
    if (!this.collections) {
      return null;
    }

    try {
      const targetDate = date || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const dayStart = new Date(`${targetDate}T00:00:00.000Z`);
      const dayEnd = new Date(`${targetDate}T23:59:59.999Z`);

      // User metrics
      const userMetrics = await this.collections.userAnalytics.aggregate([
        { $match: { timestamp: { $gte: dayStart, $lte: dayEnd } } },
        {
          $group: {
            _id: null,
            totalUsers: { $addToSet: '$userId' },
            totalActions: { $sum: 1 },
            actions: { $push: '$action' }
          }
        }
      ]).toArray();

      // Page view metrics
      const pageViewMetrics = await this.collections.pageViews.aggregate([
        { $match: { timestamp: { $gte: dayStart, $lte: dayEnd } } },
        {
          $group: {
            _id: null,
            totalPageViews: { $sum: 1 },
            avgDuration: { $avg: '$duration' }
          }
        }
      ]).toArray();

      // Search metrics
      const searchMetrics = await this.collections.searchAnalytics.aggregate([
        { $match: { timestamp: { $gte: dayStart, $lte: dayEnd } } },
        {
          $group: {
            _id: null,
            totalSearches: { $sum: 1 },
            avgExecutionTime: { $avg: '$executionTime' }
          }
        }
      ]).toArray();

      // Popular makes (from search filters)
      const popularMakes = await this.collections.searchAnalytics.aggregate([
        { 
          $match: { 
            timestamp: { $gte: dayStart, $lte: dayEnd },
            'filters.make': { $exists: true, $ne: null }
          } 
        },
        {
          $group: {
            _id: '$filters.make',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            make: '$_id',
            count: 1,
            _id: 0
          }
        }
      ]).toArray();

      // Performance metrics
      const performanceMetrics = await this.collections.performanceMetrics.aggregate([
        { $match: { timestamp: { $gte: dayStart, $lte: dayEnd } } },
        {
          $group: {
            _id: '$type',
            avgDuration: { $avg: '$duration' },
            successRate: {
              $avg: { $cond: ['$success', 1, 0] }
            }
          }
        }
      ]).toArray();

      const analytics: DailyAnalytics = {
        date: targetDate,
        metrics: {
          totalUsers: userMetrics[0]?.totalUsers?.length || 0,
          uniqueUsers: userMetrics[0]?.totalUsers?.length || 0,
          totalPageViews: pageViewMetrics[0]?.totalPageViews || 0,
          totalSearches: searchMetrics[0]?.totalSearches || 0,
          totalCalculations: userMetrics[0]?.actions?.filter((a: string) => a === 'calculate').length || 0,
          totalConversations: 0, // Will be calculated from conversations collection
          popularMakes: (popularMakes as Array<{ make: string; count: number }>) || [],
          popularSearchTerms: [], // Will be calculated separately
          avgSessionDuration: pageViewMetrics[0]?.avgDuration || 0,
          conversionRate: 0, // Calculate based on your conversion definition
          bounceRate: 0 // Calculate based on single-page sessions
        },
        performance: {
          avgPageLoadTime: performanceMetrics.find(p => p._id === 'api')?.avgDuration || 0,
          avgSearchTime: searchMetrics[0]?.avgExecutionTime || 0,
          avgCalculationTime: performanceMetrics.find(p => p._id === 'calculation')?.avgDuration || 0,
          cacheHitRate: 0 // Will be calculated from cache metrics
        },
        processedAt: new Date(),
        createdAt: new Date()
      };

      // Store the daily analytics
      await this.collections.dailyAnalytics.replaceOne(
        { date: targetDate },
        analytics,
        { upsert: true }
      );

      return analytics;
    } catch (error) {
      console.error('Failed to generate daily analytics:', error);
      return null;
    }
  }

  // Cache helper methods
  generateCacheKey(data: any): string {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
  }

  private getTimeframeStart(timeframe: 'day' | 'week' | 'month'): Date {
    const now = new Date();
    switch (timeframe) {
      case 'day':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  }

  // Health check for analytics service
  async healthCheck(): Promise<{ status: string; details?: any }> {
    if (!this.collections) {
      return { status: 'unavailable', details: 'MongoDB not connected' };
    }

    try {
      // Test basic operations
      const testData = {
        userId: 'health-check',
        sessionId: 'health-check',
        action: 'view' as const,
        metadata: {
          pageUrl: '/health-check',
          userAgent: 'health-check'
        }
      };

      await this.trackUserBehavior(testData);

      // Clean up test data
      await this.collections.userAnalytics.deleteMany({ userId: 'health-check' });

      return { status: 'healthy' };
    } catch (error) {
      return { 
        status: 'error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Singleton instance
export const analyticsService = new AnalyticsService();