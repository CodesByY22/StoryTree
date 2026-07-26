# StoryTree — Development Roadmap

> Executive-level project status tracker.
> Last updated: July 2026

---

## Project Status: 🟡 Pre-Development

| Metric | Value |
|--------|-------|
| **Documentation** | ✅ Complete (6,913 lines across 7 specification files) |
| **Architecture** | ✅ Designed (modular monolith, 26 tables, 56 endpoints) |
| **Codebase** | 🟡 Scaffolded (Turborepo monorepo, placeholder apps) |
| **Development** | ❌ Not started (Phase 1 ready to begin) |

---

## Phase Tracker

### Phase 1 — Authentication & User System
**Status:** `[ ] Not Started` | **Estimated:** ~7 days | **Complexity:** ★★☆☆☆

| Task | Status | Notes |
|------|--------|-------|
| Project setup (Tailwind v4, Prisma, ESLint, Prettier) | `[ ]` | Foundation for all work |
| Clerk integration (frontend) | `[ ]` | `<SignIn/>`, `<SignUp/>`, middleware |
| Clerk integration (backend) | `[ ]` | Webhook endpoint, JWT guard, `@CurrentUser()` |
| Database schema (Users, Genres, GenrePreferences) | `[ ]` | Prisma schema + migrations + genre seed |
| User profile API (`GET /users/:username`, `PATCH /users/me`) | `[ ]` | |
| Onboarding flow (genre selection, suggested follows) | `[ ]` | |
| Avatar upload (Cloudinary) | `[ ]` | `POST /upload/avatar` |
| Basic settings page | `[ ]` | Display name, bio, username editing |

**Dependencies:** None
**Deliverable:** Users can sign up, sign in, complete onboarding, set profile, upload avatar.

---

### Phase 2 — Core Prompt System
**Status:** `[ ] Not Started` | **Estimated:** ~7 days | **Complexity:** ★★☆☆☆

| Task | Status | Notes |
|------|--------|-------|
| Database schema (Prompts, Tags, PromptTags) | `[ ]` | |
| Create prompt API with validation & slug generation | `[ ]` | Similar prompt detection |
| Prompt detail API (`GET /prompts/:slug`) | `[ ]` | |
| Prompt list API (basic feed query) | `[ ]` | |
| Delete prompt API (owner, 0 stories only) | `[ ]` | |
| Tags system (auto-create, trending) | `[ ]` | |
| Prompt Card component (design system spec) | `[ ]` | |
| Prompt page (desktop + mobile layout) | `[ ]` | |
| Create prompt UI (modal/page) | `[ ]` | |

**Dependencies:** Phase 1 (auth)
**Deliverable:** Users can create, browse, and view prompts.

---

### Phase 3 — Story System & Editor
**Status:** `[ ] Not Started` | **Estimated:** ~10 days | **Complexity:** ★★★★☆

| Task | Status | Notes |
|------|--------|-------|
| Database schema (Stories, StoryTags, Drafts) | `[ ]` | |
| Story creation API with sanitization | `[ ]` | Word count, reading time, body_plain |
| Story CRUD APIs | `[ ]` | |
| Story editor (distraction-free, Lora font, genre selector) | `[ ]` | **High-risk — defines first impressions** |
| Draft system (auto-save every 30s) | `[ ]` | |
| Story reading page (immersive view) | `[ ]` | Narrow column, serif typography |
| Story card component | `[ ]` | Genre tag, star count, reading time |
| Story list on prompt page (sort/filter) | `[ ]` | |
| Profile stories tab | `[ ]` | |
| One-story-per-prompt enforcement | `[ ]` | Unique constraint + API check |
| Mobile story swipe | `[ ]` | Swipe between stories on same prompt |

**Dependencies:** Phase 2 (prompts)
**Deliverable:** Full story creation, editing, reading. Core StoryTree experience works.

> [!WARNING]
> This is the most complex and highest-risk phase. The editor and reading experience define the product. Budget extra time.

---

### Phase 4 — Comments & Reactions
**Status:** `[ ] Not Started` | **Estimated:** ~7 days | **Complexity:** ★★★☆☆

| Task | Status | Notes |
|------|--------|-------|
| Database schema (Reactions, Comments, CommentLikes) | `[ ]` | |
| Reaction APIs (upsert pattern) | `[ ]` | |
| Reaction bar component with animations | `[ ]` | Star + 5 emotional reactions |
| Denormalized counter updates | `[ ]` | star_count, reaction_count |
| Rings system (author earns rings on reactions) | `[ ]` | |
| Comment APIs (CRUD, like/unlike) | `[ ]` | |
| Comment thread component (2-level max) | `[ ]` | |
| Inline highlights (paragraph selection → comment) | `[ ]` | |

**Dependencies:** Phase 3 (stories)
**Deliverable:** Reactions, comments, inline highlights, rings.

---

### Phase 5 — Discovery & Feed
**Status:** `[ ] Not Started` | **Estimated:** ~10 days | **Complexity:** ★★★★☆

| Task | Status | Notes |
|------|--------|-------|
| Database schema (Follows, Bookmarks, ReadingHistory) | `[ ]` | |
| Follow/Bookmark APIs | `[ ]` | |
| Reading history tracking (async) | `[ ]` | |
| Feed APIs (4 tabs: For You, Following, Trending, New) | `[ ]` | |
| Trending algorithm (hot-score, BullMQ cron, Redis) | `[ ]` | |
| "For You" algorithm (genre-weighted scoring) | `[ ]` | |
| Feed page (tabbed, with prompt cards + story previews) | `[ ]` | |
| Explore page (trending, fresh seeds, genres, rising authors) | `[ ]` | |
| Search APIs (PostgreSQL FTS) | `[ ]` | |
| Search UI (modal with autocomplete) | `[ ]` | |
| Sidebar components | `[ ]` | Challenge card, rising authors, trending genres |

**Dependencies:** Phase 4 (reactions for trending scores)
**Deliverable:** Full discovery system — feeds, explore, search, follow, bookmark.

---

### Phase 6 — Notifications
**Status:** `[ ] Not Started` | **Estimated:** ~5 days | **Complexity:** ★★★☆☆

| Task | Status | Notes |
|------|--------|-------|
| Database schema (Notifications, NotificationPreferences) | `[ ]` | |
| BullMQ notification processor (fan-out, dedup, batching) | `[ ]` | |
| Pusher integration (realtime delivery) | `[ ]` | |
| Notification APIs (list, mark read, preferences) | `[ ]` | |
| Notification page (grouped by time, filtered by type) | `[ ]` | |
| Notification bell (badge count, dropdown) | `[ ]` | |
| Notification preferences UI | `[ ]` | |

**Dependencies:** Phase 5 (follows, reactions as triggers)
**Deliverable:** Real-time notifications for stars, comments, follows, new stories.

---

### Phase 7 — Challenges & Gamification
**Status:** `[ ] Not Started` | **Estimated:** ~7 days | **Complexity:** ★★★☆☆

| Task | Status | Notes |
|------|--------|-------|
| Database schema (Challenges, Badges, WritingStreaks, etc.) | `[ ]` | |
| Challenge APIs (admin CRUD, list, detail) | `[ ]` | |
| Challenge page (timer, rules, entries, winners) | `[ ]` | |
| Badge system (definitions + condition checking) | `[ ]` | BullMQ job after story publish |
| Level system (Rings → Level mapping, auto level-up) | `[ ]` | |
| Streak tracking (daily cron) | `[ ]` | |
| Badge/streak display components | `[ ]` | |
| Collections APIs (user-created collections) | `[ ]` | |
| Pin story on profile | `[ ]` | |

**Dependencies:** Phase 6 (notifications for badge/streak alerts)
**Deliverable:** Weekly challenges, badges, levels, streaks, collections.

---

### Phase 8 — Optimization & Polish
**Status:** `[ ] Not Started` | **Estimated:** ~7 days | **Complexity:** ★★★☆☆

| Task | Status | Notes |
|------|--------|-------|
| Performance audit (Lighthouse, API benchmarking) | `[ ]` | |
| Redis caching layer (feeds, profiles, trending) | `[ ]` | |
| SEO (meta tags, Open Graph, JSON-LD, sitemap) | `[ ]` | |
| Social sharing (rich preview cards) | `[ ]` | |
| Mobile polish (bottom tab bar, touch interactions) | `[ ]` | |
| Accessibility audit (keyboard, screen reader, contrast) | `[ ]` | |
| Animation polish (micro-interactions, page transitions) | `[ ]` | |
| Error handling (empty states, error states, offline) | `[ ]` | |
| Landing page (logged-out, with live content) | `[ ]` | |
| Reports/moderation (report API, admin queue) | `[ ]` | |

**Dependencies:** Phase 7 (all features built)
**Deliverable:** Production-quality experience. Fast, accessible, polished.

---

### Phase 9 — Deployment & Launch
**Status:** `[ ] Not Started` | **Estimated:** ~5 days | **Complexity:** ★★☆☆☆

| Task | Status | Notes |
|------|--------|-------|
| Vercel deployment (frontend) | `[ ]` | Custom domain, env vars |
| Railway deployment (backend + workers) | `[ ]` | Dockerfile, health checks |
| Neon production database | `[ ]` | Connection pooling, backups |
| Upstash production Redis | `[ ]` | |
| Cloudflare setup (DNS, SSL, WAF, CDN) | `[ ]` | |
| Monitoring (Sentry, BetterStack) | `[ ]` | |
| Seed content (20–30 prompts, invite beta writers) | `[ ]` | |
| Load testing (100 concurrent users) | `[ ]` | |
| Security audit (npm audit, header checks, rate limits) | `[ ]` | |
| Launch checklist (ToS, privacy policy, GDPR) | `[ ]` | |

**Dependencies:** Phase 8 (everything polished)
**Deliverable:** StoryTree is live, monitored, and ready for users.

---

## Timeline Summary

| Phase | Duration | Cumulative | Status |
|-------|----------|-----------|--------|
| 1. Auth & Users | 7 days | Week 1 | `[ ]` Not Started |
| 2. Prompts | 7 days | Week 2 | `[ ]` Not Started |
| 3. Stories & Editor | 10 days | Week 3–4 | `[ ]` Not Started |
| 4. Comments & Reactions | 7 days | Week 5 | `[ ]` Not Started |
| 5. Discovery & Feed | 10 days | Week 6–7 | `[ ]` Not Started |
| 6. Notifications | 5 days | Week 8 | `[ ]` Not Started |
| 7. Challenges & Gamification | 7 days | Week 9 | `[ ]` Not Started |
| 8. Optimization & Polish | 7 days | Week 10 | `[ ]` Not Started |
| 9. Deployment & Launch | 5 days | Week 11 | `[ ]` Not Started |
| **Total** | **~65 days** | **~11 weeks** | |

> [!TIP]
> With 30% buffer for unknowns, realistic timeline is **14–15 weeks (3.5 months)** for a solo developer. With 2 developers working frontend/backend in parallel, reduce to ~7–8 weeks.

---

## Cost Projection (Early Stage, <10K Users)

| Service | Monthly Cost |
|---------|-------------|
| Vercel (Pro) | $20 |
| Railway (backend + workers) | $10–20 |
| Neon (Pro) | $19 |
| Upstash (Pay-as-go) | $5–10 |
| Cloudflare (Free) | $0 |
| Cloudinary (Free tier) | $0 |
| Clerk (Free up to 10K) | $0 |
| Pusher (Free tier) | $0 |
| Resend (Free up to 3K/month) | $0 |
| **Total** | **~$55–70/month** |
