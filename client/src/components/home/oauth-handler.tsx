import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function useOAuthHandler() {
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const social = urlParams.get('social');
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (social === 'google' && success === 'true') {
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
  }, [toast]);
}