/**
 * Utility functions for checking connectivity to the server
 */

// The timestamp of the last successful server ping
let lastSuccessfulPing: number | null = null;

// The server connectivity status
let isServerReachable = true;

/**
 * Check if the server is reachable
 * This performs a lightweight request to the server and updates the status
 * @returns A promise that resolves to true if the server is reachable
 */
export async function checkServerConnectivity(): Promise<boolean> {
  try {
    // Use a timestamp parameter to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/ping?t=${timestamp}`, {
      method: 'GET',
      // Short timeout to avoid hanging
      signal: AbortSignal.timeout(3000),
    });
    
    if (response.ok) {
      lastSuccessfulPing = Date.now();
      isServerReachable = true;
      
      // Dispatch a connectivity change event
      window.dispatchEvent(new CustomEvent('connectivity-change', { 
        detail: { isConnected: true } 
      }));
      
      return true;
    } else {
      isServerReachable = false;
      
      // Dispatch a connectivity change event
      window.dispatchEvent(new CustomEvent('connectivity-change', { 
        detail: { isConnected: false } 
      }));
      
      return false;
    }
  } catch (error) {
    console.warn('Server connectivity check failed:', error);
    isServerReachable = false;
    
    // Dispatch a connectivity change event
    window.dispatchEvent(new CustomEvent('connectivity-change', { 
      detail: { isConnected: false } 
    }));
    
    return false;
  }
}

/**
 * Start periodic connectivity checks
 * @param intervalMs How often to check connectivity (default: 30 seconds)
 * @returns A function to stop the periodic checks
 */
export function startPeriodicConnectivityChecks(intervalMs = 30000): () => void {
  const intervalId = setInterval(() => {
    // Only run connectivity check if we're online according to the browser
    if (navigator.onLine) {
      checkServerConnectivity().then((isConnected) => {
        if (isConnected) {
          // If we've transitioned from offline to online, dispatch an event
          if (!isServerReachable) {
            window.dispatchEvent(new CustomEvent('server-reconnected'));
          }
        } else {
          // If we've transitioned from online to offline, dispatch an event
          if (isServerReachable) {
            window.dispatchEvent(new CustomEvent('server-disconnected'));
          }
        }
      });
    }
  }, intervalMs);
  
  return () => clearInterval(intervalId);
}

/**
 * Gets the current server connectivity status
 * @returns Whether the server is currently reachable
 */
export function getServerConnectivityStatus(): boolean {
  return isServerReachable;
}

/**
 * Gets the timestamp of the last successful ping
 * @returns The timestamp or null if no successful ping yet
 */
export function getLastSuccessfulPingTime(): number | null {
  return lastSuccessfulPing;
}

/**
 * Add listeners for server connectivity events
 * @param onReconnect Handler for when server becomes reachable
 * @param onDisconnect Handler for when server becomes unreachable
 * @returns A function to remove the event listeners
 */
export function listenToServerConnectivity(
  onReconnect: () => void,
  onDisconnect: () => void
): () => void {
  const reconnectHandler = () => onReconnect();
  const disconnectHandler = () => onDisconnect();
  
  window.addEventListener('server-reconnected', reconnectHandler);
  window.addEventListener('server-disconnected', disconnectHandler);
  
  return () => {
    window.removeEventListener('server-reconnected', reconnectHandler);
    window.removeEventListener('server-disconnected', disconnectHandler);
  };
}