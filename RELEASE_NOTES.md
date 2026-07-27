# StoryTree v1.0.0 (MVP Release)

We are thrilled to announce the official v1.0.0 (MVP) release of **StoryTree**, a revolutionary collaborative storytelling platform where a single writing prompt inspires hundreds of unique stories!

## 🏗 Architecture & Tech Stack

StoryTree is built for speed, scale, and seamless developer experience using a **Modular Monolith** architecture orchestrated by **Turborepo**.

- **Frontend & Routing:** Next.js 15 (App Router)
- **Styling:** Vanilla CSS + custom Design Token system (high performance, zero runtime overhead)
- **Database & ORM:** PostgreSQL + Prisma (version 6.x)
- **Authentication:** Better Auth (Secure, session-based)
- **Background Jobs:** Redis + BullMQ (Feed ranking & Notifications)
- **Media Storage:** Cloudinary
- **Monorepo Management:** pnpm workspaces & Turborepo

## ✨ Core Features Delivered

1. **The Prompt Engine:** Read a prompt and write a story branching from it.
2. **Rich Markdown Editor:** Seamlessly write and format your stories.
3. **Personalized Discovery Feed:** Algorithms rank stories based on community engagement.
4. **Emotional Reactions:** Express your feedback via unique emojis (🌟 Star, ❄️ Chills, 🤯 Mind Blown, ❤️ Moved, 😂 Hilarious, 🌸 Beautiful).
5. **Commenting & Bookmarks:** Engage in threaded discussions and save stories for later.
6. **Robust Data Seeding:** Shipped with a highly realistic English mock data generator (`@faker-js/faker`) to demonstrate the platform at scale.

## 🚀 Performance & Security

- **Strict Typing:** Achieved 100% strict TypeScript compliance across all packages.
- **Linting:** Enforced rigorous ESLint rules (`--max-warnings 0`) guaranteeing code hygiene.
- **Security Audit:** Code of Conduct, Contributing guidelines, and Security policies are firmly established for open-source safety.
- **Component Reusability:** Isolated a comprehensive UI library (`@repo/ui`) ensuring UI/UX consistency across the platform.

## 🧪 Testing & Deployment

- Setup complete for `vitest` unit tests and `playwright` end-to-end tests.
- CI/CD workflow defined via **GitHub Actions** (`ci.yml`) to test and lint on every push.
- Prepared for one-click deployment on **Vercel** with fully documented Environment Variables.

## 🤝 Next Steps

As we transition from MVP into active Beta testing, our immediate roadmap focuses on:
- Migrating the feed aggregation to Redis-backed caching for sub-100ms loads.
- Introducing a richer Tiptap-based story editor.
- Implementing Infinite Scroll on the main feed.

Thank you to all contributors who have made StoryTree's MVP a reality!
