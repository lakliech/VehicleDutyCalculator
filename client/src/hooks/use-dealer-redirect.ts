import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "./useAuth";
import { apiRequest } from "@/lib/queryClient";

export function useDealerRedirect() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) return;

    const handleDealerRedirect = async () => {
      try {
        // Check for invitation token in session storage (from OAuth redirect)
        const invitationToken = sessionStorage.getItem('dealerInvitationToken');
        
        if (invitationToken) {
          // Clear the token
          sessionStorage.removeItem('dealerInvitationToken');
          
          // Accept the invitation
          try {
            const response = await apiRequest("POST", `/api/dealers/invitation/${invitationToken}/accept`);
            const data = await response.json();
            
            if (data.success) {
              // Redirect to dealer profile
              setLocation(data.redirectUrl);
              return;
            }
          } catch (error) {
            console.error("Failed to accept dealer invitation:", error);
            // Continue with normal flow
          }
        }

        // Check for existing dealer associations
        const response = await apiRequest("GET", `/api/dealers/user/${user.id}/associations`);
        const data = await response.json();
        
        if (data.success && data.associations && data.associations.length > 0) {
          // Get the most recent active association
          const primaryAssociation = data.associations.find((a: any) => a.status === 'active');
          
          if (primaryAssociation && primaryAssociation.dealer) {
            // Redirect to the dealer's profile page
            setLocation(`/dealer/${primaryAssociation.dealer.userId}`);
            return;
          }
        }
      } catch (error) {
        // Silently fail - user will stay on normal flow
        console.error("Failed to check dealer associations:", error);
      }
    };

    // Small delay to allow auth to stabilize
    const timeoutId = setTimeout(handleDealerRedirect, 500);
    
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, isLoading, user, setLocation]);
}