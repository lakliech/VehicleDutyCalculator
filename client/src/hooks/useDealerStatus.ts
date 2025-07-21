import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

interface DealerStatusResponse {
  hasDealer: boolean;
  dealerProfile: any;
  userRole: any;
}

export function useDealerStatus(isAuthenticated: boolean) {
  const { data, isLoading } = useQuery<DealerStatusResponse>({
    queryKey: ["/api/dealers/user/status"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: isAuthenticated,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isAdmin = () => {
    if (!data?.userRole) return false;
    const roleId = data.userRole.id;
    const roleName = data.userRole.name?.toLowerCase();
    return roleId === 3 || roleId === 4 || roleName === 'admin' || roleName === 'superadmin';
  };

  return {
    hasDealer: data?.hasDealer || false,
    dealerProfile: data?.dealerProfile || null,
    isAdmin: isAdmin(),
    isLoading,
  };
}