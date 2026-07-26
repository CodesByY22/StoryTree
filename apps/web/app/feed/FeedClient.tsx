"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { StoryCard, Text, Heading } from "@repo/ui";
import { getFeed, toggleLike, toggleBookmark } from "../actions/feed";
import { useRouter } from "next/navigation";

// Define the shape based on our server action return type
type FeedItem = {
  id: string;
  title: string;
  snippet: string;
  authorName: string;
  authorAvatar: string | null;
  publishedAt: Date;
  likesCount: number;
  bookmarksCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

interface FeedClientProps {
  initialData: FeedItem[];
  initialCursor?: string | undefined;
  userId?: string | undefined;
}

export function FeedClient({ initialData, initialCursor, userId }: FeedClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<FeedItem[]>(initialData);
  const [cursor, setCursor] = useState<string | undefined>(initialCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialCursor);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { feed, nextCursor } = await getFeed(userId, cursor, 10);
      setItems((prev) => [...prev, ...feed]);
      setCursor(nextCursor);
      setHasMore(!!nextCursor);
    } catch (err) {
      console.error("Failed to fetch more stories", err);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore, userId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchMore, hasMore]);

  const handleLike = async (storyId: string) => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }
    
    // Optimistic Update
    setItems((prev) =>
      prev.map((item) =>
        item.id === storyId
          ? {
              ...item,
              isLiked: !item.isLiked,
              likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1,
            }
          : item
      )
    );

    try {
      await toggleLike(storyId, userId);
    } catch (err) {
      console.error("Failed to toggle like", err);
      // Revert optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item.id === storyId
            ? {
                ...item,
                isLiked: !item.isLiked,
                likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1,
              }
            : item
        )
      );
    }
  };

  const handleBookmark = async (storyId: string) => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    // Optimistic Update
    setItems((prev) =>
      prev.map((item) =>
        item.id === storyId
          ? {
              ...item,
              isBookmarked: !item.isBookmarked,
              bookmarksCount: item.isBookmarked
                ? item.bookmarksCount - 1
                : item.bookmarksCount + 1,
            }
          : item
      )
    );

    try {
      await toggleBookmark(storyId, userId);
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
      // Revert optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item.id === storyId
            ? {
                ...item,
                isBookmarked: !item.isBookmarked,
                bookmarksCount: item.isBookmarked
                  ? item.bookmarksCount - 1
                  : item.bookmarksCount + 1,
              }
            : item
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <Heading level="h1" className="mb-4">Discover Stories</Heading>
      {items.length === 0 ? (
        <Text className="text-[var(--text-secondary)]">No stories found. Be the first to write one!</Text>
      ) : (
        items.map((item) => (
          <StoryCard
            key={item.id}
            {...item}
            onLike={handleLike}
            onBookmark={handleBookmark}
            onRead={() => router.push(`/story/${item.id}`)}
          />
        ))
      )}

      {hasMore && (
        <div ref={observerTarget} className="h-10 flex items-center justify-center">
          {loading && <Text size="sm" className="text-[var(--text-secondary)]">Loading more...</Text>}
        </div>
      )}
    </div>
  );
}
