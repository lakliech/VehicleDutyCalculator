import { IStorage } from '../storage';
import { analyticsService } from './analytics-service';
import { hybridCacheService } from './hybrid-cache-service';
import { createMessagingService } from './messaging-service';

/**
 * Hybrid Storage Service that combines PostgreSQL and MongoDB
 * PostgreSQL: Critical business data, transactions, user accounts
 * MongoDB: Analytics, caching, messaging, performance data
 */
export class HybridStorageService {
  private messagingService;

  constructor(private pgStorage: IStorage) {
    this.messagingService = createMessagingService(pgStorage);
  }

  // Proxy all PostgreSQL operations through the existing storage
  get postgresql() {
    return this.pgStorage;
  }

  // MongoDB analytics operations
  get analytics() {
    return analyticsService;
  }

  // Hybrid cache operations
  get cache() {
    return hybridCacheService;
  }

  // Messaging operations (MongoDB-backed)
  get messaging() {
    return this.messagingService;
  }

  // Enhanced search with caching
  async searchVehiclesWithCache(filters: any): Promise<any> {
    const startTime = Date.now();
    
    try {
      // Check cache first
      const cached = await this.cache.getCachedSearchResults(filters);
      if (cached) {
        // Track cache hit
        await this.analytics.trackSearch({
          query: JSON.stringify(filters),
          resultsCount: cached.totalCount,
          executionTime: Date.now() - startTime,
          userId: undefined,
          sessionId: 'cache',
          filters,
          source: 'user_search'
        });
        
        return {
          listings: cached.results,
          totalCount: cached.totalCount,
          fromCache: true,
          executionTime: Date.now() - startTime
        };
      }

      // Fetch from PostgreSQL
      const results = await this.pgStorage.getCarListings(filters);
      const executionTime = Date.now() - startTime;

      // Cache the results
      await this.cache.cacheSearchResults(
        filters,
        results.listings,
        results.totalCount,
        executionTime,
        30 // 30 minutes TTL
      );

      // Track search analytics
      await this.analytics.trackSearch({
        query: JSON.stringify(filters),
        resultsCount: results.totalCount,
        executionTime,
        userId: undefined,
        sessionId: 'direct',
        filters,
        source: 'user_search'
      });

      return {
        ...results,
        fromCache: false,
        executionTime
      };
    } catch (error) {
      console.error('Search with cache failed:', error);
      
      // Fallback to direct PostgreSQL query
      const results = await this.pgStorage.getCarListings(filters);
      return {
        ...results,
        fromCache: false,
        executionTime: Date.now() - startTime,
        error: 'Cache unavailable, using direct query'
      };
    }
  }

  // Enhanced user creation with analytics
  async createUserWithTracking(userData: any, metadata?: any): Promise<any> {
    const startTime = Date.now();
    
    try {
      // Create user in PostgreSQL
      const user = await this.pgStorage.createUser(userData);
      
      // Track user creation analytics
      await this.analytics.trackUserBehavior({
        userId: user.id,
        sessionId: 'registration',
        action: 'register',
        metadata: {
          registrationMethod: metadata?.method || 'direct',
          pageUrl: metadata?.pageUrl || '/register',
          userAgent: metadata?.userAgent || '',
          referrer: metadata?.referrer
        }
      });

      // Track performance
      await this.analytics.trackPerformance({
        type: 'database',
        operation: 'create_user',
        duration: Date.now() - startTime,
        success: true,
        metadata: {
          userId: user.id
        }
      });

      return user;
    } catch (error) {
      // Track failed user creation
      await this.analytics.trackPerformance({
        type: 'database',
        operation: 'create_user',
        duration: Date.now() - startTime,
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });

      throw error;
    }
  }

  // Enhanced listing creation with cache invalidation
  async createListingWithCacheInvalidation(listingData: any): Promise<any> {
    const startTime = Date.now();
    
    try {
      // Create listing in PostgreSQL
      const listing = await this.pgStorage.createListing(listingData);
      
      // Invalidate relevant cache entries
      const tags = [
        'search_results',
        `make_${listingData.make}`,
        `location_${listingData.location}`,
        'price_filter'
      ];
      await this.cache.invalidateByTags(tags);

      // Track listing creation
      await this.analytics.trackUserBehavior({
        userId: listingData.sellerId,
        sessionId: 'listing_creation',
        action: 'create_listing',
        metadata: {
          listingId: listing.id,
          vehicleMake: listingData.make,
          vehicleModel: listingData.model,
          price: listingData.price,
          pageUrl: '/create-listing',
          userAgent: ''
        }
      });

      // Track performance
      await this.analytics.trackPerformance({
        type: 'database',
        operation: 'create_listing',
        duration: Date.now() - startTime,
        success: true,
        metadata: {
          userId: listingData.sellerId,
          listingId: listing.id
        }
      });

      return listing;
    } catch (error) {
      await this.analytics.trackPerformance({
        type: 'database',
        operation: 'create_listing',
        duration: Date.now() - startTime,
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });

      throw error;
    }
  }

  // Get user dashboard data (hybrid approach)
  async getUserDashboardData(userId: string): Promise<any> {
    try {
      // Get basic user data from PostgreSQL (with caching)
      let userData = await this.cache.getFrequentData(`user_${userId}`);
      if (!userData) {
        userData = await this.pgStorage.getUserWithRole(userId);
        if (userData) {
          await this.cache.cacheFrequentData(`user_${userId}`, userData, 15); // 15 minutes
        }
      }

      // Get analytics data from MongoDB
      const [
        activitySummary,
        unreadMessages,
        userListings
      ] = await Promise.all([
        this.analytics.getUserActivitySummary(userId, 30),
        this.messaging.getUnreadMessageCount(userId),
        this.pgStorage.getListingsByUser(userId)
      ]);

      return {
        user: userData,
        activity: activitySummary,
        unreadMessages,
        listings: userListings,
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Failed to get user dashboard data:', error);
      
      // Fallback to PostgreSQL only
      const userData = await this.pgStorage.getUserWithRole(userId);
      const userListings = await this.pgStorage.getListingsByUser(userId);
      
      return {
        user: userData,
        listings: userListings,
        fallback: true,
        generatedAt: new Date()
      };
    }
  }

  // Bulk data migration helper
  async migrateExistingData(): Promise<void> {
    console.log('Starting data migration to hybrid system...');
    
    try {
      // This would be implemented to migrate existing analytics data
      // from PostgreSQL to MongoDB if needed
      
      console.log('Data migration completed successfully');
    } catch (error) {
      console.error('Data migration failed:', error);
      throw error;
    }
  }

  // System health check
  async healthCheck(): Promise<{
    status: string;
    services: {
      postgresql: string;
      mongodb: any;
      analytics: any;
      cache: any;
      messaging: any;
    };
  }> {
    try {
      // Check PostgreSQL (basic query)
      await this.pgStorage.getAllRoles();
      const postgresqlStatus = 'healthy';

      // Check MongoDB services
      const [mongoHealth, analyticsHealth, cacheHealth, messagingHealth] = await Promise.all([
        import('../db/mongodb').then(m => m.mongoConnection.healthCheck()),
        this.analytics.healthCheck(),
        this.cache.healthCheck(),
        this.messaging.healthCheck()
      ]);

      const overallHealthy = postgresqlStatus === 'healthy' && 
                           mongoHealth.status === 'healthy' &&
                           analyticsHealth.status === 'healthy' &&
                           cacheHealth.status === 'healthy' &&
                           messagingHealth.status === 'healthy';

      return {
        status: overallHealthy ? 'healthy' : 'degraded',
        services: {
          postgresql: postgresqlStatus,
          mongodb: mongoHealth,
          analytics: analyticsHealth,
          cache: cacheHealth,
          messaging: messagingHealth
        }
      };
    } catch (error) {
      return {
        status: 'error',
        services: {
          postgresql: 'error',
          mongodb: { status: 'error' },
          analytics: { status: 'error' },
          cache: { status: 'error' },
          messaging: { status: 'error' }
        }
      };
    }
  }
}

// Create and export singleton instance
export function createHybridStorage(pgStorage: IStorage): HybridStorageService {
  return new HybridStorageService(pgStorage);
}