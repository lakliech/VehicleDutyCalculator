
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { 
  liveStreams, 
  streamViewers, 
  streamChat,
  groupBuys,
  groupBuyParticipants,
  influencers,
  influencerReviews,
  influencerReferrals
} from '../../shared/social-commerce-schema';
import { eq, desc, and, gte, lte, sql, count, sum } from 'drizzle-orm';
import { authenticateUser, requireRole } from '../middleware/auth';

const router = Router();

// ========================================
// LIVE STREAMING ROUTES
// ========================================

// Create live stream
router.post('/streams/create', authenticateUser, async (req: any, res) => {
  try {
    const streamData = z.object({
      title: z.string().min(1).max(200),
      description: z.string().optional(),
      listingId: z.number().optional(),
      scheduledAt: z.string().datetime(),
      vehicleHighlights: z.array(z.string()).optional(),
      featuredSpecs: z.record(z.string()).optional()
    }).parse(req.body);

    const streamId = `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const [stream] = await db.insert(liveStreams).values({
      streamId,
      sellerId: req.user.id,
      title: streamData.title,
      description: streamData.description,
      listingId: streamData.listingId,
      scheduledAt: new Date(streamData.scheduledAt),
      metadata: {
        vehicleHighlights: streamData.vehicleHighlights || [],
        featuredSpecs: streamData.featuredSpecs || {}
      }
    }).returning();

    res.json(stream);
  } catch (error) {
    console.error('Error creating live stream:', error);
    res.status(500).json({ error: 'Failed to create live stream' });
  }
});

// Get upcoming and live streams
router.get('/streams/active', async (req, res) => {
  try {
    const streams = await db.select()
      .from(liveStreams)
      .where(sql`status IN ('scheduled', 'live')`)
      .orderBy(desc(liveStreams.scheduledAt))
      .limit(20);

    res.json(streams);
  } catch (error) {
    console.error('Error fetching active streams:', error);
    res.status(500).json({ error: 'Failed to fetch streams' });
  }
});

// Join stream as viewer
router.post('/streams/:streamId/join', authenticateUser, async (req: any, res) => {
  try {
    const { streamId } = req.params;
    
    // Check if stream exists and is live
    const stream = await db.select()
      .from(liveStreams)
      .where(and(
        eq(liveStreams.streamId, streamId),
        eq(liveStreams.status, 'live')
      ))
      .limit(1);

    if (!stream.length) {
      return res.status(404).json({ error: 'Stream not found or not live' });
    }

    // Add viewer
    await db.insert(streamViewers).values({
      streamId: stream[0].id,
      userId: req.user.id
    });

    // Update viewer count
    await db.update(liveStreams)
      .set({ 
        viewerCount: sql`${liveStreams.viewerCount} + 1`,
        peakViewers: sql`GREATEST(${liveStreams.peakViewers}, ${liveStreams.viewerCount} + 1)`
      })
      .where(eq(liveStreams.id, stream[0].id));

    res.json({ success: true, streamUrl: stream[0].streamUrl });
  } catch (error) {
    console.error('Error joining stream:', error);
    res.status(500).json({ error: 'Failed to join stream' });
  }
});

// Send chat message
router.post('/streams/:streamId/chat', authenticateUser, async (req: any, res) => {
  try {
    const { streamId } = req.params;
    const { message, messageType = 'chat' } = req.body;

    const stream = await db.select()
      .from(liveStreams)
      .where(eq(liveStreams.streamId, streamId))
      .limit(1);

    if (!stream.length) {
      return res.status(404).json({ error: 'Stream not found' });
    }

    const [chatMessage] = await db.insert(streamChat).values({
      streamId: stream[0].id,
      userId: req.user.id,
      username: req.user.firstName + ' ' + req.user.lastName,
      message,
      messageType
    }).returning();

    res.json(chatMessage);
  } catch (error) {
    console.error('Error sending chat message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ========================================
// GROUP BUYING ROUTES
// ========================================

// Create group buy
router.post('/group-buys/create', authenticateUser, async (req: any, res) => {
  try {
    const groupBuyData = z.object({
      title: z.string().min(1).max(200),
      description: z.string().optional(),
      vehicleSpecs: z.object({
        make: z.string(),
        model: z.string(),
        year: z.number(),
        engineSize: z.string().optional(),
        fuelType: z.string().optional(),
        transmission: z.string().optional(),
        features: z.array(z.string()).optional()
      }),
      targetQuantity: z.number().min(2),
      minQuantity: z.number().min(2),
      pricePerUnit: z.number().positive(),
      discountPercentage: z.number().min(0).max(50).optional(),
      endDate: z.string().datetime(),
      deliveryEstimate: z.string().optional(),
      importDetails: z.object({
        sourceCountry: z.string(),
        port: z.string(),
        estimatedShippingCost: z.number(),
        estimatedDutyTaxes: z.number(),
        totalLandedCost: z.number()
      }).optional()
    }).parse(req.body);

    const groupBuyId = `gb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const totalValue = groupBuyData.pricePerUnit * groupBuyData.targetQuantity;

    const [groupBuy] = await db.insert(groupBuys).values({
      groupBuyId,
      organizerId: req.user.id,
      title: groupBuyData.title,
      description: groupBuyData.description,
      vehicleSpecs: groupBuyData.vehicleSpecs,
      targetQuantity: groupBuyData.targetQuantity,
      minQuantity: groupBuyData.minQuantity,
      pricePerUnit: groupBuyData.pricePerUnit.toString(),
      totalValue: totalValue.toString(),
      discountPercentage: groupBuyData.discountPercentage?.toString() || '0',
      startDate: new Date(),
      endDate: new Date(groupBuyData.endDate),
      deliveryEstimate: groupBuyData.deliveryEstimate,
      importDetails: groupBuyData.importDetails,
      paymentDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    }).returning();

    res.json(groupBuy);
  } catch (error) {
    console.error('Error creating group buy:', error);
    res.status(500).json({ error: 'Failed to create group buy' });
  }
});

// Get active group buys
router.get('/group-buys/active', async (req, res) => {
  try {
    const groupBuys = await db.select({
      ...groupBuys,
      participantCount: count(groupBuyParticipants.id),
      totalCommitted: sum(groupBuyParticipants.quantity)
    })
    .from(groupBuys)
    .leftJoin(groupBuyParticipants, eq(groupBuys.id, groupBuyParticipants.groupBuyId))
    .where(eq(groupBuys.status, 'active'))
    .groupBy(groupBuys.id)
    .orderBy(desc(groupBuys.createdAt))
    .limit(20);

    res.json(groupBuys);
  } catch (error) {
    console.error('Error fetching group buys:', error);
    res.status(500).json({ error: 'Failed to fetch group buys' });
  }
});

// Join group buy
router.post('/group-buys/:groupBuyId/join', authenticateUser, async (req: any, res) => {
  try {
    const { groupBuyId } = req.params;
    const { quantity, customizations } = req.body;

    const groupBuy = await db.select()
      .from(groupBuys)
      .where(and(
        eq(groupBuys.groupBuyId, groupBuyId),
        eq(groupBuys.status, 'active')
      ))
      .limit(1);

    if (!groupBuy.length) {
      return res.status(404).json({ error: 'Group buy not found or not active' });
    }

    const totalAmount = parseFloat(groupBuy[0].pricePerUnit) * quantity;

    const [participant] = await db.insert(groupBuyParticipants).values({
      groupBuyId: groupBuy[0].id,
      userId: req.user.id,
      quantity,
      totalAmount: totalAmount.toString(),
      customizations
    }).returning();

    // Update group buy current quantity
    await db.update(groupBuys)
      .set({
        currentQuantity: sql`${groupBuys.currentQuantity} + ${quantity}`,
        updatedAt: new Date()
      })
      .where(eq(groupBuys.id, groupBuy[0].id));

    res.json(participant);
  } catch (error) {
    console.error('Error joining group buy:', error);
    res.status(500).json({ error: 'Failed to join group buy' });
  }
});

// ========================================
// INFLUENCER ROUTES
// ========================================

// Register as influencer
router.post('/influencers/register', authenticateUser, async (req: any, res) => {
  try {
    const influencerData = z.object({
      displayName: z.string().min(1).max(100),
      bio: z.string().optional(),
      specialties: z.array(z.string()).optional(),
      platforms: z.object({
        youtube: z.object({
          channelId: z.string(),
          subscribers: z.number()
        }).optional(),
        instagram: z.object({
          handle: z.string(),
          followers: z.number()
        }).optional(),
        tiktok: z.object({
          handle: z.string(),
          followers: z.number()
        }).optional(),
        twitter: z.object({
          handle: z.string(),
          followers: z.number()
        }).optional()
      }).optional()
    }).parse(req.body);

    const influencerCode = `INF${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    const [influencer] = await db.insert(influencers).values({
      userId: req.user.id,
      influencerCode,
      displayName: influencerData.displayName,
      bio: influencerData.bio,
      specialties: influencerData.specialties || [],
      platforms: influencerData.platforms || {}
    }).returning();

    res.json(influencer);
  } catch (error) {
    console.error('Error registering influencer:', error);
    res.status(500).json({ error: 'Failed to register as influencer' });
  }
});

// Create influencer review
router.post('/influencers/reviews/create', authenticateUser, async (req: any, res) => {
  try {
    const reviewData = z.object({
      listingId: z.number(),
      title: z.string().min(1).max(200),
      content: z.string().min(10),
      rating: z.number().min(1).max(5),
      videoUrl: z.string().url().optional(),
      images: z.array(z.string().url()).optional(),
      tags: z.array(z.string()).optional()
    }).parse(req.body);

    // Check if user is an influencer
    const influencer = await db.select()
      .from(influencers)
      .where(eq(influencers.userId, req.user.id))
      .limit(1);

    if (!influencer.length) {
      return res.status(403).json({ error: 'You are not registered as an influencer' });
    }

    const reviewId = `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const [review] = await db.insert(influencerReviews).values({
      reviewId,
      influencerId: influencer[0].id,
      listingId: reviewData.listingId,
      title: reviewData.title,
      content: reviewData.content,
      rating: reviewData.rating,
      videoUrl: reviewData.videoUrl,
      images: reviewData.images || [],
      tags: reviewData.tags || []
    }).returning();

    res.json(review);
  } catch (error) {
    console.error('Error creating influencer review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Get influencer reviews
router.get('/influencers/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 12, specialty } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereCondition = eq(influencerReviews.status, 'published');

    const reviews = await db.select({
      ...influencerReviews,
      influencer: {
        displayName: influencers.displayName,
        influencerCode: influencers.influencerCode,
        specialties: influencers.specialties
      }
    })
    .from(influencerReviews)
    .innerJoin(influencers, eq(influencerReviews.influencerId, influencers.id))
    .where(whereCondition)
    .orderBy(desc(influencerReviews.publishedAt))
    .limit(Number(limit))
    .offset(offset);

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching influencer reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Track referral
router.post('/influencers/:influencerCode/track', async (req, res) => {
  try {
    const { influencerCode } = req.params;
    const { listingId, actionType, userId, referralSource } = req.body;

    const influencer = await db.select()
      .from(influencers)
      .where(eq(influencers.influencerCode, influencerCode))
      .limit(1);

    if (!influencer.length) {
      return res.status(404).json({ error: 'Influencer not found' });
    }

    // Calculate commission based on action type
    let commissionAmount = 0;
    switch (actionType) {
      case 'view': commissionAmount = 10; break;
      case 'inquiry': commissionAmount = 50; break;
      case 'test_drive': commissionAmount = 100; break;
      case 'purchase': commissionAmount = 1000; break;
    }

    await db.insert(influencerReferrals).values({
      influencerId: influencer[0].id,
      userId,
      listingId,
      referralSource,
      actionType,
      commissionAmount: commissionAmount.toString()
    });

    res.json({ success: true, commission: commissionAmount });
  } catch (error) {
    console.error('Error tracking referral:', error);
    res.status(500).json({ error: 'Failed to track referral' });
  }
});

export default router;
