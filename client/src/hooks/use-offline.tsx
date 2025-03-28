import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { connectivityService, ConnectionType } from "@/lib/connectivity-service";

/**
 * A hook that provides offline status and related utilities
 * @returns Object with offline status and helper functions
 */
export function useOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine || !getServerConnectivityStatus());
  const { toast } = useToast();
  
  useEffect(() => {
    // Update the state when online/offline status changes
    const handleOnline = () => {
      // Only change status if the server is also reachable
      if (getServerConnectivityStatus()) {
        setIsOffline(false);
        toast({
          title: "You're back online",
          description: "Connection restored. All functions now available.",
          variant: "default",
          duration: 3000,
        });
      }
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      toast({
        title: "You're offline",
        description: "Limited functionality available. Some content may be stale.",
        variant: "destructive",
        duration: 5000,
      });
    };
    
    // Handle server specific connectivity changes
    const handleServerReconnect = () => {
      // Only show reconnected if browser is also online
      if (navigator.onLine) {
        setIsOffline(false);
        toast({
          title: "Server connection restored",
          description: "All functions are now available.",
          variant: "default",
          duration: 3000,
        });
      }
    };
    
    const handleServerDisconnect = () => {
      setIsOffline(true);
      toast({
        title: "Server connection lost",
        description: "Limited functionality available. Using cached content.",
        variant: "destructive",
        duration: 5000,
      });
    };
    
    // Listen for browser connectivity events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Listen for server connectivity events
    const cleanup = listenToServerConnectivity(
      handleServerReconnect,
      handleServerDisconnect
    );
    
    // Also listen for our custom event from the service worker
    const handleConnectivityChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.isConnected === 'boolean') {
        if (customEvent.detail.isConnected && navigator.onLine) {
          setIsOffline(false);
        } else if (!customEvent.detail.isConnected) {
          setIsOffline(true);
        }
      }
    };
    
    window.addEventListener('connectivity-change', handleConnectivityChange);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('connectivity-change', handleConnectivityChange);
      cleanup();
    };
  }, [toast]);
  
  return {
    isOffline,
    
    /**
     * Indicates whether an error is likely due to being offline
     * @param error The error to check
     * @returns Whether the error is likely related to a network issue
     */
    isOfflineError(error: any): boolean {
      // Check both browser online status and server connectivity
      if (!navigator.onLine || !getServerConnectivityStatus()) return true;
      
      const message = String(error?.message || error).toLowerCase();
      return (
        message.includes('network') ||
        message.includes('offline') ||
        message.includes('failed to fetch') ||
        message.includes('net::err') ||
        message.includes('connection') ||
        message.includes('cors') ||
        message.includes('timeout') ||
        (error instanceof TypeError && message.includes('fetch'))
      );
    },
    
    /**
     * Shows a toast notification about an offline error
     * @param feature The feature that failed due to being offline
     */
    showOfflineWarning(feature: string): void {
      // Determine what kind of connectivity issue we have
      if (!navigator.onLine) {
        toast({
          title: "You're offline",
          description: `${feature} is not available while offline. Please reconnect to the internet.`,
          variant: "destructive",
          duration: 5000,
        });
      } else if (!getServerConnectivityStatus()) {
        toast({
          title: "Server connection issue",
          description: `${feature} is not available due to server connectivity issues. We'll keep trying to reconnect.`,
          variant: "destructive", 
          duration: 5000,
        });
      } else {
        toast({
          title: "Connection issue",
          description: `${feature} is experiencing connectivity problems. Please try again later.`,
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  };
}