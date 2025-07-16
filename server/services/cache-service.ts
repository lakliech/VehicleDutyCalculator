import Redis from 'redis';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  namespace?: string;
}

export class CacheService {
  private static client: Redis.RedisClientType | null = null;
  private static isConnected = false;
  private static readonly DEFAULT_TTL = 3600; // 1 hour
  private static readonly CONNECTION_TIMEOUT = 5000; // 5 seconds

  static async initialize(): Promise<void> {
    try {
      // Try to connect to Redis if available
      this.client = Redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        socket: {
          connectTimeout: this.CONNECTION_TIMEOUT,
          commandTimeout: this.CONNECTION_TIMEOUT,
        },
        retryDelayOnFailover: 100,
        retryDelayOnClusterDown: 100,
        maxRetriesPerRequest: 3,
      });

      this.client.on('error', (err) => {
        console.warn('Redis connection error:', err.message);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('Redis connected successfully');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        console.log('Redis ready for commands');
        this.isConnected = true;
      });

      // Try to connect with timeout
      await Promise.race([
        this.client.connect(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Redis connection timeout')), this.CONNECTION_TIMEOUT)
        )
      ]);

    } catch (error) {
      console.warn('Redis not available, falling back to memory cache:', error);
      this.client = null;
      this.isConnected = false;
    }
  }

  static async get<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
    const fullKey = this.buildKey(key, options.namespace);
    
    try {
      if (this.isConnected && this.client) {
        const value = await this.client.get(fullKey);
        return value ? JSON.parse(value) : null;
      }
      
      // Fallback to memory cache
      return MemoryCache.get<T>(fullKey);
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  static async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    const fullKey = this.buildKey(key, options.namespace);
    const ttl = options.ttl || this.DEFAULT_TTL;
    
    try {
      if (this.isConnected && this.client) {
        await this.client.setEx(fullKey, ttl, JSON.stringify(value));
        return;
      }
      
      // Fallback to memory cache
      MemoryCache.set(fullKey, value, ttl);
    } catch (error) {
      console.warn('Cache set error:', error);
    }
  }

  static async del(key: string, options: CacheOptions = {}): Promise<void> {
    const fullKey = this.buildKey(key, options.namespace);
    
    try {
      if (this.isConnected && this.client) {
        await this.client.del(fullKey);
        return;
      }
      
      // Fallback to memory cache
      MemoryCache.del(fullKey);
    } catch (error) {
      console.warn('Cache delete error:', error);
    }
  }

  static async exists(key: string, options: CacheOptions = {}): Promise<boolean> {
    const fullKey = this.buildKey(key, options.namespace);
    
    try {
      if (this.isConnected && this.client) {
        const result = await this.client.exists(fullKey);
        return result === 1;
      }
      
      // Fallback to memory cache
      return MemoryCache.exists(fullKey);
    } catch (error) {
      console.warn('Cache exists error:', error);
      return false;
    }
  }

  static async invalidatePattern(pattern: string, options: CacheOptions = {}): Promise<void> {
    const fullPattern = this.buildKey(pattern, options.namespace);
    
    try {
      if (this.isConnected && this.client) {
        const keys = await this.client.keys(fullPattern);
        if (keys.length > 0) {
          await this.client.del(keys);
        }
        return;
      }
      
      // Fallback to memory cache
      MemoryCache.invalidatePattern(fullPattern);
    } catch (error) {
      console.warn('Cache invalidatePattern error:', error);
    }
  }

  static async getOrSet<T>(
    key: string, 
    fetcher: () => Promise<T>, 
    options: CacheOptions = {}
  ): Promise<T> {
    const cached = await this.get<T>(key, options);
    
    if (cached !== null) {
      return cached;
    }
    
    const fresh = await fetcher();
    await this.set(key, fresh, options);
    return fresh;
  }

  static async mget<T>(keys: string[], options: CacheOptions = {}): Promise<(T | null)[]> {
    const fullKeys = keys.map(key => this.buildKey(key, options.namespace));
    
    try {
      if (this.isConnected && this.client) {
        const values = await this.client.mGet(fullKeys);
        return values.map(value => value ? JSON.parse(value) : null);
      }
      
      // Fallback to memory cache
      return fullKeys.map(key => MemoryCache.get<T>(key));
    } catch (error) {
      console.warn('Cache mget error:', error);
      return keys.map(() => null);
    }
  }

  static async mset<T>(data: Array<{key: string, value: T}>, options: CacheOptions = {}): Promise<void> {
    const ttl = options.ttl || this.DEFAULT_TTL;
    
    try {
      if (this.isConnected && this.client) {
        const multi = this.client.multi();
        
        for (const item of data) {
          const fullKey = this.buildKey(item.key, options.namespace);
          multi.setEx(fullKey, ttl, JSON.stringify(item.value));
        }
        
        await multi.exec();
        return;
      }
      
      // Fallback to memory cache
      for (const item of data) {
        const fullKey = this.buildKey(item.key, options.namespace);
        MemoryCache.set(fullKey, item.value, ttl);
      }
    } catch (error) {
      console.warn('Cache mset error:', error);
    }
  }

  private static buildKey(key: string, namespace?: string): string {
    const prefix = 'gariyangu';
    const parts = [prefix];
    
    if (namespace) {
      parts.push(namespace);
    }
    
    parts.push(key);
    return parts.join(':');
  }

  static getStats(): { connected: boolean; type: 'redis' | 'memory' } {
    return {
      connected: this.isConnected,
      type: this.isConnected ? 'redis' : 'memory'
    };
  }
}

// Fallback memory cache implementation
class MemoryCache {
  private static cache = new Map<string, { value: any; expiry: number }>();
  private static cleanupInterval: NodeJS.Timeout | null = null;

  static {
    // Start cleanup interval
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Clean up every minute
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  static set<T>(key: string, value: T, ttl: number): void {
    const expiry = Date.now() + (ttl * 1000);
    this.cache.set(key, { value, expiry });
  }

  static del(key: string): void {
    this.cache.delete(key);
  }

  static exists(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  static invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  private static cleanup(): void {
    const now = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  static getSize(): number {
    return this.cache.size;
  }
}

// Cache key builders for common patterns
export const CacheKeys = {
  carListings: (filters?: string) => `car-listings${filters ? `:${filters}` : ''}`,
  carDetails: (id: number) => `car-details:${id}`,
  userListings: (userId: string) => `user-listings:${userId}`,
  searchResults: (query: string) => `search:${query}`,
  vehicleReferences: () => 'vehicle-references',
  carFilters: () => 'car-filters',
  popularSearches: () => 'popular-searches',
  priceTrends: (make?: string, model?: string) => `price-trends${make ? `:${make}` : ''}${model ? `:${model}` : ''}`,
  analytics: (listingId: number, type: string) => `analytics:${listingId}:${type}`,
  userProfile: (userId: string) => `user-profile:${userId}`,
  exchangeRates: () => 'exchange-rates',
  processingFees: () => 'processing-fees',
  transferRates: () => 'transfer-rates',
};