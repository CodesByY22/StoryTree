import * as React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center rounded-[var(--radius-full)] border-[var(--badge-border-width)] border-transparent px-[var(--badge-padding-x)] h-[var(--badge-height)] text-[var(--type-ui-xs)] font-semibold transition-colors focus:outline-none focus:ring-[var(--focus-ring-width)] focus:ring-[var(--focus-ring-color)] focus:ring-offset-[var(--focus-ring-offset)]";
    
    const variantStyles = {
      default: "bg-[var(--badge-default-bg)] text-[var(--badge-default-text)]",
      success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]",
      warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]",
      error: "bg-[var(--badge-error-bg)] text-[var(--badge-error-text)]",
      info: "bg-[var(--badge-info-bg)] text-[var(--badge-info-text)]",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
