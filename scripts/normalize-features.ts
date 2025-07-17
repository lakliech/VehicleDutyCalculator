import { drizzle } from 'drizzle-orm/neon-serverless';
import { Client } from '@neondatabase/serverless';
import { productFeatures } from '../shared/product-catalog-schema';
import { eq, and, sql } from 'drizzle-orm';

// Initialize database
const client = new Client(process.env.DATABASE_URL);
const db = drizzle(client);

interface FeatureNormalization {
  baseName: string;
  baseDescription: string;
  features: {
    id: number;
    name: string;
    productId: number | null;
    limitType: string;
    limitValue?: number;
    limitDuration?: number;
  }[];
}

// Define feature normalization groups
const normalizationGroups: FeatureNormalization[] = [
  {
    baseName: "Photo Upload",
    baseDescription: "Upload photos for your listings",
    features: [
      { id: 1, name: "Photo Upload", productId: 1, limitType: "count", limitValue: 10 },
      { id: 38, name: "Photo Upload", productId: 1, limitType: "count", limitValue: 5 },
      { id: 40, name: "Photo Uploads", productId: 8, limitType: "count", limitValue: 10 }
    ]
  },
  {
    baseName: "Video Upload", 
    baseDescription: "Upload video content for your listings",
    features: [
      { id: 44, name: "Video Upload", productId: 8, limitType: "count", limitValue: 3 }
    ]
  },
  {
    baseName: "Listing Duration",
    baseDescription: "How long your listing stays active", 
    features: [
      { id: 2, name: "Standard visibility listing duration", productId: 1, limitType: "duration", limitDuration: 30 },
      { id: 39, name: "Featured Listing", productId: 1, limitType: "duration", limitDuration: 30 },
      { id: 42, name: "Listing Duration", productId: 8, limitType: "duration", limitDuration: 30 }
    ]
  },
  {
    baseName: "Listing Placement",
    baseDescription: "Priority placement for your listings",
    features: [
      { id: 41, name: "Featured Listing", productId: 8, limitType: "boolean" },
      { id: 43, name: "Priority Placement", productId: 8, limitType: "boolean" }
    ]
  },
  {
    baseName: "Listing Refresh", 
    baseDescription: "Refresh your listing to appear at the top",
    features: [
      { id: 45, name: "Unlimited Refresh", productId: 8, limitType: "frequency", limitValue: 5, limitDuration: 24 }
    ]
  }
];

async function normalizeFeatures() {
  console.log('Starting feature normalization...');
  
  try {
    await client.connect();
    
    for (const group of normalizationGroups) {
      console.log(`\nProcessing group: ${group.baseName}`);
      
      // If there's only one feature in the group, just standardize its name and description
      if (group.features.length === 1) {
        const feature = group.features[0];
        console.log(`  Standardizing single feature: ${feature.name} (ID: ${feature.id})`);
        
        await db
          .update(productFeatures)
          .set({
            name: group.baseName,
            description: group.baseDescription,
            updatedAt: new Date()
          })
          .where(eq(productFeatures.id, feature.id));
        
        console.log(`  ✓ Updated feature ID ${feature.id} to standard name`);
        continue;
      }
      
      // For multiple features, keep the first one and merge others into it
      const primaryFeature = group.features[0];
      const duplicateFeatures = group.features.slice(1);
      
      console.log(`  Primary feature: ${primaryFeature.name} (ID: ${primaryFeature.id})`);
      console.log(`  Duplicate features: ${duplicateFeatures.map(f => `${f.name} (ID: ${f.id})`).join(', ')}`);
      
      // Update the primary feature with standardized name and description
      await db
        .update(productFeatures)
        .set({
          name: group.baseName,
          description: group.baseDescription,
          updatedAt: new Date()
        })
        .where(eq(productFeatures.id, primaryFeature.id));
      
      console.log(`  ✓ Updated primary feature ID ${primaryFeature.id}`);
      
      // For each duplicate feature, we need to handle product associations
      for (const duplicate of duplicateFeatures) {
        // Check if any products are using this duplicate feature
        const productsUsingFeature = await db.query.productFeatures.findMany({
          where: eq(productFeatures.id, duplicate.id),
          with: {
            product: true
          }
        });
        
        if (duplicate.productId) {
          // If the duplicate has different limits, create a new variant
          const isDifferentLimits = 
            duplicate.limitValue !== primaryFeature.limitValue ||
            duplicate.limitDuration !== primaryFeature.limitDuration;
          
          if (isDifferentLimits) {
            // Create a new feature variant with the different limits
            const variantName = `${group.baseName}`;
            const variantDescription = `${group.baseDescription} - ${duplicate.limitValue || duplicate.limitDuration} ${duplicate.limitType === 'count' ? 'uploads' : 'days'}`;
            
            await db
              .update(productFeatures)
              .set({
                name: variantName,
                description: variantDescription,
                updatedAt: new Date()
              })
              .where(eq(productFeatures.id, duplicate.id));
            
            console.log(`  ✓ Updated duplicate feature ID ${duplicate.id} to variant with different limits`);
          } else {
            // Same limits, so we can safely remove this duplicate
            console.log(`  ⚠️  Feature ID ${duplicate.id} has same limits as primary, marking for manual review`);
            
            await db
              .update(productFeatures)
              .set({
                name: `[DUPLICATE] ${duplicate.name}`,
                description: `[DUPLICATE - MANUAL REVIEW NEEDED] ${duplicate.description}`,
                updatedAt: new Date()
              })
              .where(eq(productFeatures.id, duplicate.id));
          }
        }
      }
      
      console.log(`  ✓ Completed normalization for ${group.baseName}`);
    }
    
    console.log('\n✅ Feature normalization completed successfully!');
    
    // Display summary of normalized features
    console.log('\n📊 Normalization Summary:');
    for (const group of normalizationGroups) {
      console.log(`\n${group.baseName}:`);
      console.log(`  Base Description: ${group.baseDescription}`);
      console.log(`  Features processed: ${group.features.length}`);
      
      // Show current state of features in this group
      const currentFeatures = await db.query.productFeatures.findMany({
        where: sql`name LIKE ${`%${group.baseName}%`} OR name LIKE ${`%[DUPLICATE]%`}`,
        columns: {
          id: true,
          name: true,
          description: true,
          productId: true,
          limitType: true,
          limitValue: true,
          limitDuration: true
        }
      });
      
      currentFeatures.forEach(feature => {
        const limits = [];
        if (feature.limitValue) limits.push(`${feature.limitValue} ${feature.limitType}`);
        if (feature.limitDuration) limits.push(`${feature.limitDuration} days`);
        const limitStr = limits.length > 0 ? ` (${limits.join(', ')})` : '';
        
        console.log(`    ID ${feature.id}: ${feature.name}${limitStr} [Product: ${feature.productId || 'None'}]`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error during feature normalization:', error);
  } finally {
    await client.end();
  }
}

// Run the normalization if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  normalizeFeatures()
    .then(() => {
      console.log('\n🎉 Normalization script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Normalization script failed:', error);
      process.exit(1);
    });
}

export { normalizeFeatures, normalizationGroups };