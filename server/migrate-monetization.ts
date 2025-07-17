import { db } from './db';
import { 
  subscriptionPlans, userSubscriptions, billingTransactions, usageTracking,
  featureLimits, loanReferrals, insuranceReferrals, listingPackages,
  listingPromotions, analyticsPackages, userAnalyticsSubscriptions,
  apiPlans, apiKeys, apiUsage, revenueSharing
} from '../shared/monetization-schema';
import { MonetizationService } from './services/monetization-service';

/**
 * Migration script to set up monetization database tables and initial data
 */
async function migrateMonetization() {
  console.log('🚀 Starting monetization database migration...');

  try {
    // Create subscription plans table and initialize default plans
    console.log('📦 Creating subscription plans...');
    await MonetizationService.initializeDefaultPlans();

    // Create feature limits for default plans
    console.log('⚡ Setting up feature limits...');
    
    const plans = await db.select().from(subscriptionPlans);
    
    for (const plan of plans) {
      const limitsData = [
        { 
          planId: plan.id, 
          featureType: 'duty_calculation', 
          limitValue: plan.name === 'Enterprise' ? null : (plan.name === 'Professional' ? 500 : 50),
          resetPeriod: 'monthly' 
        },
        { 
          planId: plan.id, 
          featureType: 'valuation', 
          limitValue: plan.name === 'Enterprise' ? null : (plan.name === 'Professional' ? 200 : 20),
          resetPeriod: 'monthly' 
        },
        { 
          planId: plan.id, 
          featureType: 'import_estimate', 
          limitValue: plan.name === 'Enterprise' ? null : (plan.name === 'Professional' ? 100 : 10),
          resetPeriod: 'monthly' 
        },
        { 
          planId: plan.id, 
          featureType: 'api_call', 
          limitValue: plan.name === 'Enterprise' ? 100000 : (plan.name === 'Professional' ? 10000 : 100),
          resetPeriod: 'monthly' 
        },
        { 
          planId: plan.id, 
          featureType: 'listing', 
          limitValue: plan.name === 'Basic' ? 10 : null,
          resetPeriod: 'monthly' 
        }
      ];

      for (const limit of limitsData) {
        await db.insert(featureLimits).values(limit).onConflictDoNothing();
      }
    }

    // Create listing packages
    console.log('🎯 Creating listing promotion packages...');
    
    const packages = [
      {
        name: 'Featured',
        description: 'Highlight your listing with a colored border and badge',
        priceKes: '500.00',
        durationDays: 7,
        features: { featured: true, highlightedBorder: true },
        sortOrder: 1
      },
      {
        name: 'Premium',
        description: 'Top placement in search results with featured styling',
        priceKes: '1500.00',
        durationDays: 14,
        features: { 
          featured: true, 
          topPlacement: true, 
          highlightedBorder: true, 
          extraPhotos: 5,
          videoAllowed: true 
        },
        sortOrder: 2
      },
      {
        name: 'Spotlight',
        description: 'Maximum visibility with social media promotion',
        priceKes: '3000.00',
        durationDays: 30,
        features: { 
          featured: true, 
          topPlacement: true, 
          highlightedBorder: true, 
          extraPhotos: 10,
          videoAllowed: true,
          socialMediaPromotion: true,
          analyticsAccess: true,
          prioritySupport: true
        },
        sortOrder: 3
      }
    ];

    for (const pkg of packages) {
      await db.insert(listingPackages).values(pkg).onConflictDoNothing();
    }

    // Create analytics packages
    console.log('📊 Creating analytics packages...');
    
    const analyticsPlans = [
      {
        name: 'Basic Analytics',
        description: 'Essential insights for your listings',
        priceKes: '800.00',
        billingCycle: 'monthly',
        features: { 
          advancedDashboard: true, 
          realTimeUpdates: true 
        },
        dataRetentionMonths: 6
      },
      {
        name: 'Pro Analytics',
        description: 'Advanced market analysis and competitor insights',
        priceKes: '2000.00',
        billingCycle: 'monthly',
        features: { 
          advancedDashboard: true, 
          competitorAnalysis: true, 
          marketTrends: true,
          customReports: true,
          realTimeUpdates: true,
          dataExport: true
        },
        dataRetentionMonths: 24
      },
      {
        name: 'Enterprise Reports',
        description: 'Complete market intelligence with API access',
        priceKes: '5000.00',
        billingCycle: 'monthly',
        features: { 
          advancedDashboard: true, 
          competitorAnalysis: true, 
          marketTrends: true,
          customReports: true,
          apiAccess: true,
          dataExport: true,
          realTimeUpdates: true
        },
        dataRetentionMonths: 60
      }
    ];

    for (const plan of analyticsPlans) {
      await db.insert(analyticsPackages).values(plan).onConflictDoNothing();
    }

    // Create API plans
    console.log('🔑 Creating API plans...');
    
    const apiPlansData = [
      {
        name: 'Developer',
        description: 'Perfect for developers and small applications',
        priceKes: '1200.00',
        requestsPerMonth: 10000,
        rateLimit: 60,
        features: ['Basic endpoints', 'Standard support', 'Documentation access']
      },
      {
        name: 'Business',
        description: 'Ideal for growing businesses and integrations',
        priceKes: '4000.00',
        requestsPerMonth: 100000,
        rateLimit: 300,
        features: ['All endpoints', 'Priority support', 'Advanced analytics', 'SLA guarantee']
      },
      {
        name: 'Enterprise',
        description: 'Complete API access for large-scale operations',
        priceKes: '12000.00',
        requestsPerMonth: null, // unlimited
        rateLimit: 1000,
        features: ['All endpoints', '24/7 support', 'Custom integrations', 'Dedicated account manager']
      }
    ];

    for (const plan of apiPlansData) {
      await db.insert(apiPlans).values(plan).onConflictDoNothing();
    }

    console.log('✅ Monetization migration completed successfully!');
    console.log(`
    Created:
    - ${plans.length} subscription plans
    - ${packages.length} listing packages
    - ${analyticsPlans.length} analytics packages
    - ${apiPlansData.length} API plans
    - Feature limits and configurations
    `);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateMonetization()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export { migrateMonetization };