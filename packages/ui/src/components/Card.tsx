import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-[var(--card-radius)] 
          bg-[var(--card-bg)] 
          text-[var(--text-primary)]
          shadow-sm border border-[var(--border-subtle)]
          transition-all duration-300 ease-out
          ${className || ""}
        `}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col space-y-1.5 p-[var(--card-padding)] ${className || ""}`}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`font-semibold leading-none tracking-tight ${className || ""}`}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-sm text-[var(--text-secondary)] ${className || ""}`}
        {...props}
      />
    );
  }
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-[var(--card-padding)] pt-0 ${className || ""}`}
        {...props}
      />
    );
  }
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center p-[var(--card-padding)] pt-0 ${className || ""}`}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";
