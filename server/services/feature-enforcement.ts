import { db } from '../db';
import { productFeatures, userProductSubscriptions, products } from '../../shared/product-catalog-schema';
import { eq, and } from 'drizzle-orm';

export class FeatureEnforcementService {
  // Get user's subscription features
  async getUserFeatures(userId: string): Promise<{
    features: any[];
    limits: Record<string, { type: string; value: number | null; duration: number | null }>;
  }> {
    try {
      // Get user's active subscriptions
      const subscriptions = await db
        .select({
          product: products,
          feature: productFeatures
        })
        .from(userProductSubscriptions)
        .innerJoin(products, eq(userProductSubscriptions.productId, products.id))
        .innerJoin(productFeatures, eq(productFeatures.productId, products.id))
        .where(
          and(
            eq(userProductSubscriptions.userId, userId),
            eq(userProductSubscriptions.isActive, true),
            eq(productFeatures.isIncluded, true)
          )
        );

      // Process features into limits object
      const limits: Record<string, { type: string; value: number | null; duration: number | null }> = {};
      
      subscriptions.forEach(sub => {
        const featureName = sub.feature.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        // Take the highest limit for each feature if user has multiple subscriptions
        if (!limits[featureName] || 
            (sub.feature.limitType === 'unlimited') ||
            (sub.feature.limitType === 'count' && (limits[featureName].value || 0) < (sub.feature.limitValue || 0))) {
          limits[featureName] = {
            type: sub.feature.limitType,
            value: sub.feature.limitValue,
            duration: sub.feature.limitDuration
          };
        }
      });

      return {
        features: subscriptions.map(s => s.feature),
        limits
      };
    } catch (error) {
      console.error('Error getting user features:', error);
      return { features: [], limits: {} };
    }
  }

  // Enhanced constraint checking for different types
  async checkConstraint(userId: string, featureName: string, currentValue: number = 0, additionalParams: Record<string, any> = {}): Promise<{
    allowed: boolean;
    limit: number | null;
    message?: string;
    constraintType: string;
  }> {
    const { limits } = await this.getUserFeatures(userId);
    
    const normalizedFeatureName = featureName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const feature = limits[normalizedFeatureName];
    
    if (!feature) {
      return { allowed: false, limit: 0, message: 'Feature not available', constraintType: 'none' };
    }
    
    switch (feature.type) {
      case 'unlimited':
        return { allowed: true, limit: -1, constraintType: 'unlimited' };
      
      case 'count':
        const countLimit = feature.value || 0;
        return {
          allowed: currentValue < countLimit,
          limit: countLimit,
          message: currentValue >= countLimit ? `Maximum ${countLimit} items allowed` : undefined,
          constraintType: 'count'
        };
      
      case 'duration':
        const durationDays = feature.duration || 0;
        return {
          allowed: true,
          limit: durationDays,
          message: `Available for ${durationDays} days`,
          constraintType: 'duration'
        };
      
      case 'size':
        const sizeLimit = feature.value || 0; // Size in MB
        const currentSize = additionalParams.currentSize || 0;
        return {
          allowed: currentSize <= sizeLimit,
          limit: sizeLimit,
          message: currentSize > sizeLimit ? `Maximum ${sizeLimit}MB allowed` : undefined,
          constraintType: 'size'
        };
      
      case 'frequency':
        const frequencyLimit = feature.value || 0;
        const period = feature.duration || 24; // hours
        const currentFrequency = additionalParams.currentFrequency || 0;
        return {
          allowed: currentFrequency < frequencyLimit,
          limit: frequencyLimit,
          message: currentFrequency >= frequencyLimit ? `Maximum ${frequencyLimit} times per ${period} hours` : undefined,
          constraintType: 'frequency'
        };
      
      case 'concurrent':
        const concurrentLimit = feature.value || 0;
        const currentConcurrent = additionalParams.currentConcurrent || 0;
        return {
          allowed: currentConcurrent < concurrentLimit,
          limit: concurrentLimit,
          message: currentConcurrent >= concurrentLimit ? `Maximum ${concurrentLimit} concurrent items` : undefined,
          constraintType: 'concurrent'
        };
      
      case 'boolean':
        return {
          allowed: true,
          limit: 1,
          message: 'Feature available',
          constraintType: 'boolean'
        };
      
      default:
        return { allowed: false, limit: 0, message: 'Unknown constraint type', constraintType: 'unknown' };
    }
  }

  // Check if user can upload photos based on their subscription
  async checkPhotoUploadLimit(userId: string, currentPhotoCount: number): Promise<{
    allowed: boolean;
    limit: number;
    message?: string;
  }> {
    const result = await this.checkConstraint(userId, 'photos', currentPhotoCount);
    
    return {
      allowed: result.allowed,
      limit: result.limit || 1,
      message: result.message
    };
  }

  // Check listing creation limit
  async checkListingCreationLimit(userId: string, currentListingCount: number): Promise<{
    allowed: boolean;
    limit: number;
    message?: string;
  }> {
    const result = await this.checkConstraint(userId, 'listings', currentListingCount);
    
    return {
      allowed: result.allowed,
      limit: result.limit || 1,
      message: result.message
    };
  }

  // Check listing duration limit
  async checkListingDurationLimit(userId: string): Promise<{
    allowed: boolean;
    duration: number;
    message?: string;
  }> {
    const result = await this.checkConstraint(userId, 'listing_duration');
    
    return {
      allowed: result.allowed,
      duration: result.limit || 7, // Default 7 days
      message: result.message
    };
  }

  // Check boost limit
  async checkBoostLimit(userId: string, currentBoostCount: number): Promise<{
    allowed: boolean;
    limit: number;
    message?: string;
  }> {
    const result = await this.checkConstraint(userId, 'boosts', currentBoostCount);
    
    return {
      allowed: result.allowed,
      limit: result.limit || 0,
      message: result.message
    };
  }

  // Check premium feature access
  async checkPremiumFeatureAccess(userId: string, featureName: string): Promise<{
    allowed: boolean;
    message?: string;
  }> {
    const result = await this.checkConstraint(userId, featureName);
    
    return {
      allowed: result.allowed,
      message: result.message
    };
  }

  // Get comprehensive user feature summary
  async getUserFeatureSummary(userId: string): Promise<{
    features: any[];
    limits: Record<string, any>;
    summary: {
      totalFeatures: number;
      activeFeatures: number;
      constraintTypes: string[];
    };
  }> {
    const { features, limits } = await this.getUserFeatures(userId);
    
    const constraintTypes = Object.values(limits).map((limit: any) => limit.type);
    const uniqueConstraintTypes = [...new Set(constraintTypes)];
    
    return {
      features,
      limits,
      summary: {
        totalFeatures: features.length,
        activeFeatures: Object.keys(limits).length,
        constraintTypes: uniqueConstraintTypes
      }
    };
  }

  // Legacy method for backward compatibility
  async checkPhotoUploadLimitLegacy(userId: string, currentPhotoCount: number): Promise<{
    allowed: boolean;
    limit: number;
    message?: string;
  }> {
    const { limits } = await this.getUserFeatures(userId);
    
    // Check for photo-related features
    const photoFeatures = ['photos', 'photo_upload', 'listing_photos', 'images'];
    let photoLimit = 1; // Default limit
    
    for (const featureName of photoFeatures) {
      if (limits[featureName]) {
        const feature = limits[featureName];
        if (feature.type === 'unlimited') {
          return { allowed: true, limit: -1 };
        }
        if (feature.type === 'count' && feature.value) {
          photoLimit = Math.max(photoLimit, feature.value);
        }
      }
    }
    
    const allowed = currentPhotoCount < photoLimit;
    
    return {
      allowed,
      limit: photoLimit,
      message: allowed ? undefined : `You have reached your photo upload limit of ${photoLimit} photos. Upgrade your plan to upload more photos.`
    };
  }

  // Check listing duration limit
  async checkListingDurationLimit(userId: string): Promise<{
    allowed: boolean;
    duration: number;
    message?: string;
  }> {
    const { limits } = await this.getUserFeatures(userId);
    
    // Check for duration-related features
    const durationFeatures = ['listing_duration', 'duration', 'active_days', 'listing_period'];
    let maxDuration = 7; // Default 7 days
    
    for (const featureName of durationFeatures) {
      if (limits[featureName]) {
        const feature = limits[featureName];
        if (feature.type === 'unlimited') {
          return { allowed: true, duration: -1 };
        }
        if (feature.type === 'duration' && feature.duration) {
          maxDuration = Math.max(maxDuration, feature.duration);
        }
      }
    }
    
    return {
      allowed: true,
      duration: maxDuration,
      message: `Your listing will be active for ${maxDuration} days based on your subscription plan.`
    };
  }

  // Check if user can create new listings
  async checkListingCreationLimit(userId: string, currentListingCount: number): Promise<{
    allowed: boolean;
    limit: number;
    message?: string;
  }> {
    const { limits } = await this.getUserFeatures(userId);
    
    // Check for listing-related features
    const listingFeatures = ['listings', 'active_listings', 'max_listings', 'listing_slots'];
    let listingLimit = 1; // Default limit
    
    for (const featureName of listingFeatures) {
      if (limits[featureName]) {
        const feature = limits[featureName];
        if (feature.type === 'unlimited') {
          return { allowed: true, limit: -1 };
        }
        if (feature.type === 'count' && feature.value) {
          listingLimit = Math.max(listingLimit, feature.value);
        }
      }
    }
    
    const allowed = currentListingCount < listingLimit;
    
    return {
      allowed,
      limit: listingLimit,
      message: allowed ? undefined : `You have reached your listing limit of ${listingLimit} active listings. Upgrade your plan to create more listings.`
    };
  }

  // Check if user can access premium features
  async checkPremiumFeatureAccess(userId: string, featureName: string): Promise<{
    allowed: boolean;
    message?: string;
  }> {
    const { limits } = await this.getUserFeatures(userId);
    
    const normalizedFeatureName = featureName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    if (limits[normalizedFeatureName]) {
      return { allowed: true };
    }
    
    return {
      allowed: false,
      message: `This feature requires a premium subscription. Please upgrade your plan to access ${featureName}.`
    };
  }

  // Check boost/promotion limits
  async checkBoostLimit(userId: string, currentBoostCount: number): Promise<{
    allowed: boolean;
    limit: number;
    message?: string;
  }> {
    const { limits } = await this.getUserFeatures(userId);
    
    // Check for boost-related features
    const boostFeatures = ['boost', 'promotion', 'featured_listings', 'highlights'];
    let boostLimit = 0; // Default no boosts
    
    for (const featureName of boostFeatures) {
      if (limits[featureName]) {
        const feature = limits[featureName];
        if (feature.type === 'unlimited') {
          return { allowed: true, limit: -1 };
        }
        if (feature.type === 'count' && feature.value) {
          boostLimit = Math.max(boostLimit, feature.value);
        }
      }
    }
    
    const allowed = currentBoostCount < boostLimit;
    
    return {
      allowed,
      limit: boostLimit,
      message: allowed ? undefined : `You have reached your boost limit of ${boostLimit} boosts. Upgrade your plan to boost more listings.`
    };
  }

  // Get user's feature summary for display
  async getUserFeatureSummary(userId: string): Promise<{
    plan: string;
    features: {
      name: string;
      limit: string;
      description: string;
    }[];
  }> {
    const { features, limits } = await this.getUserFeatures(userId);
    
    const featureSummary = Object.entries(limits).map(([name, limit]) => ({
      name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      limit: limit.type === 'unlimited' ? 'Unlimited' : 
             limit.type === 'count' ? `${limit.value} items` :
             limit.type === 'duration' ? `${limit.duration} days` : 'N/A',
      description: this.getFeatureDescription(name)
    }));
    
    return {
      plan: features.length > 0 ? 'Premium' : 'Basic',
      features: featureSummary
    };
  }

  private getFeatureDescription(featureName: string): string {
    const descriptions: Record<string, string> = {
      'photos': 'Number of photos you can upload per listing',
      'listing_duration': 'How long your listings stay active',
      'listings': 'Number of active listings you can have',
      'boost': 'Number of listings you can boost for better visibility',
      'analytics': 'Access to detailed listing analytics',
      'priority_support': 'Priority customer support access',
      'video_upload': 'Ability to upload videos with your listings',
      'auto_renewal': 'Automatic listing renewal feature'
    };
    
    return descriptions[featureName] || 'Premium feature access';
  }
}

export const featureEnforcement = new FeatureEnforcementService();