/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getDiscoveryData } from "../actions/search";
import { getTrendingStories, getPersonalizedFeed } from "../actions/recommendations";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { StoryCard, AuthorCard, GenreChip, Text, Button, RecommendationCarousel, TrendingCard } from "@repo/ui";
import Link from "next/link";
import { Metadata } from "next";
import { AppNavbar } from "../components/AppNavbar";

export const metadata: Metadata = {
  title: "Discover - StoryTree",
  description: "Discover trending stories, popular genres, and featured authors on StoryTree.",
};

export default async function DiscoverPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const [data, trending, personalized] = await Promise.all([
    getDiscoveryData(),
    getTrendingStories(10),
    session?.user?.id ? getPersonalizedFeed(session.user.id, 10) : Promise.resolve([]),
  ]);

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <AppNavbar />

      <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Text className="text-3xl font-bold mb-2">Discover</Text>
            <Text className="text-[var(--text-muted)] max-w-xl">Explore the most engaging stories, find your next favorite author, or dive into a new genre.</Text>
          </div>
          <Link href="/search">
            <Button variant="primary">Search StoryTree</Button>
          </Link>
        </header>

        {/* Personalized Feed (For You) */}
        {personalized.length > 0 && (
          <section>
            <Text className="text-2xl font-bold mb-6">For You</Text>
            <RecommendationCarousel>
              {personalized.map((story) => (
                <Link href={`/story/${story.id}`} key={story.id} className="block group h-full">
                  <StoryCard
                    id={story.id}
                    title={story.title}
                    snippet={story.content.substring(0, 100)}
                    authorName={story.author.name}
                    authorAvatar={story.author.image || null}
                    publishedAt={story.publishedAt || new Date()}
                    likesCount={story._count.likes}
                    bookmarksCount={story._count.bookmarks}
                    isLiked={false}
                    isBookmarked={false}
                  />
                </Link>
              ))}
            </RecommendationCarousel>
          </section>
        )}

        {/* Trending Stories */}
        {trending.length > 0 && (
          <section>
            <Text className="text-2xl font-bold mb-6">Trending on StoryTree</Text>
            <RecommendationCarousel>
              {trending.map((story, index) => (
                <TrendingCard
                  key={story.id}
                  id={story.id}
                  rank={index + 1}
                  title={story.title}
                  authorName={story.author.name}
                  genre={story.genre}
                  likesCount={story._count.likes}
                  commentsCount={story._count.comments}
                />
              ))}
            </RecommendationCarousel>
          </section>
        )}

        {/* Popular Genres & Recommended Tags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <Text className="text-xl font-bold mb-6">Popular Genres</Text>
            <div className="flex flex-wrap gap-3">
              {data.popularGenres.map((genre: string) => (
                <Link href={`/search?q=${encodeURIComponent(genre)}`} key={genre}>
                  <GenreChip genre={genre} />
                </Link>
              ))}
            </div>
          </section>

          <section>
            <Text className="text-xl font-bold mb-6">Recommended Tags</Text>
            <div className="flex flex-wrap gap-3">
              {data.recommendedTags.map((tag: string) => (
                <Link href={`/search?q=${encodeURIComponent(tag)}`} key={tag}>
                  <GenreChip genre={`#${tag}`} />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Featured Authors */}
        {data.featuredAuthors.length > 0 && (
          <section>
            <Text className="text-2xl font-bold mb-6">Featured Authors</Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.featuredAuthors.map((author: any) => (
                <Link href={`/user/${(author as any).username}`} key={(author as any).id} className="block">
                  <AuthorCard
                    id={(author as any).id}
                    name={(author as any).name}
                    username={(author as any).username || ""}
                    image={(author as any).image || null}
                    bio={(author as any).bio || null}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recently Published */}
        {data.recent.length > 0 && (
          <section>
            <Text className="text-2xl font-bold mb-6">Recently Published</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.recent.map((story: any) => (
                <Link href={`/story/${(story as any).id}`} key={(story as any).id} className="block group">
                  <StoryCard
                    id={(story as any).id}
                    title={(story as any).title}
                    snippet={(story as any).content.substring(0, 100)}
                    authorName={(story as any).author.name}
                    authorAvatar={(story as any).author.image || null}
                    publishedAt={(story as any).publishedAt || new Date()}
                    likesCount={(story as any).likes.length}
                    bookmarksCount={(story as any).bookmarks.length}
                    isLiked={false}
                    isBookmarked={false}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
