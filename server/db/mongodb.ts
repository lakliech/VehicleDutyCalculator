import { MongoClient, Db, Collection } from 'mongodb';

export interface MongoCollections {
  userAnalytics: Collection;
  searchAnalytics: Collection;
  pageViews: Collection;
  conversations: Collection;
  messages: Collection;
  notificationTemplates: Collection;
  smsLogs: Collection;
  cachedSearchResults: Collection;
  performanceMetrics: Collection;
  dailyAnalytics: Collection;
}

class MongoDBConnection {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private collections: MongoCollections | null = null;
  private isConnecting = false;

  async connect(): Promise<void> {
    if (this.client && this.db) {
      return; // Already connected
    }

    if (this.isConnecting) {
      // Wait for existing connection attempt
      while (this.isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return;
    }

    this.isConnecting = true;
    
    try {
      const mongoUri = process.env.MONGODB_URI;
      
      if (!mongoUri) {
        console.log('MongoDB URI not configured, analytics will use memory storage only');
        this.isConnecting = false;
        return;
      }

      console.log('Connecting to MongoDB...');
      this.client = new MongoClient(mongoUri);
      await this.client.connect();
      
      this.db = this.client.db('gariyangu_analytics');
      
      // Initialize collections
      this.collections = {
        userAnalytics: this.db.collection('user_analytics'),
        searchAnalytics: this.db.collection('search_analytics'),
        pageViews: this.db.collection('page_views'),
        conversations: this.db.collection('conversations'),
        messages: this.db.collection('messages'),
        notificationTemplates: this.db.collection('notification_templates'),
        smsLogs: this.db.collection('sms_logs'),
        cachedSearchResults: this.db.collection('cached_search_results'),
        performanceMetrics: this.db.collection('performance_metrics'),
        dailyAnalytics: this.db.collection('daily_analytics')
      };

      // Create indexes for optimal performance
      await this.createIndexes();
      
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      this.client = null;
      this.db = null;
      this.collections = null;
    } finally {
      this.isConnecting = false;
    }
  }

  private async createIndexes(): Promise<void> {
    if (!this.collections) return;

    try {
      // User analytics indexes
      await this.collections.userAnalytics.createIndex({ userId: 1, timestamp: -1 });
      await this.collections.userAnalytics.createIndex({ action: 1, timestamp: -1 });
      await this.collections.userAnalytics.createIndex({ 'metadata.vehicleId': 1 });

      // Search analytics indexes
      await this.collections.searchAnalytics.createIndex({ query: 'text' });
      await this.collections.searchAnalytics.createIndex({ timestamp: -1 });
      await this.collections.searchAnalytics.createIndex({ resultsCount: 1 });

      // Page views indexes
      await this.collections.pageViews.createIndex({ userId: 1, timestamp: -1 });
      await this.collections.pageViews.createIndex({ pageUrl: 1, timestamp: -1 });

      // Conversations indexes
      await this.collections.conversations.createIndex({ listingId: 1 });
      await this.collections.conversations.createIndex({ buyerId: 1, status: 1 });
      await this.collections.conversations.createIndex({ sellerId: 1, status: 1 });

      // Cached search results indexes
      await this.collections.cachedSearchResults.createIndex({ key: 1 });
      await this.collections.cachedSearchResults.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

      // SMS logs indexes
      await this.collections.smsLogs.createIndex({ userId: 1, timestamp: -1 });
      await this.collections.smsLogs.createIndex({ status: 1, timestamp: -1 });

      console.log('MongoDB indexes created successfully');
    } catch (error) {
      console.error('Error creating MongoDB indexes:', error);
    }
  }

  getDb(): Db | null {
    return this.db;
  }

  getCollections(): MongoCollections | null {
    return this.collections;
  }

  isConnected(): boolean {
    return this.client !== null && this.db !== null;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.collections = null;
      console.log('MongoDB disconnected');
    }
  }

  async healthCheck(): Promise<{ status: string; details?: any }> {
    if (!this.isConnected()) {
      return { status: 'disconnected' };
    }

    try {
      await this.db!.admin().ping();
      return { 
        status: 'healthy',
        details: {
          collections: Object.keys(this.collections || {}),
          dbName: this.db!.databaseName
        }
      };
    } catch (error) {
      return { 
        status: 'error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Singleton instance
export const mongoConnection = new MongoDBConnection();

// Helper function to get collections safely
export function getMongoCollections(): MongoCollections | null {
  return mongoConnection.getCollections();
}

// Initialize connection on module load
mongoConnection.connect().catch(console.error);