import { useQuery } from "@tanstack/react-query";
import type { AppUser } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";

export function useAuth() {
  const { data: authStatus, isLoading } = useQuery<{authenticated: boolean; user?: AppUser} | null>({
    queryKey: ["/api/auth/status"],
    queryFn: getQueryFn({ on401: "returnNull" }), // Return null on 401 instead of throwing
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: authStatus?.user || null,
    isLoading,
    isAuthenticated: authStatus?.authenticated || false,
  };
}