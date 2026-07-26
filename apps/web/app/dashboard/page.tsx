"use client";

import { useSession, signOut } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Text, Heading } from "@repo/ui";

export default function DashboardPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login");
                },
            },
        });
    };

    if (isPending) {
        return (
            <main className="min-h-screen bg-[var(--surface-base)] flex items-center justify-center">
                <Text>Loading dashboard...</Text>
            </main>
        );
    }

    if (!session) {
        return null; // Middleware will handle redirect, but we return null just in case
    }

    return (
        <main className="min-h-screen bg-[var(--surface-base)] p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <Heading level="h1">Dashboard</Heading>
                        <Text className="text-[var(--text-secondary)] mt-1">
                            Welcome back, {session.user.name}!
                        </Text>
                    </div>
                    <Button variant="outline" onClick={handleSignOut}>
                        Sign out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div>
                                <Text size="sm" className="text-[var(--text-secondary)] font-medium">Account ID</Text>
                                <Text className="font-mono text-sm break-all">{session.user.id}</Text>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Your Stories</CardTitle>
                            <CardDescription>Recent drafts and publications</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-40 border-2 border-dashed border-[var(--border-subtle)] rounded-[var(--radius-container)]">
                            <Text className="text-[var(--text-tertiary)]">No stories yet</Text>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
