import { Router } from "express";
import { storage } from "../storage";
import { z } from "zod";

const router = Router();

// Validation schemas
const createProviderSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  description: z.string().optional(),
  categoryId: z.number().int().positive(),
  subcategoryId: z.number().int().positive().optional(),
  contactPerson: z.string().min(2, "Contact person name required"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required").optional(),
  website: z.string().url("Valid website URL required").optional(),
  county: z.string().min(2, "County required"),
  area: z.string().min(2, "Area required"),
  address: z.string().optional(),
  services: z.string().optional(),
  priceRange: z.string().optional(),
  operatingHours: z.string().optional(),
  socialMediaLinks: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  yearsInBusiness: z.number().int().min(0).optional()
});

const createReviewSchema = z.object({
  providerId: z.number().int().positive(),
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
  customerName: z.string().min(2, "Customer name required"),
  customerEmail: z.string().email("Valid email required").optional(),
  serviceUsed: z.string().optional()
});

const searchProvidersSchema = z.object({
  categoryId: z.number().int().positive().optional(),
  subcategoryId: z.number().int().positive().optional(),
  county: z.string().optional(),
  area: z.string().optional(),
  searchTerm: z.string().optional(),
  isVerified: z.boolean().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20)
});

// Get all service categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await storage.getActiveServiceCategories();
    res.json(categories);
  } catch (error) {
    console.error("Failed to fetch service categories:", error);
    res.status(500).json({ error: "Failed to fetch service categories" });
  }
});

// Get subcategories by category
router.get("/categories/:categoryId/subcategories", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }
    
    const subcategories = await storage.getSubcategoriesByCategory(categoryId);
    res.json(subcategories);
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

// Search service providers
router.get("/providers", async (req, res) => {
  try {
    const validatedQuery = searchProvidersSchema.parse({
      ...req.query,
      categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
      subcategoryId: req.query.subcategoryId ? parseInt(req.query.subcategoryId as string) : undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
      isVerified: req.query.isVerified === 'true' ? true : req.query.isVerified === 'false' ? false : undefined
    });

    // Log search for analytics
    if (validatedQuery.searchTerm) {
      await storage.logEcosystemSearch({
        searchTerm: validatedQuery.searchTerm,
        categoryId: validatedQuery.categoryId || null,
        subcategoryId: validatedQuery.subcategoryId || null,
        county: validatedQuery.county || null,
        area: validatedQuery.area || null,
        userId: null, // Anonymous search for now
        resultsCount: 0 // Will be updated after search
      });
    }

    const result = await storage.getServiceProviders(validatedQuery);
    
    // Update search results count if this was a search
    if (validatedQuery.searchTerm && result.total > 0) {
      // Note: In production, you might want to update the search log with results count
    }

    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid search parameters", details: error.errors });
    }
    console.error("Failed to search providers:", error);
    res.status(500).json({ error: "Failed to search providers" });
  }
});

// Get single provider details
router.get("/providers/:id", async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    if (isNaN(providerId)) {
      return res.status(400).json({ error: "Invalid provider ID" });
    }

    const provider = await storage.getServiceProvider(providerId);
    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    // Increment view count
    await storage.incrementProviderViews(providerId);

    // Get provider services and reviews
    const [services, reviews] = await Promise.all([
      storage.getProviderServices(providerId),
      storage.getProviderReviews(providerId, 10)
    ]);

    res.json({
      ...provider,
      services,
      reviews
    });
  } catch (error) {
    console.error("Failed to fetch provider details:", error);
    res.status(500).json({ error: "Failed to fetch provider details" });
  }
});

// Register new service provider
router.post("/providers", async (req, res) => {
  try {
    const validatedData = createProviderSchema.parse(req.body);
    
    // Check if user is authenticated (optional for now)
    const userId = req.user?.id || null;

    const provider = await storage.createServiceProvider({
      ...validatedData,
      userId,
      businessType: 'business', // Default type
      phoneNumbers: [validatedData.phoneNumber], // Convert single phone to array
      totalViews: 0,
      totalContacts: 0
    });

    res.status(201).json(provider);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid provider data", details: error.errors });
    }
    console.error("Failed to create provider:", error);
    res.status(500).json({ error: "Failed to create provider" });
  }
});

// Update provider (for authenticated users)
router.put("/providers/:id", async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    if (isNaN(providerId)) {
      return res.status(400).json({ error: "Invalid provider ID" });
    }

    // Basic validation - in production you'd want proper authentication
    const updateData = req.body;
    delete updateData.id; // Prevent ID manipulation
    delete updateData.isVerified; // Only admins can verify
    delete updateData.totalViews; // System managed
    delete updateData.totalContacts; // System managed

    const provider = await storage.updateServiceProvider(providerId, updateData);
    res.json(provider);
  } catch (error) {
    console.error("Failed to update provider:", error);
    res.status(500).json({ error: "Failed to update provider" });
  }
});

// Log provider contact
router.post("/providers/:id/contact", async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    if (isNaN(providerId)) {
      return res.status(400).json({ error: "Invalid provider ID" });
    }

    const { contactType, customerName, customerPhone, customerEmail } = req.body;

    // Log the contact
    await storage.logProviderContact({
      providerId,
      contactMethod: contactType || 'phone',
      userId: null // Anonymous for now
    });

    // Increment contact count
    await storage.incrementProviderContacts(providerId);

    res.json({ success: true, message: "Contact logged successfully" });
  } catch (error) {
    console.error("Failed to log provider contact:", error);
    res.status(500).json({ error: "Failed to log contact" });
  }
});

// Create provider review
router.post("/providers/:id/reviews", async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    if (isNaN(providerId)) {
      return res.status(400).json({ error: "Invalid provider ID" });
    }

    const validatedData = createReviewSchema.parse({
      ...req.body,
      providerId
    });

    const review = await storage.createProviderReview({
      ...validatedData,
      userId: undefined, // Anonymous for now
      isApproved: false // Requires admin approval
    });

    res.status(201).json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid review data", details: error.errors });
    }
    console.error("Failed to create review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
});

// Get provider reviews
router.get("/providers/:id/reviews", async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    if (isNaN(providerId)) {
      return res.status(400).json({ error: "Invalid provider ID" });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const reviews = await storage.getProviderReviews(providerId, limit);
    
    res.json(reviews);
  } catch (error) {
    console.error("Failed to fetch provider reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Get ecosystem statistics
router.get("/stats", async (req, res) => {
  try {
    const stats = await storage.getEcosystemStats();
    res.json(stats);
  } catch (error) {
    console.error("Failed to fetch ecosystem stats:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// Get popular searches
router.get("/popular-searches", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const searches = await storage.getPopularSearches(limit);
    res.json(searches);
  } catch (error) {
    console.error("Failed to fetch popular searches:", error);
    res.status(500).json({ error: "Failed to fetch popular searches" });
  }
});

export default router;