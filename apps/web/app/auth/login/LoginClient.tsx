"use client";

import { useState } from "react";
import { signIn } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Text } from "@repo/ui";
import Link from "next/link";

export default function LoginClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await signIn.email({
            email,
            password,
        });

        if (error) {
            setError(error.message || "Invalid credentials");
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <main className="min-h-screen bg-[var(--surface-sunken)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold text-[var(--text-primary)]">Welcome back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-[var(--semantic-error)]/10 text-[var(--semantic-error)] text-sm p-3 rounded-[var(--radius-action)]">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-[var(--border-subtle)] pt-4 mt-2">
                    <Text size="sm" className="text-[var(--text-secondary)]">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="text-[var(--interactive-default)] hover:text-[var(--interactive-hover)] font-medium">
                            Sign up
                        </Link>
                    </Text>
                </CardFooter>
            </Card>
        </main>
    );
}
