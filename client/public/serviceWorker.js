// Service Worker for Kuwadzana West Constituency Portal
const CACHE_NAME = 'kuwadzana-constituency-cache-v1';

// Assets to cache immediately during installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/attached_assets/ZANU_PF_logo.png',
  '/attached_assets/Flag_of_ZANU-PF.svg.png',
  '/attached_assets/1f1ff-1f1fc.png',
  '/attached_assets/270a-1f3fe.png',
  '/offline.html'
];

// API endpoints to cache when accessed
const API_ENDPOINTS = [
  '/api/news',
  '/api/projects',
  '/api/leaders',
  '/api/events'
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Pre-caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const validCacheNames = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!validCacheNames.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is an API call
function isApiRequest(url) {
  return API_ENDPOINTS.some(endpoint => url.includes(endpoint));
}

// Helper function to determine if a request is for an asset
function isAssetRequest(url) {
  return (
    url.match(/\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot|mp3|mp4)$/) ||
    url.includes('/assets/')
  );
}

// Fetch event - handle offline requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Don't cache cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Cache-first strategy for assets
  if (isAssetRequest(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
                
              return response;
            })
            .catch(() => {
              if (request.url.match(/\.(png|jpg|jpeg|svg|gif)$/)) {
                return caches.match('/offline-image.png');
              }
            });
        })
    );
    return;
  }
  
  // Network-first strategy for API requests with fallback to cached data
  if (isApiRequest(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, clonedResponse);
              });
          }
          return response;
        })
        .catch(() => {
          console.log('Falling back to cache for API request:', url.pathname);
          return caches.match(request)
            .then((cachedResponse) => {
              // If we have a cached version, return it
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // Otherwise return a default offline response for API
              return new Response(
                JSON.stringify({ 
                  status: 'offline',
                  message: 'You are offline. This data was not found in the cache.',
                  data: []
                }),
                { 
                  headers: { 'Content-Type': 'application/json' } 
                }
              );
            });
        })
    );
    return;
  }
  
  // Network-first strategy for HTML pages with offline fallback
  if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the latest version of the page
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, clonedResponse);
            });
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match('/offline.html');
            });
        })
    );
    return;
  }
  
  // Default strategy - network first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(request, responseToCache);
          });
          
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Handle background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-feedback') {
    event.waitUntil(syncFeedbackData());
  }
});

// Function to sync stored feedback data when online
async function syncFeedbackData() {
  try {
    // Open the IndexedDB database
    const db = await openDB();
    
    // Get all unsynced feedback entries
    const tx = db.transaction('offline-feedback', 'readonly');
    const store = tx.objectStore('offline-feedback');
    const feedbackEntries = await store.getAll();
    
    // Process each entry
    for (const entry of feedbackEntries) {
      try {
        // Attempt to send the feedback to the server
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entry.data)
        });
        
        if (response.ok) {
          // If successful, remove from IndexedDB
          const deleteTx = db.transaction('offline-feedback', 'readwrite');
          const deleteStore = deleteTx.objectStore('offline-feedback');
          await deleteStore.delete(entry.id);
          await deleteTx.complete;
          console.log('Synced feedback entry:', entry.id);
        }
      } catch (err) {
        console.error('Failed to sync feedback entry:', entry.id, err);
      }
    }
    
    await tx.complete;
    db.close();
  } catch (err) {
    console.error('Error during feedback sync:', err);
  }
}

// Helper function to open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('kuwadzana-constituency-db', 1);
    
    request.onerror = (event) => {
      reject('IndexedDB error: ' + event.target.errorCode);
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
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