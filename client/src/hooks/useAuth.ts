import { useQuery } from "@tanstack/react-query";
import type { AppUser } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading } = useQuery<AppUser | null>({
    queryKey: ["/api/auth/status"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}