/**
 * Automated Listing Quality Assessment System
 * 
 * This module calculates comprehensive quality scores for vehicle listings
 * and provides actionable improvement recommendations to sellers.
 */

import { db } from './db';
import { carListings, listingQualityScores, marketBenchmarks } from '../shared/schema';
import { eq, and, sql } from 'drizzle-orm';

interface QualityAssessmentResult {
  overallScore: number;
  photoScore: number;
  descriptionScore: number;
  completenessScore: number;
  competitivenessScore: number;
  suggestedImprovements: string[];
  benchmarkComparison: {
    priceVsMarket: 'above' | 'below' | 'competitive';
    priceDeviation: number;
    marketPosition: string;
  };
}

export class ListingQualityAssessment {
  
  /**
   * Calculate comprehensive quality score for a listing
   */
  static async assessListingQuality(listingId: number): Promise<QualityAssessmentResult> {
    // Get listing details
    const listing = await db
      .select()
      .from(carListings)
      .where(eq(carListings.id, listingId))
      .limit(1);

    if (!listing.length) {
      throw new Error('Listing not found');
    }

    const listingData = listing[0];
    const improvements: string[] = [];

    // 1. PHOTO QUALITY ASSESSMENT (0-100)
    const photoScore = this.calculatePhotoScore(listingData, improvements);

    // 2. DESCRIPTION QUALITY ASSESSMENT (0-100)
    const descriptionScore = this.calculateDescriptionScore(listingData, improvements);

    // 3. COMPLETENESS ASSESSMENT (0-100)
    const completenessScore = this.calculateCompletenessScore(listingData, improvements);

    // 4. COMPETITIVE PRICING ASSESSMENT (0-100)
    const { competitivenessScore, benchmarkComparison } = await this.calculateCompetitivenessScore(
      listingData, 
      improvements
    );

    // 5. CALCULATE OVERALL SCORE (weighted average)
    const overallScore = Math.round(
      (photoScore * 0.25) +           // 25% weight on photos
      (descriptionScore * 0.20) +     // 20% weight on description
      (completenessScore * 0.25) +    // 25% weight on completeness
      (competitivenessScore * 0.30)   // 30% weight on competitiveness
    );

    // Store results in database
    await this.storeQualityScore(listingId, {
      overallScore,
      photoScore,
      descriptionScore,
      completenessScore,
      competitivenessScore,
      suggestedImprovements: improvements,
      benchmarkComparison
    });

    return {
      overallScore,
      photoScore,
      descriptionScore,
      completenessScore,
      competitivenessScore,
      suggestedImprovements: improvements,
      benchmarkComparison
    };
  }

  /**
   * Photo Quality Assessment
   * Analyzes number, quality, and variety of photos
   */
  private static calculatePhotoScore(listing: any, improvements: string[]): number {
    let score = 0;
    const photos = listing.photoUrls ? JSON.parse(listing.photoUrls) : [];
    const photoCount = photos.length;

    // Base score from photo count
    if (photoCount === 0) {
      score = 0;
      improvements.push("Add photos of your vehicle - listings with photos get 5x more views");
    } else if (photoCount === 1) {
      score = 30;
      improvements.push("Add more photos (minimum 5 recommended) showing different angles");
    } else if (photoCount < 5) {
      score = 50;
      improvements.push("Add more photos - show exterior, interior, engine bay, and trunk");
    } else if (photoCount < 8) {
      score = 75;
      improvements.push("Consider adding interior detail shots and dashboard view");
    } else {
      score = 90;
    }

    // Quality indicators based on listing data
    if (listing.description?.toLowerCase().includes('high quality photos')) {
      score += 5;
    }
    
    // Photo variety bonus (if description mentions different angles)
    const desc = listing.description?.toLowerCase() || '';
    if (desc.includes('interior') && desc.includes('exterior')) {
      score += 5;
    }

    return Math.min(score, 100);
  }

  /**
   * Description Quality Assessment
   * Analyzes description completeness, keywords, and detail level
   */
  private static calculateDescriptionScore(listing: any, improvements: string[]): number {
    let score = 0;
    const description = listing.description || '';
    const wordCount = description.split(' ').length;

    // Base score from description length
    if (wordCount === 0) {
      score = 0;
      improvements.push("Add a detailed description highlighting key features and condition");
    } else if (wordCount < 20) {
      score = 25;
      improvements.push("Expand your description with more details about features and condition");
    } else if (wordCount < 50) {
      score = 50;
      improvements.push("Add more details about maintenance history and unique features");
    } else if (wordCount < 100) {
      score = 75;
    } else {
      score = 85;
    }

    // Quality keywords analysis
    const qualityKeywords = [
      'maintained', 'service', 'condition', 'mileage', 'features',
      'automatic', 'manual', 'fuel efficient', 'well maintained',
      'single owner', 'accident free', 'original paint'
    ];

    const descLower = description.toLowerCase();
    const keywordMatches = qualityKeywords.filter(keyword => 
      descLower.includes(keyword)
    ).length;

    // Bonus points for quality keywords
    score += Math.min(keywordMatches * 2, 15);

    // Maintenance history mention
    if (descLower.includes('service') || descLower.includes('maintenance')) {
      score += 5;
    } else {
      improvements.push("Mention maintenance history and service records");
    }

    // Contact information completeness
    if (!descLower.includes('call') && !descLower.includes('contact')) {
      improvements.push("Include clear contact instructions in description");
    }

    return Math.min(score, 100);
  }

  /**
   * Completeness Assessment
   * Checks if all important fields are filled
   */
  private static calculateCompletenessScore(listing: any, improvements: string[]): number {
    let score = 0;
    let totalFields = 0;
    let filledFields = 0;

    // Essential fields with their importance weights
    const essentialFields = [
      { field: 'title', weight: 15, name: 'Title' },
      { field: 'description', weight: 20, name: 'Description' },
      { field: 'price', weight: 15, name: 'Price' },
      { field: 'mileage', weight: 10, name: 'Mileage' },
      { field: 'fuelType', weight: 8, name: 'Fuel Type' },
      { field: 'transmission', weight: 8, name: 'Transmission' },
      { field: 'bodyType', weight: 8, name: 'Body Type' },
      { field: 'exteriorColor', weight: 6, name: 'Exterior Color' },
      { field: 'interiorColor', weight: 5, name: 'Interior Color' },
      { field: 'location', weight: 5, name: 'Location' }
    ];

    essentialFields.forEach(({ field, weight, name }) => {
      totalFields += weight;
      if (listing[field] && listing[field].toString().trim() !== '') {
        filledFields += weight;
      } else {
        improvements.push(`Add ${name} information`);
      }
    });

    score = Math.round((filledFields / totalFields) * 100);

    // Photo completeness
    const photos = listing.photoUrls ? JSON.parse(listing.photoUrls) : [];
    if (photos.length === 0) {
      score -= 20;
    }

    return Math.max(score, 0);
  }

  /**
   * Competitive Pricing Assessment
   * Compares listing price against market benchmarks
   */
  private static async calculateCompetitivenessScore(
    listing: any, 
    improvements: string[]
  ): Promise<{ competitivenessScore: number; benchmarkComparison: any }> {
    let score = 50; // Default neutral score

    try {
      // Get market benchmark for similar vehicles
      const marketData = await db.execute(sql`
        SELECT 
          AVG(price) as average_price,
          MIN(price) as min_price,
          MAX(price) as max_price,
          COUNT(*) as listing_count
        FROM car_listings 
        WHERE make = ${listing.make}
          AND model = ${listing.model}
          AND year BETWEEN ${listing.year - 2} AND ${listing.year + 2}
          AND status = 'active'
          AND id != ${listing.id}
      `);

      if (marketData.rows[0]?.listing_count > 0) {
        const avgPrice = parseFloat(marketData.rows[0].average_price);
        const minPrice = parseFloat(marketData.rows[0].min_price);
        const maxPrice = parseFloat(marketData.rows[0].max_price);
        const listingPrice = parseFloat(listing.price);

        // Calculate price deviation from market average
        const priceDeviation = ((listingPrice - avgPrice) / avgPrice) * 100;
        
        let pricePosition: 'above' | 'below' | 'competitive';
        let marketPosition: string;

        // Score based on competitive positioning
        if (Math.abs(priceDeviation) <= 10) {
          // Within 10% of market average - excellent
          score = 90;
          pricePosition = 'competitive';
          marketPosition = 'Competitively priced within market range';
        } else if (priceDeviation > 10 && priceDeviation <= 25) {
          // 10-25% above market - good but room for improvement
          score = 70;
          pricePosition = 'above';
          marketPosition = 'Priced above market average';
          improvements.push(`Consider reducing price by ${Math.round(priceDeviation - 10)}% to be more competitive`);
        } else if (priceDeviation > 25) {
          // More than 25% above market - needs attention
          score = 40;
          pricePosition = 'above';
          marketPosition = 'Significantly above market price';
          improvements.push(`Price is ${Math.round(priceDeviation)}% above market - consider significant price reduction`);
        } else if (priceDeviation < -10 && priceDeviation >= -25) {
          // 10-25% below market - good value
          score = 85;
          pricePosition = 'below';
          marketPosition = 'Great value pricing';
        } else if (priceDeviation < -25) {
          // More than 25% below - might be too low
          score = 60;
          pricePosition = 'below';
          marketPosition = 'Priced significantly below market';
          improvements.push('Consider if price reflects true vehicle value - you might be underpricing');
        }

        return {
          competitivenessScore: score,
          benchmarkComparison: {
            priceVsMarket: pricePosition,
            priceDeviation: Math.round(priceDeviation),
            marketPosition
          }
        };
      }
    } catch (error) {
      console.error('Error calculating competitiveness score:', error);
    }

    // Fallback if no market data available
    improvements.push('Unable to analyze market pricing - ensure your price is competitive');
    
    return {
      competitivenessScore: score,
      benchmarkComparison: {
        priceVsMarket: 'competitive' as const,
        priceDeviation: 0,
        marketPosition: 'Market data not available'
      }
    };
  }

  /**
   * Store quality assessment results in database
   */
  private static async storeQualityScore(
    listingId: number, 
    assessment: QualityAssessmentResult
  ): Promise<void> {
    try {
      await db
        .insert(listingQualityScores)
        .values({
          listingId,
          overallScore: assessment.overallScore,
          photoScore: assessment.photoScore,
          descriptionScore: assessment.descriptionScore,
          completenessScore: assessment.completenessScore,
          competitivenessScore: assessment.competitivenessScore,
          suggestedImprovements: JSON.stringify(assessment.suggestedImprovements),
          benchmarkComparison: JSON.stringify(assessment.benchmarkComparison),
          lastCalculated: new Date()
        })
        .onConflictDoUpdate({
          target: [listingQualityScores.listingId],
          set: {
            overallScore: assessment.overallScore,
            photoScore: assessment.photoScore,
            descriptionScore: assessment.descriptionScore,
            completenessScore: assessment.completenessScore,
            competitivenessScore: assessment.competitivenessScore,
            suggestedImprovements: JSON.stringify(assessment.suggestedImprovements),
            benchmarkComparison: JSON.stringify(assessment.benchmarkComparison),
            lastCalculated: new Date()
          }
        });
    } catch (error) {
      console.error('Error storing quality score:', error);
    }
  }

  /**
   * Get quality assessment for a listing
   */
  static async getQualityAssessment(listingId: number): Promise<QualityAssessmentResult | null> {
    try {
      const result = await db
        .select()
        .from(listingQualityScores)
        .where(eq(listingQualityScores.listingId, listingId))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      const data = result[0];
      return {
        overallScore: data.overallScore,
        photoScore: data.photoScore,
        descriptionScore: data.descriptionScore,
        completenessScore: data.completenessScore,
        competitivenessScore: data.competitivenessScore,
        suggestedImprovements: JSON.parse(data.suggestedImprovements as string),
        benchmarkComparison: JSON.parse(data.benchmarkComparison as string)
      };
    } catch (error) {
      console.error('Error getting quality assessment:', error);
      return null;
    }
  }

  /**
   * Run quality assessment for all active listings (batch processing)
   */
  static async runBatchQualityAssessment(): Promise<void> {
    try {
      const activeListings = await db
        .select({ id: carListings.id })
        .from(carListings)
        .where(eq(carListings.status, 'active'));

      console.log(`Running quality assessment for ${activeListings.length} listings...`);

      for (const listing of activeListings) {
        try {
          await this.assessListingQuality(listing.id);
          console.log(`✓ Assessed listing ${listing.id}`);
        } catch (error) {
          console.error(`✗ Failed to assess listing ${listing.id}:`, error);
        }
      }

      console.log('Batch quality assessment completed');
    } catch (error) {
      console.error('Error in batch quality assessment:', error);
    }
  }
}

/**
 * Automated triggers for quality assessment
 */

// Trigger quality assessment when listing is created or updated
export async function triggerQualityAssessment(listingId: number): Promise<void> {
  try {
    await ListingQualityAssessment.assessListingQuality(listingId);
  } catch (error) {
    console.error(`Failed to trigger quality assessment for listing ${listingId}:`, error);
  }
}

// Export for use in API routes
export default ListingQualityAssessment;