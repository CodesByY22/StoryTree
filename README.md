<div align="center">
  
# 🌳 StoryTree

**Every story starts with one idea.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/StoryTree/StoryTree/actions/workflows/ci.yml/badge.svg)](https://github.com/StoryTree/StoryTree/actions)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-1B222D?logo=prisma)](https://www.prisma.io/)

*A collaborative storytelling platform where a single writing prompt inspires hundreds of unique stories.*

![Hero Image Placeholder](https://via.placeholder.com/1200x600?text=StoryTree+Hero+Image)

[Live Demo](#-live-demo) • [Installation](#-installation) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 🌟 Feature Overview

StoryTree revolves around **creative prompts**. Instead of endless social posts, writers are challenged to interpret a single idea. 

- **🌲 The Prompt Engine:** One seed prompt branches out into hundreds of unique stories (e.g. A horror writer sees fear, a sci-fi writer imagines the future).
- **📝 Rich Story Editor:** Write in full Markdown.
- **🧭 Discovery Feed:** Personalized, ranked recommendations powered by PostgreSQL and background processing.
- **💬 Community Interaction:** Inline comments, bookmarking, and emotional reactions (🌟 Star, ❄️ Chills, 🤯 Mind Blown).
- **🔔 Real-time Notifications:** Stay updated on comments, likes, and followers.
- **📱 Responsive UI:** Fully accessible, fluid interface built with a customized Design System.

---

## 🏗 Tech Stack

| Layer | Technology | Description |
|-------|-----------|-------------|
| **Frontend** | [Next.js 15 (App Router)](https://nextjs.org/) | Server-side rendering, SEO, routing |
| **Styling** | [Vanilla CSS + Design Tokens](https://developer.mozilla.org/en-US/docs/Web/CSS) | High-performance, scalable styling |
| **Database** | [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/) | Relational data & typed queries |
| **Auth** | [Better Auth](https://better-auth.com/) | Secure, modern authentication |
| **Cache & Queues** | [Redis](https://redis.io/) + [BullMQ](https://docs.bullmq.io/) | Feed ranking & background jobs |
| **Storage** | [Cloudinary](https://cloudinary.com/) | Optimized image hosting |
| **Monorepo** | [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/) | Monorepo orchestration |

---

## 🧱 Architecture

<div align="center">
  <img src="https://via.placeholder.com/1000x500?text=Architecture+Diagram+Placeholder" alt="Architecture Diagram Placeholder" />
</div>

StoryTree utilizes a **Modular Monolith** architecture driven by Turborepo. 

### 📂 Folder Structure

```text
StoryTree/
├── apps/
│   └── web/               # Next.js frontend application (The Core App)
├── packages/
│   ├── db/                # Prisma schema, migrations, and realistic seed scripts
│   ├── ui/                # Shared React component library (Design System)
│   ├── shared/            # Shared types, constants, and utilities
│   ├── eslint-config/     # Strict ESLint configurations
│   └── typescript-config/ # Strict TypeScript configurations
├── turbo.json             # Turborepo pipeline configuration
├── pnpm-workspace.yaml    # Workspace mapping
└── package.json           # Root dependencies
```

---

## 📸 Screenshots

*(Add screenshots of your application here)*

<details>
<summary>Click to view screenshots</summary>

| Feed Page | Discovery Page | Story View |
|:---:|:---:|:---:|
| ![Feed](https://via.placeholder.com/300x500?text=Feed+Screenshot) | ![Discovery](https://via.placeholder.com/300x500?text=Discovery+Screenshot) | ![Story](https://via.placeholder.com/300x500?text=Story+Screenshot) |

</details>

---

## 🔗 Live Demo

Experience StoryTree in action: **[storytree.dev](https://storytree.dev)** *(Placeholder URL)*

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js >= 18](https://nodejs.org/)
- [pnpm 9.x](https://pnpm.io/)
- PostgreSQL (e.g. Neon, Supabase, or local Docker)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/StoryTree.git
cd StoryTree
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Variables
Copy the `.env.example` file located in `apps/web/.env.example` to `apps/web/.env.local` and configure it:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/storytree"
BETTER_AUTH_SECRET="your-generated-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
SENTRY_AUTH_TOKEN="your-sentry-token"
```

### 4. Database Setup & Seeding
Push the schema to your database and run the realistic English seed script to populate the app:

```bash
pnpm --filter @repo/db prisma db push
pnpm run seed
```

### 5. Start Development
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing

StoryTree implements a rigorous testing strategy.

```bash
# Run unit tests
pnpm test

# Run end-to-end tests (Playwright/Cypress)
pnpm test:e2e

# Check types across the monorepo
pnpm check-types

# Run ESLint
pnpm lint
```

---

## 🚢 Deployment

StoryTree is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the **Next.js** framework and **Turborepo** build pipelines.
3. Add the required environment variables in the Vercel dashboard.
4. Deploy!

### CI/CD
This project uses **GitHub Actions** (`.github/workflows/ci.yml`) to automatically lint, type-check, and build on every Pull Request.

### Monitoring & Analytics
- **Sentry**: Captures unhandled exceptions and performance bottlenecks.
- **PostHog**: Tracks user behavior and engagement metrics (feed scrolls, story clicks).

---

## 🛣 Roadmap & Future Improvements

- [x] Repository Setup & Monorepo Configuration
- [x] UI Design System (`@repo/ui`)
- [x] Database Schema & Prisma ORM
- [x] Better Auth Integration
- [x] Story Posting & Feed Generation
- [x] Realistic Data Seeding
- [ ] Implement Redis for Feed Caching
- [ ] Infinite Scroll with Intersection Observer
- [ ] Real-time typing indicators for comments
- [ ] Rich Text Editor enhancement (Tiptap)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, branch naming, and PR process.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ❓ FAQ

<details>
<summary><strong>Why use a Monolith instead of Microservices?</strong></summary>
A Modular Monolith provides the perfect balance between developer velocity and bounded contexts. We can move fast without the operational overhead of microservices, while Turborepo ensures fast, cached builds.
</details>

<details>
<summary><strong>Why Vanilla CSS?</strong></summary>
We rely on a robust Design Token architecture. Vanilla CSS provides zero runtime overhead, unmatched flexibility, and enforces strict adherence to our design system without being bound to a utility-first framework.
</details>

## 🛠 Troubleshooting

- **Prisma Error (`P2002`)**: Usually means a unique constraint violation. If you get this during seeding, wipe the database and re-seed.
- **Next.js Hydration Errors**: Ensure your browser extensions are disabled in development or test in Incognito mode.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Vercel](https://vercel.com) for Next.js and hosting.
- [Better Auth](https://better-auth.com/) for a seamless authentication experience.
- The open-source community for countless tools that make this possible.
