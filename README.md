# 🌳 StoryTree

> Every story starts with one idea.

StoryTree is a collaborative storytelling platform where a single writing prompt can inspire hundreds of completely different stories.

Instead of endless social posts or blogs, StoryTree revolves around **creative prompts**.

One prompt.

Hundreds of writers.

Hundreds of unique interpretations.

A horror writer sees fear.

A sci-fi writer imagines the future.

A romance writer finds love.

The same seed grows into an entire forest of stories.

---

## ✨ Why StoryTree?

Most writing platforms organize content around authors.

StoryTree organizes content around **ideas**.

Every prompt becomes a living tree.

Readers explore different perspectives.

Writers compete with creativity—not popularity.

There are no downvotes.

Instead, readers react emotionally.

🌟 Star

❄️ Chills

🤯 Mind Blown

❤️ Moved

😂 Hilarious

🌸 Beautiful

---

## 🚀 Vision

To become the world's largest collaborative storytelling platform.

Our mission is simple:

> Every story starts with one idea.

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) |
| Backend | NestJS |
| Database | PostgreSQL + Prisma |
| Auth | Better Auth |
| Cache | Redis |
| Storage | Cloudinary |
| Monorepo | Turborepo + pnpm |
| Language | TypeScript |

---

## 🧱 Architecture

StoryTree uses a **Modular Monolith** architecture:
- The backend (`apps/api`) is a centralized NestJS application divided into distinct feature modules (Auth, Users, Stories, Prompts).
- The frontend (`apps/web`) is a Next.js application handling server-side rendering and SEO.
- Asynchronous tasks like feed ranking and notifications are processed via BullMQ and Redis.
- This ensures high developer velocity while maintaining strict domain boundaries.

---

## 📂 Monorepo Structure

```text
StoryTree/
├── apps/
│   ├── web/               # Next.js frontend
│   └── api/               # NestJS backend
├── packages/
│   ├── ui/                # Shared React component library
│   ├── shared/            # Shared types, constants, and utilities
│   ├── eslint-config/     # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- pnpm 9.x

### Development

```bash
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Build all apps and packages
pnpm build

# Lint all apps and packages
pnpm lint

# Type check all apps and packages
pnpm check-types
```

---

## 🛣 Roadmap

- ✅ Repository Setup
- ✅ Engineering Foundation
- 🚧 Design System
- ⏳ Authentication
- ⏳ Prompt Engine
- ⏳ Story Editor
- ⏳ Discovery Feed
- ⏳ Recommendations
- ⏳ Notifications
- ⏳ Launch

---

## 📸 Screenshots

*(Coming Soon)*

---

## 📖 Documentation

All project documentation lives inside the `/docs` directory.

### Product
- [Project Context](./docs/product/PROJECT_CONTEXT.md)
- [Roadmap](./docs/product/ROADMAP.md)
- [Vision](./docs/product/vision.md)
- [Product Principles](./docs/product/product_principles.md)

### Architecture
- [System Architecture](./docs/architecture/system_architecture.md)
- [Design System](./docs/architecture/design_system.md)
- [Design Token Architecture](./docs/architecture/design_token_architecture.md)
- [Design System Pages](./docs/architecture/design_system_pages.md)
- [Design System Components](./docs/architecture/design_system_components.md)
- [Design System Checklist](./docs/architecture/design_system_checklist.md)

### Engineering
- [Coding Standards](./docs/engineering/coding_standards.md)
- [Repository Structure](./docs/engineering/repository_structure.md)
- [Contribution Guide](./docs/engineering/contribution_guide.md)
- [AI Rules](./docs/engineering/AI_RULES.md)

### Architecture Decisions
- [ADR 001: Authentication](./docs/decisions/ADR-001-authentication.md)
- [ADR 002: Storage](./docs/decisions/ADR-002-storage.md)
- [ADR 003: Design System](./docs/decisions/ADR-003-design-system.md)

---

## 🤝 Contributing

StoryTree is currently under active development.

Contributions will open once the core platform reaches MVP.

---

## 📄 License

Private — All Rights Reserved.
