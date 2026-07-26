import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "better-auth/types";

const protectedRoutes = ["/dashboard", "/onboarding"];
const authRoutes = ["/auth/login", "/auth/signup"];

export default async function authMiddleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => pathName.startsWith(route));
    const isAuthRoute = authRoutes.some((route) => pathName.startsWith(route));

    if (!isProtectedRoute && !isAuthRoute) {
        return NextResponse.next();
    }

    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding/:path*", "/auth/login", "/auth/signup"],
};
