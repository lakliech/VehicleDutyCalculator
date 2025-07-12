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

    // Check if admin user already exists
    const existingAdmin = await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.email, "admin@gariyangu.com"));

    if (existingAdmin.length === 0) {
      console.log("Creating admin user...");
      
      // Get admin role ID
      const adminRole = await db
        .select()
        .from(userRoles)
        .where(eq(userRoles.name, "admin"));

      if (adminRole.length === 0) {
        throw new Error("Admin role not found");
      }

      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      await db.insert(appUsers).values({
        id: crypto.randomUUID(),
        email: "admin@gariyangu.com",
        firstName: "Admin",
        lastName: "User",
        phoneNumber: "0700000000",
        passwordHash: hashedPassword,
        roleId: adminRole[0].id,
        isActive: true,
        isEmailVerified: true,
        oauthProvider: null,
        profileImageUrl: null,
        lastLoginAt: null
      });

      console.log("Admin user created successfully!");
      console.log("Admin credentials:");
      console.log("Email: admin@gariyangu.com");
      console.log("Password: admin123");
    } else {
      console.log("Admin user already exists, skipping creation.");
    }

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