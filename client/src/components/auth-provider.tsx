import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import type { AppUser } from "@shared/schema";

interface AuthContextType {
  // User authentication
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  checkAuthStatus: () => Promise<void>;
  
  // Admin authentication (legacy)
  adminToken: string | null;
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => void;
  getAuthHeaders: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Check for admin token
      const savedAdminToken = localStorage.getItem("admin-token");
      if (savedAdminToken) {
        setAdminToken(savedAdminToken);
      }

      // Check for OAuth authentication status with retry logic
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          const response = await fetch("/api/auth/status", {
            credentials: 'include' // Important for session-based auth
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.authenticated && data.user) {
              setUser(data.user);
              localStorage.setItem("user", JSON.stringify(data.user));
              break; // Success, exit retry loop
            }
          }
          
          // If not authenticated, clear any stored user data
          if (response.ok) {
            localStorage.removeItem("user");
            setUser(null);
            break;
          }
          
        } catch (error) {
          console.error(`Auth check attempt ${retryCount + 1} failed:`, error);
          retryCount++;
          
          if (retryCount < maxRetries) {
            // Wait before retry (progressive backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      }
      
      // If all retries failed, fallback to localStorage
      if (retryCount >= maxRetries) {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            setUser(userData);
          } catch (error) {
            console.error("Failed to parse user data:", error);
            localStorage.removeItem("user");
          }
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const checkAuthStatus = async () => {
    let retryCount = 0;
    const maxRetries = 5; // Increased retry count for OAuth flow
    
    while (retryCount < maxRetries) {
      try {
        const response = await fetch("/api/auth/status", {
          credentials: 'include',
          cache: 'no-cache' // Prevent caching during auth checks
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated && data.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            return; // Success, exit retry loop
          } else {
            localStorage.removeItem("user");
            setUser(null);
            return; // Clear state, exit retry loop
          }
        }
        
        // If response not ok, retry with exponential backoff
        retryCount++;
        if (retryCount < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000); // Exponential backoff, max 5s
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
      } catch (error) {
        console.error(`Auth status check attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        
        if (retryCount < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    console.error('Auth status check failed after all retries');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear server session
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    setUser(null);
    localStorage.removeItem("user");
  };

  const adminLogin = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAdminToken(data.token);
          localStorage.setItem("admin-token", data.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Admin login error:", error);
      return false;
    }
  };

  const adminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem("admin-token");
  };

  const getAuthHeaders = () => {
    const headers: Record<string, string> = {};
    if (adminToken) {
      headers.Authorization = `Bearer ${adminToken}`;
    }
    return headers;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
      checkAuthStatus,
      adminToken,
      isAdminAuthenticated: !!adminToken,
      adminLogin,
      adminLogout,
      getAuthHeaders,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}