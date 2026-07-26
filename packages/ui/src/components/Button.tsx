import * as React from "react";
import { cn } from "../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive" | "success";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-[var(--radius-action)] focus-visible:outline-none focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--focus-ring-color)] focus-visible:ring-offset-[var(--focus-ring-offset)] focus-visible:ring-offset-[var(--surface-base)] disabled:pointer-events-none disabled:bg-[var(--button-disabled-bg)] disabled:text-[var(--button-disabled-text)] disabled:opacity-[var(--button-disabled-opacity)] transition-all duration-200 border-[var(--button-border-width)] border-transparent active:scale-[0.98]";
    
    const sizeStyles = {
      sm: "h-[var(--button-height-sm)] px-[var(--button-padding-x)] text-[var(--type-ui-sm)]",
      md: "h-[var(--button-height-md)] px-[var(--button-padding-x)] text-[var(--type-ui-base)]",
      lg: "h-[var(--button-height-lg)] px-[var(--space-6)] text-[var(--type-ui-md)]",
    };

    const variantStyles = {
      primary: "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] border-[var(--button-primary-border)] hover:bg-[var(--button-primary-hover)] active:bg-[var(--button-primary-active)] shadow-sm hover:shadow-md",
      secondary: "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border-[var(--button-secondary-border)] hover:bg-[var(--button-secondary-hover)] active:bg-[var(--button-secondary-active)] shadow-sm hover:shadow-md",
      ghost: "bg-transparent text-[var(--button-ghost-text)] border-transparent hover:bg-[var(--button-ghost-hover)] active:bg-[var(--button-ghost-active)]",
      outline: "bg-transparent text-[var(--button-outline-text)] border-[var(--button-outline-border)] hover:bg-[var(--button-outline-hover)] active:bg-[var(--button-outline-active)]",
      destructive: "bg-[var(--button-destructive-bg)] text-[var(--button-destructive-text)] border-[var(--button-destructive-bg)] hover:bg-[var(--button-destructive-hover)] active:bg-[var(--button-destructive-active)] shadow-sm hover:shadow-md",
      success: "bg-[var(--button-success-bg)] text-[var(--button-success-text)] border-[var(--button-success-bg)] hover:bg-[var(--button-success-hover)] active:bg-[var(--button-success-active)] shadow-sm hover:shadow-md"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
