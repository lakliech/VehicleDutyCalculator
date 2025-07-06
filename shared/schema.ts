import { pgTable, text, serial, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  vehicleType: text("vehicle_type").notNull(),
  vehicleValue: decimal("vehicle_value", { precision: 10, scale: 2 }).notNull(),
  engineSize: integer("engine_size").notNull(),
  vehicleAge: integer("vehicle_age").notNull(),
  fuelType: text("fuel_type").notNull(),
  state: text("state"),
  usage: text("usage").notNull(),
});

export const dutyRates = pgTable("duty_rates", {
  id: serial("id").primaryKey(),
  vehicleType: text("vehicle_type").notNull(),
  baseFee: decimal("base_fee", { precision: 10, scale: 2 }).notNull(),
  valueRate: decimal("value_rate", { precision: 5, scale: 4 }).notNull(),
  engineSurchargeRate: decimal("engine_surcharge_rate", { precision: 5, scale: 4 }),
});

export const insertVehicleSchema = createInsertSchema(vehicles).pick({
  vehicleType: true,
  vehicleValue: true,
  engineSize: true,
  vehicleAge: true,
  fuelType: true,
  state: true,
  usage: true,
});

export const dutyCalculationSchema = z.object({
  vehicleType: z.enum(["car", "motorcycle", "truck", "suv", "van", "bus"]),
  vehicleValue: z.number().min(0),
  engineSize: z.number().min(0),
  vehicleAge: z.number().min(0).max(20),
  fuelType: z.enum(["gasoline", "diesel", "hybrid", "electric", "other"]),
  state: z.string().optional(),
  usage: z.enum(["personal", "commercial"]),
});

export const dutyResultSchema = z.object({
  baseFee: z.number(),
  valueDuty: z.number(),
  engineSurcharge: z.number(),
  ageDiscount: z.number(),
  totalDuty: z.number(),
  breakdown: z.array(z.object({
    label: z.string(),
    amount: z.number(),
    description: z.string().optional(),
  })),
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type DutyRate = typeof dutyRates.$inferSelect;
export type DutyCalculation = z.infer<typeof dutyCalculationSchema>;
export type DutyResult = z.infer<typeof dutyResultSchema>;
