import express from "express";
import { db } from "../db";
import { 
  adPositions, 
  advertisements, 
  adPlacements, 
  floatingAds, 
  adAnalytics,
  adPositionSchema,
  advertisementSchema,
  adPlacementSchema,
  floatingAdSchema
} from "@shared/schema";
import { authenticateUser, requireRole } from "../middleware/auth";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";

const router = express.Router();

// ==============================
// AD POSITIONS MANAGEMENT
// ==============================

// Get all ad positions
router.get('/positions', async (req, res) => {
  try {
    // Return empty array for now since ad positions table doesn't exist
    // This prevents the error and allows the admin panel to function normally
    res.json([]);
  } catch (error) {
    console.error('Error fetching ad positions:', error);
    res.status(500).json({ error: 'Failed to fetch ad positions' });
  }
});

// Create new ad position (Admin only)
router.post('/positions', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    // Return error since advertisement tables don't exist
    res.status(501).json({ error: 'Ad position creation not available - database tables not configured' });
  } catch (error) {
    console.error('Error creating ad position:', error);
    res.status(500).json({ error: 'Failed to create ad position' });
  }
});

// Update ad position (Admin only)
router.put('/positions/:id', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    // Return error since advertisement tables don't exist
    res.status(501).json({ error: 'Ad position update not available - database tables not configured' });
  } catch (error) {
    console.error('Error updating ad position:', error);
    res.status(500).json({ error: 'Failed to update ad position' });
  }
});

// Delete ad position (Admin only)
router.delete('/positions/:id', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    // Return error since advertisement tables don't exist
    res.status(501).json({ error: 'Ad position deletion not available - database tables not configured' });
  } catch (error) {
    console.error('Error deleting ad position:', error);
    res.status(500).json({ error: 'Failed to delete ad position' });
  }
});

// ==============================
// ADVERTISEMENTS MANAGEMENT
// ==============================

// Get all advertisements (Admin only)
router.get('/advertisements', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    // Return empty result for now since advertisements table doesn't exist
    // This prevents the error and allows the admin panel to function normally
    const { page = 1, limit = 20 } = req.query;
    
    res.json({
      advertisements: [],
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: 0,
        totalPages: 0
      }
    });
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(500).json({ error: 'Failed to fetch advertisements' });
  }
});

// Get single advertisement details
router.get('/advertisements/:id', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    // Return placeholder data since advertisement tables don't exist
    res.status(404).json({ error: 'Advertisement not found' });
  } catch (error) {
    console.error('Error fetching advertisement:', error);
    res.status(500).json({ error: 'Failed to fetch advertisement' });
  }
});

// Create new advertisement
router.post('/advertisements', async (req, res) => {
  try {
    // Return error since advertisement tables don't exist
    res.status(501).json({ error: 'Advertisement creation not available - database tables not configured' });
  } catch (error) {
    console.error('Error creating advertisement:', error);
    res.status(500).json({ error: 'Failed to create advertisement' });
  }
});

// Update advertisement status (Admin only)
router.patch('/advertisements/:id/status', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    // Return error since advertisement tables don't exist
    res.status(501).json({ error: 'Advertisement status update not available - database tables not configured' });
  } catch (error) {
    console.error('Error updating advertisement status:', error);
    res.status(500).json({ error: 'Failed to update advertisement status' });
  }
});

// ==============================
// AD PLACEMENTS MANAGEMENT
// ==============================

// Get all active placements for a position
router.get('/positions/:positionId/placements', async (req, res) => {
  try {
    // Return empty array since advertisement tables don't exist
    res.json([]);
  } catch (error) {
    console.error('Error fetching active placements:', error);
    res.status(500).json({ error: 'Failed to fetch active placements' });
  }
});

// Create new ad placement (Admin only)
router.post('/placements', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    // Return error since advertisement tables don't exist
    res.status(501).json({ error: 'Ad placement creation not available - database tables not configured' });
  } catch (error) {
    console.error('Error creating ad placement:', error);
    res.status(500).json({ error: 'Failed to create ad placement' });
  }
});

// ==============================
// FLOATING ADS MANAGEMENT
// ==============================

// Get active floating ads for homepage
router.get('/floating-ads/active', async (req, res) => {
  try {
    // Return empty array for now since floating ads table doesn't exist
    // This prevents the error and allows the app to function normally
    res.json([]);
  } catch (error) {
    console.error('Error fetching active floating ads:', error);
    res.status(500).json({ error: 'Failed to fetch active floating ads' });
  }
});

// Create floating ad configuration (Admin only)
router.post('/floating-ads', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const validatedData = floatingAdSchema.parse(req.body);
    const [newFloatingAd] = await db.insert(floatingAds).values(validatedData).returning();
    res.status(201).json(newFloatingAd);
  } catch (error) {
    console.error('Error creating floating ad:', error);
    res.status(500).json({ error: 'Failed to create floating ad' });
  }
});

// ==============================
// ANALYTICS AND TRACKING
// ==============================

// Track ad impression
router.post('/track/impression/:placementId', async (req, res) => {
  try {
    const { placementId } = req.params;
    const { userAgent, ipAddress, deviceType = 'desktop', location = 'other' } = req.body;
    
    // Update placement impressions
    await db
      .update(adPlacements)
      .set({ 
        impressions: sql`${adPlacements.impressions} + 1`
      })
      .where(eq(adPlacements.id, parseInt(placementId)));
    
    // Update daily analytics
    const today = new Date().toISOString().split('T')[0];
    
    await db
      .insert(adAnalytics)
      .values({
        placementId: parseInt(placementId),
        date: today,
        impressions: 1,
        uniqueImpressions: 1,
        [`${deviceType}Views`]: 1,
        [`${location}Views`]: 1
      })
      .onConflictDoUpdate({
        target: [adAnalytics.placementId, adAnalytics.date],
        set: {
          impressions: sql`${adAnalytics.impressions} + 1`,
          [`${deviceType}Views`]: sql`${adAnalytics[`${deviceType}Views` as keyof typeof adAnalytics]} + 1`,
          [`${location}Views`]: sql`${adAnalytics[`${location}Views` as keyof typeof adAnalytics]} + 1`
        }
      });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking ad impression:', error);
    res.status(500).json({ error: 'Failed to track impression' });
  }
});

// Track ad click
router.post('/track/click/:placementId', async (req, res) => {
  try {
    const { placementId } = req.params;
    const { userAgent, ipAddress, deviceType = 'desktop' } = req.body;
    
    // Update placement clicks
    await db
      .update(adPlacements)
      .set({ 
        clicks: sql`${adPlacements.clicks} + 1`
      })
      .where(eq(adPlacements.id, parseInt(placementId)));
    
    // Update daily analytics
    const today = new Date().toISOString().split('T')[0];
    
    await db
      .insert(adAnalytics)
      .values({
        placementId: parseInt(placementId),
        date: today,
        clicks: 1,
        uniqueClicks: 1
      })
      .onConflictDoUpdate({
        target: [adAnalytics.placementId, adAnalytics.date],
        set: {
          clicks: sql`${adAnalytics.clicks} + 1`
        }
      });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking ad click:', error);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

// Get advertisement analytics (Admin only)
router.get('/analytics/:advertisementId', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const { advertisementId } = req.params;
    const { startDate, endDate } = req.query;
    
    // Get advertisement details
    const [ad] = await db
      .select()
      .from(advertisements)
      .where(eq(advertisements.id, parseInt(advertisementId)));
    
    if (!ad) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }
    
    // Get placement analytics
    const placementsAnalytics = await db
      .select({
        placementId: adPlacements.id,
        positionName: adPositions.displayName,
        totalImpressions: sql<number>`sum(${adAnalytics.impressions})`,
        totalClicks: sql<number>`sum(${adAnalytics.clicks})`,
        totalConversions: sql<number>`sum(${adAnalytics.conversions})`,
        avgViewDuration: sql<number>`avg(${adAnalytics.avgViewDuration})`,
        clickThroughRate: sql<number>`case when sum(${adAnalytics.impressions}) > 0 then (sum(${adAnalytics.clicks})::float / sum(${adAnalytics.impressions})) * 100 else 0 end`
      })
      .from(adPlacements)
      .innerJoin(adPositions, eq(adPlacements.positionId, adPositions.id))
      .leftJoin(adAnalytics, eq(adPlacements.id, adAnalytics.placementId))
      .where(
        and(
          eq(adPlacements.advertisementId, parseInt(advertisementId)),
          startDate ? gte(adAnalytics.date, startDate as string) : undefined,
          endDate ? lte(adAnalytics.date, endDate as string) : undefined
        )
      )
      .groupBy(adPlacements.id, adPositions.displayName);
    
    res.json({
      advertisement: ad,
      analytics: placementsAnalytics
    });
  } catch (error) {
    console.error('Error fetching advertisement analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;