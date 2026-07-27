"use client";
import * as React from "react";
import { Input } from "./Input";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading, className, value, defaultValue, onChange, ...props }: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState((value || defaultValue || "") as string);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value as string);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) onChange(e);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearch(val);
    }, 400); // 400ms debounce
  };

  const clearSearch = () => {
    setInternalValue("");
    onSearch("");
  };

  return (
    <div className={`relative flex items-center w-full ${className || ""}`}>
      <svg
        className="absolute left-3 w-5 h-5 text-[var(--text-muted)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <Input
        {...props}
        value={internalValue}
        onChange={handleChange}
        className="pl-10 pr-10 rounded-full"
      />
      <div className="absolute right-3 flex items-center gap-2">
        {isLoading && (
          <div className="w-4 h-4 border-2 border-[var(--button-primary-bg)] border-t-transparent rounded-full animate-spin"></div>
        )}
        {internalValue && (
          <button type="button" onClick={clearSearch} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

