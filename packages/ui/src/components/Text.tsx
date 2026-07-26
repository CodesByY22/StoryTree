import * as React from "react";
import { cn } from "../utils/cn";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  variant?: "primary" | "secondary" | "tertiary" | "disabled" | "inverse" | "accent" | "story";
  size?: "xs" | "sm" | "base" | "md" | "lg" | "story" | "story-mobile";
  font?: "sans" | "story" | "mono";
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = "p", variant = "primary", size = "base", font = "sans", ...props }, ref) => {
    
    const fontStyles = {
      sans: "font-[var(--font-sans)]",
      story: "font-[var(--font-story)]",
      mono: "font-[var(--font-mono)]",
    };

    const sizeStyles = {
      xs: "text-[var(--type-ui-xs)]",
      sm: "text-[var(--type-ui-sm)]",
      base: "text-[var(--type-ui-base)]",
      md: "text-[var(--type-ui-md)]",
      lg: "text-[var(--type-ui-lg)]",
      story: "text-[var(--type-story-body)]",
      "story-mobile": "text-[var(--type-story-body-mobile)]",
    };

    const variantStyles = {
      primary: "text-[var(--text-primary)]",
      secondary: "text-[var(--text-secondary)]",
      tertiary: "text-[var(--text-tertiary)]",
      disabled: "text-[var(--text-disabled)]",
      inverse: "text-[var(--text-inverse)]",
      accent: "text-[var(--text-accent)]",
      story: "text-[var(--text-story)]",
    };

    return (
      <Component
        ref={ref}
        className={cn(fontStyles[font], sizeStyles[size], variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";
