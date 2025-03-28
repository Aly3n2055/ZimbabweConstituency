/**
 * Centralized service for managing application connectivity state
 * Includes device and server connectivity monitoring
 */

import { getOfflineData, storeOfflineData } from "./service-worker";
import { getServerConnectivityStatus, checkServerConnectivity, startPeriodicConnectivityChecks, listenToServerConnectivity } from "./connectivity-check";

// Connectivity state types
export enum ConnectionType {
  ONLINE = "online",            // Device online, server reachable
  DEVICE_OFFLINE = "device_offline",   // Device has no network connection
  SERVER_OFFLINE = "server_offline",   // Device has connection but server unreachable
  RECONNECTING = "reconnecting"       // Attempting to reconnect
}

// Singleton service instance
let instance: ConnectivityService | null = null;

/**
 * Provides centralized connectivity management for the application
 */
export class ConnectivityService {
  private _connectionType: ConnectionType = navigator.onLine 
    ? (getServerConnectivityStatus() ? ConnectionType.ONLINE : ConnectionType.SERVER_OFFLINE)
    : ConnectionType.DEVICE_OFFLINE;
  private _lastOnlineTime: number | null = navigator.onLine ? Date.now() : null;
  private _listeners: Array<(type: ConnectionType) => void> = [];
  private _stopPeriodicChecks: (() => void) | null = null;
  
  /**
   * Get the singleton instance of the service
   */
  public static getInstance(): ConnectivityService {
    if (!instance) {
      instance = new ConnectivityService();
    }
    return instance;
  }
  
  /**
   * Private constructor - use getInstance() instead
   */
  private constructor() {
    this.setupEventListeners();
  }
  
  /**
   * Get the current connection type
   */
  public get connectionType(): ConnectionType {
    return this._connectionType;
  }
  
  /**
   * Get the time when the app was last online
   */
  public get lastOnlineTime(): number | null {
    return this._lastOnlineTime;
  }
  
  /**
   * Check if the device is online according to the browser API
   */
  public get isDeviceOnline(): boolean {
    return navigator.onLine;
  }
  
  /**
   * Check if the server is reachable
   */
  public get isServerReachable(): boolean {
    return getServerConnectivityStatus();
  }
  
  /**
   * Check if the app has complete connectivity (both device and server)
   */
  public get isFullyOnline(): boolean {
    return this.isDeviceOnline && this.isServerReachable;
  }
  
  /**
   * Initialize the service (starts periodic checks)
   */
  public initialize(): void {
    if (this._stopPeriodicChecks) {
      this._stopPeriodicChecks();
    }
    
    // Initial connectivity check
    this.checkConnectivity();
    
    // Start periodic checks
    this._stopPeriodicChecks = startPeriodicConnectivityChecks(30000);
    
    // Add listeners for server connectivity events
    listenToServerConnectivity(
      () => this.updateConnectionType(),
      () => this.updateConnectionType()
    );
  }
  
  /**
   * Clean up event listeners and stop checks
   */
  public cleanup(): void {
    if (this._stopPeriodicChecks) {
      this._stopPeriodicChecks();
      this._stopPeriodicChecks = null;
    }
    
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }
  
  /**
   * Subscribe to connection type changes
   * @param listener Callback function that receives the new connection type
   * @returns Unsubscribe function
   */
  public subscribe(listener: (type: ConnectionType) => void): () => void {
    this._listeners.push(listener);
    
    // Immediately notify with current state
    listener(this._connectionType);
    
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }
  
  /**
   * Manually check connectivity status
   * @returns Promise resolving to the current connection type
   */
  public async checkConnectivity(): Promise<ConnectionType> {
    if (!navigator.onLine) {
      this._connectionType = ConnectionType.DEVICE_OFFLINE;
    } else {
      const isServerReachable = await checkServerConnectivity();
      this._connectionType = isServerReachable 
        ? ConnectionType.ONLINE 
        : ConnectionType.SERVER_OFFLINE;
        
      if (isServerReachable) {
        this._lastOnlineTime = Date.now();
      }
    }
    
    this.notifyListeners();
    return this._connectionType;
  }
  
  /**
   * Cache API response data for offline access
   * @param url The API URL to cache
   * @param data The data to cache
   */
  public async cacheApiData(url: string, data: any): Promise<void> {
    await storeOfflineData(url, data);
  }
  
  /**
   * Get cached API data
   * @param url The API URL to retrieve
   * @returns The cached data or null if not found
   */
  public async getCachedApiData<T>(url: string): Promise<T | null> {
    return await getOfflineData(url) as T | null;
  }
  
  /**
   * Set up browser online/offline event listeners
   */
  private setupEventListeners(): void {
    // Bind handlers to preserve 'this' context
    this.handleOnline = this.handleOnline.bind(this);
    this.handleOffline = this.handleOffline.bind(this);
    
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }
  
  /**
   * Update connection type based on current status
   */
  private updateConnectionType(): void {
    const oldType = this._connectionType;
    
    if (!navigator.onLine) {
      this._connectionType = ConnectionType.DEVICE_OFFLINE;
    } else if (!getServerConnectivityStatus()) {
      this._connectionType = ConnectionType.SERVER_OFFLINE;
    } else {
      this._connectionType = ConnectionType.ONLINE;
      this._lastOnlineTime = Date.now();
    }
    
    if (oldType !== this._connectionType) {
      this.notifyListeners();
    }
  }
  
  /**
   * Handle browser online event
   */
  private handleOnline(): void {
    // Switch to reconnecting until we verify server status
    this._connectionType = ConnectionType.RECONNECTING;
    this.notifyListeners();
    
    // Check server connectivity
    checkServerConnectivity().then(isReachable => {
      this._connectionType = isReachable 
        ? ConnectionType.ONLINE 
        : ConnectionType.SERVER_OFFLINE;
        
      if (isReachable) {
        this._lastOnlineTime = Date.now();
      }
      
      this.notifyListeners();
    });
  }
  
  /**
   * Handle browser offline event
   */
  private handleOffline(): void {
    this._connectionType = ConnectionType.DEVICE_OFFLINE;
    this.notifyListeners();
  }
  
  /**
   * Notify all listeners of connection type change
   */
  private notifyListeners(): void {
    this._listeners.forEach(listener => listener(this._connectionType));
    
    // Add a body class for styling purposes
    document.body.classList.remove('connection-online', 'connection-device-offline', 
      'connection-server-offline', 'connection-reconnecting');
    
    switch (this._connectionType) {
      case ConnectionType.ONLINE:
        document.body.classList.add('connection-online');
        document.body.classList.remove('offline-mode');
        break;
      case ConnectionType.DEVICE_OFFLINE:
        document.body.classList.add('connection-device-offline', 'offline-mode');
        break;
      case ConnectionType.SERVER_OFFLINE:
        document.body.classList.add('connection-server-offline', 'offline-mode');
        break;
      case ConnectionType.RECONNECTING:
        document.body.classList.add('connection-reconnecting');
        break;
    }
  }
}

// Export singleton instance
export const connectivityService = ConnectivityService.getInstance();