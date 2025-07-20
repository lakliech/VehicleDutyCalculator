import type { Express, Request, Response } from "express";
import { db } from "../db";
import { carListings, appUsers } from "@shared/schema-minimal";
import { importListingSchema, ImportListing } from "@shared/schema-minimal";
import { eq } from "drizzle-orm";

// Default seller information for imports
const DEFAULT_SELLER = {
  id: "import-seller",
  email: "imports@jansmotors.co.ke", 
  name: "JANS Motors",
  phone: "0700123456"
};

function mapImportToCarListing(importData: ImportListing, sellerId: string) {
  // Map Excel data to car listing format
  const {
    title,
    make,
    model,
    year,
    price,
    mileage = 0,
    fuelType = "petrol",
    transmission = "automatic",
    bodyType = "sedan",
    driveConfiguration = "2wd",
    engineSize,
    exteriorColor = "silver",
    interiorColor = "black", 
    condition = "used",
    location = "Nairobi",
    county = "Nairobi",
    area = "Westlands",
    description,
    features = ["Air Conditioning", "Power Steering", "Electric Windows"],
    sellerName,
    sellerPhone,
    sellerEmail,
    stockNumber,
    chassisType,
    grade,
    doors = 4,
    seats = 5,
    auctionGrade,
    extraFeatures,
    status = "pending"
  } = importData;

  // Create comprehensive description
  let fullDescription = description || `${year} ${make} ${model} in excellent condition.`;
  
  if (stockNumber) fullDescription += ` Stock Number: ${stockNumber}.`;
  if (chassisType) fullDescription += ` Chassis: ${chassisType}.`;
  if (grade) fullDescription += ` Grade: ${grade}.`;
  if (auctionGrade) fullDescription += ` Auction Grade: ${auctionGrade}.`;
  if (extraFeatures) fullDescription += ` Extra Features: ${extraFeatures}.`;
  
  fullDescription += " Contact for viewing and test drive.";

  return {
    sellerId,
    title,
    make: make.toUpperCase(),
    model: model.toUpperCase(),
    year,
    price: price.toString(),
    mileage,
    fuelType: fuelType.toLowerCase(),
    transmission: transmission.toLowerCase(),
    bodyType: bodyType.toLowerCase(),
    driveConfiguration: driveConfiguration.toLowerCase(),
    engineSize,
    exteriorColor: exteriorColor.toLowerCase(),
    interiorColor: interiorColor.toLowerCase(),
    condition: condition.toLowerCase(),
    location,
    locationType: "locally_available" as const,
    description: fullDescription,
    features,
    phoneNumber: sellerPhone || DEFAULT_SELLER.phone,
    status: status as "pending" | "active" | "inactive",
    images: [],
    videos: [],
    documents: null,
    negotiable: true,
    isVerified: false,
    featured: false,
    isFlagged: false,
    listingSource: "JANS_EXCEL_IMPORT"
  };
}

export function registerImportRoutes(app: Express) {
  // Create import listing endpoint
  app.post("/api/import-listing", async (req: Request, res: Response) => {
    try {
      console.log("Import listing request:", req.body);
      
      // Validate the import data
      const validatedData = importListingSchema.parse(req.body);
      console.log("Validated import data:", validatedData);

      // Find or create the import seller
      let seller = await db
        .select()
        .from(appUsers)
        .where(eq(appUsers.email, DEFAULT_SELLER.email))
        .limit(1);

      let sellerId: string;
      
      if (seller.length === 0) {
        console.log("Creating import seller user");
        // Create the import seller user
        const newSeller = await db
          .insert(appUsers)
          .values({
            id: DEFAULT_SELLER.id,
            email: DEFAULT_SELLER.email,
            firstName: "JANS",
            lastName: "Motors",
            phoneNumber: DEFAULT_SELLER.phone,
            isActive: true,
            status: "active",
            emailVerified: true,
            roleId: "user" // Default role
          })
          .returning();
        
        sellerId = newSeller[0].id;
        console.log("Created seller with ID:", sellerId);
      } else {
        sellerId = seller[0].id;
        console.log("Using existing seller ID:", sellerId);
      }

      // Map import data to car listing format
      const carListingData = mapImportToCarListing(validatedData, sellerId);
      console.log("Mapped car listing data:", carListingData);

      // Insert the car listing
      const result = await db
        .insert(carListings)
        .values(carListingData)
        .returning();

      console.log("✓ Created car listing:", result[0].id);

      res.status(201).json({
        success: true,
        listingId: result[0].id,
        title: result[0].title,
        message: "Listing imported successfully"
      });

    } catch (error: any) {
      console.error("Import listing error:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.errors
        });
      }

      res.status(500).json({
        success: false,
        error: "Failed to import listing",
        message: error.message
      });
    }
  });

  // Bulk import endpoint for multiple listings
  app.post("/api/import-listings-bulk", async (req: Request, res: Response) => {
    try {
      const { listings } = req.body;
      
      if (!Array.isArray(listings) || listings.length === 0) {
        return res.status(400).json({
          success: false,
          error: "Invalid listings data"
        });
      }

      console.log(`Processing ${listings.length} listings for bulk import`);

      // Find or create the import seller
      let seller = await db
        .select()
        .from(appUsers)
        .where(eq(appUsers.email, DEFAULT_SELLER.email))
        .limit(1);

      let sellerId: string;
      
      if (seller.length === 0) {
        const newSeller = await db
          .insert(appUsers)
          .values({
            id: DEFAULT_SELLER.id,
            email: DEFAULT_SELLER.email,
            firstName: "JANS",
            lastName: "Motors",
            phoneNumber: DEFAULT_SELLER.phone,
            isActive: true,
            status: "active",
            emailVerified: true,
            roleId: "user"
          })
          .returning();
        
        sellerId = newSeller[0].id;
      } else {
        sellerId = seller[0].id;
      }

      const results = [];
      const errors = [];

      // Process each listing
      for (let i = 0; i < listings.length; i++) {
        try {
          const validatedData = importListingSchema.parse(listings[i]);
          const carListingData = mapImportToCarListing(validatedData, sellerId);
          
          const result = await db
            .insert(carListings)
            .values(carListingData)
            .returning();

          results.push({
            index: i,
            listingId: result[0].id,
            title: result[0].title,
            success: true
          });

        } catch (error: any) {
          errors.push({
            index: i,
            error: error.message,
            data: listings[i]
          });
        }
      }

      console.log(`✓ Bulk import completed: ${results.length} success, ${errors.length} errors`);

      res.status(200).json({
        success: true,
        imported: results.length,
        failed: errors.length,
        results,
        errors: errors.slice(0, 10) // Limit error details
      });

    } catch (error: any) {
      console.error("Bulk import error:", error);
      res.status(500).json({
        success: false,
        error: "Bulk import failed",
        message: error.message
      });
    }
  });
}