import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getOfflineData, storeOfflineData } from "./service-worker";
import { getServerConnectivityStatus } from "./connectivity-check";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Makes an API request with offline support
 * For POST/PUT/DELETE operations, they will be queued if offline
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    await throwIfResNotOk(res);
    
    // If it's a GET request and successful, cache the response for offline use
    if (method === 'GET' && res.ok) {
      try {
        const clonedRes = res.clone();
        const responseData = await clonedRes.json();
        await storeOfflineData(url, responseData);
      } catch (err) {
        console.warn('Failed to cache API response:', err);
      }
    }
    
    return res;
  } catch (error) {
    // Check if we're offline (either browser or server connectivity)
    const isOffline = !navigator.onLine || !getServerConnectivityStatus();
    
    // If offline and it's a GET request, try to serve from cache
    if (isOffline && method === 'GET') {
      const cachedData = await getOfflineData(url);
      if (cachedData) {
        // Create a mock response with cached data
        return new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'X-From-Cache': 'true'
          }
        });
      }
    }
    
    // If it's a form submission and we're offline, we could store it for later sync
    if (isOffline && (method === 'POST' || method === 'PUT') && data) {
      // This would be implemented with the background sync API
      // For specific paths like /api/feedback, handle with the feedback sync system
      if (url === '/api/feedback') {
        // Import dynamically to avoid circular dependency
        const { storeFeedbackForSync } = await import('./service-worker');
        const success = await storeFeedbackForSync(data);
        
        if (success) {
          const message = !navigator.onLine 
            ? 'Your feedback has been saved and will be submitted when you are back online.'
            : 'Server is currently unavailable. Your feedback has been saved and will be submitted when connectivity is restored.';
            
          return new Response(JSON.stringify({ 
            status: 'queued',
            message
          }), {
            status: 202,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
    
    // Re-throw for the caller to handle
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      
      // If successful, cache the response for offline use
      try {
        const clonedRes = res.clone();
        const responseData = await clonedRes.json();
        await storeOfflineData(queryKey[0] as string, responseData);
        return responseData;
      } catch (err) {
        console.warn('Failed to process or cache response:', err);
        return await res.json();
      }
    } catch (error) {
      // Check if we're offline (either browser or server connectivity)
      const isOffline = !navigator.onLine || !getServerConnectivityStatus();
      
      // If offline, try to serve from cache
      if (isOffline) {
        const cachedData = await getOfflineData(queryKey[0] as string);
        if (cachedData) {
          // Add source information for the UI to display
          if (!navigator.onLine) {
            console.log(`Serving cached data for ${queryKey[0]} (device offline)`);
          } else {
            console.log(`Serving cached data for ${queryKey[0]} (server unavailable)`);
          }
          
          return cachedData;
        }
      }
      
      // Re-throw for the query client to handle
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
