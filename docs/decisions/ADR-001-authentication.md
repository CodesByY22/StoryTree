# ADR 001: Authentication Provider

## Decision
We will use **Better Auth** as the primary authentication provider for StoryTree.

## Context
Initial documentation outlined two conflicting authentication strategies: Clerk and Better Auth. Clerk provides a fully managed UI and hosted database, while Better Auth provides an open-source, customizable framework that runs on our own infrastructure.

## Reasoning
1. **Data Ownership:** Better Auth natively integrates with Prisma and stores user data directly in our PostgreSQL database. This gives us complete ownership over our user table without relying on a third-party service's data store.
2. **Race Conditions:** Using Clerk requires syncing their user database to our local database via webhooks. This often leads to race conditions (e.g., a user signs up, gets redirected, but the webhook hasn't fired yet, resulting in a "User not found" error on our backend). Better Auth eliminates this completely.
3. **Cost at Scale:** Better Auth is self-hosted and has zero cost at scale, whereas Clerk pricing scales with MAUs.

## Alternatives Considered
- **Clerk:** Rejected due to webhook sync complexity and data ownership concerns.
- **NextAuth.js (Auth.js):** Better Auth offers better type safety, cleaner API, and superior plugin ecosystem for our stack.
