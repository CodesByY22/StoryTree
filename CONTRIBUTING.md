# Contributing to StoryTree

First off, thank you for considering contributing to StoryTree! It's people like you that make StoryTree a great platform for collaborative storytelling.

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.x
- PostgreSQL database (local or cloud)

### Local Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/StoryTree.git
   cd StoryTree
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment setup:**
   Copy `.env.example` to `.env.local` inside `apps/web` and populate the required keys.

4. **Database setup:**
   ```bash
   pnpm --filter @repo/db prisma db push
   pnpm --filter @repo/db seed
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

## Development Workflow

### Branch Naming Conventions

Please use the following conventions for branch names:
- `feature/your-feature-name`
- `fix/issue-description`
- `docs/what-you-updated`
- `chore/what-you-cleaned`

### Commit Conventions

We follow Conventional Commits format:
- `feat: add new profile settings`
- `fix: resolve hydration error on feed`
- `docs: update readme with deployment instructions`
- `chore: update dependencies`

### Pull Request Process

1. Ensure all code is linted and type-checked before submitting:
   ```bash
   pnpm lint
   pnpm check-types
   ```
2. Update the README.md with details of changes to the interface, if applicable.
3. Your PR must pass all CI checks before it can be merged.
4. Provide a clear description of the problem you solved or the feature you added in the PR description.

## Issue Reporting

- **Bug Reports**: Use the Bug Report issue template. Be sure to include steps to reproduce, expected behavior, and actual behavior.
- **Feature Requests**: Use the Feature Request issue template. Explain the motivation and use case for the feature.

Thank you for your contributions!
