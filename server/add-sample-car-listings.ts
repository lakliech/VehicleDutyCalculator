import { db } from "./db";
import { carListings } from "@shared/schema";

const sampleListings = [
  {
    sellerId: "sample-seller-1",
    title: "2020 Toyota Camry - Excellent Condition",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    engineSize: 2500,
    mileage: 45000,
    fuelType: "petrol",
    bodyType: "sedan",
    transmission: "automatic",
    driveConfiguration: "2wd",
    exteriorColor: "White",
    interiorColor: "Black",
    condition: "excellent",
    price: "3200000",
    negotiable: true,
    description: "Well maintained Toyota Camry with full service history. Single owner, accident-free.",
    features: ["Air Conditioning", "Power Windows", "Bluetooth", "Backup Camera", "Cruise Control"],
    images: ["https://example.com/camry1.jpg", "https://example.com/camry2.jpg"],
    location: "Nairobi",
    phoneNumber: "+254701234567",
    whatsappNumber: "+254701234567",
    status: "active",
    isVerified: true,
    viewCount: 15,
    favoriteCount: 3,
    featured: true
  },
  {
    sellerId: "sample-seller-2",
    title: "2018 Honda CR-V - Adventure Ready",
    make: "Honda",
    model: "CR-V",
    year: 2018,
    engineSize: 1500,
    mileage: 62000,
    fuelType: "petrol",
    bodyType: "suv",
    transmission: "automatic",
    driveConfiguration: "awd",
    exteriorColor: "Silver",
    interiorColor: "Gray",
    condition: "good",
    price: "2800000",
    negotiable: true,
    description: "Reliable Honda CR-V perfect for family adventures. Well maintained with recent service.",
    features: ["AWD", "Sunroof", "Heated Seats", "Navigation System", "Parking Sensors"],
    images: ["https://example.com/crv1.jpg", "https://example.com/crv2.jpg"],
    location: "Mombasa",
    phoneNumber: "+254722123456",
    whatsappNumber: "+254722123456",
    status: "active",
    isVerified: true,
    viewCount: 8,
    favoriteCount: 1,
    featured: false
  },
  {
    sellerId: "sample-seller-3",
    title: "2019 Nissan X-Trail - Family SUV",
    make: "Nissan",
    model: "X-Trail",
    year: 2019,
    engineSize: 2000,
    mileage: 38000,
    fuelType: "petrol",
    bodyType: "suv",
    transmission: "automatic",
    driveConfiguration: "4wd",
    exteriorColor: "Blue",
    interiorColor: "Beige",
    condition: "excellent",
    price: "3500000",
    negotiable: false,
    description: "Spacious family SUV with premium features. Excellent condition throughout.",
    features: ["4WD", "Leather Seats", "Premium Audio", "Panoramic Roof", "7 Seater"],
    images: ["https://example.com/xtrail1.jpg", "https://example.com/xtrail2.jpg"],
    location: "Kisumu",
    phoneNumber: "+254733123456",
    whatsappNumber: "+254733123456",
    status: "active",
    isVerified: true,
    viewCount: 22,
    favoriteCount: 5,
    featured: true
  },
  {
    sellerId: "sample-seller-4",
    title: "2017 Subaru Forester - Reliable AWD",
    make: "Subaru",
    model: "Forester",
    year: 2017,
    engineSize: 2000,
    mileage: 75000,
    fuelType: "petrol",
    bodyType: "suv",
    transmission: "automatic",
    driveConfiguration: "awd",
    exteriorColor: "Green",
    interiorColor: "Black",
    condition: "good",
    price: "2400000",
    negotiable: true,
    description: "Trusted Subaru AWD system. Great for all terrain driving conditions.",
    features: ["AWD", "Roof Rails", "Hill Descent Control", "EyeSight Safety", "Cargo Space"],
    images: ["https://example.com/forester1.jpg", "https://example.com/forester2.jpg"],
    location: "Nakuru",
    phoneNumber: "+254744123456",
    whatsappNumber: "+254744123456",
    status: "active",
    isVerified: false,
    viewCount: 12,
    favoriteCount: 2,
    featured: false
  },
  {
    sellerId: "sample-seller-5",
    title: "2021 BMW 3 Series - Luxury Sedan",
    make: "BMW",
    model: "3 Series",
    year: 2021,
    engineSize: 2000,
    mileage: 25000,
    fuelType: "petrol",
    bodyType: "sedan",
    transmission: "automatic",
    driveConfiguration: "2wd",
    exteriorColor: "Black",
    interiorColor: "Red",
    condition: "excellent",
    price: "4800000",
    negotiable: false,
    description: "Premium luxury sedan with advanced technology and performance features.",
    features: ["Premium Audio", "Leather Interior", "Adaptive Cruise", "Lane Assist", "Wireless Charging"],
    images: ["https://example.com/bmw1.jpg", "https://example.com/bmw2.jpg"],
    location: "Nairobi",
    phoneNumber: "+254755123456",
    whatsappNumber: "+254755123456",
    status: "active",
    isVerified: true,
    viewCount: 35,
    favoriteCount: 8,
    featured: true
  },
  {
    sellerId: "sample-seller-6",
    title: "2016 Volkswagen Golf - Compact Hatchback",
    make: "Volkswagen",
    model: "Golf",
    year: 2016,
    engineSize: 1400,
    mileage: 85000,
    fuelType: "petrol",
    bodyType: "hatchback",
    transmission: "manual",
    driveConfiguration: "2wd",
    exteriorColor: "Red",
    interiorColor: "Black",
    condition: "good",
    price: "1800000",
    negotiable: true,
    description: "Efficient and reliable compact car. Perfect for city driving.",
    features: ["Manual Transmission", "Fuel Efficient", "Compact Size", "Good Handling", "Reliable"],
    images: ["https://example.com/golf1.jpg", "https://example.com/golf2.jpg"],
    location: "Eldoret",
    phoneNumber: "+254766123456",
    whatsappNumber: "+254766123456",
    status: "active",
    isVerified: true,
    viewCount: 6,
    favoriteCount: 1,
    featured: false
  }
];

async function addSampleListings() {
  try {
    console.log("Adding sample car listings...");
    
    for (const listing of sampleListings) {
      await db.insert(carListings).values(listing);
      console.log(`Added: ${listing.title}`);
    }
    
    console.log("✅ Successfully added all sample car listings!");
    
    // Verify the data was added
    const count = await db.select().from(carListings);
    console.log(`Total listings in database: ${count.length}`);
    
  } catch (error) {
    console.error("❌ Error adding sample listings:", error);
  }
}

// Run the script
addSampleListings();