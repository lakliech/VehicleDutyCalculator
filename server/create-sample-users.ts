import { db } from "./db";
import { appUsers } from "@shared/schema";
import bcrypt from "bcrypt";

async function createSampleUsers() {
  try {
    console.log("Creating sample users...");
    
    const sampleUsers = [
      {
        id: "sample-seller-1",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        password: await bcrypt.hash("password123", 10),
        role: "user",
        isVerified: true
      },
      {
        id: "sample-seller-2", 
        email: "jane.smith@example.com",
        firstName: "Jane",
        lastName: "Smith",
        password: await bcrypt.hash("password123", 10),
        role: "user",
        isVerified: true
      },
      {
        id: "sample-seller-3",
        email: "mike.johnson@example.com", 
        firstName: "Mike",
        lastName: "Johnson",
        password: await bcrypt.hash("password123", 10),
        role: "user",
        isVerified: true
      },
      {
        id: "sample-seller-4",
        email: "sarah.wilson@example.com",
        firstName: "Sarah", 
        lastName: "Wilson",
        password: await bcrypt.hash("password123", 10),
        role: "user",
        isVerified: true
      },
      {
        id: "sample-seller-5",
        email: "david.brown@example.com",
        firstName: "David",
        lastName: "Brown", 
        password: await bcrypt.hash("password123", 10),
        role: "user",
        isVerified: true
      },
      {
        id: "sample-seller-6",
        email: "lisa.taylor@example.com",
        firstName: "Lisa",
        lastName: "Taylor",
        password: await bcrypt.hash("password123", 10),
        role: "user", 
        isVerified: true
      }
    ];
    
    for (const user of sampleUsers) {
      try {
        await db.insert(appUsers).values(user);
        console.log(`Created user: ${user.firstName} ${user.lastName} (${user.email})`);
      } catch (error) {
        // User might already exist, skip
        console.log(`User ${user.email} already exists, skipping...`);
      }
    }
    
    console.log("✅ Sample users creation completed!");
    
  } catch (error) {
    console.error("❌ Error creating sample users:", error);
  }
}

// Run the script
createSampleUsers();