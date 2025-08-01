import express, { type Request, Response, NextFunction } from "express";
import compression from 'compression';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { CacheService } from './services/cache-service';
import { ImageOptimizer } from './services/image-optimizer';

const app = express();
app.set('trust proxy', 1); // Trust the proxy for secure cookies

// Enable compression for all responses
app.use(compression({
  level: 6, // Good balance between compression and speed
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    // Don't compress authentication routes or session-related responses
    if (req.path.startsWith('/api/auth/') || 
        req.path.startsWith('/api/user/') ||
        req.path.includes('login') ||
        req.path.includes('logout') ||
        req.path.includes('session')) {
      return false;
    }
    // Don't compress if the request has a no-transform directive
    if (req.headers['cache-control'] && req.headers['cache-control'].includes('no-transform')) {
      return false;
    }
    // Use compression for all other responses
    return compression.filter(req, res);
  }
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

// EMERGENCY BYPASS: Direct car details route (before any problematic middleware)
import { carListings, appUsers } from "@shared/schema-minimal";
import { db } from "./db";
import { eq } from "drizzle-orm";

app.get('/api/car-listings/:id/details', async (req, res) => {
  try {
    const { id } = req.params;
    const listingId = parseInt(id);
    
    if (isNaN(listingId)) {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    res.set('Cache-Control', 'public, max-age=180');

    const listingResults = await db
      .select()
      .from(carListings)
      .where(eq(carListings.id, listingId))
      .limit(1);
    
    if (!listingResults || listingResults.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    const listing = listingResults[0];
    
    let seller = null;
    if (listing.sellerId) {
      try {
        const sellerResults = await db
          .select({
            firstName: appUsers.firstName,
            lastName: appUsers.lastName,
            phoneNumber: appUsers.phoneNumber
          })
          .from(appUsers)
          .where(eq(appUsers.id, listing.sellerId))
          .limit(1);
        
        seller = sellerResults[0] || null;
      } catch (sellerError) {
        console.warn('Could not fetch seller info:', sellerError);
      }
    }

    const carDetails = {
      id: listing.id,
      sellerId: listing.sellerId,
      make: listing.make,
      model: listing.model,
      year: listing.year,
      price: Number(listing.price),
      mileage: listing.mileage || 0,
      fuelType: listing.fuelType || "Petrol",
      transmission: listing.transmission || "Manual",
      bodyType: listing.bodyType || "Sedan",
      engineSize: listing.engineSize ? `${listing.engineSize}cc` : "1500cc",
      doors: 5,
      seats: 5,
      exteriorColor: listing.exteriorColor || "Silver",
      interiorColor: listing.interiorColor || "Black",
      condition: "Used",
      location: listing.location,
      images: listing.images || [],
      documents: listing.documents || [],
      features: listing.features || [],
      isVerified: listing.verificationStatus === 'verified',
      hasWarranty: false,
      hasFreeDelivery: false,
      warrantyDetails: "Contact seller for warranty information",
      deliveryInfo: "Contact seller for delivery information",
      viewCount: listing.viewCount || 0,
      favoriteCount: listing.favoriteCount || 0,
      createdAt: listing.createdAt?.toISOString() || new Date().toISOString(),
      description: listing.description || "No description available",
      negotiable: listing.negotiable || true,
      sellerInfo: {
        name: seller ? `${seller.firstName || ''} ${seller.lastName || ''}`.trim() || "Unknown Seller" : "Unknown Seller",
        type: "individual" as const,
        rating: 4.5,
        reviewCount: 0,
        location: listing.location,
        phone: seller?.phoneNumber || "Not provided",
        whatsapp: seller?.phoneNumber || "Not provided"
      },
      vehicleHistory: {
        previousOwners: 1,
        serviceHistory: "Contact seller for service history",
        accidentHistory: "Contact seller for accident history", 
        motStatus: "Contact seller for inspection status",
        lastService: "Contact seller for service information"
      },
      financingOptions: {
        monthlyPayment: Math.round(Number(listing.price) * 0.02),
        depositAmount: Math.round(Number(listing.price) * 0.2),
        loanTerm: 48,
        interestRate: 12.5
      }
    };

    res.json({ carDetails });
  } catch (error) {
    console.error('Failed to fetch car details:', error);
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Cache control middleware
app.use((req, res, next) => {
  // Exclude authentication routes from caching
  if (req.path.startsWith('/api/auth/') || 
      req.path.startsWith('/api/messaging/') ||
      req.path.startsWith('/api/user/') ||
      req.path.includes('login') ||
      req.path.includes('logout') ||
      req.path.includes('session')) {
    // No caching for authentication and user-specific routes
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  } else if (req.path.startsWith('/api/images/')) {
    // Cache images for 1 year
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.path.startsWith('/api/car-listings') || 
             req.path.startsWith('/api/vehicle-references') ||
             req.path.startsWith('/api/car-listing-filters')) {
    // Skip caching if clear parameter is present
    if (req.query.clear === 'true') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else {
      // Cache API responses for 5 minutes
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    }
  } else if (req.path.startsWith('/api/')) {
    // Default API cache for 1 minute (but not auth routes)
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
  }
  next();
});

(async () => {
  // Initialize performance services in the background (non-blocking)
  Promise.allSettled([
    CacheService.initialize(),
    ImageOptimizer.initialize()
  ]).then((results) => {
    results.forEach((result, index) => {
      const serviceName = index === 0 ? 'CacheService' : 'ImageOptimizer';
      if (result.status === 'rejected') {
        console.warn(`${serviceName} initialization failed:`, result.reason);
      } else {
        console.log(`${serviceName} initialized successfully`);
      }
    });
  }).catch(error => {
    console.warn('Service initialization error:', error);
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
