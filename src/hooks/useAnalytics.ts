import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Generate a session ID if it doesn't exist
        let sessionId = sessionStorage.getItem('session_id');
        if (!sessionId) {
          sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          sessionStorage.setItem('session_id', sessionId);
        }

        // Get basic location info (simplified)
        let locationData = { country: 'Unknown', city: 'Unknown' };
        try {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            locationData = await response.json();
          }
        } catch (error) {
          console.log('Location fetch failed, using defaults');
        }

        // Track the page view
        console.log('Analytics tracking disabled');
      } catch (error) {
        // No analytics error handling needed
      }
    };

    // Track page view on mount
    trackPageView();

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackPageView();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};

export default useAnalytics;