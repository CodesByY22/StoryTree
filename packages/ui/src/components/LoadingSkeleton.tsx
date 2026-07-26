import * as React from "react";

export function LoadingSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-[var(--border-base)] rounded-md ${className || ""}`}
      {...props}
    />
  );
}

export function StorySkeleton() {
  return (
    <div className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-base)] space-y-4 w-full">
      <LoadingSkeleton className="h-6 w-3/4" />
      <LoadingSkeleton className="h-4 w-1/2" />
      <LoadingSkeleton className="h-20 w-full" />
      <div className="flex gap-2 pt-2">
        <LoadingSkeleton className="h-8 w-16 rounded-full" />
        <LoadingSkeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function AuthorSkeleton() {
  return (
    <div className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-base)] flex items-start gap-4">
      <LoadingSkeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-5 w-1/3" />
        <LoadingSkeleton className="h-4 w-1/4" />
        <LoadingSkeleton className="h-8 w-full mt-2" />
      </div>
    </div>
  );
}
