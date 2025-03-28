import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./hooks/use-auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { registerServiceWorker, setupConnectivityListeners } from "./lib/service-worker";
import { TooltipProvider } from "./hooks/use-tooltips";

// Register service worker for offline capabilities
registerServiceWorker();

// Setup online/offline detection
setupConnectivityListeners();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);
