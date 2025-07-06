import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { dutyCalculationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
