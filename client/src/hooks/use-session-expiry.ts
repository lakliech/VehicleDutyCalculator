import { useEffect, useCallback } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/hooks/use-toast';

interface SessionExpiryOptions {
  idleTimeLimit?: number; // in milliseconds
  warningTimeBeforeExpiry?: number; // in milliseconds
  checkInterval?: number; // in milliseconds
  redirectToHome?: boolean;
}

export function useSessionExpiry(options: SessionExpiryOptions = {}) {
  const {
    idleTimeLimit = 30 * 60 * 1000, // 30 minutes default
    warningTimeBeforeExpiry = 5 * 60 * 1000, // 5 minutes warning
    checkInterval = 60 * 1000, // check every minute
    redirectToHome = true
  } = options;

  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const checkSessionExpiry = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch('/api/auth/status', {
        credentials: 'include'
      });

      if (!response.ok || response.status === 401) {
        // Session expired on server
        toast({
          title: "Session Expired",
          description: "Your session has expired. Redirecting to home page...",
          variant: "destructive",
        });

        logout();

        if (redirectToHome) {
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Failed to check session status:', error);
    }
  }, [isAuthenticated, logout, toast, redirectToHome]);

  const resetIdleTimer = useCallback(() => {
    const now = Date.now();
    localStorage.setItem('lastActivity', now.toString());
  }, []);

  const checkIdleTime = useCallback(() => {
    if (!isAuthenticated) return;

    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity) {
      resetIdleTimer();
      return;
    }

    const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
    
    if (timeSinceLastActivity >= idleTimeLimit) {
      // User has been idle for too long
      toast({
        title: "Session Expired",
        description: "You have been inactive for too long. Redirecting to home page...",
        variant: "destructive",
      });

      logout();

      if (redirectToHome) {
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } else if (timeSinceLastActivity >= (idleTimeLimit - warningTimeBeforeExpiry)) {
      // Show warning
      const remainingTime = Math.ceil((idleTimeLimit - timeSinceLastActivity) / 60000);
      toast({
        title: "Session Warning",
        description: `Your session will expire in ${remainingTime} minute(s) due to inactivity.`,
        variant: "destructive",
      });
    }
  }, [isAuthenticated, idleTimeLimit, warningTimeBeforeExpiry, logout, toast, redirectToHome, resetIdleTimer]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Initialize last activity
    resetIdleTimer();

    // Set up activity listeners
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetIdleTimer();
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Set up periodic checks
    const sessionCheckInterval = setInterval(checkSessionExpiry, checkInterval);
    const idleCheckInterval = setInterval(checkIdleTime, checkInterval);

    return () => {
      // Cleanup
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearInterval(sessionCheckInterval);
      clearInterval(idleCheckInterval);
    };
  }, [isAuthenticated, checkSessionExpiry, checkIdleTime, checkInterval, resetIdleTimer]);

  return {
    resetIdleTimer,
    checkSessionExpiry
  };
}