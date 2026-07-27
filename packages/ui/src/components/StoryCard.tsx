"use client";
import * as React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./Card";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Text } from "./Text";

export interface StoryCardProps {
  id: string;
  title: string;
  snippet: string;
  authorName: string;
  authorAvatar?: string | null;
  publishedAt: Date;
  likesCount: number;
  bookmarksCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onRead?: (id: string) => void;
}

export const StoryCard = React.forwardRef<HTMLDivElement, StoryCardProps>(
  ({ id, title, snippet, authorName, authorAvatar, publishedAt, likesCount, bookmarksCount, isLiked, isBookmarked, onLike, onBookmark, onRead }, ref) => {
    return (
      <Card ref={ref} className="w-full flex flex-col hover:shadow-xl hover:-translate-y-1 hover:bg-[var(--surface-overlay)] cursor-pointer transition-all duration-300 ease-out">
        <CardHeader className="pb-2 flex flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl line-clamp-2 cursor-pointer" onClick={() => onRead?.(id)}>{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Avatar src={authorAvatar || null} fallback={authorName?.[0] || "?"} size="sm" />
              <Text size="sm" className="text-[var(--text-secondary)]">
                {authorName} &middot; {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(publishedAt)}
              </Text>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <Text className="text-[var(--text-secondary)] line-clamp-3 flex-1 cursor-pointer" onClick={() => onRead?.(id)}>
            {snippet}
          </Text>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onLike?.(id)} className={isLiked ? "text-red-500" : "text-[var(--text-secondary)]"}>
                &hearts; {likesCount}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onBookmark?.(id)} className={isBookmarked ? "text-blue-500" : "text-[var(--text-secondary)]"}>
                &#9733; {bookmarksCount}
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => onRead?.(id)}>
              Read
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
StoryCard.displayName = "StoryCard";

