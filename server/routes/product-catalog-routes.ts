import { Router } from 'express';
import { z } from 'zod';
import { eq, desc, asc, inArray, and } from 'drizzle-orm';
import { db } from '../db';
import { 
  productCategories, 
  products, 
  systemFeatures,
  productFeatureAssociations, 
  productPricing,
  userProductSubscriptions,
  insertProductCategorySchema,
  insertProductSchema,
  updateProductSchema,
  insertSystemFeatureSchema,
  insertProductFeatureAssociationSchema,
  insertProductPricingSchema,
  ProductCategory,
  Product,
  SystemFeature,
  ProductFeatureAssociation,
  ProductPricing
} from '../../shared/product-catalog-schema';

const router = Router();

// Middleware for authentication (reuse existing auth middleware)
const requireAuth = (req: any, res: any, next: any) => {
  console.log('Auth check:', { hasUser: !!req.user, userId: req.user?.id });
  if (!req.user) {
    console.log('Authentication failed - no user');
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

const requireAdmin = (req: any, res: any, next: any) => {
  console.log('Admin check:', { hasUser: !!req.user, roleId: req.user?.roleId });
  if (!req.user || req.user.roleId !== 3) {
    console.log('Admin access denied - insufficient permissions');
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// ==============================
// PRODUCT CATEGORIES ENDPOINTS
// ==============================

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await db
      .select()
      .from(productCategories)
      .where(eq(productCategories.isActive, true))
      .orderBy(asc(productCategories.sortOrder), asc(productCategories.name));
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create category (admin only)
router.post('/admin/categories', requireAuth, requireAdmin, async (req, res) => {
  try {
    const categoryData = insertProductCategorySchema.parse(req.body);
    const [category] = await db.insert(productCategories).values(categoryData).returning();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update category (admin only)
router.put('/admin/categories/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoryData = insertProductCategorySchema.parse(req.body);
    
    const [category] = await db
      .update(productCategories)
      .set({ ...categoryData, updatedAt: new Date() })
      .where(eq(productCategories.id, id))
      .returning();
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete category (admin only)
router.delete('/admin/categories/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Soft delete by setting isActive to false
    const [category] = await db
      .update(productCategories)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(productCategories.id, id))
      .returning();
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// ==============================
// PRODUCTS ENDPOINTS
// ==============================

// Get products by category
router.get('/categories/:categoryId/products', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    
    const productsWithPricing = await db
      .select({
        id: products.id,
        categoryId: products.categoryId,
        name: products.name,
        description: products.description,
        basePrice: products.basePrice,
        billingType: products.billingType,
        targetUsers: products.targetUsers,
        isActive: products.isActive,
        sortOrder: products.sortOrder,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        pricing: {
          id: productPricing.id,
          tierName: productPricing.tierName,
          price: productPricing.price,
          billingCycle: productPricing.billingCycle,
          minQuantity: productPricing.minQuantity,
          maxQuantity: productPricing.maxQuantity,
          discountPercentage: productPricing.discountPercentage,
          isActive: productPricing.isActive
        }
      })
      .from(products)
      .leftJoin(productPricing, eq(products.id, productPricing.productId))
      .where(eq(products.categoryId, categoryId))
      .orderBy(asc(products.sortOrder), asc(products.name));
    
    // Group pricing tiers by product
    const productMap = new Map();
    productsWithPricing.forEach(row => {
      if (!productMap.has(row.id)) {
        productMap.set(row.id, {
          ...row,
          pricing: []
        });
      }
      if (row.pricing.id) {
        productMap.get(row.id).pricing.push(row.pricing);
      }
    });
    
    res.json(Array.from(productMap.values()));
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get all products (admin only)
router.get('/admin/products', requireAuth, requireAdmin, async (req, res) => {
  try {
    const allProducts = await db
      .select({
        product: products,
        category: {
          id: productCategories.id,
          name: productCategories.name
        }
      })
      .from(products)
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
      .orderBy(desc(products.createdAt));
    
    res.json(allProducts);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create product (admin only)
router.post('/admin/products', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { selectedFeatures, ...productData } = req.body;
    const validatedProductData = insertProductSchema.parse(productData);
    
    // Create the product
    const [product] = await db.insert(products).values(validatedProductData).returning();
    
    // Associate selected features with the product
    if (selectedFeatures && selectedFeatures.length > 0) {
      // Update the productId for selected features
      await db
        .update(productFeatures)
        .set({ productId: product.id })
        .where(inArray(productFeatures.id, selectedFeatures));
    }
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (admin only)
router.put('/admin/products/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { selectedFeatures, categoryId, name, ...productDataRaw } = req.body;
    
    console.log('Update product request body:', JSON.stringify(req.body, null, 2));
    console.log('Product data raw after exclusions:', JSON.stringify(productDataRaw, null, 2));
    
    // Use update schema that excludes categoryId and name 
    const productData = updateProductSchema.parse(productDataRaw);
    
    // Update the product
    const [product] = await db
      .update(products)
      .set({ ...productData, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Handle feature associations
    if (selectedFeatures !== undefined) {
      // First, clear existing feature associations for this product
      await db
        .delete(productFeatureAssociations)
        .where(eq(productFeatureAssociations.productId, id));
      
      // Then create new associations for selected features
      if (selectedFeatures && selectedFeatures.length > 0) {
        const associations = selectedFeatures.map((featureId: number) => ({
          productId: id,
          featureId,
          isIncluded: true,
          additionalCost: 0,
          sortOrder: 0
        }));
        
        await db
          .insert(productFeatureAssociations)
          .values(associations);
      }
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (admin only)
router.delete('/admin/products/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const [product] = await db
      .update(products)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==============================
// PRODUCT FEATURES ENDPOINTS
// ==============================

// Get product feature associations with full feature details
router.get('/:productId/features', requireAuth, requireAdmin, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    
    console.log('Fetching features for product:', productId);
    console.log('User authenticated:', !!req.user);
    console.log('User role:', req.user?.roleId);
    
    const associations = await db
      .select({
        id: productFeatureAssociations.id,
        productId: productFeatureAssociations.productId,
        featureId: productFeatureAssociations.featureId,
        limitValue: productFeatureAssociations.limitValue,
        limitDuration: productFeatureAssociations.limitDuration,
        limitSize: productFeatureAssociations.limitSize,
        limitFrequency: productFeatureAssociations.limitFrequency,
        frequencyPeriod: productFeatureAssociations.frequencyPeriod,
        constraintConfig: productFeatureAssociations.constraintConfig,
        isIncluded: productFeatureAssociations.isIncluded,
        additionalCost: productFeatureAssociations.additionalCost,
        sortOrder: productFeatureAssociations.sortOrder,
        feature: {
          id: systemFeatures.id,
          name: systemFeatures.name,
          description: systemFeatures.description,
          capability: systemFeatures.capability,
          limitType: systemFeatures.limitType,
          isActive: systemFeatures.isActive
        }
      })
      .from(productFeatureAssociations)
      .innerJoin(systemFeatures, eq(productFeatureAssociations.featureId, systemFeatures.id))
      .where(eq(productFeatureAssociations.productId, productId))
      .orderBy(asc(productFeatureAssociations.sortOrder), asc(systemFeatures.name));
    
    console.log('Found associations:', associations.length);
    if (associations.length > 0) {
      console.log('Sample association:', JSON.stringify(associations[0], null, 2));
    }
    
    // Ensure we're returning JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(associations);
  } catch (error) {
    console.error('Error fetching product features:', error);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

// Get all system features 
router.get('/features', async (req, res) => {
  try {
    const features = await db
      .select()
      .from(systemFeatures)
      .where(eq(systemFeatures.isActive, true))
      .orderBy(asc(systemFeatures.sortOrder), asc(systemFeatures.name));
    
    res.json(features);
  } catch (error) {
    console.error('Error fetching system features:', error);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

// Clean up feature data (remove quotes from names and descriptions)
router.post('/features/cleanup', requireAuth, requireAdmin, async (req, res) => {
  try {
    // Get all features
    const allFeatures = await db.select().from(productFeatures);
    
    let updatedCount = 0;
    
    // Process each feature
    for (const feature of allFeatures) {
      let needsUpdate = false;
      const updates: any = {};
      
      // Clean up name if it has quotes
      if (typeof feature.name === 'string' && (feature.name.startsWith('"') || feature.name.endsWith('"'))) {
        updates.name = feature.name.replace(/^"|"$/g, '');
        needsUpdate = true;
      }
      
      // Clean up description if it has quotes
      if (typeof feature.description === 'string' && (feature.description.startsWith('"') || feature.description.endsWith('"'))) {
        updates.description = feature.description.replace(/^"|"$/g, '');
        needsUpdate = true;
      }
      
      // Update the feature if needed
      if (needsUpdate) {
        await db
          .update(productFeatures)
          .set({ ...updates, updatedAt: new Date() })
          .where(eq(productFeatures.id, feature.id));
        updatedCount++;
      }
    }
    
    res.json({ 
      message: `Successfully cleaned up ${updatedCount} features`,
      totalFeatures: allFeatures.length,
      updatedFeatures: updatedCount
    });
  } catch (error) {
    console.error('Error cleaning up features:', error);
    res.status(500).json({ error: 'Failed to clean up features' });
  }
});

// Create feature (admin only)
router.post('/admin/products/:productId/features', requireAuth, requireAdmin, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const featureData = insertProductFeatureSchema.parse({ ...req.body, productId });
    
    const [feature] = await db.insert(productFeatures).values(featureData).returning();
    res.status(201).json(feature);
  } catch (error) {
    console.error('Error creating feature:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create feature' });
  }
});

// Create feature for specific product (admin only) - frontend endpoint
router.post('/:productId/features', requireAuth, requireAdmin, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    
    console.log('Creating feature association for product:', productId);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const associationData = insertProductFeatureAssociationSchema.parse({ 
      ...req.body, 
      productId 
    });
    
    console.log('Parsed association data:', JSON.stringify(associationData, null, 2));
    
    const [association] = await db.insert(productFeatureAssociations).values(associationData).returning();
    
    console.log('Created association:', JSON.stringify(association, null, 2));
    
    // Fetch the full association with feature details
    const fullAssociation = await db
      .select({
        id: productFeatureAssociations.id,
        productId: productFeatureAssociations.productId,
        featureId: productFeatureAssociations.featureId,
        limitValue: productFeatureAssociations.limitValue,
        limitDuration: productFeatureAssociations.limitDuration,
        limitSize: productFeatureAssociations.limitSize,
        limitFrequency: productFeatureAssociations.limitFrequency,
        frequencyPeriod: productFeatureAssociations.frequencyPeriod,
        isIncluded: productFeatureAssociations.isIncluded,
        additionalCost: productFeatureAssociations.additionalCost,
        feature: {
          id: systemFeatures.id,
          name: systemFeatures.name,
          description: systemFeatures.description,
          capability: systemFeatures.capability,
          limitType: systemFeatures.limitType,
          isActive: systemFeatures.isActive
        }
      })
      .from(productFeatureAssociations)
      .innerJoin(systemFeatures, eq(productFeatureAssociations.featureId, systemFeatures.id))
      .where(eq(productFeatureAssociations.id, association.id))
      .limit(1);
    
    console.log('Full association with feature:', JSON.stringify(fullAssociation[0], null, 2));
    
    res.status(201).json(fullAssociation[0]);
  } catch (error) {
    console.error('Error creating product feature association:', error);
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors);
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create product feature association' });
  }
});

// Update feature by ID (admin only)
router.put('/features/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const featureData = insertProductFeatureSchema.parse(req.body);
    
    const [feature] = await db
      .update(productFeatures)
      .set({ ...featureData, updatedAt: new Date() })
      .where(eq(productFeatures.id, id))
      .returning();
    
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    res.json(feature);
  } catch (error) {
    console.error('Error updating feature:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

// Delete feature by ID (admin only)
router.delete('/features/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const [feature] = await db
      .delete(productFeatures)
      .where(eq(productFeatures.id, id))
      .returning();
    
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error('Error deleting feature:', error);
    res.status(500).json({ error: 'Failed to delete feature' });
  }
});

// Update feature (admin only) - legacy endpoint
router.put('/admin/features/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const featureData = insertProductFeatureSchema.parse(req.body);
    
    const [feature] = await db
      .update(productFeatures)
      .set({ ...featureData, updatedAt: new Date() })
      .where(eq(productFeatures.id, id))
      .returning();
    
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    res.json(feature);
  } catch (error) {
    console.error('Error updating feature:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

// Update feature (admin only) - alternative path for frontend
router.put('/features/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const featureData = insertSystemFeatureSchema.parse(req.body);
    
    const [feature] = await db
      .update(systemFeatures)
      .set({ ...featureData, updatedAt: new Date() })
      .where(eq(systemFeatures.id, id))
      .returning();
    
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    res.json(feature);
  } catch (error) {
    console.error('Error updating system feature:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

// Update feature for specific product (admin only)
router.put('/:productId/features/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);
    const associationData = insertProductFeatureAssociationSchema.parse({ ...req.body, productId });
    
    const [association] = await db
      .update(productFeatureAssociations)
      .set({ ...associationData, updatedAt: new Date() })
      .where(and(eq(productFeatureAssociations.id, id), eq(productFeatureAssociations.productId, productId)))
      .returning();
    
    if (!association) {
      return res.status(404).json({ error: 'Feature association not found' });
    }
    
    // Fetch the full association with feature details
    const fullAssociation = await db
      .select({
        id: productFeatureAssociations.id,
        productId: productFeatureAssociations.productId,
        featureId: productFeatureAssociations.featureId,
        limitValue: productFeatureAssociations.limitValue,
        limitDuration: productFeatureAssociations.limitDuration,
        limitSize: productFeatureAssociations.limitSize,
        limitFrequency: productFeatureAssociations.limitFrequency,
        frequencyPeriod: productFeatureAssociations.frequencyPeriod,
        isIncluded: productFeatureAssociations.isIncluded,
        additionalCost: productFeatureAssociations.additionalCost,
        feature: {
          id: systemFeatures.id,
          name: systemFeatures.name,
          description: systemFeatures.description,
          capability: systemFeatures.capability,
          limitType: systemFeatures.limitType,
          isActive: systemFeatures.isActive
        }
      })
      .from(productFeatureAssociations)
      .innerJoin(systemFeatures, eq(productFeatureAssociations.featureId, systemFeatures.id))
      .where(eq(productFeatureAssociations.id, association.id))
      .limit(1);
    
    res.json(fullAssociation[0]);
  } catch (error) {
    console.error('Error updating product feature association:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update product feature association' });
  }
});

// Delete feature (admin only)
router.delete('/admin/features/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    await db.delete(productFeatures).where(eq(productFeatures.id, id));
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error('Error deleting feature:', error);
    res.status(500).json({ error: 'Failed to delete feature' });
  }
});

// Delete feature for specific product (admin only)
router.delete('/:productId/features/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);
    
    const result = await db
      .delete(productFeatureAssociations)
      .where(and(eq(productFeatureAssociations.id, id), eq(productFeatureAssociations.productId, productId)))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Feature association not found' });
    }
    
    res.json({ message: 'Feature association deleted successfully' });
  } catch (error) {
    console.error('Error deleting product feature association:', error);
    res.status(500).json({ error: 'Failed to delete product feature association' });
  }
});

// ==============================
// PRODUCT PRICING ENDPOINTS
// ==============================

// Get product pricing tiers
router.get('/:productId/pricing', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    
    const pricing = await db
      .select()
      .from(productPricing)
      .where(eq(productPricing.productId, productId))
      .orderBy(asc(productPricing.price));
    
    res.json(pricing);
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({ error: 'Failed to fetch pricing' });
  }
});

// Create pricing tier (admin only)
router.post('/admin/products/:productId/pricing', requireAuth, requireAdmin, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const pricingData = insertProductPricingSchema.parse({ ...req.body, productId });
    
    const [pricing] = await db.insert(productPricing).values(pricingData).returning();
    res.status(201).json(pricing);
  } catch (error) {
    console.error('Error creating pricing:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create pricing' });
  }
});

// Update pricing tier (admin only)
router.put('/admin/pricing/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pricingData = insertProductPricingSchema.parse(req.body);
    
    const [pricing] = await db
      .update(productPricing)
      .set({ ...pricingData, updatedAt: new Date() })
      .where(eq(productPricing.id, id))
      .returning();
    
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }
    
    res.json(pricing);
  } catch (error) {
    console.error('Error updating pricing:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update pricing' });
  }
});

// Delete pricing tier (admin only)
router.delete('/admin/pricing/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    await db.delete(productPricing).where(eq(productPricing.id, id));
    res.json({ message: 'Pricing deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing:', error);
    res.status(500).json({ error: 'Failed to delete pricing' });
  }
});

// ==============================
// USER SUBSCRIPTIONS ENDPOINTS
// ==============================

// Get user's subscriptions
router.get('/user/subscriptions', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const subscriptions = await db
      .select({
        subscription: userProductSubscriptions,
        product: {
          id: products.id,
          name: products.name,
          description: products.description,
          billingType: products.billingType
        },
        category: {
          id: productCategories.id,
          name: productCategories.name
        },
        pricing: {
          tierName: productPricing.tierName,
          price: productPricing.price,
          billingCycle: productPricing.billingCycle
        }
      })
      .from(userProductSubscriptions)
      .leftJoin(products, eq(userProductSubscriptions.productId, products.id))
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
      .leftJoin(productPricing, eq(userProductSubscriptions.pricingId, productPricing.id))
      .where(eq(userProductSubscriptions.userId, userId))
      .orderBy(desc(userProductSubscriptions.createdAt));
    
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// Subscribe to product
router.post('/user/subscribe', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, pricingId, autoRenew } = req.body;
    
    // Check if user already has active subscription for this product
    const existingSubscription = await db
      .select()
      .from(userProductSubscriptions)
      .where(eq(userProductSubscriptions.userId, userId))
      .where(eq(userProductSubscriptions.productId, productId))
      .where(eq(userProductSubscriptions.isActive, true))
      .limit(1);
    
    if (existingSubscription.length > 0) {
      return res.status(400).json({ error: 'User already has active subscription for this product' });
    }
    
    // Get pricing info to set end date
    const [pricing] = await db
      .select()
      .from(productPricing)
      .where(eq(productPricing.id, pricingId))
      .limit(1);
    
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing tier not found' });
    }
    
    // Calculate end date based on billing cycle
    const startDate = new Date();
    const endDate = pricing.billingCycle 
      ? new Date(startDate.getTime() + pricing.billingCycle * 24 * 60 * 60 * 1000)
      : null;
    
    const subscriptionData = {
      userId,
      productId,
      pricingId,
      startDate,
      endDate,
      isActive: true,
      autoRenew: autoRenew || false,
      usageCount: 0
    };
    
    const [subscription] = await db.insert(userProductSubscriptions).values(subscriptionData).returning();
    res.status(201).json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// Normalize similar features (admin only)
router.post('/admin/features/normalize', requireAuth, requireAdmin, async (req, res) => {
  try {
    console.log('Starting feature normalization...');
    
    // Define normalization groups
    const normalizationGroups = [
      {
        baseName: "Photo Upload",
        baseDescription: "Upload photos for your listings",
        featureIds: [1, 38, 40], // Features with IDs to normalize
        keepPrimary: 1 // Keep feature ID 1 as primary
      },
      {
        baseName: "Video Upload", 
        baseDescription: "Upload video content for your listings",
        featureIds: [44],
        keepPrimary: 44
      },
      {
        baseName: "Listing Duration",
        baseDescription: "How long your listing stays active", 
        featureIds: [2, 39, 42],
        keepPrimary: 42 // Keep the cleaner "Listing Duration" name
      },
      {
        baseName: "Featured Placement",
        baseDescription: "Priority placement for your listings",
        featureIds: [41, 43], // Featured Listing and Priority Placement
        keepPrimary: 43 // Keep Priority Placement as it's clearer
      }
    ];
    
    const results = [];
    
    for (const group of normalizationGroups) {
      console.log(`Processing group: ${group.baseName}`);
      
      // Get all features in this group
      const features = await db.query.productFeatures.findMany({
        where: inArray(productFeatures.id, group.featureIds)
      });
      
      if (features.length === 0) {
        console.log(`No features found for group ${group.baseName}`);
        continue;
      }
      
      // Update the primary feature with standardized name and description
      const primaryUpdated = await db
        .update(productFeatures)
        .set({
          name: group.baseName,
          description: group.baseDescription,
          updatedAt: new Date()
        })
        .where(eq(productFeatures.id, group.keepPrimary))
        .returning();
      
      // Mark duplicate features for review/removal
      const duplicateIds = group.featureIds.filter(id => id !== group.keepPrimary);
      
      if (duplicateIds.length > 0) {
        const duplicatesUpdated = await db
          .update(productFeatures)
          .set({
            name: sql`'[DUPLICATE] ' || name`,
            description: sql`'[NORMALIZED - This feature has been consolidated. Consider removing.] ' || description`,
            updatedAt: new Date()
          })
          .where(inArray(productFeatures.id, duplicateIds))
          .returning();
        
        results.push({
          group: group.baseName,
          primaryFeature: primaryUpdated[0],
          duplicatesMarked: duplicatesUpdated.length
        });
      } else {
        results.push({
          group: group.baseName,
          primaryFeature: primaryUpdated[0],
          duplicatesMarked: 0
        });
      }
      
      console.log(`Completed normalization for ${group.baseName}`);
    }
    
    res.json({
      success: true,
      message: 'Feature normalization completed successfully',
      results
    });
    
  } catch (error) {
    console.error('Error during feature normalization:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to normalize features',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Debug export structure
console.log('Product catalog routes module loaded');
export default router;