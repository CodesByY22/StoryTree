"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { cn } from "../utils/cn";

export interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
  onFollowToggle?: (userId: string) => Promise<void>;
  className?: string;
  variant?: "primary" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function FollowButton({
  userId,
  isFollowing: initialIsFollowing,
  onFollowToggle,
  className,
  variant = "primary",
  size = "md",
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading || !onFollowToggle) return;

    setLoading(true);
    const originalState = isFollowing;
    // Optimistic update
    setIsFollowing(!originalState);

    try {
      await onFollowToggle(userId);
    } catch (error) {
      // Revert on error
      setIsFollowing(originalState);
      console.error("Follow toggle failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : variant}
      size={size}
      className={cn("min-w-24", className)}
      onClick={handleToggle}
      disabled={loading}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
