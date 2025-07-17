import { db } from './db';
import { 
  productCategories, 
  products, 
  productFeatures, 
  productPricing,
  InsertProductCategory,
  InsertProduct,
  InsertProductFeature,
  InsertProductPricing
} from '../shared/product-catalog-schema';

interface ExcelProductData {
  category: string;
  product: string;
  features: string;
  monetization: string;
  targetUsers: string;
}

const excelData: ExcelProductData[] = [
  {
    category: 'Marketplace Listings',
    product: 'Basic Listings',
    features: 'photos ( define limit)\n- Standard visibility\nlisting duration (define limit',
    monetization: 'Free (limited) or KES 500–2,000/listing',
    targetUsers: 'Private sellers, small dealers'
  },
  {
    category: 'Marketplace Listings',
    product: 'Premium Listings',
    features: 'photos/videos\n- Top search placement\n- "Verified" badge',
    monetization: 'KES 1,500–5,000/listing (or bundled in subs)',
    targetUsers: 'Dealers, premium sellers'
  },
  {
    category: 'Marketplace Listings',
    product: 'Promoted Listings',
    features: '- Sponsored placement\n- Social media cross-promotion',
    monetization: 'Pay-per-boost (KES 300–1,000/day)',
    targetUsers: 'Urgent sellers'
  },
  {
    category: 'Subscription Plans',
    product: 'Basic Plan',
    features: '- 10 active listings ( define limit)\n- Basic analytics\n- Standard support',
    monetization: 'KES 2,500/month',
    targetUsers: 'Small dealers'
  },
  {
    category: 'Subscription Plans',
    product: 'Professional Plan',
    features: ' - Unlimited listings\n- AI pricing insights\n- Lead management tools',
    monetization: 'KES 8,000/month',
    targetUsers: 'Mid-sized dealers'
  },
  {
    category: 'Subscription Plans',
    product: 'Enterprise Plan',
    features: '- Custom analytics\n- API access\n- Dedicated account manager',
    monetization: 'KES 20,000/month',
    targetUsers: 'Large dealers, franchises'
  },
  {
    category: 'AI & Analytics',
    product: 'Smart Pricing Engine',
    features: '- Real-time market trends\n- Competitor benchmarking',
    monetization: 'Freemium (basic) / KES 1,200/month (Pro)',
    targetUsers: 'Sellers, dealers'
  },
  {
    category: 'AI & Analytics',
    product: 'Market Intelligence',
    features: '- Monthly trend reports\n- Regional demand analysis',
    monetization: 'KES 5,000–15,000/report',
    targetUsers: 'Dealers, insurers, OEMs'
  },
  {
    category: 'Buyer Tools',
    product: 'Free Calculators',
    features: '- Duty estimator\n- Basic valuation\n- Import cost calculator',
    monetization: 'Free (ad-supported)',
    targetUsers: 'Buyers'
  },
  {
    category: 'Buyer Tools',
    product: 'Premium Tools',
    features: '- Unlimited calculations\n- Historical data\n- PDF exports',
    monetization: 'KES 1,500/month or pay-per-use (KES 200/report)',
    targetUsers: 'Serious buyers, importers'
  },
  {
    category: 'Financial Services',
    product: 'Loan Referrals',
    features: '- Bank loan matching\n- Pre-approval integration',
    monetization: 'KES 15,000–50,000 per successful loan (3–5%)',
    targetUsers: 'Banks, buyers'
  },
  {
    category: 'Financial Services',
    product: 'Insurance Referrals',
    features: '- Partnered insurance quotes',
    monetization: 'KES 2,000–8,000 per policy',
    targetUsers: 'Insurers, buyers'
  },
  {
    category: 'Advertising',
    product: 'Banner Ads',
    features: '- Homepage placements\n- Category-specific ads',
    monetization: 'KES 50,000–200,000/month',
    targetUsers: 'Banks, insurers, spare parts'
  },
  {
    category: 'Advertising',
    product: 'Sponsored Content',
    features: '- "Best Cars Under X KES" guides',
    monetization: 'KES 20,000–80,000/post',
    targetUsers: 'Brands, dealers'
  },
  {
    category: 'Value-Added Services',
    product: 'Vehicle Inspections',
    features: '- Certified mechanic checks\n- Digital reports',
    monetization: 'KES 8,000–15,000/inspection (revenue share)',
    targetUsers: 'Buyers, sellers'
  },
  {
    category: 'White-Label Solutions',
    product: 'Bank Loan Portals',
    features: '- Custom-branded auto loan platforms',
    monetization: 'KES 500K–2M setup + monthly fee',
    targetUsers: 'Banks, SACCOs'
  },
  {
    category: 'White-Label Solutions',
    product: 'Dealer APIs',
    features: '- Inventory management integration\n- Real-time pricing data',
    monetization: 'KES 50,000–200,000/month',
    targetUsers: 'Dealers'
  }
];

function parseBillingType(monetization: string): 'per_period' | 'per_listing' | 'per_policy' | 'per_report' | 'per_item' | 'one_time' | 'pay_per_boost' {
  const lower = monetization.toLowerCase();
  
  if (lower.includes('/month') || lower.includes('/year')) return 'per_period';
  if (lower.includes('/listing')) return 'per_listing';
  if (lower.includes('/policy')) return 'per_policy';
  if (lower.includes('/report') || lower.includes('/calculation')) return 'per_report';
  if (lower.includes('/day') || lower.includes('boost')) return 'pay_per_boost';
  if (lower.includes('/inspection') || lower.includes('per successful')) return 'per_item';
  if (lower.includes('setup') || lower.includes('one-time')) return 'one_time';
  
  return 'per_period'; // default
}

function extractBasePrice(monetization: string): number {
  // Extract the first number found in KES format
  const matches = monetization.match(/KES\s*([\d,]+)/);
  if (matches) {
    return parseFloat(matches[1].replace(/,/g, ''));
  }
  return 0; // Free
}

function parseFeatures(featuresText: string): Array<{name: string, limitType?: 'duration' | 'count', limitValue?: number}> {
  const features = featuresText.split('\n-').map(f => f.trim()).filter(f => f);
  
  return features.map(feature => {
    const cleanFeature = feature.replace(/^-\s*/, '').trim();
    
    // Check for limits
    if (cleanFeature.includes('define limit')) {
      if (cleanFeature.includes('photos')) {
        return { name: cleanFeature, limitType: 'count' as const, limitValue: 10 };
      }
      if (cleanFeature.includes('listing duration')) {
        return { name: cleanFeature, limitType: 'duration' as const, limitValue: 30 };
      }
      if (cleanFeature.includes('active listings')) {
        const match = cleanFeature.match(/(\d+)\s*active listings/);
        const limit = match ? parseInt(match[1]) : 10;
        return { name: cleanFeature, limitType: 'count' as const, limitValue: limit };
      }
    }
    
    return { name: cleanFeature };
  });
}

async function migrateProductCatalog() {
  console.log('Starting product catalog migration...');
  
  try {
    // Get unique categories
    const uniqueCategories = [...new Set(excelData.map(item => item.category))];
    
    // Create categories
    const categoryMap = new Map<string, number>();
    
    for (const categoryName of uniqueCategories) {
      const categoryData: InsertProductCategory = {
        name: categoryName,
        description: `${categoryName} products and services`,
        isActive: true,
        sortOrder: uniqueCategories.indexOf(categoryName)
      };
      
      const [category] = await db.insert(productCategories).values(categoryData).returning();
      categoryMap.set(categoryName, category.id);
      console.log(`Created category: ${categoryName} (ID: ${category.id})`);
    }
    
    // Create products and features
    for (const item of excelData) {
      const categoryId = categoryMap.get(item.category);
      if (!categoryId) continue;
      
      const billingType = parseBillingType(item.monetization);
      const basePrice = extractBasePrice(item.monetization);
      
      const productData: InsertProduct = {
        categoryId,
        name: item.product,
        description: `${item.product} - ${item.monetization}`,
        basePrice: basePrice.toString(),
        billingType,
        targetUsers: item.targetUsers,
        isActive: true,
        sortOrder: 0
      };
      
      const [product] = await db.insert(products).values(productData).returning();
      console.log(`Created product: ${item.product} (ID: ${product.id})`);
      
      // Create pricing tier
      const pricingData: InsertProductPricing = {
        productId: product.id,
        tierName: billingType === 'per_period' ? 'Monthly' : 'Standard',
        price: basePrice.toString(),
        billingCycle: billingType === 'per_period' ? 30 : null,
        minQuantity: 1,
        maxQuantity: null,
        discountPercentage: '0',
        isActive: true
      };
      
      await db.insert(productPricing).values(pricingData);
      
      // Create features
      const features = parseFeatures(item.features);
      
      for (let i = 0; i < features.length; i++) {
        const feature = features[i];
        
        const featureData: InsertProductFeature = {
          productId: product.id,
          name: feature.name,
          description: `${feature.name} feature for ${item.product}`,
          limitType: feature.limitType || 'unlimited',
          limitValue: feature.limitValue || null,
          limitDuration: feature.limitType === 'duration' ? feature.limitValue : null,
          isIncluded: true,
          additionalCost: '0',
          sortOrder: i
        };
        
        await db.insert(productFeatures).values(featureData);
        console.log(`  - Created feature: ${feature.name}`);
      }
    }
    
    console.log('Product catalog migration completed successfully!');
    console.log(`Created ${uniqueCategories.length} categories`);
    console.log(`Created ${excelData.length} products`);
    
  } catch (error) {
    console.error('Error during product catalog migration:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
// Note: This will run when the file is imported as a script
migrateProductCatalog()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });

export { migrateProductCatalog };