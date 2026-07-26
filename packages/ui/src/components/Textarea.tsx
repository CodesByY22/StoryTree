import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`
          flex w-full rounded-[var(--radius-action)] 
          bg-[var(--input-bg)] 
          border-[length:var(--input-border-width)] border-[var(--input-border)]
          min-h-[var(--input-height-md)] 
          px-[var(--input-padding-x)] py-3
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
Textarea.displayName = "Textarea";
