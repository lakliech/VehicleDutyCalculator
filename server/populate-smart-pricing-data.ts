import { db } from './db';
import { 
  marketPriceAnalysis,
  pricingRecommendations,
  seasonalPricingTrends,
  priceAlerts,
  depreciationForecasts,
  marketInsights,
  carListings,
  appUsers
} from '@shared/schema';

async function populateSmartPricingData() {
  console.log('Starting Smart Pricing data population...');

  try {
    // Sample seasonal pricing trends
    const seasonalTrendsData = [
      {
        month: 1,
        seasonality: 'low_demand',
        avgPriceMultiplier: 0.92,
        demandLevel: 'low',
        supplyLevel: 'high',
        recommendations: 'Good time for buyers. Sellers may need to adjust prices down.',
        bestBuyingOpportunity: true,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      },
      {
        month: 2,
        seasonality: 'low_demand',
        avgPriceMultiplier: 0.94,
        demandLevel: 'low',
        supplyLevel: 'high',
        recommendations: 'Continued buyer market. Consider negotiating.',
        bestBuyingOpportunity: true,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      },
      {
        month: 3,
        seasonality: 'stable',
        avgPriceMultiplier: 0.98,
        demandLevel: 'moderate',
        supplyLevel: 'moderate',
        recommendations: 'Market begins to stabilize. Fair pricing expected.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      },
      {
        month: 4,
        seasonality: 'stable',
        avgPriceMultiplier: 1.00,
        demandLevel: 'moderate',
        supplyLevel: 'moderate',
        recommendations: 'Balanced market conditions. Standard pricing.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      },
      {
        month: 5,
        seasonality: 'high_demand',
        avgPriceMultiplier: 1.03,
        demandLevel: 'high',
        supplyLevel: 'low',
        recommendations: 'Excellent selling season. Prices trending upward.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: true,
        category: 'passenger_cars'
      },
      {
        month: 6,
        seasonality: 'high_demand',
        avgPriceMultiplier: 1.05,
        demandLevel: 'high',
        supplyLevel: 'low',
        recommendations: 'Peak selling season. Premium pricing possible.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: true,
        category: 'passenger_cars'
      },
      {
        month: 7,
        seasonality: 'high_demand',
        avgPriceMultiplier: 1.07,
        demandLevel: 'very_high',
        supplyLevel: 'very_low',
        recommendations: 'Holiday season demand peak. Highest prices of year.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: true,
        category: 'passenger_cars'
      },
      {
        month: 8,
        seasonality: 'high_demand',
        avgPriceMultiplier: 1.04,
        demandLevel: 'high',
        supplyLevel: 'low',
        recommendations: 'Still strong seller market. Good pricing power.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: true,
        category: 'passenger_cars'
      },
      {
        month: 9,
        seasonality: 'stable',
        avgPriceMultiplier: 1.00,
        demandLevel: 'moderate',
        supplyLevel: 'moderate',
        recommendations: 'Return to balanced conditions.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      },
      {
        month: 10,
        seasonality: 'stable',
        avgPriceMultiplier: 0.97,
        demandLevel: 'moderate',
        supplyLevel: 'moderate',
        recommendations: 'Slight softening in prices. Good for negotiations.',
        bestBuyingOpportunity: false,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      },
      {
        month: 11,
        seasonality: 'low_demand',
        avgPriceMultiplier: 0.95,
        demandLevel: 'low',
        supplyLevel: 'high',
        recommendations: 'Pre-holiday buying opportunity. Lower prices.',
        bestBuyingOpportunity: true,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      },
      {
        month: 12,
        seasonality: 'low_demand',
        avgPriceMultiplier: 0.93,
        demandLevel: 'low',
        supplyLevel: 'high',
        recommendations: 'Year-end clearance period. Best buyer deals.',
        bestBuyingOpportunity: true,
        bestSellingOpportunity: false,
        category: 'passenger_cars'
      }
    ];

    console.log('Inserting seasonal pricing trends...');
    await db.insert(seasonalPricingTrends).values(seasonalTrendsData);

    // Sample market insights
    const marketInsightsData = [
      {
        insightType: 'price_trend',
        title: 'Toyota Vehicles Show Strong Price Stability',
        summary: 'Toyota models maintain consistent pricing with minimal depreciation compared to other brands.',
        detailedAnalysis: 'Analysis of 500+ Toyota listings shows average price variance of only 8% compared to market average of 15%. Models like Corolla, Camry, and Prado demonstrate exceptional value retention.',
        actionableRecommendations: [
          'Consider Toyota models for better resale value',
          'Price Toyota listings competitively as demand remains high',
          'Buyers should expect firm pricing on popular Toyota models'
        ],
        priority: 'medium',
        confidenceLevel: 0.87,
        category: 'market_analysis',
        isPublic: true,
        createdAt: new Date().toISOString()
      },
      {
        insightType: 'seasonal_trend',
        title: 'June-July Peak Selling Season Confirmed',
        summary: 'Vehicle prices increase by 5-7% during holiday months with highest demand in July.',
        detailedAnalysis: 'Historical data shows consistent 15-20% increase in listing activity during June-July period. Price premiums of 5-7% are sustainable during this period due to increased buyer activity around holiday bonuses.',
        actionableRecommendations: [
          'List vehicles in May-June for July sales',
          'Buyers should consider purchases in January-February for best deals',
          'Prepare inventory ahead of peak season'
        ],
        priority: 'high',
        confidenceLevel: 0.92,
        category: 'seasonal_analysis',
        isPublic: true,
        createdAt: new Date().toISOString()
      },
      {
        insightType: 'market_opportunity',
        title: 'SUV Segment Shows Growth Potential',
        summary: 'Increasing demand for SUVs presents pricing opportunities for sellers.',
        detailedAnalysis: 'SUV listings receive 40% more inquiries than sedans. Compact SUVs like Honda Vezel, Mazda CX-5, and Nissan X-Trail show strongest demand. Average time on market: 18 days vs 28 days for sedans.',
        actionableRecommendations: [
          'Consider premium pricing for well-maintained SUVs',
          'Highlight SUV features in listings',
          'SUV inventory turns over faster than sedan inventory'
        ],
        priority: 'medium',
        confidenceLevel: 0.84,
        category: 'opportunity_analysis',
        isPublic: true,
        createdAt: new Date().toISOString()
      },
      {
        insightType: 'depreciation_alert',
        title: 'Luxury Vehicle Depreciation Accelerating',
        summary: 'Premium vehicles above KES 4M showing faster than expected depreciation rates.',
        detailedAnalysis: 'Luxury sedans and high-end SUVs experiencing 12-15% annual depreciation vs historical 8-10%. Economic factors and fuel costs driving buyers toward more economical options.',
        actionableRecommendations: [
          'Price luxury vehicles aggressively for faster turnover',
          'Consider timing of luxury vehicle sales carefully',
          'Highlight fuel efficiency and maintenance costs'
        ],
        priority: 'high',
        confidenceLevel: 0.89,
        category: 'risk_analysis',
        isPublic: true,
        createdAt: new Date().toISOString()
      }
    ];

    console.log('Inserting market insights...');
    await db.insert(marketInsights).values(marketInsightsData);

    // Sample depreciation forecasts
    const depreciationForecastsData = [
      {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        currentValue: 2800000,
        threeMonthForecast: 2730000,
        sixMonthForecast: 2650000,
        twelveMonthForecast: 2450000,
        depreciationRate: 0.08,
        marketFactors: ['fuel_efficiency', 'brand_reliability', 'parts_availability'],
        confidenceLevel: 0.91,
        lastUpdated: new Date().toISOString()
      },
      {
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        currentValue: 2400000,
        threeMonthForecast: 2340000,
        sixMonthForecast: 2280000,
        twelveMonthForecast: 2100000,
        depreciationRate: 0.10,
        marketFactors: ['competitive_market', 'maintenance_costs'],
        confidenceLevel: 0.85,
        lastUpdated: new Date().toISOString()
      },
      {
        make: 'BMW',
        model: '320i',
        year: 2018,
        currentValue: 4200000,
        threeMonthForecast: 3990000,
        sixMonthForecast: 3780000,
        twelveMonthForecast: 3360000,
        depreciationRate: 0.15,
        marketFactors: ['luxury_segment_pressure', 'maintenance_costs', 'fuel_costs'],
        confidenceLevel: 0.88,
        lastUpdated: new Date().toISOString()
      }
    ];

    console.log('Inserting depreciation forecasts...');
    await db.insert(depreciationForecasts).values(depreciationForecastsData);

    // Sample market price analysis for popular vehicles
    const marketAnalysisData = [
      {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        averagePrice: 2800000,
        medianPrice: 2750000,
        priceRange: {
          min: 2200000,
          max: 3200000,
          percentile_25: 2600000,
          percentile_75: 2950000
        },
        sampleSize: 45,
        lastUpdated: new Date().toISOString(),
        marketPosition: 'stable',
        priceVolatility: 0.08
      },
      {
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        averagePrice: 2400000,
        medianPrice: 2350000,
        priceRange: {
          min: 1900000,
          max: 2800000,
          percentile_25: 2200000,
          percentile_75: 2600000
        },
        sampleSize: 32,
        lastUpdated: new Date().toISOString(),
        marketPosition: 'declining',
        priceVolatility: 0.12
      },
      {
        make: 'BMW',
        model: '320i',
        year: 2018,
        averagePrice: 4200000,
        medianPrice: 4100000,
        priceRange: {
          min: 3500000,
          max: 4800000,
          percentile_25: 3900000,
          percentile_75: 4500000
        },
        sampleSize: 18,
        lastUpdated: new Date().toISOString(),
        marketPosition: 'declining',
        priceVolatility: 0.18
      }
    ];

    console.log('Inserting market price analysis...');
    await db.insert(marketPriceAnalysis).values(marketAnalysisData);

    console.log('Smart Pricing data population completed successfully!');

  } catch (error) {
    console.error('Error populating Smart Pricing data:', error);
    process.exit(1);
  }
}

// Run the population script
populateSmartPricingData()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });

export { populateSmartPricingData };