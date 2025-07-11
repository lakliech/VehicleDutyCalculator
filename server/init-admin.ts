import { db } from "./db";
import { adminCredentials } from "@shared/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

/**
 * Initialize the default admin account
 */
async function initializeAdmin() {
  try {
    // Check if admin account already exists
    const existingAdmin = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.username, "admin"))
      .limit(1);

    if (existingAdmin.length > 0) {
      console.log("✓ Admin account already exists");
      return;
    }

    // Create default admin account
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    await db.insert(adminCredentials).values({
      username: "admin",
      passwordHash: hashedPassword,
      permissions: ["all"], // Full permissions
      isActive: true
    });

    console.log("✓ Default admin account created successfully");
    console.log("  Username: admin");
    console.log("  Password: admin123");
    console.log("⚠️  Please change the default password in production!");
    
  } catch (error) {
    console.error("❌ Failed to initialize admin account:", error);
    throw error;
  }
}

// Only run if called directly  
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { initializeAdmin };