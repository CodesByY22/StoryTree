"use client";

import React from "react";
import { Avatar } from "./Avatar";
import { Text } from "./Text";
import { cn } from "../utils/cn";

export interface NotificationItemProps {
  id: string;
  type: "FOLLOW" | "LIKE" | "COMMENT" | "REPLY";
  actorName: string;
  actorUsername: string;
  actorAvatar?: string | null;
  storyTitle?: string | null;
  storyId?: string | null;
  isRead: boolean;
  createdAt: Date;
  onRead?: (id: string) => Promise<void>;
  className?: string;
}

export function NotificationItem({
  id,
  type,
  actorName,
  actorUsername,
  actorAvatar,
  storyTitle,
  storyId,
  isRead,
  createdAt,
  onRead,
  className,
}: NotificationItemProps) {
  let message = "";
  let linkTarget = `/user/${actorUsername}`;

  switch (type) {
    case "FOLLOW":
      message = "started following you";
      break;
    case "LIKE":
      message = "liked your story";
      if (storyId) linkTarget = `/story/${storyId}`;
      break;
    case "COMMENT":
      message = "commented on your story";
      if (storyId) linkTarget = `/story/${storyId}`;
      break;
    case "REPLY":
      message = "replied to your comment";
      if (storyId) linkTarget = `/story/${storyId}`;
      break;
  }

  const handleClick = () => {
    if (!isRead && onRead) {
      onRead(id).catch(console.error);
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(createdAt);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg transition-colors border",
        isRead
          ? "bg-[var(--surface-base)] border-transparent"
          : "bg-[var(--surface-sunken)] border-[var(--primary)]/20 shadow-sm",
        className
      )}
    >
      <a href={`/user/${actorUsername}`} className="shrink-0" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Avatar src={actorAvatar || null} fallback={actorName[0] || "?"} size="md" />
      </a>
      
      <a href={linkTarget} className="flex-1 min-w-0 flex flex-col gap-1 cursor-pointer">
        <Text className="text-sm">
          <span className="font-bold">{actorName}</span> {message}
          {storyTitle && (
            <span className="font-medium text-[var(--text-secondary)]">
              {" "}
              &quot;{storyTitle}&quot;
            </span>
          )}
        </Text>
        <Text className="text-xs text-[var(--text-muted)]">{formattedDate}</Text>
      </a>
      
      {!isRead && (
        <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
      )}
    </div>
  );
}
