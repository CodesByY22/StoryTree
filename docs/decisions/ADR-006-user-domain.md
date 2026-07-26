# ADR 006: User Domain Architecture & JSON Preferences

## Context
StoryTree requires a robust User Domain to handle profile configuration, onboarding, public viewing, and application preferences. As a startup product, the exact requirements for "Preferences" (e.g., theme, email notifications, privacy toggles, layout settings) will rapidly evolve.

## Decision
1. **JSON Preferences Column**: Instead of creating a separate `UserPreferences` relational table or explicitly defining dozens of boolean columns in the `User` model, we added a `preferences Json?` column to PostgreSQL via Prisma.
2. **Server Actions**: Profile updates are executed strictly through Next.js Server Actions (`apps/web/app/actions/user.ts`) rather than traditional API routes to optimize for type safety and `revalidatePath` caching behaviors.
3. **Session Enrichment**: We extended Better Auth's session payload to include `username` and `displayName` natively.

## Rationale
- **Flexibility**: The `Json` column allows frontend and product teams to introduce new preferences without requiring a database migration every time a new setting is added.
- **Performance**: Exposing `username` within the Better Auth session token avoids an expensive secondary database lookup on every page load just to render the user's avatar/name in the navbar.
- **Simplicity**: Next.js Server Actions drastically simplify form submission state, removing the need for `fetch` boilerplate while natively supporting robust cache invalidation.

## Consequences
- The `preferences` field must be validated at the application level (e.g. via Zod) before insertion, since the database will not enforce a specific schema.
- We must ensure we do not expose sensitive settings into the Better Auth public session.
