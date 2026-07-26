# Repository Structure

StoryTree uses a **Modular Monolith** architecture managed by Turborepo and pnpm workspaces.

## Monorepo Layout

```text
StoryTree/
├── apps/                 # End-user applications
│   ├── web/              # Next.js frontend (App Router)
│   └── api/              # NestJS backend 
│
├── packages/             # Shared libraries and configurations
│   ├── ui/               # Design system & React components (@repo/ui)
│   ├── shared/           # Types, utilities, and constants (@repo/shared)
│   ├── eslint-config/    # Monorepo linting rules (@repo/eslint-config)
│   └── typescript-config/# Base tsconfig files (@repo/typescript-config)
│
├── docs/                 # Project documentation
│   ├── product/          # Vision, Roadmap, Context
│   ├── architecture/     # System architecture, Design System, Tokens
│   ├── engineering/      # Coding standards, Git workflows
│   ├── decisions/        # Architecture Decision Records (ADRs)
│   └── assets/           # Diagrams and images
│
├── turbo.json            # Turborepo task pipeline configuration
├── pnpm-workspace.yaml   # Workspace package definitions
└── package.json          # Root dependencies and scripts
```

## Layer Responsibilities

- **`apps/web`**: Responsible for SEO, server-side rendering, routing, and presenting UI components. It should contain minimal business logic.
- **`apps/api`**: The central backend. Handles database connections, authentication, feed algorithms, and API endpoints.
- **`packages/ui`**: The single source of truth for all visual components. Applications consume from here.
- **`packages/shared`**: Ensures the frontend and backend stay perfectly in sync by sharing TypeScript types and Zod schemas.
