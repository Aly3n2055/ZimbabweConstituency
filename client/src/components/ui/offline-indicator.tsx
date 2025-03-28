import { useOffline } from "@/hooks/use-offline";
import { WifiOff, ServerOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getServerConnectivityStatus } from "@/lib/connectivity-check";

/**
 * Displays an indicator when the user is offline or has connectivity issues
 */
export function OfflineIndicator() {
  const { isOffline } = useOffline();
  const isServerConnected = getServerConnectivityStatus();
  const isDeviceOnline = navigator.onLine;
  
  // Determine what icon and message to show
  const getStatusInfo = () => {
    if (!isDeviceOnline) {
      return {
        icon: <WifiOff className="h-4 w-4" />,
        message: "You are offline. Some features and content may be limited.",
        statusClass: "status-device-offline"
      };
    }
    
    if (!isServerConnected) {
      return {
        icon: <ServerOff className="h-4 w-4" />,
        message: "Server connection lost. Limited functionality available.",
        statusClass: "status-server-offline"
      };
    }
    
    return {
      icon: <AlertCircle className="h-4 w-4" />,
      message: "Connectivity issues detected. Some features may be unavailable.",
      statusClass: "status-reconnecting"
    };
  };
  
  const statusInfo = getStatusInfo();
  
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`offline-indicator ${statusInfo.statusClass}`}
        >
          {statusInfo.icon}
          <span>{statusInfo.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}