"use server";

import { prisma, Prisma } from "@repo/db";

// Common story select to ensure consistent UI across cards
const storySelect = Prisma.validator<Prisma.StorySelect>()({
  id: true,
  title: true,
  content: true,
  coverImage: true,
  genre: true,
  publishedAt: true,
  _count: {
    select: { likes: true, comments: true, bookmarks: true }
  },
  author: {
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
    }
  }
});

export type RecommendedStory = Prisma.StoryGetPayload<{ select: typeof storySelect }>;

/**
 * Gets trending stories based on a composite score of recent engagement.
 * In a production scale app, this would be materialized or computed via raw SQL.
 * For this phase, we fetch recently published stories and sort them in JS.
 */
export async function getTrendingStories(limit = 10) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentStories = await prisma.story.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: {
        gte: thirtyDaysAgo
      }
    },
    select: storySelect,
    take: 100, // Fetch top 100 to sort
  });

  // Calculate score: (Likes * 2) + (Comments * 3) + (Bookmarks * 5)
  // Penalize by days since publication
  const scored = recentStories.map(story => {
    const likesScore = story._count.likes * 2;
    const commentsScore = story._count.comments * 3;
    const bookmarksScore = story._count.bookmarks * 5;
    
    const daysSince = Math.max(1, (new Date().getTime() - (story.publishedAt?.getTime() || 0)) / (1000 * 3600 * 24));
    
    // Base score + Recency bias
    const score = (likesScore + commentsScore + bookmarksScore) / Math.sqrt(daysSince);
    
    return { ...story, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

/**
 * Gets a personalized feed ("For You") for a user.
 */
export async function getPersonalizedFeed(userId: string, limit = 10) {
  // 1. Get User's favorite genres
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { favoriteGenres: true, following: { select: { followingId: true } } }
  });

  const favoriteGenres = user?.favoriteGenres
    ? user.favoriteGenres.split(",").map(g => g.trim()).filter(Boolean)
    : [];
  
  const followedAuthorIds = user?.following.map(f => f.followingId) || [];

  // Fetch stories that match either favorite genres or are from followed authors
  // If the user has neither, it falls back to recent published stories
  const conditions: Prisma.StoryWhereInput[] = [];
  
  if (favoriteGenres.length > 0) {
    conditions.push({ genre: { in: favoriteGenres } });
  }
  
  if (followedAuthorIds.length > 0) {
    conditions.push({ authorId: { in: followedAuthorIds } });
  }

  const stories = await prisma.story.findMany({
    where: {
      status: "PUBLISHED",
      ...(conditions.length > 0 ? { OR: conditions } : {}),
    },
    select: storySelect,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return stories;
}

/**
 * Gets related stories based on the current story's genre or tags
 */
export async function getRelatedStories(storyId: string, limit = 4) {
  const currentStory = await prisma.story.findUnique({
    where: { id: storyId },
    select: { genre: true, tags: true, authorId: true }
  });

  if (!currentStory) return [];

  const conditions: Prisma.StoryWhereInput[] = [];
  if (currentStory.genre) {
    conditions.push({ genre: currentStory.genre });
  }
  if (currentStory.authorId) {
    conditions.push({ authorId: currentStory.authorId });
  }
  if (currentStory.tags && currentStory.tags.length > 0) {
    conditions.push({ tags: { hasSome: currentStory.tags } });
  }

  const related = await prisma.story.findMany({
    where: {
      id: { not: storyId },
      status: "PUBLISHED",
      ...(conditions.length > 0 ? { OR: conditions } : {})
    },
    select: storySelect,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return related;
}

/**
 * Recommends authors to follow
 */
export async function getRecommendedAuthors(userId: string, limit = 5) {
  // Find authors the user is NOT following, who have published stories,
  // ordered by their total followers
  const userFollowing = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true }
  });

  const followingIds = userFollowing.map(f => f.followingId);
  followingIds.push(userId); // Exclude self

  const authors = await prisma.user.findMany({
    where: {
      id: { notIn: followingIds },
      stories: { some: { status: "PUBLISHED" } }
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      _count: {
        select: { followers: true, stories: true }
      }
    },
    orderBy: {
      followers: { _count: 'desc' }
    },
    take: limit
  });

  return authors;
}

/**
 * Gets the user's most recent reading history for "Continue Reading"
 */
export async function getContinueReading(userId: string) {
  const history = await prisma.readingHistory.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      story: {
        select: storySelect
      }
    }
  });

  return history;
}

/**
 * Updates reading progress for a story
 */
export async function updateReadingProgress(storyId: string, userId: string, progress: number) {
  const history = await prisma.readingHistory.upsert({
    where: {
      userId_storyId: {
        userId,
        storyId
      }
    },
    update: {
      progress: Math.max(progress, 0)
    },
    create: {
      userId,
      storyId,
      progress
    }
  });

  return history;
}
