import { db } from "./db";
import { userRoles } from "@shared/schema";

async function initializeUserRoles() {
  console.log("Initializing user roles...");
  
  const roles = [
    {
      name: "user",
      description: "Standard user with basic permissions",
      permissions: ["create_listing", "view_own_listings", "edit_own_listings"]
    },
    {
      name: "editor", 
      description: "Editor with listing review permissions",
      permissions: ["create_listing", "view_own_listings", "edit_own_listings", "review_listings", "approve_listings", "reject_listings"]
    },
    {
      name: "admin",
      description: "Administrator with full listing and user management permissions", 
      permissions: ["create_listing", "view_own_listings", "edit_own_listings", "review_listings", "approve_listings", "reject_listings", "manage_users", "manage_listings", "view_all_listings"]
    },
    {
      name: "superadmin",
      description: "Super administrator with all permissions",
      permissions: ["*"]
    }
  ];

  try {
    // Check if roles already exist
    const existingRoles = await db.select().from(userRoles);
    
    if (existingRoles.length === 0) {
      console.log("Creating default user roles...");
      
      for (const role of roles) {
        await db.insert(userRoles).values(role);
        console.log(`Created role: ${role.name}`);
      }
      
      console.log("User roles initialized successfully!");
    } else {
      console.log("User roles already exist, skipping initialization.");
    }
  } catch (error) {
    console.error("Failed to initialize user roles:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeUserRoles()
    .then(() => {
      console.log("Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed:", error);
      process.exit(1);
    });
}

export { initializeUserRoles };