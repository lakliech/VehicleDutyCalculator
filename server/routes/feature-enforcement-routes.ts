import { Router } from 'express';
import { featureEnforcement } from '../services/feature-enforcement';
import { db } from '../db';
import { systemFeatures, productFeatureAssociations, products } from '../../shared/product-catalog-schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

const router = Router();

// Feature management schema
const featureSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  limitType: z.enum(['count', 'duration', 'size', 'frequency', 'concurrent', 'boolean', 'unlimited']),
  limitValue: z.number().optional(),
  limitDuration: z.number().optional(),
  limitSize: z.number().optional(),
  limitFrequency: z.number().optional(),
  frequencyPeriod: z.number().optional(),
  constraintConfig: z.record(z.any()).optional(),
  isIncluded: z.boolean().default(true),
  additionalCost: z.number().default(0),
  sortOrder: z.number().default(0),
});

// Middleware for authentication
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Get user's feature summary
router.get('/user/features', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const summary = await featureEnforcement.getUserFeatureSummary(userId);
    res.json(summary);
  } catch (error) {
    console.error('Error getting user features:', error);
    res.status(500).json({ error: 'Failed to get user features' });
  }
});

// Check photo upload limit
router.post('/check/photo-upload', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPhotoCount } = req.body;
    
    const result = await featureEnforcement.checkPhotoUploadLimit(userId, currentPhotoCount || 0);
    res.json(result);
  } catch (error) {
    console.error('Error checking photo upload limit:', error);
    res.status(500).json({ error: 'Failed to check photo upload limit' });
  }
});

// Check listing creation limit
router.post('/check/listing-creation', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentListingCount } = req.body;
    
    const result = await featureEnforcement.checkListingCreationLimit(userId, currentListingCount || 0);
    res.json(result);
  } catch (error) {
    console.error('Error checking listing creation limit:', error);
    res.status(500).json({ error: 'Failed to check listing creation limit' });
  }
});

// Check listing duration limit
router.get('/check/listing-duration', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await featureEnforcement.checkListingDurationLimit(userId);
    res.json(result);
  } catch (error) {
    console.error('Error checking listing duration limit:', error);
    res.status(500).json({ error: 'Failed to check listing duration limit' });
  }
});

// Check boost limit
router.post('/check/boost', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentBoostCount } = req.body;
    
    const result = await featureEnforcement.checkBoostLimit(userId, currentBoostCount || 0);
    res.json(result);
  } catch (error) {
    console.error('Error checking boost limit:', error);
    res.status(500).json({ error: 'Failed to check boost limit' });
  }
});

// Check premium feature access
router.post('/check/premium-feature', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { featureName } = req.body;
    
    const result = await featureEnforcement.checkPremiumFeatureAccess(userId, featureName);
    res.json(result);
  } catch (error) {
    console.error('Error checking premium feature access:', error);
    res.status(500).json({ error: 'Failed to check premium feature access' });
  }
});

// === FEATURE MANAGEMENT ROUTES ===

// Get features for a product
router.get('/products/:productId/features', requireAuth, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const features = await db
      .select({
        id: productFeatureAssociations.id,
        productId: productFeatureAssociations.productId,
        featureId: productFeatureAssociations.featureId,
        name: systemFeatures.name,
        description: systemFeatures.description,
        capability: systemFeatures.capability,
        limitType: systemFeatures.limitType,
        limitValue: productFeatureAssociations.limitValue,
        limitDuration: productFeatureAssociations.limitDuration,
        limitSize: productFeatureAssociations.limitSize,
        limitFrequency: productFeatureAssociations.limitFrequency,
        frequencyPeriod: productFeatureAssociations.frequencyPeriod,
        constraintConfig: productFeatureAssociations.constraintConfig,
        isIncluded: productFeatureAssociations.isIncluded,
        additionalCost: productFeatureAssociations.additionalCost,
        sortOrder: productFeatureAssociations.sortOrder,
      })
      .from(productFeatureAssociations)
      .innerJoin(systemFeatures, eq(productFeatureAssociations.featureId, systemFeatures.id))
      .where(eq(productFeatureAssociations.productId, productId))
      .orderBy(productFeatureAssociations.sortOrder, systemFeatures.name);

    res.json(features);
  } catch (error) {
    console.error('Error getting product features:', error);
    res.status(500).json({ error: 'Failed to get product features' });
  }
});

// Create a new feature for a product
router.post('/products/:productId/features', requireAuth, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const validatedData = featureSchema.parse(req.body);
    
    // Verify product exists
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create system feature first
    const [systemFeature] = await db
      .insert(systemFeatures)
      .values({
        name: validatedData.name,
        description: validatedData.description,
        capability: validatedData.name.toLowerCase().replace(/\s+/g, '_'),
        limitType: validatedData.limitType,
        isActive: true,
        sortOrder: validatedData.sortOrder || 0,
      })
      .returning();

    // Create product-feature association
    const [newAssociation] = await db
      .insert(productFeatureAssociations)
      .values({
        productId,
        featureId: systemFeature.id,
        limitValue: validatedData.limitValue,
        limitDuration: validatedData.limitDuration,
        limitSize: validatedData.limitSize,
        limitFrequency: validatedData.limitFrequency,
        frequencyPeriod: validatedData.frequencyPeriod,
        constraintConfig: validatedData.constraintConfig,
        isIncluded: validatedData.isIncluded,
        additionalCost: validatedData.additionalCost.toString(),
        sortOrder: validatedData.sortOrder || 0,
      })
      .returning();

    // Return combined result
    const result = {
      id: newAssociation.id,
      productId: newAssociation.productId,
      featureId: newAssociation.featureId,
      name: systemFeature.name,
      description: systemFeature.description,
      capability: systemFeature.capability,
      limitType: systemFeature.limitType,
      limitValue: newAssociation.limitValue,
      limitDuration: newAssociation.limitDuration,
      limitSize: newAssociation.limitSize,
      limitFrequency: newAssociation.limitFrequency,
      frequencyPeriod: newAssociation.frequencyPeriod,
      constraintConfig: newAssociation.constraintConfig,
      isIncluded: newAssociation.isIncluded,
      additionalCost: newAssociation.additionalCost,
      sortOrder: newAssociation.sortOrder,
    };

    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating feature:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid feature data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create feature' });
  }
});

// Update a feature
router.put('/products/:productId/features/:featureId', requireAuth, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const featureId = parseInt(req.params.featureId);
    
    if (isNaN(productId) || isNaN(featureId)) {
      return res.status(400).json({ error: 'Invalid product ID or feature ID' });
    }

    const validatedData = featureSchema.parse(req.body);

    // Update the product-feature association
    const [updatedAssociation] = await db
      .update(productFeatureAssociations)
      .set({
        limitValue: validatedData.limitValue,
        limitDuration: validatedData.limitDuration,
        limitSize: validatedData.limitSize,
        limitFrequency: validatedData.limitFrequency,
        frequencyPeriod: validatedData.frequencyPeriod,
        constraintConfig: validatedData.constraintConfig,
        isIncluded: validatedData.isIncluded,
        additionalCost: validatedData.additionalCost.toString(),
        sortOrder: validatedData.sortOrder || 0,
        updatedAt: new Date(),
      })
      .where(and(
        eq(productFeatureAssociations.id, featureId),
        eq(productFeatureAssociations.productId, productId)
      ))
      .returning();

    if (!updatedAssociation) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    // Get the updated system feature details
    const [systemFeature] = await db
      .select()
      .from(systemFeatures)
      .where(eq(systemFeatures.id, updatedAssociation.featureId))
      .limit(1);

    // Update system feature if needed
    if (systemFeature) {
      await db
        .update(systemFeatures)
        .set({
          name: validatedData.name,
          description: validatedData.description,
          limitType: validatedData.limitType,
          updatedAt: new Date(),
        })
        .where(eq(systemFeatures.id, systemFeature.id));
    }

    // Return combined result
    const updatedFeature = {
      id: updatedAssociation.id,
      productId: updatedAssociation.productId,
      featureId: updatedAssociation.featureId,
      name: validatedData.name,
      description: validatedData.description,
      limitType: validatedData.limitType,
      limitValue: updatedAssociation.limitValue,
      limitDuration: updatedAssociation.limitDuration,
      limitSize: updatedAssociation.limitSize,
      limitFrequency: updatedAssociation.limitFrequency,
      frequencyPeriod: updatedAssociation.frequencyPeriod,
      constraintConfig: updatedAssociation.constraintConfig,
      isIncluded: updatedAssociation.isIncluded,
      additionalCost: updatedAssociation.additionalCost,
      sortOrder: updatedAssociation.sortOrder,
    };

    res.json(updatedFeature);
  } catch (error) {
    console.error('Error updating feature:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid feature data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

// Delete a feature
router.delete('/products/:productId/features/:featureId', requireAuth, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const featureId = parseInt(req.params.featureId);
    
    if (isNaN(productId) || isNaN(featureId)) {
      return res.status(400).json({ error: 'Invalid product ID or feature ID' });
    }

    const [deletedAssociation] = await db
      .delete(productFeatureAssociations)
      .where(and(
        eq(productFeatureAssociations.id, featureId),
        eq(productFeatureAssociations.productId, productId)
      ))
      .returning();

    if (!deletedAssociation) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error('Error deleting feature:', error);
    res.status(500).json({ error: 'Failed to delete feature' });
  }
});

export default router;