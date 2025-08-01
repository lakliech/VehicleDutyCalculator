# Hybrid Database Implementation Plan
## PostgreSQL + MongoDB for Kenya Motor Vehicle Duty Calculator

### Overview
This document outlines the implementation strategy for introducing MongoDB alongside PostgreSQL to enhance performance and capabilities while maintaining data integrity for critical operations.

## Database Allocation Strategy

### PostgreSQL (Primary) - ACID Compliance & Structured Data
**Core Financial & Transactional Data:**
- User accounts, authentication, and role management
- Vehicle reference data (CRSP values, makes, models)
- Duty calculations and tax components
- Payment transactions (Paystack integration)
- Subscription billing and monetization
- Financial product matching results
- Location hierarchies (counties, areas)

**Tables to Keep in PostgreSQL:**
```sql
-- Critical structured data
users, user_roles, user_sessions
vehicles, vehicle_references, heavy_machinery, trailers
calculations, depreciation_rates, tax_rates, processing_fees
payments, subscriptions, billing_transactions
financial_products, loan_applications
locations, counties, areas
dealers, seller_profiles
```

### MongoDB (Secondary) - Performance & Scalability
**Analytics & High-Volume Data:**
- User behavior tracking and analytics
- Search queries and AI-powered recommendations
- Real-time messaging and notifications
- Content management (blogs, help articles)
- Image metadata and optimization logs
- SMS delivery logs and templates
- Cache for frequently accessed data

**Collections to Implement:**
```javascript
// Analytics & Tracking
user_analytics, page_views, search_analytics
vehicle_views, listing_interactions
conversion_tracking, funnel_analytics

// Messaging & Communication
conversations, messages, sms_logs
notification_templates, email_templates
user_preferences, communication_history

// Content & Media
blog_posts, help_articles, faqs
image_metadata, optimization_logs
promotional_content, advertisements

// Caching & Performance
popular_searches, trending_vehicles
cached_calculations, session_data
recommendation_cache, ai_responses
```

## Implementation Phases

### Phase 1: Infrastructure Setup (Week 1-2)
1. **MongoDB Integration**
   ```bash
   npm install mongodb mongoose
   npm install @types/mongodb
   ```

2. **Database Connection Management**
   ```typescript
   // server/db/mongodb.ts
   import { MongoClient, Db } from 'mongodb';
   
   class MongoDBConnection {
     private client: MongoClient;
     private db: Db;
     
     async connect() {
       this.client = new MongoClient(process.env.MONGODB_URI);
       await this.client.connect();
       this.db = this.client.db('gariyangu_analytics');
     }
     
     getDb() { return this.db; }
   }
   ```

3. **Dual Storage Interface**
   ```typescript
   // server/storage/hybrid-storage.ts
   interface IHybridStorage extends IStorage {
     // PostgreSQL methods (existing)
     getVehicleById(id: string): Promise<Vehicle>;
     createPayment(payment: Payment): Promise<Payment>;
     
     // MongoDB methods (new)
     trackUserBehavior(data: UserAnalytics): Promise<void>;
     getCachedSearchResults(query: string): Promise<SearchResult[]>;
     storeConversation(conversation: Conversation): Promise<void>;
   }
   ```

### Phase 2: Analytics Migration (Week 3-4)
1. **User Behavior Tracking**
   ```typescript
   // MongoDB Schema
   interface UserAnalytics {
     userId: string;
     sessionId: string;
     timestamp: Date;
     action: 'view' | 'search' | 'contact' | 'calculate';
     metadata: {
       vehicleId?: string;
       searchQuery?: string;
       filters?: Record<string, any>;
       pageUrl: string;
       userAgent: string;
       location?: { county: string; area: string };
     };
   }
   ```

2. **Search Analytics & Caching**
   ```typescript
   // Popular searches with auto-suggestions
   interface SearchAnalytics {
     query: string;
     resultsCount: number;
     clickThroughRate: number;
     conversionRate: number;
     timestamp: Date;
     userId?: string;
     filters: Record<string, any>;
   }
   ```

### Phase 3: Real-time Features (Week 5-6)
1. **Messaging System**
   ```typescript
   interface Conversation {
     _id: ObjectId;
     listingId: number; // References PostgreSQL listing
     buyerId: string;   // References PostgreSQL user
     sellerId: string;  // References PostgreSQL user
     messages: Message[];
     status: 'active' | 'archived' | 'closed';
     createdAt: Date;
     updatedAt: Date;
   }
   
   interface Message {
     id: string;
     senderId: string;
     content: string;
     timestamp: Date;
     type: 'text' | 'template' | 'image' | 'location';
     metadata?: Record<string, any>;
   }
   ```

2. **Notification System**
   ```typescript
   interface NotificationTemplate {
     _id: ObjectId;
     type: 'sms' | 'email' | 'push';
     category: 'marketing' | 'transactional' | 'system';
     template: string;
     variables: string[];
     language: 'en' | 'sw';
     isActive: boolean;
   }
   ```

### Phase 4: Performance Optimization (Week 7-8)
1. **Intelligent Caching Layer**
   ```typescript
   // Cache frequently accessed PostgreSQL data
   interface CachedData {
     key: string;
     data: any;
     expiresAt: Date;
     source: 'postgresql' | 'api' | 'calculation';
     tags: string[]; // For cache invalidation
   }
   ```

2. **Pre-computed Analytics**
   ```typescript
   // Daily/weekly/monthly aggregations
   interface AnalyticsSummary {
     date: Date;
     period: 'daily' | 'weekly' | 'monthly';
     metrics: {
       totalViews: number;
       uniqueUsers: number;
       popularMakes: Array<{ make: string; count: number }>;
       avgCalculationTime: number;
       conversionRate: number;
     };
   }
   ```

## Data Flow Architecture

### Write Operations
```
User Action → Express Route → Business Logic
    ↓
PostgreSQL (Critical Data) + MongoDB (Analytics) 
    ↓
Response + Background Analytics Processing
```

### Read Operations
```
User Request → Express Route
    ↓
Check MongoDB Cache → If Miss → PostgreSQL
    ↓
Update MongoDB Cache → Return Response
```

## Implementation Code Structure

### 1. Hybrid Storage Service
```typescript
// server/services/hybrid-storage.ts
export class HybridStorageService {
  constructor(
    private pgStorage: IStorage,
    private mongoClient: MongoClient
  ) {}
  
  // User operations (PostgreSQL primary)
  async createUser(userData: UserInsert) {
    const user = await this.pgStorage.createUser(userData);
    
    // Track in MongoDB for analytics
    await this.trackUserEvent({
      userId: user.id,
      action: 'user_created',
      timestamp: new Date(),
      metadata: { registrationMethod: 'oauth' }
    });
    
    return user;
  }
  
  // Vehicle search (hybrid approach)
  async searchVehicles(filters: SearchFilters) {
    // Check MongoDB cache first
    const cacheKey = this.generateCacheKey(filters);
    const cached = await this.getCachedSearchResults(cacheKey);
    
    if (cached && !this.isCacheExpired(cached)) {
      // Track cache hit
      await this.trackSearchEvent(filters, 'cache_hit');
      return cached.results;
    }
    
    // Fetch from PostgreSQL
    const results = await this.pgStorage.searchVehicles(filters);
    
    // Cache in MongoDB
    await this.cacheSearchResults(cacheKey, results);
    
    // Track search analytics
    await this.trackSearchEvent(filters, 'database_query');
    
    return results;
  }
}
```

### 2. Analytics Service
```typescript
// server/services/analytics-service.ts
export class AnalyticsService {
  constructor(private mongoDb: Db) {}
  
  async trackPageView(data: PageViewData) {
    await this.mongoDb.collection('page_views').insertOne({
      ...data,
      timestamp: new Date(),
      processed: false
    });
  }
  
  async getPopularSearches(timeframe: 'day' | 'week' | 'month') {
    return await this.mongoDb.collection('search_analytics')
      .aggregate([
        { $match: { timestamp: { $gte: this.getTimeframeStart(timeframe) } } },
        { $group: { _id: '$query', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray();
  }
  
  async generateDailyReport() {
    // Aggregate daily metrics from MongoDB
    // Store summary back to MongoDB for quick access
  }
}
```

### 3. Messaging Service
```typescript
// server/services/messaging-service.ts
export class MessagingService {
  constructor(
    private mongoDb: Db,
    private pgStorage: IStorage
  ) {}
  
  async createConversation(listingId: number, buyerId: string, sellerId: string) {
    // Verify listing exists in PostgreSQL
    const listing = await this.pgStorage.getListingById(listingId);
    if (!listing) throw new Error('Listing not found');
    
    // Create conversation in MongoDB
    const conversation = await this.mongoDb.collection('conversations').insertOne({
      listingId,
      buyerId,
      sellerId,
      messages: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return conversation;
  }
  
  async sendMessage(conversationId: string, senderId: string, content: string) {
    const message = {
      id: generateId(),
      senderId,
      content,
      timestamp: new Date(),
      type: 'text'
    };
    
    await this.mongoDb.collection('conversations').updateOne(
      { _id: new ObjectId(conversationId) },
      { 
        $push: { messages: message },
        $set: { updatedAt: new Date() }
      }
    );
    
    // Trigger real-time notification
    await this.notifyParticipants(conversationId, message);
    
    return message;
  }
}
```

## Performance Benefits

### Expected Improvements
1. **Search Performance**: 40-60% faster vehicle search with MongoDB caching
2. **Analytics Queries**: 70-80% faster dashboard loading with pre-aggregated data
3. **Real-time Features**: Near-instant messaging with MongoDB's document model
4. **Scalability**: Independent scaling of read-heavy operations

### Monitoring & Metrics
```typescript
// Performance monitoring
interface PerformanceMetrics {
  postgresqlQueries: { average: number; p95: number; slow: number };
  mongodbQueries: { average: number; p95: number; slow: number };
  cacheHitRate: number;
  dataConsistency: { checks: number; failures: number };
}
```

## Migration Strategy

### Data Migration Scripts
```typescript
// scripts/migrate-analytics.ts
async function migrateAnalyticsData() {
  // Move existing analytics from PostgreSQL to MongoDB
  // Maintain data during transition period
  // Verify data integrity
}

// scripts/setup-indexes.ts
async function createMongoIndexes() {
  // Optimize for common query patterns
  await db.collection('user_analytics').createIndex({ userId: 1, timestamp: -1 });
  await db.collection('search_analytics').createIndex({ query: 'text' });
  await db.collection('conversations').createIndex({ listingId: 1, status: 1 });
}
```

## Data Consistency & Sync

### Eventual Consistency Patterns
```typescript
// Handle cross-database operations
async function updateListingWithAnalytics(listingId: number, updateData: any) {
  try {
    // Primary operation in PostgreSQL
    const listing = await pgStorage.updateListing(listingId, updateData);
    
    // Secondary operation in MongoDB (can fail without affecting primary)
    await mongoAnalytics.trackListingUpdate(listingId, updateData)
      .catch(err => logger.warn('Analytics update failed', err));
    
    return listing;
  } catch (error) {
    // Rollback only critical operations
    throw error;
  }
}
```

This hybrid approach will give you the best of both worlds - maintaining the reliability and ACID compliance of PostgreSQL for critical operations while leveraging MongoDB's strengths for analytics, caching, and real-time features.

Would you like me to start implementing any specific phase of this plan?