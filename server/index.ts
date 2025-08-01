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
