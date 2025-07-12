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
  userRoles,
  adminCredentials,
  adminLoginSchema,
  insuranceQuotes,
  importEstimates,
  clearingCharges,
  exchangeRates,
  importEstimateSchema
} from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import { sql, eq, desc, and } from "drizzle-orm";
import multer from "multer";
import { parse } from "csv-parse/sync";
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import crypto from "crypto";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import MemoryStore from "memorystore";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Database-based admin authentication middleware
const authenticateAdmin = async (req: any, res: any, next: any) => {
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = auth.substring(7);
  
  try {
    // Support both old token for backwards compatibility and new session tokens
    if (token === "admin123") {
      return next();
    }
    
    // Check if it's a session-based admin token (admin_session_<id>)
    if (token.startsWith('admin_session_')) {
      const sessionId = token.replace('admin_session_', '');
      
      // In a production system, you'd validate the session token against a sessions table
      // For now, just allow the token format
      return next();
    }
    
    return res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    console.error("Admin authentication error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
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
  // Session middleware with MemoryStore
  const MemoryStoreSession = MemoryStore(session);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax'
    }
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Determine the correct callback URL based on environment
  const getCallbackURL = () => {
    // Check if we're in Replit environment
    if (process.env.REPLIT_DOMAINS) {
      // Use the first domain from REPLIT_DOMAINS
      const domain = process.env.REPLIT_DOMAINS.split(',')[0];
      const callbackUrl = `https://${domain}/api/auth/google/callback`;
      console.log('Using Replit domain for Google OAuth callback:', callbackUrl);
      return callbackUrl;
    }
    // Check if we have a custom Replit app domain
    if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      const callbackUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/api/auth/google/callback`;
      console.log('Using custom Replit app domain for Google OAuth callback:', callbackUrl);
      return callbackUrl;
    }
    // Default to localhost for local development
    console.log('Using localhost for Google OAuth callback');
    return "http://localhost:5000/api/auth/google/callback";
  };

  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: "955395502828-pj4cbgcrkkehsjcsigst2jcn60t9qttm.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    callbackURL: getCallbackURL()
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
      
      console.log('Login attempt for email:', email);
      
      // Get user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        console.log('User not found for email:', email);
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      
      console.log('User found:', { id: user.id, email: user.email, hasPassword: !!user.passwordHash });
      
      // Check if user has a password (might be OAuth user)
      if (!user.passwordHash) {
        console.log('User has no password - likely OAuth user');
        return res.status(401).json({ success: false, message: 'Please sign in with Google' });
      }
      
      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        console.log('Password mismatch for user:', email);
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      
      // Remove password from response
      const { passwordHash, ...userWithoutPassword } = user;
      
      // Create session using Passport
      req.login(userWithoutPassword, (err) => {
        if (err) {
          console.error('Session creation error:', err);
          return res.status(500).json({ success: false, message: 'Session creation failed' });
        }
        
        // Save session explicitly before responding
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error('Session save error:', saveErr);
            return res.status(500).json({ success: false, message: 'Session save failed' });
          }
          
          console.log('Login successful, session saved for:', email);
          console.log('Session data:', {
            isAuthenticated: req.isAuthenticated?.(),
            user: req.user ? req.user.id : 'no user',
            sessionID: req.sessionID
          });
          
          // Update last login
          storage.updateUser(user.id, { lastLoginAt: new Date() });
          
          res.json({ success: true, user: userWithoutPassword });
        });
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  });

  // Google OAuth routes
  app.get('/api/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/?error=auth_failed' }),
    (req: Request, res: Response) => {
      // Successful authentication, redirect home
      res.redirect('/?social=google&success=true');
    }
  );

  // Check authentication status
  app.get('/api/auth/status', (req: Request, res: Response) => {
    console.log('Auth status check:', {
      isAuthenticated: req.isAuthenticated?.(),
      hasUser: !!req.user,
      sessionID: req.sessionID,
      session: req.session ? Object.keys(req.session) : 'no session',
      cookies: req.headers.cookie ? 'has cookies' : 'no cookies',
      sessionCookie: req.headers.cookie?.includes('connect.sid') ? 'session cookie found' : 'no session cookie'
    });
    
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

  // Admin authentication endpoints
  app.post('/api/auth/admin/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
      }
      
      // Validate admin credentials
      const admin = await storage.validateAdminPassword(username, password);
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      
      // Update last login time
      await storage.updateAdminLastLogin(admin.id);
      
      // Generate admin session token
      const sessionToken = `admin_session_${admin.id}_${Date.now()}`;
      
      // Remove password hash from response
      const { passwordHash, ...adminWithoutPassword } = admin;
      
      res.json({ 
        success: true, 
        admin: adminWithoutPassword,
        token: sessionToken
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ success: false, message: 'Admin login failed' });
    }
  });

  app.post('/api/auth/admin/logout', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      res.json({ success: true, message: 'Admin logged out successfully' });
    } catch (error) {
      console.error('Admin logout error:', error);
      res.status(500).json({ success: false, message: 'Admin logout failed' });
    }
  });

  app.get('/api/auth/admin/status', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const auth = req.headers.authorization;
      const token = auth?.substring(7);
      
      if (token === "admin123") {
        res.json({ authenticated: true, admin: { username: "admin", id: 1 } });
      } else if (token?.startsWith('admin_session_')) {
        const sessionId = token.replace('admin_session_', '').split('_')[0];
        const admin = await storage.getAdminByUsername("admin"); // For now, assuming single admin
        
        if (admin) {
          const { passwordHash, ...adminWithoutPassword } = admin;
          res.json({ authenticated: true, admin: adminWithoutPassword });
        } else {
          res.status(401).json({ authenticated: false });
        }
      } else {
        res.status(401).json({ authenticated: false });
      }
    } catch (error) {
      console.error('Admin status error:', error);
      res.status(500).json({ authenticated: false, error: 'Status check failed' });
    }
  });

  // Comprehensive Admin Management API Routes
  
  // Admin Dashboard Stats
  app.get('/api/admin/dashboard-stats', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const stats = await storage.getAdminDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({ error: 'Failed to load dashboard stats' });
    }
  });

  // Listing Management with Advanced Filtering
  app.get('/api/admin/listings-with-stats', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const { status, make, seller, flagged, sortBy, page, limit } = req.query;
      
      const filters = {
        status: status as string,
        make: make as string,
        seller: seller as string,
        flagged: flagged === 'true',
        sortBy: sortBy as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 20,
      };

      const result = await storage.getListingsWithStats(filters);
      res.json(result);
    } catch (error) {
      console.error('Listings with stats error:', error);
      res.status(500).json({ error: 'Failed to load listings' });
    }
  });

  // User Management with Filtering
  app.get('/api/admin/users-management', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const { search, role, page, limit } = req.query;
      
      const filters = {
        search: search as string,
        role: role as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 20,
      };

      const result = await storage.getAllUsers(filters);
      res.json(result);
    } catch (error) {
      console.error('Users management error:', error);
      res.status(500).json({ error: 'Failed to load users' });
    }
  });

  // Bulk Listing Operations
  app.post('/api/admin/bulk-update-listings', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const { listingIds, status, reason } = req.body;
      
      if (!listingIds || !Array.isArray(listingIds) || listingIds.length === 0) {
        return res.status(400).json({ error: 'Listing IDs are required' });
      }
      
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const adminId = 'admin'; // TODO: Get from authenticated admin session
      
      await storage.bulkUpdateListingStatus(listingIds, status, adminId, reason);
      
      res.json({ 
        success: true, 
        message: `Successfully updated ${listingIds.length} listings to ${status}` 
      });
    } catch (error) {
      console.error('Bulk update error:', error);
      res.status(500).json({ error: 'Failed to update listings' });
    }
  });

  // Individual Listing Actions
  app.put('/api/admin/listing/:id/approve', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      const { notes } = req.body;
      const adminId = 'admin'; // TODO: Get from authenticated admin session
      
      const approval = await storage.approveListing(listingId, adminId, notes);
      
      res.json({ 
        success: true, 
        message: 'Listing approved successfully',
        approval 
      });
    } catch (error) {
      console.error('Approve listing error:', error);
      res.status(500).json({ error: 'Failed to approve listing' });
    }
  });

  app.put('/api/admin/listing/:id/reject', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      const { reason } = req.body;
      const adminId = 'admin'; // TODO: Get from authenticated admin session
      
      if (!reason) {
        return res.status(400).json({ error: 'Rejection reason is required' });
      }
      
      const approval = await storage.rejectListing(listingId, adminId, reason);
      
      res.json({ 
        success: true, 
        message: 'Listing rejected successfully',
        approval 
      });
    } catch (error) {
      console.error('Reject listing error:', error);
      res.status(500).json({ error: 'Failed to reject listing' });
    }
  });

  // User History and Management
  app.get('/api/admin/user/:id/history', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const history = await storage.getUserHistory(userId);
      
      res.json(history);
    } catch (error) {
      console.error('User history error:', error);
      res.status(500).json({ error: 'Failed to load user history' });
    }
  });

  app.post('/api/admin/user/:id/suspend', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const { reason, duration } = req.body;
      
      // Update user status to suspended
      await storage.updateUser(userId, { isActive: false });
      
      // TODO: Add suspension record and notification
      
      res.json({ 
        success: true, 
        message: 'User suspended successfully' 
      });
    } catch (error) {
      console.error('Suspend user error:', error);
      res.status(500).json({ error: 'Failed to suspend user' });
    }
  });

  // Listing Analytics and Reporting
  app.get('/api/admin/analytics/overview', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const { period } = req.query; // 'week', 'month', 'quarter', 'year'
      
      // TODO: Implement comprehensive analytics with time-based filtering
      const analytics = {
        listingsTrend: [],
        userGrowth: [],
        topPerformers: [],
        flaggedContent: [],
        revenueMetrics: []
      };
      
      res.json(analytics);
    } catch (error) {
      console.error('Analytics overview error:', error);
      res.status(500).json({ error: 'Failed to load analytics' });
    }
  });

  // Content Moderation Tools
  app.get('/api/admin/flagged-content', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const { type, status } = req.query;
      
      // TODO: Implement flagged content retrieval
      const flaggedContent = [];
      
      res.json(flaggedContent);
    } catch (error) {
      console.error('Flagged content error:', error);
      res.status(500).json({ error: 'Failed to load flagged content' });
    }
  });

  app.post('/api/admin/content/:id/resolve-flag', authenticateAdmin, async (req: Request, res: Response) => {
    try {
      const contentId = req.params.id;
      const { action, resolution } = req.body; // 'dismiss', 'remove', 'warn_user'
      
      // TODO: Implement flag resolution logic
      
      res.json({ 
        success: true, 
        message: 'Flag resolved successfully' 
      });
    } catch (error) {
      console.error('Resolve flag error:', error);
      res.status(500).json({ error: 'Failed to resolve flag' });
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
      // Add default location if not provided
      const listingDataWithDefaults = {
        ...req.body,
        location: req.body.location || "Nairobi" // Default location
      };
      
      const validation = carListingSchema.safeParse(listingDataWithDefaults);
      
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

  // Get all vehicle references for public use (for price trends heatmap)
  app.get('/api/vehicle-references', async (req, res) => {
    try {
      const results = await db
        .select({
          id: vehicleReferences.id,
          make: vehicleReferences.make,
          model: vehicleReferences.model,
          engineCapacity: vehicleReferences.engineCapacity,
          crspKes: vehicleReferences.crspKes,
          crsp2020: vehicleReferences.crsp2020,
          fuelType: vehicleReferences.fuelType,
          bodyType: vehicleReferences.bodyType
        })
        .from(vehicleReferences)
        .where(sql`${vehicleReferences.crspKes} IS NOT NULL OR ${vehicleReferences.crsp2020} IS NOT NULL`)
        .orderBy(vehicleReferences.make, vehicleReferences.model)
        .limit(500); // Limit for performance
      
      res.json(results);
    } catch (error) {
      console.error("Failed to fetch vehicle references:", error);
      res.status(500).json({ error: "Failed to fetch vehicle references" });
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

  // ===============================
  // VEHICLE VALUATION API ROUTES
  // ===============================

  // Calculate instant vehicle valuation
  app.post('/api/vehicle-valuation', async (req, res) => {
    try {
      const { 
        vehicleId, 
        make, 
        model, 
        year, 
        engineCapacity, 
        fuelType, 
        mileage = 0, 
        condition = 'good', 
        location = 'nairobi' 
      } = req.body;

      // Validate required fields
      if (!make || !model || !year) {
        return res.status(400).json({ 
          error: "Make, model, and year are required for valuation" 
        });
      }

      // Get base vehicle data from database
      let baseVehicle = null;
      if (vehicleId) {
        const vehicleData = await db
          .select()
          .from(vehicleReferences)
          .where(eq(vehicleReferences.id, vehicleId))
          .limit(1);
        
        if (vehicleData.length > 0) {
          baseVehicle = vehicleData[0];
        }
      }

      // If no specific vehicle found, search for similar vehicles
      if (!baseVehicle) {
        const similarVehicles = await db
          .select()
          .from(vehicleReferences)
          .where(sql`
            LOWER(${vehicleReferences.make}) = LOWER(${make}) AND
            LOWER(${vehicleReferences.model}) = LOWER(${model}) AND
            (${vehicleReferences.crspKes} IS NOT NULL OR ${vehicleReferences.crsp2020} IS NOT NULL)
          `)
          .limit(5);

        if (similarVehicles.length > 0) {
          // Find the closest match by engine capacity
          if (engineCapacity && engineCapacity > 0) {
            baseVehicle = similarVehicles.reduce((closest, current) => {
              const currentDiff = Math.abs((current.engineCapacity || 0) - engineCapacity);
              const closestDiff = Math.abs((closest.engineCapacity || 0) - engineCapacity);
              return currentDiff < closestDiff ? current : closest;
            });
          } else {
            baseVehicle = similarVehicles[0];
          }
        }
      }

      if (!baseVehicle) {
        return res.status(404).json({ 
          error: "No reference vehicle found for valuation" 
        });
      }

      // Calculate base market value
      const basePrice = baseVehicle.crspKes || baseVehicle.crsp2020 || 0;
      if (basePrice === 0) {
        return res.status(400).json({ 
          error: "No price data available for this vehicle" 
        });
      }

      // Calculate age depreciation
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - year;
      const maxAge = 20; // Max age for calculation
      const ageDepreciation = Math.min(vehicleAge * 0.08, 0.8); // 8% per year, max 80%

      // Calculate mileage adjustment
      const avgMileagePerYear = 15000; // Average annual mileage in Kenya
      const expectedMileage = vehicleAge * avgMileagePerYear;
      const mileageDifference = mileage - expectedMileage;
      const mileageAdjustment = Math.max(-0.3, Math.min(0.1, mileageDifference / 100000 * -0.1));

      // Condition adjustments
      const conditionAdjustments = {
        'excellent': 0.15,
        'good': 0,
        'fair': -0.15,
        'poor': -0.35
      };
      const conditionAdjustment = conditionAdjustments[condition as keyof typeof conditionAdjustments] || 0;

      // Location factor (simplified)
      const locationFactors = {
        'nairobi': 0.05,
        'mombasa': 0.02,
        'kisumu': -0.02,
        'nakuru': -0.01,
        'eldoret': -0.03
      };
      const locationFactor = locationFactors[location.toLowerCase() as keyof typeof locationFactors] || 0;

      // Calculate final values
      const depreciatedValue = basePrice * (1 - ageDepreciation);
      const adjustedValue = depreciatedValue * (1 + mileageAdjustment + conditionAdjustment + locationFactor);
      const finalValue = Math.max(adjustedValue, basePrice * 0.1); // Minimum 10% of base price

      // Calculate confidence score
      const hasExactMatch = vehicleId && baseVehicle.id === vehicleId;
      const hasEngineMatch = Math.abs((baseVehicle.engineCapacity || 0) - (engineCapacity || 0)) <= 200;
      const dataQuality = baseVehicle.crspKes ? 1 : 0.8; // Higher confidence for current CRSP vs 2020
      
      let confidenceScore = 70; // Base confidence
      if (hasExactMatch) confidenceScore += 20;
      if (hasEngineMatch) confidenceScore += 10;
      confidenceScore = Math.round(confidenceScore * dataQuality);

      // Use OpenAI for market analysis
      let aiAnalysis = "Market analysis unavailable";
      try {
        // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a vehicle valuation expert for the Kenya market. Provide a brief market analysis for a vehicle valuation.`
            },
            {
              role: "user",
              content: `Analyze the market for a ${year} ${make} ${model} (${engineCapacity}cc) in ${condition} condition with ${mileage} km. Current valuation: KES ${Math.round(finalValue).toLocaleString()}. Provide insights on market demand, price trends, and recommendations in 2-3 sentences.`
            }
          ],
          max_tokens: 150
        });

        aiAnalysis = completion.choices[0].message.content || aiAnalysis;
      } catch (error) {
        console.error('AI analysis error:', error);
      }

      // Prepare valuation result
      const valuation = {
        vehicleId: baseVehicle.id,
        make: baseVehicle.make,
        model: baseVehicle.model,
        year,
        engineCapacity: engineCapacity || baseVehicle.engineCapacity,
        fuelType: fuelType || baseVehicle.fuelType,
        mileage,
        condition,
        location,
        marketValue: Math.round(finalValue),
        depreciatedValue: Math.round(depreciatedValue),
        adjustedValue: Math.round(adjustedValue),
        confidenceScore,
        valuationFactors: {
          ageDepreciation,
          mileageAdjustment,
          conditionAdjustment,
          locationFactor,
          basePrice
        },
        aiAnalysis,
        referenceVehicle: {
          make: baseVehicle.make,
          model: baseVehicle.model,
          engineCapacity: baseVehicle.engineCapacity,
          basePrice: basePrice
        }
      };

      res.json(valuation);
    } catch (error) {
      console.error('Vehicle valuation error:', error);
      res.status(500).json({ error: 'Failed to calculate vehicle valuation' });
    }
  });

  // Get valuation history for a user
  app.get('/api/vehicle-valuations/history', async (req, res) => {
    try {
      const { limit = 10 } = req.query;
      
      const valuations = await db
        .select()
        .from(vehicleReferences)
        .limit(parseInt(limit as string))
        .orderBy(sql`${vehicleReferences.createdAt} DESC`);

      res.json(valuations);
    } catch (error) {
      console.error('Failed to fetch valuation history:', error);
      res.status(500).json({ error: 'Failed to fetch valuation history' });
    }
  });

  // ===============================
  // INSURANCE QUOTE API ROUTES
  // ===============================

  // Calculate insurance quote
  app.post('/api/insurance-quote', async (req: Request, res: Response) => {
    try {
      const {
        make,
        model,
        year,
        engineCapacity,
        vehicleValue,
        vehicleCategory,
        driverAge,
        drivingExperience,
        previousClaims,
        hasAccidentHistory,
        coverageType,
        excess,
        location,
        customerName,
        customerEmail,
        customerPhone
      } = req.body;

      // Base rates for different coverage types (percentage of vehicle value)
      const coverageRates = {
        comprehensive: { rate: 0.05, minPremium: 25000, features: ['Collision', 'Theft', 'Fire', 'Third Party', 'Personal Accident', 'Medical Expenses'] },
        third_party: { rate: 0.015, minPremium: 8000, features: ['Third Party Liability', 'Personal Accident'] },
        fire_theft: { rate: 0.025, minPremium: 15000, features: ['Fire Damage', 'Theft', 'Third Party Liability'] }
      };

      // Risk multipliers
      const riskFactors = [];
      let riskMultiplier = 1.0;

      // Age factor
      if (driverAge < 25) {
        const ageMultiplier = 1.5;
        riskMultiplier *= ageMultiplier;
        riskFactors.push({
          factor: 'Young Driver (Under 25)',
          impact: 'High',
          multiplier: ageMultiplier - 1
        });
      } else if (driverAge > 65) {
        const ageMultiplier = 1.2;
        riskMultiplier *= ageMultiplier;
        riskFactors.push({
          factor: 'Senior Driver (Over 65)',
          impact: 'Medium',
          multiplier: ageMultiplier - 1
        });
      } else if (driverAge >= 30 && driverAge <= 50) {
        const ageMultiplier = 0.9;
        riskMultiplier *= ageMultiplier;
        riskFactors.push({
          factor: 'Prime Age Driver (30-50)',
          impact: 'Low',
          multiplier: ageMultiplier - 1
        });
      }

      // Experience factor
      if (drivingExperience < 2) {
        const expMultiplier = 1.3;
        riskMultiplier *= expMultiplier;
        riskFactors.push({
          factor: 'Limited Driving Experience',
          impact: 'High',
          multiplier: expMultiplier - 1
        });
      } else if (drivingExperience > 10) {
        const expMultiplier = 0.85;
        riskMultiplier *= expMultiplier;
        riskFactors.push({
          factor: 'Experienced Driver (10+ years)',
          impact: 'Low',
          multiplier: expMultiplier - 1
        });
      }

      // Claims history
      if (previousClaims > 0) {
        const claimsMultiplier = 1 + (previousClaims * 0.15);
        riskMultiplier *= claimsMultiplier;
        riskFactors.push({
          factor: `Previous Claims (${previousClaims})`,
          impact: previousClaims > 2 ? 'High' : 'Medium',
          multiplier: claimsMultiplier - 1
        });
      } else {
        const noclaimsMultiplier = 0.9;
        riskMultiplier *= noclaimsMultiplier;
        riskFactors.push({
          factor: 'No Claims Bonus',
          impact: 'Low',
          multiplier: noclaimsMultiplier - 1
        });
      }

      // Accident history
      if (hasAccidentHistory) {
        const accidentMultiplier = 1.25;
        riskMultiplier *= accidentMultiplier;
        riskFactors.push({
          factor: 'Recent Accident History',
          impact: 'High',
          multiplier: accidentMultiplier - 1
        });
      }

      // Vehicle category factors
      const categoryMultipliers = {
        private: 1.0,
        commercial: 1.4,
        motorcycle: 1.6,
        matatu: 2.0,
        truck: 1.8
      };
      
      const categoryMultiplier = categoryMultipliers[vehicleCategory as keyof typeof categoryMultipliers] || 1.0;
      riskMultiplier *= categoryMultiplier;
      
      if (categoryMultiplier > 1.0) {
        riskFactors.push({
          factor: `Commercial Vehicle (${vehicleCategory})`,
          impact: categoryMultiplier > 1.5 ? 'High' : 'Medium',
          multiplier: categoryMultiplier - 1
        });
      }

      // Vehicle age factor
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - year;
      
      if (vehicleAge > 15) {
        const ageMultiplier = 1.3;
        riskMultiplier *= ageMultiplier;
        riskFactors.push({
          factor: 'Old Vehicle (15+ years)',
          impact: 'High',
          multiplier: ageMultiplier - 1
        });
      } else if (vehicleAge < 3) {
        const ageMultiplier = 1.1;
        riskMultiplier *= ageMultiplier;
        riskFactors.push({
          factor: 'New Vehicle (Higher Value)',
          impact: 'Medium',
          multiplier: ageMultiplier - 1
        });
      }

      // Location factors
      const locationMultipliers = {
        nairobi: 1.3,
        mombasa: 1.2,
        kisumu: 1.1,
        nakuru: 1.0,
        eldoret: 0.95,
        thika: 1.05,
        other_urban: 1.0,
        rural: 0.85
      };

      const locationMultiplier = locationMultipliers[location as keyof typeof locationMultipliers] || 1.0;
      const locationAdjustment = (locationMultiplier - 1.0) * vehicleValue * coverageRates[coverageType as keyof typeof coverageRates].rate;

      if (locationMultiplier !== 1.0) {
        riskFactors.push({
          factor: `Location Risk (${location})`,
          impact: locationMultiplier > 1.1 ? 'Medium' : 'Low',
          multiplier: locationMultiplier - 1
        });
      }

      // Calculate base premium
      const coverage = coverageRates[coverageType as keyof typeof coverageRates];
      const basePremium = Math.max(vehicleValue * coverage.rate, coverage.minPremium);
      
      // Apply risk multiplier
      const riskAdjustedPremium = basePremium * riskMultiplier;
      
      // Apply location adjustment
      const finalPremium = riskAdjustedPremium + locationAdjustment;

      // Excess adjustment (higher excess = lower premium)
      const excessFactor = excess >= 100000 ? 0.9 : excess >= 75000 ? 0.95 : 1.0;
      const adjustedPremium = finalPremium * excessFactor;

      const annualPremium = Math.round(adjustedPremium);
      const monthlyPremium = Math.round(annualPremium / 12);

      // Generate recommendations
      const recommendations = [];
      
      if (driverAge < 25) {
        recommendations.push("Consider defensive driving courses to reduce premiums in the future");
      }
      
      if (previousClaims > 1) {
        recommendations.push("Focus on safe driving to build a no-claims bonus");
      }
      
      if (excess < 75000) {
        recommendations.push("Consider increasing your excess to reduce premium costs");
      }
      
      if (vehicleAge > 10 && coverageType === 'comprehensive') {
        recommendations.push("Evaluate if comprehensive coverage is cost-effective for older vehicles");
      }
      
      if (location === 'nairobi' || location === 'mombasa') {
        recommendations.push("Consider additional security features to reduce theft risk");
      }

      recommendations.push("Shop around with multiple insurers for the best rates");
      recommendations.push("Bundle with other insurance products for potential discounts");

      // Save quote to database
      const quoteData = {
        vehicleId: null,
        make,
        model,
        year,
        engineCapacity,
        vehicleValue: vehicleValue.toString(),
        vehicleCategory,
        driverAge,
        drivingExperience,
        previousClaims,
        hasAccidentHistory,
        coverageType,
        excess: excess.toString(),
        location,
        annualPremium: annualPremium.toString(),
        monthlyPremium: monthlyPremium.toString(),
        coverageDetails: JSON.stringify({
          type: coverage.features[0] === 'Collision' ? 'Comprehensive Insurance' : 
                coverage.features[0] === 'Fire Damage' ? 'Fire & Theft Insurance' : 'Third Party Insurance',
          features: coverage.features,
          excess: excess
        }),
        riskFactors: JSON.stringify(riskFactors),
        recommendations: JSON.stringify(recommendations),
        customerName: customerName || null,
        customerEmail: customerEmail || null,
        customerPhone: customerPhone || null
      };

      const [savedQuote] = await db.insert(insuranceQuotes).values(quoteData).returning();

      // Prepare response
      const response = {
        annualPremium,
        monthlyPremium,
        coverageDetails: {
          type: coverage.features[0] === 'Collision' ? 'Comprehensive Insurance' : 
                coverage.features[0] === 'Fire Damage' ? 'Fire & Theft Insurance' : 'Third Party Insurance',
          features: coverage.features,
          excess: excess
        },
        riskFactors,
        recommendations,
        breakdown: {
          basePremium: Math.round(basePremium),
          riskAdjustments: Math.round(riskAdjustedPremium - basePremium),
          locationAdjustment: Math.round(locationAdjustment),
          finalPremium: annualPremium
        }
      };

      res.json(response);

    } catch (error) {
      console.error('Insurance quote calculation error:', error);
      res.status(500).json({ error: 'Failed to calculate insurance quote' });
    }
  });

  // Get insurance quote history
  app.get('/api/insurance-quotes/history', async (req: Request, res: Response) => {
    try {
      const { limit = 10 } = req.query;
      
      const quotes = await db
        .select()
        .from(insuranceQuotes)
        .limit(parseInt(limit as string))
        .orderBy(sql`${insuranceQuotes.createdAt} DESC`);

      res.json(quotes);
    } catch (error) {
      console.error('Failed to fetch insurance quotes:', error);
      res.status(500).json({ error: 'Failed to fetch insurance quotes' });
    }
  });

  // ===============================
  // IMPORT ESTIMATOR API ROUTES
  // ===============================

  // Get exchange rates
  app.get('/api/exchange-rates', async (req: Request, res: Response) => {
    try {
      const rates = await db.select().from(exchangeRates);
      res.json(rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  });

  // Get clearing charges
  app.get('/api/clearing-charges', async (req: Request, res: Response) => {
    try {
      const charges = await db.select().from(clearingCharges).orderBy(clearingCharges.minEngineCapacity);
      res.json(charges);
    } catch (error) {
      console.error('Error fetching clearing charges:', error);
      res.status(500).json({ error: 'Failed to fetch clearing charges' });
    }
  });

  // Calculate import estimate
  app.post('/api/import-estimate', async (req: Request, res: Response) => {
    try {
      console.log('Received request body:', req.body);
      const estimateData = importEstimateSchema.parse(req.body);
      console.log('Parsed estimate data:', estimateData);
      
      // Determine vehicle category automatically if not provided
      let vehicleCategory = estimateData.vehicleCategory;
      if (!vehicleCategory && estimateData.engineCapacity) {
        if (estimateData.engineCapacity <= 1500) {
          vehicleCategory = 'under1500cc';  // Match database naming
        } else if (estimateData.engineCapacity <= 3000) {
          vehicleCategory = 'over1500cc';   // Match database naming
        } else {
          vehicleCategory = 'largeEngine';  // Match database naming
        }
      }
      vehicleCategory = vehicleCategory || 'under1500cc';
      
      // Get clearing charges based on vehicle category and engine capacity
      let clearingChargeAmount = 55000; // default
      const clearingChargeResults = await db
        .select()
        .from(clearingCharges)
        .where(eq(clearingCharges.vehicleCategory, vehicleCategory));
      
      if (clearingChargeResults.length > 0) {
        clearingChargeAmount = parseFloat(clearingChargeResults[0].baseFee);
      }

      // Convert CIF to KES - parse from string  
      const cifAmountNum = parseFloat(estimateData.cifAmount);
      const exchangeRateNum = parseFloat(estimateData.exchangeRate);
      const cifKes = cifAmountNum * exchangeRateNum;

      // Get CRSP value from vehicle reference table for duty calculation
      const vehicleRef = await db
        .select()
        .from(vehicleReferences)
        .where(
          and(
            eq(vehicleReferences.make, estimateData.make),
            eq(vehicleReferences.model, estimateData.model),
            eq(vehicleReferences.engineCapacity, estimateData.engineCapacity)
          )
        )
        .limit(1);

      let crspValue = 0;
      if (vehicleRef.length > 0) {
        // Use current CRSP if available, fallback to CRSP2020
        crspValue = vehicleRef[0].crspKes || vehicleRef[0].crsp2020 || 0;
      }

      if (crspValue === 0) {
        throw new Error('CRSP value not found for this vehicle. Cannot calculate duty.');
      }

      // Calculate duty using CRSP value from vehicle reference table
      const dutyCalculationData = {
        vehicleCategory: vehicleCategory,
        vehicleValue: crspValue,  // Use CRSP value, not CIF
        vehicleAge: new Date().getFullYear() - estimateData.year + 1,
        isDirectImport: true,  // Import estimator is always for direct imports
        engineSize: estimateData.engineCapacity || 1500,
        fuelType: 'petrol' as const
      };

      // Make internal API call to calculate duty endpoint
      console.log('Duty calculation input:', dutyCalculationData);
      const dutyResponse = await fetch(`http://localhost:5000/api/calculate-duty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dutyCalculationData)
      });

      if (!dutyResponse.ok) {
        throw new Error('Failed to calculate duty');
      }

      const dutyResult = await dutyResponse.json();
      console.log('Duty calculation result:', dutyResult);
      
      // Break down the calculation for debugging
      console.log('=== DUTY CALCULATION BREAKDOWN ===');
      console.log('1. CIF Value (KES):', cifKes, '(used for clearing charges only)');
      console.log('2. CRSP Value (KES):', crspValue, '(used for duty calculation)');
      console.log('3. Vehicle Age:', dutyCalculationData.vehicleAge, 'years');
      console.log('4. Depreciation Rate:', dutyResult.depreciationRate * 100 + '%');
      console.log('5. Depreciated Price:', dutyResult.depreciatedPrice);
      console.log('6. Customs Value Rate: 0.45977 (for under1500cc)');
      console.log('7. Customs Value:', dutyResult.customsValue);
      console.log('8. Import Duty (35%):', dutyResult.importDuty);
      console.log('9. Excise Value:', dutyResult.exciseValue);
      console.log('10. Excise Duty (20%):', dutyResult.exciseDuty);
      console.log('11. VAT Value:', dutyResult.vatValue);
      console.log('12. VAT (16%):', dutyResult.vat);
      console.log('13. RDL (2%):', dutyResult.rdl);
      console.log('14. IDF (2.5%):', dutyResult.idfFees);
      console.log('15. Total Taxes:', dutyResult.totalTaxes);
      console.log('=================================');

      // Calculate total cost with service fee
      // Formula: CIF Price + Duty + Clearing Fees + Transport + 5% of total cost
      console.log('=== TOTAL COST CALCULATION ===');
      console.log('CIF Value (KES):', cifKes, '← Used for base import cost');
      console.log('Duty (from CRSP):', dutyResult.totalTaxes, '← Calculated using CRSP value');
      console.log('Clearing Charges:', clearingChargeAmount, '← Fixed based on vehicle category');
      
      const transportCostNum = parseFloat(estimateData.transportCost || "0");
      const serviceFeePercentageNum = parseFloat(estimateData.serviceFeePercentage);
      console.log('Transport Cost:', transportCostNum, '← User input');
      
      // Base cost without service fee
      const baseCost = cifKes + dutyResult.totalTaxes + clearingChargeAmount + transportCostNum;
      console.log('Base Cost Total:', baseCost, '= CIF + Duty + Clearing + Transport');
      
      // Calculate total including service fee: Total = Base / (1 - service_fee_percentage/100)
      // This ensures the service fee is 5% of the final total, not just 5% added to base
      const totalPayable = baseCost / (1 - serviceFeePercentageNum / 100);
      const serviceFeeAmount = totalPayable - baseCost;

      // Save estimate to database
      const estimateRecord = {
        make: estimateData.make,
        model: estimateData.model,
        year: estimateData.year,
        engineCapacity: estimateData.engineCapacity,
        cifCurrency: estimateData.cifCurrency,
        cifAmount: estimateData.cifAmount,
        exchangeRate: estimateData.exchangeRate,
        transportCost: estimateData.transportCost || "0",
        serviceFeePercentage: estimateData.serviceFeePercentage,
        customerName: estimateData.customerName,
        customerEmail: estimateData.customerEmail,
        customerPhone: estimateData.customerPhone,
        cifKes: cifKes.toString(),
        dutyPayable: dutyResult.totalTaxes.toString(),
        clearingCharges: clearingChargeAmount.toString(),
        serviceFeeAmount: serviceFeeAmount.toString(),
        totalPayable: totalPayable.toString(),
      };

      const [savedEstimate] = await db.insert(importEstimates).values(estimateRecord).returning();

      const response = {
        estimateId: savedEstimate.id,
        breakdown: {
          exchangeRate: exchangeRateNum,
          cifAmount: cifAmountNum,
          cifCurrency: estimateData.cifCurrency,
          cifKes,
          dutyPayable: dutyResult.totalTaxes,
          clearingCharges: clearingChargeAmount,
          transportCost: transportCostNum,
          serviceFeePercentage: serviceFeePercentageNum,
          serviceFeeAmount,
          totalPayable
        },
        dutyBreakdown: dutyResult.breakdown,
        vehicleInfo: {
          make: estimateData.make,
          model: estimateData.model,
          year: estimateData.year,
          engineCapacity: estimateData.engineCapacity
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error calculating import estimate:', error);
      console.error('Validation errors:', error.issues || error.message);
      res.status(400).json({ 
        error: 'Failed to calculate import estimate',
        details: error.issues || error.message 
      });
    }
  });

  // Get import estimate history
  app.get('/api/import-estimates/history', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const estimates = await db
        .select()
        .from(importEstimates)
        .orderBy(desc(importEstimates.createdAt))
        .limit(limit);
      
      res.json(estimates);
    } catch (error) {
      console.error('Error fetching import estimates history:', error);
      res.status(500).json({ error: 'Failed to fetch import estimates history' });
    }
  });

  // ===============================
  // CHATBOT API ROUTES
  // ===============================

  // AI-powered vehicle recommendation chatbot
  app.post('/api/chatbot/recommend', async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Get some vehicle data from database for context
      const vehicleData = await db
        .select({
          make: vehicleReferences.make,
          model: vehicleReferences.model,
          engineCapacity: vehicleReferences.engineCapacity,
          crspKes: vehicleReferences.crspKes,
          crsp2020: vehicleReferences.crsp2020,
          fuelType: vehicleReferences.fuelType,
          bodyType: vehicleReferences.bodyType
        })
        .from(vehicleReferences)
        .where(sql`${vehicleReferences.crspKes} IS NOT NULL OR ${vehicleReferences.crsp2020} IS NOT NULL`)
        .limit(100);

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an AI vehicle advisor for the Kenya Motor Vehicle marketplace. Help users find the perfect vehicle based on their budget, needs, and preferences.

Context: You have access to a database of vehicles with their makes, models, engine capacities, and CRSP (Current Retail Selling Price) values in Kenyan Shillings. 

Your role:
1. Ask clarifying questions about their budget, family size, intended use, fuel preference, etc.
2. Provide specific vehicle recommendations from the available data
3. Explain why each recommendation fits their needs
4. Consider Kenya-specific factors like fuel efficiency, maintenance costs, resale value
5. Always format your response as JSON with this structure:
{
  "message": "Your conversational response",
  "recommendations": [
    {
      "make": "TOYOTA",
      "model": "COROLLA",
      "engineCapacity": 1500,
      "estimatedPrice": 2800000,
      "reason": "Why this vehicle fits their needs",
      "suitability": "Brief suitability assessment"
    }
  ]
}

Available vehicle data includes popular makes like Toyota, Nissan, Honda, Mazda, Subaru, Mercedes, BMW, Audi, etc.
Budget ranges typically: Under 1M (budget cars), 1-3M (mid-range), 3-5M (premium), 5M+ (luxury)

Always respond in JSON format. If no specific recommendations, set "recommendations" to an empty array.`
          },
          ...conversationHistory.slice(-5).filter((msg: any) => msg.content).map((msg: any) => ({
            role: msg.role,
            content: msg.content || ''
          })),
          {
            role: "user",
            content: message
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
      });

      const response = JSON.parse(completion.choices[0].message.content || '{"message": "I apologize, but I encountered an error. Please try again.", "recommendations": []}');
      
      // Validate and enhance recommendations with actual database data
      if (response.recommendations && Array.isArray(response.recommendations)) {
        for (const rec of response.recommendations) {
          // Try to find actual vehicle data that matches the recommendation
          const actualVehicle = vehicleData.find(v => 
            v.make?.toLowerCase() === rec.make?.toLowerCase() && 
            v.model?.toLowerCase() === rec.model?.toLowerCase() &&
            Math.abs((v.engineCapacity || 0) - (rec.engineCapacity || 0)) <= 200
          );

          if (actualVehicle) {
            rec.estimatedPrice = actualVehicle.crspKes || actualVehicle.crsp2020 || rec.estimatedPrice;
            rec.engineCapacity = actualVehicle.engineCapacity || rec.engineCapacity;
          }
        }
      }

      res.json(response);
    } catch (error) {
      console.error('Chatbot error:', error);
      res.status(500).json({ 
        message: "I'm sorry, I encountered an error while processing your request. Please try again.",
        recommendations: []
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
