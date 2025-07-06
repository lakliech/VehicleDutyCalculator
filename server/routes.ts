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
      res.json(result);
    } catch (error) {
      console.error("Duty calculation error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to calculate duty" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
