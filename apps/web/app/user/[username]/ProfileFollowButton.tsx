"use client";

import React from "react";
import { FollowButton } from "@repo/ui";
import { toggleFollow } from "../../actions/social";
import { useRouter } from "next/navigation";

export function ProfileFollowButton({ userId, initialIsFollowing }: { userId: string; initialIsFollowing: boolean }) {
  const router = useRouter();

  const handleFollowToggle = async (id: string) => {
    try {
      await toggleFollow(id);
    } catch (err) {
      if (err instanceof Error && err.message === "Unauthorized") {
        router.push("/auth/login");
        throw err; // Re-throw to cancel optimistic update
      }
      throw err;
    }
  };

  return <FollowButton userId={userId} isFollowing={initialIsFollowing} onFollowToggle={handleFollowToggle} />;
}
