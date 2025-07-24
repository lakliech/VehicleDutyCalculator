import { Router } from "express";
import { z } from "zod";
import { storage } from "../storage";
import { authenticateUser, requireRole } from "../middleware/auth";

const router = Router();

// Provider management endpoints
router.get("/providers", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const { page = 1, limit = 20, searchTerm, status, isVerified } = req.query;
    
    const filters: any = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    };
    
    if (searchTerm) filters.searchTerm = searchTerm as string;
    if (isVerified !== undefined) filters.isVerified = isVerified === 'true';
    
    const result = await storage.getServiceProviders(filters);
    res.json(result);
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ error: "Failed to fetch providers" });
  }
});

router.put("/providers/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    const updateData = req.body;
    
    const updatedProvider = await storage.updateServiceProvider(providerId, updateData);
    res.json(updatedProvider);
  } catch (error) {
    console.error("Error updating provider:", error);
    res.status(500).json({ error: "Failed to update provider" });
  }
});

router.put("/providers/:id/verify", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    const { isVerified, verificationNotes } = req.body;
    
    const updatedProvider = await storage.updateServiceProvider(providerId, {
      isVerified,
      verificationNotes,
      verificationDate: isVerified ? new Date() : null
    });
    
    res.json(updatedProvider);
  } catch (error) {
    console.error("Error verifying provider:", error);
    res.status(500).json({ error: "Failed to verify provider" });
  }
});

router.put("/providers/:id/approve", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    const { isApproved } = req.body;
    
    const updatedProvider = await storage.updateServiceProvider(providerId, {
      isApproved
    });
    
    res.json(updatedProvider);
  } catch (error) {
    console.error("Error approving provider:", error);
    res.status(500).json({ error: "Failed to approve provider" });
  }
});

router.put("/providers/:id/activate", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    const { isActive } = req.body;
    
    const updatedProvider = await storage.updateServiceProvider(providerId, {
      isActive
    });
    
    res.json(updatedProvider);
  } catch (error) {
    console.error("Error activating provider:", error);
    res.status(500).json({ error: "Failed to activate provider" });
  }
});

router.delete("/providers/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    await storage.deleteServiceProvider(providerId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting provider:", error);
    res.status(500).json({ error: "Failed to delete provider" });
  }
});

// Category management endpoints
router.get("/categories", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const categories = await storage.getAllServiceCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().default(true)
});

router.post("/categories", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const categoryData = createCategorySchema.parse(req.body);
    const category = await storage.createServiceCategory(categoryData);
    res.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/categories/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const updateData = req.body;
    
    // You'll need to implement updateServiceCategory in storage
    const updatedCategory = await storage.updateServiceCategory(categoryId, updateData);
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Subcategory management endpoints
router.get("/subcategories", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    let subcategories;
    if (req.query.categoryId) {
      const categoryId = parseInt(req.query.categoryId as string);
      subcategories = await storage.getSubcategoriesByCategory(categoryId);
    } else {
      subcategories = await storage.getAllSubcategories();
    }
    res.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

const createSubcategorySchema = z.object({
  categoryId: z.number(),
  name: z.string().min(1),
  description: z.string().optional(),
  isActive: z.boolean().default(true)
});

router.post("/subcategories", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const subcategoryData = createSubcategorySchema.parse(req.body);
    const subcategory = await storage.createServiceSubcategory(subcategoryData);
    res.json(subcategory);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ error: "Failed to create subcategory" });
  }
});

router.put("/subcategories/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
  try {
    const subcategoryId = parseInt(req.params.id);
    const updateData = req.body;
    
    // You'll need to implement updateServiceSubcategory in storage
    const updatedSubcategory = await storage.updateServiceSubcategory(subcategoryId, updateData);
    res.json(updatedSubcategory);
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ error: "Failed to update subcategory" });
  }
});

export default router;