"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";

export async function getFeed(userId: string | null | undefined, cursor?: string, limit: number = 10) {
  const stories = await prisma.story.findMany({
    take: limit + 1,
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1, // skip the cursor itself
    }),
    include: {
      author: {
        select: {
          name: true,
          username: true,
          image: true,
          displayName: true,
        },
      },
      _count: {
        select: { likes: true, bookmarks: true },
      },
      ...(userId && {
        likes: { where: { userId } },
        bookmarks: { where: { userId } },
      }),
    },
  });

  let nextCursor: typeof cursor = undefined;
  if (stories.length > limit) {
    const nextItem = stories.pop();
    nextCursor = nextItem?.id;
  }

  const feed = stories.map((story) => ({
    id: story.id,
    title: story.title,
    snippet: story.content.substring(0, 150) + (story.content.length > 150 ? "..." : ""),
    authorName: story.author.displayName || story.author.name || story.author.username || "Unknown Writer",
    authorAvatar: story.author.image,
    publishedAt: story.publishedAt || story.createdAt,
    likesCount: story._count.likes,
    bookmarksCount: story._count.bookmarks,
    isLiked: userId && "likes" in story ? (story.likes as unknown[]).length > 0 : false,
    isBookmarked: userId && "bookmarks" in story ? (story.bookmarks as unknown[]).length > 0 : false,
  }));

  return { feed, nextCursor };
}

export async function toggleLike(storyId: string, userId: string) {
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.like.findUnique({
    where: {
      storyId_userId: { storyId, userId },
    },
  });

  if (existing) {
    await prisma.like.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.like.create({
      data: { storyId, userId },
    });
  }
}

export async function toggleBookmark(storyId: string, userId: string) {
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.bookmark.findUnique({
    where: {
      storyId_userId: { storyId, userId },
    },
  });

  if (existing) {
    await prisma.bookmark.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.bookmark.create({
      data: { storyId, userId },
    });
  }
}
