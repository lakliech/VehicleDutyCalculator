# MongoDB Integration: Code Examples
## How Existing Functionality Was Enhanced

Here are specific code examples showing how I integrated MongoDB analytics with your existing PostgreSQL system:

## 1. Enhanced Car Listings Search

### Before Integration
```typescript
// Original car listings endpoint (server/routes.ts)
app.get('/api/car-listings', authenticateUser, async (req: Request, res: Response) => {
  try {
    const result = await storage.getCarListings(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get listings' });
  }
});
```

### After Integration (Enhanced Version)
```typescript
// Enhanced with MongoDB analytics and caching
app.get('/api/car-listings', authenticateUser, async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  try {
    // Check MongoDB cache first (NEW)
    const cacheKey = hybridCacheService.generateCacheKey(req.query);
    const cached = await hybridCacheService.getCachedSearchResults(req.query);
    
    if (cached) {
      // Track cache hit analytics (NEW)
      await analyticsService.trackSearch({
        query: JSON.stringify(req.query),
        resultsCount: cached.totalCount,
        executionTime: Date.now() - startTime,
        userId: req.user?.id,
        sessionId: req.sessionID,
        filters: req.query,
        source: 'cache_hit'
      });
      
      return res.json({
        cars: cached.results,
        totalCount: cached.totalCount,
        fromCache: true,
        executionTime: Date.now() - startTime
      });
    }
    
    // Original PostgreSQL query (UNCHANGED)
    const result = await storage.getCarListings(req.query);
    const executionTime = Date.now() - startTime;
    
    // Cache results for future requests (NEW)
    await hybridCacheService.cacheSearchResults(
      req.query,
      result.cars,
      result.totalCount,
      executionTime,
      30 // 30 minutes TTL
    );
    
    // Track search analytics in MongoDB (NEW)
    await analyticsService.trackSearch({
      query: JSON.stringify(req.query),
      resultsCount: result.totalCount,
      executionTime,
      userId: req.user?.id,
      sessionId: req.sessionID,
      filters: req.query,
      source: 'database_query'
    });
    
    // Same response format as before
    res.json({
      ...result,
      fromCache: false,
      executionTime
    });
  } catch (error) {
    console.error('Car listings error:', error);
    res.status(500).json({ error: 'Failed to get listings' });
  }
});
```

## 2. Enhanced User Activity Tracking

### Before Integration
```typescript
// Original user activity logging (server/storage.ts)
async logUserActivity(
  userId: string, 
  activityType: string, 
  entityType?: string, 
  entityId?: string, 
  description?: string, 
  metadata?: any
): Promise<void> {
  await db.insert(userActivities).values({
    userId,
    activityType,
    entityType,
    entityId,
    description,
    metadata,
    createdAt: new Date()
  });
}
```

### After Integration (Dual Write)
```typescript
// Enhanced with MongoDB parallel tracking
async logUserActivity(
  userId: string, 
  activityType: string, 
  entityType?: string, 
  entityId?: string, 
  description?: string, 
  metadata?: any
): Promise<void> {
  // Original PostgreSQL logging (UNCHANGED)
  await db.insert(userActivities).values({
    userId,
    activityType,
    entityType,
    entityId,
    description,
    metadata,
    createdAt: new Date()
  });
  
  // Additional MongoDB analytics tracking (NEW)
  try {
    await analyticsService.trackUserBehavior({
      userId,
      sessionId: metadata?.sessionId || 'unknown',
      action: activityType,
      metadata: {
        entityType,
        entityId,
        description,
        ...metadata,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.log('MongoDB analytics tracking failed, continuing with PostgreSQL');
    // System continues working even if MongoDB is down
  }
}
```

## 3. Enhanced User Registration

### Before Integration
```typescript
// Original user creation (server/routes.ts)
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const user = await storage.createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});
```

### After Integration (With Analytics)
```typescript
// Enhanced with MongoDB user analytics
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  try {
    // Original user creation (UNCHANGED)
    const user = await storage.createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });
    
    // Track registration analytics (NEW)
    await analyticsService.trackUserBehavior({
      userId: user.id,
      sessionId: req.sessionID,
      action: 'register',
      metadata: {
        registrationMethod: 'email',
        pageUrl: req.headers.referer || '/register',
        userAgent: req.headers['user-agent'] || '',
        registrationTime: Date.now() - startTime,
        emailDomain: req.body.email.split('@')[1]
      }
    });
    
    // Track system performance (NEW)
    await analyticsService.trackPerformance({
      type: 'database',
      operation: 'user_registration',
      duration: Date.now() - startTime,
      success: true,
      metadata: {
        userId: user.id,
        method: 'email'
      }
    });
    
    res.json({ success: true, user });
  } catch (error) {
    // Track failed registration (NEW)
    await analyticsService.trackPerformance({
      type: 'database',
      operation: 'user_registration',
      duration: Date.now() - startTime,
      success: false,
      errorMessage: error.message
    });
    
    res.status(500).json({ error: 'Registration failed' });
  }
});
```

## 4. Enhanced Listing Creation

### Before Integration
```typescript
// Original listing creation
app.post('/api/car-listings', authenticateUser, async (req: Request, res: Response) => {
  try {
    const listing = await storage.createListing({
      ...req.body,
      sellerId: req.user.id
    });
    
    res.json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing' });
  }
});
```

### After Integration (With Cache Invalidation)
```typescript
// Enhanced with cache invalidation and analytics
app.post('/api/car-listings', authenticateUser, async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  try {
    // Original listing creation (UNCHANGED)
    const listing = await storage.createListing({
      ...req.body,
      sellerId: req.user.id
    });
    
    // Invalidate relevant cache entries (NEW)
    const invalidationTags = [
      'search_results',
      `make_${req.body.make}`,
      `location_${req.body.location}`,
      'price_filter'
    ];
    await hybridCacheService.invalidateByTags(invalidationTags);
    
    // Track listing creation analytics (NEW)
    await analyticsService.trackUserBehavior({
      userId: req.user.id,
      sessionId: req.sessionID,
      action: 'create_listing',
      metadata: {
        listingId: listing.id,
        vehicleMake: req.body.make,
        vehicleModel: req.body.model,
        price: req.body.price,
        location: req.body.location,
        creationTime: Date.now() - startTime
      }
    });
    
    res.json({ success: true, listing });
  } catch (error) {
    console.error('Listing creation error:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});
```

## 5. Integration at the Service Layer

### Hybrid Storage Service Pattern
```typescript
// server/services/hybrid-storage-service.ts
export class HybridStorageService {
  constructor(private pgStorage: IStorage) {}

  // Enhanced search with automatic caching
  async searchVehiclesWithCache(filters: any) {
    const startTime = Date.now();
    
    // Try cache first
    const cached = await this.cache.getCachedSearchResults(filters);
    if (cached) {
      await this.analytics.trackSearch({
        query: JSON.stringify(filters),
        resultsCount: cached.totalCount,
        executionTime: Date.now() - startTime,
        source: 'cache'
      });
      
      return {
        listings: cached.results,
        totalCount: cached.totalCount,
        fromCache: true
      };
    }

    // Fall back to PostgreSQL (original functionality)
    const results = await this.pgStorage.getCarListings(filters);
    
    // Cache for next time
    await this.cache.cacheSearchResults(
      filters, 
      results.listings, 
      results.totalCount,
      Date.now() - startTime
    );
    
    return { ...results, fromCache: false };
  }
}
```

## 6. Analytics Middleware Integration

### Request Tracking Middleware
```typescript
// server/routes/analytics-routes.ts
router.use('/api/*', async (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', async () => {
    const duration = Date.now() - startTime;
    
    // Track all API requests (NEW)
    await analyticsService.trackPerformance({
      type: 'api',
      operation: `${req.method} ${req.path}`,
      duration,
      success: res.statusCode < 400,
      errorMessage: res.statusCode >= 400 ? `HTTP ${res.statusCode}` : undefined,
      metadata: {
        userId: req.user?.id,
        endpoint: req.path,
        statusCode: res.statusCode
      }
    });
  });
  
  next();
});
```

## 7. Page View Tracking Integration

### Frontend Integration
```typescript
// client/src/App.tsx - Enhanced with analytics
import { useLocation } from 'wouter';
import { useEffect } from 'react';

function App() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Track page views automatically (NEW)
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'page_view',
            data: {
              pageUrl: location,
              pageTitle: document.title,
              referrer: document.referrer,
              timestamp: new Date()
            }
          })
        });
      } catch (error) {
        console.log('Analytics tracking failed');
      }
    };
    
    trackPageView();
  }, [location]);
  
  // Rest of your existing App component remains unchanged
}
```

## Key Integration Principles

### 1. Non-Breaking Changes
- All existing PostgreSQL functionality continues to work
- MongoDB integration is additive, not replacement
- System gracefully degrades if MongoDB is unavailable

### 2. Dual Write Pattern
```typescript
// Write to both systems in parallel
try {
  // Primary write (PostgreSQL) - must succeed
  const result = await pgStorage.operation(data);
  
  // Secondary write (MongoDB) - best effort
  await mongoAnalytics.track(analyticsData).catch(err => {
    console.log('Analytics tracking failed:', err);
  });
  
  return result;
} catch (error) {
  // Only PostgreSQL errors break the operation
  throw error;
}
```

### 3. Cache-First Strategy
```typescript
// Check cache → PostgreSQL → Update cache
const data = await cache.get(key) || 
              await database.query(params).then(result => {
                cache.set(key, result);
                return result;
              });
```

### 4. Analytics Enrichment
```typescript
// PostgreSQL: Basic event logging
await storage.logUserActivity(userId, 'view', 'listing', listingId);

// MongoDB: Rich context tracking
await analytics.trackUserBehavior({
  userId,
  action: 'view',
  metadata: {
    listingId,
    searchPath: userJourney,
    deviceType: req.headers['user-agent'],
    location: userLocation,
    timeOnPage: sessionData.duration
  }
});
```

This integration approach ensures your existing analytics continue working while adding powerful new capabilities through MongoDB's flexible document structure and high-performance characteristics.