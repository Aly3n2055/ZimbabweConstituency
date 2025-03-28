import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTooltips } from "@/hooks/use-tooltips";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ContextualTooltipProps {
  id: string;
  children: React.ReactNode;
  title?: string;
  description: string | React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  contentClassName?: string;
  showArrow?: boolean;
  showClose?: boolean;
  forceShow?: boolean;
}

export function ContextualTooltip({
  id,
  children,
  title,
  description,
  side = "bottom",
  align = "center",
  className,
  contentClassName,
  showArrow = true,
  showClose = true,
  forceShow = false,
}: ContextualTooltipProps) {
  const { tooltips, dismissTooltip } = useTooltips();
  const [open, setOpen] = React.useState(false);
  
  // Only show tooltip if:
  // 1. It's marked as active in the tooltips context
  // 2. Or if forceShow is true (for testing or specific cases)
  const shouldShow = tooltips[id] || forceShow;

  // Toggle open state when shouldShow changes
  React.useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500); // Small delay to avoid immediate popup
      return () => clearTimeout(timer);
    } else {
      setOpen(false);
    }
  }, [shouldShow]);

  // Handle dismiss
  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dismissTooltip(id);
    setOpen(false);
  };

  if (!shouldShow) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <div className={cn("relative", className)}>
            {children}
            {!open && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(
            "bg-primary text-primary-foreground p-4 max-w-xs z-50 shadow-lg rounded-lg",
            showClose ? "pr-8" : "",
            contentClassName
          )}
          sideOffset={8}
        >
          {showClose && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
          {title && <div className="font-bold mb-1">{title}</div>}
          <div className="text-sm">{description}</div>
          {!showClose && (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 border-primary-foreground/30 text-primary-foreground"
              onClick={handleDismiss}
            >
              Got it
            </Button>
          )}
          {showArrow && (
            <div className="tooltip-arrow" data-side={side} data-align={align} />
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}