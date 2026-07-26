# Authentication Architecture

StoryTree uses Better Auth as the primary authentication provider.

## Authentication Flow

The flow of an authentication request ensures complete security, session persistence, and type safety across the monorepo.

```
Request (from Client)
      ↓
Middleware (Next.js - validates session and protects routes like /dashboard and /onboarding)
      ↓
Better Auth (Handles core auth logic, token generation, and validation)
      ↓
Prisma Adapter (Translates Better Auth operations to Prisma queries)
      ↓
PostgreSQL (Stores User, Session, Account, and Verification data)
      ↓
Session (Returned to client via cookies)
      ↓
Protected Route (Client accesses route or gets redirected to /auth/login)
```

## Environment Variables
The application strictly validates the following variables at runtime using Zod (`apps/web/lib/env.ts`):
- `DATABASE_URL`: Connection string for PostgreSQL.
- `BETTER_AUTH_SECRET`: Used to sign cookies and tokens.
- `BETTER_AUTH_URL`: The base URL of the application.

## Packages
- **`apps/web`**: Contains the Next.js app, middleware, and `/auth` routes.
- **`packages/db`**: Contains the Prisma schema (`schema.prisma`) and exports the generated Prisma Client.

## Onboarding
After successful signup, users are redirected to `/onboarding` to complete their profile (Username, Display Name, Bio, Favorite Genres). This ensures that every active user in the system has a completed base profile before accessing the main dashboard.
