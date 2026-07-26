# StoryTree — Design System Specification

> Complete UI/UX design system covering every token, component, page, state, and interaction pattern.
> Version 1.0 · Last updated: July 2026

---

# Part I: Design Foundations

---

## 1. Color System

### 1.1 Core Palette

StoryTree's palette is built on **forest greens** (organic, growth) and **warm amber** (campfire, storytelling warmth). The dark mode is the primary theme — light mode is secondary and derived.

#### Primary Colors

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--color-green-950` | `#0a1a0a` | `120° 33% 7%` | Page background (darkest) |
| `--color-green-900` | `#0f2610` | `123° 43% 10%` | Card backgrounds |
| `--color-green-800` | `#1a3a1c` | `124° 37% 16%` | Elevated surfaces |
| `--color-green-700` | `#264d28` | `123° 32% 23%` | Borders, dividers |
| `--color-green-600` | `#357538` | `122° 35% 33%` | Secondary text, icons |
| `--color-green-500` | `#4a9e4e` | `122° 36% 45%` | Interactive elements |
| `--color-green-400` | `#6bbd6f` | `122° 34% 58%` | Links, highlights |
| `--color-green-300` | `#95d498` | `122° 37% 71%` | Active states |
| `--color-green-200` | `#c0e7c2` | `122° 40% 83%` | High-contrast text |
| `--color-green-100` | `#e5f5e6` | `122° 45% 93%` | Primary text on dark |

#### Accent Colors (Amber/Gold)

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--color-amber-900` | `#3d2800` | `39° 100% 12%` | Amber background (pressed) |
| `--color-amber-800` | `#6b4700` | `39° 100% 21%` | Amber background (hover) |
| `--color-amber-700` | `#946200` | `39° 100% 29%` | — |
| `--color-amber-600` | `#b87a00` | `39° 100% 36%` | — |
| `--color-amber-500` | `#d4940a` | `41° 92% 43%` | **Primary CTA / Write button** |
| `--color-amber-400` | `#e8ad2a` | `41° 80% 54%` | CTA hover state |
| `--color-amber-300` | `#f0c55e` | `41° 83% 65%` | Highlights, badges |
| `--color-amber-200` | `#f5dba0` | `41° 82% 79%` | Subtle amber tints |
| `--color-amber-100` | `#faf0d6` | `41° 80% 91%` | Amber text on dark |

#### Neutral Colors (Warm Grays)

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--color-neutral-950` | `#0d0d0b` | `60° 8% 4%` | True black replacement |
| `--color-neutral-900` | `#1a1a17` | `60° 7% 9%` | Deepest backgrounds |
| `--color-neutral-800` | `#2a2a25` | `60° 5% 15%` | — |
| `--color-neutral-700` | `#3d3d36` | `60° 5% 22%` | Borders |
| `--color-neutral-600` | `#5c5c52` | `60° 5% 34%` | Disabled text |
| `--color-neutral-500` | `#7a7a6e` | `60° 4% 45%` | Placeholder text |
| `--color-neutral-400` | `#9e9e90` | `60° 5% 59%` | Secondary text |
| `--color-neutral-300` | `#c2c2b6` | `60° 8% 74%` | Body text |
| `--color-neutral-200` | `#deded4` | `60° 13% 85%` | Strong text |
| `--color-neutral-100` | `#f0f0ea` | `60° 15% 93%` | Headings, primary text |
| `--color-neutral-50` | `#fafaf6` | `60° 25% 97%` | Max contrast text |

### 1.2 Semantic Color Tokens

These are the tokens components actually use — they map to the palette above.

#### Surfaces

| Token | Dark Mode Value | Purpose |
|-------|----------------|---------|
| `--surface-base` | `green-950` | Page background |
| `--surface-raised` | `green-900` | Cards, panels |
| `--surface-overlay` | `green-800` | Modals, dropdowns, popovers |
| `--surface-sunken` | `neutral-950` | Inset areas, code blocks |
| `--surface-glass` | `green-900` at 60% opacity + 12px blur | Glassmorphism surfaces |
| `--surface-reading` | `#16201a` (custom blend) | Story reading surface (optimized for eye comfort) |

#### Text

| Token | Dark Mode Value | Purpose |
|-------|----------------|---------|
| `--text-primary` | `neutral-100` | Headings, body text |
| `--text-secondary` | `neutral-400` | Captions, metadata |
| `--text-tertiary` | `neutral-500` | Placeholders, hints |
| `--text-disabled` | `neutral-600` | Disabled state |
| `--text-inverse` | `green-950` | Text on amber/light backgrounds |
| `--text-link` | `green-400` | Hyperlinks |
| `--text-accent` | `amber-400` | Highlighted text, CTAs |
| `--text-story` | `neutral-200` | Story body text (slightly warmer) |

#### Borders

| Token | Dark Mode Value | Purpose |
|-------|----------------|---------|
| `--border-subtle` | `green-700` at 40% opacity | Card borders, dividers |
| `--border-default` | `green-700` | Input borders, separators |
| `--border-strong` | `green-600` | Focus rings, active borders |
| `--border-accent` | `amber-500` | Accent borders, active tabs |

#### Interactive States

| Token | Dark Mode Value | Purpose |
|-------|----------------|---------|
| `--interactive-hover` | `white` at 5% opacity | Hover overlay on any element |
| `--interactive-pressed` | `white` at 3% opacity | Active/pressed overlay |
| `--interactive-focus` | `amber-500` at 40% opacity | Focus ring (keyboard nav) |
| `--interactive-selected` | `green-800` | Selected item background |

### 1.3 Genre Colors

Each genre has a signature color pair — used for genre tags, filter chips, and page accents.

| Genre | Primary | Background (15% opacity) | Emoji |
|-------|---------|--------------------------|-------|
| Horror | `#e05252` | `rgba(224,82,82,0.15)` | 🩸 |
| Sci-Fi | `#5b9bd5` | `rgba(91,155,213,0.15)` | 🚀 |
| Fantasy | `#a87de0` | `rgba(168,125,224,0.15)` | 🐉 |
| Romance | `#e87da0` | `rgba(232,125,160,0.15)` | 💕 |
| Thriller | `#d4870a` | `rgba(212,135,10,0.15)` | 🔪 |
| Literary | `#8bb06e` | `rgba(139,176,110,0.15)` | 📜 |
| Comedy | `#e8c84a` | `rgba(232,200,74,0.15)` | 😂 |
| Drama | `#c490d1` | `rgba(196,144,209,0.15)` | 🎭 |

### 1.4 Feedback Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#4a9e4e` | Success states, confirmations |
| `--color-warning` | `#d4940a` | Warnings (shares amber palette) |
| `--color-error` | `#d64545` | Errors, destructive actions |
| `--color-info` | `#5b9bd5` | Informational messages |

---

## 2. Typography System

### 2.1 Font Stack

| Role | Font Family | Fallback Stack | Why |
|------|------------|----------------|-----|
| **UI / Sans** | Inter | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Industry-standard UI legibility. Variable font for precise weight control. |
| **Story / Serif** | Lora | `'Georgia', 'Times New Roman', serif` | Warm, readable serif with good screen rendering. Designed for body text. |
| **Display / Serif** | Playfair Display | `'Georgia', serif` | Elegant, high-contrast serif for hero text and prompt display. |
| **Mono** | JetBrains Mono | `'Fira Code', 'Consolas', monospace` | For stats, counters, code snippets in comments. |

### 2.2 Type Scale

Base size: `16px` (1rem). Scale ratio: `1.25` (Major Third).

#### UI Typography (Inter)

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `--type-ui-xs` | 11px / 0.6875rem | 500 | 1.45 | +0.02em | Badges, micro-labels |
| `--type-ui-sm` | 13px / 0.8125rem | 400 | 1.45 | +0.01em | Captions, metadata, timestamps |
| `--type-ui-base` | 15px / 0.9375rem | 400 | 1.5 | 0 | Button text, nav items, body |
| `--type-ui-md` | 16px / 1rem | 500 | 1.5 | 0 | Section labels, tab labels |
| `--type-ui-lg` | 18px / 1.125rem | 600 | 1.4 | -0.005em | Card titles, sub-headings |
| `--type-ui-xl` | 22px / 1.375rem | 600 | 1.35 | -0.01em | Page section headers |
| `--type-ui-2xl` | 28px / 1.75rem | 700 | 1.3 | -0.015em | Page titles |

#### Story Typography (Lora)

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `--type-story-body` | 19px / 1.1875rem | 400 | 1.8 | +0.003em | Story body text |
| `--type-story-body-mobile` | 17px / 1.0625rem | 400 | 1.75 | +0.003em | Story body on mobile |

> [!IMPORTANT]
> **Story body line height is 1.8.** This is deliberately generous. Long-form reading requires more vertical breathing room than UI text. Medium uses ~1.7, we go slightly higher because stories are fiction (more immersive reading, slower pace) vs. articles (informational, faster scanning).

#### Display Typography (Playfair Display)

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `--type-display-sm` | 24px / 1.5rem | 700 | 1.3 | -0.01em | Story titles |
| `--type-display-md` | 32px / 2rem | 700 | 1.25 | -0.015em | Prompt text (prompt page) |
| `--type-display-lg` | 40px / 2.5rem | 800 | 1.2 | -0.02em | Hero prompt text |
| `--type-display-xl` | 52px / 3.25rem | 800 | 1.15 | -0.025em | Landing page hero |

### 2.3 Typography Rules

1. **Prompts** always render in `Playfair Display` — they are the creative seeds and should feel literary and weighty.
2. **Stories** always render in `Lora` — warm, readable, designed for sustained reading.
3. **Everything else** (navigation, buttons, metadata, comments) uses `Inter`.
4. **Maximum reading width:** `680px` for story content. `720px` for prompts. Never wider.
5. **Paragraph spacing:** `1.5em` between paragraphs in story content. No first-line indent; use block spacing.
6. **Drop cap:** Optional — first letter of a story MAY use a 3-line drop cap in Playfair Display at 3.5× body size. This is a toggle the author can enable.

---

## 3. Spacing System

### 3.1 Base Scale

Base unit: `4px`. All spacing values are multiples of 4.

| Token | Value | Common Uses |
|-------|-------|-------------|
| `--space-0` | 0px | — |
| `--space-1` | 4px | Icon-to-text gap, tight inline spacing |
| `--space-2` | 8px | Badge padding, compact list gaps |
| `--space-3` | 12px | Chip padding, small card inner padding |
| `--space-4` | 16px | Default element spacing, input padding |
| `--space-5` | 20px | Card inner padding (mobile) |
| `--space-6` | 24px | Card inner padding (desktop), section gaps |
| `--space-8` | 32px | Between cards in a feed, section spacing |
| `--space-10` | 40px | Between major page sections |
| `--space-12` | 48px | Page top/bottom padding |
| `--space-16` | 64px | Major section separation |
| `--space-20` | 80px | Hero section vertical padding |
| `--space-24` | 96px | Landing page section spacing |

### 3.2 Component Spacing Guidelines

| Context | Horizontal Padding | Vertical Padding | Gap Between Children |
|---------|-------------------|------------------|---------------------|
| **Button (sm)** | `--space-3` (12px) | `--space-2` (8px) | — |
| **Button (md)** | `--space-4` (16px) | `--space-3` (12px) | — |
| **Button (lg)** | `--space-6` (24px) | `--space-4` (16px) | — |
| **Card** | `--space-6` (24px) | `--space-6` (24px) | `--space-4` (16px) |
| **Card (mobile)** | `--space-5` (20px) | `--space-5` (20px) | `--space-3` (12px) |
| **Input field** | `--space-4` (16px) | `--space-3` (12px) | — |
| **Feed list** | — | — | `--space-6` (24px) between cards |
| **Section in page** | — | — | `--space-10` (40px) between sections |
| **Nav bar height** | — | 56px total | — |
| **Bottom tab bar** | — | 52px total | — |

---

## 4. Elevation & Shadows

### 4.1 Shadow Scale

All shadows use warm-tinted black (`rgba(10, 8, 4, ...)`) to avoid cool-gray shadows on a warm palette.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | `none` | Flat elements |
| `--shadow-xs` | `0 1px 2px rgba(10,8,4,0.15)` | Subtle lift (tags, badges) |
| `--shadow-sm` | `0 2px 4px rgba(10,8,4,0.15), 0 1px 2px rgba(10,8,4,0.10)` | Cards at rest |
| `--shadow-md` | `0 4px 12px rgba(10,8,4,0.20), 0 2px 4px rgba(10,8,4,0.10)` | Cards on hover, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(10,8,4,0.25), 0 4px 8px rgba(10,8,4,0.10)` | Modals, popovers |
| `--shadow-xl` | `0 16px 48px rgba(10,8,4,0.30), 0 8px 16px rgba(10,8,4,0.15)` | Dialogs, floating write button |
| `--shadow-glow-amber` | `0 0 20px rgba(212,148,10,0.25)` | Write button glow effect |
| `--shadow-glow-genre` | `0 0 16px var(--genre-color, rgba(74,158,78,0.2))` | Genre-tinted card glow on hover |

### 4.2 Glassmorphism

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-background` | `rgba(15, 38, 16, 0.65)` | Glass card backgrounds |
| `--glass-blur` | `backdrop-filter: blur(16px)` | Glass blur amount |
| `--glass-border` | `1px solid rgba(255,255,255,0.08)` | Subtle glass edge |
| `--glass-inner-glow` | `inset 0 1px 0 rgba(255,255,255,0.05)` | Top-edge highlight |

> [!NOTE]
> **Glassmorphism is used sparingly** — only for the navigation bar (when scrolled), modal overlays, and the floating write button. Overusing glass effects degrades readability and performance. Cards in the feed use solid `--surface-raised` with subtle borders, NOT glass.

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0px | Sharp edges (progress bars) |
| `--radius-sm` | 4px | Genre tags, small badges |
| `--radius-md` | 8px | Buttons, inputs, chips |
| `--radius-lg` | 12px | Cards, dropdowns |
| `--radius-xl` | 16px | Modal windows, large cards |
| `--radius-2xl` | 24px | Bottom sheets (mobile), pill buttons |
| `--radius-full` | 9999px | Avatars, circular buttons |

---

## 6. Grid & Layout System

### 6.1 Breakpoints

| Name | Min Width | Max Width | Target |
|------|-----------|-----------|--------|
| `mobile-sm` | 0px | 374px | Small phones |
| `mobile` | 375px | 639px | Standard phones |
| `tablet` | 640px | 1023px | Tablets, small laptops |
| `desktop` | 1024px | 1439px | Standard desktops |
| `desktop-lg` | 1440px | ∞ | Wide screens |

### 6.2 Page Layout Grid

#### Desktop (1024px+)

```
┌─ 1440px max-width container ────────────────────────────────────┐
│                                                                  │
│  ┌── Nav (full width, 56px height) ──────────────────────────┐  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  24px margin                                                     │
│  ┌──────────────────────────────────┬─ 24px ─┬───────────────┐  │
│  │                                  │  gap   │               │  │
│  │    Main Content Area             │        │  Right        │  │
│  │    (flex: 1, max 720px)          │        │  Sidebar      │  │
│  │                                  │        │  (320px)      │  │
│  │                                  │        │               │  │
│  └──────────────────────────────────┘        └───────────────┘  │
│  24px margin                                                     │
└──────────────────────────────────────────────────────────────────┘
```

- **Maximum page container:** `1440px`, centered
- **Horizontal page margin:** `24px` (desktop), `16px` (tablet), `0px` (mobile — full-bleed cards)
- **Main content column:** `flex: 1`, caps at `720px` for readability
- **Sidebar:** `320px` fixed width, hidden below `1024px`
- **Gap between main and sidebar:** `24px`

#### Tablet (640px–1023px)

```
┌─ Full width ─────────────────────┐
│  ┌── Nav (full width) ────────┐  │
│  └────────────────────────────┘  │
│  16px margin                     │
│  ┌── Main Content Area ───────┐  │
│  │   (full width, max 680px,  │  │
│  │    centered)               │  │
│  │   No sidebar               │  │
│  └────────────────────────────┘  │
│  16px margin                     │
└──────────────────────────────────┘
```

- No sidebar — sidebar content moves to: (a) horizontal scrollable sections within main content, or (b) a drawer accessible from nav
- Content caps at `680px` centered

#### Mobile (0–639px)

```
┌─ Full width ────────────────┐
│  ┌── Top Bar (48px) ─────┐  │
│  └───────────────────────┘  │
│                              │
│  ┌── Full-bleed content ──┐ │
│  │  Cards have 16px       │ │
│  │  internal padding      │ │
│  │  but extend edge       │ │
│  │  to edge               │ │
│  └────────────────────────┘ │
│                              │
│  ┌── Bottom Tab (52px) ──┐  │
│  └───────────────────────┘  │
└──────────────────────────────┘
```

- Cards are **full-bleed** (no horizontal margin between card edge and screen edge) — maximizes reading width on small screens
- Internal card padding: `16px`
- Bottom navigation: `52px` height with safe area inset on iOS

### 6.3 Story Reading Layout

The story reading page has its own unique layout — even narrower than the standard content column.

| Breakpoint | Content Width | Side Margins |
|------------|--------------|-------------|
| Desktop | `640px` centered | Large margins (centering effect) |
| Tablet | `600px` centered | Moderate margins |
| Mobile | `100%` | `20px` left/right padding |

---

## 7. Icon System

### 7.1 Icon Specifications

| Property | Value |
|----------|-------|
| **Style** | Rounded, 1.5px stroke, slightly organic feel |
| **Grid** | 24×24px design grid |
| **Sizes** | 16px (inline), 20px (default), 24px (nav), 32px (empty states) |
| **Color** | Inherits `currentColor` — uses text color tokens |
| **Corner radius** | 2px on internal shapes |

### 7.2 Icon Inventory

#### Navigation Icons

| Icon Name | Description | Used In |
|-----------|-------------|---------|
| `home` | House with chimney | Nav bar, bottom tabs |
| `compass` | Compass with north indicator | Explore, bottom tabs |
| `edit-pen` | Pen writing on surface | Write button |
| `bell` | Notification bell | Nav bar |
| `user` | Person silhouette | Profile, bottom tabs |
| `search` | Magnifying glass | Search bar, explore |
| `bookmark` | Ribbon/flag shape | Save/bookmark actions |
| `bookmark-filled` | Filled ribbon (saved state) | Active bookmark |
| `arrow-left` | Left-pointing chevron | Back navigation |
| `settings-gear` | Gear/cog (organic feel) | Settings page |

#### Content Icons

| Icon Name | Description | Used In |
|-----------|-------------|---------|
| `seed` | Small sprouting seed | Prompt indicator |
| `branch` | Tree branch diverging | Story count indicator |
| `leaf` | Single leaf | Story indicator |
| `tree` | Full tree | Profile level visualization |
| `book-open` | Open book | Story reading indicator |
| `clock` | Analog clock | Reading time, timestamps |
| `fire` | Flame | Trending indicator |
| `trophy` | Trophy cup | Challenges, achievements |
| `flag` | Waving flag | Report/flag content |
| `share` | Share/external link | Share actions |
| `link` | Chain link | Copy link |
| `more-horizontal` | Three dots (···) | Overflow menu |

#### Reaction Icons

| Icon Name | Description | Used In |
|-----------|-------------|---------|
| `star` | Five-pointed star (outline) | Primary reaction |
| `star-filled` | Filled star | Active primary reaction |
| `flame` | Intense flame | "Chills" reaction |
| `mind-blown` | Exploding head silhouette | "Mind-blown" reaction |
| `heart-crack` | Heart with emotional crack | "Moved" reaction |
| `laugh` | Smiling face | "Hilarious" reaction |
| `sparkles` | Three sparkle stars | "Beautiful" reaction |

#### State Icons

| Icon Name | Description | Used In |
|-----------|-------------|---------|
| `empty-page` | Blank page with fold | Empty states |
| `empty-search` | Magnifying glass with X | No search results |
| `error-cloud` | Cloud with lightning | Error states |
| `offline` | Broken wifi signal | Offline state |
| `check-circle` | Circled checkmark | Success confirmation |
| `alert-triangle` | Warning triangle | Warning states |

### 7.3 Level Icons (Tree Growth)

These are illustrative icons, more detailed than the UI icon set.

| Level | Icon Description | Visual Complexity |
|-------|-----------------|-------------------|
| 🌱 Seed | Single sprout emerging from soil | Minimal — 2 leaves |
| 🌿 Sprout | Small plant with 4-5 leaves | Simple |
| 🌳 Sapling | Thin tree with small canopy | Moderate |
| 🌲 Oak | Full tree with broad canopy | Detailed |
| 🏔️🌲 Sequoia | Massive tree, mountain backdrop | Rich |
| 🌳✨ Ancient | Glowing ancient tree with particles | Most detailed, animated |

> [!TIP]
> The level icons should feel like unlockable achievements — each successive tier is noticeably more detailed and beautiful than the last. The "Ancient" level icon should have a subtle shimmer animation (particle effect) that makes it feel alive and rare.
