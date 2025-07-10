import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AppUser } from "@shared/schema";

interface UserAuthContextType {
  user: AppUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AppUser, token: string) => void;
  logout: () => void;
  getAuthHeaders: () => Record<string, string>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("userToken");
  });

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: !!token,
    retry: false,
  });

  const login = (userData: AppUser, userToken: string) => {
    setToken(userToken);
    localStorage.setItem("userToken", userToken);
    refetch();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("userToken");
  };

  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    if (token) {
      // Set up axios default headers or similar if needed
    }
  }, [token]);

  return (
    <UserAuthContext.Provider
      value={{
        user: user || null,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
}