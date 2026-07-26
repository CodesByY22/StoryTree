"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent, Text } from "@repo/ui";
import { useSession } from "../../lib/auth-client";

import { updateProfile } from "../actions/user";

export default function OnboardingClient() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        bio: "",
        favoriteGenres: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!session?.user?.id) {
            setError("User not authenticated.");
            setLoading(false);
            return;
        }

        try {
            await updateProfile(session.user.id, {
                username: formData.username,
                displayName: formData.displayName || session.user.name,
                bio: formData.bio,
                favoriteGenres: formData.favoriteGenres,
            });
            
            router.push("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "An error occurred during onboarding.");
            } else {
                setError("An error occurred during onboarding.");
            }
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <main className="min-h-screen bg-[var(--surface-sunken)] flex items-center justify-center">
                <Text>Loading...</Text>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--surface-sunken)] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold text-[var(--text-primary)]">Welcome to StoryTree</CardTitle>
                    <CardDescription>Let&apos;s set up your profile</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 p-3 bg-[var(--badge-error-bg)] text-[var(--badge-error-text)] text-sm rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="storyteller99"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input
                                id="displayName"
                                type="text"
                                placeholder="John Doe"
                                value={formData.displayName || session?.user?.name || ""}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Input
                                id="bio"
                                type="text"
                                placeholder="Tell us about yourself..."
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="favoriteGenres">Favorite Genres</Label>
                            <Input
                                id="favoriteGenres"
                                type="text"
                                placeholder="Fantasy, Sci-Fi, Mystery..."
                                value={formData.favoriteGenres}
                                onChange={(e) => setFormData({ ...formData, favoriteGenres: e.target.value })}
                            />
                        </div>
                        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                            {loading ? "Saving..." : "Continue"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
