"use server";

import { prisma } from "@repo/db";

export async function globalSearch(query: string) {
  if (!query || query.trim().length < 2) {
    return { stories: [], authors: [] };
  }

  try {
    const [stories, authors] = await Promise.all([
      prisma.story.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { genre: { contains: query, mode: "insensitive" } },
            { tags: { hasSome: [query.toLowerCase()] } },
          ],
        },
        include: {
          author: { select: { id: true, name: true, username: true, image: true } },
          likes: { select: { id: true } },
          bookmarks: { select: { id: true } },
        },
        take: 20,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: "insensitive" } },
            { displayName: { contains: query, mode: "insensitive" } },
            { name: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
        take: 20,
      }),
    ]);

    return { stories, authors };
  } catch (error) {
    console.error("Search error:", error);
    return { stories: [], authors: [] };
  }
}

export async function getDiscoveryData() {
  try {
    // 1. Trending Stories (Simulated by recent + most likes)
    const trending = await prisma.story.findMany({
      where: { status: "PUBLISHED" },
      include: {
        author: { select: { id: true, name: true, username: true, image: true } },
        likes: { select: { id: true } },
        bookmarks: { select: { id: true } },
      },
      orderBy: { likes: { _count: "desc" } },
      take: 6,
    });

    // 2. Recently Published
    const recent = await prisma.story.findMany({
      where: { status: "PUBLISHED" },
      include: {
        author: { select: { id: true, name: true, username: true, image: true } },
        likes: { select: { id: true } },
        bookmarks: { select: { id: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 6,
    });

    // 3. Featured Authors (Random or active)
    const featuredAuthors = await prisma.user.findMany({
      where: { stories: { some: { status: "PUBLISHED" } } },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        _count: { select: { stories: { where: { status: "PUBLISHED" } } } }
      },
      orderBy: { stories: { _count: "desc" } },
      take: 8,
    });

    // 4. Popular Genres (hardcoded or distinct from DB)
    const popularGenres = [
      "Fantasy", "Sci-Fi", "Romance", "Mystery", "Thriller", "Horror"
    ];

    // 5. Recommended Tags
    const recommendedTags = ["magic", "space", "dragons", "cyberpunk", "slice-of-life"];

    return { trending, recent, featuredAuthors, popularGenres, recommendedTags };
  } catch (error) {
    console.error("Discovery error:", error);
    return { trending: [], recent: [], featuredAuthors: [], popularGenres: [], recommendedTags: [] };
  }
}
