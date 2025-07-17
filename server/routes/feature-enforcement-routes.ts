import { Router } from 'express';
import { featureEnforcement } from '../services/feature-enforcement';

const router = Router();

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

export default router;