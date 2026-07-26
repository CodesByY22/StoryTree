# StoryTree — Project Context

> Single source of truth for onboarding developers and AI assistants.
> Last updated: July 2026

---

## 1. What Is StoryTree?

**Tagline:** "Every story starts with one idea."

**Product Identity:** Quora + Reddit + GitHub for storytelling.

**Mission:** Allow anyone to publish stories from writing prompts and let readers discover hundreds of unique interpretations of the same idea.

### The Core Concept

The atomic unit of StoryTree is the **Prompt** — a creative seed (a "what if" scenario). Users write **Stories** in response to prompts. One prompt generates many stories across different genres. The platform's entire identity flows from the **tree metaphor**: prompts are seeds, stories are branches, the community is a forest.

**Critical constraint:** One story per prompt per user. This forces quality over quantity and makes every submission a considered creative piece.

### The Three User Archetypes

| Archetype | Action | % of Users |
|-----------|--------|-----------|
| **The Reader** | Reads and votes | ~70% |
| **The Writer** | Writes stories on prompts | ~20% |
| **The Prompter** | Creates original prompts | ~10% |

---

## 2. Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 15 (App Router) | SSR/SSG, routing, React Server Components |
| **React** | 19 | UI framework |
| **TypeScript** | Strict mode | Type safety (`strict: true`, `noUncheckedIndexedAccess: true`) |
| **Tailwind CSS** | v4 | Utility-first styling with design tokens |
| **Zustand** | Latest | Client state (editor, UI, optimistic updates) |
| **TanStack Query** | v5 | Server state (caching, refetching, pagination) |
| **shadcn/ui** | Latest | Accessible components (copied into project, not imported) |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **NestJS** | Latest | Modular monolith API server |
| **Node.js** | 22 LTS | Runtime |
| **Prisma** | Latest | ORM with type-safe queries and migrations |
| **BullMQ** | Latest | Background job processing (Redis-backed) |

### Infrastructure
| Service | Provider | Purpose |
|---------|----------|---------|
| **Database** | Neon (Serverless PostgreSQL) | Primary data store, 26 tables |
| **Cache/Queue** | Upstash (Serverless Redis) | Feed caching, rate limiting, BullMQ backend |
| **Auth** | Clerk | Authentication, JWT, user management |
| **Media** | Cloudinary | Avatar upload, transformation, CDN |
| **Realtime** | Pusher | Live notifications, reaction updates |
| **Email** | Resend | Transactional email (welcome, streaks, digests) |
| **Frontend Hosting** | Vercel | Next.js deployment, ISR, edge functions |
| **Backend Hosting** | Railway | NestJS + BullMQ worker deployment |
| **CDN/WAF** | Cloudflare | DDoS protection, static asset caching |

### Monorepo Structure
```
StoryTree/                          # Turborepo root
├── apps/
│   ├── web/                        # Next.js 15 (App Router)
│   └── api/                        # NestJS API server
├── packages/
│   ├── ui/                         # Shared React components
│   ├── shared/                     # Shared types, utils, constants
│   ├── eslint-config/              # Shared ESLint rules
│   └── typescript-config/          # Shared TSConfig
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 3. Architecture Overview

**Pattern:** Separated frontend/backend with a **modular monolith** backend.

**Why modular monolith (not microservices):**
- Team size: Works with 2–5 engineers
- Single deployment pipeline (frontend + backend)
- In-process function calls instead of network overhead
- Single database with ACID transactions
- Can extract modules into services later at 50+ engineers

**Request Flow:**
1. Client (Next.js on Vercel) → Cloudflare CDN → NestJS on Railway
2. NestJS validates Clerk JWT → queries PostgreSQL (Neon) → checks Redis (Upstash)
3. Async work (notifications, feed, email) → enqueued to BullMQ
4. BullMQ workers → DB writes, Resend emails, Pusher realtime events

---

## 4. Database Overview

**26 tables** defined in the specification. Key entities:

| Entity | Table | Description |
|--------|-------|-------------|
| Users | `users` | Core user entity, synced from Clerk |
| Genres | `genres` | 8 fixed genres (Horror, Sci-Fi, Fantasy, Romance, Thriller, Literary, Comedy, Drama) |
| Prompts | `prompts` | Creative seeds that spawn stories |
| Stories | `stories` | Creative responses to prompts |
| Reactions | `reactions` | Star (quality signal) + emotional type (Chills, Mind-blown, Moved, Hilarious, Beautiful) |
| Comments | `comments` | Standard + inline highlight comments on stories |
| Follows | `follows` | Uni-directional user follows |
| Notifications | `notifications` | In-app notification with batching |
| Badges | `badges` | Achievement definitions (seeded data) |
| Challenges | `challenges` | Weekly community writing events |

**Design Principles:**
- UUIDs for primary keys
- Denormalized counters (story_count, star_count) to avoid expensive COUNT queries
- Soft deletes via status enums (ACTIVE, HIDDEN, DELETED)
- One story per prompt per user (unique constraint)

---

## 5. API Overview

**56 endpoints** across 19 categories. Key conventions:
- Base URL: `https://api.storytree.app/v1`
- Auth: `Authorization: Bearer <clerk_jwt>`
- Pagination: Cursor-based (`?cursor=<id>&limit=20`)
- Response format: `{ success: true, data: {...} }`
- Error format: `{ success: false, error: { code, message } }`

---

## 6. Design System Overview

**Dark-mode first** with a forest/nature aesthetic:
- **Primary:** Forest Green scale (green-50 through green-950)
- **Accent:** Amber/Gold (amber-50 through amber-950)
- **Typography:** Inter (UI), Lora (story reading), Playfair Display (titles), JetBrains Mono (code)
- **Spacing:** 4px base grid, 24 tokens
- **Breakpoints:** Mobile (0–639px), Tablet (640–1023px), Desktop (1024px+)
- **Components:** All defined with anatomy, variants, states, and skeleton loaders
- **Accessibility:** WCAG 2.1 AA, keyboard navigation, screen reader support, reduced motion

---

## 7. Documentation Map

All specification documents live in `d:\Project_StoryTree\mdFiles\`:

| Document | Content |
|----------|---------|
| `design_system.md` | Visual tokens, colors, typography, spacing |
| `design_system_components.md` | Atom & molecule component specs |
| `design_system_pages.md` | Page layouts, animations, accessibility |
| `implementation_plan.md` | Product design document (product identity, UX flows, gamification) |
| `technical_architecture_part1.md` | System overview, tech stack, 26-table DB schema |
| `technical_architecture_part2.md` | Backend modules, 56 API endpoints, feed/search algorithms |
| `technical_architecture_part3.md` | Recommendations, notifications, security, scalability, AI future, dev roadmap |

---

## 8. Development Phases (Roadmap Summary)

| Phase | Focus | Duration |
|-------|-------|----------|
| 1 | Authentication & User System | ~7 days |
| 2 | Core Prompt System | ~7 days |
| 3 | Story System & Editor | ~10 days |
| 4 | Comments & Reactions | ~7 days |
| 5 | Discovery & Feed | ~10 days |
| 6 | Notifications | ~5 days |
| 7 | Challenges & Gamification | ~7 days |
| 8 | Optimization & Polish | ~7 days |
| 9 | Deployment & Launch | ~5 days |

**Total:** ~65 working days (~11 weeks). Add 30% buffer → ~14–15 weeks realistic.

---

## 9. Current State

**As of July 2026:**
- ✅ Turborepo monorepo scaffolded (Next.js 15 + NestJS placeholder)
- ✅ All specification documents written (~6,900 lines)
- ❌ No design system tokens implemented
- ❌ No Prisma schema
- ❌ No Clerk integration
- ❌ No custom components
- ❌ No API endpoints

**Status: Pre-development. Ready for Phase 1.**
