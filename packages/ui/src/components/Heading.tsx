import * as React from "react";
import { cn } from "../utils/cn";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "primary" | "secondary" | "inverse" | "story";
  font?: "sans" | "display" | "story";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h2", variant = "primary", font = "display", ...props }, ref) => {
    const Component = level;

    const fontStyles = {
      sans: "font-[var(--font-sans)] tracking-tight",
      display: "font-[var(--font-display)]",
      story: "font-[var(--font-story)]",
    };

    const levelStyles = {
      h1: "text-[var(--type-display-xl)] font-bold",
      h2: "text-[var(--type-display-lg)] font-semibold",
      h3: "text-[var(--type-display-md)] font-medium",
      h4: "text-[var(--type-display-sm)] font-medium",
      h5: "text-[var(--type-ui-2xl)] font-medium",
      h6: "text-[var(--type-ui-xl)] font-medium",
    };

    const variantStyles = {
      primary: "text-[var(--text-primary)]",
      secondary: "text-[var(--text-secondary)]",
      inverse: "text-[var(--text-inverse)]",
      story: "text-[var(--text-story)]",
    };

    return (
      <Component
        ref={ref}
        className={cn(fontStyles[font], levelStyles[level], variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";
