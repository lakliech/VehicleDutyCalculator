import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Auth middleware - supports both session and token authentication
export const authenticateUser = async (req: any, res: Response, next: NextFunction) => {
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

export const requireRole = (roles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const userRole = await storage.getUserRole(req.user.id);
      
      if (!userRole || !roles.includes(userRole.name)) {
        console.log(`User ${req.user.id} with role ${userRole?.name} attempted to access endpoint requiring roles: ${roles.join(', ')}`);
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.error("Error checking user role:", error);
      return res.status(500).json({ error: "Failed to verify permissions" });
    }
  };
};