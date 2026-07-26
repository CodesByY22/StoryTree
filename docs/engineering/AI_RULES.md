# StoryTree — AI Rules & Engineering Standards

> Engineering conventions, coding standards, and behavioral rules for AI assistants and developers.
> These rules are non-negotiable unless explicitly overridden by the project owner.

---

## 1. Core Philosophy

```
Never sacrifice maintainability for speed.
Prefer clean architecture.
Prefer modular design.
Prefer reusable code.
Prefer production-quality engineering.
```

**This is a long-term production startup**, not a prototype. Every line of code should be written as if thousands of users will depend on it.

---

## 2. Workflow Protocol

For every task, follow this sequence:

1. **Explain the objective** — What are we doing?
2. **Explain why it matters** — Why does this task exist?
3. **Explain the architecture** — How does it fit into the system?
4. **Implement only one logical step** — Small, focused changes
5. **Verify it works** — Run tests, build checks, manual verification
6. **Explain what changed** — Clear summary of modifications
7. **Recommend the next step** — What should come after this?

**Never skip steps.** Never bundle unrelated changes. Never implement multiple phases in one pass.

---

## 3. Source of Truth

The repository's markdown specification files are the **primary source of truth** for all design and architecture decisions. Located in `d:\Project_StoryTree\mdFiles\`:

| Priority | Source | Scope |
|----------|--------|-------|
| 1 | `mdFiles/*.md` | Design system, architecture, API, database |
| 2 | `PROJECT_CONTEXT.md` | Project overview and onboarding |
| 3 | `AI_RULES.md` (this file) | Engineering standards |
| 4 | `ROADMAP.md` | Phase tracking and status |
| 5 | Inline code comments | Implementation-specific context |

**If a specification file conflicts with existing code, the specification wins** unless the deviation was explicitly approved and documented.

---

## 4. TypeScript Standards

### Strict Mode (Non-Negotiable)

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

### Type Safety Rules

- ❌ **Never use `any`** in production code. Use `unknown` and narrow with type guards.
- ❌ **Never use `@ts-ignore`** or `@ts-expect-error` without a linked issue/reason comment.
- ✅ **Always type function parameters and return values** explicitly.
- ✅ **Use `satisfies` operator** for config objects to preserve literal types.
- ✅ **Use discriminated unions** for state machines and variant types.
- ✅ **Export types/interfaces** from `packages/shared` for cross-package use.

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files (components) | PascalCase | `PromptCard.tsx` |
| Files (utilities) | kebab-case | `reading-time.util.ts` |
| Files (hooks) | camelCase with `use` prefix | `useStoryDraft.ts` |
| Interfaces/Types | PascalCase | `StoryResponse`, `CreatePromptDto` |
| Enums | PascalCase (members UPPER_SNAKE) | `enum ContentStatus { ACTIVE, HIDDEN, DELETED }` |
| Constants | UPPER_SNAKE_CASE | `MAX_STORY_LENGTH = 50_000` |
| Functions | camelCase | `calculateReadingTime()` |
| React components | PascalCase | `function PromptCard()` |
| CSS classes (Tailwind) | kebab-case utility classes | Standard Tailwind |
| Database columns | snake_case | `star_count`, `created_at` |
| API routes | kebab-case | `/v1/stories/:id/reactions` |
| Environment variables | UPPER_SNAKE_CASE | `DATABASE_URL` |

---

## 5. Frontend Standards (Next.js / React)

### Component Architecture

```
components/
├── atoms/          # Smallest UI units (Button, Avatar, Badge, Input)
├── molecules/      # Compositions of atoms (PromptCard, StoryCard, ReactionBar)
├── organisms/      # Complex sections (FeedSection, CommentThread, Sidebar)
├── layouts/        # Page-level wrappers (MainLayout, ReadingLayout)
└── providers/      # Context providers (ThemeProvider, QueryProvider)
```

### Component Rules

- ✅ **One component per file.** Co-locate related sub-components only if they're not reused elsewhere.
- ✅ **Use Server Components by default.** Only add `"use client"` when interactivity is needed.
- ✅ **Co-locate styles.** Use Tailwind classes directly in JSX.
- ✅ **Props must be typed.** Define a `Props` type/interface at the top of each component file.
- ✅ **Skeleton loaders for every component** that loads async data. Defined in the design system.
- ❌ **Never use `useEffect` for data fetching.** Use TanStack Query or Server Components.
- ❌ **Never store server data in Zustand.** Server state belongs in TanStack Query.

### State Management Rules

| State Type | Solution | Examples |
|-----------|----------|----------|
| **Server state** | TanStack Query | Feed data, stories, user profiles, notifications |
| **Client UI state** | Zustand | Active tab, modal visibility, sidebar open |
| **Form state** | React Hook Form + Zod | Story editor, profile edit, prompt creation |
| **URL state** | Next.js searchParams | Feed tab, sort order, genre filter |
| **Optimistic updates** | TanStack Query mutation callbacks | Star toggle, bookmark toggle |

---

## 6. Backend Standards (NestJS)

### Module Pattern

Every feature module follows:

```
Module → Controller → Service → Repository (optional) → Prisma
```

| Layer | Responsibility |
|-------|---------------|
| **Controller** | HTTP routing, DTOs, auth check, response format. **NO business logic.** |
| **Service** | Business logic, orchestration, validation rules, event emission. |
| **Repository** | Complex raw SQL only. Simple CRUD uses Prisma directly in Service. |
| **DTOs** | `class-validator` decorators for request validation. `class-transformer` for response serialization. |

### API Response Format

**Success:**
```json
{ "success": true, "data": { ... } }
```

**Paginated:**
```json
{ "success": true, "data": [...], "meta": { "cursor": "uuid", "hasMore": true, "total": 247 } }
```

**Error:**
```json
{ "success": false, "error": { "code": "NOT_FOUND", "message": "Story not found", "requestId": "req_abc123" } }
```

### Database Rules

- ✅ **Always use Prisma** for queries. Use `$queryRaw` (tagged template) only for complex SQL.
- ❌ **Never use `$queryRawUnsafe`** — SQL injection risk.
- ✅ **Always update denormalized counters** when modifying related records.
- ✅ **Soft deletes only** — use status enums, never `DELETE FROM`.
- ✅ **Run migrations** via `prisma migrate dev` in development, `prisma migrate deploy` in production.

---

## 7. Testing Standards

| Level | Framework | Coverage Target |
|-------|-----------|----------------|
| **Unit tests** | Jest (Vitest for frontend) | All services, utilities, hooks |
| **Integration tests** | Supertest + NestJS TestingModule | All API endpoints |
| **E2E tests** | Playwright | Critical user flows (sign up, write story, react) |
| **Component tests** | Storybook + Vitest | All atoms and molecules |

### Test File Naming

- Unit: `*.spec.ts` (co-located with source)
- Integration: `*.integration.spec.ts` (in `test/integration/`)
- E2E: `*.e2e.spec.ts` (in `test/e2e/`)

---

## 8. Git & Version Control

### Branch Naming

```
feature/<short-description>     # New features
fix/<short-description>         # Bug fixes
refactor/<short-description>    # Code restructuring
chore/<short-description>       # Tooling, config, dependencies
docs/<short-description>        # Documentation updates
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(prompts): add create prompt API endpoint
fix(feed): correct trending score calculation
refactor(auth): extract JWT validation to shared guard
chore(deps): update prisma to 6.x
docs(api): add search endpoint documentation
```

### Pull Request Rules

- One logical change per PR
- Must pass all CI checks (lint, type-check, test)
- Requires at least one approval
- Squash-merge to main

---

## 9. Security Rules

- ❌ **Never commit secrets.** All secrets in environment variables.
- ❌ **Never log JWTs, passwords, or story body content.**
- ✅ **Validate all inputs** with class-validator DTOs on every endpoint.
- ✅ **Sanitize all user text** with `sanitize-html` before database writes.
- ✅ **Use parameterized queries** — Prisma handles this automatically.
- ✅ **Rate limit** all mutation endpoints (defined per-endpoint in the API spec).
- ✅ **Validate Clerk webhook signatures** on the auth webhook endpoint.

---

## 10. Performance Rules

| Metric | Target |
|--------|--------|
| **LCP** | < 2.5s |
| **FID** | < 100ms |
| **CLS** | < 0.1 |
| **API p50** | < 50ms |
| **API p95** | < 200ms |
| **API p99** | < 500ms |

- ✅ **Cache feed results** in Redis with appropriate TTLs.
- ✅ **Use ISR** for stable content pages (prompts with 50+ stories).
- ✅ **Lazy load** below-the-fold content.
- ✅ **Use `next/image`** for all images (auto WebP, lazy loading, responsive).
- ❌ **Never block the API response** for async work — enqueue to BullMQ instead.

---

## 11. Accessibility Rules

**Target: WCAG 2.1 Level AA**

- ✅ All interactive elements must have **keyboard accessibility**.
- ✅ All images must have **alt text** (or `aria-hidden` if decorative).
- ✅ All forms must have **associated labels**.
- ✅ Color must **never be the only indicator** — use icons + text.
- ✅ Focus management: modals trap focus, close returns focus to trigger.
- ✅ Support **`prefers-reduced-motion`** — animations degrade gracefully.
- ✅ All text in **`rem` units** — must work at 200% browser zoom.
- ✅ Use **`:focus-visible`** (not `:focus`) for focus indicators.

---

## 12. Design System Adherence

- ✅ **All colors** must use design system tokens — never hardcode hex values.
- ✅ **All spacing** must use the spacing scale — never use arbitrary pixel values.
- ✅ **All typography** must use the type scale — never define ad-hoc font sizes.
- ✅ **All components** must match their specification in `design_system_components.md`.
- ✅ **All pages** must match their layout spec in `design_system_pages.md`.
- ✅ **Skeleton loaders** are required for every component that loads async data.
- ❌ **Never diverge from the design system** without documenting the decision and reason.

---

## 13. Documentation Rules

- ✅ **Every new module** gets a README summarizing its purpose, exports, and dependencies.
- ✅ **Every API endpoint** is documented with request/response types.
- ✅ **Complex business logic** gets inline comments explaining WHY, not WHAT.
- ✅ **Keep `PROJECT_CONTEXT.md` updated** when architecture changes.
- ✅ **Keep `ROADMAP.md` updated** when phases complete or plans change.
- ❌ **Never delete comments** unless the code they describe is removed.
