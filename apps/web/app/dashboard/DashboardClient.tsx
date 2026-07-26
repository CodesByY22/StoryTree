"use client";

import { useSession } from "../../lib/auth-client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, Text, Heading, ContinueReadingCard, AuthorSuggestionCard } from "@repo/ui";
import { AppNavbar } from "../components/AppNavbar";
import { getContinueReading, getRecommendedAuthors } from "../actions/recommendations";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardClient() {
    const { data: session, isPending } = useSession();

    const [continueReading, setContinueReading] = useState<{ storyId: string, progress: number, story: { title: string, coverImage: string | null, author: { name: string } } } | null>(null);
    const [recommendedAuthors, setRecommendedAuthors] = useState<Array<{ id: string, name: string, username: string | null, image: string | null, bio: string | null, _count: { followers: number } }>>([]);

    useEffect(() => {
        if (session?.user?.id) {
            getContinueReading(session.user.id).then(setContinueReading).catch(console.error);
            getRecommendedAuthors(session.user.id, 3).then(setRecommendedAuthors).catch(console.error);
        }
    }, [session?.user?.id]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-[var(--surface-base)]">
                <AppNavbar />
                <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-8 animate-pulse">
                    <div className="h-10 bg-[var(--surface-sunken)] rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-[var(--surface-sunken)] rounded w-1/3"></div>
                    <div className="h-40 bg-[var(--surface-sunken)] rounded mt-8"></div>
                </main>
            </div>
        );
    }

    if (!session) {
        return null; // Middleware will handle redirect, but we return null just in case
    }

    return (
        <div className="min-h-screen bg-[var(--surface-base)]">
            <AppNavbar />
            <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
            <div className="space-y-12">
                    <div>
                        <Heading level="h1">Dashboard</Heading>
                        <Text className="text-[var(--text-secondary)] mt-2">
                            Welcome back, {session.user.name}!
                        </Text>
                    </div>
                {continueReading && (
                    <section className="space-y-4">
                        <Heading level="h3">Continue Reading</Heading>
                        <Link href={`/story/${continueReading.storyId}`} className="block">
                            <ContinueReadingCard
                                storyId={continueReading.storyId}
                                title={continueReading.story.title}
                                authorName={continueReading.story.author.name}
                                progress={continueReading.progress}
                                coverImage={continueReading.story.coverImage}
                            />
                        </Link>
                    </section>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Text size="sm" className="text-[var(--text-secondary)] font-medium">Name</Text>
                                <Text>{session.user.name}</Text>
                            </div>
                            <div>
                                <Text size="sm" className="text-[var(--text-secondary)] font-medium">Email</Text>
                                <Text>{session.user.email}</Text>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Your Stories</CardTitle>
                            <CardDescription>Recent drafts and publications</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-[var(--border-subtle)] rounded-[var(--radius-container)] bg-[var(--surface-sunken)] m-6 mt-0 space-y-3">
                            <Text className="text-[var(--text-tertiary)] text-center">No stories yet.<br/>Every forest begins with a seed.</Text>
                            <Link href="/editor/new">
                                <button className="text-sm font-medium text-[var(--color-green-500)] hover:text-[var(--color-green-600)] transition-colors">Write your first story &rarr;</button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {recommendedAuthors.length > 0 && (
                    <section className="space-y-6 pt-8 border-t border-[var(--border-subtle)]">
                        <Heading level="h3">Writers you might like</Heading>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {recommendedAuthors.map(author => (
                                <AuthorSuggestionCard
                                    key={author.id}
                                    id={author.id}
                                    name={author.name}
                                    username={author.username || ""}
                                    image={author.image || null}
                                    bio={author.bio || null}
                                    followersCount={author._count.followers}
                                    href={`/user/${author.username}`}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
        </div>
    );
}
