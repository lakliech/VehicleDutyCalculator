import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { dutyCalculationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all duty rates
  app.get("/api/duty-rates", async (req, res) => {
    try {
      const rates = await storage.getDutyRates();
      res.json(rates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch duty rates" });
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
      res.json(result);
    } catch (error) {
      console.error("Duty calculation error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to calculate duty" 
      });
    }
  });

  // Get duty rate by vehicle type
  app.get("/api/duty-rates/:vehicleType", async (req, res) => {
    try {
      const { vehicleType } = req.params;
      const rate = await storage.getDutyRateByVehicleType(vehicleType);
      
      if (!rate) {
        return res.status(404).json({ error: "Duty rate not found for this vehicle type" });
      }
      
      res.json(rate);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch duty rate" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
