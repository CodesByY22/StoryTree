"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, Text } from "@repo/ui";
import { useSession } from "../../../lib/auth-client";
import { createStory } from "../../actions/story";

export default function NewStoryClient() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/auth/login");
        }
    }, [session, isPending, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!session?.user?.id) return;

        try {
            const result = await createStory(session.user.id, title);
            if (result.success && result.story) {
                router.push(`/editor/${result.story.id}`);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Failed to create story");
            } else {
                setError("Failed to create story");
            }
            setLoading(false);
        }
    };

    if (isPending || !session?.user) {
        return (
            <main className="min-h-screen bg-[var(--surface-base)] flex items-center justify-center">
                <Text>Loading...</Text>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--surface-base)] flex items-center justify-center p-6 md:p-12">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Start a New Story</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 p-3 bg-[var(--badge-error-bg)] text-[var(--badge-error-text)] text-sm rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Story Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="The beginning of an epic..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        <Button type="submit" variant="primary" className="w-full" disabled={loading || !title.trim()}>
                            {loading ? "Creating..." : "Create Draft"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
