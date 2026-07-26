# User Domain Architecture

This document describes the structure and behavior of the User Domain within the StoryTree ecosystem.

## Overview
The User Domain manages user identity, public presence, personalized preferences, and authentication onboarding.

## Key Components

### 1. Database Layer (`@repo/db`)
The `User` model is the center of the identity system.
- Standard fields (ID, name, email) are provided by Better Auth.
- Onboarding fields (`username`, `displayName`, `bio`, `favoriteGenres`) store public profile attributes.
- `preferences` is a `Json` column storing unstructured app-level settings (e.g., `{ "theme": "dark" }`), offering flexibility without continuous database migrations.

### 2. Authentication Integration (`apps/web/lib/auth.ts`)
We use Better Auth with the `additionalFields` mapping on the `user` object. This instructs the session endpoint to securely retrieve `username` and `displayName`, eliminating the need to query the database repeatedly just to render the navigation bar.

### 3. Server Actions (`apps/web/app/actions/user.ts`)
Next.js Server Actions (e.g., `updateProfile`) provide secure, server-side execution for mutations. 
- Automatically validate user input.
- Enforce business logic like `username` uniqueness.
- Trigger Next.js `revalidatePath` to instantly refresh caching across the public profile and dashboard.

### 4. UI Components (`@repo/ui`)
- **Avatar**: A standardized, reusable component that displays either a profile image or a generated two-letter initials fallback. It conforms to Design System spacing, radius, and color tokens.

### 5. Routing
- **`/onboarding`**: A gateway for new users to initialize their public profile (intercepted immediately after signup).
- **`/settings/profile`**: The protected dashboard view allowing users to update their details and JSON preferences.
- **`/user/[username]`**: A server-rendered (RSC) public page showcasing a user's details, bio, and genres.
