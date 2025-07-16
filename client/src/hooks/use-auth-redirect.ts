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
      // Clean up URL parameters immediately
      const url = new URL(window.location.href);
      url.searchParams.delete('social');
      url.searchParams.delete('success');
      window.history.replaceState({}, '', url.toString());
      
      // Force refresh of auth status after OAuth success
      const retryAuthCheck = async (attempts = 0) => {
        if (attempts >= 3) {
          console.error('Auth check failed after 3 attempts');
          toast({
            title: "Authentication Error",
            description: "Please refresh the page and try again.",
            variant: "destructive",
          });
          return;
        }
        
        try {
          await checkAuthStatus();
          
          // Verify authentication was successful
          const response = await fetch('/api/auth/status', { 
            credentials: 'include',
            cache: 'no-cache'
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.authenticated) {
              // Authentication successful, show success message
              toast({
                title: "Login Successful",
                description: "You have been logged in with Google successfully!",
              });
              
              // Check if there's a stored return URL
              const returnUrl = localStorage.getItem('returnUrl');
              if (returnUrl) {
                localStorage.removeItem('returnUrl');
                setLocation(returnUrl);
              }
              return;
            }
          }
          
          // If still not authenticated, retry with delay
          const delay = 500 + (attempts * 300);
          setTimeout(() => retryAuthCheck(attempts + 1), delay);
          
        } catch (error) {
          console.error('Auth check error:', error);
          const delay = 500 + (attempts * 300);
          setTimeout(() => retryAuthCheck(attempts + 1), delay);
        }
      };
      
      // Start retry process with initial delay
      setTimeout(() => retryAuthCheck(), 200);
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