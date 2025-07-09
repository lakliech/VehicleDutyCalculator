import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  dutyCalculationSchema, 
  vehicleReferences, 
  taxRates, 
  processingFees,
  vehicleCategoryRules, 
  depreciationRates,
  trailers,
  heavyMachinery,
  insertVehicleReferenceSchema
} from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import { sql, eq } from "drizzle-orm";
import multer from "multer";
import { parse } from "csv-parse/sync";

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

  // Trailers endpoints
  app.get('/api/trailers', async (req, res) => {
    try {
      const trailersList = await db
        .select()
        .from(trailers)
        .orderBy(trailers.type, trailers.make);
      
      res.json(trailersList);
    } catch (error) {
      console.error("Error fetching trailers:", error);
      res.status(500).json({ message: "Failed to fetch trailers" });
    }
  });

  // Heavy machinery endpoints
  app.get('/api/heavy-machinery', async (req, res) => {
    try {
      const machineryList = await db
        .select()
        .from(heavyMachinery)
        .orderBy(heavyMachinery.category, heavyMachinery.make, heavyMachinery.model);
      
      res.json(machineryList);
    } catch (error) {
      console.error("Error fetching heavy machinery:", error);
      res.status(500).json({ message: "Failed to fetch heavy machinery" });
    }
  });

  // Heavy machinery categories
  app.get('/api/heavy-machinery/categories', async (req, res) => {
    try {
      const categories = await db
        .selectDistinct({ category: heavyMachinery.category })
        .from(heavyMachinery)
        .orderBy(heavyMachinery.category);
      
      res.json(categories.map(row => row.category));
    } catch (error) {
      console.error("Error fetching machinery categories:", error);
      res.status(500).json({ message: "Failed to fetch machinery categories" });
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
        importDutyRate: z.string(),
        exciseDutyRate: z.string(),
        vatRate: z.string(),
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
        importDutyRate: z.string().optional(),
        exciseDutyRate: z.string().optional(),
        vatRate: z.string().optional(),
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

  // ===============================
  // PROCESSING FEES API ROUTES
  // ===============================

  // Get all processing fees
  app.get("/api/admin/processing-fees", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(processingFees)
        .orderBy(processingFees.feeType);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch processing fees:", error);
      res.status(500).json({ error: "Failed to fetch processing fees" });
    }
  });

  // Add new processing fee
  app.post("/api/admin/processing-fees", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        feeType: z.string().min(1),
        feeName: z.string().min(1),
        rate: z.string(),
        applicableToImportType: z.enum(["direct", "previouslyRegistered", "both"]),
        calculationBase: z.string(),
        description: z.string().optional(),
        isActive: z.boolean().default(true),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(processingFees)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add processing fee:", error);
      res.status(500).json({ error: "Failed to add processing fee" });
    }
  });

  // Update processing fee
  app.put("/api/admin/processing-fees/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        feeName: z.string().optional(),
        rate: z.string().optional(),
        applicableToImportType: z.enum(["direct", "previouslyRegistered", "both"]).optional(),
        calculationBase: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(processingFees)
        .set(validation.data)
        .where(eq(processingFees.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Processing fee not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update processing fee:", error);
      res.status(500).json({ error: "Failed to update processing fee" });
    }
  });

  // Delete processing fee
  app.delete("/api/admin/processing-fees/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const [result] = await db
        .delete(processingFees)
        .where(eq(processingFees.id, id))
        .returning();
      
      if (!result) {
        return res.status(404).json({ error: "Processing fee not found" });
      }
      
      res.json({ message: "Processing fee deleted successfully", id });
    } catch (error) {
      console.error("Failed to delete processing fee:", error);
      res.status(400).json({ error: "Failed to delete processing fee" });
    }
  });

  // ===============================
  // CATEGORY RULES API ROUTES
  // ===============================

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

  // CSV Upload functionality for vehicle references
  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/api/admin/upload-vehicle-csv", authenticateAdmin, upload.single('csv'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No CSV file uploaded" });
      }

      const csvContent = req.file.buffer.toString('utf8');
      
      // Parse CSV with flexible options to handle quoted values and commas
      const records = parse(csvContent, {
        delimiter: ',',
        skip_empty_lines: true,
        relax_quotes: true,
        escape: '"',
        quote: '"',
        trim: true
      });

      const results = {
        total: 0,
        added: 0,
        updated: 0,
        failed: 0,
        errors: [] as string[]
      };

      for (const [index, record] of records.entries()) {
        try {
          // Skip empty rows
          if (!record || record.length === 0 || record.every((cell: string) => !cell?.trim())) {
            continue;
          }

          results.total++;

          // Parse CSV format: Make, Model, Engine Capacity, Body Type, Drive Config, [Empty], Fuel Type, [Empty], CRSP Value
          const [
            make,
            model, 
            engineCapacityStr,
            bodyType,
            driveConfiguration,
            ,  // Skip empty column
            fuelType,
            ,  // Skip empty column  
            crspStr
          ] = record;

          // Validate required fields
          if (!make?.trim() || !model?.trim()) {
            results.failed++;
            results.errors.push(`Row ${index + 1}: Missing make or model`);
            continue;
          }

          // Clean and parse numeric values
          const engineCapacity = engineCapacityStr ? parseInt(engineCapacityStr.toString().trim()) : null;
          
          // Clean CRSP value - remove commas, quotes, and parse
          let crspKes = null;
          if (crspStr) {
            const cleanCrsp = crspStr.toString().replace(/[",]/g, '').trim();
            if (cleanCrsp && !isNaN(Number(cleanCrsp))) {
              crspKes = parseFloat(cleanCrsp);
            }
          }

          const vehicleData = {
            make: make.toString().trim().toUpperCase(),
            model: model.toString().trim().toUpperCase(),
            engineCapacity,
            bodyType: bodyType?.toString().trim() || null,
            driveConfiguration: driveConfiguration?.toString().trim() || null,
            fuelType: fuelType?.toString().trim().toLowerCase() || null,
            crspKes
          };

          // Check if vehicle already exists (by make, model, engine capacity)
          const existing = await db
            .select()
            .from(vehicleReferences)
            .where(sql`
              LOWER(${vehicleReferences.make}) = LOWER(${vehicleData.make}) AND
              LOWER(${vehicleReferences.model}) = LOWER(${vehicleData.model}) AND
              ${vehicleReferences.engineCapacity} = ${vehicleData.engineCapacity}
            `)
            .limit(1);

          if (existing.length > 0) {
            // Update existing vehicle
            await db
              .update(vehicleReferences)
              .set(vehicleData)
              .where(eq(vehicleReferences.id, existing[0].id));
            results.updated++;
          } else {
            // Insert new vehicle
            await db
              .insert(vehicleReferences)
              .values(vehicleData);
            results.added++;
          }

        } catch (error: any) {
          results.failed++;
          results.errors.push(`Row ${index + 1}: ${error.message}`);
        }
      }

      res.json(results);
    } catch (error: any) {
      console.error("CSV upload error:", error);
      res.status(500).json({ 
        error: "Failed to process CSV file",
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
