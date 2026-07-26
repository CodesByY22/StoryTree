import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`
          text-sm font-medium leading-none 
          text-[var(--input-label)]
          peer-disabled:cursor-not-allowed peer-disabled:opacity-70
          ${className || ""}
        `}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";
