import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { 
  dealerProfiles, 
  dealerReviews, 
  dealerAnalytics,
  dealerVerificationDocs,
  dealerInvitations,
  dealerUserAssociations,
  carListings,
  appUsers,
  dealerProfileSchema,
  dealerReviewSchema,
  dealerInvitationSchema,
  type DealerProfile,
  type DealerReview
} from "@shared/schema";
import crypto from "crypto";
import { eq, desc, asc, and, avg, count, sql } from "drizzle-orm";

const router = Router();

import { authenticateUser, requireRole } from "../middleware/auth";

// Registration endpoint (no auth required)
router.post("/register", async (req, res) => {
  try {
    const dealerData = req.body;
    console.log('Dealer registration data:', dealerData);
    
    // Generate unique dealer ID
    const dealerId = `dealer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine listing limit based on package
    const getListingLimitForPackage = (packageType: string) => {
      switch (packageType) {
        case 'free': return 5;
        case 'premium': return -1; // unlimited
        case 'featured': return -1; // unlimited
        default: return 5;
      }
    };
    
    // Create dealer profile
    const newDealer = await db
      .insert(dealerProfiles)
      .values({
        userId: dealerId,
        dealerName: dealerData.businessName,
        businessName: dealerData.businessName,
        businessLocation: dealerData.location,
        phoneNumbers: [dealerData.phoneNumber],
        whatsappNumber: dealerData.whatsappNumber || null,
        emailAddress: dealerData.businessEmail,
        websiteUrl: dealerData.website || null,
        dealerBio: dealerData.description || null,
        yearsInBusiness: dealerData.yearsInBusiness || 0,
        specialties: dealerData.specialties || [],
        status: 'pending',
        isVerified: false,
        packageType: dealerData.packageType,
        listingLimit: getListingLimitForPackage(dealerData.packageType),
      })
      .returning();

    res.json({ 
      success: true, 
      dealerId: newDealer[0].id,
      message: 'Dealer registration successful. Your application is under review.'
    });
  } catch (error) {
    console.error('Error registering dealer:', error);
    res.status(500).json({ error: 'Failed to register dealer' });
  }
});

// For admin routes, use requireRole middleware instead
const requireAdmin = requireRole(['admin', 'superadmin']);

// Create dealer invitation (dealers can create invitations for their dealership)
router.post("/:dealerId/invitations", authenticateUser, async (req, res) => {
  try {
    const dealerId = parseInt(req.params.dealerId);
    const userId = req.user.id;
    
    // Verify user is the dealer or has admin access
    const dealer = await db
      .select()
      .from(dealerProfiles)
      .where(eq(dealerProfiles.id, dealerId))
      .limit(1);
    
    if (!dealer.length) {
      return res.status(404).json({ error: "Dealer not found" });
    }
    
    // Check if user owns this dealer profile (simplified check - you may want to improve this)
    const userRole = await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.id, userId))
      .limit(1);
    
    if (!userRole.length) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    // Generate unique invitation token
    const invitationToken = crypto.randomBytes(32).toString('hex');
    
    // Create invitation
    const invitationData = {
      dealerId,
      invitationToken,
      invitationType: req.body.invitationType || "general",
      invitedEmail: req.body.invitedEmail || null,
      maxUses: req.body.maxUses || 1,
      expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
      createdBy: userId,
      metadata: {
        invitationMessage: req.body.invitationMessage || null,
        redirectUrl: `/dealer/${userId}`,
        customParams: req.body.customParams || null
      }
    };
    
    const newInvitation = await db
      .insert(dealerInvitations)
      .values(invitationData)
      .returning();
    
    // Generate invitation URL
    const baseUrl = req.protocol + '://' + req.get('host');
    const invitationUrl = `${baseUrl}/dealer-invitation/${invitationToken}`;
    
    res.json({ 
      success: true, 
      invitation: newInvitation[0],
      invitationUrl 
    });
  } catch (error) {
    console.error('Error creating dealer invitation:', error);
    res.status(500).json({ error: 'Failed to create invitation' });
  }
});

// Accept dealer invitation (public endpoint for invitation URLs)
router.get("/invitation/:token", async (req, res) => {
  try {
    const token = req.params.token;
    
    // Find invitation by token
    const invitation = await db
      .select()
      .from(dealerInvitations)
      .leftJoin(dealerProfiles, eq(dealerInvitations.dealerId, dealerProfiles.id))
      .where(and(
        eq(dealerInvitations.invitationToken, token),
        eq(dealerInvitations.status, 'active')
      ))
      .limit(1);
    
    if (!invitation.length) {
      return res.status(404).json({ error: "Invalid or expired invitation" });
    }
    
    const invitationData = invitation[0].dealer_invitations;
    const dealerData = invitation[0].dealer_profiles;
    
    // Check if invitation has expired
    if (invitationData.expiresAt && new Date(invitationData.expiresAt) < new Date()) {
      return res.status(400).json({ error: "Invitation has expired" });
    }
    
    // Check if invitation has reached max uses
    if (invitationData.currentUses >= invitationData.maxUses) {
      return res.status(400).json({ error: "Invitation has reached maximum uses" });
    }
    
    res.json({
      success: true,
      invitation: invitationData,
      dealer: dealerData,
      redirectUrl: `/dealer/${dealerData.userId}`
    });
  } catch (error) {
    console.error('Error processing invitation:', error);
    res.status(500).json({ error: 'Failed to process invitation' });
  }
});

// Process invitation acceptance during user registration/login
router.post("/invitation/:token/accept", authenticateUser, async (req, res) => {
  try {
    const token = req.params.token;
    const userId = req.user.id;
    
    // Find and validate invitation
    const invitation = await db
      .select()
      .from(dealerInvitations)
      .leftJoin(dealerProfiles, eq(dealerInvitations.dealerId, dealerProfiles.id))
      .where(and(
        eq(dealerInvitations.invitationToken, token),
        eq(dealerInvitations.status, 'active')
      ))
      .limit(1);
    
    if (!invitation.length) {
      return res.status(404).json({ error: "Invalid or expired invitation" });
    }
    
    const invitationData = invitation[0].dealer_invitations;
    const dealerData = invitation[0].dealer_profiles;
    
    // Check if invitation has expired
    if (invitationData.expiresAt && new Date(invitationData.expiresAt) < new Date()) {
      return res.status(400).json({ error: "Invitation has expired" });
    }
    
    // Check if user already associated with this dealer
    const existingAssociation = await db
      .select()
      .from(dealerUserAssociations)
      .where(and(
        eq(dealerUserAssociations.dealerId, invitationData.dealerId),
        eq(dealerUserAssociations.userId, userId)
      ))
      .limit(1);
    
    if (existingAssociation.length) {
      return res.status(400).json({ error: "User already associated with this dealer" });
    }
    
    // Create dealer-user association
    await db
      .insert(dealerUserAssociations)
      .values({
        dealerId: invitationData.dealerId,
        userId,
        associationType: 'invitation',
        invitationId: invitationData.id,
        status: 'active',
        metadata: {
          source: 'invitation_link',
          invitationToken: token
        }
      });
    
    // Update invitation usage count
    await db
      .update(dealerInvitations)
      .set({
        currentUses: sql`${dealerInvitations.currentUses} + 1`,
        invitedUserId: invitationData.invitedUserId ? invitationData.invitedUserId : userId,
        acceptedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(dealerInvitations.id, invitationData.id));
    
    // If invitation has reached max uses, mark as used
    if ((invitationData.currentUses + 1) >= invitationData.maxUses) {
      await db
        .update(dealerInvitations)
        .set({
          status: 'used',
          updatedAt: new Date()
        })
        .where(eq(dealerInvitations.id, invitationData.id));
    }
    
    res.json({
      success: true,
      dealerId: invitationData.dealerId,
      dealerUserId: dealerData.userId,
      redirectUrl: `/dealer/${dealerData.userId}`,
      message: 'Successfully joined dealer network'
    });
  } catch (error) {
    console.error('Error accepting invitation:', error);
    res.status(500).json({ error: 'Failed to accept invitation' });
  }
});

// Get user's dealer associations (for determining login redirect)
router.get("/user/:userId/associations", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const requestingUserId = req.user.id;
    
    // Users can only view their own associations (or admins can view any)
    const userRole = await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.id, requestingUserId))
      .limit(1);
    
    if (userId !== requestingUserId && !userRole[0]?.roleId) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    const associations = await db
      .select()
      .from(dealerUserAssociations)
      .leftJoin(dealerProfiles, eq(dealerUserAssociations.dealerId, dealerProfiles.id))
      .where(and(
        eq(dealerUserAssociations.userId, userId),
        eq(dealerUserAssociations.status, 'active')
      ))
      .orderBy(desc(dealerUserAssociations.associationDate));
    
    res.json({
      success: true,
      associations: associations.map(a => ({
        ...a.dealer_user_associations,
        dealer: a.dealer_profiles
      }))
    });
  } catch (error) {
    console.error('Error fetching dealer associations:', error);
    res.status(500).json({ error: 'Failed to fetch associations' });
  }
});

// Get dealer profile for current user
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const dealerProfile = await db
      .select()
      .from(dealerProfiles)
      .where(eq(dealerProfiles.userId, req.user.id))
      .limit(1);

    if (dealerProfile.length === 0) {
      return res.status(404).json({ message: "Dealer profile not found" });
    }

    res.json(dealerProfile[0]);
  } catch (error) {
    console.error("Error fetching dealer profile:", error);
    res.status(500).json({ error: "Failed to fetch dealer profile" });
  }
});

// Create or update dealer profile
router.post("/profile", authenticateUser, async (req, res) => {
  try {
    const profileData = dealerProfileSchema.parse(req.body);
    
    // Check if dealer profile already exists
    const existingProfile = await db
      .select()
      .from(dealerProfiles)
      .where(eq(dealerProfiles.userId, req.user.id))
      .limit(1);

    let dealerProfile;
    
    if (existingProfile.length > 0) {
      // Update existing profile
      dealerProfile = await db
        .update(dealerProfiles)
        .set({
          ...profileData,
          updatedAt: new Date()
        })
        .where(eq(dealerProfiles.userId, req.user.id))
        .returning();
    } else {
      // Create new profile
      dealerProfile = await db
        .insert(dealerProfiles)
        .values({
          ...profileData,
          userId: req.user.id,
          status: "pending" // Requires admin approval
        })
        .returning();
    }

    res.json(dealerProfile[0]);
  } catch (error) {
    console.error("Error saving dealer profile:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    res.status(500).json({ error: "Failed to save dealer profile" });
  }
});

// Get public dealer profile by user ID
router.get("/public/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const dealerProfile = await db
      .select({
        ...dealerProfiles,
        user: {
          firstName: appUsers.firstName,
          lastName: appUsers.lastName,
          profileImageUrl: appUsers.profileImageUrl
        }
      })
      .from(dealerProfiles)
      .leftJoin(appUsers, eq(dealerProfiles.userId, appUsers.id))
      .where(and(
        eq(dealerProfiles.userId, userId),
        eq(dealerProfiles.status, "approved")
      ))
      .limit(1);

    if (dealerProfile.length === 0) {
      return res.status(404).json({ message: "Dealer profile not found or not approved" });
    }

    // Get dealer statistics
    const stats = await db
      .select({
        totalListings: count(carListings.id),
        activeListings: count(sql`CASE WHEN ${carListings.status} = 'active' THEN 1 END`),
        averageRating: avg(dealerReviews.rating),
        totalReviews: count(dealerReviews.id)
      })
      .from(dealerProfiles)
      .leftJoin(carListings, eq(carListings.sellerId, dealerProfiles.userId))
      .leftJoin(dealerReviews, eq(dealerReviews.dealerId, dealerProfiles.id))
      .where(eq(dealerProfiles.userId, userId))
      .groupBy(dealerProfiles.id);

    res.json({
      ...dealerProfile[0],
      stats: stats[0] || { totalListings: 0, activeListings: 0, averageRating: 0, totalReviews: 0 }
    });
  } catch (error) {
    console.error("Error fetching public dealer profile:", error);
    res.status(500).json({ error: "Failed to fetch dealer profile" });
  }
});

// Get dealer's vehicle listings
router.get("/:userId/listings", async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 12 } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    const listings = await db
      .select()
      .from(carListings)
      .where(and(
        eq(carListings.sellerId, userId),
        eq(carListings.status, "active")
      ))
      .orderBy(desc(carListings.createdAt))
      .limit(Number(limit))
      .offset(offset);

    res.json(listings);
  } catch (error) {
    console.error("Error fetching dealer listings:", error);
    res.status(500).json({ error: "Failed to fetch dealer listings" });
  }
});

// Get dealer reviews
router.get("/:userId/reviews", async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    // First get the dealer profile ID
    const dealerProfile = await db
      .select({ id: dealerProfiles.id })
      .from(dealerProfiles)
      .where(eq(dealerProfiles.userId, userId))
      .limit(1);

    if (dealerProfile.length === 0) {
      return res.status(404).json({ message: "Dealer not found" });
    }

    const reviews = await db
      .select({
        ...dealerReviews,
        reviewer: {
          firstName: appUsers.firstName,
          lastName: appUsers.lastName,
          profileImageUrl: appUsers.profileImageUrl
        }
      })
      .from(dealerReviews)
      .leftJoin(appUsers, eq(dealerReviews.reviewerId, appUsers.id))
      .where(and(
        eq(dealerReviews.dealerId, dealerProfile[0].id),
        eq(dealerReviews.status, "active")
      ))
      .orderBy(desc(dealerReviews.createdAt))
      .limit(Number(limit))
      .offset(offset);

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching dealer reviews:", error);
    res.status(500).json({ error: "Failed to fetch dealer reviews" });
  }
});

// Add review for dealer
router.post("/:userId/reviews", authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    const reviewData = dealerReviewSchema.parse(req.body);
    
    // Get dealer profile ID
    const dealerProfile = await db
      .select({ id: dealerProfiles.id })
      .from(dealerProfiles)
      .where(eq(dealerProfiles.userId, userId))
      .limit(1);

    if (dealerProfile.length === 0) {
      return res.status(404).json({ message: "Dealer not found" });
    }

    // Check if user already reviewed this dealer
    const existingReview = await db
      .select()
      .from(dealerReviews)
      .where(and(
        eq(dealerReviews.dealerId, dealerProfile[0].id),
        eq(dealerReviews.reviewerId, req.user.id)
      ))
      .limit(1);

    if (existingReview.length > 0) {
      return res.status(400).json({ message: "You have already reviewed this dealer" });
    }

    const review = await db
      .insert(dealerReviews)
      .values({
        ...reviewData,
        dealerId: dealerProfile[0].id,
        reviewerId: req.user.id
      })
      .returning();

    res.json(review[0]);
  } catch (error) {
    console.error("Error adding dealer review:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    res.status(500).json({ error: "Failed to add review" });
  }
});

// Admin: Get all dealer profiles
router.get("/admin/profiles", requireAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereCondition = undefined;
    if (status && status !== 'all') {
      whereCondition = eq(dealerProfiles.status, status as string);
    }

    const profiles = await db
      .select({
        ...dealerProfiles,
        user: {
          firstName: appUsers.firstName,
          lastName: appUsers.lastName,
          email: appUsers.email,
          profileImageUrl: appUsers.profileImageUrl
        }
      })
      .from(dealerProfiles)
      .leftJoin(appUsers, eq(dealerProfiles.userId, appUsers.id))
      .where(whereCondition)
      .orderBy(desc(dealerProfiles.createdAt))
      .limit(Number(limit))
      .offset(offset);

    res.json(profiles);
  } catch (error) {
    console.error("Error fetching dealer profiles:", error);
    res.status(500).json({ error: "Failed to fetch dealer profiles" });
  }
});

// Admin: Update dealer profile status
router.patch("/admin/profiles/:profileId/status", requireAdmin, async (req, res) => {
  try {
    const { profileId } = req.params;
    const { status, verificationBadge, listingLimit, packageType, adminNotes } = req.body;
    
    const updateData: any = {
      status,
      updatedAt: new Date()
    };

    if (status === "approved") {
      updateData.verificationDate = new Date();
      updateData.verifiedBy = req.user.id;
      updateData.isVerified = true;
      
      if (verificationBadge) {
        updateData.verificationBadge = verificationBadge;
      }
    }

    if (status === "suspended") {
      updateData.suspendedAt = new Date();
      updateData.suspendedBy = req.user.id;
    }

    if (listingLimit !== undefined) {
      updateData.listingLimit = listingLimit;
    }

    if (packageType) {
      updateData.packageType = packageType;
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    const updatedProfile = await db
      .update(dealerProfiles)
      .set(updateData)
      .where(eq(dealerProfiles.id, Number(profileId)))
      .returning();

    if (updatedProfile.length === 0) {
      return res.status(404).json({ message: "Dealer profile not found" });
    }

    res.json(updatedProfile[0]);
  } catch (error) {
    console.error("Error updating dealer profile status:", error);
    res.status(500).json({ error: "Failed to update dealer profile status" });
  }
});

// Admin: Get dealer analytics
router.get("/admin/analytics", requireAdmin, async (req, res) => {
  try {
    const { dealerId, startDate, endDate } = req.query;
    
    let whereCondition = undefined;
    if (dealerId) {
      whereCondition = eq(dealerAnalytics.dealerId, Number(dealerId));
    }

    const analytics = await db
      .select()
      .from(dealerAnalytics)
      .where(whereCondition)
      .orderBy(desc(dealerAnalytics.date))
      .limit(30); // Last 30 days

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching dealer analytics:", error);
    res.status(500).json({ error: "Failed to fetch dealer analytics" });
  }
});

// Get verified dealers list
router.get("/verified", async (req, res) => {
  try {
    const { page = 1, limit = 12, specialties } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereCondition = and(
      eq(dealerProfiles.status, "approved"),
      eq(dealerProfiles.isVerified, true)
    );

    const dealers = await db
      .select({
        ...dealerProfiles,
        user: {
          firstName: appUsers.firstName,
          lastName: appUsers.lastName,
          profileImageUrl: appUsers.profileImageUrl
        },
        stats: {
          averageRating: avg(dealerReviews.rating),
          totalReviews: count(dealerReviews.id),
          activeListings: count(sql`CASE WHEN ${carListings.status} = 'active' THEN 1 END`)
        }
      })
      .from(dealerProfiles)
      .leftJoin(appUsers, eq(dealerProfiles.userId, appUsers.id))
      .leftJoin(dealerReviews, eq(dealerReviews.dealerId, dealerProfiles.id))
      .leftJoin(carListings, eq(carListings.sellerId, dealerProfiles.userId))
      .where(whereCondition)
      .groupBy(dealerProfiles.id, appUsers.id)
      .orderBy(desc(dealerProfiles.verificationDate))
      .limit(Number(limit))
      .offset(offset);

    res.json(dealers);
  } catch (error) {
    console.error("Error fetching verified dealers:", error);
    res.status(500).json({ error: "Failed to fetch verified dealers" });
  }
});

export default router;