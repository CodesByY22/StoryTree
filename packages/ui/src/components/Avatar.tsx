import * as React from "react";
import { cn } from "../utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    
    const sizeStyles = {
      sm: "h-8 w-8 text-xs",
      md: "h-12 w-12 text-sm",
      lg: "h-16 w-16 text-base",
      xl: "h-24 w-24 text-xl",
    };

    const baseStyles = "relative inline-flex shrink-0 items-center justify-center rounded-[var(--radius-full)] overflow-hidden bg-[var(--surface-sunken)] border-[var(--border-width-default)] border-[var(--border-base)]";
    
    // Generate initials from fallback string (e.g. "John Doe" -> "JD")
    const getInitials = (name?: string) => {
      if (!name) return "?";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-medium text-[var(--text-muted)]">
            {getInitials(fallback)}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
