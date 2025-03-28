/**
 * Registers the service worker for offline capabilities
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/serviceWorker.js');
        console.log('Service worker registered successfully with scope:', registration.scope);
        
        // Set up the sync manager for offline form submissions
        await setupBackgroundSync();
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    });
  } else {
    console.warn('Service workers are not supported in this browser.');
  }
}

/**
 * Sets up background sync for offline submissions
 */
async function setupBackgroundSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      // Get the current registration
      const registration = await navigator.serviceWorker.ready;
      
      // TypeScript doesn't recognize the sync property, but it exists in supported browsers
      // Use type assertion to avoid TypeScript errors
      const syncManager = (registration as any).sync;
      if (syncManager) {
        await syncManager.register('sync-feedback');
        console.log('Background sync registered successfully');
      } else {
        console.warn('SyncManager not available in this browser');
      }
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  } else {
    console.warn('Background sync is not supported in this browser.');
  }
}

/**
 * Shows a toast notification about the connection status
 * @param isConnected Whether the server is connected
 * @param isDeviceOnline Whether the device is online
 */
export function showConnectivityToast(isConnected: boolean, isDeviceOnline: boolean = navigator.onLine) {
  // Use our combined connectivity status
  const event = new CustomEvent('connectivity-change', { 
    detail: { isConnected, isDeviceOnline } 
  });
  window.dispatchEvent(event);
}

/**
 * Sets up online/offline event listeners
 */
export function setupConnectivityListeners() {
  // Import dynamically to avoid circular dependencies
  import('./connectivity-check').then(({ checkServerConnectivity }) => {
    // Check initial state
    const updateStatus = async () => {
      const isDeviceOnline = navigator.onLine;
      
      // Update CSS class for offline styling
      if (isDeviceOnline) {
        document.body.classList.remove('offline-mode');
      } else {
        document.body.classList.add('offline-mode');
      }
      
      // If device is online, check server connection and dispatch combined status
      if (isDeviceOnline) {
        const isServerConnected = await checkServerConnectivity();
        showConnectivityToast(isServerConnected, isDeviceOnline);
      } else {
        // If device is offline, we know connectivity is false
        showConnectivityToast(false, false);
      }
    };
    
    // Initial check
    updateStatus();
    
    // Add event listeners for device online/offline
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    
    // Listen for server connectivity events
    window.addEventListener('server-reconnected', () => {
      if (navigator.onLine) {
        showConnectivityToast(true, true);
      }
    });
    
    window.addEventListener('server-disconnected', () => {
      if (navigator.onLine) {
        showConnectivityToast(false, true);
      }
    });
  });
}

/**
 * Stores data in the IndexedDB for offline use
 * @param key The key to store the data under
 * @param data The data to store
 */
export async function storeOfflineData(key: string, data: any) {
  if (!('indexedDB' in window)) {
    console.warn('IndexedDB not supported');
    return;
  }
  
  try {
    const db = await openDatabase();
    const tx = db.transaction('cached-data', 'readwrite');
    const store = tx.objectStore('cached-data');
    
    await store.put({
      key,
      data,
      timestamp: new Date().getTime()
    });
    
    // Use a promise to wait for transaction completion
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    
    console.log(`Data stored offline with key: ${key}`);
  } catch (error) {
    console.error('Failed to store offline data:', error);
  }
}

/**
 * Retrieves data from IndexedDB for offline use
 * @param key The key to retrieve data for
 * @returns The stored data or null if not found
 */
export async function getOfflineData(key: string) {
  if (!('indexedDB' in window)) {
    console.warn('IndexedDB not supported');
    return null;
  }
  
  try {
    const db = await openDatabase();
    const tx = db.transaction('cached-data', 'readonly');
    const store = tx.objectStore('cached-data');
    
    // Get request as IDBRequest
    const request = store.get(key);
    
    // Wait for the request to complete
    const result = await new Promise<any>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    // Wait for transaction to complete
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    
    if (result) {
      console.log(`Retrieved offline data for key: ${key}`);
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to retrieve offline data:', error);
    return null;
  }
}

/**
 * Stores a feedback submission for later sync when offline
 * @param feedbackData The feedback data to store
 */
export async function storeFeedbackForSync(feedbackData: any) {
  if (!('indexedDB' in window)) {
    console.warn('IndexedDB not supported');
    return false;
  }
  
  try {
    const db = await openDatabase();
    const tx = db.transaction('offline-feedback', 'readwrite');
    const store = tx.objectStore('offline-feedback');
    
    // Add the data to the store
    const request = store.add({
      data: feedbackData,
      timestamp: new Date().getTime()
    });
    
    // Wait for the add operation to complete
    await new Promise<void>((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    // Wait for transaction to complete
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    
    console.log('Feedback stored for later sync');
    
    // Try to trigger a sync if possible
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      // Use type assertion to avoid TypeScript errors
      const syncManager = (registration as any).sync;
      if (syncManager) {
        await syncManager.register('sync-feedback');
      }
    }
    
    return true;
  } catch (error) {
    console.error('Failed to store feedback for sync:', error);
    return false;
  }
}

/**
 * Opens the IndexedDB database
 * @returns A promise that resolves to the database
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('kuwadzana-constituency-db', 1);
    
    request.onerror = event => {
      console.error('Error opening IndexedDB:', event);
      reject('Error opening IndexedDB');
    };
    
    request.onsuccess = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('offline-feedback')) {
        db.createObjectStore('offline-feedback', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('cached-data')) {
        db.createObjectStore('cached-data', { keyPath: 'key' });
      }
    };
  });
}