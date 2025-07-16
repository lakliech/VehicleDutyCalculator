import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth-provider';

export const useAuthRedirect = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const social = urlParams.get('social');
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (social === 'google' && success === 'true') {
      // Force refresh of auth status after OAuth success with delay and retries
      const retryAuthCheck = async (attempts = 0) => {
        if (attempts >= 3) {
          console.error('Auth check failed after 3 attempts');
          return;
        }
        
        try {
          await checkAuthStatus();
          // Wait a bit and check if the auth actually worked
          setTimeout(() => {
            const response = fetch('/api/auth/status', { credentials: 'include' })
              .then(res => res.json())
              .then(data => {
                if (!data.authenticated) {
                  // If still not authenticated, try again
                  setTimeout(() => retryAuthCheck(attempts + 1), 1000);
                }
              });
          }, 500);
        } catch (error) {
          console.error('Auth check error:', error);
          setTimeout(() => retryAuthCheck(attempts + 1), 1000);
        }
      };
      
      setTimeout(() => retryAuthCheck(), 500);
      
      // Check if there's a stored return URL
      const returnUrl = localStorage.getItem('returnUrl');
      
      if (returnUrl) {
        // Clear the stored return URL
        localStorage.removeItem('returnUrl');
        
        // Show success toast
        toast({
          title: "Login Successful",
          description: "You have been logged in with Google successfully!",
        });
        
        // Redirect to the original page
        setLocation(returnUrl);
        return;
      }
      
      // Default success behavior if no return URL
      toast({
        title: "Login Successful",
        description: "You have been logged in with Google successfully!",
      });
      
      // Clean up URL parameters and force page refresh to ensure auth state is updated
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Force complete page refresh after a short delay to ensure authentication state is properly loaded
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (error === 'auth_failed') {
      toast({
        title: "Authentication Failed",
        description: "Google authentication failed. Please try again.",
        variant: "destructive",
      });
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setLocation, toast, checkAuthStatus]);
};