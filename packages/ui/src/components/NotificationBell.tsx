"use client";

import React from "react";
import { cn } from "../utils/cn";

export interface NotificationBellProps {
  unreadCount: number;
  className?: string;
}

export function NotificationBell({ unreadCount, className }: NotificationBellProps) {
  return (
    <a
      href="/notifications"
      className={cn(
        "relative p-2 rounded-full hover:bg-[var(--surface-sunken)] transition-colors inline-flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-base)]",
        className
      )}
      aria-label={`Notifications (${unreadCount} unread)`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-[var(--surface-base)]">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </a>
  );
}
