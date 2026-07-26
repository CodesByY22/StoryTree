import React from "react";
import { cn } from "../utils/cn";

export interface RecommendationCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const RecommendationCarousel = React.forwardRef<HTMLDivElement, RecommendationCarouselProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide",
          className
        )}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        {...props}
      >
        {React.Children.map(children, (child) => (
          <div className="snap-start shrink-0 min-w-[280px] max-w-[320px]">
            {child}
          </div>
        ))}
      </div>
    );
  }
);
RecommendationCarousel.displayName = "RecommendationCarousel";
