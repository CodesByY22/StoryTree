"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export async function toggleFollow(targetUserId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const followerId = session.user.id;

  if (followerId === targetUserId) {
    throw new Error("You cannot follow yourself");
  }

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId: targetUserId,
      },
    },
  });

  if (existingFollow) {
    // Unfollow
    await prisma.follow.delete({
      where: { id: existingFollow.id },
    });
  } else {
    // Follow
    await prisma.follow.create({
      data: {
        followerId,
        followingId: targetUserId,
      },
    });

    // Create Notification
    await prisma.notification.create({
      data: {
        userId: targetUserId,
        actorId: followerId,
        type: "FOLLOW",
      },
    });
  }

  // Revalidate profile pages and feed
  revalidatePath(`/user/[username]`, "page");
  revalidatePath(`/feed`, "page");
}

export async function checkIsFollowing(targetUserId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) return false;

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: targetUserId,
      },
    },
  });

  return !!follow;
}

export async function getFollowStats(userId: string) {
  const [followers, following] = await Promise.all([
    prisma.follow.count({ where: { followingId: userId } }),
    prisma.follow.count({ where: { followerId: userId } }),
  ]);

  return { followers, following };
}
