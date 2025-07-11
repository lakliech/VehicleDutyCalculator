import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  dutyCalculationSchema, 
  vehicleReferences, 
  taxRates, 
  processingFees,
  vehicleCategoryRules, 
  depreciationRates,
  trailers,
  heavyMachinery,
  insertVehicleReferenceSchema,
  vehicleTransferRates,
  userRegistrationSchema,
  userLoginSchema,
  carListingSchema,
  listingApprovalSchema,
  userRoleSchema,
  appUsers,
  userRoles
} from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import { sql, eq } from "drizzle-orm";
import multer from "multer";
import { parse } from "csv-parse/sync";
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import crypto from "crypto";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";

// Simple authentication middleware
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const authenticateAdmin = (req: any, res: any, next: any) => {
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = auth.substring(7);
  if (token !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  next();
};

// Helper function to get engine capacity filter based on category
function getEngineCapacityFilter(category: string) {
  switch (category) {
    case 'under1500cc':
      return sql`${vehicleReferences.engineCapacity} < 1500 AND ${vehicleReferences.engineCapacity} IS NOT NULL`;
    case 'over1500cc':
      return sql`${vehicleReferences.engineCapacity} >= 1500 AND ${vehicleReferences.engineCapacity} < 3000 AND ${vehicleReferences.engineCapacity} IS NOT NULL`;
    case 'largeEngine':
      return sql`${vehicleReferences.engineCapacity} >= 2500 AND ${vehicleReferences.engineCapacity} IS NOT NULL`;
    default:
      return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: "955395502828-pj4cbgcrkkehsjcsigst2jcn60t9qttm.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await storage.getUserByEmail(profile.emails?.[0]?.value || '');
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email: profile.emails?.[0]?.value || '',
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          profileImageUrl: profile.photos?.[0]?.value || null,
          password: crypto.randomBytes(32).toString('hex'), // Random password for OAuth users
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));

  // Passport serialization
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Auth middleware - supports both session and token authentication
  const authenticateUser = async (req: any, res: any, next: any) => {
    // Check for session-based authentication first (Google OAuth)
    if (req.isAuthenticated && req.isAuthenticated() && req.user) {
      req.user = req.user; // User is already available from session
      return next();
    }
    
    // Fallback to token-based authentication
    const auth = req.headers.authorization;
    
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const token = auth.substring(7);
    
    // For now, using simple token validation
    // In production, implement proper JWT validation
    try {
      const user = await storage.getUserById(token);
      if (!user) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

  const requireRole = (roles: string[]) => {
    return async (req: any, res: any, next: any) => {
      const userRole = await storage.getUserRole(req.user.id);
      if (!userRole || !roles.includes(userRole.name)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      next();
    };
  };

  // User Management API
  app.get("/api/auth/user", authenticateUser, async (req, res) => {
    res.json(req.user);
  });



  // User authentication routes
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const { email, firstName, lastName, phoneNumber, password } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }
      
      // Create new user
      const user = await storage.createUser({
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
      });
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ success: false, message: 'Registration failed' });
    }
  });

  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // Get user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      
      // In a real application, you would hash and compare passwords
      // For now, we'll do a simple comparison
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      // Update last login
      await storage.updateUser(user.id, { lastLoginAt: new Date() });
      
      res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  });

  // Google OAuth routes
  app.get('/api/auth/google', (req: Request, res: Response, next) => {
    // Store the referrer URL for redirect after login
    const returnTo = req.get('Referrer') || req.query.returnTo || '/';
    (req.session as any).returnTo = returnTo;
    
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  });

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/?error=auth_failed' }),
    (req: Request, res: Response) => {
      // Get stored return URL or default to home
      const returnTo = (req.session as any).returnTo || '/';
      delete (req.session as any).returnTo; // Clean up session
      
      // Successful authentication, redirect to original page
      res.redirect(`${returnTo}${returnTo.includes('?') ? '&' : '?'}social=google&success=true`);
    }
  );

  // Check authentication status
  app.get('/api/auth/status', (req: Request, res: Response) => {
    if (req.isAuthenticated?.() && req.user) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Logout route
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }
      res.json({ success: true, message: 'Logged out successfully' });
    });
  });

  app.get('/api/auth/apple', (req: Request, res: Response) => {
    // In a real application, this would redirect to Apple OAuth
    res.redirect('/?social=apple&success=true');
  });

  app.get('/api/auth/facebook', (req: Request, res: Response) => {
    // In a real application, this would redirect to Facebook OAuth
    res.redirect('/?social=facebook&success=true');
  });

  // Forgot password endpoints
  app.post('/api/auth/forgot-password', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
      
      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if user exists for security
        return res.json({ success: true, message: 'If an account with this email exists, you will receive a password reset link' });
      }
      
      // Create password reset token
      const resetToken = await storage.createPasswordResetToken(email);
      
      // In a real application, you would send an email here
      // For now, we'll just log the token and return success
      console.log(`Password reset token for ${email}: ${resetToken.token}`);
      console.log(`Reset link: ${req.protocol}://${req.get('host')}/reset-password?token=${resetToken.token}`);
      
      res.json({ success: true, message: 'Password reset instructions have been sent to your email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ success: false, message: 'Failed to process forgot password request' });
    }
  });

  app.post('/api/auth/reset-password', async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;
      
      if (!token || !newPassword) {
        return res.status(400).json({ success: false, message: 'Token and new password are required' });
      }
      
      if (newPassword.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
      }
      
      // Verify token is valid and not expired
      const resetToken = await storage.getValidPasswordResetToken(token);
      if (!resetToken) {
        return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
      }
      
      // Update user password
      await storage.updateUserPassword(resetToken.email, newPassword);
      
      // Mark token as used
      await storage.markPasswordResetTokenAsUsed(token);
      
      res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ success: false, message: 'Failed to reset password' });
    }
  });

  // Dashboard API endpoint
  app.get('/api/dashboard', async (req: Request, res: Response) => {
    try {
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        // For testing, check if it's the test user endpoint
        const testMode = req.query.test === 'true';
        if (testMode) {
          console.log('Dashboard test mode activated');
          const userId = 'test_user_dashboard';
          
          // Get user stats
          const stats = await storage.getUserStats(userId);
          
          // Get recent activities
          const activities = await storage.getUserActivities(userId, 10);
          
          // Generate personalized recommendations
          const recommendations = await storage.generateUserRecommendations(userId);
          
          // Quick actions based on user behavior
          const quickActions = [
            {
              title: "Calculate Import Duty",
              href: "/duty-calculator", 
              icon: "Calculator",
              color: "bg-purple-500"
            },
            {
              title: "Check Car Value",
              href: "/mycars-worth",
              icon: "DollarSign", 
              color: "bg-green-500"
            },
            {
              title: "Calculate Transfer Cost",
              href: "/transfer-cost",
              icon: "FileText",
              color: "bg-cyan-500"
            },
            {
              title: "Sell My Car",
              href: "/sell-my-car",
              icon: "ShoppingCart",
              color: "bg-pink-500"
            }
          ];

          const dashboardData = {
            stats: stats || {
              totalDutyCalculations: 0,
              totalTransferCalculations: 0,
              totalValuations: 0,
              totalListings: 0,
              activeListings: 0,
              totalViews: 0,
              totalInquiries: 0,
              lastActivityAt: null
            },
            recentActivities: activities,
            recommendations,
            quickActions
          };

          return res.json(dashboardData);
        }
        
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      const userId = req.user.id;
      
      // Get user stats
      const stats = await storage.getUserStats(userId);
      
      // Get recent activities
      const activities = await storage.getUserActivities(userId, 10);
      
      // Generate personalized recommendations
      const recommendations = await storage.generateUserRecommendations(userId);
      
      // Quick actions based on user behavior
      const quickActions = [
        {
          title: "Calculate Import Duty",
          href: "/duty-calculator", 
          icon: "Calculator",
          color: "bg-purple-500"
        },
        {
          title: "Check Car Value",
          href: "/mycars-worth",
          icon: "DollarSign", 
          color: "bg-green-500"
        },
        {
          title: "Calculate Transfer Cost",
          href: "/transfer-cost",
          icon: "FileText",
          color: "bg-cyan-500"
        },
        {
          title: "Sell My Car",
          href: "/sell-my-car",
          icon: "ShoppingCart",
          color: "bg-pink-500"
        }
      ];

      const dashboardData = {
        stats: stats || {
          totalDutyCalculations: 0,
          totalTransferCalculations: 0,
          totalValuations: 0,
          totalListings: 0,
          activeListings: 0,
          totalViews: 0,
          totalInquiries: 0,
          lastActivityAt: null
        },
        recentActivities: activities,
        recommendations,
        quickActions
      };

      res.json(dashboardData);
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ message: 'Failed to load dashboard data' });
    }
  });

  // Admin login endpoint (legacy)
  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
      res.json({ token: ADMIN_PASSWORD, success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  // User management endpoints
  app.get("/api/admin/users", authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
    try {
      // Get all users with their roles
      const users = await db.select({
        user: appUsers,
        role: userRoles
      })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id));
      
      res.json(users);
    } catch (error) {
      console.error("Failed to get users:", error);
      res.status(500).json({ error: "Failed to get users" });
    }
  });

  app.put("/api/admin/users/:id/role", authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
    try {
      const { roleId } = req.body;
      await storage.updateUserRole(req.params.id, roleId);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to update user role:", error);
      res.status(500).json({ error: "Failed to update user role" });
    }
  });

  // Role management endpoints
  app.get("/api/admin/roles", authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
    try {
      const roles = await storage.getAllRoles();
      res.json(roles);
    } catch (error) {
      console.error("Failed to get roles:", error);
      res.status(500).json({ error: "Failed to get roles" });
    }
  });

  app.post("/api/admin/roles", authenticateUser, requireRole(['superadmin']), async (req, res) => {
    try {
      const validation = userRoleSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const role = await storage.createRole(validation.data);
      res.json(role);
    } catch (error) {
      console.error("Failed to create role:", error);
      res.status(500).json({ error: "Failed to create role" });
    }
  });

  // Listing management endpoints
  app.get("/api/admin/listings", authenticateUser, requireRole(['editor', 'admin', 'superadmin']), async (req, res) => {
    try {
      const listings = await storage.getAllListingsForAdmin();
      res.json(listings);
    } catch (error) {
      console.error("Failed to get listings:", error);
      res.status(500).json({ error: "Failed to get listings" });
    }
  });

  app.post("/api/admin/listings/:id/approve", authenticateUser, requireRole(['editor', 'admin', 'superadmin']), async (req, res) => {
    try {
      const { notes } = req.body;
      const approval = await storage.approveListing(parseInt(req.params.id), req.user.id, notes);
      res.json(approval);
    } catch (error) {
      console.error("Failed to approve listing:", error);
      res.status(500).json({ error: "Failed to approve listing" });
    }
  });

  app.post("/api/admin/listings/:id/reject", authenticateUser, requireRole(['editor', 'admin', 'superadmin']), async (req, res) => {
    try {
      const { reason } = req.body;
      const approval = await storage.rejectListing(parseInt(req.params.id), req.user.id, reason);
      res.json(approval);
    } catch (error) {
      console.error("Failed to reject listing:", error);
      res.status(500).json({ error: "Failed to reject listing" });
    }
  });

  app.post("/api/admin/listings/:id/request-changes", authenticateUser, requireRole(['editor', 'admin', 'superadmin']), async (req, res) => {
    try {
      const { changes, notes } = req.body;
      const approval = await storage.requestChanges(parseInt(req.params.id), req.user.id, changes, notes);
      res.json(approval);
    } catch (error) {
      console.error("Failed to request changes:", error);
      res.status(500).json({ error: "Failed to request changes" });
    }
  });

  app.put("/api/admin/listings/:id", authenticateUser, requireRole(['editor', 'admin', 'superadmin']), async (req, res) => {
    try {
      const validation = carListingSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const listing = await storage.updateListing(parseInt(req.params.id), validation.data);
      res.json(listing);
    } catch (error) {
      console.error("Failed to update listing:", error);
      res.status(500).json({ error: "Failed to update listing" });
    }
  });

  app.delete("/api/admin/listings/:id", authenticateUser, requireRole(['admin', 'superadmin']), async (req, res) => {
    try {
      await storage.deleteListing(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to delete listing:", error);
      res.status(500).json({ error: "Failed to delete listing" });
    }
  });

  // ===============================
  // MARKETPLACE ENDPOINTS
  // ===============================

  // Search listings with filters
  app.get("/api/marketplace/search", async (req, res) => {
    try {
      const filters = req.query;
      const listings = await storage.searchListings(filters);
      res.json(listings);
    } catch (error) {
      console.error("Failed to search listings:", error);
      res.status(500).json({ error: "Failed to search listings" });
    }
  });

  // Get available makes
  app.get("/api/marketplace/makes", async (req, res) => {
    try {
      const makes = await storage.getAvailableMakes();
      res.json(makes);
    } catch (error) {
      console.error("Failed to get makes:", error);
      res.status(500).json({ error: "Failed to get makes" });
    }
  });

  // Get available models for a make
  app.get("/api/marketplace/models", async (req, res) => {
    try {
      const { make } = req.query;
      const models = await storage.getAvailableModels(make as string);
      res.json(models);
    } catch (error) {
      console.error("Failed to get models:", error);
      res.status(500).json({ error: "Failed to get models" });
    }
  });

  // Get single listing with seller details
  app.get("/api/marketplace/listings/:id", async (req, res) => {
    try {
      const listing = await storage.getListingWithSeller(parseInt(req.params.id));
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      console.error("Failed to get listing:", error);
      res.status(500).json({ error: "Failed to get listing" });
    }
  });

  // Update view count
  app.post("/api/marketplace/listings/:id/view", async (req, res) => {
    try {
      await storage.incrementViewCount(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to update view count:", error);
      res.status(500).json({ error: "Failed to update view count" });
    }
  });

  // Create new car listing
  app.post("/api/marketplace/listings", authenticateUser, async (req, res) => {
    try {
      const listingData = req.body;
      
      // Add seller ID from authenticated user
      const listingWithSeller = {
        ...listingData,
        sellerId: req.user.id
      };

      const listing = await storage.createListing(listingWithSeller);
      
      res.status(201).json(listing);
    } catch (error) {
      console.error("Failed to create listing:", error);
      res.status(500).json({ error: "Failed to create listing" });
    }
  });

  // Send inquiry about listing
  app.post("/api/marketplace/listings/:id/inquiries", async (req, res) => {
    try {
      const listingId = parseInt(req.params.id);
      const inquiryData = {
        ...req.body,
        listingId
      };
      
      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      console.error("Failed to create inquiry:", error);
      res.status(500).json({ error: "Failed to create inquiry" });
    }
  });

  // Send offer for listing
  app.post("/api/marketplace/listings/:id/offers", authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.id);
      const offerData = {
        ...req.body,
        listingId,
        buyerId: req.user.id
      };
      
      const offer = await storage.createOffer(offerData);
      res.status(201).json(offer);
    } catch (error) {
      console.error("Failed to create offer:", error);
      res.status(500).json({ error: "Failed to create offer" });
    }
  });

  // Toggle favorite listing
  app.post("/api/marketplace/favorites/:id", authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.id);
      await storage.addFavorite(req.user.id, listingId);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to add favorite:", error);
      res.status(500).json({ error: "Failed to add favorite" });
    }
  });

  app.delete("/api/marketplace/favorites/:id", authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.id);
      await storage.removeFavorite(req.user.id, listingId);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  });

  // Get heatmap data
  app.get("/api/marketplace/heatmap", async (req, res) => {
    try {
      const { make, location, priceRange } = req.query;
      const heatmapData = await storage.getMarketHeatmapData({
        make: make as string,
        location: location as string,
        priceRange: priceRange as string
      });
      res.json(heatmapData);
    } catch (error) {
      console.error("Failed to get heatmap data:", error);
      res.status(500).json({ error: "Failed to get heatmap data" });
    }
  });

  // Get market insights
  app.get("/api/marketplace/insights", async (req, res) => {
    try {
      const { make, location } = req.query;
      const insights = await storage.getMarketInsights({
        make: make as string,
        location: location as string
      });
      res.json(insights);
    } catch (error) {
      console.error("Failed to get market insights:", error);
      res.status(500).json({ error: "Failed to get market insights" });
    }
  });

  // User dashboard endpoints
  app.get("/api/user/listings", authenticateUser, async (req, res) => {
    try {
      const listings = await storage.getListingsByUser(req.user.id);
      res.json(listings);
    } catch (error) {
      console.error("Failed to get user listings:", error);
      res.status(500).json({ error: "Failed to get user listings" });
    }
  });

  app.get("/api/user/activities", authenticateUser, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const activities = await storage.getUserActivities(req.user.id, limit);
      res.json(activities);
    } catch (error) {
      console.error("Failed to get user activities:", error);
      res.status(500).json({ error: "Failed to get user activities" });
    }
  });

  app.get("/api/user/stats", authenticateUser, async (req, res) => {
    try {
      const stats = await storage.getUserStats(req.user.id);
      res.json(stats);
    } catch (error) {
      console.error("Failed to get user stats:", error);
      res.status(500).json({ error: "Failed to get user stats" });
    }
  });

  app.get("/api/user/preferences", authenticateUser, async (req, res) => {
    try {
      const preferences = await storage.getUserPreferences(req.user.id);
      res.json(preferences);
    } catch (error) {
      console.error("Failed to get user preferences:", error);
      res.status(500).json({ error: "Failed to get user preferences" });
    }
  });

  app.put("/api/user/preferences", authenticateUser, async (req, res) => {
    try {
      const preferences = await storage.updateUserPreferences(req.user.id, req.body);
      res.json(preferences);
    } catch (error) {
      console.error("Failed to update user preferences:", error);
      res.status(500).json({ error: "Failed to update user preferences" });
    }
  });

  // Car listing endpoints (public and user)
  app.post("/api/listings", authenticateUser, async (req, res) => {
    try {
      const validation = carListingSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const listing = await storage.createListing({
        ...validation.data,
        sellerId: req.user.id
      });

      res.json(listing);
    } catch (error) {
      console.error("Failed to create listing:", error);
      res.status(500).json({ error: "Failed to create listing" });
    }
  });

  // Marketplace endpoint alias for frontend
  app.post("/api/marketplace/listings", authenticateUser, async (req, res) => {
    try {
      const validation = carListingSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const listing = await storage.createListing({
        ...validation.data,
        sellerId: req.user.id
      });

      res.json(listing);
    } catch (error) {
      console.error("Failed to create listing:", error);
      res.status(500).json({ error: "Failed to create listing" });
    }
  });
  // Calculate duty
  app.post("/api/calculate-duty", async (req, res) => {
    try {
      const validation = dutyCalculationSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const result = await storage.calculateDuty(validation.data);
      
      // Save calculation to database
      try {
        const vehicleData = {
          vehicleCategory: validation.data.vehicleCategory,
          vehicleValue: validation.data.vehicleValue.toString(),
          engineSize: validation.data.engineSize || null,
          vehicleAge: validation.data.vehicleAge,
          isDirectImport: validation.data.isDirectImport,
          fuelType: validation.data.fuelType || null,
        };

        const calculationData = {
          customsValue: result.customsValue.toString(),
          importDuty: result.importDuty.toString(),
          exciseDuty: result.exciseDuty.toString(),
          vat: result.vat.toString(),
          rdl: result.rdl.toString(),
          idfFees: result.idfFees.toString(),
          totalTaxes: result.totalTaxes.toString(),
          depreciationRate: result.depreciationRate.toString(),
          depreciatedPrice: result.depreciatedPrice.toString(),
        };

        await storage.saveCalculation(vehicleData, calculationData);
        console.log("Calculation saved successfully");
      } catch (saveError) {
        console.error("Failed to save calculation:", saveError);
        // Continue without failing the request
      }

      res.json(result);
    } catch (error) {
      console.error("Duty calculation error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to calculate duty" 
      });
    }
  });

  // Get calculation history
  app.get("/api/calculations/history", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const history = await storage.getCalculationHistory(limit);
      res.json(history);
    } catch (error) {
      console.error("Failed to fetch calculation history:", error);
      res.status(500).json({ 
        error: "Failed to fetch calculation history" 
      });
    }
  });

  // Search vehicle references
  app.get("/api/vehicle-references/search", async (req, res) => {
    try {
      const { make, model, engineCapacity, limit = "20" } = req.query;
      
      // Build base query
      let whereConditions = [];
      
      if (make && typeof make === 'string') {
        whereConditions.push(sql`LOWER(${vehicleReferences.make}) = LOWER(${make})`);
      }
      
      if (model && typeof model === 'string') {
        whereConditions.push(sql`LOWER(${vehicleReferences.model}) = LOWER(${model})`);
      }
      
      if (engineCapacity && typeof engineCapacity === 'string') {
        whereConditions.push(sql`${vehicleReferences.engineCapacity} = ${parseInt(engineCapacity)}`);
      }

      // For proration reference vehicles (make only search), ensure vehicles have CRSP values and engine capacity
      if (make && !model && !engineCapacity) {
        whereConditions.push(sql`(${vehicleReferences.crspKes} IS NOT NULL OR ${vehicleReferences.crsp2020} IS NOT NULL)`);
        whereConditions.push(sql`${vehicleReferences.engineCapacity} IS NOT NULL`);
      }
      
      let results;
      if (whereConditions.length > 0) {
        const whereClause = sql.join(whereConditions, sql` AND `);
        results = await db
          .select()
          .from(vehicleReferences)
          .where(whereClause)
          .orderBy(vehicleReferences.make, vehicleReferences.model)
          .limit(parseInt(limit as string));
      } else {
        results = await db
          .select()
          .from(vehicleReferences)
          .orderBy(vehicleReferences.make, vehicleReferences.model)
          .limit(parseInt(limit as string));
      }
        
      res.json(results);
    } catch (error) {
      console.error("Failed to search vehicle references:", error);
      res.status(500).json({ 
        error: "Failed to search vehicle references" 
      });
    }
  });

  // Trailers endpoints
  app.get('/api/trailers', async (req, res) => {
    try {
      const trailersList = await db
        .select()
        .from(trailers)
        .orderBy(trailers.type, trailers.make);
      
      res.json(trailersList);
    } catch (error) {
      console.error("Error fetching trailers:", error);
      res.status(500).json({ message: "Failed to fetch trailers" });
    }
  });

  // Heavy machinery endpoints
  app.get('/api/heavy-machinery', async (req, res) => {
    try {
      const machineryList = await db
        .select()
        .from(heavyMachinery)
        .orderBy(heavyMachinery.category, heavyMachinery.make, heavyMachinery.model);
      
      res.json(machineryList);
    } catch (error) {
      console.error("Error fetching heavy machinery:", error);
      res.status(500).json({ message: "Failed to fetch heavy machinery" });
    }
  });

  // Heavy machinery categories
  app.get('/api/heavy-machinery/categories', async (req, res) => {
    try {
      const categories = await db
        .selectDistinct({ category: heavyMachinery.category })
        .from(heavyMachinery)
        .orderBy(heavyMachinery.category);
      
      res.json(categories.map(row => row.category));
    } catch (error) {
      console.error("Error fetching machinery categories:", error);
      res.status(500).json({ message: "Failed to fetch machinery categories" });
    }
  });

  // Get all distinct makes (with optional category filtering)
  app.get("/api/vehicle-references/makes", async (req, res) => {
    try {
      const { category } = req.query;
      
      let query = db
        .selectDistinct({ make: vehicleReferences.make })
        .from(vehicleReferences)
        .orderBy(vehicleReferences.make);
      
      // Apply category filtering based on engine capacity
      if (category && typeof category === 'string') {
        const engineFilter = getEngineCapacityFilter(category);
        if (engineFilter) {
          query = query.where(engineFilter);
        }
      }
      
      const results = await query;
      res.json(results.map(r => r.make));
    } catch (error) {
      console.error("Failed to fetch vehicle makes:", error);
      res.status(500).json({ 
        error: "Failed to fetch vehicle makes" 
      });
    }
  });

  // Get models for a specific make (with optional category filtering)
  app.get("/api/vehicle-references/makes/:make/models", async (req, res) => {
    try {
      const { make } = req.params;
      const { category } = req.query;
      
      let whereConditions = [sql`LOWER(${vehicleReferences.make}) = LOWER(${make})`];
      
      // Apply category filtering based on engine capacity
      if (category && typeof category === 'string') {
        const engineFilter = getEngineCapacityFilter(category);
        if (engineFilter) {
          whereConditions.push(engineFilter);
        }
      }
      
      const results = await db
        .selectDistinct({ 
          model: vehicleReferences.model
        })
        .from(vehicleReferences)
        .where(sql.join(whereConditions, sql` AND `))
        .orderBy(vehicleReferences.model);
        
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch models for make:", error);
      res.status(500).json({ 
        error: "Failed to fetch models" 
      });
    }
  });

  // Get engine sizes for a specific make and model (with optional category filtering)
  app.get("/api/vehicle-references/makes/:make/models/:model/engines", async (req, res) => {
    try {
      const { make, model } = req.params;
      const { category } = req.query;
      
      let whereConditions = [
        sql`LOWER(${vehicleReferences.make}) = LOWER(${make})`,
        sql`LOWER(${vehicleReferences.model}) = LOWER(${model})`,
        sql`${vehicleReferences.engineCapacity} IS NOT NULL`
      ];
      
      // Apply category filtering based on engine capacity
      if (category && typeof category === 'string') {
        const engineFilter = getEngineCapacityFilter(category);
        if (engineFilter) {
          whereConditions.push(engineFilter);
        }
      }
      
      const results = await db
        .selectDistinct({ 
          engineCapacity: vehicleReferences.engineCapacity
        })
        .from(vehicleReferences)
        .where(sql.join(whereConditions, sql` AND `))
        .orderBy(vehicleReferences.engineCapacity);
        
      res.json(results.map(r => r.engineCapacity).filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch engine sizes:", error);
      res.status(500).json({ 
        error: "Failed to fetch engine sizes" 
      });
    }
  });

  // ===============================
  // ADMIN API ROUTES
  // ===============================

  // Get all vehicle references for admin
  app.get("/api/admin/vehicle-references", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(vehicleReferences)
        .orderBy(vehicleReferences.make, vehicleReferences.model)
        .limit(1000);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch vehicle references:", error);
      res.status(500).json({ error: "Failed to fetch vehicle references" });
    }
  });

  // Add new vehicle reference
  app.post("/api/admin/vehicle-references", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        make: z.string().min(1),
        model: z.string().min(1),
        engineCapacity: z.number().optional(),
        bodyType: z.string().optional(),
        driveConfiguration: z.string().optional(),
        seating: z.string().optional(),
        fuelType: z.string().optional(),
        gvw: z.string().optional(),
        crspKes: z.number().optional(),
        crsp2020: z.number().optional(),
        discontinuationYear: z.number().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(vehicleReferences)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add vehicle reference:", error);
      res.status(500).json({ error: "Failed to add vehicle reference" });
    }
  });

  // Update vehicle reference
  app.put("/api/admin/vehicle-references/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        make: z.string().optional(),
        model: z.string().optional(),
        engineCapacity: z.number().optional(),
        bodyType: z.string().optional(),
        fuelType: z.string().optional(),
        driveConfiguration: z.string().optional(),
        crspKes: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      // Add missing fields for update
      const enhancedValidation = z.object({
        make: z.string().optional(),
        model: z.string().optional(),
        engineCapacity: z.number().optional(),
        bodyType: z.string().optional(),
        fuelType: z.string().optional(),
        driveConfiguration: z.string().optional(),
        seating: z.string().optional(),
        gvw: z.string().optional(),
        crspKes: z.number().optional(),
        crsp2020: z.number().optional(),
        discontinuationYear: z.number().optional(),
      }).safeParse(req.body);

      if (!enhancedValidation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: enhancedValidation.error.issues 
        });
      }

      // Format data properly
      const updateData = { ...enhancedValidation.data };
      if (updateData.make) updateData.make = updateData.make.toUpperCase();
      if (updateData.model) updateData.model = updateData.model.toUpperCase();
      if (updateData.fuelType) updateData.fuelType = updateData.fuelType.toLowerCase();

      const [result] = await db
        .update(vehicleReferences)
        .set(updateData)
        .where(eq(vehicleReferences.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Vehicle reference not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update vehicle reference:", error);
      res.status(500).json({ error: "Failed to update vehicle reference" });
    }
  });

  // Delete vehicle reference
  app.delete("/api/admin/vehicle-references/:id", authenticateAdmin, async (req, res) => {
    try {
      const vehicleId = parseInt(req.params.id);
      
      const [result] = await db
        .delete(vehicleReferences)
        .where(eq(vehicleReferences.id, vehicleId))
        .returning();
      
      if (!result) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      
      res.json({ message: "Vehicle deleted successfully", id: vehicleId });
    } catch (error) {
      console.error("Failed to delete vehicle reference:", error);
      res.status(400).json({ error: "Failed to delete vehicle reference" });
    }
  });

  // Get all tax rates
  app.get("/api/admin/tax-rates", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(taxRates)
        .orderBy(taxRates.vehicleCategory);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch tax rates:", error);
      res.status(500).json({ error: "Failed to fetch tax rates" });
    }
  });

  // Add new tax rate
  app.post("/api/admin/tax-rates", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        vehicleCategory: z.string().min(1),
        importDutyRate: z.string(),
        exciseDutyRate: z.string(),
        vatRate: z.string(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(taxRates)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add tax rate:", error);
      res.status(500).json({ error: "Failed to add tax rate" });
    }
  });

  // Update tax rate
  app.put("/api/admin/tax-rates/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        importDutyRate: z.string().optional(),
        exciseDutyRate: z.string().optional(),
        vatRate: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(taxRates)
        .set(validation.data)
        .where(eq(taxRates.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Tax rate not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update tax rate:", error);
      res.status(500).json({ error: "Failed to update tax rate" });
    }
  });

  // ===============================
  // PROCESSING FEES API ROUTES
  // ===============================

  // Get all processing fees
  app.get("/api/admin/processing-fees", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(processingFees)
        .orderBy(processingFees.feeType);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch processing fees:", error);
      res.status(500).json({ error: "Failed to fetch processing fees" });
    }
  });

  // Add new processing fee
  app.post("/api/admin/processing-fees", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        feeType: z.string().min(1),
        feeName: z.string().min(1),
        rate: z.string(),
        applicableToImportType: z.enum(["direct", "previouslyRegistered", "both"]),
        calculationBase: z.string(),
        description: z.string().optional(),
        isActive: z.boolean().default(true),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(processingFees)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add processing fee:", error);
      res.status(500).json({ error: "Failed to add processing fee" });
    }
  });

  // Update processing fee
  app.put("/api/admin/processing-fees/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        feeName: z.string().optional(),
        rate: z.string().optional(),
        applicableToImportType: z.enum(["direct", "previouslyRegistered", "both"]).optional(),
        calculationBase: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(processingFees)
        .set(validation.data)
        .where(eq(processingFees.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Processing fee not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update processing fee:", error);
      res.status(500).json({ error: "Failed to update processing fee" });
    }
  });

  // Delete processing fee
  app.delete("/api/admin/processing-fees/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const [result] = await db
        .delete(processingFees)
        .where(eq(processingFees.id, id))
        .returning();
      
      if (!result) {
        return res.status(404).json({ error: "Processing fee not found" });
      }
      
      res.json({ message: "Processing fee deleted successfully", id });
    } catch (error) {
      console.error("Failed to delete processing fee:", error);
      res.status(400).json({ error: "Failed to delete processing fee" });
    }
  });

  // ===============================
  // CATEGORY RULES API ROUTES
  // ===============================

  // Get all category rules
  app.get("/api/admin/category-rules", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(vehicleCategoryRules)
        .orderBy(vehicleCategoryRules.category);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch category rules:", error);
      res.status(500).json({ error: "Failed to fetch category rules" });
    }
  });

  // Add new category rule
  app.post("/api/admin/category-rules", authenticateAdmin, async (req, res) => {
    try {
      const validation = z.object({
        category: z.string().min(1),
        minEngineSize: z.number().optional(),
        maxEngineSize: z.number().optional(),
        fuelType: z.string().optional(),
        priority: z.number().default(0),
        description: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(vehicleCategoryRules)
        .values(validation.data)
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to add category rule:", error);
      res.status(500).json({ error: "Failed to add category rule" });
    }
  });

  // Update category rule
  app.put("/api/admin/category-rules/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        category: z.string().optional(),
        minEngineSize: z.number().optional(),
        maxEngineSize: z.number().optional(),
        fuelType: z.string().optional(),
        priority: z.number().optional(),
        description: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(vehicleCategoryRules)
        .set(validation.data)
        .where(eq(vehicleCategoryRules.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Category rule not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update category rule:", error);
      res.status(500).json({ error: "Failed to update category rule" });
    }
  });

  // Get all depreciation rates
  app.get("/api/admin/depreciation-rates", authenticateAdmin, async (req, res) => {
    try {
      const results = await db
        .select()
        .from(depreciationRates)
        .orderBy(depreciationRates.importType, depreciationRates.minYears);
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch depreciation rates:", error);
      res.status(500).json({ error: "Failed to fetch depreciation rates" });
    }
  });

  // Update depreciation rate
  app.put("/api/admin/depreciation-rates/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = z.object({
        importType: z.enum(["direct", "previouslyRegistered"]).optional(),
        minYears: z.number().min(0).optional(),
        maxYears: z.number().min(0).optional(),
        rate: z.number().min(0).max(1).optional(),
        description: z.string().optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .update(depreciationRates)
        .set(validation.data)
        .where(eq(depreciationRates.id, id))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Depreciation rate not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Failed to update depreciation rate:", error);
      res.status(500).json({ error: "Failed to update depreciation rate" });
    }
  });

  // CSV Upload functionality for vehicle references
  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/api/admin/upload-vehicle-csv", authenticateAdmin, upload.single('csv'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No CSV file uploaded" });
      }

      const csvContent = req.file.buffer.toString('utf8');
      
      // Parse CSV with flexible options to handle quoted values and commas
      const records = parse(csvContent, {
        delimiter: ',',
        skip_empty_lines: true,
        relax_quotes: true,
        escape: '"',
        quote: '"',
        trim: true
      });

      const results = {
        total: 0,
        added: 0,
        updated: 0,
        failed: 0,
        errors: [] as string[]
      };

      for (const [index, record] of records.entries()) {
        try {
          // Skip empty rows
          if (!record || record.length === 0 || record.every((cell: string) => !cell?.trim())) {
            continue;
          }

          results.total++;

          // Parse CSV format: Make, Model, Engine Capacity, Body Type, Drive Config, [Empty], Fuel Type, [Empty], CRSP Value
          const [
            make,
            model, 
            engineCapacityStr,
            bodyType,
            driveConfiguration,
            ,  // Skip empty column
            fuelType,
            ,  // Skip empty column  
            crspStr
          ] = record;

          // Validate required fields
          if (!make?.trim() || !model?.trim()) {
            results.failed++;
            results.errors.push(`Row ${index + 1}: Missing make or model`);
            continue;
          }

          // Clean and parse numeric values
          const engineCapacity = engineCapacityStr ? parseInt(engineCapacityStr.toString().trim()) : null;
          
          // Clean CRSP value - remove commas, quotes, and parse
          let crspKes = null;
          if (crspStr) {
            const cleanCrsp = crspStr.toString().replace(/[",]/g, '').trim();
            if (cleanCrsp && !isNaN(Number(cleanCrsp))) {
              crspKes = parseFloat(cleanCrsp);
            }
          }

          const vehicleData = {
            make: make.toString().trim().toUpperCase(),
            model: model.toString().trim().toUpperCase(),
            engineCapacity,
            bodyType: bodyType?.toString().trim() || null,
            driveConfiguration: driveConfiguration?.toString().trim() || null,
            fuelType: fuelType?.toString().trim().toLowerCase() || null,
            crspKes
          };

          // Check if vehicle already exists (by make, model, engine capacity)
          const existing = await db
            .select()
            .from(vehicleReferences)
            .where(sql`
              LOWER(${vehicleReferences.make}) = LOWER(${vehicleData.make}) AND
              LOWER(${vehicleReferences.model}) = LOWER(${vehicleData.model}) AND
              ${vehicleReferences.engineCapacity} = ${vehicleData.engineCapacity}
            `)
            .limit(1);

          if (existing.length > 0) {
            // Update existing vehicle
            await db
              .update(vehicleReferences)
              .set(vehicleData)
              .where(eq(vehicleReferences.id, existing[0].id));
            results.updated++;
          } else {
            // Insert new vehicle
            await db
              .insert(vehicleReferences)
              .values(vehicleData);
            results.added++;
          }

        } catch (error: any) {
          results.failed++;
          results.errors.push(`Row ${index + 1}: ${error.message}`);
        }
      }

      res.json(results);
    } catch (error: any) {
      console.error("CSV upload error:", error);
      res.status(500).json({ 
        error: "Failed to process CSV file",
        details: error.message 
      });
    }
  });

  // ===============================
  // ADMIN STATS AND OVERVIEW
  // ===============================

  // Get dashboard stats
  app.get("/api/admin/stats", authenticateAdmin, async (req, res) => {
    try {
      // Get total users
      const totalUsersResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(appUsers);
      const totalUsers = totalUsersResult[0]?.count || 0;

      // Get users created this month
      const currentMonth = new Date();
      currentMonth.setDate(1);
      currentMonth.setHours(0, 0, 0, 0);
      
      const newUsersThisMonthResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(appUsers)
        .where(sql`${appUsers.createdAt} >= ${currentMonth.toISOString()}`);
      const newUsersThisMonth = newUsersThisMonthResult[0]?.count || 0;

      // Get total vehicle references
      const totalVehicleReferencesResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(vehicleReferences);
      const totalVehicleReferences = totalVehicleReferencesResult[0]?.count || 0;

      const stats = {
        totalUsers,
        newUsersThisMonth,
        totalListings: 0, // Will be updated when we add listings
        newListingsThisMonth: 0,
        pendingApprovals: 0,
        totalVehicleReferences
      };

      res.json(stats);
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
      res.status(500).json({ error: "Failed to fetch admin stats" });
    }
  });

  // ===============================
  // ADMIN USER MANAGEMENT
  // ===============================

  // Get all users with their roles
  app.get("/api/admin/users", authenticateAdmin, async (req, res) => {
    try {
      // Get all users from the database with their roles
      const users = await db
        .select({
          id: appUsers.id,
          email: appUsers.email,
          firstName: appUsers.firstName,
          lastName: appUsers.lastName,
          phoneNumber: appUsers.phoneNumber,
          createdAt: appUsers.createdAt,
          role: {
            id: userRoles.id,
            name: userRoles.name,
            description: userRoles.description
          }
        })
        .from(appUsers)
        .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
        .orderBy(appUsers.createdAt);
      
      res.json(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Update user role
  app.put("/api/admin/users/:userId/role", authenticateAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { roleId } = req.body;

      if (!roleId) {
        return res.status(400).json({ error: "Role ID is required" });
      }

      await storage.updateUserRole(userId, roleId);
      res.json({ message: "User role updated successfully" });
    } catch (error) {
      console.error("Failed to update user role:", error);
      res.status(500).json({ error: "Failed to update user role" });
    }
  });

  // Get all roles
  app.get("/api/admin/roles", authenticateAdmin, async (req, res) => {
    try {
      const roles = await storage.getAllRoles();
      res.json(roles);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      res.status(500).json({ error: "Failed to fetch roles" });
    }
  });

  // ===============================
  // ADMIN LISTING MANAGEMENT
  // ===============================

  // Get all listings for admin
  app.get("/api/admin/listings", authenticateAdmin, async (req, res) => {
    try {
      const listings = await storage.getAllListingsForAdmin();
      res.json(listings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      res.status(500).json({ error: "Failed to fetch listings" });
    }
  });

  // Approve listing
  app.post("/api/admin/listings/:listingId/approve", authenticateAdmin, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const { notes } = req.body;

      if (isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid listing ID" });
      }

      const approval = await storage.approveListing(listingId, 'admin', notes);
      res.json(approval);
    } catch (error) {
      console.error("Failed to approve listing:", error);
      res.status(500).json({ error: "Failed to approve listing" });
    }
  });

  // Reject listing
  app.post("/api/admin/listings/:listingId/reject", authenticateAdmin, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const { reason } = req.body;

      if (isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid listing ID" });
      }

      if (!reason) {
        return res.status(400).json({ error: "Rejection reason is required" });
      }

      const approval = await storage.rejectListing(listingId, 'admin', reason);
      res.json(approval);
    } catch (error) {
      console.error("Failed to reject listing:", error);
      res.status(500).json({ error: "Failed to reject listing" });
    }
  });

  // Request changes to listing
  app.post("/api/admin/listings/:listingId/request-changes", authenticateAdmin, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const { changes, notes } = req.body;

      if (isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid listing ID" });
      }

      if (!changes || !Array.isArray(changes) || changes.length === 0) {
        return res.status(400).json({ error: "Changes list is required" });
      }

      const approval = await storage.requestChanges(listingId, 'admin', changes, notes);
      res.json(approval);
    } catch (error) {
      console.error("Failed to request changes:", error);
      res.status(500).json({ error: "Failed to request changes" });
    }
  });

  // ===============================
  // TRANSFER COST CALCULATION
  // ===============================

  // Calculate transfer cost based on vehicle engine capacity
  app.post("/api/calculate-transfer-cost", async (req, res) => {
    try {
      const { vehicleId, vehicleType, engineCapacity, specialType } = req.body;
      
      // Validate input
      if (!vehicleType) {
        return res.status(400).json({ 
          error: "Vehicle type is required" 
        });
      }

      let transferRate;

      if (vehicleType === 'vehicle') {
        // Handle vehicles with or without engine capacity
        if (engineCapacity && engineCapacity > 0) {
          // Find appropriate transfer rate based on engine capacity
          transferRate = await db
            .select()
            .from(vehicleTransferRates)
            .where(sql`
              ${vehicleTransferRates.vehicleType} = 'vehicle' AND
              ${engineCapacity} >= ${vehicleTransferRates.minEngineCapacity} AND
              ${engineCapacity} <= ${vehicleTransferRates.maxEngineCapacity}
            `)
            .limit(1);
        } else {
          // For vehicles without engine capacity, default to the lowest rate (1000cc & below)
          transferRate = await db
            .select()
            .from(vehicleTransferRates)
            .where(sql`
              ${vehicleTransferRates.vehicleType} = 'vehicle' AND
              ${vehicleTransferRates.minEngineCapacity} = 0 AND
              ${vehicleTransferRates.maxEngineCapacity} = 1000
            `)
            .limit(1);
        }
      } else {
        // For trailers and tractors, use special type
        transferRate = await db
          .select()
          .from(vehicleTransferRates)
          .where(sql`
            ${vehicleTransferRates.vehicleType} = ${vehicleType} AND
            ${vehicleTransferRates.specialType} = ${specialType}
          `)
          .limit(1);
      }

      if (!transferRate || transferRate.length === 0) {
        return res.status(404).json({ 
          error: "No transfer rate found for this vehicle specification" 
        });
      }

      const rate = transferRate[0];
      
      // Simplified result - only return the actual transfer fee from CSV
      const result = {
        vehicleType,
        engineCapacity: vehicleType === 'vehicle' ? engineCapacity : null,
        specialType: vehicleType !== 'vehicle' ? specialType : null,
        transferRate: rate,
        transferFee: parseFloat(rate.transferFee.toString()),
        description: rate.description,
        notes: [
          "This is the official government transfer fee based on vehicle specifications",
          engineCapacity ? 
            `Fee calculated based on engine capacity: ${engineCapacity}cc` : 
            "Fee calculated using default rate for vehicles without engine capacity specification"
        ]
      };

      res.json(result);
    } catch (error) {
      console.error("Transfer cost calculation error:", error);
      res.status(500).json({ error: "Failed to calculate transfer cost" });
    }
  });

  // Price indicators API endpoints
  app.get('/api/price-indicators', async (req, res) => {
    try {
      const indicators = await storage.getPriceIndicators();
      res.json(indicators);
    } catch (error) {
      console.error("Error fetching price indicators:", error);
      res.status(500).json({ message: "Failed to fetch price indicators" });
    }
  });

  // Get price indicator for specific percentage
  app.get('/api/price-indicators/:percentage', async (req, res) => {
    try {
      const percentage = parseFloat(req.params.percentage);
      if (isNaN(percentage)) {
        return res.status(400).json({ message: "Invalid percentage value" });
      }
      
      const indicator = await storage.getPriceIndicatorForPercentage(percentage);
      if (!indicator) {
        return res.status(404).json({ message: "No indicator found for this percentage" });
      }
      
      res.json(indicator);
    } catch (error) {
      console.error("Error fetching price indicator:", error);
      res.status(500).json({ message: "Failed to fetch price indicator" });
    }
  });

  // AI Price Trend Analysis endpoint
  app.post('/api/price-trends/analyze', async (req, res) => {
    try {
      const { make, model, engineSize } = req.body;
      
      if (!make || !model) {
        return res.status(400).json({ message: "Make and model are required" });
      }

      const { priceAnalyzer } = await import('./ai-price-analyzer');
      const analysis = await priceAnalyzer.analyzePriceTrends(make, model, engineSize);
      
      // Check if AI analysis failed due to quota and add user-friendly messaging
      if (analysis.aiAnalysis?.summary === "AI analysis temporarily unavailable") {
        analysis.quotaExceeded = true;
        analysis.warningMessage = "AI analysis is currently unavailable due to high demand. Basic market analysis is still provided.";
      }
      
      res.json(analysis);
    } catch (error) {
      console.error("Price trend analysis error:", error);
      res.status(500).json({ 
        message: "Failed to analyze price trends", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
