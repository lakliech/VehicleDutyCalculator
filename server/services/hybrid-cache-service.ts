import { getMongoCollections } from '../db/mongodb';
import { CachedSearchResults } from '../../shared/mongodb-schemas';
import crypto from 'crypto';

export class HybridCacheService {
  private collections = getMongoCollections();
  private memoryCache = new Map<string, { data: any; expiresAt: Date }>();
  
  constructor() {
    if (!this.collections) {
      console.log('MongoDB not available, using memory cache only');
    }
    
    // Clean up expired memory cache entries every 5 minutes
    setInterval(() => this.cleanupMemoryCache(), 5 * 60 * 1000);
  }

  // Generate cache key from object
  generateCacheKey(data: any): string {
    const sortedData = this.sortObjectKeys(data);
    return crypto.createHash('md5').update(JSON.stringify(sortedData)).digest('hex');
  }

  // Store search results in cache
  async cacheSearchResults(
    filters: Record<string, any>,
    results: any[],
    totalCount: number,
    executionTime: number,
    ttlMinutes: number = 30
  ): Promise<void> {
    const key = this.generateCacheKey(filters);
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
    
    const cacheData: CachedSearchResults = {
      key,
      results,
      filters,
      totalCount,
      executionTime,
      source: 'postgresql',
      tags: this.generateTags(filters),
      expiresAt,
      createdAt: new Date()
    };

    try {
      // Store in MongoDB if available
      if (this.collections) {
        await this.collections.cachedSearchResults.replaceOne(
          { key },
          cacheData,
          { upsert: true }
        );
      }

      // Also store in memory cache for ultra-fast access
      this.memoryCache.set(key, {
        data: cacheData,
        expiresAt
      });
    } catch (error) {
      console.error('Failed to cache search results:', error);
      // Fallback to memory cache only
      this.memoryCache.set(key, {
        data: cacheData,
        expiresAt
      });
    }
  }

  // Get cached search results
  async getCachedSearchResults(filters: Record<string, any>): Promise<CachedSearchResults | null> {
    const key = this.generateCacheKey(filters);

    try {
      // Check memory cache first (fastest)
      const memoryResult = this.memoryCache.get(key);
      if (memoryResult && memoryResult.expiresAt > new Date()) {
        return memoryResult.data;
      }

      // Check MongoDB cache
      if (this.collections) {
        const mongoResult = await this.collections.cachedSearchResults.findOne({
          key,
          expiresAt: { $gt: new Date() }
        });

        if (mongoResult) {
          // Update memory cache for next time
          this.memoryCache.set(key, {
            data: mongoResult as CachedSearchResults,
            expiresAt: mongoResult.expiresAt
          });
          
          return mongoResult as CachedSearchResults;
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to get cached search results:', error);
      return null;
    }
  }

  // Invalidate cache by tags
  async invalidateByTags(tags: string[]): Promise<void> {
    try {
      // Invalidate MongoDB cache
      if (this.collections) {
        await this.collections.cachedSearchResults.deleteMany({
          tags: { $in: tags }
        });
      }

      // Invalidate memory cache
      for (const [key, cached] of this.memoryCache.entries()) {
        const cacheData = cached.data as CachedSearchResults;
        if (cacheData.tags.some(tag => tags.includes(tag))) {
          this.memoryCache.delete(key);
        }
      }

      console.log(`Cache invalidated for tags: ${tags.join(', ')}`);
    } catch (error) {
      console.error('Failed to invalidate cache by tags:', error);
    }
  }

  // Invalidate all cache
  async invalidateAll(): Promise<void> {
    try {
      if (this.collections) {
        await this.collections.cachedSearchResults.deleteMany({});
      }
      
      this.memoryCache.clear();
      console.log('All cache invalidated');
    } catch (error) {
      console.error('Failed to invalidate all cache:', error);
    }
  }

  // Get cache statistics
  async getCacheStats(): Promise<{
    memoryEntries: number;
    mongoEntries: number;
    hitRate: number;
    totalHits: number;
    totalMisses: number;
  }> {
    try {
      const memoryEntries = this.memoryCache.size;
      
      let mongoEntries = 0;
      if (this.collections) {
        mongoEntries = await this.collections.cachedSearchResults.countDocuments({
          expiresAt: { $gt: new Date() }
        });
      }

      // TODO: Implement hit/miss tracking
      return {
        memoryEntries,
        mongoEntries,
        hitRate: 0, // Will be calculated when tracking is implemented
        totalHits: 0,
        totalMisses: 0
      };
    } catch (error) {
      console.error('Failed to get cache stats:', error);
      return {
        memoryEntries: this.memoryCache.size,
        mongoEntries: 0,
        hitRate: 0,
        totalHits: 0,
        totalMisses: 0
      };
    }
  }

  // Cache frequently accessed data
  async cacheFrequentData(key: string, data: any, ttlMinutes: number = 60): Promise<void> {
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
    
    const cacheEntry = {
      key: `frequent_${key}`,
      results: [data], // Wrap in array for consistency
      filters: { type: 'frequent_data', originalKey: key },
      totalCount: 1,
      executionTime: 0,
      source: 'hybrid' as const,
      tags: ['frequent_data', key],
      expiresAt,
      createdAt: new Date()
    };

    try {
      if (this.collections) {
        await this.collections.cachedSearchResults.replaceOne(
          { key: cacheEntry.key },
          cacheEntry,
          { upsert: true }
        );
      }

      this.memoryCache.set(cacheEntry.key, {
        data: cacheEntry,
        expiresAt
      });
    } catch (error) {
      console.error('Failed to cache frequent data:', error);
    }
  }

  // Get frequently accessed data
  async getFrequentData(key: string): Promise<any | null> {
    const cacheKey = `frequent_${key}`;
    
    try {
      // Check memory cache first
      const memoryResult = this.memoryCache.get(cacheKey);
      if (memoryResult && memoryResult.expiresAt > new Date()) {
        return memoryResult.data.results[0];
      }

      // Check MongoDB cache
      if (this.collections) {
        const mongoResult = await this.collections.cachedSearchResults.findOne({
          key: cacheKey,
          expiresAt: { $gt: new Date() }
        });

        if (mongoResult) {
          this.memoryCache.set(cacheKey, {
            data: mongoResult as CachedSearchResults,
            expiresAt: mongoResult.expiresAt
          });
          
          return mongoResult.results[0];
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to get frequent data:', error);
      return null;
    }
  }

  // Warm up cache with popular data
  async warmupCache(): Promise<void> {
    try {
      console.log('Starting cache warmup...');
      
      // TODO: Implement warmup strategies based on:
      // - Popular search filters
      // - Recently accessed vehicles
      // - User preferences
      
      console.log('Cache warmup completed');
    } catch (error) {
      console.error('Cache warmup failed:', error);
    }
  }

  // Helper methods
  private sortObjectKeys(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sortObjectKeys(item));
    }
    
    const sorted: any = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
      sorted[key] = this.sortObjectKeys(obj[key]);
    }
    return sorted;
  }

  private generateTags(filters: Record<string, any>): string[] {
    const tags: string[] = ['search_results'];
    
    // Add specific tags based on filters
    if (filters.make) tags.push(`make_${filters.make}`);
    if (filters.model) tags.push(`model_${filters.model}`);
    if (filters.priceRange) tags.push('price_filter');
    if (filters.location) tags.push(`location_${filters.location}`);
    if (filters.year) tags.push('year_filter');
    
    return tags;
  }

  private cleanupMemoryCache(): void {
    const now = new Date();
    let cleanedCount = 0;
    
    for (const [key, cached] of this.memoryCache.entries()) {
      if (cached.expiresAt <= now) {
        this.memoryCache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} expired cache entries from memory`);
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; details?: any }> {
    try {
      const stats = await this.getCacheStats();
      
      return {
        status: 'healthy',
        details: {
          memoryCache: {
            entries: stats.memoryEntries,
            status: 'active'
          },
          mongoCache: {
            entries: stats.mongoEntries,
            status: this.collections ? 'active' : 'unavailable'
          }
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
export const hybridCacheService = new HybridCacheService();