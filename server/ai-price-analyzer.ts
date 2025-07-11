import OpenAI from "openai";
import { db } from "./db";
import { vehicleReferences, carListings } from "@shared/schema";
import { eq, and, gte, lte, sql } from "drizzle-orm";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface PriceTrendAnalysis {
  vehicleInfo: {
    make: string;
    model: string;
    engineSize: number;
    averagePrice: number;
    priceRange: { min: number; max: number };
    totalListings: number;
  };
  marketInsights: {
    trendDirection: "upward" | "downward" | "stable";
    confidence: number;
    keyFactors: string[];
    recommendation: string;
  };
  priceHistory: Array<{
    year: number;
    averagePrice: number;
    listingCount: number;
    depreciation: number;
  }>;
  aiAnalysis: {
    summary: string;
    marketPosition: string;
    buyingAdvice: string;
    sellingAdvice: string;
    futureOutlook: string;
  };
}

export class AIPriceAnalyzer {
  async analyzePriceTrends(
    make: string,
    model: string,
    engineSize?: number
  ): Promise<PriceTrendAnalysis> {
    // Get vehicle reference data
    const vehicleQuery = db
      .select()
      .from(vehicleReferences)
      .where(
        and(
          eq(vehicleReferences.make, make),
          eq(vehicleReferences.model, model),
          engineSize ? eq(vehicleReferences.engineCapacity, engineSize) : undefined
        )
      );

    const vehicleData = await vehicleQuery;
    
    if (vehicleData.length === 0) {
      throw new Error(`No data found for ${make} ${model}`);
    }

    // Get current market listings for similar vehicles
    const listingsQuery = db
      .select({
        price: carListings.price,
        year: carListings.year,
        mileage: carListings.mileage,
        condition: carListings.condition,
        createdAt: carListings.createdAt,
      })
      .from(carListings)
      .where(
        and(
          eq(carListings.make, make),
          eq(carListings.model, model),
          engineSize ? eq(carListings.engineSize, engineSize) : undefined
        )
      );

    const marketListings = await listingsQuery;

    // Calculate market statistics
    const prices = marketListings.map(l => l.price);
    const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length || 0;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Group by year for trend analysis
    const priceByYear = marketListings.reduce((acc, listing) => {
      if (!acc[listing.year]) {
        acc[listing.year] = { total: 0, count: 0, prices: [] };
      }
      acc[listing.year].total += listing.price;
      acc[listing.year].count++;
      acc[listing.year].prices.push(listing.price);
      return acc;
    }, {} as Record<number, { total: number; count: number; prices: number[] }>);

    const priceHistory = Object.entries(priceByYear).map(([year, data]) => ({
      year: parseInt(year),
      averagePrice: data.total / data.count,
      listingCount: data.count,
      depreciation: 0, // Will be calculated below
    })).sort((a, b) => b.year - a.year);

    // Calculate depreciation rates
    for (let i = 0; i < priceHistory.length - 1; i++) {
      const current = priceHistory[i];
      const previous = priceHistory[i + 1];
      current.depreciation = ((previous.averagePrice - current.averagePrice) / previous.averagePrice) * 100;
    }

    // Get CRSP reference value
    const crspValue = vehicleData[0]?.crspKes || vehicleData[0]?.crsp2020 || 0;

    // Prepare data for AI analysis
    const analysisData = {
      vehicle: `${make} ${model}${engineSize ? ` ${engineSize}cc` : ''}`,
      crspValue,
      averageMarketPrice: averagePrice,
      priceRange: { min: minPrice, max: maxPrice },
      totalListings: marketListings.length,
      priceHistory,
      marketCondition: this.assessMarketCondition(averagePrice, crspValue),
      depreciationTrend: this.calculateDepreciationTrend(priceHistory),
    };

    // Get AI insights
    const aiAnalysis = await this.getAIInsights(analysisData);

    return {
      vehicleInfo: {
        make,
        model,
        engineSize: engineSize || 0,
        averagePrice,
        priceRange: { min: minPrice, max: maxPrice },
        totalListings: marketListings.length,
      },
      marketInsights: {
        trendDirection: this.determineTrendDirection(priceHistory),
        confidence: this.calculateConfidence(marketListings.length, priceHistory.length),
        keyFactors: this.identifyKeyFactors(analysisData),
        recommendation: aiAnalysis.recommendation,
      },
      priceHistory,
      aiAnalysis,
    };
  }

  private assessMarketCondition(averagePrice: number, crspValue: number): string {
    if (crspValue === 0) return "unknown";
    const ratio = (averagePrice / crspValue) * 100;
    if (ratio > 80) return "overpriced";
    if (ratio > 60) return "fair";
    if (ratio > 40) return "underpriced";
    return "deeply_discounted";
  }

  private calculateDepreciationTrend(priceHistory: Array<{ year: number; depreciation: number }>): string {
    const recentDepreciation = priceHistory.slice(0, 3).map(p => p.depreciation);
    const avgDepreciation = recentDepreciation.reduce((a, b) => a + b, 0) / recentDepreciation.length;
    
    if (avgDepreciation > 15) return "fast_depreciation";
    if (avgDepreciation > 8) return "normal_depreciation";
    if (avgDepreciation > 0) return "slow_depreciation";
    return "appreciating";
  }

  private determineTrendDirection(priceHistory: Array<{ year: number; averagePrice: number }>): "upward" | "downward" | "stable" {
    if (priceHistory.length < 2) return "stable";
    
    const recent = priceHistory.slice(0, 3);
    const trend = recent.reduce((acc, curr, idx) => {
      if (idx === 0) return acc;
      const prev = recent[idx - 1];
      return acc + (curr.averagePrice - prev.averagePrice);
    }, 0);

    if (trend > 0) return "upward";
    if (trend < 0) return "downward";
    return "stable";
  }

  private calculateConfidence(listingCount: number, yearSpan: number): number {
    const listingScore = Math.min(listingCount / 20, 1); // Max confidence at 20+ listings
    const timeScore = Math.min(yearSpan / 5, 1); // Max confidence at 5+ years of data
    return Math.round((listingScore + timeScore) / 2 * 100);
  }

  private identifyKeyFactors(data: any): string[] {
    const factors = [];
    
    if (data.totalListings < 5) {
      factors.push("Limited market data available");
    }
    
    if (data.marketCondition === "overpriced") {
      factors.push("Current prices above CRSP reference");
    }
    
    if (data.depreciationTrend === "fast_depreciation") {
      factors.push("Rapid value depreciation observed");
    }
    
    if (data.depreciationTrend === "appreciating") {
      factors.push("Vehicle showing price appreciation");
    }
    
    return factors;
  }

  private async getAIInsights(data: any): Promise<{
    summary: string;
    marketPosition: string;
    buyingAdvice: string;
    sellingAdvice: string;
    futureOutlook: string;
    recommendation: string;
  }> {
    const prompt = `
    Analyze the following vehicle market data and provide insights for the Kenyan car market:

    Vehicle: ${data.vehicle}
    CRSP Reference Value: KES ${data.crspValue?.toLocaleString() || 'N/A'}
    Current Average Market Price: KES ${data.averageMarketPrice?.toLocaleString() || 'N/A'}
    Price Range: KES ${data.priceRange?.min?.toLocaleString() || 'N/A'} - KES ${data.priceRange?.max?.toLocaleString() || 'N/A'}
    Total Market Listings: ${data.totalListings}
    Market Condition: ${data.marketCondition}
    Depreciation Trend: ${data.depreciationTrend}
    
    Price History:
    ${data.priceHistory?.map((p: any) => `${p.year}: KES ${p.averagePrice?.toLocaleString() || 'N/A'} (${p.listingCount} listings, ${p.depreciation?.toFixed(1) || 'N/A'}% depreciation)`).join('\n') || 'No historical data'}

    Please provide a comprehensive analysis in JSON format with the following structure:
    {
      "summary": "Brief overview of the vehicle's market position",
      "marketPosition": "How this vehicle compares to similar vehicles in Kenya",
      "buyingAdvice": "Advice for potential buyers",
      "sellingAdvice": "Advice for current owners looking to sell",
      "futureOutlook": "Prediction for future price trends",
      "recommendation": "Overall recommendation (buy/sell/hold/wait)"
    }

    Focus on practical insights relevant to the Kenyan automotive market, considering factors like import duties, local preferences, and economic conditions.
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert automotive market analyst specializing in the Kenyan car market. Provide practical, data-driven insights for vehicle pricing and market trends."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });

      const analysis = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        summary: analysis.summary || "Market analysis unavailable",
        marketPosition: analysis.marketPosition || "Position analysis unavailable",
        buyingAdvice: analysis.buyingAdvice || "Buying advice unavailable",
        sellingAdvice: analysis.sellingAdvice || "Selling advice unavailable",
        futureOutlook: analysis.futureOutlook || "Future outlook unavailable",
        recommendation: analysis.recommendation || "hold",
      };
    } catch (error) {
      console.error("AI analysis error:", error);
      return {
        summary: "AI analysis temporarily unavailable",
        marketPosition: "Unable to determine market position",
        buyingAdvice: "Consult with local dealers for current market conditions",
        sellingAdvice: "Compare with similar listings in your area",
        futureOutlook: "Monitor market trends over time",
        recommendation: "hold",
      };
    }
  }
}

export const priceAnalyzer = new AIPriceAnalyzer();