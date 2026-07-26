import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          flex w-full rounded-[var(--radius-action)] 
          bg-[var(--input-bg)] 
          border-[length:var(--input-border-width)] border-[var(--input-border)]
          h-[var(--input-height-md)] 
          px-[var(--input-padding-x)]
          text-[var(--input-text)] 
          placeholder:text-[var(--input-placeholder)]
          transition-colors duration-[var(--input-transition)]
          focus-visible:outline-none 
          focus-visible:border-[var(--input-focus-border)]
          focus-visible:ring-1 focus-visible:ring-[var(--input-focus-ring)]
          disabled:cursor-not-allowed disabled:bg-[var(--input-disabled-bg)] disabled:text-[var(--input-disabled-text)]
          ${className || ""}
        `}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
