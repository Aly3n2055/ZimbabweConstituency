import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TooltipState = {
  [key: string]: boolean;
};

type TooltipContextType = {
  tooltips: TooltipState;
  dismissTooltip: (id: string) => void;
  resetTooltips: () => void;
};

const defaultTooltips: TooltipState = {
  homeIntro: true,
  newsSection: true,
  projectsSection: true,
  leadershipSection: true,
  eventsSection: true,
  contactForm: true,
  resourcesSection: true,
  searchFeature: true,
  feedbackForm: true,
  navigationMenu: true
};

// Create context
export const TooltipContext = createContext<TooltipContextType | null>(null);

// Create provider
export function TooltipProvider({ children }: { children: ReactNode }) {
  // Try to load tooltips state from localStorage
  const [tooltips, setTooltips] = useState<TooltipState>(() => {
    const savedTooltips = localStorage.getItem('kuwadzana_tooltips');
    return savedTooltips ? JSON.parse(savedTooltips) : { ...defaultTooltips };
  });

  // Save tooltips state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kuwadzana_tooltips', JSON.stringify(tooltips));
  }, [tooltips]);

  // Function to dismiss a tooltip
  const dismissTooltip = (id: string) => {
    setTooltips(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // Function to reset all tooltips
  const resetTooltips = () => {
    setTooltips({ ...defaultTooltips });
  };

  return (
    <TooltipContext.Provider value={{ tooltips, dismissTooltip, resetTooltips }}>
      {children}
    </TooltipContext.Provider>
  );
}

// Custom hook to use the tooltip context
export function useTooltips() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltips must be used within a TooltipProvider");
  }
  return context;
}