import { db } from "./db";
import { marketplaceListings, vehicleReferences, priceIndicators } from "@shared/schema";
import { eq, and, gte, lte, sql, desc } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface PriceConfidenceData {
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    engineSize: number;
    mileage?: number;
    condition?: string;
  };
  priceAnalysis: {
    predictedPrice: number;
    confidenceScore: number; // 0-100
    confidenceLevel: "very_low" | "low" | "moderate" | "high" | "very_high";
    priceRange: {
      min: number;
      max: number;
    };
  };
  marketFactors: {
    sampleSize: number;
    marketActivity: "very_low" | "low" | "moderate" | "high" | "very_high";
    priceVolatility: number; // 0-100
    demandLevel: number; // 0-100
    supplyLevel: number; // 0-100;
  };
  confidenceFactors: {
    dataAvailability: number; // 0-100
    marketStability: number; // 0-100
    vehiclePopularity: number; // 0-100
    ageDepreciation: number; // 0-100
    conditionFactor: number; // 0-100
  };
  aiInsights: {
    marketTrend: string;
    priceJustification: string;
    riskFactors: string[];
    opportunities: string[];
    confidence_reasoning: string;
  };
  lastUpdated: Date;
}

export class PriceConfidenceEngine {
  // Calculate confidence score for a vehicle's predicted price
  async calculatePriceConfidence(
    make: string,
    model: string,
    year: number,
    engineSize: number,
    proposedPrice?: number,
    mileage?: number,
    condition?: string
  ): Promise<PriceConfidenceData> {
    
    // Get market data for similar vehicles
    const marketData = await this.getMarketData(make, model, year, engineSize);
    
    // Calculate base prediction using market data
    const basePrediction = await this.calculateBasePrediction(marketData, year, mileage, condition);
    
    // Calculate confidence factors
    const confidenceFactors = await this.calculateConfidenceFactors(
      marketData, 
      make, 
      model, 
      year, 
      engineSize,
      condition
    );
    
    // Calculate overall confidence score
    const confidenceScore = this.calculateOverallConfidence(confidenceFactors);
    
    // Get AI insights for the prediction
    const aiInsights = await this.getAIInsights({
      make,
      model,
      year,
      engineSize,
      proposedPrice,
      marketData,
      confidenceFactors,
      basePrediction
    });

    return {
      vehicleInfo: {
        make,
        model,
        year,
        engineSize,
        mileage,
        condition
      },
      priceAnalysis: {
        predictedPrice: basePrediction.predictedPrice,
        confidenceScore,
        confidenceLevel: this.getConfidenceLevel(confidenceScore),
        priceRange: basePrediction.priceRange
      },
      marketFactors: {
        sampleSize: marketData.listings.length,
        marketActivity: this.assessMarketActivity(marketData.listings.length),
        priceVolatility: this.calculatePriceVolatility(marketData.prices),
        demandLevel: this.assessDemandLevel(marketData),
        supplyLevel: this.assessSupplyLevel(marketData)
      },
      confidenceFactors,
      aiInsights,
      lastUpdated: new Date()
    };
  }

  private async getMarketData(make: string, model: string, year: number, engineSize: number) {
    // Get listings for the same make/model
    const exactMatches = await db
      .select()
      .from(marketplaceListings)
      .where(
        and(
          eq(marketplaceListings.make, make),
          eq(marketplaceListings.model, model),
          gte(marketplaceListings.year, year - 2),
          lte(marketplaceListings.year, year + 2),
          eq(marketplaceListings.status, "approved")
        )
      )
      .orderBy(desc(marketplaceListings.createdAt))
      .limit(50);

    // Get similar vehicles if not enough exact matches
    let similarVehicles = [];
    if (exactMatches.length < 10) {
      similarVehicles = await db
        .select()
        .from(marketplaceListings)
        .where(
          and(
            eq(marketplaceListings.make, make),
            gte(marketplaceListings.year, year - 3),
            lte(marketplaceListings.year, year + 1),
            gte(marketplaceListings.engineSize, engineSize - 300),
            lte(marketplaceListings.engineSize, engineSize + 300),
            eq(marketplaceListings.status, "approved")
          )
        )
        .orderBy(desc(marketplaceListings.createdAt))
        .limit(30);
    }

    const allListings = [...exactMatches, ...similarVehicles];
    const prices = allListings.map(listing => listing.price);

    return {
      listings: allListings,
      prices,
      exactMatches: exactMatches.length,
      similarMatches: similarVehicles.length
    };
  }

  private async calculateBasePrediction(
    marketData: any,
    year: number,
    mileage?: number,
    condition?: string
  ) {
    if (marketData.prices.length === 0) {
      // Fallback to CRSP-based estimation
      return this.getCRSPBasedPrediction(year, mileage, condition);
    }

    // Calculate weighted average based on recency and similarity
    const sortedPrices = marketData.prices.sort((a: number, b: number) => a - b);
    const median = sortedPrices[Math.floor(sortedPrices.length / 2)];
    const mean = sortedPrices.reduce((a: number, b: number) => a + b, 0) / sortedPrices.length;
    
    // Apply depreciation and condition adjustments
    let adjustedPrice = (median + mean) / 2;
    
    // Age depreciation (approximate 15% per year for vehicles over 3 years)
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - year;
    if (vehicleAge > 3) {
      const depreciationFactor = Math.pow(0.85, vehicleAge - 3);
      adjustedPrice *= depreciationFactor;
    }

    // Mileage adjustment (rough estimate)
    if (mileage) {
      const averageMileagePerYear = 15000;
      const expectedMileage = vehicleAge * averageMileagePerYear;
      const mileageRatio = mileage / expectedMileage;
      
      if (mileageRatio > 1.2) {
        adjustedPrice *= 0.9; // High mileage penalty
      } else if (mileageRatio < 0.8) {
        adjustedPrice *= 1.05; // Low mileage bonus
      }
    }

    // Condition adjustment
    const conditionMultipliers = {
      "brand_new": 1.15,
      "foreign_used": 1.0,
      "locally_used": 0.95,
      "accident_free": 0.9,
      "needs_work": 0.75
    };
    
    if (condition && conditionMultipliers[condition as keyof typeof conditionMultipliers]) {
      adjustedPrice *= conditionMultipliers[condition as keyof typeof conditionMultipliers];
    }

    // Calculate price range (±20% of predicted price)
    const priceRange = {
      min: Math.round(adjustedPrice * 0.8),
      max: Math.round(adjustedPrice * 1.2)
    };

    return {
      predictedPrice: Math.round(adjustedPrice),
      priceRange
    };
  }

  private async getCRSPBasedPrediction(year: number, mileage?: number, condition?: string) {
    // Fallback when no market data available - use CRSP with heavy depreciation
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - year;
    
    // Assume average CRSP value for missing vehicles
    const estimatedCRSP = 3000000; // 3M KES average
    const depreciationFactor = Math.pow(0.85, vehicleAge);
    
    let predictedPrice = estimatedCRSP * depreciationFactor;
    
    // Apply same adjustments as market-based prediction
    if (mileage) {
      const averageMileagePerYear = 15000;
      const expectedMileage = vehicleAge * averageMileagePerYear;
      const mileageRatio = mileage / expectedMileage;
      
      if (mileageRatio > 1.2) {
        predictedPrice *= 0.9;
      } else if (mileageRatio < 0.8) {
        predictedPrice *= 1.05;
      }
    }

    const conditionMultipliers = {
      "brand_new": 1.15,
      "foreign_used": 1.0,
      "locally_used": 0.95,
      "accident_free": 0.9,
      "needs_work": 0.75
    };
    
    if (condition && conditionMultipliers[condition as keyof typeof conditionMultipliers]) {
      predictedPrice *= conditionMultipliers[condition as keyof typeof conditionMultipliers];
    }

    return {
      predictedPrice: Math.round(predictedPrice),
      priceRange: {
        min: Math.round(predictedPrice * 0.7),
        max: Math.round(predictedPrice * 1.3)
      }
    };
  }

  private async calculateConfidenceFactors(
    marketData: any,
    make: string,
    model: string,
    year: number,
    engineSize: number,
    condition?: string
  ) {
    // Data availability score (0-100)
    const dataAvailability = Math.min(100, (marketData.listings.length / 20) * 100);
    
    // Market stability (based on price variance)
    const priceVariance = this.calculatePriceVolatility(marketData.prices);
    const marketStability = Math.max(0, 100 - priceVariance);
    
    // Vehicle popularity (based on total listings for this make/model)
    const popularityCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(marketplaceListings)
      .where(
        and(
          eq(marketplaceListings.make, make),
          eq(marketplaceListings.model, model)
        )
      );
    
    const vehiclePopularity = Math.min(100, (popularityCount[0]?.count || 0) * 2);
    
    // Age depreciation factor (newer cars have more predictable depreciation)
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - year;
    const ageDepreciation = Math.max(20, 100 - (vehicleAge * 8));
    
    // Condition factor
    const conditionScores = {
      "brand_new": 100,
      "foreign_used": 85,
      "locally_used": 70,
      "accident_free": 60,
      "needs_work": 40
    };
    
    const conditionFactor = condition ? 
      (conditionScores[condition as keyof typeof conditionScores] || 50) : 50;

    return {
      dataAvailability,
      marketStability,
      vehiclePopularity,
      ageDepreciation,
      conditionFactor
    };
  }

  private calculateOverallConfidence(factors: any): number {
    // Weighted average of all confidence factors
    const weights = {
      dataAvailability: 0.3,
      marketStability: 0.25,
      vehiclePopularity: 0.2,
      ageDepreciation: 0.15,
      conditionFactor: 0.1
    };

    const weightedScore = 
      factors.dataAvailability * weights.dataAvailability +
      factors.marketStability * weights.marketStability +
      factors.vehiclePopularity * weights.vehiclePopularity +
      factors.ageDepreciation * weights.ageDepreciation +
      factors.conditionFactor * weights.conditionFactor;

    return Math.round(weightedScore);
  }

  private getConfidenceLevel(score: number): "very_low" | "low" | "moderate" | "high" | "very_high" {
    if (score >= 90) return "very_high";
    if (score >= 75) return "high";
    if (score >= 60) return "moderate";
    if (score >= 40) return "low";
    return "very_low";
  }

  private calculatePriceVolatility(prices: number[]): number {
    if (prices.length < 2) return 50;
    
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    
    // Convert to percentage volatility
    const volatility = (stdDev / mean) * 100;
    return Math.min(100, volatility);
  }

  private assessMarketActivity(sampleSize: number): "very_low" | "low" | "moderate" | "high" | "very_high" {
    if (sampleSize >= 30) return "very_high";
    if (sampleSize >= 20) return "high";
    if (sampleSize >= 10) return "moderate";
    if (sampleSize >= 5) return "low";
    return "very_low";
  }

  private assessDemandLevel(marketData: any): number {
    // Simple heuristic based on listing frequency and price trends
    const recentListings = marketData.listings.filter((listing: any) => {
      const listingDate = new Date(listing.createdAt);
      const monthsAgo = new Date();
      monthsAgo.setMonth(monthsAgo.getMonth() - 3);
      return listingDate > monthsAgo;
    });

    return Math.min(100, (recentListings.length / marketData.listings.length) * 100);
  }

  private assessSupplyLevel(marketData: any): number {
    // Based on total available listings
    return Math.min(100, marketData.listings.length * 3);
  }

  private async getAIInsights(data: any): Promise<any> {
    if (!process.env.OPENAI_API_KEY) {
      return this.getFallbackInsights(data);
    }

    try {
      const prompt = `Analyze this vehicle pricing data and provide market insights:

Vehicle: ${data.make} ${data.model} ${data.year}
Engine: ${data.engineSize}cc
Proposed Price: ${data.proposedPrice ? `KES ${data.proposedPrice.toLocaleString()}` : 'Not specified'}
Predicted Price: KES ${data.basePrediction.predictedPrice.toLocaleString()}
Market Sample: ${data.marketData.listings.length} similar vehicles
Confidence Factors: ${JSON.stringify(data.confidenceFactors, null, 2)}

Provide a JSON response with:
{
  "marketTrend": "Brief market trend analysis",
  "priceJustification": "Why this price prediction makes sense",
  "riskFactors": ["Array of potential risks"],
  "opportunities": ["Array of opportunities"],
  "confidence_reasoning": "Why this confidence level is appropriate"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are a Kenyan automotive market expert. Provide insights about vehicle pricing in the Kenyan market. Respond with valid JSON only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      return JSON.parse(response.choices[0].message.content || "{}");
    } catch (error) {
      console.error("Failed to get AI insights:", error);
      return this.getFallbackInsights(data);
    }
  }

  private getFallbackInsights(data: any): any {
    const confidence = this.calculateOverallConfidence(data.confidenceFactors);
    
    return {
      marketTrend: `Based on ${data.marketData.listings.length} similar vehicles, the ${data.make} ${data.model} shows ${confidence > 70 ? 'stable' : 'variable'} pricing patterns in the Kenyan market.`,
      priceJustification: `Price prediction is based on market analysis of similar vehicles, age depreciation, and condition factors. ${confidence > 60 ? 'Strong' : 'Limited'} data availability supports this estimate.`,
      riskFactors: [
        confidence < 50 ? "Limited market data available" : null,
        data.confidenceFactors.marketStability < 60 ? "High price volatility in market" : null,
        data.year < 2015 ? "Older vehicle with higher depreciation risk" : null
      ].filter(Boolean),
      opportunities: [
        confidence > 75 ? "Strong market data supports accurate pricing" : null,
        data.confidenceFactors.vehiclePopularity > 70 ? "Popular model with good resale value" : null,
        data.marketData.listings.length > 20 ? "Active market with good liquidity" : null
      ].filter(Boolean),
      confidence_reasoning: `Confidence level reflects ${confidence > 70 ? 'strong' : confidence > 50 ? 'moderate' : 'limited'} market data availability and ${data.confidenceFactors.marketStability > 60 ? 'stable' : 'volatile'} pricing patterns.`
    };
  }
}

export const priceConfidenceEngine = new PriceConfidenceEngine();