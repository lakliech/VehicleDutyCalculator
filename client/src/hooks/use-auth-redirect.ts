import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export const useAuthRedirect = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const social = urlParams.get('social');
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (social === 'google' && success === 'true') {
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
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error === 'auth_failed') {
      toast({
        title: "Authentication Failed",
        description: "Google authentication failed. Please try again.",
        variant: "destructive",
      });
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setLocation, toast]);
};