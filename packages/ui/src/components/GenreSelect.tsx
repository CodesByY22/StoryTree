import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GENRES = [
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Mystery",
  "Horror",
  "Historical",
  "Literary",
  "Non-Fiction",
  "Poetry",
  "Action & Adventure",
  "Comedy",
  "Drama",
];

interface GenreSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const GenreSelect = React.forwardRef<HTMLSelectElement, GenreSelectProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--input-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        {...props}
      >
        <option value="" disabled>Select a genre...</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    );
  }
);
GenreSelect.displayName = "GenreSelect";
