import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  dutyCalculationSchema, 
  vehicleReferences, 
  taxRates, 
  vehicleCategoryRules, 
  depreciationRates,
  insertVehicleReferenceSchema
} from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import { sql, eq } from "drizzle-orm";

// Simple authentication middleware
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const authenticateAdmin = (req: any, res: any, next: any) => {
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = auth.substring(7);
  if (token !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
      res.json({ token: ADMIN_PASSWORD, success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });
  // Calculate duty
  app.post("/api/calculate-duty", async (req, res) => {
    try {
      const validation = dutyCalculationSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const result = await storage.calculateDuty(validation.data);
      
      // Save calculation to database
      try {
        const vehicleData = {
          vehicleCategory: validation.data.vehicleCategory,
          vehicleValue: validation.data.vehicleValue.toString(),
          engineSize: validation.data.engineSize || null,
          vehicleAge: validation.data.vehicleAge,
          isDirectImport: validation.data.isDirectImport,
          fuelType: validation.data.fuelType || null,
        };

        const calculationData = {
          customsValue: result.customsValue.toString(),
          importDuty: result.importDuty.toString(),
          exciseDuty: result.exciseDuty.toString(),
          vat: result.vat.toString(),
          rdl: result.rdl.toString(),
          idfFees: result.idfFees.toString(),
          totalTaxes: result.totalTaxes.toString(),
          depreciationRate: result.depreciationRate.toString(),
          depreciatedPrice: result.depreciatedPrice.toString(),
        };

        await storage.saveCalculation(vehicleData, calculationData);
        console.log("Calculation saved successfully");
      } catch (saveError) {
        console.error("Failed to save calculation:", saveError);
        // Continue without failing the request
      }

      res.json(result);
    } catch (error) {
      console.error("Duty calculation error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to calculate duty" 
      });
    }
  });

  // Get calculation history
  app.get("/api/calculations/history", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const history = await storage.getCalculationHistory(limit);
      res.json(history);
    } catch (error) {
      console.error("Failed to fetch calculation history:", error);
      res.status(500).json({ 
        error: "Failed to fetch calculation history" 
      });
    }
  });

  // Search vehicle references
  app.get("/api/vehicle-references/search", async (req, res) => {
    try {
      const { make, model, engineCapacity, limit = "20" } = req.query;
      
      // Build base query
      let whereConditions = [];
      
      if (make && typeof make === 'string') {
        whereConditions.push(sql`LOWER(${vehicleReferences.make}) = LOWER(${make})`);
      }
      
      if (model && typeof model === 'string') {
        whereConditions.push(sql`LOWER(${vehicleReferences.model}) = LOWER(${model})`);
      }
      
      if (engineCapacity && typeof engineCapacity === 'string') {
        whereConditions.push(sql`${vehicleReferences.engineCapacity} = ${parseInt(engineCapacity)}`);
      }

      // For proration reference vehicles (make only search), ensure vehicles have CRSP values and engine capacity
      if (make && !model && !engineCapacity) {
        whereConditions.push(sql`(${vehicleReferences.crspKes} IS NOT NULL OR ${vehicleReferences.crsp2020} IS NOT NULL)`);
        whereConditions.push(sql`${vehicleReferences.engineCapacity} IS NOT NULL`);
      }
      
      let results;
      if (whereConditions.length > 0) {
        const whereClause = sql.join(whereConditions, sql` AND `);
        results = await db
          .select()
          .from(vehicleReferences)
          .where(whereClause)
          .orderBy(vehicleReferences.make, vehicleReferences.model)
          .limit(parseInt(limit as string));
      } else {
        results = await db
          .select()
          .from(vehicleReferences)
          .orderBy(vehicleReferences.make, vehicleReferences.model)
          .limit(parseInt(limit as string));
      }
        
      res.json(results);
    } catch (error) {
      console.error("Failed to search vehicle references:", error);
      res.status(500).json({ 
        error: "Failed to search vehicle references" 
      });
    }
  });

  // Get all distinct makes
  app.get("/api/vehicle-references/makes", async (req, res) => {
    try {
      const results = await db
        .selectDistinct({ make: vehicleReferences.make })
        .from(vehicleReferences)
        .orderBy(vehicleReferences.make);
        
      res.json(results.map(r => r.make));
    } catch (error) {
      console.error("Failed to fetch vehicle makes:", error);
      res.status(500).json({ 
        error: "Failed to fetch vehicle makes" 
      });
    }
  });

  // Get models for a specific make
  app.get("/api/vehicle-references/makes/:make/models", async (req, res) => {
    try {
      const { make } = req.params;
      const results = await db
        .selectDistinct({ 
          model: vehicleReferences.model
        })
        .from(vehicleReferences)
        .where(sql`LOWER(${vehicleReferences.make}) = LOWER(${make})`)
        .orderBy(vehicleReferences.model);
        
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch models for make:", error);
      res.status(500).json({ 
        error: "Failed to fetch models" 
      });
    }
  });

  // Get engine sizes for a specific make and model
  app.get("/api/vehicle-references/makes/:make/models/:model/engines", async (req, res) => {
    try {
      const { make, model } = req.params;
      const results = await db
        .selectDistinct({ 
          engineCapacity: vehicleReferences.engineCapacity
        })
        .from(vehicleReferences)
        .where(
          sql`LOWER(${vehicleReferences.make}) = LOWER(${make}) 
          AND LOWER(${vehicleReferences.model}) = LOWER(${model})
          AND ${vehicleReferences.engineCapacity} IS NOT NULL`
        )
        .orderBy(vehicleReferences.engineCapacity);
        
      res.json(results.map(r => r.engineCapacity).filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch engine sizes:", error);
      res.status(500).json({ 
        error: "Failed to fetch engine sizes" 
      });
    }
  });

  // ===============================
  // ADMIN API ROUTES
  // ===============================

  // Get all vehicle references for admin
  app.get("/api/admin/vehicle-references", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(vehicleReferences)
        .orderBy(vehicleReferences.make, vehicleReferences.model)
        .limit(1000);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch vehicle references:", error);
      res.status(500).json({ error: "Failed to fetch vehicle references" });
    }
  });

  // Add new vehicle reference
  app.post("/api/admin/vehicle-references", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        make: z.string().min(1),
        model: z.string().min(1),
        engineCapacity: z.number().optional(),
        bodyType: z.string().optional(),
        driveConfiguration: z.string().optional(),
        seating: z.string().optional(),
        fuelType: z.string().optional(),
        gvw: z.string().optional(),
        crspKes: z.number().optional(),
        crsp2020: z.number().optional(),
        discontinuationYear: z.number().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(vehicleReferences)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add vehicle reference:", error);
      res.status(500).json({ error: "Failed to add vehicle reference" });
    }
  });

  // Update vehicle reference
  app.put("/api/admin/vehicle-references/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        make: z.string().optional(),
        model: z.string().optional(),
        engineCapacity: z.number().optional(),
        bodyType: z.string().optional(),
        fuelType: z.string().optional(),
        driveConfiguration: z.string().optional(),
        crspKes: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      // Add missing fields for update
      const enhancedValidation = z.object({
        make: z.string().optional(),
        model: z.string().optional(),
        engineCapacity: z.number().optional(),
        bodyType: z.string().optional(),
        fuelType: z.string().optional(),
        driveConfiguration: z.string().optional(),
        seating: z.string().optional(),
        gvw: z.string().optional(),
        crspKes: z.number().optional(),
        crsp2020: z.number().optional(),
        discontinuationYear: z.number().optional(),
      }).safeParse(req.body);

      if (!enhancedValidation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: enhancedValidation.error.issues 
        });
      }

      // Format data properly
      const updateData = { ...enhancedValidation.data };
      if (updateData.make) updateData.make = updateData.make.toUpperCase();
      if (updateData.model) updateData.model = updateData.model.toUpperCase();
      if (updateData.fuelType) updateData.fuelType = updateData.fuelType.toLowerCase();

      const [result] = await db
        .update(vehicleReferences)
        .set(updateData)
        .where(eq(vehicleReferences.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Vehicle reference not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update vehicle reference:", error);
      res.status(500).json({ error: "Failed to update vehicle reference" });
    }
  });

  // Delete vehicle reference
  app.delete("/api/admin/vehicle-references/:id", authenticateAdmin, async (req, res) => {
    try {
      const vehicleId = parseInt(req.params.id);
      
      const [result] = await db
        .delete(vehicleReferences)
        .where(eq(vehicleReferences.id, vehicleId))
        .returning();
      
      if (!result) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      
      res.json({ message: "Vehicle deleted successfully", id: vehicleId });
    } catch (error) {
      console.error("Failed to delete vehicle reference:", error);
      res.status(400).json({ error: "Failed to delete vehicle reference" });
    }
  });

  // Get all tax rates
  app.get("/api/admin/tax-rates", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(taxRates)
        .orderBy(taxRates.vehicleCategory);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch tax rates:", error);
      res.status(500).json({ error: "Failed to fetch tax rates" });
    }
  });

  // Add new tax rate
  app.post("/api/admin/tax-rates", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        vehicleCategory: z.string().min(1),
        importDuty: z.number().min(0).max(100),
        exciseDuty: z.number().min(0).max(100),
        vat: z.number().min(0).max(100),
        rdl: z.number().min(0).max(100),
        idf: z.number().min(0).max(100),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(taxRates)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add tax rate:", error);
      res.status(500).json({ error: "Failed to add tax rate" });
    }
  });

  // Update tax rate
  app.put("/api/admin/tax-rates/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        importDuty: z.number().min(0).max(100).optional(),
        exciseDuty: z.number().min(0).max(100).optional(),
        vat: z.number().min(0).max(100).optional(),
        rdl: z.number().min(0).max(100).optional(),
        idf: z.number().min(0).max(100).optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(taxRates)
        .set(validation.data)
        .where(eq(taxRates.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Tax rate not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update tax rate:", error);
      res.status(500).json({ error: "Failed to update tax rate" });
    }
  });

  // Get all category rules
  app.get("/api/admin/category-rules", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(vehicleCategoryRules)
        .orderBy(vehicleCategoryRules.category);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch category rules:", error);
      res.status(500).json({ error: "Failed to fetch category rules" });
    }
  });

  // Add new category rule
  app.post("/api/admin/category-rules", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        category: z.string().min(1),
        minEngineSize: z.number().optional(),
        maxEngineSize: z.number().optional(),
        fuelType: z.string().optional(),
        priority: z.number().default(0),
        description: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(vehicleCategoryRules)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add category rule:", error);
      res.status(500).json({ error: "Failed to add category rule" });
    }
  });

  // Update category rule
  app.put("/api/admin/category-rules/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        category: z.string().optional(),
        minEngineSize: z.number().optional(),
        maxEngineSize: z.number().optional(),
        fuelType: z.string().optional(),
        priority: z.number().optional(),
        description: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(vehicleCategoryRules)
        .set(validation.data)
        .where(eq(vehicleCategoryRules.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Category rule not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update category rule:", error);
      res.status(500).json({ error: "Failed to update category rule" });
    }
  });

  // Get all depreciation rates
  app.get("/api/admin/depreciation-rates", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(depreciationRates)
        .orderBy(depreciationRates.importType, depreciationRates.minYears);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch depreciation rates:", error);
      res.status(500).json({ error: "Failed to fetch depreciation rates" });
    }
  });

  // Update depreciation rate
  app.put("/api/admin/depreciation-rates/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        importType: z.enum(["direct", "previouslyRegistered"]).optional(),
        minYears: z.number().min(0).optional(),
        maxYears: z.number().min(0).optional(),
        rate: z.number().min(0).max(1).optional(),
        description: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(depreciationRates)
        .set(validation.data)
        .where(eq(depreciationRates.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Depreciation rate not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update depreciation rate:", error);
      res.status(500).json({ error: "Failed to update depreciation rate" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
