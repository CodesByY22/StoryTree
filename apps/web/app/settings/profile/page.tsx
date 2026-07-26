"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, Text, Heading } from "@repo/ui";
import { useSession } from "../../../lib/auth-client";
import { updateProfile } from "../../actions/user";

export default function SettingsProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        bio: "",
        favoriteGenres: "",
    });

    useEffect(() => {
        if (session?.user) {
            const user = session.user as Record<string, unknown>;
            setFormData({
                username: (user.username as string) || "",
                displayName: (user.displayName as string) || session.user.name || "",
                bio: (user.bio as string) || "",
                favoriteGenres: (user.favoriteGenres as string) || "",
            });
        } else if (!isPending) {
            router.push("/auth/login");
        }
    }, [session, isPending, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (!session?.user?.id) return;

        try {
            await updateProfile(session.user.id, {
                username: formData.username,
                displayName: formData.displayName,
                bio: formData.bio,
                favoriteGenres: formData.favoriteGenres,
            });
            
            setSuccessMessage("Profile updated successfully!");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "An error occurred.");
            } else {
                setError("An error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (isPending || !session) {
        return (
            <main className="min-h-screen bg-[var(--surface-base)] flex items-center justify-center">
                <Text>Loading...</Text>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--surface-base)] p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <Heading level="h2" className="text-3xl font-bold">Profile Settings</Heading>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Public Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 p-3 bg-[var(--badge-error-bg)] text-[var(--badge-error-text)] text-sm rounded">
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="mb-4 p-3 bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] text-sm rounded">
                                {successMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
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
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input
                                    id="bio"
                                    type="text"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="favoriteGenres">Favorite Genres (comma separated)</Label>
                                <Input
                                    id="favoriteGenres"
                                    type="text"
                                    value={formData.favoriteGenres}
                                    onChange={(e) => setFormData({ ...formData, favoriteGenres: e.target.value })}
                                />
                            </div>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
