# ADR 005: Authentication Architecture

## Decision
We will use **Better Auth** with a **Shared Prisma Client** connected to **PostgreSQL**, configured within a dedicated `@repo/db` package.

## Context
StoryTree requires a robust, scalable authentication foundation that provides absolute data ownership, type safety, and local database integration. Milestone 0.5 established the need for runtime environment validation and a dedicated onboarding flow to capture initial profile data.

## Reasoning
1. **Better Auth:** Chose over Auth.js and Clerk due to native Prisma adapters, full data ownership, lack of third-party webhook sync race conditions, and excellent type safety.
2. **PostgreSQL:** Selected as the production database because it handles relational data securely and supports Prisma's robust migrations, scaling much better than SQLite.
3. **`packages/db`:** A dedicated package allows the Next.js frontend (and the future NestJS backend) to share the exact same Prisma Client, schema, and migrations. This enforces a single source of truth for the database across the monorepo.
4. **Environment Validation:** Zod is used to fail fast if required environment variables (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`) are missing, preventing silent failures.

## Future Extensibility
The `User` schema has been extended with onboarding fields (`username`, `displayName`, `bio`, `favoriteGenres`) to support the user domain. By keeping the authentication logic in Better Auth and the schema in `@repo/db`, we can easily add OAuth providers (Google, GitHub) or complex profile relations later.
