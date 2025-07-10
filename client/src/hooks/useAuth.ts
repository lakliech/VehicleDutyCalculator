import { useQuery } from "@tanstack/react-query";
import type { AppUser } from "@shared/schema";

export function useAuth() {
  const { data: authStatus, isLoading } = useQuery<{authenticated: boolean; user?: AppUser} | null>({
    queryKey: ["/api/auth/status"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: authStatus?.user || null,
    isLoading,
    isAuthenticated: authStatus?.authenticated || false,
  };
}