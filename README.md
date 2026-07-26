# StoryTree

A collaborative storytelling platform where one writing prompt can inspire hundreds of unique stories.

## Tech Stack

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

## Project Structure

```
StoryTree/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend (placeholder)
├── packages/
│   ├── ui/           # Shared React component library
│   ├── shared/       # Shared types, constants, and utilities
│   ├── eslint-config/    # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Getting Started

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

## License

Private — All rights reserved.
