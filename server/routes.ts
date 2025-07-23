import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import paymentRoutes from "./routes/payment-routes";
import dealerRoutes from "./routes/dealer-routes";
import { 
  appUsers,
  carListings,
  conversations,
  conversationParticipants,
  messages,
  videoCallAppointments,
  testDriveAppointments,
  sellerAvailability,
  sellerBlockedSlots,
  sellerAppointmentPreferences,
  seasonalPricingTrends,
  priceAlerts,
  marketInsights,
  depreciationForecasts,
  marketPriceAnalysis,
  userActivities,
  bankPartners,
  loanProducts,
  loanApplications,
  paymentTransactions,
  kenyanLocations
} from "@shared/schema-minimal";

import { savedSearches } from "@shared/schema";

import { 
  products, productCategories 
} from "@shared/product-catalog-schema";

import { 
  dutyCalculationSchema, 
  vehicleReferences, 
  taxRates, 
  processingFees,
  vehicleCategoryRules, 
  depreciationRates,
  trailers,
  heavyMachinery,
  insertVehicleSchema,
  vehicleTransferRates,
  userRegistrationSchema,
  userLoginSchema,
  carListingSchema,
  listingApprovalSchema,
  userRoleSchema,
  userRoles,
  adminCredentials,
  adminLoginSchema,
  insuranceQuotes,
  importEstimates,
  clearingCharges,
  exchangeRates,
  importEstimateSchema,
  phoneClickTracking,
  dailyListingAnalytics,
  listingQualityScores,
  searchKeywords,
  marketBenchmarks,
  listingViews,
  phoneClickTrackingSchema,
  messageSchema,
  conversationSchema,
  dailyListingAnalyticsSchema,
  adminUpdateListingSchema,
  mediaManagementSchema,
  adminMetaUpdateSchema,
  autoFlagRules,
  automatedActionsLog,
  flagCountTracking,
  sellerReputationTracking,
  loanApplicationSchema,
  tradeInEvaluationSchema,
  loanCalculationSchema,
  tradeInEvaluations,
  loanCalculations,
  updateVideoCallAppointmentSchema,
  updateTestDriveAppointmentSchema,
  marketPriceAnalysis,
  pricingRecommendations,
  priceAlerts,
  depreciationForecasts,
  marketInsights
} from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import { sql, eq, desc, and, or, gte, lte, ne, asc, count, isNotNull, like, inArray, not, isNull } from "drizzle-orm";
import multer from "multer";
import { parse } from "csv-parse/sync";
// Quality assessment and keyword analytics modules removed
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import crypto from "crypto";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import MemoryStore from "memorystore";
import OpenAI from "openai";
import { ImageOptimizer, imageUtils } from './services/image-optimizer';
import { CacheService, CacheKeys } from './services/cache-service';
import { MonetizationService } from './services/monetization-service';
import { UsageLimiter } from './middleware/usage-limiter';
import fs from 'fs/promises';
import path from 'path';
import productCatalogRoutes from './routes/product-catalog-routes';
import dealerRoutes from './routes/dealer-routes';
import featureEnforcementRoutes from './routes/feature-enforcement-routes';
import { registerMileageVerificationRoutes } from './routes/mileage-verification';
import roleManagementRoutes from './routes/role-management-routes';
import { smsRoutes } from './routes/sms-routes';

// Initialize OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Role-based authentication middleware is now handled by authenticateUser and requireRole functions

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
    secret: process.env.SESSION_SECRET || 'fallback-secret-key-gariyangu-2025',
    name: 'gariyangu.sid', // Custom session name
    resave: true, // Force session save even if not modified
    saveUninitialized: true, // Save uninitialized sessions
    rolling: true, // Reset expiry on each request
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      httpOnly: false, // Allow JavaScript access for debugging
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax',
      path: '/' // Ensure cookie works for all paths
    }
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Determine the correct callback URL based on environment
  const getCallbackURL = () => {
    // Check for custom domain first
    if (process.env.NODE_ENV === 'production' || process.env.REPLIT_DEPLOYMENT) {
      const customDomain = 'https://gariyangu.co.ke/api/auth/google/callback';
      console.log('Using custom domain for Google OAuth callback:', customDomain);
      return customDomain;
    }
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

  // Apple OAuth callback URL
  const getAppleCallbackURL = () => {
    // Check for custom domain first
    if (process.env.NODE_ENV === 'production' || process.env.REPLIT_DEPLOYMENT) {
      return 'https://gariyangu.co.ke/api/auth/apple/callback';
    }
    if (process.env.REPLIT_DOMAINS) {
      const domain = process.env.REPLIT_DOMAINS.split(',')[0];
      return `https://${domain}/api/auth/apple/callback`;
    }
    if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/api/auth/apple/callback`;
    }
    return "http://localhost:5000/api/auth/apple/callback";
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

  // Apple OAuth Strategy - only add if credentials are available
  if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY) {
    const AppleStrategy = require('passport-apple').Strategy;
    
    passport.use(new AppleStrategy({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      key: process.env.APPLE_PRIVATE_KEY,
      callbackURL: getAppleCallbackURL(),
      scope: ['name', 'email']
    }, async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        // Apple profile structure is different from Google
        const email = profile.email || profile.emails?.[0]?.value;
        const firstName = profile.name?.firstName || profile.displayName?.split(' ')[0] || '';
        const lastName = profile.name?.lastName || profile.displayName?.split(' ')[1] || '';
        
        // Check if user exists
        let user = await storage.getUserByEmail(email || '');
        
        if (!user && email) {
          // Create new user
          user = await storage.createUser({
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email: email,
            firstName: firstName,
            lastName: lastName,
            profileImageUrl: null, // Apple doesn't provide profile images
            password: crypto.randomBytes(32).toString('hex'), // Random password for OAuth users
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

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
    // Check for session-based authentication first (both Google OAuth and username/password)
    if (req.user && req.user.id) {
      // Session authentication is working properly
      return next();
    }
    
    // Check if Passport authentication exists but user object is incomplete
    if (req.isAuthenticated && req.isAuthenticated()) {
      // Session exists but user object might be incomplete, try to load user
      if (req.session && req.session.passport && req.session.passport.user) {
        try {
          const user = await storage.getUserById(req.session.passport.user);
          if (user) {
            req.user = user;
            return next();
          }
        } catch (error) {
          console.error('Failed to load user from session:', error);
        }
      }
    }
    
    // Fallback to token-based authentication
    const auth = req.headers.authorization;
    
    if (!auth || !auth.startsWith('Bearer ')) {
      console.log('Authentication failed:', {
        hasUser: !!req.user,
        isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
        sessionPassport: req.session?.passport,
        hasAuthHeader: !!auth
      });
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
  app.get('/api/auth/google', (req: Request, res: Response, next: NextFunction) => {
    // Use state parameter to pass returnUrl instead of session
    const returnUrl = req.query.returnUrl as string;
    console.log('Google OAuth initiated, returnUrl:', returnUrl);
    
    const state = returnUrl ? Buffer.from(returnUrl).toString('base64') : '';
    
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      state: state
    })(req, res, next);
  });

  // Configure Apple OAuth strategy if credentials are available
  if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY) {
    const AppleStrategy = require('passport-apple').Strategy;
    
    passport.use(new AppleStrategy({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: process.env.APPLE_PRIVATE_KEY,
      callbackURL: '/api/auth/apple/callback',
      scope: ['name', 'email'],
      passReqToCallback: false
    }, async (accessToken: string, refreshToken: string, idToken: any, profile: any, done: any) => {
      try {
        // Extract user info from Apple profile
        const email = profile.email || idToken?.email;
        const firstName = profile.name?.firstName || profile.displayName?.split(' ')[0] || '';
        const lastName = profile.name?.lastName || profile.displayName?.split(' ').slice(1).join(' ') || '';
        
        // Check if user exists
        let user = await storage.getUserByEmail(email);
        
        if (!user) {
          // Create new user
          user = await storage.createUser({
            email,
            firstName,
            lastName,
            authProvider: 'apple',
            profileImageUrl: null
          });
        }
        
        return done(null, user);
      } catch (error) {
        console.error('Apple OAuth error:', error);
        return done(error, null);
      }
    }));
  }

  // Apple OAuth routes - only available if credentials are configured
  if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY) {
    app.get('/api/auth/apple', (req: Request, res: Response, next: NextFunction) => {
      const returnUrl = req.query.returnUrl as string;
      console.log('Apple OAuth initiated, returnUrl:', returnUrl);
      
      const state = returnUrl ? Buffer.from(returnUrl).toString('base64') : '';
      
      passport.authenticate('apple', {
        scope: ['name', 'email'],
        state: state
      })(req, res, next);
    });

    app.post('/api/auth/apple/callback',
      passport.authenticate('apple', { failureRedirect: '/?error=auth_failed' }),
      async (req: Request, res: Response) => {
        try {
          // Ensure session is properly saved
          await new Promise<void>((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                console.error('Session save error:', err);
                reject(err);
              } else {
                resolve();
              }
            });
          });
          
          // Add slight delay to ensure session is fully persisted
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // Get returnUrl from state parameter
          const state = req.body.state as string;
          let returnUrl = '/';
          
          if (state) {
            try {
              returnUrl = Buffer.from(state, 'base64').toString('utf-8');
              console.log('Apple OAuth callback, returnUrl from state:', returnUrl);
            } catch (error) {
              console.error('Error decoding state parameter:', error);
            }
          }
          
          // Successful authentication, redirect to original page
          console.log('Redirecting to:', `${returnUrl}?social=apple&success=true`);
          res.redirect(`${returnUrl}?social=apple&success=true`);
        } catch (error) {
          console.error('Apple OAuth callback error:', error);
          res.redirect('/?error=session_failed');
        }
      }
    );
  }

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/?error=auth_failed' }),
    async (req: Request, res: Response) => {
      try {
        // Ensure session is properly saved with Promise-based approach
        await new Promise<void>((resolve, reject) => {
          req.session.save((err) => {
            if (err) {
              console.error('Session save error:', err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
        
        // Add slight delay to ensure session is fully persisted
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Get returnUrl from state parameter
        const state = req.query.state as string;
        let returnUrl = '/';
        
        if (state) {
          try {
            returnUrl = Buffer.from(state, 'base64').toString('utf-8');
            console.log('Google OAuth callback, returnUrl from state:', returnUrl);
          } catch (error) {
            console.error('Error decoding state parameter:', error);
          }
        }
        
        // Successful authentication, redirect to original page
        console.log('Redirecting to:', `${returnUrl}?social=google&success=true`);
        res.redirect(`${returnUrl}?social=google&success=true`);
      } catch (error) {
        console.error('OAuth callback error:', error);
        res.redirect('/?error=session_failed');
      }
    }
  );

  // Check authentication status
  app.get('/api/auth/status', async (req: Request, res: Response) => {
    console.log('Auth status check:', {
      isAuthenticated: req.isAuthenticated?.(),
      hasUser: !!req.user,
      sessionID: req.sessionID,
      session: req.session ? Object.keys(req.session) : 'no session',
      cookies: req.headers.cookie ? 'has cookies' : 'no cookies',
      sessionCookie: req.headers.cookie?.includes('connect.sid') ? 'session cookie found' : 'no session cookie'
    });
    
    // Check for session-based authentication (both Google OAuth and username/password)
    if (req.user && req.user.id) {
      // Session authentication is working properly
      try {
        const userWithRole = await storage.getUserWithRole(req.user.id);
        return res.json({ authenticated: true, user: userWithRole || req.user });
      } catch (error) {
        console.error('Error fetching user role:', error);
        return res.json({ authenticated: true, user: req.user });
      }
    }
    
    // Check if Passport authentication exists but user object is incomplete
    if (req.isAuthenticated && req.isAuthenticated()) {
      // Session exists but user object might be incomplete, try to load user
      if (req.session && req.session.passport && req.session.passport.user) {
        try {
          const user = await storage.getUserById(req.session.passport.user);
          if (user) {
            const userWithRole = await storage.getUserWithRole(user.id);
            return res.json({ authenticated: true, user: userWithRole || user });
          }
        } catch (error) {
          console.error('Failed to load user from session in auth status:', error);
        }
      }
    }
    
    res.json({ authenticated: false });
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

  // Admin role assignment endpoint (for superadmins to assign admin roles)
  app.post('/api/admin/assign-role', authenticateUser, requireRole(['superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { userId, roleId } = req.body;
      
      if (!userId || !roleId) {
        return res.status(400).json({ success: false, message: 'User ID and role ID are required' });
      }
      
      // Check if the target role exists and is valid
      const roles = await storage.getAllRoles();
      const targetRole = roles.find(r => r.id === roleId);
      
      if (!targetRole) {
        return res.status(400).json({ success: false, message: 'Invalid role ID' });
      }
      
      // Update user role
      await storage.updateUserRole(userId, roleId);
      
      res.json({ 
        success: true, 
        message: `User role updated to ${targetRole.name}`,
        role: targetRole
      });
    } catch (error) {
      console.error('Role assignment error:', error);
      res.status(500).json({ success: false, message: 'Failed to assign role' });
    }
  });

  // Comprehensive Admin Management API Routes
  
  // Admin Dashboard Stats
  app.get('/api/admin/dashboard-stats', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const stats = await storage.getAdminDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({ error: 'Failed to load dashboard stats' });
    }
  });

  // Enhanced Listing Management with Comprehensive Filtering and Sorting
  app.get('/api/admin/listings-with-stats', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { 
        status, 
        sellerType, 
        make, 
        model, 
        minPrice, 
        maxPrice, 
        location, 
        dateFrom, 
        dateTo,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        page = '1',
        limit = '50',
        search
      } = req.query;

      let query = db.select({
        id: carListings.id,
        sellerId: carListings.sellerId,
        title: carListings.title,
        make: carListings.make,
        model: carListings.model,
        year: carListings.year,
        price: carListings.price,
        status: carListings.status,
        location: carListings.location,
        createdAt: carListings.createdAt,
        updatedAt: carListings.updatedAt,
        viewCount: carListings.viewCount,
        favoriteCount: carListings.favoriteCount,
        isFlagged: carListings.isFlagged,
        flagReason: carListings.flagReason,
        isVerified: carListings.isVerified,
        featured: carListings.featured,
        mileage: carListings.mileage,
        fuelType: carListings.fuelType,
        bodyType: carListings.bodyType,
        engineSize: carListings.engineSize,
        transmission: carListings.transmission,
        condition: carListings.condition,
        sellerFirstName: appUsers.firstName,
        sellerLastName: appUsers.lastName,
        sellerEmail: appUsers.email,
        sellerPhone: appUsers.phoneNumber,
        sellerRoleId: appUsers.roleId
      })
      .from(carListings)
      .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id));

      // Apply filters
      const conditions = [];

      if (status && status !== 'all') {
        conditions.push(eq(carListings.status, status as string));
      }

      if (make && make !== 'all') {
        conditions.push(eq(carListings.make, make as string));
      }

      if (model && model !== 'all') {
        conditions.push(eq(carListings.model, model as string));
      }

      if (minPrice) {
        conditions.push(sql`${carListings.price}::numeric >= ${parseFloat(minPrice as string)}`);
      }

      if (maxPrice) {
        conditions.push(sql`${carListings.price}::numeric <= ${parseFloat(maxPrice as string)}`);
      }

      if (location && location !== 'all') {
        conditions.push(sql`${carListings.location} ILIKE ${'%' + location + '%'}`);
      }

      if (dateFrom) {
        conditions.push(sql`${carListings.createdAt} >= ${new Date(dateFrom as string)}`);
      }

      if (dateTo) {
        conditions.push(sql`${carListings.createdAt} <= ${new Date(dateTo as string)}`);
      }

      if (search) {
        conditions.push(sql`(
          ${carListings.title} ILIKE ${'%' + search + '%'} OR 
          ${carListings.make} ILIKE ${'%' + search + '%'} OR 
          ${carListings.model} ILIKE ${'%' + search + '%'} OR
          ${appUsers.firstName} ILIKE ${'%' + search + '%'} OR
          ${appUsers.lastName} ILIKE ${'%' + search + '%'} OR
          ${appUsers.email} ILIKE ${'%' + search + '%'}
        )`);
      }

      if (sellerType === 'verified') {
        conditions.push(eq(carListings.isVerified, true));
      } else if (sellerType === 'flagged') {
        conditions.push(eq(carListings.isFlagged, true));
      } else if (sellerType === 'featured') {
        conditions.push(eq(carListings.featured, true));
      } else if (sellerType === 'premium') {
        conditions.push(sql`${appUsers.roleId} > 1`);
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }

      // Apply sorting
      const validSortFields = ['createdAt', 'updatedAt', 'price', 'viewCount', 'favoriteCount', 'year', 'make', 'model', 'mileage'];
      const sortField = validSortFields.includes(sortBy as string) ? sortBy as string : 'createdAt';
      const order = sortOrder === 'asc' ? 'asc' : 'desc';
      
      if (sortField === 'price') {
        query = query.orderBy(order === 'asc' ? sql`${carListings.price}::numeric ASC` : sql`${carListings.price}::numeric DESC`);
      } else if (sortField === 'mileage') {
        query = query.orderBy(order === 'asc' ? asc(carListings.mileage) : desc(carListings.mileage));
      } else {
        const column = carListings[sortField as keyof typeof carListings];
        query = query.orderBy(order === 'asc' ? asc(column) : desc(column));
      }

      // Apply pagination
      const pageNum = Math.max(1, parseInt(page as string));
      const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)));
      const offset = (pageNum - 1) * limitNum;

      query = query.limit(limitNum).offset(offset);

      const listings = await query;

      // Get total count for pagination
      let countQuery = db.select({ count: sql`count(*)` })
        .from(carListings)
        .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id));

      if (conditions.length > 0) {
        countQuery = countQuery.where(and(...conditions));
      }

      const totalCountResult = await countQuery;
      const totalCount = parseInt(totalCountResult[0]?.count as string) || 0;

      // Get filter options for UI
      const makes = await db.selectDistinct({ make: carListings.make })
        .from(carListings)
        .where(sql`${carListings.make} IS NOT NULL`)
        .orderBy(carListings.make);

      const models = await db.selectDistinct({ 
        make: carListings.make,
        model: carListings.model 
      })
        .from(carListings)
        .where(sql`${carListings.make} IS NOT NULL AND ${carListings.model} IS NOT NULL`)
        .orderBy(carListings.make, carListings.model);

      const locations = await db.selectDistinct({ location: carListings.location })
        .from(carListings)
        .where(sql`${carListings.location} IS NOT NULL`)
        .orderBy(carListings.location);

      res.json({
        listings,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalCount,
          pages: Math.ceil(totalCount / limitNum)
        },
        filters: {
          makes: makes.map(m => m.make),
          models: models,
          locations: locations.map(l => l.location),
          statusOptions: ['pending', 'active', 'inactive', 'rejected', 'archived'],
          sellerTypes: ['all', 'verified', 'flagged', 'featured', 'premium']
        }
      });
    } catch (error) {
      console.error('Listings with stats error:', error);
      res.status(500).json({ error: 'Failed to load listings' });
    }
  });

  // Enhanced User Management with Comprehensive Filtering
  app.get('/api/admin/users-management', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { 
        search, 
        role, 
        status, 
        joinedFrom, 
        joinedTo, 
        page, 
        limit, 
        sort, 
        order 
      } = req.query;
      
      const filters = {
        search: search as string,
        role: role as string,
        status: status as string,
        joinedFrom: joinedFrom as string,
        joinedTo: joinedTo as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 20,
        sort: sort as string || 'createdAt',
        order: order as string || 'desc',
      };

      const result = await storage.getEnhancedUsersWithStats(filters);
      res.json(result);
    } catch (error) {
      console.error('Enhanced users management error:', error);
      res.status(500).json({ error: 'Failed to load users' });
    }
  });

  // Update User Role
  app.put('/api/admin/users/:userId/role', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { roleId } = req.body;
      
      if (!roleId) {
        return res.status(400).json({ error: 'Role ID is required' });
      }

      await storage.updateUserRole(userId, roleId);
      res.json({ success: true, message: 'User role updated successfully' });
    } catch (error) {
      console.error('Update user role error:', error);
      res.status(500).json({ error: 'Failed to update user role' });
    }
  });

  // Bulk User Actions
  app.post('/api/admin/users/bulk-action', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { userIds, action, data } = req.body;
      
      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ error: 'User IDs are required' });
      }
      
      if (!action) {
        return res.status(400).json({ error: 'Action is required' });
      }

      const adminId = req.user.id; // Get from authenticated user session
      
      await storage.bulkUserAction(userIds, action, adminId, data);
      
      res.json({ 
        success: true, 
        message: `Successfully performed ${action} on ${userIds.length} users` 
      });
    } catch (error) {
      console.error('Bulk user action error:', error);
      res.status(500).json({ error: 'Failed to perform bulk action' });
    }
  });

  // Bulk Listing Operations
  app.post('/api/admin/bulk-update-listings', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { listingIds, status, reason } = req.body;
      
      if (!listingIds || !Array.isArray(listingIds) || listingIds.length === 0) {
        return res.status(400).json({ error: 'Listing IDs are required' });
      }
      
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const adminId = req.user.id; // Get from authenticated user session
      
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

  // Individual Listing Details
  app.get('/api/admin/listing-details/:id', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      console.log('Fetching listing details for ID:', listingId);
      
      const listing = await storage.getListingById(listingId);
      console.log('Retrieved listing:', listing);
      
      if (!listing) {
        return res.status(404).json({ error: 'Listing not found' });
      }
      
      res.json(listing);
    } catch (error) {
      console.error('Get listing details error:', error);
      res.status(500).json({ error: 'Failed to load listing details' });
    }
  });

  // Individual Listing Actions
  app.put('/api/admin/listing/:id/approve', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      const { notes } = req.body;
      const adminId = req.user.id; // Get from authenticated user session
      
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

  app.put('/api/admin/listing/:id/reject', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      const { reason } = req.body;
      const adminId = req.user.id; // Get from authenticated user session
      
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

  app.put('/api/admin/listing/:id/flag', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      const { reason, notes } = req.body;
      const adminId = req.user.id;
      
      if (!reason) {
        return res.status(400).json({ error: 'Flag reason is required' });
      }
      
      await storage.flagListing(listingId, adminId, reason, notes);
      
      res.json({ 
        success: true, 
        message: 'Listing flagged successfully'
      });
    } catch (error) {
      console.error('Flag listing error:', error);
      res.status(500).json({ error: 'Failed to flag listing' });
    }
  });

  // Automated flagging system endpoints
  app.get('/api/admin/auto-flag-rules', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const rules = await db.select().from(autoFlagRules).orderBy(autoFlagRules.category, autoFlagRules.displayName);
      res.json(rules);
    } catch (error) {
      console.error('Get auto flag rules error:', error);
      res.status(500).json({ error: 'Failed to get auto flag rules' });
    }
  });

  app.get('/api/admin/automated-actions/:listingId', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const actions = await db.select()
        .from(automatedActionsLog)
        .where(eq(automatedActionsLog.listingId, listingId))
        .orderBy(desc(automatedActionsLog.createdAt));
      
      res.json(actions);
    } catch (error) {
      console.error('Get automated actions error:', error);
      res.status(500).json({ error: 'Failed to get automated actions' });
    }
  });

  app.get('/api/admin/flag-count-tracking/:listingId', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const flagCounts = await db.select()
        .from(flagCountTracking)
        .where(eq(flagCountTracking.listingId, listingId))
        .orderBy(desc(flagCountTracking.flagCount));
      
      res.json(flagCounts);
    } catch (error) {
      console.error('Get flag count tracking error:', error);
      res.status(500).json({ error: 'Failed to get flag count tracking' });
    }
  });

  app.get('/api/admin/seller-reputation/:sellerId', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const sellerId = req.params.sellerId;
      const reputation = await storage.getSellerReputationScore(sellerId);
      
      const fullReputation = await db.select()
        .from(sellerReputationTracking)
        .where(eq(sellerReputationTracking.sellerId, sellerId))
        .limit(1);
      
      res.json({
        reputationScore: reputation,
        details: fullReputation[0] || null
      });
    } catch (error) {
      console.error('Get seller reputation error:', error);
      res.status(500).json({ error: 'Failed to get seller reputation' });
    }
  });

  app.get('/api/admin/flagging-stats', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      // Get total flagged listings (using car_listings table)
      const totalFlags = await db.select({ count: sql`count(*)` })
        .from(carListings)
        .where(eq(carListings.isFlagged, true));

      // Get flagging activity in last 30 days
      const recentFlags = await db.select({ count: sql`count(*)` })
        .from(carListings)
        .where(sql`${carListings.isFlagged} = true AND ${carListings.flaggedAt} >= now() - interval '30 days'`);

      // Get automated actions count
      const automatedActions = await db.select({ count: sql`count(*)` })
        .from(automatedActionsLog);

      // Get flag reasons count
      const flagReasons = await db.select({
        flagReason: carListings.flagReason,
        count: sql`count(*)`
      })
        .from(carListings)
        .where(sql`${carListings.flagReason} IS NOT NULL`)
        .groupBy(carListings.flagReason)
        .orderBy(sql`count(*) desc`)
        .limit(5);

      res.json({
        totalFlags: totalFlags[0]?.count || 0,
        recentFlags: recentFlags[0]?.count || 0,
        automatedActions: automatedActions[0]?.count || 0,
        topReasons: flagReasons
      });
    } catch (error) {
      console.error('Get flagging stats error:', error);
      res.status(500).json({ error: 'Failed to get flagging statistics' });
    }
  });

  app.post('/api/admin/listing/:id/note', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      const { note } = req.body;
      const adminId = req.user.id;
      
      if (!note) {
        return res.status(400).json({ error: 'Note content is required' });
      }
      
      await storage.addAdminNote(listingId, adminId, note);
      
      res.json({ 
        success: true, 
        message: 'Note added successfully'
      });
    } catch (error) {
      console.error('Add note error:', error);
      res.status(500).json({ error: 'Failed to add note' });
    }
  });

  // User History and Management
  app.get('/api/admin/user/:id/history', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const history = await storage.getUserHistory(userId);
      
      res.json(history);
    } catch (error) {
      console.error('User history error:', error);
      res.status(500).json({ error: 'Failed to load user history' });
    }
  });

  app.post('/api/admin/user/:id/suspend', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
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
  app.get('/api/admin/analytics/overview', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
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
  app.get('/api/admin/flagged-content', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
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

  app.post('/api/admin/content/:id/resolve-flag', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
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
              icon: "Banknote", 
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
          icon: "Banknote", 
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
  app.get("/api/admin/users", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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

  app.put("/api/admin/users/:id/role", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.get("/api/admin/roles", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const roles = await storage.getAllRoles();
      res.json(roles);
    } catch (error) {
      console.error("Failed to get roles:", error);
      res.status(500).json({ error: "Failed to get roles" });
    }
  });

  app.post("/api/admin/roles", authenticateUser, requireRole(['superadmin', 'super_admin']), async (req, res) => {
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
  app.get("/api/admin/listings", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const listings = await storage.getAllListingsForAdmin();
      res.json(listings);
    } catch (error) {
      console.error("Failed to get listings:", error);
      res.status(500).json({ error: "Failed to get listings" });
    }
  });

  app.post("/api/admin/listings/:id/approve", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const { notes } = req.body;
      const approval = await storage.approveListing(parseInt(req.params.id), req.user.id, notes);
      res.json(approval);
    } catch (error) {
      console.error("Failed to approve listing:", error);
      res.status(500).json({ error: "Failed to approve listing" });
    }
  });

  app.post("/api/admin/listings/:id/reject", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const { reason } = req.body;
      const approval = await storage.rejectListing(parseInt(req.params.id), req.user.id, reason);
      res.json(approval);
    } catch (error) {
      console.error("Failed to reject listing:", error);
      res.status(500).json({ error: "Failed to reject listing" });
    }
  });

  app.post("/api/admin/listings/:id/request-changes", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const { changes, notes } = req.body;
      const approval = await storage.requestChanges(parseInt(req.params.id), req.user.id, changes, notes);
      res.json(approval);
    } catch (error) {
      console.error("Failed to request changes:", error);
      res.status(500).json({ error: "Failed to request changes" });
    }
  });

  app.put("/api/admin/listings/:id", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const validation = adminUpdateListingSchema.safeParse(req.body);
      
      if (!validation.success) {
        console.error("Validation error:", validation.error.issues);
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

  app.delete("/api/admin/listings/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      await storage.deleteListing(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to delete listing:", error);
      res.status(500).json({ error: "Failed to delete listing" });
    }
  });

  // Enhanced listing management endpoints
  app.post("/api/admin/listings/:id/flag", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const { reason } = req.body;
      await storage.flagListing(parseInt(req.params.id), req.user.id, reason);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to flag listing:", error);
      res.status(500).json({ error: "Failed to flag listing" });
    }
  });

  app.post("/api/admin/listings/:id/unflag", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      await storage.unflagListing(parseInt(req.params.id), req.user.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to unflag listing:", error);
      res.status(500).json({ error: "Failed to unflag listing" });
    }
  });

  app.get("/api/admin/listings/:id/details", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const details = await storage.getListingById(parseInt(req.params.id));
      res.json(details);
    } catch (error) {
      console.error("Failed to get listing details:", error);
      res.status(500).json({ error: "Failed to get listing details" });
    }
  });

  app.post("/api/admin/listings/:id/note", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const { note } = req.body;
      await storage.addAdminNote(parseInt(req.params.id), req.user.id, note);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to add admin note:", error);
      res.status(500).json({ error: "Failed to add admin note" });
    }
  });

  app.get("/api/admin/listings/:id/notes", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const notes = await storage.getListingNotes(parseInt(req.params.id));
      res.json(notes);
    } catch (error) {
      console.error("Failed to get listing notes:", error);
      res.status(500).json({ error: "Failed to get listing notes" });
    }
  });

  app.post("/api/admin/listings/:id/mark-sold", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      await storage.markListingAsSold(parseInt(req.params.id), req.user.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to mark listing as sold:", error);
      res.status(500).json({ error: "Failed to mark listing as sold" });
    }
  });

  app.post("/api/admin/listings/:id/archive", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      await storage.archiveListing(parseInt(req.params.id), req.user.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to archive listing:", error);
      res.status(500).json({ error: "Failed to archive listing" });
    }
  });

  app.post("/api/admin/listings/:id/restore", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      await storage.restoreListing(parseInt(req.params.id), req.user.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to restore listing:", error);
      res.status(500).json({ error: "Failed to restore listing" });
    }
  });

  app.get("/api/admin/listings/:id/duplicate-check", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const duplicates = await storage.duplicateCheck(parseInt(req.params.id));
      res.json(duplicates);
    } catch (error) {
      console.error("Failed to check duplicates:", error);
      res.status(500).json({ error: "Failed to check duplicates" });
    }
  });

  app.get("/api/admin/listings/export", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const listings = await storage.exportListings(req.query);
      res.json(listings);
    } catch (error) {
      console.error("Failed to export listings:", error);
      res.status(500).json({ error: "Failed to export listings" });
    }
  });

  // Media management endpoints
  app.post("/api/admin/listings/:id/media", authenticateUser, requireRole(['editor', 'admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const listingId = parseInt(req.params.id);
      const validation = mediaManagementSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const { action, images, videos, documents, deleteIndex, deleteVideoIndex, deleteDocumentIndex, featuredIndex, newOrder } = validation.data;
      
      switch (action) {
        case 'upload':
          if (!images || images.length === 0) {
            return res.status(400).json({ error: "Images are required for upload" });
          }
          await storage.addListingImages(listingId, images);
          break;
          
        case 'upload_video':
          if (!videos || videos.length === 0) {
            return res.status(400).json({ error: "Videos are required for video upload" });
          }
          await storage.addListingVideos(listingId, videos);
          break;
          
        case 'upload_document':
          if (!documents || documents.length === 0) {
            return res.status(400).json({ error: "Documents are required for document upload" });
          }
          await storage.addListingDocuments(listingId, documents);
          break;
          
        case 'delete':
          if (deleteIndex === undefined) {
            return res.status(400).json({ error: "Delete index is required" });
          }
          await storage.deleteListingImage(listingId, deleteIndex);
          break;
          
        case 'delete_video':
          if (deleteVideoIndex === undefined) {
            return res.status(400).json({ error: "Video delete index is required" });
          }
          await storage.deleteListingVideo(listingId, deleteVideoIndex);
          break;
          
        case 'delete_document':
          if (deleteDocumentIndex === undefined) {
            return res.status(400).json({ error: "Document delete index is required" });
          }
          await storage.deleteListingDocument(listingId, deleteDocumentIndex);
          break;
          
        case 'reorder':
          if (!newOrder || newOrder.length === 0) {
            return res.status(400).json({ error: "New order is required for reordering" });
          }
          await storage.reorderListingImages(listingId, newOrder);
          break;
          
        case 'set_featured':
          if (featuredIndex === undefined) {
            return res.status(400).json({ error: "Featured index is required" });
          }
          await storage.setFeaturedImage(listingId, featuredIndex);
          break;
          
        default:
          return res.status(400).json({ error: "Invalid action" });
      }
      
      // Return updated listing with new images
      const updatedListing = await storage.getListingById(listingId);
      res.json(updatedListing);
    } catch (error) {
      console.error("Failed to manage media:", error);
      res.status(500).json({ error: "Failed to manage media" });
    }
  });

  // Admin meta fields update endpoint
  app.put("/api/admin/listings/:id/meta", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const listingId = parseInt(req.params.id);
      const validation = adminMetaUpdateSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const updatedListing = await storage.updateListingMeta(listingId, validation.data, req.user.id);
      res.json(updatedListing);
    } catch (error) {
      console.error("Failed to update listing meta:", error);
      res.status(500).json({ error: "Failed to update listing meta" });
    }
  });

  // Get available users for reassignment
  app.get("/api/admin/available-users", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const users = await storage.getAvailableUsers();
      res.json(users);
    } catch (error) {
      console.error("Failed to get available users:", error);
      res.status(500).json({ error: "Failed to get available users" });
    }
  });

  // User dashboard endpoints
  app.get("/api/user/listings", authenticateUser, async (req, res) => {
    try {
      const listings = await storage.getListingsByUser(req.user.id);
      
      // Set cache headers for better performance
      res.set('Cache-Control', 'public, max-age=120'); // Cache for 2 minutes
      res.json(listings);
    } catch (error) {
      console.error("Failed to get user listings:", error);
      res.status(500).json({ error: "Failed to get user listings" });
    }
  });

  // Get listings by specific seller ID (for "view all seller listings" feature)
  app.get("/api/seller/:sellerId/listings", async (req, res) => {
    try {
      const { sellerId } = req.params;
      const { limit = 6, excludeId } = req.query;
      
      const listings = await db
        .select({
          id: carListings.id,
          title: carListings.title,
          make: carListings.make,
          model: carListings.model,
          year: carListings.year,
          price: carListings.price,
          location: carListings.location,
          mileage: carListings.mileage,
          fuelType: carListings.fuelType,
          transmission: carListings.transmission,
          bodyType: carListings.bodyType,
          exteriorColor: carListings.exteriorColor,
          status: carListings.status,
          viewCount: carListings.viewCount,
          favoriteCount: carListings.favoriteCount,
          createdAt: carListings.createdAt,
          images: carListings.images,
          isVerified: carListings.isVerified,
          featured: carListings.featured,
        })
        .from(carListings)
        .where(
          and(
            eq(carListings.sellerId, sellerId),
            eq(carListings.status, 'active'),
            excludeId ? sql`${carListings.id} != ${parseInt(excludeId as string)}` : sql`1=1`
          )
        )
        .orderBy(desc(carListings.createdAt))
        .limit(parseInt(limit as string) || 6);

      res.json(listings);
    } catch (error) {
      console.error("Failed to get seller listings:", error);
      res.status(500).json({ error: "Failed to get seller listings" });
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

  // Update listing (for sellers to update their own listings)
  app.put("/api/listings/:id", authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.id);
      const userId = req.user.id;
      
      // First, verify the user owns this listing
      const existingListing = await db
        .select()
        .from(carListings)
        .where(eq(carListings.id, listingId))
        .limit(1);
      
      if (existingListing.length === 0) {
        return res.status(404).json({ error: "Listing not found" });
      }
      
      if (existingListing[0].sellerId !== userId) {
        return res.status(403).json({ error: "You can only update your own listings" });
      }
      
      // If only price is being updated, handle it directly
      if (Object.keys(req.body).length === 1 && req.body.price !== undefined) {
        const updatedListing = await storage.updateListing(listingId, { price: req.body.price });
        return res.json(updatedListing);
      }
      
      // Otherwise, validate the full update
      const validation = carListingSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }
      
      const updatedListing = await storage.updateListing(listingId, validation.data);
      res.json(updatedListing);
    } catch (error) {
      console.error("Failed to update listing:", error);
      res.status(500).json({ error: "Failed to update listing" });
    }
  });

  // Monetization Routes
  try {
    const monetizationRoutes = await import('./routes/monetization-routes');
    app.use('/api/monetization', monetizationRoutes.default);
  } catch (error) {
    console.error('Error loading monetization routes:', error);
  }

  // Advertisement Management Routes
  try {
    const advertisementRoutes = await import('./routes/advertisement-routes');
    app.use('/api/advertisements', advertisementRoutes.default);
  } catch (error) {
    console.error('Error loading advertisement routes:', error);
  }

  // Concierge Service Routes
  try {
    const conciergeRoutes = await import('./routes/concierge-routes');
    app.use('/api/concierge', conciergeRoutes.default);
    console.log("Concierge service routes registered successfully");
  } catch (error) {
    console.error('Error loading concierge routes:', error);
  }

  // Product Catalog Routes - removed async wrapper causing issues
  
  // Dealer Routes
  app.use('/api/dealers', dealerRoutes);
  
  // SMS Routes
  app.use('/api/sms', smsRoutes);

  // Role Management Routes
  app.use('/api/admin', roleManagementRoutes);

  // Initialize default monetization plans
  app.post('/api/monetization/initialize-plans', async (req, res) => {
    try {
      await MonetizationService.initializeDefaultPlans();
      res.json({ success: true, message: 'Default plans initialized' });
    } catch (error) {
      console.error('Error initializing plans:', error);
      res.status(500).json({ error: 'Failed to initialize plans' });
    }
  });

  app.post("/api/calculate-duty", UsageLimiter.dutyCalculation, async (req, res) => {
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
      const { make, model, engineCapacity, driveConfig, limit = "20" } = req.query;
      
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
      
      // Apply drive configuration filtering
      if (driveConfig && typeof driveConfig === 'string') {
        // Map normalized values back to database values
        if (driveConfig === '2WD') {
          whereConditions.push(sql`(
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%2wd%' OR 
            ${vehicleReferences.driveConfiguration} = '2' OR 
            LOWER(${vehicleReferences.driveConfiguration}) = '2x4' OR
            LOWER(${vehicleReferences.driveConfiguration}) = '2*4'
          )`);
        } else if (driveConfig === '4WD') {
          whereConditions.push(sql`(
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%4wd%' OR 
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%4x4%' OR 
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%4*4%' OR
            LOWER(${vehicleReferences.driveConfiguration}) = '4x2' OR
            LOWER(${vehicleReferences.driveConfiguration}) = '4*2'
          )`);
        } else if (driveConfig === 'AWD') {
          whereConditions.push(sql`LOWER(${vehicleReferences.driveConfiguration}) LIKE '%awd%'`);
        } else {
          // Exact match for other configurations
          whereConditions.push(sql`${vehicleReferences.driveConfiguration} = ${driveConfig}`);
        }
      }

      // For proration reference vehicles, ensure vehicles have CRSP values and engine capacity
      // Remove make-only restriction to allow any model for proration
      if (!model && !engineCapacity) {
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

  // Bank Partners API endpoints
  app.get('/api/bank-partners', async (req, res) => {
    try {
      const partners = await db
        .select()
        .from(bankPartners)
        .where(eq(bankPartners.isActive, true))
        .orderBy(bankPartners.bankName);
      
      res.json(partners);
    } catch (error) {
      console.error("Error fetching bank partners:", error);
      res.status(500).json({ message: "Failed to fetch bank partners" });
    }
  });

  // Loan Products API endpoints
  app.get('/api/loan-products', async (req, res) => {
    try {
      const products = await db
        .select({
          id: loanProducts.id,
          bankId: loanProducts.bankId,
          productName: loanProducts.productName,
          productType: loanProducts.productType,
          minInterestRate: loanProducts.minInterestRate,
          maxInterestRate: loanProducts.maxInterestRate,
          minLoanAmount: loanProducts.minLoanAmount,
          maxLoanAmount: loanProducts.maxLoanAmount,
          minTenureMonths: loanProducts.minTenureMonths,
          maxTenureMonths: loanProducts.maxTenureMonths,
          maxFinancingPercentage: loanProducts.maxFinancingPercentage,
          processingFeePercentage: loanProducts.processingFeeRate,
          requiresDownPayment: loanProducts.guarantorRequired,
          minDownPaymentPercentage: loanProducts.minDownPaymentPercentage,
          eligibilityRequirements: loanProducts.eligibilityCriteria,
          requiredDocuments: loanProducts.requiredDocuments,
          features: loanProducts.features,
          isActive: loanProducts.isActive,
          // Join bank details
          bankName: bankPartners.bankName,
          bankCode: bankPartners.bankCode,
          bankLogoUrl: bankPartners.logoUrl,
          bankWebsiteUrl: bankPartners.websiteUrl,
          bankContactPhone: bankPartners.contactPhone
        })
        .from(loanProducts)
        .leftJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
        .where(and(
          eq(loanProducts.isActive, true),
          eq(bankPartners.isActive, true)
        ))
        .orderBy(bankPartners.bankName, loanProducts.productName);
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching loan products:", error);
      res.status(500).json({ message: "Failed to fetch loan products" });
    }
  });

  // Get loan products by bank
  app.get('/api/bank-partners/:bankId/loan-products', async (req, res) => {
    try {
      const bankId = parseInt(req.params.bankId);
      const products = await db
        .select()
        .from(loanProducts)
        .where(and(
          eq(loanProducts.bankId, bankId),
          eq(loanProducts.isActive, true)
        ))
        .orderBy(loanProducts.productName);
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching loan products for bank:", error);
      res.status(500).json({ message: "Failed to fetch loan products for bank" });
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

  // Get drive configurations for a specific make and model (with optional category filtering)
  app.get("/api/vehicle-references/makes/:make/models/:model/drives", async (req, res) => {
    try {
      const { make, model } = req.params;
      const { category } = req.query;
      
      let whereConditions = [
        sql`LOWER(${vehicleReferences.make}) = LOWER(${make})`,
        sql`LOWER(${vehicleReferences.model}) = LOWER(${model})`,
        sql`${vehicleReferences.driveConfiguration} IS NOT NULL`
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
          driveConfiguration: vehicleReferences.driveConfiguration
        })
        .from(vehicleReferences)
        .where(sql.join(whereConditions, sql` AND `))
        .orderBy(vehicleReferences.driveConfiguration);
        
      // Normalize drive configurations to common values
      const driveConfigsMap = new Map();
      results.forEach(result => {
        const driveConfig = result.driveConfiguration?.toLowerCase();
        if (driveConfig) {
          if (driveConfig.includes('2wd') || driveConfig === '2' || driveConfig === '2x4' || driveConfig === '2*4') {
            driveConfigsMap.set('2WD', '2WD');
          } else if (driveConfig.includes('4wd') || driveConfig.includes('4x4') || driveConfig.includes('4*4') || driveConfig === '4x2' || driveConfig === '4*2') {
            driveConfigsMap.set('4WD', '4WD');
          } else if (driveConfig.includes('awd')) {
            driveConfigsMap.set('AWD', 'AWD');
          } else if (driveConfig.includes('6x')) {
            driveConfigsMap.set('6WD', '6WD');
          } else if (driveConfig.includes('8x')) {
            driveConfigsMap.set('8WD', '8WD');
          } else {
            // Keep original for other configurations
            driveConfigsMap.set(result.driveConfiguration, result.driveConfiguration);
          }
        }
      });
      
      res.json(Array.from(driveConfigsMap.values()).sort());
    } catch (error) {
      console.error("Failed to fetch drive configurations:", error);
      res.status(500).json({ 
        error: "Failed to fetch drive configurations" 
      });
    }
  });

  // Get engine sizes for a specific make and model (with optional category and drive filtering)
  app.get("/api/vehicle-references/makes/:make/models/:model/engines", async (req, res) => {
    try {
      const { make, model } = req.params;
      const { category, driveConfig } = req.query;
      
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
      
      // Apply drive configuration filtering
      if (driveConfig && typeof driveConfig === 'string') {
        // Map normalized values back to database values
        if (driveConfig === '2WD') {
          whereConditions.push(sql`(
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%2wd%' OR 
            ${vehicleReferences.driveConfiguration} = '2' OR 
            LOWER(${vehicleReferences.driveConfiguration}) = '2x4' OR
            LOWER(${vehicleReferences.driveConfiguration}) = '2*4'
          )`);
        } else if (driveConfig === '4WD') {
          whereConditions.push(sql`(
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%4wd%' OR 
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%4x4%' OR 
            LOWER(${vehicleReferences.driveConfiguration}) LIKE '%4*4%' OR
            LOWER(${vehicleReferences.driveConfiguration}) = '4x2' OR
            LOWER(${vehicleReferences.driveConfiguration}) = '4*2'
          )`);
        } else if (driveConfig === 'AWD') {
          whereConditions.push(sql`LOWER(${vehicleReferences.driveConfiguration}) LIKE '%awd%'`);
        } else {
          // Exact match for other configurations
          whereConditions.push(sql`${vehicleReferences.driveConfiguration} = ${driveConfig}`);
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
  app.get("/api/admin/vehicle-references", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string || '';
      const offset = (page - 1) * limit;

      let query = db.select().from(vehicleReferences);
      
      // Add search functionality
      if (search) {
        const searchTerm = `%${search.toLowerCase()}%`;
        query = query.where(
          or(
            sql`LOWER(${vehicleReferences.make}) LIKE ${searchTerm}`,
            sql`LOWER(${vehicleReferences.model}) LIKE ${searchTerm}`,
            sql`CAST(${vehicleReferences.engineCapacity} AS TEXT) LIKE ${searchTerm}`
          )
        );
      }

      // Get total count for pagination
      const totalCountQuery = db.select({ count: sql<number>`count(*)` }).from(vehicleReferences);
      if (search) {
        const searchTerm = `%${search.toLowerCase()}%`;
        totalCountQuery.where(
          or(
            sql`LOWER(${vehicleReferences.make}) LIKE ${searchTerm}`,
            sql`LOWER(${vehicleReferences.model}) LIKE ${searchTerm}`,
            sql`CAST(${vehicleReferences.engineCapacity} AS TEXT) LIKE ${searchTerm}`
          )
        );
      }

      const [{ count: totalCount }] = await totalCountQuery;
      
      // Execute main query with pagination
      const results = await query
        .orderBy(vehicleReferences.make, vehicleReferences.model)
        .limit(limit)
        .offset(offset);

      const totalPages = Math.ceil(totalCount / limit);

      res.json({
        data: results,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        search
      });
    } catch (error) {
      console.error("Failed to fetch vehicle references:", error);
      res.status(500).json({ error: "Failed to fetch vehicle references" });
    }
  });

  // Add new vehicle reference
  app.post("/api/admin/vehicle-references", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.put("/api/admin/vehicle-references/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.delete("/api/admin/vehicle-references/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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

  // Get reference vehicles for proration (filtered by make, more results for user selection)
  app.get("/api/vehicle-references/proration-references", async (req, res) => {
    try {
      const make = req.query.make as string;
      
      if (!make) {
        return res.status(400).json({ error: "Make parameter is required" });
      }
      
      // Get up to 100 vehicles from the specified make with valid CRSP values
      const vehicles = await db
        .select()
        .from(vehicleReferences)
        .where(
          and(
            eq(vehicleReferences.make, make),
            or(
              isNotNull(vehicleReferences.crspKes),
              isNotNull(vehicleReferences.crsp2020)
            ),
            isNotNull(vehicleReferences.engineCapacity)
          )
        )
        .orderBy(vehicleReferences.model, vehicleReferences.engineCapacity)
        .limit(100);
      
      res.json(vehicles);
    } catch (error) {
      console.error("Error fetching proration reference vehicles:", error);
      res.status(500).json({ error: "Failed to fetch proration reference vehicles" });
    }
  });

  // Get all tax rates
  app.get("/api/admin/tax-rates", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.post("/api/admin/tax-rates", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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

  // Get user's saved searches
  app.get("/api/saved-searches", authenticateUser, async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const results = await db
        .select()
        .from(savedSearches)
        .where(and(
          eq(savedSearches.userId, userId),
          eq(savedSearches.isActive, true)
        ))
        .orderBy(desc(savedSearches.createdAt));

      res.json(results);
    } catch (error) {
      console.error("Failed to fetch saved searches:", error);
      res.status(500).json({ error: "Failed to fetch saved searches" });
    }
  });

  // Save a new search
  app.post("/api/saved-searches", authenticateUser, async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const validation = z.object({
        name: z.string().min(1, "Search name is required"),
        filters: z.object({}).passthrough(), // Accept any filter object
        alertsEnabled: z.boolean().default(false),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validation.error.issues 
        });
      }

      const [result] = await db
        .insert(savedSearches)
        .values({
          userId,
          searchName: validation.data.name,
          filters: JSON.stringify(validation.data.filters),
          alertEnabled: validation.data.alertsEnabled,
        })
        .returning();

      res.json(result);
    } catch (error) {
      console.error("Failed to save search:", error);
      res.status(500).json({ error: "Failed to save search" });
    }
  });

  // Delete a saved search
  app.delete("/api/saved-searches/:id", authenticateUser, async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      const searchId = parseInt(req.params.id);

      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const [result] = await db
        .delete(savedSearches)
        .where(and(
          eq(savedSearches.id, searchId),
          eq(savedSearches.userId, userId)
        ))
        .returning();

      if (!result) {
        return res.status(404).json({ error: "Saved search not found" });
      }

      res.json({ message: "Search deleted successfully" });
    } catch (error) {
      console.error("Failed to delete saved search:", error);
      res.status(500).json({ error: "Failed to delete saved search" });
    }
  });

  // Update tax rate
  app.put("/api/admin/tax-rates/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.get("/api/admin/processing-fees", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.post("/api/admin/processing-fees", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.put("/api/admin/processing-fees/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.delete("/api/admin/processing-fees/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.get("/api/admin/category-rules", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.post("/api/admin/category-rules", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.put("/api/admin/category-rules/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.get("/api/admin/depreciation-rates", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.put("/api/admin/depreciation-rates/:id", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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

  app.post("/api/admin/upload-vehicle-csv", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), upload.single('csv'), async (req, res) => {
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
  app.get("/api/admin/stats", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.get("/api/admin/users", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.put("/api/admin/users/:userId/role", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.get("/api/admin/roles", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const roles = await storage.getAllRoles();
      res.json(roles);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      res.status(500).json({ error: "Failed to fetch roles" });
    }
  });

  // ===============================
  // CAR MARKETPLACE ENDPOINTS
  // ===============================

  // Get car listings with filters
  app.get('/api/car-listings', async (req: Request, res: Response) => {
    try {
      const {
        page = '1',
        limit = '20',
        search,
        make,
        model,
        minPrice,
        maxPrice,
        fuelType,
        transmission,
        bodyType,
        minMileage,
        maxMileage,
        minYear,
        maxYear,
        doors,
        color,
        features,
        sortBy = 'recommended'
      } = req.query;

      // Build cache key from query parameters
      const queryParams = { 
        page, limit, search, make, model, minPrice, maxPrice, 
        fuelType, transmission, bodyType, minMileage, maxMileage, 
        minYear, maxYear, doors, color, features, sortBy 
      };
      const cacheKey = CacheKeys.carListings(JSON.stringify(queryParams));
      
      // Check cache first
      const cached = await CacheService.get(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const offset = (pageNum - 1) * limitNum;

      // Build query conditions for filtering
      let whereConditions = [];
      
      // Only show approved/active listings from active users
      whereConditions.push(eq(carListings.status, 'active'));
      whereConditions.push(eq(appUsers.status, 'active'));
      
      if (search) {
        const searchTerm = `%${search}%`;
        whereConditions.push(
          or(
            sql`${carListings.make} ILIKE ${searchTerm}`,
            sql`${carListings.model} ILIKE ${searchTerm}`,
            sql`${carListings.title} ILIKE ${searchTerm}`,
            sql`${carListings.description} ILIKE ${searchTerm}`,
            sql`${carListings.bodyType} ILIKE ${searchTerm}`,
            sql`${carListings.fuelType} ILIKE ${searchTerm}`,
            sql`${carListings.transmission} ILIKE ${searchTerm}`,
            sql`CONCAT(${carListings.make}, ' ', ${carListings.model}) ILIKE ${searchTerm}`
          )
        );
      }
      
      if (make) {
        const makes = (make as string).split(',');
        whereConditions.push(eq(carListings.make, makes[0])); // For now, just use the first make
      }
      
      if (model) {
        const models = (model as string).split(',');
        whereConditions.push(eq(carListings.model, models[0])); // For now, just use the first model
      }
      
      if (minPrice) {
        whereConditions.push(sql`${carListings.price}::integer >= ${parseInt(minPrice as string)}`);
      }
      
      if (maxPrice) {
        whereConditions.push(sql`${carListings.price}::integer <= ${parseInt(maxPrice as string)}`);
      }
      
      if (fuelType) {
        const fuelTypes = (fuelType as string).split(',');
        whereConditions.push(eq(carListings.fuelType, fuelTypes[0]));
      }
      
      if (transmission) {
        const transmissions = (transmission as string).split(',');
        whereConditions.push(eq(carListings.transmission, transmissions[0]));
      }
      
      if (bodyType) {
        const bodyTypes = (bodyType as string).split(',');
        whereConditions.push(eq(carListings.bodyType, bodyTypes[0]));
      }
      
      if (minMileage) {
        whereConditions.push(sql`${carListings.mileage}::integer >= ${parseInt(minMileage as string)}`);
      }
      
      if (maxMileage) {
        whereConditions.push(sql`${carListings.mileage}::integer <= ${parseInt(maxMileage as string)}`);
      }
      
      if (minYear) {
        whereConditions.push(sql`${carListings.year} >= ${parseInt(minYear as string)}`);
      }
      
      if (maxYear) {
        whereConditions.push(sql`${carListings.year} <= ${parseInt(maxYear as string)}`);
      }
      
      if (color) {
        const colors = (color as string).split(',');
        if (colors.length === 1) {
          whereConditions.push(eq(carListings.exteriorColor, colors[0]));
        } else {
          whereConditions.push(sql`${carListings.exteriorColor} IN (${colors.map(c => `'${c}'`).join(',')})`);
        }
      }

      // Get total count for pagination with error handling
      let totalCount;
      try {
        const [count] = await db
          .select({ count: sql<number>`count(*)` })
          .from(carListings)
          .innerJoin(appUsers, eq(carListings.sellerId, appUsers.id))
          .where(and(...whereConditions));
        totalCount = count;
      } catch (countError) {
        console.error('📊 Error getting count:', countError);
        totalCount = { count: 0 };
      }

      // Build ordering
      let orderBy;
      switch (sortBy) {
        case 'price_low':
          orderBy = sql`${carListings.price}::integer ASC`;
          break;
        case 'price_high':
          orderBy = sql`${carListings.price}::integer DESC`;
          break;
        case 'newest':
          orderBy = desc(carListings.createdAt);
          break;
        case 'mileage_low':
          orderBy = sql`${carListings.mileage}::integer ASC`;
          break;
        case 'year_new':
          orderBy = desc(carListings.year);
          break;
        case 'recommended':
        default:
          orderBy = desc(carListings.createdAt);
          break;
      }

      // Query listings with filters and error handling
      let dbListings;
      try {

        dbListings = await db
          .select({
            listing: carListings,
            dealerName: sql<string>`dealer_profiles.dealer_name`,
            dealerLogoUrl: sql<string>`dealer_profiles.logo_url`,
            isVerifiedDealer: sql<boolean>`dealer_profiles.is_verified`,
          })
          .from(carListings)
          .innerJoin(appUsers, eq(carListings.sellerId, appUsers.id))
          .leftJoin(sql`dealer_profiles`, sql`dealer_profiles.user_id = ${carListings.sellerId}`)
          .where(and(...whereConditions))
          .orderBy(orderBy)
          .limit(limitNum)
          .offset(offset);
        console.log('✅ Car listings query successful, found:', dbListings.length);
      } catch (queryError) {
        console.error('❌ Error executing car listings query:', queryError);
        dbListings = [];
      }

      // Transform database results to match expected format
      const transformedListings = dbListings.map(row => {
        return {
          id: row.listing.id,
          make: row.listing.make,
          model: row.listing.model,
          year: row.listing.year,
          price: parseInt(row.listing.price),
          mileage: parseInt(row.listing.mileage || '0'),
          fuelType: row.listing.fuelType,
          transmission: row.listing.transmission,
          bodyType: row.listing.bodyType,
          location: row.listing.location,
          condition: row.listing.condition,
          exteriorColor: row.listing.exteriorColor,
          doors: row.listing.doors,
          images: row.listing.images || [],
          features: row.listing.features || [],
          isVerified: row.listing.isVerified || false,
          hasWarranty: row.listing.hasWarranty || false,
          hasFreeDelivery: row.listing.freeDelivery || false,
          viewCount: 0, // TODO: Add analytics
          favoriteCount: 0, // TODO: Add analytics
          createdAt: row.listing.createdAt ? row.listing.createdAt.toISOString() : new Date().toISOString(),
          sellerId: row.listing.sellerId,
          title: row.listing.title,
          description: row.listing.description,
          dealerName: row.dealerName,
          dealerLogoUrl: row.dealerLogoUrl,
          isVerifiedDealer: row.isVerifiedDealer || false
        };
      });

      const totalPages = Math.ceil(totalCount.count / limitNum);

      const response = {
        cars: transformedListings,
        total: totalCount.count,
        totalPages,
        currentPage: pageNum,
        hasMore: pageNum < totalPages
      };

      // Cache the response for 5 minutes
      await CacheService.set(cacheKey, response, { ttl: 300 });

      res.json(response);
    } catch (error) {
      console.error('Failed to fetch car listings:', error);
      res.status(500).json({ error: 'Failed to fetch car listings' });
    }
  });

  // Get featured listings
  app.get('/api/featured-listings', async (req: Request, res: Response) => {
    try {
      console.log('🎯 Featured listings API called');
      const cacheKey = CacheKeys.carListings('featured');
      
      // Check cache first
      const cached = await CacheService.get(cacheKey);
      if (cached) {
        console.log('📦 Returning cached featured listings:', cached.length);
        return res.json(cached);
      }

      console.log('🔍 Querying database for featured listings...');
      // Query featured listings
      const featuredListings = await db
        .select({
          listing: carListings,
          dealerName: sql<string>`dealer_profiles.dealer_name`,
          dealerLogoUrl: sql<string>`dealer_profiles.logo_url`,
          isVerifiedDealer: sql<boolean>`dealer_profiles.is_verified`,
        })
        .from(carListings)
        .innerJoin(appUsers, eq(carListings.sellerId, appUsers.id))
        .leftJoin(sql`dealer_profiles`, sql`dealer_profiles.user_id = ${carListings.sellerId}`)
        .where(and(
          eq(carListings.status, 'active'),
          eq(carListings.featured, true)
        ))
        .orderBy(desc(carListings.createdAt))
        .limit(6);

      console.log('📊 Found featured listings from DB:', featuredListings.length);

      // Transform database results to match expected format
      const transformedListings = featuredListings.map(row => {
        return {
          id: row.listing.id,
          make: row.listing.make,
          model: row.listing.model,
          year: row.listing.year,
          price: parseInt(row.listing.price),
          mileage: parseInt(row.listing.mileage || '0'),
          fuelType: row.listing.fuelType,
          transmission: row.listing.transmission,
          bodyType: row.listing.bodyType,
          location: row.listing.location,
          condition: row.listing.condition,
          exteriorColor: row.listing.exteriorColor,
          images: row.listing.images || [],
          features: row.listing.features || [],
          isVerified: row.listing.isVerified || false,
          featured: true,
          viewCount: row.listing.viewCount || 0,
          favoriteCount: row.listing.favoriteCount || 0,
          createdAt: row.listing.createdAt ? row.listing.createdAt.toISOString() : new Date().toISOString(),
          sellerId: row.listing.sellerId,
          title: row.listing.title,
          description: row.listing.description,
          dealerName: row.dealerName,
          dealerLogoUrl: row.dealerLogoUrl,
          isVerifiedDealer: row.isVerifiedDealer || false
        };
      });

      // Cache the response for 10 minutes
      await CacheService.set(cacheKey, transformedListings, { ttl: 600 });

      console.log('✅ Returning featured listings:', transformedListings.length);
      res.json(transformedListings);
    } catch (error) {
      console.error('Failed to fetch featured listings:', error);
      res.status(500).json({ error: 'Failed to fetch featured listings' });
    }
  });

  // Get filter options for car listings
  app.get('/api/car-listing-filters', async (req: Request, res: Response) => {
    try {
      const cacheKey = CacheKeys.carFilters('all');
      
      // Check cache first
      const cached = await CacheService.get(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      // Query actual database for filter options
      const [makesResult, modelsResult, fuelTypesResult, transmissionsResult, bodyTypesResult] = await Promise.all([
        db.selectDistinct({ make: carListings.make }).from(carListings).where(and(eq(carListings.status, 'active'), isNotNull(carListings.make), ne(carListings.make, ''))),
        db.selectDistinct({ model: carListings.model }).from(carListings).where(and(eq(carListings.status, 'active'), isNotNull(carListings.model), ne(carListings.model, ''))),
        db.selectDistinct({ fuelType: carListings.fuelType }).from(carListings).where(and(eq(carListings.status, 'active'), isNotNull(carListings.fuelType), ne(carListings.fuelType, ''))),
        db.selectDistinct({ transmission: carListings.transmission }).from(carListings).where(and(eq(carListings.status, 'active'), isNotNull(carListings.transmission), ne(carListings.transmission, ''))),
        db.selectDistinct({ bodyType: carListings.bodyType }).from(carListings).where(and(eq(carListings.status, 'active'), isNotNull(carListings.bodyType), ne(carListings.bodyType, '')))
      ]);

      const filterOptions = {
        makes: makesResult.map(r => r.make).filter(make => make && make.trim()).sort(),
        models: modelsResult.map(r => r.model).filter(model => model && model.trim()).sort(),
        fuelTypes: fuelTypesResult.map(r => r.fuelType).filter(fuel => fuel && fuel.trim()).sort(),
        transmissions: transmissionsResult.map(r => r.transmission).filter(trans => trans && trans.trim()).sort(),
        bodyTypes: bodyTypesResult.map(r => r.bodyType).filter(body => body && body.trim()).sort(),
        colors: ['Black', 'White', 'Grey', 'Silver', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Other'],
        features: ['Navigation', 'Bluetooth', 'Cruise Control', 'Parking Sensors', 'Sunroof', 'Leather Seats', 'Alloy Wheels', 'Reverse Camera', '4WD', 'AWD']
      };

      // Cache filter options for 1 hour (they don't change often)
      await CacheService.set(cacheKey, filterOptions, { ttl: 3600 });

      res.json(filterOptions);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
      res.status(500).json({ error: 'Failed to fetch filter options' });
    }
  });

  // Add car to favorites
  app.post('/api/car-listings/:id/favorite', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      res.json({ message: 'Car added to favorites' });
    } catch (error) {
      console.error('Failed to add car to favorites:', error);
      res.status(500).json({ error: 'Failed to add car to favorites' });
    }
  });

  // Add car to comparison
  app.post('/api/car-listings/:id/compare', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      res.json({ message: 'Car added to comparison' });
    } catch (error) {
      console.error('Failed to add car to comparison:', error);
      res.status(500).json({ error: 'Failed to add car to comparison' });
    }
  });

  // Get individual car details with real-time view tracking
  app.get('/api/car-listings/:id/details', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const listingId = parseInt(id);
      
      if (isNaN(listingId)) {
        return res.status(400).json({ error: 'Invalid listing ID' });
      }

      // Fetch real listing from database with seller info (removed expensive analytics tracking)
      const results = await db
        .select({
          listing: carListings,
          seller: {
            id: appUsers.id,
            firstName: appUsers.firstName,
            lastName: appUsers.lastName,
            email: appUsers.email,
            phoneNumber: appUsers.phoneNumber,
            createdAt: appUsers.createdAt,
            updatedAt: appUsers.updatedAt,
            roleId: appUsers.roleId,
            lastLoginAt: appUsers.lastLoginAt
          }
        })
        .from(carListings)
        .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id))
        .where(eq(carListings.id, listingId));
      
      if (!results || results.length === 0) {
        return res.status(404).json({ error: 'Car not found' });
      }
      
      const result = results[0];
      const listing = result.listing;
      const seller = result.seller;

      // Simple view count increment (removed complex analytics for performance)
      try {
        await db
          .update(carListings)
          .set({ 
            viewCount: sql`COALESCE(${carListings.viewCount}, 0) + 1`,
            updatedAt: new Date()
          })
          .where(eq(carListings.id, listingId));
        
        console.log(`✓ Simple view tracked for listing ${listingId}`);
      } catch (trackingError) {
        console.error('Error in view tracking:', trackingError);
        // Don't fail the request if tracking fails
      }

      // Transform database listing to car details format
      const carDetails = {
        id: listing.id,
        sellerId: listing.sellerId,
        make: listing.make,
        model: listing.model,
        year: listing.year,
        price: Number(listing.price),
        mileage: listing.mileage || 0,
        fuelType: listing.fuelType || "Unknown",
        transmission: listing.transmission || "Unknown",
        bodyType: listing.bodyType || "Unknown",
        engineSize: listing.engineSize ? `${listing.engineSize}cc` : "Unknown",
        doors: 5, // Default value
        seats: 5, // Default value
        exteriorColor: listing.exteriorColor || "Unknown",
        interiorColor: listing.interiorColor || "Unknown",
        condition: "Used", // Default value since not in minimal schema
        location: listing.location,
        images: listing.images || [],
        videos: [], // Not in minimal schema
        documents: listing.documents || [],
        features: listing.features || [],
        isVerified: listing.verificationStatus === 'verified',
        hasWarranty: false, // Default value
        hasFreeDelivery: false, // Default value
        warrantyDetails: "Contact seller for warranty information",
        deliveryInfo: "Contact seller for delivery information",
        viewCount: listing.viewCount || 0,
        favoriteCount: listing.favoriteCount || 0,
        createdAt: listing.createdAt.toISOString(),
        description: listing.description || "No description available",
        registrationNumber: "Not provided", // Not in minimal schema
        vinNumber: "Not provided", // Not in minimal schema
        negotiable: listing.negotiable || true,
        sellerInfo: {
          name: seller ? `${seller.firstName || ''} ${seller.lastName || ''}`.trim() || "Unknown Seller" : "Unknown Seller",
          type: "individual" as const,
          rating: 4.5, // Default rating
          reviewCount: 0, // Default review count
          location: listing.location,
          phone: seller?.phoneNumber || "Not provided",
          whatsapp: seller?.phoneNumber || "Not provided"
        },
        vehicleHistory: {
          previousOwners: 1, // Default value
          serviceHistory: "Contact seller for service history",
          accidentHistory: "Contact seller for accident history", 
          motStatus: "Contact seller for inspection status",
          lastService: "Contact seller for service information"
        },
        financingOptions: {
          monthlyPayment: Math.round(Number(listing.price) * 0.02), // Rough estimate 2% of price
          depositAmount: Math.round(Number(listing.price) * 0.2), // 20% deposit
          loanTerm: 48, // 4 years
          interestRate: 12.5 // Standard rate
        }
      };

      res.json(carDetails);
    } catch (error) {
      console.error('Failed to fetch car details:', error);
      res.status(500).json({ error: 'Failed to fetch car details' });
    }
  });

  // ===============================
  // ADMIN LISTING MANAGEMENT
  // ===============================

  // Get all listings for admin
  app.get("/api/admin/listings", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const listings = await storage.getAllListingsForAdmin();
      res.json(listings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      res.status(500).json({ error: "Failed to fetch listings" });
    }
  });

  // Mock car details for backwards compatibility (unused)
  const unusedMockCarDetails = {
        1: {
          id: 1,
          make: "Toyota",
          model: "Harrier",
          year: 2018,
          price: 3200000,
          mileage: 45000,
          fuelType: "Petrol",
          transmission: "Automatic",
          bodyType: "SUV",
          engineSize: "2.0L",
          doors: 5,
          seats: 5,
          exteriorColor: "Black",
          interiorColor: "Black",
          condition: "Good",
          location: "Nairobi",
          images: [],
          features: ["Sunroof", "Leather Seats", "Navigation", "Bluetooth", "Reverse Camera", "Alloy Wheels"],
          isVerified: true,
          hasWarranty: true,
          hasFreeDelivery: false,
          warrantyDetails: "12 months comprehensive warranty",
          deliveryInfo: "Free delivery within 30km",
          viewCount: 245,
          favoriteCount: 12,
          createdAt: new Date().toISOString(),
          description: "This well-maintained 2018 Toyota Harrier offers excellent value with its reliable performance and comprehensive feature set. Perfect for daily commuting and family use. The vehicle has been regularly serviced and is in excellent condition.",
          sellerInfo: {
            name: "Premium Auto Dealers",
            type: "dealer" as const,
            rating: 4.8,
            reviewCount: 156,
            location: "Nairobi",
            phone: "+254712345678"
          },
          vehicleHistory: {
            previousOwners: 2,
            serviceHistory: "Full service history available",
            accidentHistory: "No reported accidents",
            motStatus: "Valid until 2025",
            lastService: "3 months ago"
          },
          financingOptions: {
            monthlyPayment: 45000,
            depositAmount: 640000,
            loanTerm: 60,
            interestRate: 12.5
          }
        },
        2: {
          id: 2,
          make: "Nissan",
          model: "X-Trail",
          year: 2019,
          price: 2800000,
          mileage: 38000,
          fuelType: "Petrol",
          transmission: "Automatic",
          bodyType: "SUV",
          engineSize: "2.5L",
          doors: 5,
          seats: 7,
          exteriorColor: "White",
          interiorColor: "Grey",
          condition: "Excellent",
          location: "Mombasa",
          images: [],
          features: ["4WD", "Reverse Camera", "Alloy Wheels", "Bluetooth", "Cruise Control", "Parking Sensors"],
          isVerified: true,
          hasWarranty: false,
          hasFreeDelivery: true,
          warrantyDetails: null,
          deliveryInfo: "Free delivery anywhere in Kenya",
          viewCount: 189,
          favoriteCount: 8,
          createdAt: new Date().toISOString(),
          description: "Excellent condition 2019 Nissan X-Trail with 4WD capability. Perfect for both city driving and off-road adventures. Recently serviced with all maintenance records available.",
          sellerInfo: {
            name: "Coast Auto Sales",
            type: "dealer" as const,
            rating: 4.6,
            reviewCount: 89,
            location: "Mombasa",
            phone: "+254722345678"
          },
          vehicleHistory: {
            previousOwners: 1,
            serviceHistory: "Full service history available",
            accidentHistory: "No reported accidents",
            motStatus: "Valid until 2025",
            lastService: "2 months ago"
          },
          financingOptions: {
            monthlyPayment: 39000,
            depositAmount: 560000,
            loanTerm: 60,
            interestRate: 12.5
          }
        },
        3: {
          id: 3,
          make: "Subaru",
          model: "Forester",
          year: 2017,
          price: 2500000,
          mileage: 52000,
          fuelType: "Petrol",
          transmission: "Automatic",
          bodyType: "SUV",
          engineSize: "2.0L",
          doors: 5,
          seats: 5,
          exteriorColor: "Silver",
          interiorColor: "Black",
          condition: "Good",
          location: "Kisumu",
          images: [],
          features: ["AWD", "Bluetooth", "Cruise Control", "Heated Seats", "Roof Rails"],
          isVerified: false,
          hasWarranty: true,
          hasFreeDelivery: false,
          warrantyDetails: "6 months mechanical warranty",
          deliveryInfo: "Delivery available at cost",
          viewCount: 156,
          favoriteCount: 5,
          createdAt: new Date().toISOString(),
          description: "Reliable 2017 Subaru Forester with AWD. Great for all weather conditions and long drives. Well maintained with regular service intervals.",
          sellerInfo: {
            name: "Lakeside Motors",
            type: "dealer" as const,
            rating: 4.3,
            reviewCount: 67,
            location: "Kisumu",
            phone: "+254733345678"
          },
          vehicleHistory: {
            previousOwners: 2,
            serviceHistory: "Regular service history",
            accidentHistory: "Minor fender bender - fully repaired",
            motStatus: "Valid until 2024",
            lastService: "4 months ago"
          },
          financingOptions: {
            monthlyPayment: 35000,
            depositAmount: 500000,
            loanTerm: 60,
            interestRate: 13.0
          }
        },
        4: {
          id: 4,
          make: "Honda",
          model: "CR-V",
          year: 2020,
          price: 3800000,
          mileage: 25000,
          fuelType: "Petrol",
          transmission: "Automatic",
          bodyType: "SUV",
          engineSize: "1.5L Turbo",
          doors: 5,
          seats: 5,
          exteriorColor: "Blue",
          interiorColor: "Black",
          condition: "Excellent",
          location: "Nakuru",
          images: [],
          features: ["Sunroof", "Navigation", "Parking Sensors", "Heated Seats", "Lane Assist", "Adaptive Cruise Control"],
          isVerified: true,
          hasWarranty: true,
          hasFreeDelivery: true,
          warrantyDetails: "24 months comprehensive warranty",
          deliveryInfo: "Free delivery within 100km",
          viewCount: 312,
          favoriteCount: 18,
          createdAt: new Date().toISOString(),
          description: "Nearly new 2020 Honda CR-V with advanced safety features and excellent fuel efficiency. This premium SUV offers comfort, reliability, and modern technology.",
          sellerInfo: {
            name: "Rift Valley Auto",
            type: "dealer" as const,
            rating: 4.9,
            reviewCount: 203,
            location: "Nakuru",
            phone: "+254744345678"
          },
          vehicleHistory: {
            previousOwners: 1,
            serviceHistory: "Full Honda service history",
            accidentHistory: "No accidents",
            motStatus: "Valid until 2026",
            lastService: "1 month ago"
          },
          financingOptions: {
            monthlyPayment: 53000,
            depositAmount: 760000,
            loanTerm: 60,
            interestRate: 11.5
          }
        },
        5: {
          id: 5,
          make: "Mazda",
          model: "CX-5",
          year: 2019,
          price: 3100000,
          mileage: 42000,
          fuelType: "Petrol",
          transmission: "Automatic",
          bodyType: "SUV",
          engineSize: "2.0L",
          doors: 5,
          seats: 5,
          exteriorColor: "Red",
          interiorColor: "Black",
          condition: "Good",
          location: "Eldoret",
          images: [],
          features: ["Bluetooth", "Alloy Wheels", "Reverse Camera", "Cruise Control", "Keyless Entry"],
          isVerified: true,
          hasWarranty: false,
          hasFreeDelivery: false,
          warrantyDetails: null,
          deliveryInfo: "Delivery available at cost",
          viewCount: 198,
          favoriteCount: 9,
          createdAt: new Date().toISOString(),
          description: "Stylish 2019 Mazda CX-5 with sporty design and excellent handling. Perfect balance of performance and comfort for the modern driver.",
          sellerInfo: {
            name: "North Rift Motors",
            type: "dealer" as const,
            rating: 4.4,
            reviewCount: 78,
            location: "Eldoret",
            phone: "+254755345678"
          },
          vehicleHistory: {
            previousOwners: 2,
            serviceHistory: "Regular maintenance",
            accidentHistory: "No reported accidents",
            motStatus: "Valid until 2025",
            lastService: "5 months ago"
          },
          financingOptions: {
            monthlyPayment: 43000,
            depositAmount: 620000,
            loanTerm: 60,
            interestRate: 12.8
          }
        },
        6: {
          id: 6,
          make: "Mitsubishi",
          model: "Outlander",
          year: 2018,
          price: 2900000,
          mileage: 48000,
          fuelType: "Petrol",
          transmission: "Automatic",
          bodyType: "SUV",
          engineSize: "2.4L",
          doors: 5,
          seats: 7,
          exteriorColor: "Grey",
          interiorColor: "Black",
          condition: "Good",
          location: "Thika",
          images: [],
          features: ["4WD", "Sunroof", "Leather Seats", "Navigation", "Reverse Camera", "Third Row Seating"],
          isVerified: false,
          hasWarranty: true,
          hasFreeDelivery: false,
          warrantyDetails: "9 months warranty",
          deliveryInfo: "Local delivery available",
          viewCount: 167,
          favoriteCount: 7,
          createdAt: new Date().toISOString(),
          description: "Spacious 2018 Mitsubishi Outlander with 7-seat configuration. Ideal for large families with 4WD capability for various terrains.",
          sellerInfo: {
            name: "Central Kenya Auto",
            type: "dealer" as const,
            rating: 4.2,
            reviewCount: 45,
            location: "Thika",
            phone: "+254766345678"
          },
          vehicleHistory: {
            previousOwners: 2,
            serviceHistory: "Regular service maintenance",
            accidentHistory: "No major accidents",
            motStatus: "Valid until 2024",
            lastService: "6 months ago"
          },
          financingOptions: {
            monthlyPayment: 40000,
            depositAmount: 580000,
            loanTerm: 60,
            interestRate: 13.2
          }
        }
      };



  // ===============================
  // ADMIN LISTING MANAGEMENT
  // ===============================

  // Get all listings for admin
  app.get("/api/admin/listings", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const listings = await storage.getAllListingsForAdmin();
      res.json(listings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      res.status(500).json({ error: "Failed to fetch listings" });
    }
  });

  // Approve listing
  app.post("/api/admin/listings/:listingId/approve", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.post("/api/admin/listings/:listingId/reject", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.post("/api/admin/listings/:listingId/request-changes", authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
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
  app.post("/api/calculate-transfer-cost", UsageLimiter.valuation, async (req, res) => {
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
        location = 'nairobi',
        // Image analysis fields
        useImageAnalysis,
        frontImage,
        reverseImage,
        leftSideImage,
        rightSideImage
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

      console.log(`=== VALUATION DEBUG ===`);
      console.log(`Base Price: ${basePrice}`);
      console.log(`Vehicle: ${year} ${make} ${model}`);
      console.log(`Mileage: ${mileage}, Condition: ${condition}, Location: ${location}`);

      // Calculate age depreciation - more conservative for Kenya market
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - year;
      const maxAge = 20; // Max age for calculation
      // Reduced depreciation rate from 8% to 6% per year, max 70%
      const ageDepreciation = Math.min(vehicleAge * 0.06, 0.7); 

      // Calculate mileage adjustment - more forgiving
      const avgMileagePerYear = 15000; // Average annual mileage in Kenya
      const expectedMileage = vehicleAge * avgMileagePerYear;
      const mileageDifference = mileage - expectedMileage;
      // Reduced mileage penalty
      const mileageAdjustment = Math.max(-0.2, Math.min(0.1, mileageDifference / 150000 * -0.1));

      // Condition adjustments - more conservative
      const conditionAdjustments = {
        'excellent': 0.10,
        'good': 0,
        'fair': -0.10,
        'poor': -0.25
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
      const totalAdjustment = mileageAdjustment + conditionAdjustment + locationFactor;
      const adjustedValue = depreciatedValue * (1 + totalAdjustment);
      const finalValue = Math.max(adjustedValue, basePrice * 0.15); // Minimum 15% of base price

      console.log(`Age: ${vehicleAge} years, Depreciation: ${ageDepreciation * 100}%`);
      console.log(`Depreciated Value: ${depreciatedValue}`);
      console.log(`Total Adjustment: ${totalAdjustment * 100}%`);
      console.log(`Adjusted Value: ${adjustedValue}`);
      console.log(`Final Value: ${finalValue}`);
      console.log(`========================`)

      // Calculate confidence score
      const hasExactMatch = vehicleId && baseVehicle.id === vehicleId;
      const hasEngineMatch = Math.abs((baseVehicle.engineCapacity || 0) - (engineCapacity || 0)) <= 200;
      const dataQuality = baseVehicle.crspKes ? 1 : 0.8; // Higher confidence for current CRSP vs 2020
      
      let confidenceScore = 70; // Base confidence
      if (hasExactMatch) confidenceScore += 20;
      if (hasEngineMatch) confidenceScore += 10;
      confidenceScore = Math.round(confidenceScore * dataQuality);

      // Use OpenAI for market analysis
      let aiAnalysis = `Based on current Kenya market conditions, the ${year} ${make} ${model} with ${engineCapacity}cc engine shows good market demand. With ${mileage.toLocaleString()} km and ${condition} condition, the vehicle retains solid value. This category is popular among Kenyan buyers for its reliability and fuel efficiency.`;
      
      // Image analysis results
      let imageAnalysis = null;
      let damageDiscount = 0;
      let finalMarketValue = finalValue;
      
      if (useImageAnalysis && frontImage && reverseImage && leftSideImage && rightSideImage) {
        console.log("Processing image analysis...");
        
        try {
          // Analyze each image using OpenAI Vision
          const analyzeImage = async (base64Image: string, viewName: string) => {
            const response = await openai.chat.completions.create({
              model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
              messages: [
                {
                  role: "system",
                  content: "You are a professional vehicle damage assessor. Analyze the image and provide a damage assessment score from 0-100 (0 = no damage, 100 = severely damaged). Look for dents, scratches, rust, paint damage, broken parts, or any repairs. Provide a brief description of visible damage."
                },
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: `Analyze the ${viewName} of this ${year} ${make} ${model} vehicle. Provide a damage score (0-100) and describe any visible damage, repairs, or blemishes that would affect the vehicle's value.`
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: base64Image
                      }
                    }
                  ]
                }
              ],
              max_tokens: 200
            });
            
            const analysis = response.choices[0].message.content || "";
            const scoreMatch = analysis.match(/(\d+)/);
            const damageScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
            
            return {
              analysis,
              damageScore: Math.min(100, Math.max(0, damageScore))
            };
          };
          
          // Analyze all images
          const [frontAnalysis, reverseAnalysis, leftAnalysis, rightAnalysis] = await Promise.all([
            analyzeImage(frontImage, "front view"),
            analyzeImage(reverseImage, "rear view"),
            analyzeImage(leftSideImage, "left side view"),
            analyzeImage(rightSideImage, "right side view")
          ]);
          
          // Calculate overall damage score (average of all views)
          const overallDamageScore = Math.round((
            frontAnalysis.damageScore + 
            reverseAnalysis.damageScore + 
            leftAnalysis.damageScore + 
            rightAnalysis.damageScore
          ) / 4);
          
          // Calculate damage discount based on overall score
          if (overallDamageScore > 0) {
            // Damage discount: 0-20% based on damage severity
            damageDiscount = Math.min(0.20, overallDamageScore / 100 * 0.25);
            finalMarketValue = finalValue * (1 - damageDiscount);
          }
          
          imageAnalysis = {
            frontAnalysis: frontAnalysis.analysis,
            reverseAnalysis: reverseAnalysis.analysis,
            leftSideAnalysis: leftAnalysis.analysis,
            rightSideAnalysis: rightAnalysis.analysis,
            frontDamageScore: frontAnalysis.damageScore,
            reverseDamageScore: reverseAnalysis.damageScore,
            leftSideDamageScore: leftAnalysis.damageScore,
            rightSideDamageScore: rightAnalysis.damageScore,
            overallDamageScore,
            damageDiscount,
            hasImageAnalysis: true
          };
          
          console.log("Image analysis completed:", {
            overallDamageScore,
            damageDiscount: (damageDiscount * 100).toFixed(1) + "%",
            finalValue: finalMarketValue
          });
          
        } catch (error) {
          console.error('Image analysis error:', error);
          imageAnalysis = {
            hasImageAnalysis: false,
            error: "Failed to analyze images"
          };
        }
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
        marketValue: Math.round(imageAnalysis && imageAnalysis.hasImageAnalysis ? finalMarketValue : finalValue),
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
        },
        ...(imageAnalysis && { imageAnalysis })
      };

      console.log("=== BACKEND RESPONSE DEBUG ===");
      console.log("Valuation object:", JSON.stringify(valuation, null, 2));
      console.log("================================");

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
      // Clearing charges are FIXED fees based on vehicle category, NOT based on CIF value
      // These are standard charges from clearing agents/freight forwarders
      let clearingChargeAmount = 55000; // default for unknown categories
      const clearingChargeResults = await db
        .select()
        .from(clearingCharges)
        .where(eq(clearingCharges.vehicleCategory, vehicleCategory));
      
      if (clearingChargeResults.length > 0) {
        clearingChargeAmount = parseFloat(clearingChargeResults[0].baseFee);
        console.log('Clearing charges for', vehicleCategory + ':', clearingChargeAmount, 'KES (fixed fee)');
      } else {
        console.log('Using default clearing charges:', clearingChargeAmount, 'KES');
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
        vehicleValue: Number(crspValue),  // Convert CRSP to number for duty calculation
        vehicleAge: new Date().getFullYear() - estimateData.year + 1,
        isDirectImport: true,  // Import estimator is always for direct imports
        engineSize: estimateData.engineCapacity || 1500,
        fuelType: 'petrol' as const
      };

      // Calculate duty directly using storage method (more efficient than API call)
      console.log('Duty calculation input:', dutyCalculationData);
      const dutyResult = await storage.calculateDuty(dutyCalculationData);
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
      console.log('Duty (from CRSP):', dutyResult.totalPayable, '← Calculated using CRSP value (includes registration fees)');
      console.log('Clearing Charges:', clearingChargeAmount, '← Fixed based on vehicle category');
      
      const transportCostNum = parseFloat(estimateData.transportCost || "0");
      const serviceFeePercentageNum = parseFloat(estimateData.serviceFeePercentage);
      console.log('Transport Cost:', transportCostNum, '← User input');
      
      // Base cost without service fee - use totalPayable to match duty calculator exactly
      const baseCost = cifKes + dutyResult.totalPayable + clearingChargeAmount + transportCostNum;
      console.log('Base Cost Total:', baseCost, '= CIF + Duty(with registration) + Clearing + Transport');
      
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
        dutyPayable: dutyResult.totalPayable.toString(),
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
          dutyPayable: dutyResult.totalPayable,
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
  // AI SMART SEARCH & CHATBOT API ROUTES
  // ===============================

  // AI-powered smart search parsing endpoint
  app.post('/api/smart-search-parse', async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query is required' });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: `You are a Kenyan car marketplace search parser. Parse natural language search queries and extract filters.

Extract these filters from user queries:
- budget/price: Convert terms like "budget 700000", "under 1M", "between 500k-1M" to minPrice/maxPrice in KES
- make: Car brands like "Toyota", "Nissan", "Honda", "Suzuki", "Mercedes", etc.
- model: Car models like "Corolla", "X-Trail", "Fit", "Alto", etc.
- fuel: "petrol", "diesel", "hybrid", "electric"
- transmission: "manual", "automatic", "cvt"
- bodyType: "suv", "sedan", "hatchback", "wagon", "coupe", "pickup", "van"
- year: Extract year ranges like "2018-2020", "after 2015", "before 2020"
- condition: "excellent", "good", "fair", "poor"

Kenyan price abbreviations:
- "k" or "K" = thousand (e.g., "500k" = 500,000)
- "M" = million (e.g., "1.5M" = 1,500,000)
- "budget" usually refers to maxPrice

Return JSON only:
{
  "filters": {
    "search": "extracted keywords for text search",
    "make": ["extracted makes"],
    "model": ["extracted models"], 
    "minPrice": number or null,
    "maxPrice": number or null,
    "fuelType": ["extracted fuel types"],
    "transmission": ["extracted transmissions"],
    "bodyType": ["extracted body types"],
    "minYear": number or null,
    "maxYear": number or null
  },
  "explanation": "Brief explanation of what was extracted"
}

Examples:
- "budget 700k suzuki" → budget=700000, make=["Suzuki"]
- "honda crv under 2M automatic" → make=["Honda"], model=["CR-V"], maxPrice=2000000, transmission=["automatic"]
- "toyota corolla 2018-2020 petrol" → make=["Toyota"], model=["Corolla"], minYear=2018, maxYear=2020, fuelType=["petrol"]`
          },
          {
            role: "user",
            content: query
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 500
      });

      const result = JSON.parse(completion.choices[0].message.content || '{"filters": {}, "explanation": "No filters extracted"}');
      res.json(result);
    } catch (error) {
      console.error('Smart search parsing error:', error);
      res.status(500).json({ 
        error: 'Failed to parse search query',
        filters: {},
        explanation: 'Error occurred while parsing'
      });
    }
  });

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

  // ===============================
  // USER ENGAGEMENT API ROUTES
  // ===============================

  // Car favorites functionality
  app.post('/api/car-listings/:id/favorite', async (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userId = req.user.id;
      
      // Check if already favorited
      const existing = await storage.getUserFavorite(userId, carId);
      
      if (existing) {
        // Remove from favorites
        await storage.removeFromFavorites(userId, carId);
        
        // Log activity
        await storage.logUserActivity(
          userId,
          'car_unfavorited',
          'car_listing',
          carId.toString(),
          `Removed car listing ID ${carId} from favorites`
        );
        
        res.json({ 
          success: true, 
          message: 'Car removed from favorites',
          favorited: false
        });
      } else {
        // Add to favorites
        await storage.addToFavorites(userId, carId);
        
        // Log activity
        await storage.logUserActivity(
          userId,
          'car_favorited',
          'car_listing',
          carId.toString(),
          `Added car listing ID ${carId} to favorites`
        );
        
        res.json({ 
          success: true, 
          message: 'Car added to favorites',
          favorited: true
        });
      }
    } catch (error) {
      console.error('Favorite car error:', error);
      res.status(500).json({ error: 'Failed to favorite car' });
    }
  });

  // Get user's favorites
  app.get('/api/user/favorites', async (req, res) => {
    try {
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userId = req.user.id;
      const favorites = await storage.getUserFavorites(userId);
      
      res.json({ favorites });
    } catch (error) {
      console.error('Get favorites error:', error);
      res.status(500).json({ error: 'Failed to get favorites' });
    }
  });

  // Save search functionality
  app.post('/api/user/save-search', async (req, res) => {
    try {
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userId = req.user.id;
      const { searchName, filters } = req.body;
      
      if (!searchName || !filters) {
        return res.status(400).json({ error: 'Search name and filters are required' });
      }
      
      await storage.saveSearch(userId, searchName, filters);
      
      // Log activity
      await storage.logUserActivity(
        userId,
        'search_saved',
        'search_filter',
        searchName,
        `Saved search: ${searchName}`
      );
      
      res.json({ 
        success: true, 
        message: 'Search saved successfully' 
      });
    } catch (error) {
      console.error('Save search error:', error);
      res.status(500).json({ error: 'Failed to save search' });
    }
  });

  // Get user's saved searches
  app.get('/api/user/saved-searches', async (req, res) => {
    try {
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userId = req.user.id;
      const savedSearches = await storage.getUserSavedSearches(userId);
      
      res.json({ savedSearches });
    } catch (error) {
      console.error('Get saved searches error:', error);
      res.status(500).json({ error: 'Failed to get saved searches' });
    }
  });

  // Car comparison functionality
  app.post('/api/car-listings/:id/compare', async (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userId = req.user.id;
      
      // Add to comparison list
      await storage.addToComparison(userId, carId);
      
      // Log activity
      await storage.logUserActivity(
        userId,
        'car_compared',
        'car_listing',
        carId.toString(),
        `Added car listing ID ${carId} to comparison`
      );
      
      res.json({ 
        success: true, 
        message: 'Car added to comparison',
        inComparison: true
      });
    } catch (error) {
      console.error('Compare car error:', error);
      res.status(500).json({ error: 'Failed to add car to comparison' });
    }
  });

  // Get user's comparison list
  app.get('/api/user/comparison', async (req, res) => {
    try {
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userId = req.user.id;
      const comparison = await storage.getUserComparison(userId);
      
      res.json({ comparison });
    } catch (error) {
      console.error('Get comparison error:', error);
      res.status(500).json({ error: 'Failed to get comparison' });
    }
  });

  // Remove from comparison
  app.delete('/api/user/comparison/:id', async (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      
      // Check if user is authenticated via session (OAuth)
      if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userId = req.user.id;
      await storage.removeFromComparison(userId, carId);
      
      // Log activity
      await storage.logUserActivity(
        userId,
        'car_removed_from_comparison',
        'car_listing',
        carId.toString(),
        `Removed car listing ID ${carId} from comparison`
      );
      
      res.json({ 
        success: true, 
        message: 'Car removed from comparison' 
      });
    } catch (error) {
      console.error('Remove from comparison error:', error);
      res.status(500).json({ error: 'Failed to remove from comparison' });
    }
  });

  // ==============================
  // MESSAGING AND ANALYTICS API
  // ==============================
  
  // Track phone clicks with real-time analytics updates
  app.post('/api/track-phone-click', async (req, res) => {
    try {
      const { listingId, sellerId, clickerUserId, clickerIp, userAgent, searchQuery, viewerId } = req.body;
      
      // Validate required fields
      if (!listingId) {
        return res.status(400).json({ error: 'Listing ID is required' });
      }

      const listingIdNum = parseInt(listingId);
      const today = new Date().toISOString().split('T')[0];

      // 1. Record the phone click in phone_click_tracking table
      try {
        await db.execute(sql`
          INSERT INTO phone_click_tracking (
            listing_id, seller_id, clicker_user_id, clicker_ip, 
            user_agent, click_timestamp
          ) VALUES (
            ${listingIdNum}, ${sellerId || null}, ${clickerUserId || null}, 
            ${clickerIp || 'unknown'}, ${userAgent || 'unknown'}, NOW()
          )
        `);
      } catch (insertError) {
        console.error('Error inserting phone click record:', insertError);
      }

      // 2. Update daily analytics immediately
      await db.execute(sql`
        INSERT INTO daily_listing_analytics (
          listing_id, date, phone_clicks, total_views, unique_visitors, 
          inquiries, favorites, shares, impressions, created_at, updated_at
        ) VALUES (
          ${listingIdNum}, ${today}, 1, 0, 0, 0, 0, 0, 0, NOW(), NOW()
        )
        ON CONFLICT (listing_id, date) DO UPDATE SET
          phone_clicks = daily_listing_analytics.phone_clicks + 1,
          updated_at = NOW()
      `);

      // 3. Track conversion in keyword analytics if search context exists
      if (searchQuery && viewerId) {
        try {
          await KeywordAnalytics.trackKeywordConversion({
            listingId: listingIdNum,
            keyword: searchQuery,
            conversionType: 'phone_click',
            viewerId
          });
        } catch (conversionError) {
          console.error('Error tracking keyword conversion:', conversionError);
        }
      }

      console.log(`✓ Phone click tracked: Listing ${listingIdNum}, User ${clickerUserId || 'anonymous'}`);
      res.json({ success: true, message: 'Phone click tracked successfully' });
    } catch (error) {
      console.error("Error tracking phone click:", error);
      res.status(500).json({ error: "Failed to track phone click" });
    }
  });

  // Track favorite/unfavorite actions with real-time updates
  app.post('/api/track-favorite', async (req, res) => {
    try {
      const { listingId, userId, action, searchQuery, viewerId } = req.body; // action: 'add' or 'remove'
      
      if (!listingId || !action) {
        return res.status(400).json({ error: 'Listing ID and action are required' });
      }

      const listingIdNum = parseInt(listingId);
      const today = new Date().toISOString().split('T')[0];
      const increment = action === 'add' ? 1 : -1;

      // 1. Update car_listings favorite count
      await db
        .update(carListings)
        .set({ 
          favoriteCount: sql`COALESCE(${carListings.favoriteCount}, 0) + ${increment}`,
          updatedAt: new Date()
        })
        .where(eq(carListings.id, listingIdNum));

      // 2. Update daily analytics (only increment for 'add' actions)
      if (action === 'add') {
        await db.execute(sql`
          INSERT INTO daily_listing_analytics (
            listing_id, date, favorites, total_views, unique_visitors, 
            phone_clicks, inquiries, shares, impressions, created_at, updated_at
          ) VALUES (
            ${listingIdNum}, ${today}, 1, 0, 0, 0, 0, 0, 0, NOW(), NOW()
          )
          ON CONFLICT (listing_id, date) DO UPDATE SET
            favorites = daily_listing_analytics.favorites + 1,
            updated_at = NOW()
        `);

        // 3. Track conversion in keyword analytics
        if (searchQuery && viewerId) {
          try {
            await KeywordAnalytics.trackKeywordConversion({
              listingId: listingIdNum,
              keyword: searchQuery,
              conversionType: 'favorite',
              viewerId
            });
          } catch (conversionError) {
            console.error('Error tracking keyword conversion:', conversionError);
          }
        }
      }

      console.log(`✓ Favorite ${action} tracked: Listing ${listingIdNum}, User ${userId || 'anonymous'}`);
      res.json({ success: true, message: `Favorite ${action} tracked successfully` });
    } catch (error) {
      console.error("Error tracking favorite:", error);
      res.status(500).json({ error: "Failed to track favorite action" });
    }
  });

  // Track inquiry/message sending with real-time updates
  app.post('/api/track-inquiry', async (req, res) => {
    try {
      const { listingId, senderId, messageContent, searchQuery, viewerId } = req.body;
      
      if (!listingId) {
        return res.status(400).json({ error: 'Listing ID is required' });
      }

      const listingIdNum = parseInt(listingId);
      const today = new Date().toISOString().split('T')[0];

      // 1. Update daily analytics immediately
      await db.execute(sql`
        INSERT INTO daily_listing_analytics (
          listing_id, date, inquiries, total_views, unique_visitors, 
          phone_clicks, favorites, shares, impressions, created_at, updated_at
        ) VALUES (
          ${listingIdNum}, ${today}, 1, 0, 0, 0, 0, 0, 0, NOW(), NOW()
        )
        ON CONFLICT (listing_id, date) DO UPDATE SET
          inquiries = daily_listing_analytics.inquiries + 1,
          updated_at = NOW()
      `);

      // 2. Track conversion in keyword analytics
      if (searchQuery && viewerId) {
        try {
          await KeywordAnalytics.trackKeywordConversion({
            listingId: listingIdNum,
            keyword: searchQuery,
            conversionType: 'inquiry',
            viewerId
          });
        } catch (conversionError) {
          console.error('Error tracking keyword conversion:', conversionError);
        }
      }

      console.log(`✓ Inquiry tracked: Listing ${listingIdNum}, Sender ${senderId || 'anonymous'}`);
      res.json({ success: true, message: 'Inquiry tracked successfully' });
    } catch (error) {
      console.error("Error tracking inquiry:", error);
      res.status(500).json({ error: "Failed to track inquiry" });
    }
  });

  // Track share actions with real-time updates
  app.post('/api/track-share', async (req, res) => {
    try {
      const { listingId, userId, platform, searchQuery, viewerId } = req.body; // platform: 'whatsapp', 'facebook', 'twitter', etc.
      
      if (!listingId) {
        return res.status(400).json({ error: 'Listing ID is required' });
      }

      const listingIdNum = parseInt(listingId);
      const today = new Date().toISOString().split('T')[0];

      // 1. Update daily analytics immediately
      await db.execute(sql`
        INSERT INTO daily_listing_analytics (
          listing_id, date, shares, total_views, unique_visitors, 
          phone_clicks, inquiries, favorites, impressions, created_at, updated_at
        ) VALUES (
          ${listingIdNum}, ${today}, 1, 0, 0, 0, 0, 0, 0, NOW(), NOW()
        )
        ON CONFLICT (listing_id, date) DO UPDATE SET
          shares = daily_listing_analytics.shares + 1,
          updated_at = NOW()
      `);

      // 2. Track conversion in keyword analytics
      if (searchQuery && viewerId) {
        try {
          await KeywordAnalytics.trackKeywordConversion({
            listingId: listingIdNum,
            keyword: searchQuery,
            conversionType: 'share',
            viewerId
          });
        } catch (conversionError) {
          console.error('Error tracking keyword conversion:', conversionError);
        }
      }

      console.log(`✓ Share tracked: Listing ${listingIdNum}, Platform ${platform}, User ${userId || 'anonymous'}`);
      res.json({ success: true, message: 'Share tracked successfully' });
    } catch (error) {
      console.error("Error tracking share:", error);
      res.status(500).json({ error: "Failed to track share action" });
    }
  });
  
  // Send message to seller (from car details page)
  app.post('/api/messaging/send', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const { message, listingId, sellerId } = req.body;

      if (!message?.trim()) {
        return res.status(400).json({ error: "Message content is required" });
      }

      if (!listingId || !sellerId) {
        return res.status(400).json({ error: "Listing ID and seller ID are required" });
      }

      // Check if user is trying to message themselves
      if (user.id === sellerId) {
        return res.status(400).json({ error: "Cannot message yourself" });
      }

      // Always create a new conversation for each inquiry to keep them separate
      let conversation = null;

      // Create a new conversation for each inquiry
      // Get the listing title for the conversation
      const [listing] = await db
        .select({ title: carListings.title })
        .from(carListings)
        .where(eq(carListings.id, listingId))
        .limit(1);
      
      const conversationTitle = listing ? `Inquiry: ${listing.title}` : `Inquiry about listing #${listingId}`;
      
      const [newConversation] = await db
        .insert(conversations)
        .values({
          type: 'listing_inquiry',
          title: conversationTitle,
          context: JSON.stringify({ listingId: listingId.toString() }),
          status: 'active',
          priority: 'normal',
          lastActivityAt: new Date()
        })
        .returning();

      // Add participants
      await db.insert(conversationParticipants).values([
        {
          conversationId: newConversation.id,
          userId: user.id,
          role: 'buyer',
          isActive: true
        },
        {
          conversationId: newConversation.id,
          userId: sellerId,
          role: 'seller',
          isActive: true
        }
      ]);

      conversation = newConversation;

      // Send the message
      const [newMessage] = await db
        .insert(messages)
        .values({
          conversationId: conversation.id,
          senderId: user.id,
          messageType: 'text',
          content: message.trim(),
          deliveryStatus: 'sent'
        })
        .returning();

      // Update conversation's last message and activity
      await db
        .update(conversations)
        .set({
          lastMessageAt: new Date(),
          lastActivityAt: new Date()
        })
        .where(eq(conversations.id, conversation.id));

      res.json({ success: true, message: newMessage });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Send message
  app.post('/api/send-message', async (req, res) => {
    try {
      const { listingId, sellerId, buyerId, message, messageType = 'text' } = messageSchema.parse(req.body);
      
      // Insert message
      const [newMessage] = await db
        .insert(messages)
        .values({
          listingId,
          sellerId,
          buyerId,
          message,
          messageType,
          sentAt: new Date()
        })
        .returning();
      
      // Update or create conversation
      await db
        .insert(conversations)
        .values({
          listingId,
          sellerId,
          buyerId,
          lastMessageId: newMessage.id,
          lastMessageAt: new Date()
        })
        .onConflictDoUpdate({
          target: [conversations.listingId, conversations.sellerId, conversations.buyerId],
          set: {
            lastMessageId: newMessage.id,
            lastMessageAt: new Date(),
            updatedAt: new Date()
          }
        });
      
      // Update daily analytics
      const today = new Date().toISOString().split('T')[0];
      await db
        .insert(dailyListingAnalytics)
        .values({
          listingId,
          date: today,
          inquiries: 1,
          totalViews: 0,
          phoneClicks: 0,
          favorites: 0,
          shares: 0
        })
        .onConflictDoUpdate({
          target: [dailyListingAnalytics.listingId, dailyListingAnalytics.date],
          set: {
            inquiries: sql`${dailyListingAnalytics.inquiries} + 1`,
            updatedAt: new Date()
          }
        });
      
      res.json({ success: true, message: newMessage });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });
  
  // Get user messages/conversations
  app.get('/api/user/messages', async (req, res) => {
    try {
      const user = req.user as any;
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      
      // Get all conversations where user is a participant
      const userParticipations = await db
        .select()
        .from(conversationParticipants)
        .where(
          and(
            eq(conversationParticipants.userId, user.id),
            eq(conversationParticipants.isActive, true)
          )
        );
      
      const conversationIds = userParticipations.map(p => p.conversationId);
      
      if (conversationIds.length === 0) {
        return res.json([]);
      }
      
      // Get conversation details
      const userConversations = await db
        .select()
        .from(conversations)
        .where(sql`${conversations.id} = ANY(${conversationIds})`)
        .orderBy(desc(conversations.lastMessageAt));
      
      // For each conversation, get the listing details and last message
      const conversationsWithDetails = await Promise.all(
        userConversations.map(async (conversation) => {
          let listing = null;
          
          // Extract listingId from context if it's a listing inquiry
          if (conversation.type === 'listing_inquiry' && conversation.context) {
            try {
              const context = JSON.parse(conversation.context);
              if (context.listingId) {
                const [listingResult] = await db
                  .select()
                  .from(carListings)
                  .where(eq(carListings.id, parseInt(context.listingId)))
                  .limit(1);
                listing = listingResult;
              }
            } catch (e) {
              console.error('Error parsing conversation context:', e);
            }
          }
          
          // Get last message if exists
          let lastMessage = null;
          const lastMessages = await db
            .select()
            .from(messages)
            .where(eq(messages.conversationId, conversation.id))
            .orderBy(desc(messages.createdAt))
            .limit(1);
          
          if (lastMessages.length > 0) {
            lastMessage = lastMessages[0];
          }
          
          return {
            ...conversation,
            listingTitle: listing?.title || 'Unknown Listing',
            listingMake: listing?.make || '',
            listingModel: listing?.model || '',
            listingPrice: listing?.price || 0,
            lastMessage: lastMessage?.content || '',
            lastMessageType: lastMessage?.messageType || '',
            lastMessageRead: lastMessage?.deliveryStatus === 'read'
          };
        })
      );
      
      res.json(conversationsWithDetails);
    } catch (error) {
      console.error("Error fetching user messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });
  
  // Get conversation messages
  app.get('/api/conversation/:conversationId/messages', async (req, res) => {
    try {
      const user = req.user as any;
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      
      const conversationId = parseInt(req.params.conversationId);
      
      // Verify user has access to this conversation
      const conversation = await db
        .select()
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            sql`${conversations.sellerId} = ${user.id} OR ${conversations.buyerId} = ${user.id}`
          )
        )
        .limit(1);
      
      if (!conversation.length) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      const conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.listingId, conversation[0].listingId))
        .orderBy(messages.sentAt);
      
      res.json(conversationMessages);
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      res.status(500).json({ error: "Failed to fetch conversation messages" });
    }
  });
  
  // Get comprehensive listing analytics for sellers
  app.get('/api/listing/:listingId/analytics', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const listingId = parseInt(req.params.listingId);
      
      // Verify user owns this listing
      const listing = await db
        .select()
        .from(carListings)
        .where(
          and(
            eq(carListings.id, listingId),
            eq(carListings.sellerId, user.id)
          )
        )
        .limit(1);
      
      if (!listing.length) {
        return res.status(404).json({ error: "Listing not found or access denied" });
      }
      
      // Get comprehensive analytics data
      const [
        dailyAnalytics,
        totalViews,
        qualityScore,
        marketBenchmark,
        topKeywords
      ] = await Promise.all([
        // Daily analytics for the last 30 days
        db.select()
          .from(dailyListingAnalytics)
          .where(eq(dailyListingAnalytics.listingId, listingId))
          .orderBy(sql`date DESC`)
          .limit(30),
        
        // Total performance metrics  
        db.execute(sql`
          SELECT 
            COALESCE(SUM(total_views), 0) as total_views,
            COALESCE(SUM(unique_visitors), 0) as total_unique_visitors,
            COALESCE(SUM(phone_clicks), 0) as total_phone_clicks,
            COALESCE(SUM(inquiries), 0) as total_inquiries,
            COALESCE(SUM(favorites), 0) as total_favorites,
            COALESCE(SUM(shares), 0) as total_shares,
            COALESCE(SUM(impressions), 0) as total_impressions,
            COALESCE(AVG(click_through_rate), 0) as avg_ctr
          FROM daily_listing_analytics 
          WHERE listing_id = ${listingId}
        `),
        
        // Quality score from database
        db.select()
          .from(listingQualityScores)
          .where(eq(listingQualityScores.listingId, listingId))
          .limit(1),
        
        // Market benchmark data (based on similar vehicles)
        db.execute(sql`
          SELECT 
            AVG(price) as average_market_price,
            COUNT(*) as similar_listings,
            MIN(price) as min_price,
            MAX(price) as max_price
          FROM car_listings 
          WHERE make = ${listing[0].make} 
            AND model = ${listing[0].model}
            AND year = ${listing[0].year}
            AND status = 'active'
            AND id != ${listingId}
        `),
        
        // Top search keywords from database
        db.select()
          .from(searchKeywords)
          .where(eq(searchKeywords.listingId, listingId))
          .orderBy(sql`search_count DESC`)
          .limit(10)
      ]);
      
      // Calculate days on market
      const daysOnMarket = Math.floor((Date.now() - new Date(listing[0].createdAt).getTime()) / (1000 * 60 * 60 * 24));
      
      // Process the quality score data
      const qualityData = qualityScore.length > 0 ? qualityScore[0] : {
        overall_score: 75,
        photo_score: 70,
        description_score: 80,
        completeness_score: 85,
        competitiveness_score: 75,
        suggested_improvements: ['Add more photos', 'Improve description']
      };

      // Get top keywords for this listing from KeywordAnalytics
      const listingTopKeywords = await KeywordAnalytics.getListingKeywords(listingId, 10);

      // Prepare comprehensive analytics response
      const analyticsData = {
        listingInfo: {
          id: listing[0].id,
          title: listing[0].title,
          make: listing[0].make,
          model: listing[0].model,
          year: listing[0].year,
          price: listing[0].price,
          status: listing[0].status,
          daysOnMarket,
          createdAt: listing[0].createdAt
        },
        
        // 1. Listing Performance Metrics
        performanceMetrics: {
          totalViews: totalViews.rows[0]?.total_views || 0,
          uniqueVisitors: totalViews.rows[0]?.total_unique_visitors || 0,
          dailyTrend: dailyAnalytics.map(day => ({
            date: day.date,
            views: day.total_views || 0,
            uniqueVisitors: day.unique_visitors || 0
          })),
          impressions: totalViews.rows[0]?.total_impressions || 0,
          clickThroughRate: (totalViews.rows[0]?.avg_ctr || 0) * 100,
        },
        
        // 2. Buyer Engagement Metrics
        engagementMetrics: {
          inquiries: totalViews.rows[0]?.total_inquiries || 0,
          favorites: totalViews.rows[0]?.total_favorites || 0,
          phoneClicks: totalViews.rows[0]?.total_phone_clicks || 0,
          shares: totalViews.rows[0]?.total_shares || 0,
          impressions: totalViews.rows[0]?.total_impressions || 0,
          clickThroughRate: (totalViews.rows[0]?.avg_ctr || 0) * 100,
          averageTimeSpent: 180 // Default 3 minutes
        },
        
        // 3. Audience Demographics (based on daily analytics)
        audienceInsights: {
          locationBreakdown: {
            "Nairobi": dailyAnalytics.reduce((sum, day) => sum + (day.location_nairobi || 0), 0),
            "Mombasa": dailyAnalytics.reduce((sum, day) => sum + (day.location_mombasa || 0), 0),
            "Kisumu": dailyAnalytics.reduce((sum, day) => sum + (day.location_kisumu || 0), 0),
            "Other": dailyAnalytics.reduce((sum, day) => sum + (day.location_other || 0), 0)
          },
          deviceBreakdown: {
            mobile: dailyAnalytics.reduce((sum, day) => sum + (day.device_mobile || 0), 0),
            desktop: dailyAnalytics.reduce((sum, day) => sum + (day.device_desktop || 0), 0),
            tablet: dailyAnalytics.reduce((sum, day) => sum + (day.device_tablet || 0), 0)
          },
          activeHours: {
            "9-12": dailyAnalytics.reduce((sum, day) => sum + (day.peak_hour_morning || 0), 0),
            "12-15": dailyAnalytics.reduce((sum, day) => sum + (day.peak_hour_afternoon || 0), 0),
            "15-18": dailyAnalytics.reduce((sum, day) => sum + (day.peak_hour_evening || 0), 0)
          }
        },
        
        // 4. Market Benchmarking
        marketBenchmark: {
          averagePrice: marketBenchmark.rows[0]?.average_market_price || listing[0].price,
          pricePosition: listing[0].price > (marketBenchmark.rows[0]?.average_market_price || listing[0].price) ? 'above' : 'below',
          similarListings: marketBenchmark.rows[0]?.similar_listings || 0,
          averageDaysOnMarket: 15, // Mock data
          competitiveAnalysis: {
            priceRange: {
              min: marketBenchmark.rows[0]?.min_price || listing[0].price,
              max: marketBenchmark.rows[0]?.max_price || listing[0].price
            }
          }
        },
        
        // 5. Listing Quality Score
        qualityIndicators: qualityData || {
          overall_score: 85,
          photo_score: 90,
          description_score: 80,
          completeness_score: 85,
          competitiveness_score: 75,
          suggested_improvements: [
            "Add more high-quality photos showing different angles",
            "Include interior shots of the vehicle",
            "Provide more detailed maintenance history",
            "Consider competitive pricing analysis"
          ]
        },
        
        // 6. Top Search Keywords  
        topKeywords: listingTopKeywords.length > 0 ? listingTopKeywords : [
          { keyword: "Toyota Camry", search_count: 156, click_count: 23 },
          { keyword: "2020 sedan", search_count: 89, click_count: 15 },
          { keyword: "automatic transmission", search_count: 67, click_count: 12 },
          { keyword: "low mileage", search_count: 45, click_count: 8 },
          { keyword: "fuel efficient", search_count: 34, click_count: 6 }
        ],
        
        // 7. Time on Platform & Recommendations
        recommendations: [
          {
            type: daysOnMarket > 30 ? 'price_adjustment' : 'optimization',
            priority: daysOnMarket > 30 ? 'high' : 'medium',
            title: daysOnMarket > 30 ? 'Consider Price Adjustment' : 'Optimize Your Listing',
            description: daysOnMarket > 30 
              ? `Your listing has been active for ${daysOnMarket} days. Consider reviewing your price against market rates.`
              : 'Add more photos and enhance your description to improve visibility.'
          }
        ]
      };
      
      res.json(analyticsData);
    } catch (error) {
      console.error("Error fetching listing analytics:", error);
      res.status(500).json({ error: "Failed to fetch listing analytics" });
    }
  });

  // Get user transaction history with complete details
  app.get('/api/user/transactions', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      
      // Get all payment transactions for the user
      const transactions = await db
        .select()
        .from(paymentTransactions)
        .where(eq(paymentTransactions.userId, user.id))
        .orderBy(desc(paymentTransactions.createdAt));
      
      // Enrich transactions with product and listing details
      const enrichedTransactions = await Promise.all(
        transactions.map(async (transaction) => {
          let product = null;
          let listing = null;
          
          // Get product details if productId exists
          if (transaction.productId) {
            try {
              const productResult = await db
                .select()
                .from(products)
                .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
                .where(eq(products.id, transaction.productId))
                .limit(1);
              
              if (productResult.length > 0) {
                product = {
                  id: productResult[0].products.id,
                  name: productResult[0].products.name,
                  description: productResult[0].products.description,
                  basePrice: productResult[0].products.basePrice,
                  billingType: productResult[0].products.billingType,
                  category: productResult[0].product_categories?.name || 'Unknown',
                  targetUsers: productResult[0].products.targetUsers
                };
              }
            } catch (error) {
              console.error('Error fetching product details:', error);
            }
          }
          
          // Get listing details if entityType is 'listing' and entityId exists
          if (transaction.entityType === 'listing' && transaction.entityId) {
            try {
              const listingResult = await db
                .select()
                .from(carListings)
                .where(eq(carListings.id, parseInt(transaction.entityId)))
                .limit(1);
              
              if (listingResult.length > 0) {
                listing = {
                  id: listingResult[0].id,
                  title: listingResult[0].title,
                  make: listingResult[0].make,
                  model: listingResult[0].model,
                  year: listingResult[0].year,
                  price: listingResult[0].price,
                  location: listingResult[0].location,
                  status: listingResult[0].status
                };
              }
            } catch (error) {
              console.error('Error fetching listing details:', error);
            }
          }
          
          return {
            id: transaction.id,
            reference: transaction.reference,
            type: transaction.type,
            method: transaction.method,
            amount: transaction.amount,
            currency: transaction.currency,
            status: transaction.status,
            description: transaction.description,
            entityType: transaction.entityType,
            entityId: transaction.entityId,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            paidAt: transaction.paidAt,
            product: product,
            listing: listing
          };
        })
      );
      
      res.json(enrichedTransactions);
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      res.status(500).json({ error: "Failed to fetch user transactions" });
    }
  });

  // Seed sample analytics data for testing
  app.post('/api/listing/:listingId/seed-analytics', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const listingId = parseInt(req.params.listingId);
      
      // Verify user owns this listing
      const listing = await db
        .select()
        .from(carListings)
        .where(
          and(
            eq(carListings.id, listingId),
            eq(carListings.sellerId, user.id)
          )
        )
        .limit(1);
      
      if (!listing.length) {
        return res.status(404).json({ error: "Listing not found or access denied" });
      }
      
      // Generate sample analytics data for the last 30 days
      const dates = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      
      // Insert sample daily analytics
      for (const date of dates) {
        const views = Math.floor(Math.random() * 50) + 10;
        const uniqueVisitors = Math.floor(views * 0.8);
        const phoneClicks = Math.floor(Math.random() * 5);
        const messagesSent = Math.floor(Math.random() * 3);
        const favorites = Math.floor(Math.random() * 8);
        const shares = Math.floor(Math.random() * 2);
        const impressions = Math.floor(views * 1.5);
        
        await db.execute(sql`
          INSERT INTO daily_listing_analytics (
            listing_id, date, total_views, unique_visitors, phone_clicks, 
            inquiries, favorites, shares, impressions, click_through_rate,
            device_mobile, device_desktop, device_tablet,
            location_nairobi, location_mombasa, location_kisumu, location_other, 
            peak_hour_morning, peak_hour_afternoon, peak_hour_evening
          ) VALUES (
            ${listingId}, ${date}, ${views}, ${uniqueVisitors}, ${phoneClicks},
            ${messagesSent}, ${favorites}, ${shares}, ${impressions}, 
            ${(views / impressions).toFixed(4)},
            ${Math.floor(views * 0.6)}, ${Math.floor(views * 0.3)}, ${Math.floor(views * 0.1)},
            ${Math.floor(views * 0.4)}, ${Math.floor(views * 0.2)}, ${Math.floor(views * 0.15)}, ${Math.floor(views * 0.25)},
            ${Math.floor(views * 0.25)}, ${Math.floor(views * 0.35)}, ${Math.floor(views * 0.3)}
          )
          ON CONFLICT (listing_id, date) DO UPDATE SET
            total_views = EXCLUDED.total_views,
            unique_visitors = EXCLUDED.unique_visitors,
            phone_clicks = EXCLUDED.phone_clicks,
            inquiries = EXCLUDED.inquiries,
            favorites = EXCLUDED.favorites,
            shares = EXCLUDED.shares,
            impressions = EXCLUDED.impressions,
            click_through_rate = EXCLUDED.click_through_rate,
            device_mobile = EXCLUDED.device_mobile,
            device_desktop = EXCLUDED.device_desktop,
            device_tablet = EXCLUDED.device_tablet,
            location_nairobi = EXCLUDED.location_nairobi,
            location_mombasa = EXCLUDED.location_mombasa,
            location_kisumu = EXCLUDED.location_kisumu,
            location_other = EXCLUDED.location_other,
            peak_hour_morning = EXCLUDED.peak_hour_morning,
            peak_hour_afternoon = EXCLUDED.peak_hour_afternoon,
            peak_hour_evening = EXCLUDED.peak_hour_evening,
            updated_at = NOW()
        `);
      }
      
      res.json({ message: "Sample analytics data seeded successfully" });
    } catch (error) {
      console.error("Error seeding analytics data:", error);
      res.status(500).json({ error: "Failed to seed analytics data" });
    }
  });

  // Get seller audit trail for a specific listing
  app.get('/api/listing/:listingId/recent-activity', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { listingId } = req.params;
      const user = (req as any).user;
      
      console.log('[Seller Audit Trail] Start - ListingID:', listingId, 'UserID:', user?.id);
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Verify user owns this listing
      const listing = await db
        .select()
        .from(carListings)
        .where(
          and(
            eq(carListings.id, parseInt(listingId)),
            eq(carListings.sellerId, user.id)
          )
        )
        .limit(1);
      
      console.log('[Seller Audit Trail] Listing check result:', listing.length > 0 ? 'Found' : 'Not found');
      
      if (!listing.length) {
        return res.status(404).json({ error: "Listing not found or access denied" });
      }

      // Get seller audit trail activities for this listing
      const auditTrailResult = await db
        .select({
          activityType: userActivities.activityType,
          description: userActivities.description,
          timestamp: userActivities.createdAt,
          ipAddress: userActivities.ipAddress,
          metadata: userActivities.metadata
        })
        .from(userActivities)
        .where(
          and(
            eq(userActivities.userId, user.id),
            eq(userActivities.entityType, 'listing'),
            eq(userActivities.entityId, listingId.toString())
          )
        )
        .orderBy(desc(userActivities.createdAt))
        .limit(10);

      console.log('[Seller Audit Trail] Found activities:', auditTrailResult.length);

      // Transform audit trail data to match frontend expectations
      const activities = auditTrailResult.map((activity: any) => {
        let type = 'update'; // Default type
        let location = null;

        // Extract location from IP if available
        if (activity.ipAddress) {
          // Simple location detection based on common Kenyan IP patterns
          if (activity.ipAddress.startsWith('196.') || activity.ipAddress.startsWith('105.')) {
            location = 'Kenya';
          }
        }

        // Map activity types to display types
        switch (activity.activityType) {
          case 'listing_created':
            type = 'creation';
            break;
          case 'listing_updated':
            type = 'update';
            break;
          case 'price_changed':
            type = 'price_change';
            break;
          case 'status_changed':
            type = 'status_change';
            break;
          case 'photos_updated':
            type = 'photo_update';
            break;
          case 'description_updated':
            type = 'description_update';
            break;
          case 'featured_updated':
            type = 'feature_update';
            break;
          default:
            type = 'update';
        }

        return {
          type: type,
          description: activity.description,
          timestamp: activity.timestamp,
          location: location
        };
      });

      res.json(activities);
    } catch (error) {
      console.error('Error fetching seller audit trail:', error);
      res.status(500).json({ error: 'Failed to fetch seller audit trail' });
    }
  });

  // Get listing conversations/inquiries
  app.get('/api/listing/:listingId/conversations', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const listingId = parseInt(req.params.listingId);
      
      // Verify user owns this listing
      const listing = await db
        .select()
        .from(carListings)
        .where(
          and(
            eq(carListings.id, listingId),
            eq(carListings.sellerId, user.id)
          )
        )
        .limit(1);
      
      if (!listing.length) {
        return res.status(404).json({ error: "Listing not found or access denied" });
      }
      
      // Get conversations for this specific listing
      const listingConversations = await db.execute(sql`
        SELECT c.*,
               (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id) as message_count,
               (SELECT COUNT(*) FROM messages m 
                WHERE m.conversation_id = c.id 
                AND m.read_count = 0 AND m.sender_id != ${user.id}) as unread_count,
               (SELECT json_agg(
                 json_build_object(
                   'id', u.id,
                   'firstName', u.first_name,
                   'lastName', u.last_name,
                   'email', u.email,
                   'profileImageUrl', u.profile_image_url,
                   'role', cp2.role
                 )
               ) FROM conversation_participants cp2
               JOIN app_users u ON cp2.user_id = u.id
               WHERE cp2.conversation_id = c.id 
                 AND cp2.user_id != ${user.id} 
                 AND cp2.is_active = true
               ) as participants,
               (SELECT json_build_object(
                 'id', last_msg.id,
                 'content', last_msg.content,
                 'createdAt', last_msg.created_at,
                 'senderId', last_msg.sender_id,
                 'senderName', CONCAT(sender.first_name, ' ', sender.last_name)
               ) FROM messages last_msg
               JOIN app_users sender ON last_msg.sender_id = sender.id
               WHERE last_msg.conversation_id = c.id
               ORDER BY last_msg.created_at DESC
               LIMIT 1
               ) as last_message
        FROM conversations c
        JOIN conversation_participants cp ON c.id = cp.conversation_id
        WHERE cp.user_id = ${user.id} 
          AND cp.is_active = true
          AND c.type = 'listing_inquiry'
          AND c.context::jsonb @> ${JSON.stringify({ listingId: listingId.toString() })}
        ORDER BY c.last_activity_at DESC
      `);
      
      res.json(listingConversations.rows);
    } catch (error) {
      console.error("Error fetching listing conversations:", error);
      res.status(500).json({ error: "Failed to fetch listing conversations" });
    }
  });

  // Trigger quality assessment for a listing
  app.post('/api/listing/:listingId/assess-quality', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const listingId = parseInt(req.params.listingId);
      
      // Verify user owns this listing
      const listing = await db
        .select()
        .from(carListings)
        .where(
          and(
            eq(carListings.id, listingId),
            eq(carListings.sellerId, user.id)
          )
        )
        .limit(1);
      
      if (!listing.length) {
        return res.status(404).json({ error: "Listing not found or access denied" });
      }
      
      // Run quality assessment
      const qualityResults = await ListingQualityAssessment.assessListingQuality(listingId);
      
      res.json({
        success: true,
        message: "Quality assessment completed",
        assessment: qualityResults
      });
    } catch (error) {
      console.error("Error assessing listing quality:", error);
      res.status(500).json({ error: "Failed to assess listing quality" });
    }
  });

  // Get quality assessment for a listing
  app.get('/api/listing/:listingId/quality-score', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const listingId = parseInt(req.params.listingId);
      
      // Verify user owns this listing
      const listing = await db
        .select()
        .from(carListings)
        .where(
          and(
            eq(carListings.id, listingId),
            eq(carListings.sellerId, user.id)
          )
        )
        .limit(1);
      
      if (!listing.length) {
        return res.status(404).json({ error: "Listing not found or access denied" });
      }
      
      // Get existing quality assessment
      const qualityAssessment = await ListingQualityAssessment.getQualityAssessment(listingId);
      
      if (!qualityAssessment) {
        // No assessment exists, run one
        const newAssessment = await ListingQualityAssessment.assessListingQuality(listingId);
        return res.json(newAssessment);
      }
      
      res.json(qualityAssessment);
    } catch (error) {
      console.error("Error getting quality score:", error);
      res.status(500).json({ error: "Failed to get quality score" });
    }
  });

  // Get conversation counts for all user's listings - optimized version
  app.get('/api/user/listings/conversation-counts', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      
      // Get all user's listings with limit for better performance
      const userListings = await db
        .select({ id: carListings.id })
        .from(carListings)
        .where(eq(carListings.sellerId, user.id))
        .limit(100); // Limit to recent 100 listings
      
      if (!userListings.length) {
        res.set('Cache-Control', 'public, max-age=300'); // Cache empty result for 5 minutes
        return res.json({});
      }
      
      // For now, return mock data structure with zero counts 
      // This will be populated when we implement comprehensive analytics
      const result: Record<number, { total: number; unread: number }> = {};
      
      userListings.forEach(listing => {
        result[listing.id] = { total: 0, unread: 0 };
      });
      
      // Set cache headers
      res.set('Cache-Control', 'public, max-age=120'); // Cache for 2 minutes
      res.json(result);
    } catch (error) {
      console.error("Error fetching listing conversation counts:", error);
      res.status(500).json({ error: "Failed to fetch conversation counts" });
    }
  });
  
  // Get user's listing analytics overview
  app.get('/api/user/listings-analytics', async (req, res) => {
    try {
      const user = req.user as any;
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      
      const userListings = await db
        .select({ id: carListings.id })
        .from(carListings)
        .where(eq(carListings.sellerId, user.id));
      
      const listingIds = userListings.map(l => l.id);
      
      if (listingIds.length === 0) {
        return res.json([]);
      }
      
      const analytics = await db
        .select({
          listingId: dailyListingAnalytics.listingId,
          date: dailyListingAnalytics.date,
          views: dailyListingAnalytics.totalViews,
          phoneClicks: dailyListingAnalytics.phoneClicks,
          inquiries: dailyListingAnalytics.inquiries,
          favorites: dailyListingAnalytics.favorites,
          shares: dailyListingAnalytics.shares,
          // Join with listing info
          listingTitle: carListings.title,
          listingMake: carListings.make,
          listingModel: carListings.model
        })
        .from(dailyListingAnalytics)
        .innerJoin(carListings, eq(dailyListingAnalytics.listingId, carListings.id))
        .where(sql`${dailyListingAnalytics.listingId} IN (${sql.join(listingIds.map(id => sql`${id}`), sql`, `)})`)
        .orderBy(carListings.title, dailyListingAnalytics.date);
      
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching user listings analytics:", error);
      res.status(500).json({ error: "Failed to fetch user listings analytics" });
    }
  });

  // ========================================
  // COMPREHENSIVE MESSAGING SYSTEM ENDPOINTS
  // ========================================

  // Create a new conversation
  app.post('/api/messaging/conversations', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const { type, title, context, participantIds } = req.body;

      if (!title || !participantIds?.length) {
        return res.status(400).json({ error: "Title and participants are required" });
      }

      // Check if blocked users
      for (const participantId of participantIds) {
        if (participantId !== user.id) {
          const isBlocked = await storage.isUserBlocked(user.id, participantId);
          if (isBlocked) {
            return res.status(403).json({ error: "Cannot message blocked user" });
          }
        }
      }

      // Prepare participants data
      const participants = [
        { userId: user.id, role: 'creator' },
        ...participantIds.filter((id: string) => id !== user.id).map((id: string) => ({ userId: id, role: 'participant' }))
      ];

      const conversation = await storage.createConversation({
        type: type || 'listing_inquiry',
        title,
        context,
        participants
      });

      res.json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Get user's conversations
  app.get('/api/messaging/conversations', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const limit = parseInt(req.query.limit as string) || 20;

      const conversations = await storage.getUserConversations(user.id, limit);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get a specific conversation
  app.get('/api/messaging/conversations/:id', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const conversationId = parseInt(req.params.id);

      const conversation = await storage.getConversation(conversationId);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      // Check if user is a participant
      const isParticipant = conversation.participants?.some((p: any) => p.userId === user.id && p.isActive);
      if (!isParticipant) {
        return res.status(403).json({ error: "Access denied" });
      }

      res.json(conversation);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  // Send a message
  app.post('/api/messaging/conversations/:id/messages', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const conversationId = parseInt(req.params.id);
      const { content, messageType, metadata, replyToMessageId } = req.body;

      if (!content?.trim()) {
        return res.status(400).json({ error: "Message content is required" });
      }

      // Verify conversation access
      const conversation = await storage.getConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const isParticipant = conversation.participants?.some((p: any) => p.userId === user.id && p.isActive);
      if (!isParticipant) {
        return res.status(403).json({ error: "Access denied" });
      }

      const message = await storage.sendMessage({
        conversationId,
        senderId: user.id,
        content: content.trim(),
        messageType: messageType || 'text',
        metadata,
        replyToMessageId
      });

      res.json(message);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Get conversation messages
  app.get('/api/messaging/conversations/:id/messages', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const conversationId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      // Verify conversation access
      const conversation = await storage.getConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const isParticipant = conversation.participants?.some((p: any) => p.userId === user.id && p.isActive);
      if (!isParticipant) {
        return res.status(403).json({ error: "Access denied" });
      }

      const messages = await storage.getMessages(conversationId, limit, offset);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Mark conversation as read
  app.post('/api/messaging/conversations/:id/read', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const conversationId = parseInt(req.params.id);

      await storage.markConversationAsRead(conversationId, user.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking conversation as read:", error);
      res.status(500).json({ error: "Failed to mark conversation as read" });
    }
  });

  // Edit a message
  app.put('/api/messaging/messages/:id', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const messageId = parseInt(req.params.id);
      const { content } = req.body;

      if (!content?.trim()) {
        return res.status(400).json({ error: "Message content is required" });
      }

      // Verify message ownership
      const message = await storage.getMessage(messageId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      if (message.sender_id !== user.id) {
        return res.status(403).json({ error: "Can only edit your own messages" });
      }

      await storage.editMessage(messageId, content.trim());
      res.json({ success: true });
    } catch (error) {
      console.error("Error editing message:", error);
      res.status(500).json({ error: "Failed to edit message" });
    }
  });

  // Delete a message
  app.delete('/api/messaging/messages/:id', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const messageId = parseInt(req.params.id);

      // Verify message ownership
      const message = await storage.getMessage(messageId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      if (message.sender_id !== user.id) {
        return res.status(403).json({ error: "Can only delete your own messages" });
      }

      await storage.deleteMessage(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // Get message templates
  app.get('/api/messaging/templates', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const category = req.query.category as string;

      const templates = await storage.getMessageTemplates(user.id, category);
      res.json(templates);
    } catch (error) {
      console.error("Error fetching message templates:", error);
      res.status(500).json({ error: "Failed to fetch message templates" });
    }
  });

  // Create message template
  app.post('/api/messaging/templates', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const { title, content, category, isAdminOnly, tags } = req.body;

      if (!title || !content || !category) {
        return res.status(400).json({ error: "Title, content, and category are required" });
      }

      const template = await storage.createMessageTemplate({
        title,
        content,
        category,
        isAdminOnly: isAdminOnly || false,
        tags: tags || [],
        createdBy: user.id
      });

      res.json(template);
    } catch (error) {
      console.error("Error creating message template:", error);
      res.status(500).json({ error: "Failed to create message template" });
    }
  });

  // Block a user
  app.post('/api/messaging/block', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const { userId, reason, blockType } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      if (userId === user.id) {
        return res.status(400).json({ error: "Cannot block yourself" });
      }

      await storage.blockUser(user.id, userId, reason, blockType);
      res.json({ success: true });
    } catch (error) {
      console.error("Error blocking user:", error);
      res.status(500).json({ error: "Failed to block user" });
    }
  });

  // Unblock a user
  app.post('/api/messaging/unblock', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      await storage.unblockUser(user.id, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error unblocking user:", error);
      res.status(500).json({ error: "Failed to unblock user" });
    }
  });

  // Get blocked users
  app.get('/api/messaging/blocked', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const blockedUsers = await storage.getBlockedUsers(user.id);
      res.json(blockedUsers);
    } catch (error) {
      console.error("Error fetching blocked users:", error);
      res.status(500).json({ error: "Failed to fetch blocked users" });
    }
  });

  // Get messaging stats
  app.get('/api/messaging/stats', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const stats = await storage.getMessagingStats(user.id);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching messaging stats:", error);
      res.status(500).json({ error: "Failed to fetch messaging stats" });
    }
  });

  // Get notification settings
  app.get('/api/messaging/notification-settings', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const settings = await storage.getNotificationSettings(user.id);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching notification settings:", error);
      res.status(500).json({ error: "Failed to fetch notification settings" });
    }
  });

  // Update notification settings
  app.put('/api/messaging/notification-settings', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const { conversationType, settings } = req.body;

      if (!conversationType) {
        return res.status(400).json({ error: "Conversation type is required" });
      }

      await storage.updateNotificationSettings(user.id, conversationType, settings);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating notification settings:", error);
      res.status(500).json({ error: "Failed to update notification settings" });
    }
  });

  // Archive conversation
  app.post('/api/messaging/conversations/:id/archive', authenticateUser, async (req, res) => {
    try {
      const user = req.user as any;
      const conversationId = parseInt(req.params.id);

      // Verify conversation access
      const conversation = await storage.getConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const isParticipant = conversation.participants?.some((p: any) => p.userId === user.id && p.isActive);
      if (!isParticipant) {
        return res.status(403).json({ error: "Access denied" });
      }

      await storage.archiveConversation(conversationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error archiving conversation:", error);
      res.status(500).json({ error: "Failed to archive conversation" });
    }
  });

  // Admin messaging endpoints
  app.get('/api/admin/messaging/conversations', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const conversations = await db.execute(sql`
        SELECT c.*, 
               json_build_object(
                 'totalMessages', (SELECT COUNT(*) FROM messages WHERE conversation_id = c.id),
                 'participants', (
                   SELECT array_agg(
                     json_build_object(
                       'userId', cp.user_id,
                       'role', cp.role,
                       'firstName', u.first_name,
                       'lastName', u.last_name,
                       'email', u.email
                     )
                   )
                   FROM conversation_participants cp
                   JOIN app_users u ON cp.user_id = u.id
                   WHERE cp.conversation_id = c.id AND cp.is_active = true
                 )
               ) as details
        FROM conversations c
        ORDER BY c.last_activity_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `);

      res.json(conversations.rows);
    } catch (error) {
      console.error("Error fetching admin conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get('/api/admin/messaging/analytics', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req, res) => {
    try {
      const analytics = await db.execute(sql`
        SELECT 
          DATE_TRUNC('day', created_at) as date,
          COUNT(DISTINCT c.id) as conversations_created,
          COUNT(m.id) as messages_sent,
          AVG(
            EXTRACT(EPOCH FROM (
              SELECT MIN(m2.created_at) 
              FROM messages m2 
              WHERE m2.conversation_id = c.id 
                AND m2.created_at > c.created_at
            )) / 3600
          ) as avg_first_response_hours
        FROM conversations c
        LEFT JOIN messages m ON c.id = m.conversation_id
        WHERE c.created_at >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY DATE_TRUNC('day', c.created_at)
        ORDER BY date DESC
      `);

      res.json(analytics.rows);
    } catch (error) {
      console.error("Error fetching messaging analytics:", error);
      res.status(500).json({ error: "Failed to fetch messaging analytics" });
    }
  });

  // Keyword analytics endpoints removed - module deleted

  // ==============================
  // FINANCIAL SERVICES ROUTES
  // ==============================

  // Get bank partners
  app.get('/api/financial/banks', async (req: Request, res: Response) => {
    try {
      const banks = await db.select().from(bankPartners).where(eq(bankPartners.isActive, true));
      res.json(banks);
    } catch (error) {
      console.error('Error fetching banks:', error);
      res.status(500).json({ error: 'Failed to fetch banks' });
    }
  });

  // Get single loan product details (must come before the bankId route)
  app.get('/api/financial/loan-products/single/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const products = await db.select({
        id: loanProducts.id,
        bankName: bankPartners.bankName,
        bankCode: bankPartners.bankCode,
        productName: loanProducts.productName,
        productType: loanProducts.productType,
        minInterestRate: loanProducts.minInterestRate,
        maxInterestRate: loanProducts.maxInterestRate,
        minLoanAmount: loanProducts.minLoanAmount,
        maxLoanAmount: loanProducts.maxLoanAmount,
        minTenureMonths: loanProducts.minTenureMonths,
        maxTenureMonths: loanProducts.maxTenureMonths,
        processingFeeRate: loanProducts.processingFeeRate,
        minDownPaymentPercentage: loanProducts.minDownPaymentPercentage,
        maxFinancingPercentage: loanProducts.maxFinancingPercentage,
        eligibilityCriteria: loanProducts.eligibilityCriteria,
        features: loanProducts.features,
        contactInfo: bankPartners.contactEmail,
        contactPhone: bankPartners.contactPhone
      })
      .from(loanProducts)
      .innerJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
      .where(and(
        eq(loanProducts.id, parseInt(id)),
        eq(loanProducts.isActive, true),
        eq(bankPartners.isActive, true)
      ));
      
      if (products.length === 0) {
        return res.status(404).json({ error: 'Loan product not found' });
      }
      
      res.json(products[0]);
      
    } catch (error) {
      console.error('Error fetching loan product:', error);
      res.status(500).json({ error: 'Failed to fetch loan product details' });
    }
  });

  // Get loan products by bank
  app.get('/api/financial/loan-products/:bankId?', async (req: Request, res: Response) => {
    try {
      const bankId = req.params.bankId ? parseInt(req.params.bankId) : null;
      
      let query = db.select({
        id: loanProducts.id,
        bankId: loanProducts.bankId,
        productName: loanProducts.productName,
        productType: loanProducts.productType,
        minLoanAmount: loanProducts.minLoanAmount,
        maxLoanAmount: loanProducts.maxLoanAmount,
        minInterestRate: loanProducts.minInterestRate,
        maxInterestRate: loanProducts.maxInterestRate,
        minTenureMonths: loanProducts.minTenureMonths,
        maxTenureMonths: loanProducts.maxTenureMonths,
        maxFinancingPercentage: loanProducts.maxFinancingPercentage,
        minDownPaymentPercentage: loanProducts.minDownPaymentPercentage,
        processingFeeRate: loanProducts.processingFeeRate,
        processingFeeFixed: loanProducts.processingFeeFixed,
        insuranceRequired: loanProducts.insuranceRequired,
        guarantorRequired: loanProducts.guarantorRequired,
        minMonthlyIncome: loanProducts.minMonthlyIncome,
        maxAge: loanProducts.maxAge,
        eligibilityCriteria: loanProducts.eligibilityCriteria,
        requiredDocuments: loanProducts.requiredDocuments,
        features: loanProducts.features,
        bankName: bankPartners.bankName,
      }).from(loanProducts)
        .leftJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
        .where(eq(loanProducts.isActive, true));

      if (bankId) {
        query = query.where(eq(loanProducts.bankId, bankId));
      }

      const products = await query;
      res.json(products);
    } catch (error) {
      console.error('Error fetching loan products:', error);
      res.status(500).json({ error: 'Failed to fetch loan products' });
    }
  });

  // Submit loan application
  app.post('/api/financial/loan-application', async (req: Request, res: Response) => {
    try {
      // Transform dateOfBirth to Date object before validation
      const requestData = {
        ...req.body,
        dateOfBirth: new Date(req.body.dateOfBirth)
      };
      
      const data = loanApplicationSchema.parse(requestData);
      const loanProductId = req.body.loanProductId;

      if (!loanProductId) {
        return res.status(400).json({ error: 'Loan product ID is required' });
      }

      // Generate application number
      const applicationNumber = `LA${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

      const applicationData = {
        ...data,
        loanProductId,
        applicationNumber,
        status: 'pending' as const,
        submittedAt: new Date(),
      };

      const [application] = await db.insert(loanApplications).values(applicationData).returning();

      // In a real implementation, trigger approval workflow here
      
      res.json({ 
        message: 'Application submitted successfully',
        applicationNumber: application.applicationNumber,
        applicationId: application.id 
      });
    } catch (error) {
      console.error('Error submitting loan application:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid application data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to submit application' });
    }
  });

  // Calculate loan payment
  app.post('/api/financial/calculate-loan', UsageLimiter.valuation, async (req: Request, res: Response) => {
    try {
      const { vehiclePrice, downPayment, interestRate, tenureMonths } = req.body;

      if (!vehiclePrice || downPayment < 0 || !interestRate || !tenureMonths) {
        return res.status(400).json({ error: 'Missing required calculation parameters' });
      }

      const loanAmount = vehiclePrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      
      // Calculate monthly payment using loan formula
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                            (Math.pow(1 + monthlyRate, tenureMonths) - 1);

      const totalPayable = monthlyPayment * tenureMonths;
      const totalInterest = totalPayable - loanAmount;

      // Additional costs (estimates)
      const processingFee = loanAmount * 0.02; // 2% processing fee
      const insuranceCost = vehiclePrice * 0.035; // 3.5% annual comprehensive insurance
      const registrationFees = vehiclePrice <= 1000000 ? 2210 : vehiclePrice <= 2000000 ? 4420 : 6630;
      const transferFees = vehiclePrice <= 1000000 ? 2210 : vehiclePrice <= 2000000 ? 4420 : 6630;

      const totalInitialCost = downPayment + processingFee + insuranceCost + registrationFees + transferFees;

      // Store calculation for reference
      const calculationData = {
        vehiclePrice,
        downPayment,
        loanAmount,
        interestRate,
        tenureMonths,
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: Math.round(totalInterest),
        totalPayable: Math.round(totalPayable),
        processingFee: Math.round(processingFee),
        insuranceCost: Math.round(insuranceCost),
        registrationFees,
        transferFees,
        totalInitialCost: Math.round(totalInitialCost),
      };

      await db.insert(loanCalculations).values(calculationData);

      res.json({
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: Math.round(totalInterest),
        totalPayable: Math.round(totalPayable),
        processingFee: Math.round(processingFee),
        insuranceCost: Math.round(insuranceCost),
        registrationFees,
        transferFees,
        totalInitialCost: Math.round(totalInitialCost),
      });
    } catch (error) {
      console.error('Error calculating loan:', error);
      res.status(500).json({ error: 'Failed to calculate loan payment' });
    }
  });

  // Submit trade-in evaluation
  app.post('/api/financial/trade-in-evaluation', async (req: Request, res: Response) => {
    try {
      const data = tradeInEvaluationSchema.parse(req.body);

      // Generate evaluation number
      const evaluationNumber = `TIE${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

      // Calculate base value (simplified algorithm)
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - data.year;
      
      // Base value estimation (would be more sophisticated in real implementation)
      let baseValue = 1000000; // Default base value
      
      // Adjust based on make/model (simplified)
      const premiumMakes = ['bmw', 'mercedes', 'audi', 'lexus', 'land rover'];
      const popularMakes = ['toyota', 'nissan', 'honda', 'mazda', 'subaru'];
      
      if (premiumMakes.includes(data.make.toLowerCase())) {
        baseValue = 2500000;
      } else if (popularMakes.includes(data.make.toLowerCase())) {
        baseValue = 1500000;
      }

      // Adjust for engine size
      if (data.engineSize && data.engineSize > 2500) {
        baseValue *= 1.3;
      } else if (data.engineSize && data.engineSize > 2000) {
        baseValue *= 1.2;
      }

      // Calculate depreciation
      const depreciationRate = Math.min(0.15 * vehicleAge, 0.8); // Max 80% depreciation
      const depreciationDeduction = baseValue * depreciationRate;

      // Condition adjustments
      const conditionMultipliers = {
        excellent: 0.1,
        good: 0,
        fair: -0.15,
        poor: -0.3,
      };
      const conditionAdjustment = baseValue * (conditionMultipliers[data.condition] || 0);

      // Mileage adjustments (assuming average 15,000 km/year)
      const expectedMileage = vehicleAge * 15000;
      const mileageDiff = data.mileage - expectedMileage;
      const mileageAdjustment = mileageDiff > 0 ? -Math.abs(mileageDiff) * 2 : Math.abs(mileageDiff) * 1; // Penalize high mileage more

      // Market demand factor (simplified)
      const marketAdjustment = popularMakes.includes(data.make.toLowerCase()) ? baseValue * 0.05 : 0;

      // Calculate final values
      const marketValue = Math.max(50000, baseValue - depreciationDeduction + conditionAdjustment + mileageAdjustment + marketAdjustment);
      const tradeInValue = marketValue * 0.75; // Trade-in typically 75% of market value
      const privatePartyValue = marketValue * 0.95; // Private party 95% of market value  
      const dealerRetailValue = marketValue * 1.25; // Dealer retail 125% of market value

      const evaluationData = {
        ...data,
        evaluationNumber,
        marketValue: Math.round(marketValue),
        tradeInValue: Math.round(tradeInValue),
        privatePartyValue: Math.round(privatePartyValue),
        dealerRetailValue: Math.round(dealerRetailValue),
        depreciationFactor: depreciationRate,
        conditionAdjustment: Math.round(conditionAdjustment),
        mileageAdjustment: Math.round(mileageAdjustment),
        marketDemandFactor: Math.round(marketAdjustment),
        status: 'completed' as const,
        evaluatedAt: new Date(),
      };

      const [evaluation] = await db.insert(tradeInEvaluations).values(evaluationData).returning();

      res.json({
        evaluationNumber: evaluation.evaluationNumber,
        marketValue: evaluation.marketValue,
        tradeInValue: evaluation.tradeInValue,
        privatePartyValue: evaluation.privatePartyValue,
        dealerRetailValue: evaluation.dealerRetailValue,
        depreciationFactor: evaluation.depreciationFactor,
        conditionAdjustment: evaluation.conditionAdjustment,
        mileageAdjustment: evaluation.mileageAdjustment,
        marketDemandFactor: evaluation.marketDemandFactor,
        factorsBreakdown: {
          baseValue: Math.round(baseValue),
          depreciationDeduction: Math.round(depreciationDeduction),
          conditionAdjustment: evaluation.conditionAdjustment,
          mileageAdjustment: evaluation.mileageAdjustment,
          marketAdjustment: evaluation.marketDemandFactor,
        }
      });
    } catch (error) {
      console.error('Error processing trade-in evaluation:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid evaluation data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to process evaluation' });
    }
  });

  // ==============================
  // ADMIN FINANCIAL SERVICES MANAGEMENT ROUTES
  // ==============================

  // Get all banks for admin management
  app.get('/api/admin/financial/banks', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const banks = await db.select().from(bankPartners).orderBy(bankPartners.bankName);
      res.json(banks);
    } catch (error) {
      console.error('Error fetching banks for admin:', error);
      res.status(500).json({ error: 'Failed to fetch banks' });
    }
  });

  // Create new bank
  app.post('/api/admin/financial/banks', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const bankData = req.body;
      const [newBank] = await db.insert(bankPartners).values(bankData).returning();
      res.json(newBank);
    } catch (error) {
      console.error('Error creating bank:', error);
      res.status(500).json({ error: 'Failed to create bank' });
    }
  });

  // Update bank
  app.put('/api/admin/financial/banks/:id', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const bankData = req.body;
      const [updatedBank] = await db.update(bankPartners)
        .set({ ...bankData, updatedAt: new Date() })
        .where(eq(bankPartners.id, parseInt(id)))
        .returning();
      res.json(updatedBank);
    } catch (error) {
      console.error('Error updating bank:', error);
      res.status(500).json({ error: 'Failed to update bank' });
    }
  });

  // Delete bank
  app.delete('/api/admin/financial/banks/:id', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await db.delete(bankPartners).where(eq(bankPartners.id, parseInt(id)));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting bank:', error);
      res.status(500).json({ error: 'Failed to delete bank' });
    }
  });

  // Get all loan products for admin management
  app.get('/api/admin/financial/loan-products', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const dbProducts = await db.select({
        id: loanProducts.id,
        bankId: loanProducts.bankId,
        productName: loanProducts.productName,
        productType: loanProducts.productType,
        minLoanAmount: loanProducts.minLoanAmount,
        maxLoanAmount: loanProducts.maxLoanAmount,
        minInterestRate: loanProducts.minInterestRate,
        maxInterestRate: loanProducts.maxInterestRate,
        minTenureMonths: loanProducts.minTenureMonths,
        maxTenureMonths: loanProducts.maxTenureMonths,
        maxFinancingPercentage: loanProducts.maxFinancingPercentage,
        minDownPaymentPercentage: loanProducts.minDownPaymentPercentage,
        processingFeeRate: loanProducts.processingFeeRate,
        processingFeeFixed: loanProducts.processingFeeFixed,
        insuranceRequired: loanProducts.insuranceRequired,
        guarantorRequired: loanProducts.guarantorRequired,
        minMonthlyIncome: loanProducts.minMonthlyIncome,
        maxAge: loanProducts.maxAge,
        eligibilityCriteria: loanProducts.eligibilityCriteria,
        requiredDocuments: loanProducts.requiredDocuments,
        features: loanProducts.features,
        isActive: loanProducts.isActive,
        createdAt: loanProducts.createdAt,
        updatedAt: loanProducts.updatedAt,
        bankName: bankPartners.bankName,
      }).from(loanProducts)
        .leftJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
        .orderBy(bankPartners.bankName, loanProducts.productName);
      
      // Map database fields to frontend expected field names
      const products = dbProducts.map(product => ({
        ...product,
        maxLtvRatio: product.maxFinancingPercentage, // Map to frontend field name
        processingFeePercentage: product.processingFeeRate, // Map to frontend field name
        eligibilityRequirements: product.eligibilityCriteria, // Map to frontend field name
      }));
      
      res.json(products);
    } catch (error) {
      console.error('Error fetching loan products for admin:', error);
      res.status(500).json({ error: 'Failed to fetch loan products' });
    }
  });

  // Create new loan product
  app.post('/api/admin/financial/loan-products', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const formData = req.body;
      
      // Map frontend form fields to database fields
      const productData = {
        bankId: formData.bankId,
        productName: formData.productName,
        productType: formData.productType,
        minLoanAmount: formData.minLoanAmount,
        maxLoanAmount: formData.maxLoanAmount,
        minInterestRate: formData.minInterestRate,
        maxInterestRate: formData.maxInterestRate,
        minTenureMonths: formData.minTenureMonths,
        maxTenureMonths: formData.maxTenureMonths,
        maxFinancingPercentage: formData.maxLtvRatio, // Frontend field name: maxLtvRatio
        minDownPaymentPercentage: formData.minDownPaymentPercentage,
        processingFeeRate: formData.processingFeePercentage, // Frontend field name: processingFeePercentage
        processingFeeFixed: formData.processingFeeFixed,
        insuranceRequired: formData.insuranceRequired,
        guarantorRequired: formData.guarantorRequired,
        minMonthlyIncome: formData.minMonthlyIncome,
        maxAge: formData.maxAge,
        eligibilityCriteria: formData.eligibilityRequirements, // Frontend field name: eligibilityRequirements
        requiredDocuments: formData.requiredDocuments,
        features: formData.features,
        isActive: formData.isActive,
      };
      
      const [newProduct] = await db.insert(loanProducts).values(productData).returning();
      res.json(newProduct);
    } catch (error) {
      console.error('Error creating loan product:', error);
      res.status(500).json({ error: 'Failed to create loan product' });
    }
  });

  // Update loan product
  app.put('/api/admin/financial/loan-products/:id', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const formData = req.body;
      
      // Map frontend form fields to database fields
      const productData = {
        bankId: formData.bankId,
        productName: formData.productName,
        productType: formData.productType,
        minLoanAmount: formData.minLoanAmount,
        maxLoanAmount: formData.maxLoanAmount,
        minInterestRate: formData.minInterestRate,
        maxInterestRate: formData.maxInterestRate,
        minTenureMonths: formData.minTenureMonths,
        maxTenureMonths: formData.maxTenureMonths,
        maxFinancingPercentage: formData.maxLtvRatio, // Frontend field name: maxLtvRatio
        minDownPaymentPercentage: formData.minDownPaymentPercentage,
        processingFeeRate: formData.processingFeePercentage, // Frontend field name: processingFeePercentage
        processingFeeFixed: formData.processingFeeFixed,
        insuranceRequired: formData.insuranceRequired,
        guarantorRequired: formData.guarantorRequired,
        minMonthlyIncome: formData.minMonthlyIncome,
        maxAge: formData.maxAge,
        eligibilityCriteria: formData.eligibilityRequirements, // Frontend field name: eligibilityRequirements
        requiredDocuments: formData.requiredDocuments,
        features: formData.features,
        isActive: formData.isActive,
        updatedAt: new Date(),
      };
      
      const [updatedProduct] = await db.update(loanProducts)
        .set(productData)
        .where(eq(loanProducts.id, parseInt(id)))
        .returning();
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating loan product:', error);
      res.status(500).json({ error: 'Failed to update loan product' });
    }
  });

  // Delete loan product
  app.delete('/api/admin/financial/loan-products/:id', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await db.delete(loanProducts).where(eq(loanProducts.id, parseInt(id)));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting loan product:', error);
      res.status(500).json({ error: 'Failed to delete loan product' });
    }
  });

  // Get all loan applications for admin management
  app.get('/api/admin/financial/loan-applications', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const applications = await db.select({
        id: loanApplications.id,
        applicationNumber: loanApplications.applicationNumber,
        applicantName: loanApplications.applicantName,
        applicantEmail: loanApplications.applicantEmail,
        applicantPhone: loanApplications.applicantPhone,
        nationalId: loanApplications.nationalId,
        monthlyIncome: loanApplications.monthlyIncome,
        requestedAmount: loanApplications.requestedAmount,
        downPaymentAmount: loanApplications.downPaymentAmount,
        preferredTenureMonths: loanApplications.preferredTenureMonths,
        vehicleMake: loanApplications.vehicleMake,
        vehicleModel: loanApplications.vehicleModel,
        vehicleYear: loanApplications.vehicleYear,
        vehiclePrice: loanApplications.vehiclePrice,
        status: loanApplications.status,
        preApprovalAmount: loanApplications.preApprovalAmount,
        approvedInterestRate: loanApplications.approvedInterestRate,
        approvedTenureMonths: loanApplications.approvedTenureMonths,
        remarks: loanApplications.remarks,
        submittedAt: loanApplications.submittedAt,
        reviewedAt: loanApplications.reviewedAt,
        reviewedBy: loanApplications.reviewedBy,
        productName: loanProducts.productName,
        bankName: bankPartners.bankName,
      }).from(loanApplications)
        .leftJoin(loanProducts, eq(loanApplications.loanProductId, loanProducts.id))
        .leftJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
        .orderBy(desc(loanApplications.submittedAt));
      res.json(applications);
    } catch (error) {
      console.error('Error fetching loan applications for admin:', error);
      res.status(500).json({ error: 'Failed to fetch loan applications' });
    }
  });

  // Update loan application status
  app.put('/api/admin/financial/loan-applications/:id/status', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, remarks, preApprovalAmount, approvedInterestRate, approvedTenureMonths } = req.body;
      
      const updateData: any = {
        status,
        remarks,
        reviewedAt: new Date(),
        reviewedBy: req.user?.id || 'admin',
      };

      if (preApprovalAmount) updateData.preApprovalAmount = preApprovalAmount;
      if (approvedInterestRate) updateData.approvedInterestRate = approvedInterestRate;
      if (approvedTenureMonths) updateData.approvedTenureMonths = approvedTenureMonths;

      const [updatedApplication] = await db.update(loanApplications)
        .set(updateData)
        .where(eq(loanApplications.id, parseInt(id)))
        .returning();
      res.json(updatedApplication);
    } catch (error) {
      console.error('Error updating loan application status:', error);
      res.status(500).json({ error: 'Failed to update loan application status' });
    }
  });

  // Get all trade-in evaluations for admin management
  app.get('/api/admin/financial/trade-in-evaluations', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const evaluations = await db.select().from(tradeInEvaluations)
        .orderBy(desc(tradeInEvaluations.createdAt));
      res.json(evaluations);
    } catch (error) {
      console.error('Error fetching trade-in evaluations for admin:', error);
      res.status(500).json({ error: 'Failed to fetch trade-in evaluations' });
    }
  });

  // Update trade-in evaluation status
  app.put('/api/admin/financial/trade-in-evaluations/:id/status', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, remarks } = req.body;
      
      const [updatedEvaluation] = await db.update(tradeInEvaluations)
        .set({
          status,
          evaluatedAt: new Date(),
          evaluatedBy: req.user?.id || 'admin',
        })
        .where(eq(tradeInEvaluations.id, parseInt(id)))
        .returning();
      res.json(updatedEvaluation);
    } catch (error) {
      console.error('Error updating trade-in evaluation status:', error);
      res.status(500).json({ error: 'Failed to update trade-in evaluation status' });
    }
  });

  // Submit loan application
  app.post('/api/financial/loan-application', authenticateUser, async (req: Request, res: Response) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Validate request body against schema
      const validatedData = loanApplicationSchema.parse(req.body);
      
      // Generate unique application number
      const applicationNumber = `LA${Date.now().toString().slice(-8)}${Math.random().toString(36).slice(-3).toUpperCase()}`;
      
      // Get loan product to validate compatibility
      const loanProduct = await db.select().from(loanProducts)
        .where(eq(loanProducts.id, req.body.loanProductId))
        .limit(1);
        
      if (loanProduct.length === 0) {
        return res.status(400).json({ error: 'Invalid loan product selected' });
      }
      
      const product = loanProduct[0];
      
      // Validate loan amount against product limits
      const minLoanAmount = parseFloat(product.minLoanAmount.toString());
      const maxLoanAmount = parseFloat(product.maxLoanAmount.toString());
      
      if (validatedData.requestedAmount < minLoanAmount || validatedData.requestedAmount > maxLoanAmount) {
        return res.status(400).json({ 
          error: `Loan amount must be between KES ${minLoanAmount.toLocaleString()} and KES ${maxLoanAmount.toLocaleString()}` 
        });
      }
      
      // Create loan application
      const [newApplication] = await db.insert(loanApplications).values({
        applicationNumber,
        userId: user.id,
        loanProductId: req.body.loanProductId,
        vehicleListingId: req.body.vehicleListingId || null,
        applicantName: validatedData.applicantName,
        applicantEmail: validatedData.applicantEmail,
        applicantPhone: validatedData.applicantPhone,
        nationalId: validatedData.nationalId,
        dateOfBirth: new Date(validatedData.dateOfBirth),
        maritalStatus: validatedData.maritalStatus,
        employmentStatus: validatedData.employmentStatus,
        employerName: validatedData.employerName || null,
        jobTitle: validatedData.jobTitle || null,
        monthlyIncome: validatedData.monthlyIncome.toString(),
        monthlyExpenses: (validatedData.monthlyExpenses || 0).toString(),
        requestedAmount: validatedData.requestedAmount.toString(),
        downPaymentAmount: validatedData.downPaymentAmount.toString(),
        preferredTenureMonths: validatedData.preferredTenureMonths,
        purposeOfLoan: validatedData.purposeOfLoan || 'Vehicle purchase',
        vehicleMake: req.body.vehicleMake || null,
        vehicleModel: req.body.vehicleModel || null,
        vehicleYear: req.body.vehicleYear || null,
        vehiclePrice: req.body.vehiclePrice || null,
        additionalNotes: validatedData.additionalNotes || null,
        status: 'pending',
        submittedAt: new Date(),
      }).returning();
      
      res.status(201).json({
        message: 'Loan application submitted successfully',
        applicationNumber: newApplication.applicationNumber,
        applicationId: newApplication.id,
        status: newApplication.status
      });
      
    } catch (error) {
      console.error('Error submitting loan application:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: error.errors 
        });
      }
      res.status(500).json({ error: 'Failed to submit loan application' });
    }
  });

  // Get loan applications for a specific listing (for sellers)
  app.get('/api/listing/:listingId/loan-applications', authenticateUser, async (req: Request, res: Response) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const listingId = parseInt(req.params.listingId);
      
      // First verify the user owns this listing
      const listing = await db.select()
        .from(carListings)
        .where(eq(carListings.id, listingId))
        .limit(1);
        
      if (listing.length === 0) {
        return res.status(404).json({ error: 'Listing not found' });
      }
      
      if (listing[0].sellerId !== user.id) {
        return res.status(403).json({ error: 'You can only view loan applications for your own listings' });
      }

      // Get loan applications for this listing
      const applications = await db.select({
        id: loanApplications.id,
        applicationNumber: loanApplications.applicationNumber,
        status: loanApplications.status,
        submittedAt: loanApplications.submittedAt,
        applicantName: loanApplications.applicantName,
        applicantPhone: loanApplications.applicantPhone,
        requestedAmount: loanApplications.requestedAmount,
        downPaymentAmount: loanApplications.downPaymentAmount,
        preferredTenureMonths: loanApplications.preferredTenureMonths,
        productName: loanProducts.productName,
        bankName: bankPartners.bankName,
        interestRate: loanProducts.minInterestRate,
      })
      .from(loanApplications)
      .leftJoin(loanProducts, eq(loanApplications.loanProductId, loanProducts.id))
      .leftJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
      .where(eq(loanApplications.vehicleListingId, listingId))
      .orderBy(desc(loanApplications.submittedAt));

      res.json(applications);
    } catch (error) {
      console.error('Error fetching listing loan applications:', error);
      res.status(500).json({ error: 'Failed to fetch loan applications' });
    }
  });

  // Get user's loan applications
  app.get('/api/loan-applications', authenticateUser, async (req: Request, res: Response) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const applications = await db.select({
        id: loanApplications.id,
        applicationNumber: loanApplications.applicationNumber,
        status: loanApplications.status,
        submittedAt: loanApplications.submittedAt,
        reviewedAt: loanApplications.reviewedAt,
        preApprovalAmount: loanApplications.preApprovalAmount,
        approvedInterestRate: loanApplications.approvedInterestRate,
        approvedTenureMonths: loanApplications.approvedTenureMonths,
        remarks: loanApplications.remarks,
        vehicleMake: loanApplications.vehicleMake,
        vehicleModel: loanApplications.vehicleModel,
        vehicleYear: loanApplications.vehicleYear,
        vehiclePrice: loanApplications.vehiclePrice,
        requestedAmount: loanApplications.requestedAmount,
        downPaymentAmount: loanApplications.downPaymentAmount,
        preferredTenureMonths: loanApplications.preferredTenureMonths,
        applicantName: loanApplications.applicantName,
        applicantEmail: loanApplications.applicantEmail,
        applicantPhone: loanApplications.applicantPhone,
        productName: loanProducts.productName,
        bankName: bankPartners.bankName,
      })
      .from(loanApplications)
      .leftJoin(loanProducts, eq(loanApplications.loanProductId, loanProducts.id))
      .leftJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
      .where(eq(loanApplications.userId, user.id))
      .orderBy(desc(loanApplications.submittedAt));

      res.json(applications);
      
    } catch (error) {
      console.error('Error fetching loan applications:', error);
      res.status(500).json({ error: 'Failed to fetch loan applications' });
    }
  });



  // Get financial products for a specific listing
  app.get('/api/listing/:id/financial-products', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Get listing details first
      const listing = await db.select().from(carListings)
        .where(eq(carListings.id, parseInt(id)))
        .limit(1);
      
      if (listing.length === 0) {
        return res.status(404).json({ error: 'Listing not found' });
      }
      
      const vehicle = listing[0];
      const vehiclePrice = parseFloat(vehicle.price.toString());
      
      // Get all active loan products
      const financialProducts = await db.select({
        id: loanProducts.id,
        bankName: bankPartners.bankName,
        bankCode: bankPartners.bankCode,
        productName: loanProducts.productName,
        productType: loanProducts.productType,
        minInterestRate: loanProducts.minInterestRate,
        maxInterestRate: loanProducts.maxInterestRate,
        minLoanAmount: loanProducts.minLoanAmount,
        maxLoanAmount: loanProducts.maxLoanAmount,
        minTenureMonths: loanProducts.minTenureMonths,
        maxTenureMonths: loanProducts.maxTenureMonths,
        processingFeeRate: loanProducts.processingFeeRate,
        minDownPaymentPercentage: loanProducts.minDownPaymentPercentage,
        maxFinancingPercentage: loanProducts.maxFinancingPercentage,
        eligibilityCriteria: loanProducts.eligibilityCriteria,
        features: loanProducts.features,
        contactInfo: bankPartners.contactEmail,
        contactPhone: bankPartners.contactPhone
      })
      .from(loanProducts)
      .innerJoin(bankPartners, eq(loanProducts.bankId, bankPartners.id))
      .where(and(
        eq(loanProducts.isActive, true),
        eq(bankPartners.isActive, true),
        or(
          eq(loanProducts.productType, 'new_vehicle'),
          eq(loanProducts.productType, 'used_vehicle'),
          eq(loanProducts.productType, 'auto_loan'),
          eq(loanProducts.productType, 'asset_finance'),
          eq(loanProducts.productType, 'vehicle_loan')
        ),
        gte(loanProducts.maxLoanAmount, vehiclePrice * 0.5) // Show products that can finance at least 50% of vehicle price
      ));
      
      // Calculate personalized loan options for each product
      const personalizedProducts = financialProducts.map(product => {
        const maxFinancingPercentage = parseFloat(product.maxFinancingPercentage.toString());
        const maxLoanAmount = parseFloat(product.maxLoanAmount.toString());
        const minInterestRate = parseFloat(product.minInterestRate.toString());
        const processingFeeRate = parseFloat(product.processingFeeRate?.toString() || '0.02');
        
        const loanAmount = Math.min(vehiclePrice * maxFinancingPercentage, maxLoanAmount);
        const downPayment = vehiclePrice - loanAmount;
        const processingFee = loanAmount * processingFeeRate;
        
        // Calculate monthly payment (approximate)
        const monthlyRate = (minInterestRate / 100) / 12;
        const months = product.maxTenureMonths;
        const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                              (Math.pow(1 + monthlyRate, months) - 1);
        
        return {
          ...product,
          vehiclePrice: vehiclePrice,
          recommendedLoanAmount: Math.round(loanAmount),
          recommendedDownPayment: Math.round(downPayment),
          estimatedProcessingFee: Math.round(processingFee),
          estimatedMonthlyPayment: Math.round(monthlyPayment),
          totalInterest: Math.round((monthlyPayment * months) - loanAmount),
          totalPayable: Math.round(monthlyPayment * months + downPayment + processingFee)
        };
      });
      
      // Get trade-in value estimate based on similar vehicles
      let tradeInEstimate = null;
      try {
        // Simple trade-in estimation based on depreciation
        const currentYear = new Date().getFullYear();
        const vehicleAge = currentYear - vehicle.year;
        const depreciationRate = Math.min(0.15 * vehicleAge, 0.65); // 15% per year, max 65%
        const baseTradeInValue = vehiclePrice * (1 - depreciationRate);
        
        tradeInEstimate = {
          estimatedValue: Math.round(baseTradeInValue),
          marketValue: vehiclePrice,
          depreciationRate: depreciationRate * 100,
          vehicleAge,
          notes: `Estimated based on ${depreciationRate * 100}% depreciation for ${vehicleAge}-year-old vehicle`
        };
      } catch (error) {
        console.error('Error calculating trade-in estimate:', error);
      }
      
      res.json({
        vehicleDetails: {
          id: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          price: vehicle.price,
          mileage: vehicle.mileage
        },
        loanProducts: personalizedProducts,
        tradeInEstimate,
        totalProducts: personalizedProducts.length
      });
      
    } catch (error) {
      console.error('Error fetching financial products for listing:', error);
      res.status(500).json({ error: 'Failed to fetch financial products' });
    }
  });

  // ===============================
  // VIDEO CALL APPOINTMENTS API
  // ===============================
  
  // Schedule video call appointment
  app.post('/api/listings/:listingId/video-call', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { listingId } = req.params;
      const { appointmentDate, duration, notes } = req.body;

      // Get listing details to find seller
      const listing = await db
        .select()
        .from(carListings)
        .where(eq(carListings.id, parseInt(listingId)))
        .limit(1);

      if (listing.length === 0) {
        return res.status(404).json({ error: 'Listing not found' });
      }

      // Create video call appointment
      const [appointment] = await db
        .insert(videoCallAppointments)
        .values({
          listingId: parseInt(listingId),
          buyerId: req.user.id,
          sellerId: listing[0].sellerId,
          appointmentDate: new Date(appointmentDate),
          duration: duration || 30,
          notes: notes || null,
          status: 'pending'
        })
        .returning();

      res.json({ 
        success: true, 
        appointment,
        message: 'Video call appointment requested successfully' 
      });
    } catch (error) {
      console.error('Video call scheduling error:', error);
      res.status(500).json({ error: 'Failed to schedule video call' });
    }
  });

  // Get video call appointments for a user (optimized)
  app.get('/api/video-calls', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Optimize by limiting results and using simpler query
      const appointments = await db
        .select({
          appointment: videoCallAppointments,
          listing: {
            id: carListings.id,
            title: carListings.title,
            make: carListings.make,
            model: carListings.model,
            year: carListings.year,
            price: carListings.price,
            images: carListings.images
          }
        })
        .from(videoCallAppointments)
        .leftJoin(carListings, eq(videoCallAppointments.listingId, carListings.id))
        .where(or(
          eq(videoCallAppointments.buyerId, req.user.id),
          eq(videoCallAppointments.sellerId, req.user.id)
        ))
        .orderBy(desc(videoCallAppointments.appointmentDate))
        .limit(50); // Limit to 50 most recent appointments

      // Set cache headers
      res.set('Cache-Control', 'public, max-age=60'); // Cache for 1 minute
      res.json(appointments);
    } catch (error) {
      console.error('Failed to fetch video call appointments:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });

  // Update/modify video call appointment (comprehensive)
  app.patch('/api/video-calls/:appointmentId', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { appointmentId } = req.params;
      
      // Validate input with our schema
      const validatedData = updateVideoCallAppointmentSchema.parse(req.body);

      // First, check if the user has permission to modify this appointment
      const existingAppointment = await db
        .select()
        .from(videoCallAppointments)
        .where(eq(videoCallAppointments.id, parseInt(appointmentId)))
        .limit(1);

      if (existingAppointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      const appointment = existingAppointment[0];
      const isBuyer = appointment.buyerId === req.user.id;
      const isSeller = appointment.sellerId === req.user.id;

      if (!isBuyer && !isSeller) {
        return res.status(403).json({ error: 'You do not have permission to modify this appointment' });
      }

      // Prepare update object
      const updateData: any = {
        updatedAt: new Date()
      };

      // Handle different types of modifications based on user role
      if (validatedData.appointmentDate) {
        updateData.appointmentDate = new Date(validatedData.appointmentDate);
        updateData.status = 'rescheduled'; // Auto-mark as rescheduled
      }

      if (validatedData.duration !== undefined) {
        updateData.duration = validatedData.duration;
      }

      if (validatedData.status !== undefined) {
        updateData.status = validatedData.status;
      }

      if (validatedData.meetingLink !== undefined) {
        updateData.meetingLink = validatedData.meetingLink || null;
      }

      // Notes handling based on user role
      if (isBuyer && validatedData.notes !== undefined) {
        updateData.notes = validatedData.notes;
      }

      if (isSeller && validatedData.sellerNotes !== undefined) {
        updateData.sellerNotes = validatedData.sellerNotes;
      }

      if (validatedData.cancellationReason !== undefined) {
        updateData.cancellationReason = validatedData.cancellationReason;
        if (validatedData.status === 'cancelled') {
          updateData.status = 'cancelled';
        }
      }

      if (validatedData.completionNotes !== undefined) {
        updateData.completionNotes = validatedData.completionNotes;
        if (validatedData.status === 'completed') {
          updateData.status = 'completed';
        }
      }

      const [updatedAppointment] = await db
        .update(videoCallAppointments)
        .set(updateData)
        .where(eq(videoCallAppointments.id, parseInt(appointmentId)))
        .returning();

      res.json({ 
        success: true, 
        appointment: updatedAppointment,
        message: 'Appointment updated successfully'
      });
    } catch (error) {
      console.error('Failed to update video call appointment:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid appointment data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  });

  // ===============================
  // TEST DRIVE APPOINTMENTS API
  // ===============================
  
  // Schedule test drive appointment
  app.post('/api/listings/:listingId/test-drive', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { listingId } = req.params;
      const { 
        appointmentDate, 
        duration, 
        meetingLocation, 
        buyerNotes,
        documentsRequired,
        additionalRequirements 
      } = req.body;

      // Get listing details to find seller
      const listing = await db
        .select()
        .from(carListings)
        .where(eq(carListings.id, parseInt(listingId)))
        .limit(1);

      if (listing.length === 0) {
        return res.status(404).json({ error: 'Listing not found' });
      }

      // Create test drive appointment
      const [appointment] = await db
        .insert(testDriveAppointments)
        .values({
          listingId: parseInt(listingId),
          buyerId: req.user.id,
          sellerId: listing[0].sellerId,
          appointmentDate: new Date(appointmentDate),
          duration: duration || 60,
          meetingLocation,
          buyerNotes: buyerNotes || null,
          documentsRequired: documentsRequired || ['Valid Driver\'s License'],
          additionalRequirements: additionalRequirements || null,
          status: 'pending'
        })
        .returning();

      res.json({ 
        success: true, 
        appointment,
        message: 'Test drive appointment requested successfully' 
      });
    } catch (error) {
      console.error('Test drive scheduling error:', error);
      res.status(500).json({ error: 'Failed to schedule test drive' });
    }
  });

  // Get test drive appointments for a user (optimized)
  app.get('/api/test-drives', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Optimize by limiting results and using simpler query
      const appointments = await db
        .select({
          appointment: testDriveAppointments,
          listing: {
            id: carListings.id,
            title: carListings.title,
            make: carListings.make,
            model: carListings.model,
            year: carListings.year,
            price: carListings.price,
            location: carListings.location,
            images: carListings.images
          }
        })
        .from(testDriveAppointments)
        .leftJoin(carListings, eq(testDriveAppointments.listingId, carListings.id))
        .where(or(
          eq(testDriveAppointments.buyerId, req.user.id),
          eq(testDriveAppointments.sellerId, req.user.id)
        ))
        .orderBy(desc(testDriveAppointments.appointmentDate))
        .limit(50); // Limit to 50 most recent appointments

      // Set cache headers
      res.set('Cache-Control', 'public, max-age=60'); // Cache for 1 minute  
      res.json(appointments);
    } catch (error) {
      console.error('Failed to fetch test drive appointments:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });

  // Update/modify test drive appointment (comprehensive)
  app.patch('/api/test-drives/:appointmentId', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { appointmentId } = req.params;
      
      // Validate input with our schema
      const validatedData = updateTestDriveAppointmentSchema.parse(req.body);

      // First, check if the user has permission to modify this appointment
      const existingAppointment = await db
        .select()
        .from(testDriveAppointments)
        .where(eq(testDriveAppointments.id, parseInt(appointmentId)))
        .limit(1);

      if (existingAppointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      const appointment = existingAppointment[0];
      const isBuyer = appointment.buyerId === req.user.id;
      const isSeller = appointment.sellerId === req.user.id;

      if (!isBuyer && !isSeller) {
        return res.status(403).json({ error: 'You do not have permission to modify this appointment' });
      }

      // Prepare update object
      const updateData: any = {
        updatedAt: new Date()
      };

      // Handle different types of modifications
      if (validatedData.appointmentDate) {
        updateData.appointmentDate = new Date(validatedData.appointmentDate);
        updateData.status = 'rescheduled'; // Auto-mark as rescheduled
      }

      if (validatedData.duration !== undefined) {
        updateData.duration = validatedData.duration;
      }

      if (validatedData.meetingLocation !== undefined) {
        updateData.meetingLocation = validatedData.meetingLocation;
      }

      if (validatedData.status !== undefined) {
        updateData.status = validatedData.status;
      }

      if (validatedData.documentsRequired !== undefined) {
        updateData.documentsRequired = validatedData.documentsRequired;
      }

      if (validatedData.additionalRequirements !== undefined) {
        updateData.additionalRequirements = validatedData.additionalRequirements;
      }

      // Notes handling based on user role
      if (isBuyer && validatedData.buyerNotes !== undefined) {
        updateData.buyerNotes = validatedData.buyerNotes;
      }

      if (isSeller && validatedData.sellerNotes !== undefined) {
        updateData.sellerNotes = validatedData.sellerNotes;
      }

      if (validatedData.completionNotes !== undefined) {
        updateData.completionNotes = validatedData.completionNotes;
        if (validatedData.status === 'completed') {
          updateData.status = 'completed';
        }
      }

      if (validatedData.rating !== undefined && isBuyer) {
        updateData.rating = validatedData.rating;
      }

      if (validatedData.cancellationReason !== undefined) {
        updateData.cancellationReason = validatedData.cancellationReason;
        if (validatedData.status === 'cancelled') {
          updateData.status = 'cancelled';
        }
      }

      const [updatedAppointment] = await db
        .update(testDriveAppointments)
        .set(updateData)
        .where(eq(testDriveAppointments.id, parseInt(appointmentId)))
        .returning();

      res.json({ 
        success: true, 
        appointment: updatedAppointment,
        message: 'Test drive appointment updated successfully'
      });
    } catch (error) {
      console.error('Failed to update test drive appointment:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid appointment data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  });

  // ===============================
  // QUICK ACTION ENDPOINTS
  // ===============================

  // Cancel video call appointment
  app.post('/api/video-calls/:appointmentId/cancel', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { appointmentId } = req.params;
      const { reason } = req.body;

      // Check permissions
      const existingAppointment = await db
        .select()
        .from(videoCallAppointments)
        .where(eq(videoCallAppointments.id, parseInt(appointmentId)))
        .limit(1);

      if (existingAppointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      const appointment = existingAppointment[0];
      const canCancel = appointment.buyerId === req.user.id || appointment.sellerId === req.user.id;

      if (!canCancel) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      const [cancelledAppointment] = await db
        .update(videoCallAppointments)
        .set({
          status: 'cancelled',
          cancellationReason: reason || 'Cancelled by user',
          updatedAt: new Date()
        })
        .where(eq(videoCallAppointments.id, parseInt(appointmentId)))
        .returning();

      res.json({ 
        success: true, 
        appointment: cancelledAppointment,
        message: 'Video call appointment cancelled successfully'
      });
    } catch (error) {
      console.error('Failed to cancel video call appointment:', error);
      res.status(500).json({ error: 'Failed to cancel appointment' });
    }
  });

  // Complete video call appointment
  app.post('/api/video-calls/:appointmentId/complete', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { appointmentId } = req.params;
      const { notes } = req.body;

      // Check permissions
      const existingAppointment = await db
        .select()
        .from(videoCallAppointments)
        .where(eq(videoCallAppointments.id, parseInt(appointmentId)))
        .limit(1);

      if (existingAppointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      const appointment = existingAppointment[0];
      const canComplete = appointment.buyerId === req.user.id || appointment.sellerId === req.user.id;

      if (!canComplete) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      const [completedAppointment] = await db
        .update(videoCallAppointments)
        .set({
          status: 'completed',
          completionNotes: notes || null,
          updatedAt: new Date()
        })
        .where(eq(videoCallAppointments.id, parseInt(appointmentId)))
        .returning();

      res.json({ 
        success: true, 
        appointment: completedAppointment,
        message: 'Video call appointment marked as completed'
      });
    } catch (error) {
      console.error('Failed to complete video call appointment:', error);
      res.status(500).json({ error: 'Failed to complete appointment' });
    }
  });

  // Cancel test drive appointment
  app.post('/api/test-drives/:appointmentId/cancel', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { appointmentId } = req.params;
      const { reason } = req.body;

      // Check permissions
      const existingAppointment = await db
        .select()
        .from(testDriveAppointments)
        .where(eq(testDriveAppointments.id, parseInt(appointmentId)))
        .limit(1);

      if (existingAppointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      const appointment = existingAppointment[0];
      const canCancel = appointment.buyerId === req.user.id || appointment.sellerId === req.user.id;

      if (!canCancel) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      const [cancelledAppointment] = await db
        .update(testDriveAppointments)
        .set({
          status: 'cancelled',
          cancellationReason: reason || 'Cancelled by user',
          updatedAt: new Date()
        })
        .where(eq(testDriveAppointments.id, parseInt(appointmentId)))
        .returning();

      res.json({ 
        success: true, 
        appointment: cancelledAppointment,
        message: 'Test drive appointment cancelled successfully'
      });
    } catch (error) {
      console.error('Failed to cancel test drive appointment:', error);
      res.status(500).json({ error: 'Failed to cancel appointment' });
    }
  });

  // Complete test drive appointment
  app.post('/api/test-drives/:appointmentId/complete', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { appointmentId } = req.params;
      const { notes, rating } = req.body;

      // Check permissions
      const existingAppointment = await db
        .select()
        .from(testDriveAppointments)
        .where(eq(testDriveAppointments.id, parseInt(appointmentId)))
        .limit(1);

      if (existingAppointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      const appointment = existingAppointment[0];
      const canComplete = appointment.buyerId === req.user.id || appointment.sellerId === req.user.id;

      if (!canComplete) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      const [completedAppointment] = await db
        .update(testDriveAppointments)
        .set({
          status: 'completed',
          completionNotes: notes || null,
          rating: rating || null,
          updatedAt: new Date()
        })
        .where(eq(testDriveAppointments.id, parseInt(appointmentId)))
        .returning();

      res.json({ 
        success: true, 
        appointment: completedAppointment,
        message: 'Test drive appointment marked as completed'
      });
    } catch (error) {
      console.error('Failed to complete test drive appointment:', error);
      res.status(500).json({ error: 'Failed to complete appointment' });
    }
  });

  // Get seller appointments for a specific listing
  app.get('/api/listing/:listingId/appointments', authenticateUser, async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { listingId } = req.params;
      const listingIdInt = parseInt(listingId);

      if (isNaN(listingIdInt)) {
        return res.status(400).json({ error: 'Invalid listing ID' });
      }

      // Verify user owns the listing
      const listing = await db
        .select()
        .from(carListings)
        .where(and(
          eq(carListings.id, listingIdInt),
          eq(carListings.sellerId, req.user.id)
        ))
        .limit(1);

      if (listing.length === 0) {
        return res.status(404).json({ error: 'Listing not found or access denied' });
      }

      // Get video call appointments for this listing
      const videoCallAppointmentsData = await db
        .select({
          appointment: videoCallAppointments,
          buyer: {
            id: appUsers.id,
            firstName: appUsers.firstName,
            lastName: appUsers.lastName,
            email: appUsers.email,
            phoneNumber: appUsers.phoneNumber
          }
        })
        .from(videoCallAppointments)
        .leftJoin(appUsers, eq(videoCallAppointments.buyerId, appUsers.id))
        .where(eq(videoCallAppointments.listingId, listingIdInt))
        .orderBy(desc(videoCallAppointments.appointmentDate));

      // Get test drive appointments for this listing
      const testDriveAppointmentsData = await db
        .select({
          appointment: testDriveAppointments,
          buyer: {
            id: appUsers.id,
            firstName: appUsers.firstName,
            lastName: appUsers.lastName,
            email: appUsers.email,
            phoneNumber: appUsers.phoneNumber
          }
        })
        .from(testDriveAppointments)
        .leftJoin(appUsers, eq(testDriveAppointments.buyerId, appUsers.id))
        .where(eq(testDriveAppointments.listingId, listingIdInt))
        .orderBy(desc(testDriveAppointments.appointmentDate));

      // Transform and combine appointments
      const videoCallsFormatted = videoCallAppointmentsData.map(item => ({
        id: item.appointment.id,
        type: 'video_call',
        listingId: item.appointment.listingId,
        buyerId: item.appointment.buyerId,
        buyerName: item.buyer ? `${item.buyer.firstName} ${item.buyer.lastName}` : 'Unknown',
        buyerEmail: item.buyer?.email || '',
        buyerPhone: item.buyer?.phoneNumber || '',
        appointmentDate: item.appointment.appointmentDate,
        duration: item.appointment.duration,
        status: item.appointment.status,
        notes: item.appointment.notes,
        sellerNotes: item.appointment.sellerNotes,
        meetingLink: item.appointment.meetingLink,
        createdAt: item.appointment.createdAt,
        updatedAt: item.appointment.updatedAt
      }));

      const testDrivesFormatted = testDriveAppointmentsData.map(item => ({
        id: item.appointment.id,
        type: 'test_drive',
        listingId: item.appointment.listingId,
        buyerId: item.appointment.buyerId,
        buyerName: item.buyer ? `${item.buyer.firstName} ${item.buyer.lastName}` : 'Unknown',
        buyerEmail: item.buyer?.email || '',
        buyerPhone: item.buyer?.phoneNumber || '',
        appointmentDate: item.appointment.appointmentDate,
        duration: item.appointment.duration,
        status: item.appointment.status,
        buyerNotes: item.appointment.buyerNotes,
        sellerNotes: item.appointment.sellerNotes,
        meetingLocation: item.appointment.meetingLocation,
        documentsRequired: item.appointment.documentsRequired,
        additionalRequirements: item.appointment.additionalRequirements,
        completionNotes: item.appointment.completionNotes,
        rating: item.appointment.rating,
        createdAt: item.appointment.createdAt,
        updatedAt: item.appointment.updatedAt
      }));

      // Combine and sort all appointments by date
      const allAppointments = [...videoCallsFormatted, ...testDrivesFormatted]
        .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());

      // Calculate statistics
      const totalAppointments = allAppointments.length;
      const completedAppointments = allAppointments.filter(app => app.status === 'completed').length;
      const pendingAppointments = allAppointments.filter(app => app.status === 'pending').length;
      const cancelledAppointments = allAppointments.filter(app => app.status === 'cancelled').length;
      const upcomingAppointments = allAppointments.filter(app => 
        new Date(app.appointmentDate) > new Date() && app.status !== 'cancelled'
      ).length;

      res.json({
        appointments: allAppointments,
        statistics: {
          total: totalAppointments,
          completed: completedAppointments,
          pending: pendingAppointments,
          cancelled: cancelledAppointments,
          upcoming: upcomingAppointments
        }
      });
    } catch (error) {
      console.error('Failed to fetch seller appointments:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });

  // ==============================
  // SELLER AVAILABILITY MANAGEMENT
  // ==============================

  // Get seller availability settings
  app.get('/api/seller/availability', authenticateUser, async (req: Request, res: Response) => {
    try {
      const availability = await db
        .select()
        .from(sellerAvailability)
        .where(eq(sellerAvailability.userId, req.user.id))
        .orderBy(sellerAvailability.dayOfWeek);

      const preferences = await db
        .select()
        .from(sellerAppointmentPreferences)
        .where(eq(sellerAppointmentPreferences.userId, req.user.id))
        .limit(1);

      res.json({
        availability,
        preferences: preferences[0] || null
      });
    } catch (error) {
      console.error('Failed to fetch seller availability:', error);
      res.status(500).json({ error: 'Failed to fetch availability' });
    }
  });

  // Update seller availability
  app.post('/api/seller/availability', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { availability, preferences } = req.body;

      // Clear existing availability
      await db.delete(sellerAvailability).where(eq(sellerAvailability.userId, req.user.id));

      // Insert new availability
      if (availability && availability.length > 0) {
        await db.insert(sellerAvailability).values(
          availability.map((slot: any) => ({
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isActive: slot.isActive,
            userId: req.user.id
          }))
        );
      }

      // Update or create preferences
      if (preferences) {
        const existingPreferences = await db
          .select()
          .from(sellerAppointmentPreferences)
          .where(eq(sellerAppointmentPreferences.userId, req.user.id))
          .limit(1);

        const allowedPreferences = {
          autoApprove: preferences.autoApprove,
          minimumAdvanceNoticeHours: preferences.minimumAdvanceNoticeHours,
          maxAppointmentsPerDay: preferences.maxAppointmentsPerDay,
          allowWeekends: preferences.allowWeekends,
          defaultTestDriveLocation: preferences.defaultTestDriveLocation,
          defaultMeetingDuration: preferences.defaultMeetingDuration,
          bufferTimeBetweenAppointments: preferences.bufferTimeBetweenAppointments
        };

        if (existingPreferences.length > 0) {
          await db
            .update(sellerAppointmentPreferences)
            .set(allowedPreferences)
            .where(eq(sellerAppointmentPreferences.userId, req.user.id));
        } else {
          await db.insert(sellerAppointmentPreferences).values({
            ...allowedPreferences,
            userId: req.user.id
          });
        }
      }

      res.json({ success: true, message: 'Availability updated successfully' });
    } catch (error) {
      console.error('Failed to update seller availability:', error);
      res.status(500).json({ error: 'Failed to update availability' });
    }
  });

  // Get seller blocked slots
  app.get('/api/seller/blocked-slots', authenticateUser, async (req: Request, res: Response) => {
    try {
      const blockedSlots = await db
        .select()
        .from(sellerBlockedSlots)
        .where(eq(sellerBlockedSlots.userId, req.user.id))
        .orderBy(sellerBlockedSlots.startDateTime);

      res.json(blockedSlots);
    } catch (error) {
      console.error('Failed to fetch blocked slots:', error);
      res.status(500).json({ error: 'Failed to fetch blocked slots' });
    }
  });

  // Add blocked slot
  app.post('/api/seller/blocked-slots', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { startDateTime, endDateTime, reason, isRecurring, recurrencePattern } = req.body;

      const [blockedSlot] = await db
        .insert(sellerBlockedSlots)
        .values({
          userId: req.user.id,
          startDateTime: new Date(startDateTime),
          endDateTime: new Date(endDateTime),
          reason,
          isRecurring: isRecurring || false,
          recurrencePattern: recurrencePattern || null
        })
        .returning();

      res.json({ success: true, blockedSlot });
    } catch (error) {
      console.error('Failed to add blocked slot:', error);
      res.status(500).json({ error: 'Failed to add blocked slot' });
    }
  });

  // Remove blocked slot
  app.delete('/api/seller/blocked-slots/:id', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await db
        .delete(sellerBlockedSlots)
        .where(and(
          eq(sellerBlockedSlots.id, parseInt(id)),
          eq(sellerBlockedSlots.userId, req.user.id)
        ));

      res.json({ success: true, message: 'Blocked slot removed successfully' });
    } catch (error) {
      console.error('Failed to remove blocked slot:', error);
      res.status(500).json({ error: 'Failed to remove blocked slot' });
    }
  });

  // Get buyer appointments (appointments the user has made as a buyer)
  app.get('/api/user/buyer-appointments', authenticateUser, async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Get test drive appointments where user is the buyer
      const testDriveAppointmentsData = await db
        .select({
          appointment: testDriveAppointments,
          listing: {
            id: carListings.id,
            title: carListings.title,
            price: carListings.price,
            location: carListings.location,
            make: carListings.make,
            model: carListings.model,
            year: carListings.year,
            mileage: carListings.mileage,
            images: carListings.images
          },
          seller: {
            id: appUsers.id,
            firstName: appUsers.firstName,
            lastName: appUsers.lastName,
            email: appUsers.email,
            phoneNumber: appUsers.phoneNumber
          }
        })
        .from(testDriveAppointments)
        .leftJoin(carListings, eq(testDriveAppointments.listingId, carListings.id))
        .leftJoin(appUsers, eq(testDriveAppointments.sellerId, appUsers.id))
        .where(eq(testDriveAppointments.buyerId, req.user.id))
        .orderBy(desc(testDriveAppointments.appointmentDate));

      // Get video call appointments where user is the buyer
      const videoCallAppointmentsData = await db
        .select({
          appointment: videoCallAppointments,
          listing: {
            id: carListings.id,
            title: carListings.title,
            price: carListings.price,
            location: carListings.location,
            make: carListings.make,
            model: carListings.model,
            year: carListings.year,
            mileage: carListings.mileage,
            images: carListings.images
          },
          seller: {
            id: appUsers.id,
            firstName: appUsers.firstName,
            lastName: appUsers.lastName,
            email: appUsers.email,
            phoneNumber: appUsers.phoneNumber
          }
        })
        .from(videoCallAppointments)
        .leftJoin(carListings, eq(videoCallAppointments.listingId, carListings.id))
        .leftJoin(appUsers, eq(videoCallAppointments.sellerId, appUsers.id))
        .where(eq(videoCallAppointments.buyerId, req.user.id))
        .orderBy(desc(videoCallAppointments.appointmentDate));

      // Transform and combine appointments
      const testDrivesFormatted = testDriveAppointmentsData.map(item => ({
        id: item.appointment.id,
        type: 'test_drive',
        listingId: item.appointment.listingId,
        sellerId: item.appointment.sellerId,
        sellerName: item.seller ? `${item.seller.firstName} ${item.seller.lastName}` : 'Unknown',
        sellerEmail: item.seller?.email || '',
        sellerPhone: item.seller?.phoneNumber || '',
        appointmentDate: item.appointment.appointmentDate,
        duration: item.appointment.duration,
        status: item.appointment.status,
        buyerNotes: item.appointment.buyerNotes,
        sellerNotes: item.appointment.sellerNotes,
        meetingLocation: item.appointment.meetingLocation,
        listing: item.listing,
        createdAt: item.appointment.createdAt,
        updatedAt: item.appointment.updatedAt
      }));

      const videoCallsFormatted = videoCallAppointmentsData.map(item => ({
        id: item.appointment.id,
        type: 'video_call',
        listingId: item.appointment.listingId,
        sellerId: item.appointment.sellerId,
        sellerName: item.seller ? `${item.seller.firstName} ${item.seller.lastName}` : 'Unknown',
        sellerEmail: item.seller?.email || '',
        sellerPhone: item.seller?.phoneNumber || '',
        appointmentDate: item.appointment.appointmentDate,
        duration: item.appointment.duration,
        status: item.appointment.status,
        notes: item.appointment.notes,
        sellerNotes: item.appointment.sellerNotes,
        meetingLink: item.appointment.meetingLink,
        listing: item.listing,
        createdAt: item.appointment.createdAt,
        updatedAt: item.appointment.updatedAt
      }));

      // Combine and sort all appointments by date
      const allAppointments = [...testDrivesFormatted, ...videoCallsFormatted]
        .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());

      // Calculate statistics
      const totalAppointments = allAppointments.length;
      const completedAppointments = allAppointments.filter(app => app.status === 'completed').length;
      const pendingAppointments = allAppointments.filter(app => app.status === 'pending').length;
      const cancelledAppointments = allAppointments.filter(app => app.status === 'cancelled').length;
      const upcomingAppointments = allAppointments.filter(app => 
        new Date(app.appointmentDate) > new Date() && app.status !== 'cancelled'
      ).length;

      res.json({
        appointments: allAppointments,
        statistics: {
          total: totalAppointments,
          completed: completedAppointments,
          pending: pendingAppointments,
          cancelled: cancelledAppointments,
          upcoming: upcomingAppointments
        }
      });
    } catch (error) {
      console.error('Failed to fetch buyer appointments:', error);
      res.status(500).json({ error: 'Failed to fetch buyer appointments' });
    }
  });

  // Get available time slots for a specific date
  app.get('/api/seller/available-slots/:date', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { date } = req.params;
      const requestedDate = new Date(date);
      const dayOfWeek = requestedDate.getDay();

      // Get seller's availability for this day
      const availability = await db
        .select()
        .from(sellerAvailability)
        .where(and(
          eq(sellerAvailability.userId, req.user.id),
          eq(sellerAvailability.dayOfWeek, dayOfWeek),
          eq(sellerAvailability.isActive, true)
        ));

      if (availability.length === 0) {
        return res.json({ availableSlots: [] });
      }

      // Get existing appointments for this date
      const startOfDay = new Date(requestedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(requestedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const existingAppointments = await db
        .select()
        .from(videoCallAppointments)
        .where(and(
          eq(videoCallAppointments.sellerId, req.user.id),
          gte(videoCallAppointments.appointmentDate, startOfDay),
          lte(videoCallAppointments.appointmentDate, endOfDay),
          ne(videoCallAppointments.status, 'cancelled')
        ))
        .union(
          db.select({
            id: testDriveAppointments.id,
            appointmentDate: testDriveAppointments.appointmentDate,
            duration: testDriveAppointments.duration,
            status: testDriveAppointments.status
          })
          .from(testDriveAppointments)
          .where(and(
            eq(testDriveAppointments.sellerId, req.user.id),
            gte(testDriveAppointments.appointmentDate, startOfDay),
            lte(testDriveAppointments.appointmentDate, endOfDay),
            ne(testDriveAppointments.status, 'cancelled')
          ))
        );

      // Get blocked slots for this date
      const blockedSlots = await db
        .select()
        .from(sellerBlockedSlots)
        .where(and(
          eq(sellerBlockedSlots.userId, req.user.id),
          gte(sellerBlockedSlots.startDateTime, startOfDay),
          lte(sellerBlockedSlots.endDateTime, endOfDay)
        ));

      // Generate available time slots
      const availableSlots = [];
      const slotDuration = 30; // 30-minute slots

      for (const slot of availability) {
        const [startHour, startMinute] = slot.startTime.split(':').map(Number);
        const [endHour, endMinute] = slot.endTime.split(':').map(Number);

        let currentTime = new Date(requestedDate);
        currentTime.setHours(startHour, startMinute, 0, 0);

        const endTime = new Date(requestedDate);
        endTime.setHours(endHour, endMinute, 0, 0);

        while (currentTime < endTime) {
          const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
          
          // Check if slot conflicts with existing appointments or blocked slots
          const isConflict = existingAppointments.some(apt => {
            const aptStart = new Date(apt.appointmentDate);
            const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000);
            return (currentTime < aptEnd && slotEnd > aptStart);
          }) || blockedSlots.some(blocked => {
            const blockedStart = new Date(blocked.startDateTime);
            const blockedEnd = new Date(blocked.endDateTime);
            return (currentTime < blockedEnd && slotEnd > blockedStart);
          });

          if (!isConflict) {
            availableSlots.push({
              startTime: currentTime.toISOString(),
              endTime: slotEnd.toISOString(),
              duration: slotDuration
            });
          }

          currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
        }
      }

      res.json({ availableSlots });
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      res.status(500).json({ error: 'Failed to fetch available slots' });
    }
  });

  // Create new appointment (for sellers)
  app.post('/api/seller/appointments', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { 
        listingId, 
        appointmentType, 
        appointmentDate, 
        duration, 
        buyerName, 
        buyerEmail, 
        buyerPhone, 
        meetingLocation, 
        notes 
      } = req.body;

      let appointment;

      if (appointmentType === 'video_call') {
        [appointment] = await db
          .insert(videoCallAppointments)
          .values({
            listingId: parseInt(listingId),
            buyerId: 'seller-created', // Temporary ID for seller-created appointments
            sellerId: req.user.id,
            appointmentDate: new Date(appointmentDate),
            duration: duration || 30,
            status: 'pending',
            notes: notes || null
          })
          .returning();
      } else {
        [appointment] = await db
          .insert(testDriveAppointments)
          .values({
            listingId: parseInt(listingId),
            buyerId: 'seller-created', // Temporary ID for seller-created appointments
            sellerId: req.user.id,
            appointmentDate: new Date(appointmentDate),
            duration: duration || 60,
            meetingLocation: meetingLocation || 'To be determined',
            status: 'pending',
            buyerNotes: notes || null,
            documentsRequired: ['Valid Driver\'s License']
          })
          .returning();
      }

      res.json({ 
        success: true, 
        appointment,
        message: 'Appointment created successfully' 
      });
    } catch (error) {
      console.error('Failed to create appointment:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  });

  // Image optimization endpoints
  app.get('/api/images/optimize/*', async (req: Request, res: Response) => {
    try {
      const imagePath = req.params[0];
      const { w: width, h: height, q: quality = 85, f: format = 'webp' } = req.query;

      if (!imagePath) {
        return res.status(400).json({ error: 'Image path required' });
      }

      // Build cache key
      const cacheKey = `image:${imagePath}:${width || 'auto'}x${height || 'auto'}:${quality}:${format}`;
      
      // Check cache first
      const cached = await CacheService.get<Buffer>(cacheKey);
      if (cached) {
        res.setHeader('Content-Type', `image/${format}`);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return res.send(Buffer.from(cached));
      }

      // Optimize image
      const optimized = await ImageOptimizer.optimizeImage(imagePath, {
        width: width ? parseInt(width as string) : undefined,
        height: height ? parseInt(height as string) : undefined,
        quality: parseInt(quality as string),
        format: format as 'webp' | 'jpeg'
      });

      // Read optimized file
      const optimizedPath = format === 'webp' ? optimized.webpPath : optimized.optimizedPath;
      const imageBuffer = await fs.readFile(optimizedPath);

      // Cache the result
      await CacheService.set(cacheKey, imageBuffer, { ttl: 86400 }); // Cache for 24 hours

      res.setHeader('Content-Type', `image/${format}`);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('X-Image-Optimized', 'true');
      res.setHeader('X-Original-Size', optimized.originalSize.toString());
      res.setHeader('X-Optimized-Size', (format === 'webp' ? optimized.webpSize : optimized.optimizedSize).toString());
      res.setHeader('X-Compression-Ratio', optimized.compressionRatio.toFixed(2));

      res.send(imageBuffer);
    } catch (error) {
      console.error('Image optimization error:', error);
      res.status(500).json({ error: 'Failed to optimize image' });
    }
  });

  // Serve original images with fallback
  app.get('/api/images/original/*', async (req: Request, res: Response) => {
    try {
      const imagePath = req.params[0];
      
      if (!imagePath) {
        return res.status(400).json({ error: 'Image path required' });
      }

      const imageBuffer = await fs.readFile(imagePath);
      const ext = path.extname(imagePath).toLowerCase();
      
      let contentType = 'image/jpeg';
      if (ext === '.png') contentType = 'image/png';
      else if (ext === '.webp') contentType = 'image/webp';
      else if (ext === '.gif') contentType = 'image/gif';

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.send(imageBuffer);
    } catch (error) {
      console.error('Image serving error:', error);
      res.status(404).json({ error: 'Image not found' });
    }
  });

  // ===============================
  // SMART PRICING INTELLIGENCE ENDPOINTS
  // ===============================

  // Get pricing recommendation for a specific listing
  app.get('/api/listings/:listingId/pricing-recommendation', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { listingId } = req.params;
      const { SmartPricingAI } = await import('./services/smart-pricing-ai');
      
      const recommendation = await SmartPricingAI.generatePricingRecommendation(parseInt(listingId));
      res.json(recommendation);
    } catch (error) {
      console.error('Error generating pricing recommendation:', error);
      res.status(500).json({ error: 'Failed to generate pricing recommendation' });
    }
  });

  // Get market alerts for user
  app.get('/api/pricing/alerts', authenticateUser, async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      
      const alerts = await db
        .select({
          id: priceAlerts.id,
          userId: priceAlerts.userId,
          listingId: priceAlerts.listingId,
          alertType: priceAlerts.alertType,
          alertMessage: priceAlerts.alertMessage,
          priority: priceAlerts.priority,
          currentPrice: priceAlerts.currentPrice,
          targetPrice: priceAlerts.targetPrice,
          priceDeviation: priceAlerts.priceDeviation,
          isActive: priceAlerts.isActive,
          createdAt: priceAlerts.createdAt
        })
        .from(priceAlerts)
        .where(and(
          eq(priceAlerts.userId, userId),
          eq(priceAlerts.isActive, true)
        ))
        .orderBy(desc(priceAlerts.createdAt));
      
      res.json(alerts);
    } catch (error) {
      console.error('Error fetching price alerts:', error);
      res.status(500).json({ error: 'Failed to fetch price alerts' });
    }
  });

  // Generate market alerts for user's listings
  app.post('/api/pricing/generate-alerts', authenticateUser, async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const { SmartPricingAI } = await import('./services/smart-pricing-ai');
      
      await SmartPricingAI.generateMarketAlerts(userId);
      res.json({ message: 'Market alerts generated successfully' });
    } catch (error) {
      console.error('Error generating market alerts:', error);
      res.status(500).json({ error: 'Failed to generate market alerts' });
    }
  });

  // Get seasonal pricing trends
  app.get('/api/pricing/seasonal-trends', async (req: Request, res: Response) => {
    try {
      const { SmartPricingAI } = await import('./services/smart-pricing-ai');
      
      const trends = await SmartPricingAI.getSeasonalRecommendations();
      res.json(trends);
    } catch (error) {
      console.error('Error fetching seasonal trends:', error);
      res.status(500).json({ error: 'Failed to fetch seasonal trends' });
    }
  });

  // Get depreciation forecast for a vehicle
  app.get('/api/pricing/depreciation-forecast', async (req: Request, res: Response) => {
    try {
      const { make, model, year, engineCapacity } = req.query;
      
      const forecasts = await db
        .select()
        .from(depreciationForecasts)
        .where(and(
          eq(depreciationForecasts.make, make as string),
          eq(depreciationForecasts.model, model as string),
          eq(depreciationForecasts.year, parseInt(year as string))
        ))
        .limit(1);

      if (forecasts.length === 0) {
        return res.status(404).json({ error: 'No depreciation forecast available for this vehicle' });
      }

      res.json(forecasts[0]);
    } catch (error) {
      console.error('Error fetching depreciation forecast:', error);
      res.status(500).json({ error: 'Failed to fetch depreciation forecast' });
    }
  });

  // Get market insights
  app.get('/api/pricing/market-insights', async (req: Request, res: Response) => {
    try {
      const { category, limit = '10' } = req.query;
      
      let baseQuery = db
        .select({
          id: marketInsights.id,
          insightType: marketInsights.insightType,
          title: marketInsights.title,
          summary: marketInsights.summary,
          detailedAnalysis: marketInsights.detailedAnalysis,
          actionableRecommendations: marketInsights.actionableRecommendations,
          priority: marketInsights.priority,
          confidenceLevel: marketInsights.confidenceLevel,
          category: marketInsights.category,
          createdAt: marketInsights.createdAt
        })
        .from(marketInsights)
        .where(eq(marketInsights.isPublic, true))
        .orderBy(desc(marketInsights.createdAt))
        .limit(parseInt(limit as string));

      if (category) {
        baseQuery = baseQuery.where(eq(marketInsights.category, category as string));
      }

      const insights = await baseQuery;
      res.json(insights);
    } catch (error) {
      console.error('Error fetching market insights:', error);
      res.status(500).json({ error: 'Failed to fetch market insights' });
    }
  });

  // Generate market insights (Admin only)
  app.post('/api/pricing/generate-insights', authenticateUser, requireRole(['admin', 'superadmin', 'super_admin']), async (req: Request, res: Response) => {
    try {
      const { SmartPricingAI } = await import('./services/smart-pricing-ai');
      
      await SmartPricingAI.generateMarketInsights();
      res.json({ message: 'Market insights generated successfully' });
    } catch (error) {
      console.error('Error generating market insights:', error);
      res.status(500).json({ error: 'Failed to generate market insights' });
    }
  });

  // Get price analysis for similar vehicles
  app.get('/api/pricing/market-analysis', async (req: Request, res: Response) => {
    try {
      const { make, model, year, engineCapacity } = req.query;
      
      const analysis = await db
        .select()
        .from(marketPriceAnalysis)
        .where(and(
          eq(marketPriceAnalysis.make, make as string),
          eq(marketPriceAnalysis.model, model as string),
          eq(marketPriceAnalysis.year, parseInt(year as string))
        ))
        .limit(1);

      if (analysis.length === 0) {
        return res.status(404).json({ error: 'No market analysis available for this vehicle' });
      }

      res.json(analysis[0]);
    } catch (error) {
      console.error('Error fetching market analysis:', error);
      res.status(500).json({ error: 'Failed to fetch market analysis' });
    }
  });

  // Acknowledge pricing recommendation
  app.post('/api/listings/:listingId/acknowledge-pricing', authenticateUser, async (req: Request, res: Response) => {
    try {
      const { listingId } = req.params;
      const userId = req.user.id;
      
      await db
        .update(pricingRecommendations)
        .set({
          acknowledgedBy: userId,
          acknowledgedAt: new Date().toISOString()
        })
        .where(and(
          eq(pricingRecommendations.listingId, parseInt(listingId)),
          eq(pricingRecommendations.isActive, true)
        ));

      res.json({ message: 'Pricing recommendation acknowledged' });
    } catch (error) {
      console.error('Error acknowledging pricing recommendation:', error);
      res.status(500).json({ error: 'Failed to acknowledge pricing recommendation' });
    }
  });

  // Cache management endpoints
  app.get('/api/cache/stats', async (req: Request, res: Response) => {
    try {
      const stats = CacheService.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Cache stats error:', error);
      res.status(500).json({ error: 'Failed to get cache stats' });
    }
  });

  app.post('/api/cache/clear', async (req: Request, res: Response) => {
    try {
      const { pattern } = req.body;
      
      if (pattern) {
        await CacheService.invalidatePattern(pattern);
        res.json({ message: `Cache cleared for pattern: ${pattern}` });
      } else {
        // Clear common cache patterns
        const patterns = [
          'car-listings*',
          'vehicle-references*',
          'car-filters*',
          'search*',
          'image*'
        ];
        
        for (const pat of patterns) {
          await CacheService.invalidatePattern(pat);
        }
        
        res.json({ message: 'Common caches cleared' });
      }
    } catch (error) {
      console.error('Cache clear error:', error);
      res.status(500).json({ error: 'Failed to clear cache' });
    }
  });

  // ===============================
  // SMART PRICING INTELLIGENCE API
  // ===============================

  // Get listing pricing recommendation
  app.get('/api/listings/:listingId/pricing-recommendation', authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const pricingData = await SmartPricingAI.generatePricingRecommendation(listingId);
      res.json(pricingData);
    } catch (error: any) {
      console.error('Error getting pricing recommendation:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Price Alerts API
  app.get('/api/listings/:listingId/price-alerts', authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const userId = req.user!.id;
      
      const alerts = await storage.getPriceAlerts(listingId, userId);
      res.json(alerts);
    } catch (error: any) {
      console.error('Error getting price alerts:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/listings/:listingId/price-alerts', authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const userId = req.user!.id;
      const { alertType, threshold, isActive } = req.body;
      
      const alert = await storage.createPriceAlert({
        listingId,
        userId,
        alertType,
        threshold,
        isActive,
        message: `Alert for ${alertType.replace('_', ' ')} at ${threshold} KES`
      });
      
      res.json(alert);
    } catch (error: any) {
      console.error('Error creating price alert:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Smart Recommendations API
  app.get('/api/listings/:listingId/smart-recommendations', authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const recommendations = await storage.getSmartRecommendations(listingId);
      res.json(recommendations);
    } catch (error: any) {
      console.error('Error getting smart recommendations:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Generate AI-powered recommendations for listing
  app.post('/api/listings/:listingId/generate-recommendations', authenticateUser, async (req, res) => {
    try {
      const listingId = parseInt(req.params.listingId);
      const listing = await storage.getCarListingById(listingId);
      
      if (!listing) {
        return res.status(404).json({ error: 'Listing not found' });
      }

      // Generate smart recommendations based on listing performance
      const recommendations = await SmartPricingAI.generateSmartRecommendations(listing);
      
      // Store recommendations in database
      for (const rec of recommendations) {
        await storage.createSmartRecommendation({
          listingId,
          type: rec.type,
          title: rec.title,
          description: rec.description,
          priority: rec.priority,
          estimatedImpact: rec.estimatedImpact,
          actionRequired: rec.actionRequired
        });
      }
      
      res.json(recommendations);
    } catch (error: any) {
      console.error('Error generating recommendations:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // ==============================
  // ADDITIONAL MONETIZATION ROUTES  
  // ==============================

  // Get usage limits for specific features
  app.get("/api/monetization/usage-limits/:featureType", authenticateUser, async (req: Request, res: Response) => {
    try {
      const { featureType } = req.params;
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Demo usage limits data for demonstration
      const demoLimits = {
        duty_calculation: { allowed: true, currentUsage: 47, limit: 500 },
        valuation: { allowed: true, currentUsage: 23, limit: 200 },
        import_estimate: { allowed: true, currentUsage: 8, limit: 100 },
        api_call: { allowed: true, currentUsage: 1247, limit: 10000 },
        listing: { allowed: true, currentUsage: 12, limit: null }
      };

      const limitData = demoLimits[featureType as keyof typeof demoLimits];
      
      if (!limitData) {
        return res.status(404).json({ error: "Feature type not found" });
      }

      res.json(limitData);
    } catch (error) {
      console.error("Error checking usage limits:", error);
      res.status(500).json({ error: "Failed to check usage limits" });
    }
  });

  // Product catalog and feature enforcement routes
  console.log('Registering product catalog routes...');
  console.log('productCatalogRoutes type:', typeof productCatalogRoutes);
  console.log('productCatalogRoutes keys:', Object.keys(productCatalogRoutes));
  app.use('/api/products', productCatalogRoutes);
  app.use('/api/features', featureEnforcementRoutes);
  console.log('Product catalog routes registered successfully');

  // Payment and billing routes
  console.log('Registering payment routes...');
  app.use('/api/payments', paymentRoutes);

  // Use billing routes
  const billingRoutes = await import('./routes/billing-routes');
  app.use('/api/billing', billingRoutes.default);

  // Use subscription-product routes (deprecated - replaced by unified billing)
  const subscriptionProductRoutes = await import('./routes/subscription-product-routes');
  app.use('/api/subscription-products', subscriptionProductRoutes.default);

  // Use unified billing routes (consolidates monetization, billing, and subscription-product functionality)
  const unifiedBillingRoutes = await import('./routes/unified-billing-routes');
  app.use('/api/unified-billing', unifiedBillingRoutes.default);
  console.log('Payment routes registered successfully');

  // ========================================
  // VEHICLE REFERENCE ENDPOINTS
  // ========================================

  // Get all vehicle makes
  app.get("/api/vehicle-makes", async (req, res) => {
    try {
      const makes = await db
        .selectDistinct({ make: vehicleReferences.make })
        .from(vehicleReferences)
        .orderBy(asc(vehicleReferences.make));
      
      // Convert to title case for frontend consistency
      const formattedMakes = makes.map(m => {
        const make = m.make;
        return make.toLowerCase().split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      });
      
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(formattedMakes);
    } catch (error) {
      console.error("Failed to fetch vehicle makes:", error);
      res.status(500).json({ error: "Failed to fetch vehicle makes" });
    }
  });

  // Get models by make
  app.get("/api/vehicle-makes/:make/models", async (req, res) => {
    try {
      const make = req.params.make;
      console.log("Fetching models for make:", make);
      
      const models = await db
        .selectDistinct({ model: vehicleReferences.model })
        .from(vehicleReferences)
        .where(sql`UPPER(${vehicleReferences.make}) = UPPER(${make})`)
        .orderBy(asc(vehicleReferences.model));
      
      console.log("Found models:", models.length);
      
      // Convert models to title case for consistency
      const formattedModels = models.map(m => {
        const model = m.model;
        // Handle special cases and preserve certain formatting
        return model.split(' ').map(word => {
          // Preserve certain technical terms in uppercase
          if (['GUN', 'URJ', 'FE', 'GD', 'SPEC', 'STD', 'MID', 'HIGH', 'AUTO', 'MANUAL'].includes(word)) {
            return word;
          }
          // Handle acronyms like BMW, SUV etc
          if (word.length <= 3 && word.toUpperCase() === word) {
            return word;
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
      });
      
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(formattedModels);
    } catch (error) {
      console.error("Failed to fetch vehicle models:", error);
      res.status(500).json({ error: "Failed to fetch vehicle models" });
    }
  });

  // Get vehicle details by make and model
  app.get("/api/vehicle-references/:make/:model", async (req, res) => {
    try {
      const { make, model } = req.params;
      const vehicleDetails = await db
        .select()
        .from(vehicleReferences)
        .where(and(
          eq(vehicleReferences.make, make),
          eq(vehicleReferences.model, model)
        ))
        .orderBy(desc(vehicleReferences.year));
      
      res.set('Cache-Control', 'public, max-age=1800'); // Cache for 30 minutes
      res.json(vehicleDetails);
    } catch (error) {
      console.error("Failed to fetch vehicle details:", error);
      res.status(500).json({ error: "Failed to fetch vehicle details" });
    }
  });

  // ========================================
  // LOCATION REFERENCE ENDPOINTS
  // ========================================

  // Get all Kenyan counties
  app.get("/api/kenyan-counties", async (req, res) => {
    try {
      const counties = await db
        .selectDistinct({ county: kenyanLocations.county })
        .from(kenyanLocations)
        .orderBy(asc(kenyanLocations.county));
      
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(counties.map(c => c.county));
    } catch (error) {
      console.error("Failed to fetch Kenyan counties:", error);
      res.status(500).json({ error: "Failed to fetch Kenyan counties" });
    }
  });

  // Get areas by county
  app.get("/api/kenyan-counties/:county/areas", async (req, res) => {
    try {
      const county = req.params.county;
      const areas = await db
        .selectDistinct({ area: kenyanLocations.area })
        .from(kenyanLocations)
        .where(eq(kenyanLocations.county, county))
        .orderBy(asc(kenyanLocations.area));
      
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(areas.map(a => a.area));
    } catch (error) {
      console.error("Failed to fetch areas:", error);
      res.status(500).json({ error: "Failed to fetch areas" });
    }
  });

  // Get counties by country
  app.get("/api/countries/:countryId/counties", async (req, res) => {
    try {
      const countryId = parseInt(req.params.countryId);
      const countiesData = await db
        .select()
        .from(counties)
        .where(eq(counties.countryId, countryId))
        .orderBy(asc(counties.name));
      
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(countiesData);
    } catch (error) {
      console.error("Failed to fetch counties:", error);
      res.status(500).json({ error: "Failed to fetch counties" });
    }
  });

  // Get constituencies by county
  app.get("/api/counties/:countyId/constituencies", async (req, res) => {
    try {
      const countyId = parseInt(req.params.countyId);
      const constituenciesData = await db
        .select()
        .from(constituencies)
        .where(eq(constituencies.countyId, countyId))
        .orderBy(asc(constituencies.name));
      
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(constituenciesData);
    } catch (error) {
      console.error("Failed to fetch constituencies:", error);
      res.status(500).json({ error: "Failed to fetch constituencies" });
    }
  });

  // Get wards by constituency
  app.get("/api/constituencies/:constituencyId/wards", async (req, res) => {
    try {
      const constituencyId = parseInt(req.params.constituencyId);
      const wardsData = await db
        .select()
        .from(wards)
        .where(eq(wards.constituencyId, constituencyId))
        .orderBy(asc(wards.name));
      
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(wardsData);
    } catch (error) {
      console.error("Failed to fetch wards:", error);
      res.status(500).json({ error: "Failed to fetch wards" });
    }
  });

  // Register Excel parser routes
  const { registerExcelParserRoutes } = await import("./routes/excel-parser");
  registerExcelParserRoutes(app, authenticateUser, requireRole);

  // Register mileage verification routes
  registerMileageVerificationRoutes(app);

  // Register concierge service routes
  try {
    const conciergeRoutes = await import("./routes/concierge-routes");
    app.use("/api/concierge", conciergeRoutes.default);
    console.log("Concierge service routes registered successfully");
  } catch (error) {
    console.error("Failed to load concierge routes:", error);
  }

  const httpServer = createServer(app);

  return httpServer;
}