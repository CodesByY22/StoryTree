/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchBar, StoryCard, AuthorCard, EmptyState, LoadingSkeleton, Text, Button } from "@repo/ui";
import { globalSearch } from "../actions/search";
import Link from "next/link";
type StoryType = { id: string, title: string, content: string, publishedAt?: Date | null, author: { name: string, username: string | null, image?: string | null }, likes?: any[], bookmarks?: any[] };
type AuthorType = { id: string, name: string, username: string | null, image?: string | null, bio?: string | null };

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{ stories: StoryType[]; authors: AuthorType[] }>({ stories: [], authors: [] });
  const [activeTab, setActiveTab] = useState<"all" | "stories" | "authors">("all");

  useEffect(() => {
    if (!initialQuery) {
      setResults({ stories: [], authors: [] });
      return;
    }

    let isMounted = true;
    const performSearch = async () => {
      setIsSearching(true);
      try {
        const res = await globalSearch(initialQuery);
        if (isMounted) setResults(res);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        if (isMounted) setIsSearching(false);
      }
    };

    performSearch();

    return () => { isMounted = false; };
  }, [initialQuery]);

  const handleSearch = (val: string) => {
    setQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set("q", val);
    } else {
      newParams.delete("q");
    }
    router.replace(`/search?${newParams.toString()}`);
  };

  const hasResults = results.stories.length > 0 || results.authors.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Text className="text-3xl font-bold mb-2">Search</Text>
          <Text className="text-[var(--text-muted)]">Find stories, authors, and more.</Text>
        </div>
        <div className="w-full md:w-96">
          <SearchBar 
            placeholder="Search StoryTree..." 
            value={query} 
            onSearch={handleSearch} 
            isLoading={isSearching}
            autoFocus 
          />
        </div>
      </header>

      {/* Tabs */}
      {hasResults && (
        <div className="flex gap-4 mb-8 border-b border-[var(--border-base)] pb-2">
          <button 
            onClick={() => setActiveTab("all")} 
            className={`pb-2 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "all" ? 'border-[var(--button-primary-bg)] text-[var(--button-primary-bg)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            All Results
          </button>
          <button 
            onClick={() => setActiveTab("stories")} 
            className={`pb-2 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "stories" ? 'border-[var(--button-primary-bg)] text-[var(--button-primary-bg)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            Stories ({results.stories.length})
          </button>
          <button 
            onClick={() => setActiveTab("authors")} 
            className={`pb-2 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "authors" ? 'border-[var(--button-primary-bg)] text-[var(--button-primary-bg)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            Authors ({results.authors.length})
          </button>
        </div>
      )}

      {/* Content */}
      {isSearching && !hasResults ? (
        <div className="space-y-8">
          <LoadingSkeleton className="h-40 w-full" />
          <LoadingSkeleton className="h-40 w-full" />
        </div>
      ) : initialQuery && !hasResults ? (
        <EmptyState 
          title="No results found" 
          description={`We couldn't find anything matching "${initialQuery}". Try different keywords.`}
          action={<Button variant="outline" onClick={() => handleSearch("")}>Clear Search</Button>}
        />
      ) : !initialQuery ? (
        <EmptyState 
          title="Search StoryTree" 
          description="Type above to discover new stories and authors."
        />
      ) : (
        <div className="space-y-12">
          {(activeTab === "all" || activeTab === "stories") && results.stories.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <Text className="text-xl font-bold">Stories</Text>
                {activeTab === "all" && results.stories.length > 4 && (
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("stories")}>See all</Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.stories.slice(0, activeTab === "all" ? 4 : undefined).map((story) => (
                  <Link href={`/story/${story.id}`} key={story.id} className="block group">
                    <StoryCard
                      id={story.id}
                      title={story.title}
                      snippet={story.content.substring(0, 100)}
                      authorName={story.author.name}
                      authorAvatar={story.author.image || null}
                      publishedAt={story.publishedAt || new Date()}
                      likesCount={story.likes?.length || 0}
                      bookmarksCount={story.bookmarks?.length || 0}
                      isLiked={false}
                      isBookmarked={false}
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {(activeTab === "all" || activeTab === "authors") && results.authors.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <Text className="text-xl font-bold">Authors</Text>
                {activeTab === "all" && results.authors.length > 4 && (
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("authors")}>See all</Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.authors.slice(0, activeTab === "all" ? 6 : undefined).map((author) => (
                  <AuthorCard
                    key={author.id}
                    id={author.id}
                    name={author.name}
                    username={author.username || ""}
                    image={author.image || null}
                    bio={author.bio || null}
                    onClick={() => router.push(`/user/${author.username || ""}`)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

import { AppNavbar } from "../components/AppNavbar";

export default function SearchClient() {
  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <AppNavbar />

      <Suspense fallback={<div className="max-w-6xl mx-auto p-6 md:p-12"><LoadingSkeleton className="w-full h-32 rounded-xl" /></div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
