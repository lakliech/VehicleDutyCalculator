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
    const positions = await db.select().from(adPositions).orderBy(adPositions.sortOrder);
    res.json(positions);
  } catch (error) {
    console.error('Error fetching ad positions:', error);
    res.status(500).json({ error: 'Failed to fetch ad positions' });
  }
});

// Create new ad position (Admin only)
router.post('/positions', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const validatedData = adPositionSchema.parse(req.body);
    const [newPosition] = await db.insert(adPositions).values(validatedData).returning();
    res.status(201).json(newPosition);
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
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let query = db.select().from(advertisements);
    
    if (status && status !== 'all') {
      query = query.where(eq(advertisements.status, status as string));
    }
    
    const ads = await query
      .orderBy(desc(advertisements.createdAt))
      .limit(parseInt(limit as string))
      .offset(offset);
    
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(advertisements)
      .where(status && status !== 'all' ? eq(advertisements.status, status as string) : undefined);
    
    res.json({
      advertisements: ads,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: totalCount[0].count,
        totalPages: Math.ceil(totalCount[0].count / parseInt(limit as string))
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
    const validatedData = advertisementSchema.parse(req.body);
    const [newAd] = await db.insert(advertisements).values(validatedData).returning();
    res.status(201).json(newAd);
  } catch (error) {
    console.error('Error creating advertisement:', error);
    res.status(500).json({ error: 'Failed to create advertisement' });
  }
});

// Update advertisement status (Admin only)
router.patch('/advertisements/:id/status', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;
    const adminId = req.user?.id;
    
    const updateData: any = { 
      status, 
      updatedAt: new Date() 
    };
    
    if (status === 'approved') {
      updateData.approvedBy = adminId;
      updateData.approvedAt = new Date();
    } else if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    
    const [updatedAd] = await db
      .update(advertisements)
      .set(updateData)
      .where(eq(advertisements.id, parseInt(id)))
      .returning();
    
    if (!updatedAd) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }
    
    res.json(updatedAd);
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
    const { positionId } = req.params;
    const activePlacements = await db
      .select()
      .from(adPlacements)
      .where(
        and(
          eq(adPlacements.positionId, parseInt(positionId)),
          eq(adPlacements.isActive, true),
          lte(adPlacements.startDate, new Date()),
          gte(adPlacements.endDate, new Date())
        )
      )
      .orderBy(adPlacements.displayOrder);
    
    res.json(activePlacements);
  } catch (error) {
    console.error('Error fetching active placements:', error);
    res.status(500).json({ error: 'Failed to fetch active placements' });
  }
});

// Get all placements (Admin only)
router.get('/placements', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const placements = await db
      .select({
        id: adPlacements.id,
        advertisementId: adPlacements.advertisementId,
        positionId: adPlacements.positionId,
        startDate: adPlacements.startDate,
        endDate: adPlacements.endDate,
        isActive: adPlacements.isActive,
        displayOrder: adPlacements.displayOrder,
        showDuration: adPlacements.showDuration,
        impressions: adPlacements.impressions,
        clicks: adPlacements.clicks,
        conversions: adPlacements.conversions,
        periodType: adPlacements.periodType,
        periodsBooked: adPlacements.periodsBooked,
        totalCost: adPlacements.totalCost,
        amountPaid: adPlacements.amountPaid,
        paymentStatus: adPlacements.paymentStatus,
        createdAt: adPlacements.createdAt,
        updatedAt: adPlacements.updatedAt,
        adTitle: advertisements.adTitle,
        positionName: adPositions.positionName,
        displayName: adPositions.displayName
      })
      .from(adPlacements)
      .leftJoin(advertisements, eq(adPlacements.advertisementId, advertisements.id))
      .leftJoin(adPositions, eq(adPlacements.positionId, adPositions.id))
      .orderBy(desc(adPlacements.createdAt));
    
    res.json(placements);
  } catch (error) {
    console.error('Error fetching placements:', error);
    res.status(500).json({ error: 'Failed to fetch placements' });
  }
});

// Create new ad placement (Admin only)
router.post('/placements', authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const validatedData = adPlacementSchema.parse(req.body);
    const [newPlacement] = await db.insert(adPlacements).values(validatedData).returning();
    res.status(201).json(newPlacement);
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
    const activeFloatingAds = await db
      .select()
      .from(floatingAds)
      .innerJoin(advertisements, eq(floatingAds.advertisementId, advertisements.id))
      .where(
        and(
          eq(floatingAds.isActive, true),
          eq(advertisements.status, 'active'),
          lte(floatingAds.startTime, new Date()),
          gte(floatingAds.endTime, new Date())
        )
      );
    
    res.json(activeFloatingAds);
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