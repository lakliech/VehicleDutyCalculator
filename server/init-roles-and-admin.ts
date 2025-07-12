import { db } from "./db";
import { userRoles, appUsers } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import crypto from "crypto";

/**
 * Initialize user roles and create an admin user
 */
async function initializeRolesAndAdmin() {
  console.log("Initializing user roles and admin user...");

  try {
    // Check if roles already exist
    const existingRoles = await db.select().from(userRoles);
    
    if (existingRoles.length === 0) {
      console.log("Creating user roles...");
      
      // Create default roles
      const roles = [
        {
          name: "user",
          description: "Regular user with basic permissions",
          permissions: ["view_listings", "create_listings", "manage_own_listings"]
        },
        {
          name: "editor",
          description: "Content editor with listing moderation permissions",
          permissions: ["view_listings", "create_listings", "manage_own_listings", "moderate_listings", "approve_listings"]
        },
        {
          name: "admin",
          description: "Administrator with full platform management permissions",
          permissions: ["view_listings", "create_listings", "manage_own_listings", "moderate_listings", "approve_listings", "manage_users", "view_analytics", "manage_settings"]
        },
        {
          name: "superadmin",
          description: "Super administrator with full system access",
          permissions: ["*"] // All permissions
        }
      ];

      for (const role of roles) {
        await db.insert(userRoles).values(role);
      }
      
      console.log("User roles created successfully!");
    } else {
      console.log("User roles already exist, skipping creation.");
    }

    // Note: Admin users are now created through Google OAuth
    // The admin role is assigned manually to existing users
    console.log("Admin users are now managed through Google OAuth authentication.");
    console.log("To create an admin user:");
    console.log("1. User must sign in with Google OAuth");
    console.log("2. Admin role must be assigned manually via database or admin panel");
    console.log("Current admin: jaredkoyier@gmail.com");

    console.log("Role and admin initialization completed!");
    
  } catch (error) {
    console.error("Failed to initialize roles and admin:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeRolesAndAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Initialization failed:", error);
      process.exit(1);
    });
}

export { initializeRolesAndAdmin };