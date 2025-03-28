import React from "react";
import { Database, Clock, ServerOff, WifiOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useOffline } from "@/hooks/use-offline";
import { getServerConnectivityStatus } from "@/lib/connectivity-check";

interface CachedContentWrapperProps {
  children: React.ReactNode;
  isCached?: boolean;
  lastUpdated?: Date | string | null;
  resourceType: string;
  emptyState?: React.ReactNode;
  isEmpty?: boolean;
}

/**
 * Wraps content that might be served from cache when offline
 * Shows appropriate indicators and empty states
 */
export function CachedContentWrapper({
  children,
  isCached = false,
  lastUpdated,
  resourceType,
  emptyState,
  isEmpty = false,
}: CachedContentWrapperProps) {
  const { isOffline } = useOffline();
  
  // Format the last updated date/time
  const formattedDate = lastUpdated 
    ? new Date(lastUpdated).toLocaleString() 
    : 'Unknown';
  
  // Determine connectivity status
  const isServerConnected = getServerConnectivityStatus();
  const isDeviceOnline = navigator.onLine;
  
  // Function to get the appropriate icon and label based on status
  const getStatusIndicator = () => {
    if (isCached) {
      return { 
        icon: <Clock className="h-3 w-3" />, 
        label: "Cached", 
        badgeClass: "cached-badge-cached" 
      };
    }
    if (!isDeviceOnline) {
      return { 
        icon: <WifiOff className="h-3 w-3" />, 
        label: "Offline", 
        badgeClass: "cached-badge-offline" 
      };
    }
    if (!isServerConnected) {
      return { 
        icon: <ServerOff className="h-3 w-3" />, 
        label: "Server Offline", 
        badgeClass: "cached-badge-server-offline" 
      };
    }
    return { 
      icon: <Database className="h-3 w-3" />, 
      label: "Offline", 
      badgeClass: "" 
    };
  };
  
  // Function to get appropriate tooltip message
  const getTooltipMessage = () => {
    if (isCached) {
      return `You are viewing cached ${resourceType} data from ${formattedDate}.`;
    }
    if (!isDeviceOnline) {
      return "Your device is offline. Connect to the internet for the latest updates.";
    }
    if (!isServerConnected) {
      return "Our server is currently unreachable. We're working to restore service.";
    }
    return "You are in offline mode. Connect to the internet for the latest updates.";
  };
  
  // If the content is empty and we have an empty state to show
  if (isEmpty && emptyState) {
    return (
      <div className="cached-content">
        {isOffline && (
          <div className={`cached-badge ${getStatusIndicator().badgeClass}`}>
            {getStatusIndicator().icon}
            <span>{getStatusIndicator().label}</span>
          </div>
        )}
        {emptyState}
      </div>
    );
  }
  
  return (
    <div className="cached-content">
      {(isOffline || isCached) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`cached-badge ${getStatusIndicator().badgeClass}`}>
                {getStatusIndicator().icon}
                <span>{getStatusIndicator().label}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>This {resourceType} content was last updated on {formattedDate}.</p>
              <p className="text-xs text-amber-800 mt-1">
                {getTooltipMessage()}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {children}
    </div>
  );
}