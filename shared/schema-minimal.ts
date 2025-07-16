import { pgTable, text, serial, integer, decimal, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Essential tables for marketplace functionality

// ==============================
// USER AUTHENTICATION & MANAGEMENT
// ==============================

export const appUsers = pgTable("app_users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phoneNumber: text("phone_number"),
  profileImageUrl: text("profile_image_url"),
  passwordHash: text("password_hash"),
  googleId: varchar("google_id", { length: 255 }),
  facebookId: varchar("facebook_id", { length: 255 }),
  appleId: varchar("apple_id", { length: 255 }),
  emailVerified: boolean("email_verified").default(false),
  phoneVerified: boolean("phone_verified").default(false),
  status: text("status").default("active"), // active, suspended, banned
  roleId: integer("role_id"),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// CAR LISTINGS 
// ==============================

export const carListings = pgTable("car_listings", {
  id: serial("id").primaryKey(),
  sellerId: varchar("seller_id", { length: 255 }).references(() => appUsers.id).notNull(),
  title: text("title").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engineSize: integer("engine_size"), // in cc
  mileage: integer("mileage"), // in km
  fuelType: text("fuel_type"), // petrol, diesel, electric, hybrid
  bodyType: text("body_type"), // sedan, suv, hatchback, etc.
  transmission: text("transmission"), // manual, automatic
  driveConfiguration: text("drive_configuration"), // 2WD, 4WD, AWD
  exteriorColor: text("exterior_color"),
  interiorColor: text("interior_color"),
  seating: text("seating"), // e.g., "5 seats"
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  negotiable: boolean("negotiable").default(true),
  location: text("location").notNull(),
  county: text("county"),
  description: text("description"),
  features: json("features"), // array of feature strings
  documents: json("documents"), // array of document objects
  images: json("images"), // array of image URLs
  viewCount: integer("view_count").default(0),
  favoriteCount: integer("favorite_count").default(0),
  phoneClickCount: integer("phone_click_count").default(0),
  shareCount: integer("share_count").default(0),
  inquiryCount: integer("inquiry_count").default(0),
  status: text("status").default("pending"), // pending, active, inactive, sold, rejected, archived
  isPromoted: boolean("is_promoted").default(false),
  promotedUntil: timestamp("promoted_until"),
  isFeatured: boolean("is_featured").default(false),
  verificationStatus: text("verification_status").default("unverified"), // unverified, pending, verified, rejected
  flaggedReason: text("flagged_reason"),
  flaggedAt: timestamp("flagged_at"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// MESSAGING SYSTEM
// ==============================

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'listing_inquiry', 'general_support', etc.
  title: text("title").notNull(),
  context: text("context"), // JSON object with relevant context (listingId, etc.)
  status: text("status").notNull().default("active"), // 'active', 'archived', 'closed'
  lastMessageAt: timestamp("last_message_at"),
  participantCount: integer("participant_count").default(2),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversationParticipants = pgTable("conversation_participants", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  role: text("role").notNull(), // 'buyer', 'seller', 'admin'
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true),
  lastReadMessageId: integer("last_read_message_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  senderId: varchar("sender_id", { length: 255 }).references(() => appUsers.id).notNull(),
  messageType: text("message_type").notNull().default("text"), // 'text', 'image', 'file', 'system'
  content: text("content").notNull(),
  metadata: text("metadata"), // JSON for attachments, etc.
  readCount: integer("read_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// APPOINTMENTS
// ==============================

export const videoCallAppointments = pgTable("video_call_appointments", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id, { onDelete: "cascade" }).notNull(),
  buyerId: varchar("buyer_id", { length: 255 }).references(() => appUsers.id).notNull(),
  sellerId: varchar("seller_id", { length: 255 }).references(() => appUsers.id).notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull().default(30), // in minutes
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed, no_show
  meetingLink: text("meeting_link"),
  notes: text("notes"),
  sellerNotes: text("seller_notes"),
  cancellationReason: text("cancellation_reason"),
  completionNotes: text("completion_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testDriveAppointments = pgTable("test_drive_appointments", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => carListings.id, { onDelete: "cascade" }).notNull(),
  buyerId: varchar("buyer_id", { length: 255 }).references(() => appUsers.id).notNull(),
  sellerId: varchar("seller_id", { length: 255 }).references(() => appUsers.id).notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull().default(60), // in minutes
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed, no_show
  meetingLocation: text("meeting_location"),
  notes: text("notes"),
  sellerNotes: text("seller_notes"),
  cancellationReason: text("cancellation_reason"),
  completionNotes: text("completion_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==============================
// SELLER AVAILABILITY
// ==============================

export const sellerAvailability = pgTable("seller_availability", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0 = Sunday, 1 = Monday, etc.
  startTime: text("start_time").notNull(), // HH:MM format
  endTime: text("end_time").notNull(), // HH:MM format
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sellerBlockedSlots = pgTable("seller_blocked_slots", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==============================
// USER ACTIVITIES (SIMPLIFIED)
// ==============================

export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => appUsers.id).notNull(),
  activityType: text("activity_type").notNull(),
  description: text("description"),
  entityType: text("entity_type"), // 'listing', 'user', etc.
  entityId: text("entity_id"),
  metadata: text("metadata"), // JSON for additional data
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==============================
// TYPES & SCHEMAS
// ==============================

export type AppUser = typeof appUsers.$inferSelect;
export type InsertAppUser = typeof appUsers.$inferInsert;
export const insertAppUserSchema = createInsertSchema(appUsers).omit({ id: true, createdAt: true, updatedAt: true });

export type CarListing = typeof carListings.$inferSelect;
export type InsertCarListing = typeof carListings.$inferInsert;
export const insertCarListingSchema = createInsertSchema(carListings).omit({ id: true, createdAt: true, updatedAt: true });

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

export type VideoCallAppointment = typeof videoCallAppointments.$inferSelect;
export type InsertVideoCallAppointment = typeof videoCallAppointments.$inferInsert;

export type TestDriveAppointment = typeof testDriveAppointments.$inferSelect;
export type InsertTestDriveAppointment = typeof testDriveAppointments.$inferInsert;

export type UserActivity = typeof userActivities.$inferSelect;
export type InsertUserActivity = typeof userActivities.$inferInsert;

// ==============================
// PASSPORT USER INTERFACE
// ==============================

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
}