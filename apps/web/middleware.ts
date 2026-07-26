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

    let response = NextResponse.next();

    if (isProtectedRoute && !session) {
        response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else if (isAuthRoute && session) {
        response = NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Apply basic security headers
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Setup a strict CSP but allow Sentry, PostHog, Vercel, Cloudinary etc.
    // For a real production app, this would be highly tuned.
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://us.i.posthog.com https://browser.sentry-cdn.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://res.cloudinary.com https://avatars.githubusercontent.com https://lh3.googleusercontent.com;
      font-src 'self' data:;
      connect-src 'self' https://us.i.posthog.com https://*.sentry.io;
    `.replace(/\s{2,}/g, ' ').trim();
    
    response.headers.set('Content-Security-Policy', csp);

    return response;
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
