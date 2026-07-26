# StoryTree — Design System Specification (continued)

---

# Part III: Page Specifications, Animation, Interactions & Accessibility

---

## 11. Page Specifications

### 11.1 Home Feed Page

**URL:** `/` (authenticated) or `/home`

#### Desktop Layout

```
┌─ Nav Bar (sticky, 56px) ────────────────────────────────────────┐
│  [🌲 StoryTree]    [🔍 Search...]    [✍️ Write]  [🔔 3]  [👤]  │
└─────────────────────────────────────────────────────────────────┘

┌─ Page Container (max 1440px, centered) ─────────────────────────┐
│                                                                  │
│  ┌─ Tabs ───────────────────────────────────────────────────┐   │
│  │ [For You•] [Following] [Trending] [New]                   │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Main Column (flex:1, max 720px) ──┐  ┌─ Sidebar (320px) ─┐ │
│  │                                     │  │                    │ │
│  │  [Prompt Card]                      │  │  [Challenge Card]  │ │
│  │  gap: 24px                          │  │  gap: 32px         │ │
│  │  [Prompt Card]                      │  │  [Rising Authors]  │ │
│  │  gap: 24px                          │  │  gap: 32px         │ │
│  │  [Prompt Card]                      │  │  [Trending Genres] │ │
│  │  gap: 24px                          │  │  gap: 32px         │ │
│  │  [Prompt Card]                      │  │  [Staff Picks]     │ │
│  │  ...                                │  │  gap: 32px         │ │
│  │  [Load More Spinner]               │  │  [Footer Links]    │ │
│  │                                     │  │                    │ │
│  └─────────────────────────────────────┘  └────────────────────┘ │
│           gap: 24px between columns                              │
└──────────────────────────────────────────────────────────────────┘
```

#### Mobile Layout

```
┌─ Top Bar (48px) ─────────────────────┐
│  [🌲]              [🔍]  [🔔 3]      │
└──────────────────────────────────────┘

┌─ Tabs (scrollable) ─────────────────┐
│  [For You•] [Following] [Trending]  →│
└──────────────────────────────────────┘

┌─ Feed (full-bleed) ─────────────────┐
│                                      │
│  ┌─ Prompt Card (full width) ──────┐│
│  │  Internal padding: 20px          ││
│  │  Previews: 2 columns (3rd hidden)││
│  └──────────────────────────────────┘│
│  gap: 12px                           │
│  ┌─ Prompt Card ───────────────────┐│
│  │  ...                             ││
│  └──────────────────────────────────┘│
│                                      │
└──────────────────────────────────────┘

┌─ Bottom Tab Bar (52px + safe area) ──┐
│  [🏠]  [🧭]  [✍️]  [📌]  [👤]       │
└──────────────────────────────────────┘
```

**Component Composition:**
- Nav Bar (organism)
- Feed Tabs (molecule — 4 ghost buttons, active has amber underline)
- Prompt Card × n (molecule)
- Right Sidebar (organism, desktop only)
- Bottom Tab Bar (organism, mobile only)
- Load More Spinner (atom)

**Scroll Behavior:**
- Infinite scroll loads 10 cards per batch
- Pull-to-refresh on mobile (seedling animation)
- Tab bar hides on scroll-down, reappears on scroll-up (mobile)
- Sidebar is `position: sticky`, scrolls with page but stops when its bottom aligns with viewport bottom

**Loading Sequence:**
1. Nav renders immediately (cached)
2. Tabs render immediately (static)
3. Feed shows 3 skeleton Prompt Cards
4. Cards animate in sequentially with 80ms stagger (fade + slide up 12px)
5. Sidebar loads independently (can load slower)

---

### 11.2 Explore Page

**URL:** `/explore`

#### Desktop Layout

```
┌─ Nav Bar ───────────────────────────────────────────────────────┐
└─────────────────────────────────────────────────────────────────┘

┌─ Page Container (max 1080px, centered, no sidebar) ─────────────┐
│                                                                  │
│  Explore                    [🔍 Search genres, prompts...]       │
│  type-ui-2xl                                                     │
│                                                                  │
│  ┌─ Challenge Card (full width, hero) ──────────────────────┐   │
│  │  🏆 THIS WEEK'S CHALLENGE                                │   │
│  │  "Flash Fiction Friday"  ·  ⏰ 4 days  ·  📝 283 entries │   │
│  │  [Enter Challenge]                                        │   │
│  └───────────────────────────────────────────────────────────┘   │
│  gap: 40px                                                       │
│                                                                  │
│  ── 🔥 Trending Prompts ─────────────────────────────────────   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Prompt   │  │ Prompt   │  │ Prompt   │  │ Prompt   │        │
│  │ mini card│  │ mini card│  │ mini card│  │ mini card│        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│  gap: 40px                                                       │
│                                                                  │
│  ── 🌱 Fresh Seeds ──────────────────────────────────────────   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ New      │  │ New      │  │ New      │  [See all →]         │
│  │ prompt   │  │ prompt   │  │ prompt   │                      │
│  │ 0 stories│  │ 1 story  │  │ 0 stories│                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│  gap: 40px                                                       │
│                                                                  │
│  ── 📚 Genres ───────────────────────────────────────────────   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                   │
│  │🩸Horror│ │🚀SciFi │ │🐉Fantas│ │💕Romanc│                   │
│  ├────────┤ ├────────┤ ├────────┤ ├────────┤                   │
│  │🔪Thrill│ │📜Litera│ │😂Comedy│ │🎭Drama │                   │
│  └────────┘ └────────┘ └────────┘ └────────┘                   │
│  gap: 40px                                                       │
│                                                                  │
│  ── 🌟 Rising Authors ──────────────────────────────────────   │
│  [Avatar] [Avatar] [Avatar] [Avatar] [Avatar] → scroll         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Mobile Layout

- Challenge card: full-bleed, reduced padding
- Trending Prompts: horizontal scroll, 2.5 cards visible (peek)
- Fresh Seeds: horizontal scroll, 1.8 cards visible
- Genres: 2×4 grid, each cell 50% width
- Rising Authors: horizontal scroll, avatars `lg` size

**Genre Card Specifications:**

| Property | Value |
|----------|-------|
| Size | Desktop: `calc(25% - 12px)`, Mobile: `calc(50% - 8px)` |
| Height | 100px (desktop), 80px (mobile) |
| Background | Genre color gradient at 10-15% opacity |
| Border | `1px solid` genre color at 20% |
| Border Radius | `radius-lg` |
| Content | Emoji (32px) + Genre name (`type-ui-md`, weight 600) |
| Hover | Background opacity → 25%, scale `1.02`, `shadow-sm` |

---

### 11.3 Prompt Page

**URL:** `/prompt/:slug`

#### Desktop Layout

```
┌─ Nav Bar ───────────────────────────────────────────────────────┐
└─────────────────────────────────────────────────────────────────┘

┌─ Page Container (max 800px, centered, no sidebar) ──────────────┐
│                                                                  │
│  [← Back to Feed]                                               │
│  gap: 24px                                                       │
│                                                                  │
│  ┌─ Prompt Section ─────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  🌱 PROMPT                                                │   │
│  │                                                           │   │
│  │  "What if humans suddenly stopped dreaming?"              │   │
│  │   type-display-md, Playfair Display                       │   │
│  │                                                           │   │
│  │  [Avatar sm] @username · 6h ago · 47 stories              │   │
│  │                                                           │   │
│  │  [📌 Bookmark]  [🔗 Share]  [✍️ Write Your Take]         │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Controls Bar ───────────────────────────────────────────┐   │
│  │  Sort: [🔥 Top •] [🕐 New] [💎 Staff Pick]               │   │
│  │  Filter: [All•] [🩸Horror] [🚀SciFi] [💕Romance] ...  →  │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Story Card ─────────────────────────────────────────────┐   │
│  │  (see component 9.2)                                      │   │
│  └───────────────────────────────────────────────────────────┘   │
│  gap: 16px                                                       │
│  ┌─ Story Card ─────────────────────────────────────────────┐   │
│  │  ...                                                      │   │
│  └───────────────────────────────────────────────────────────┘   │
│  gap: 16px                                                       │
│  ...                                                             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌─ Sticky Bottom Bar ─────────────────────────────────────────────┐
│        [✍️ Write Your Take on this Prompt]  (amber, full-width)  │
└──────────────────────────────────────────────────────────────────┘
```

#### Mobile Layout

- Prompt section: full-bleed, prompt text 3 lines max
- Genre filter bar: horizontal scroll, chips smaller (32px height)
- Story cards: full-bleed, 4 preview lines
- Sticky CTA: bottom bar, above mobile tab bar (total: CTA 52px + tab bar 52px + safe area)

**Prompt Section Specifications:**

| Property | Value |
|----------|-------|
| Background | `surface-raised` |
| Border | `1px solid border-subtle` |
| Border Radius | `radius-xl` (desktop), `0` (mobile full-bleed) |
| Padding | `32px` (desktop), `20px` (mobile) |
| Prompt text | `type-display-md` (Playfair 32px), `text-primary`, max 4 lines desktop, 3 mobile |
| "PROMPT" label | `type-ui-xs`, `text-secondary`, uppercase, letter-spacing `+0.08em`, with seed icon |
| Action buttons | Row of secondary + primary buttons, `gap: 8px` |

**Sticky Bottom CTA:**

| Property | Value |
|----------|-------|
| Height | 52px |
| Background | `surface-base` with glass blur |
| Border Top | `1px solid border-subtle` |
| Button | Primary (amber), `calc(100% - 48px)` width, centered |
| Position | `sticky bottom: 0` (desktop), `fixed bottom: 52px` (mobile, above tab bar) |
| Show condition | Appears after scrolling past the prompt section's "Write Your Take" button |

---

### 11.4 Story Reading Page

**URL:** `/prompt/:slug/story/:storyId`

#### Desktop Layout

```
┌─ Minimal Top Bar ───────────────────────────────────────────────┐
│  [← Back]   "What if humans stopped dreaming?"   📖 8min  🩸    │
└─────────────────────────────────────────────────────────────────┘

┌─ Reading Column (max 640px, centered) ──────────────────────────┐
│                                                                  │
│  "The Last Dreamer"                                              │
│  type-display-sm, Playfair Display                               │
│                                                                  │
│  by @darkwriter · 🌲 Oak                                         │
│  Published 6h ago · 847 words                                    │
│                                                                  │
│  ─ · · · ─                                                       │
│                                                                  │
│  On the 47th night without dreams, the                           │
│  shadows started moving on their own.                            │
│                                                                  │
│  First in the corners of rooms nobody                            │
│  entered. Then in the hallways of                                │
│  hospitals. Then in the bedrooms of                              │
│  children who had stopped crying weeks                           │
│  ago because their eyes had forgotten how.                       │
│                                                                  │
│  [Each paragraph is a selectable unit for                        │
│   inline highlighting. On hover (desktop)                        │
│   a subtle 🖍️ icon appears at the right                         │
│   margin of each paragraph.]                                     │
│                                                                  │
│  ... (full story content) ...                                    │
│                                                                  │
│  ─ · · · ─                                                       │
│                                                                  │
│  ┌─ Reaction Bar (centered) ─────────────────────────────────┐  │
│  │  [⭐ 342] [🔥 89 Chills] [🤯 56] [😢 31] [✨ 18]         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ Author Card ─────────────────────────────────────────────┐  │
│  │  [Avatar lg] @darkwriter · 🌲 Oak                         │  │
│  │  "Writing the stories that keep you awake."               │  │
│  │  23 stories · 4,280 stars                                 │  │
│  │  [Follow]                                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ More on this prompt ─────────────────────────────────────┐  │
│  │  [Story Preview] [Story Preview] [Story Preview]          │  │
│  │  "REM Protocol"  "Dreamless Love" "The Quiet"             │  │
│  │   Sci-Fi          Romance          Thriller               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ Comments Section ────────────────────────────────────────┐  │
│  │  💬 28 Comments                                            │  │
│  │  Sort: [Top •] [New]                                      │  │
│  │                                                            │  │
│  │  [Comment input: "Share your thoughts..."]                │  │
│  │                                                            │  │
│  │  [Comment 1]                                              │  │
│  │    [Reply 1a]                                             │  │
│  │  [Comment 2]                                              │  │
│  │  ...                                                      │  │
│  │                                                            │  │
│  │  [Show more comments]                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌─ Sticky Bottom Bar ─────────────────────────────────────────────┐
│  [✍️ Write Your Take on this Prompt]                             │
└──────────────────────────────────────────────────────────────────┘
```

#### Mobile Layout (Story Swipe Mode)

When arriving from the Prompt Page, stories open in **swipe mode:**

```
┌─ Swipe Container (full screen) ─────┐
│                                      │
│  [← Back]  "What if humans..."  •••  │
│            (dot position indicator)  │
│                                      │
│  ┌─ Story Card (swipeable) ───────┐ │
│  │  🩸 Horror · 📖 8 min           │ │
│  │                                 │ │
│  │  "The Last Dreamer"             │ │
│  │  by @darkwriter                 │ │
│  │                                 │ │
│  │  On the 47th night without      │ │
│  │  dreams, the shadows started    │ │
│  │  moving on their own...         │ │
│  │                                 │ │
│  │  (scrollable within card)       │ │
│  │                                 │ │
│  │  ← swipe for Sci-Fi take →     │ │
│  └─────────────────────────────────┘ │
│                                      │
│  ┌─ Reaction Row ─────────────────┐ │
│  │  [⭐] [🔥] [🤯] [😢] [💬] [📌] │ │
│  └─────────────────────────────────┘ │
│                                      │
│  [🏠] [🧭] [✍️] [📌] [👤]          │
│                                      │
└──────────────────────────────────────┘
```

**Swipe Behavior:**
- Horizontal swipe switches between stories on the same prompt
- Each story card is individually scrollable (vertical) for long stories
- Dot indicators show position (e.g., story 2 of 7)
- Swipe hint text ("← Swipe for Sci-Fi take →") appears for 3 seconds on first load, then fades
- At last story: over-swipe shows elastic bounce + "No more stories" message with "✍️ Write your own" CTA

**Reading Progress Indicator:**
- Thin bar (`2px`) at the very top of the viewport
- Color: `amber-500`
- Width: percentage of story scrolled
- Appears after scrolling begins, hidden at top

**Inline Highlight Behavior (Desktop):**
1. User hovers over a paragraph → subtle `🖍️` icon fades in at the right margin
2. User clicks the `🖍️` or selects text within the paragraph
3. A small popover appears below the paragraph with a text input: "Add a note..."
4. User submits → highlight is created
5. Highlighted paragraphs show a subtle `amber-500` left border (`3px`) and a small bubble indicating highlight count

**Inline Highlight Behavior (Mobile):**
1. User long-presses a paragraph (500ms)
2. Paragraph pulses with `amber-500` at 10% background
3. Bottom sheet slides up with text input
4. Same submission flow

---

### 11.5 Profile Page

**URL:** `/user/:username`

#### Desktop Layout

```
┌─ Nav Bar ───────────────────────────────────────────────────────┐
└─────────────────────────────────────────────────────────────────┘

┌─ Page Container (max 800px, centered) ──────────────────────────┐
│                                                                  │
│  ┌─ Profile Header ─────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  [Avatar 2xl]                                             │   │
│  │   120px                                                   │   │
│  │                                                           │   │
│  │  @darkwriter                                              │   │
│  │  type-ui-2xl                                              │   │
│  │                                                           │   │
│  │  "Writing the stories that keep you awake."               │   │
│  │  type-ui-base, text-secondary                             │   │
│  │                                                           │   │
│  │  🌲 Oak (Tier 4) · 🪵 4,280 Rings                        │   │
│  │                                                           │   │
│  │  📖 23 stories · 🌱 5 prompts · ⭐ 4,280 stars           │   │
│  │  ✨ Top genres: [🩸 Horror] [🔪 Thriller] [🚀 Sci-Fi]    │   │
│  │                                                           │   │
│  │  [Follow]  [Share Profile]                                │   │
│  │                                                           │   │
│  │  ┌─ Streak Visualization ─────────────────────────────┐  │   │
│  │  │  This week: 🟩🟩🟩🟩⬜⬜⬜  (4-day streak)         │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Tabs ───────────────────────────────────────────────────┐   │
│  │  [Stories •(23)] [Prompts (5)] [Bookmarks] [Badges (12)]  │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Tab Content: Stories ────────────────────────────────────┐  │
│  │                                                            │  │
│  │  ┌─ Pinned Story ──────────────────────────────────────┐ │  │
│  │  │  📌 "The Last Dreamer" · 🩸 Horror · ⭐ 342          │ │  │
│  │  │  On prompt: "What if humans stopped dreaming?"      │ │  │
│  │  │  Published 3 days ago                               │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  [Story list item] — compact card                         │  │
│  │  [Story list item]                                        │  │
│  │  [Story list item]                                        │  │
│  │  ...                                                      │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ Tab Content: Badges ─────────────────────────────────────┐  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │  │
│  │  │📖First │ │🌱Plant │ │🏴‍☠️Pion │ │🎭Shape │ │🔥Trail │ │  │
│  │  │ Words  │ │  er    │ │  eer   │ │shifter│ │blazer │ │  │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ │  │
│  │  ┌────────┐ ┌────────┐                                    │  │
│  │  │📅Weekly│ │🏆Chall │  [ 5 locked badges shown grayed ] │  │
│  │  │ Streak │ │ enger  │                                    │  │
│  │  └────────┘ └────────┘                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Mobile Layout
- Avatar: `xl` (80px), left-aligned with text to the right
- Stats: 3 items in a row, vertically stacked label + count
- Streak: horizontal bar below stats
- Tabs: horizontally scrollable
- Story list items: full-bleed compact cards

**Story List Item (Profile Variant):**

| Property | Value |
|----------|-------|
| Layout | Horizontal: genre accent bar (3px left border) + content |
| Height | Auto, ~80px |
| Title | `type-ui-base`, weight 600 |
| Metadata | `type-ui-sm` — "On prompt: ..." · "⭐ 342 · 📖 8 min" |
| Left border | `3px solid` genre color |
| Padding | `16px` |
| Hover | Background → `interactive-hover` |

**Badge Grid Item:**

| Property | Value |
|----------|-------|
| Size | `100px × 100px` (desktop), `80px × 80px` (mobile) |
| Background | `surface-raised` |
| Border Radius | `radius-lg` |
| Content | Emoji (32px) + Name (`type-ui-xs`, weight 600) |
| Earned state | Full opacity, `amber-300` name text |
| Locked state | `opacity: 0.3`, grayscale filter, lock icon overlay |
| Hover (earned) | Tooltip showing full badge description + earn date |

**Streak Visualization:**

| Property | Value |
|----------|-------|
| Layout | 7 squares (Mon–Sun) in a row |
| Square size | 20px × 20px (desktop), 16px (mobile) |
| Active day | `green-500` background, `radius-sm` |
| Inactive day | `green-800` background, `radius-sm` |
| Today (incomplete) | `green-800` with dashed `green-500` border |
| Gap | 4px |
| Label | "N-day streak" below in `type-ui-xs` |

**Own Profile vs. Other's Profile:**

| Element | Own Profile | Other's Profile |
|---------|------------|-----------------|
| Follow button | Hidden | Shown |
| Share button | Shown | Shown |
| Edit Profile button | Shown | Hidden |
| Bookmarks tab | Shown (private by default) | Shown only if public |
| Pinned story | Can pin/unpin | View only |
| Settings link | Shown | Hidden |

---

### 11.6 Settings Page

**URL:** `/settings`

#### Layout (Desktop + Mobile)

Settings uses a simple list layout — no sidebar.

```
┌─ Nav Bar ───────────────────────────────────────────────────────┐
└─────────────────────────────────────────────────────────────────┘

┌─ Page Container (max 600px, centered) ──────────────────────────┐
│                                                                  │
│  Settings                                                        │
│  type-ui-2xl                                                     │
│                                                                  │
│  ── Account ─────────────────────────────────────────────────   │
│  [Avatar xl] @darkwriter     [Change avatar]                    │
│  Display Name: [Input: Dark Writer]                              │
│  Bio: [Textarea: "Writing the stories..."]                       │
│  Email: darkwriter@email.com [Change]                           │
│                                                                  │
│  ── Notifications ───────────────────────────────────────────   │
│  Push Notifications              [Toggle: On]                    │
│  Email Notifications             [Toggle: Off]                   │
│  New stars on your stories       [Toggle: On]                    │
│  Comments on your stories        [Toggle: On]                    │
│  New followers                   [Toggle: Off]                   │
│  New stories on followed prompts [Toggle: On]                    │
│  Weekly challenge reminder       [Toggle: On]                    │
│  Streak reminder                 [Toggle: Off]                   │
│                                                                  │
│  ── Privacy ─────────────────────────────────────────────────   │
│  Public bookmarks                [Toggle: Off]                   │
│  Show streak on profile          [Toggle: On]                    │
│                                                                  │
│  ── Reading ─────────────────────────────────────────────────   │
│  Font size                       [Slider: 100%]                  │
│  Reduced motion                  [Toggle: Off]                   │
│                                                                  │
│  ── Account Actions ────────────────────────────────────────   │
│  [Sign Out]                                                      │
│  [Delete Account]  (danger, opens confirmation dialog)          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Toggle Switch Specifications:**

| Property | Value |
|----------|-------|
| Size | 44px × 24px |
| Knob | 20px circle |
| Off state | `neutral-700` track, `neutral-400` knob |
| On state | `green-500` track, `white` knob |
| Animation | Knob slides with spring ease, 200ms |
| Touch target | 48px × 48px (accessibility minimum) |

---

### 11.7 Notifications Page

**URL:** `/notifications`

```
┌─ Nav Bar ───────────────────────────────────────────────────────┐
└─────────────────────────────────────────────────────────────────┘

┌─ Page Container (max 640px, centered) ──────────────────────────┐
│                                                                  │
│  Notifications            [Mark all as read]                    │
│  type-ui-2xl                                                     │
│                                                                  │
│  ┌─ Tabs ───────────────────────────────────────────────────┐   │
│  │  [All •] [Stars] [Comments] [Follows] [Challenges]        │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ── Today ──────────────────────────────────────────────────    │
│  [Notification Item — unread]                                    │
│  [Notification Item — unread]                                    │
│  [Notification Item — read]                                      │
│                                                                  │
│  ── Yesterday ──────────────────────────────────────────────    │
│  [Notification Item — read]                                      │
│  [Notification Item — read]                                      │
│                                                                  │
│  ── Earlier this week ──────────────────────────────────────    │
│  [Notification Item — read]                                      │
│  ...                                                             │
│                                                                  │
│  [Load more]                                                     │
│                                                                  │
│  ── Empty State ────────────────────────────────────────────    │
│  (if no notifications: bell icon + "All caught up!")            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Grouping:** Notifications are grouped by time period (Today, Yesterday, This Week, Earlier). Within each group, unread items appear first.

**Batch notifications:** If 5+ people star the same story within an hour, collapse into: "⭐ @user1, @user2, and 3 others starred 'The Last Dreamer'"

---

### 11.8 Search Results Page

**URL:** `/search?q=:query`

```
┌─ Nav Bar (search field pre-filled with query) ──────────────────┐
└─────────────────────────────────────────────────────────────────┘

┌─ Page Container (max 800px, centered) ──────────────────────────┐
│                                                                  │
│  Results for "time travel"                                       │
│  type-ui-2xl                                                     │
│                                                                  │
│  ┌─ Tabs ───────────────────────────────────────────────────┐   │
│  │  [Prompts •(12)] [Stories (34)] [Authors (5)] [Tags (3)]  │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Filters (collapsible) ──────────────────────────────────┐   │
│  │  Genre: [All▾]  Length: [All▾]  Time: [All time▾]         │   │
│  │  Sort: [Relevance•] [Top] [New]                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [Search result item]                                            │
│  [Search result item]                                            │
│  [Search result item]                                            │
│  ...                                                             │
│                                                                  │
│  [Load more results]                                             │
│                                                                  │
│  ── Empty state ────────────────────────────────────────────    │
│  "No results for 'query'"                                        │
│  "Try different keywords or browse genres."                     │
│  [Explore Genres]                                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Search Result Item (Prompt Variant):**

```
┌─── Search Result ────────────────────────────────────────┐
│  🌱 "What if time travel was real but only backwards?"    │
│  @timewriter · 18 stories · 🚀 Sci-Fi · 💕 Romance       │
│  ⭐ 1,240 total stars                                     │
└───────────────────────────────────────────────────────────┘
```

**Search Result Item (Story Variant):**

```
┌─── Search Result ────────────────────────────────────────┐
│  📖 "The Reverse Clock"                                   │
│  by @chrononaut · 🚀 Sci-Fi · ⭐ 89 · 📖 6 min           │
│  On prompt: "What if time travel was real but..."        │
│  "...she set the clock backwards and watched as the      │
│   time travel device hummed to life..."                  │
└───────────────────────────────────────────────────────────┘
```

- **Highlighted keywords:** Query terms are highlighted in `amber-300` within results

---

### 11.9 Challenge Page

**URL:** `/challenge/:slug`

Shares the same layout as the Prompt Page, with modifications:

| Difference | Standard Prompt Page | Challenge Page |
|-----------|---------------------|----------------|
| Header accent | Green seed | Amber trophy, warm gradient background |
| Rules section | None | "Challenge Rules" box with constraints listed |
| Timer | None | Live countdown: "3d 14h 22m remaining" |
| Entry count | "47 stories" | "283 entries" |
| Winners section | None | After challenge ends: "🏆 Winners" section at top with gold/silver/bronze cards |
| Badge | None | "🏆 Challenge Entry" badge on all stories |

---

### 11.10 Landing Page (Logged Out)

**URL:** `/` (when not authenticated)

```
┌─ Nav Bar ───────────────────────────────────────────────────────┐
│  [🌲 StoryTree]                       [Sign In]  [Sign Up]      │
└─────────────────────────────────────────────────────────────────┘

┌─ Hero Section (full-width, centered) ───────────────────────────┐
│                                                                  │
│         Every story starts with one idea.                       │
│         type-display-xl, Playfair Display                       │
│                                                                  │
│         One idea creates hundreds of stories.                   │
│         type-ui-xl, text-secondary                              │
│                                                                  │
│         [✍️ Start Writing — It's Free]                           │
│         amber, xl button                                        │
│                                                                  │
│         or [Explore Stories →] ghost link                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─ Live Example Section ──────────────────────────────────────────┐
│                                                                  │
│  See it in action:                                              │
│                                                                  │
│  ┌─ Prompt Card (real, live data) ──────────────────────────┐   │
│  │  🌱 "What if humans suddenly stopped dreaming?"           │   │
│  │                                                           │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │   │
│  │  │ Horror     │  │ Sci-Fi     │  │ Romance    │         │   │
│  │  │ version    │  │ version    │  │ version    │         │   │
│  │  └────────────┘  └────────────┘  └────────────┘         │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Same idea. Three completely different stories.                 │
│  That's the power of StoryTree.                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─ Social Proof Section ──────────────────────────────────────────┐
│                                                                  │
│  [stat] prompts posted · [stat] stories written ·               │
│  [stat] active writers                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─ How It Works Section ──────────────────────────────────────────┐
│                                                                  │
│  1. Find a prompt that sparks your imagination                  │
│  2. Write your unique take on the idea                          │
│  3. Read how others interpreted the same prompt                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─ CTA Section ───────────────────────────────────────────────────┐
│                                                                  │
│  Ready to grow your story?                                      │
│  [✍️ Join StoryTree]                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─ Footer ────────────────────────────────────────────────────────┐
│  About · Privacy · Terms · Help · Twitter · Discord             │
│  © 2026 StoryTree                                               │
└─────────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **The landing page must show real content, not marketing fluff.** The live prompt card with real story previews IS the marketing. It demonstrates the value proposition in a way no copywriting can match. "Same idea, three completely different stories" — let the product speak for itself.

---

### 11.11 404 / Error Page

**URL:** Any invalid route

```
┌─ Nav Bar ───────────────────────────────────────────────────────┐
└─────────────────────────────────────────────────────────────────┘

┌─ Centered Content ──────────────────────────────────────────────┐
│                                                                  │
│         🌱                                                       │
│         (wilted seedling illustration)                           │
│                                                                  │
│         This story hasn't been written yet.                     │
│         type-ui-xl                                              │
│                                                                  │
│         The page you're looking for doesn't exist.              │
│         Maybe the story was deleted, or the link is wrong.      │
│         type-ui-base, text-secondary                            │
│                                                                  │
│         [Go Home]  [Explore]                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Animation & Motion System

### 12.1 Timing & Easing

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `--motion-instant` | 100ms | `ease-out` | Micro-feedback (button press scale) |
| `--motion-fast` | 150ms | `ease-out` | Hover effects, tooltip appear |
| `--motion-normal` | 250ms | `cubic-bezier(0.4, 0, 0.2, 1)` | State transitions, modal appear |
| `--motion-slow` | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Page transitions, large element shifts |
| `--motion-gentle` | 600ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Organic/tree-like growth animations |
| `--motion-spring` | 500ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy feedback (reaction tap, FAB) |

### 12.2 Micro-Interactions

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| **Button hover** | Scale `1.0 → 1.01`, shadow deepens | `--motion-fast` | ease-out |
| **Button press** | Scale `1.0 → 0.97` | `--motion-instant` | ease-out |
| **Card hover** | Shadow deepens, Y translate `-2px` | `--motion-fast` | ease-out |
| **Star reaction tap** | Scale `1.0 → 1.4 → 1.0`, brief amber glow | `--motion-spring` | spring |
| **Emotional reaction tap** | Icon bounce (Y: `0 → -6px → 0`), count flips up | `--motion-spring` | spring |
| **Bookmark toggle** | Ribbon icon "folds" in (filled) or "unfolds" out (outline) | `--motion-normal` | ease |
| **Follow button** | Text cross-fades "Follow" → "Following ✓" | `--motion-normal` | ease |
| **Genre chip select** | Background fills from center outward | `--motion-fast` | ease-out |
| **Avatar hover** | Scale `1.0 → 1.05` | `--motion-fast` | ease-out |
| **Toast appear** | Slide up 16px + fade in | `--motion-normal` | ease-out |
| **Toast dismiss** | Slide down 16px + fade out | `--motion-normal` | ease-in |
| **Search modal open** | Overlay fades, modal scales `0.95 → 1.0` | `--motion-normal` | ease-out |
| **Notification dot** | Subtle pulse (opacity `0.7 → 1.0 → 0.7`), repeating | `2s` | ease-in-out |
| **Write FAB** | Idle: subtle `shadow-glow-amber` pulse every 4s | `1.5s` | ease-in-out |

### 12.3 Page Transitions

| Transition | Animation | Duration |
|-----------|-----------|----------|
| **Feed → Prompt Page** | Prompt card expands to fill screen (shared element transition) | `--motion-slow` |
| **Prompt Page → Story** | Story card slides in from right, prompt page dims | `--motion-slow` |
| **Story → Story (swipe)** | Horizontal slide with parallax (outgoing card moves at 0.8× speed) | `300ms` |
| **Any → Write Editor** | Slide up from bottom (sheet reveal) | `--motion-slow` |
| **Tab switch** | Content cross-fades, tab underline slides | `--motion-normal` |
| **Filter change** | Story list fades out (100ms) → fades in with new content (200ms) | `300ms` total |

### 12.4 Loading Animations

| Element | Animation |
|---------|-----------|
| **Skeleton pulse** | Shimmer gradient sweep left-to-right, `1.5s` infinite |
| **Pull-to-refresh** | Seedling grows from seed (3 keyframes), then rotates on full pull |
| **Page spinner** | Tree ring concentric circles, rotating | 
| **Publish progress** | Seed grows → sprout → leaf → "Published!" with checkmark |
| **Level-up** | Golden particle explosion outward from the level badge |

### 12.5 Scroll-Triggered Animations

| Element | Trigger | Animation |
|---------|---------|-----------|
| **Feed cards** | Enter viewport | Fade in + slide up 12px, 80ms stagger between cards |
| **Story body paragraphs** | Enter viewport | Subtle fade in (opacity `0 → 1`), 50ms stagger |
| **Explore sections** | Enter viewport | Fade in + slide up 20px |
| **Profile stats** | Enter viewport | Number counts up from 0 (slot-machine effect) |

### 12.6 Reduced Motion

When the user has `prefers-reduced-motion: reduce`:
- All animations reduce to simple fades (opacity only)
- No transforms (scale, translate, rotate)
- No parallax
- Skeleton loaders use opacity pulse instead of gradient sweep
- Durations cut in half
- Spring animations replaced with linear easing

---

## 13. Interaction Patterns

### 13.1 Click / Tap Targets

| Element | Min Touch Target | Desktop Click Area |
|---------|-----------------|-------------------|
| Buttons | 48px × 48px | Visual bounds + 4px padding |
| Icons (standalone) | 44px × 44px | 44px × 44px (transparent hit area if icon is smaller) |
| List items | Full width × 48px min height | Full width × item height |
| Genre chips | 44px height (min) | Visual bounds |
| Tab items | 44px height | Full tab area including label |
| Reaction buttons | 44px × 44px | 44px × 44px |

### 13.2 Hover Behaviors (Desktop Only)

| Element | Hover Effect |
|---------|-------------|
| **Prompt card** | Elevate shadow, slight upward shift |
| **Story card** | Elevate shadow + genre-colored left border appears |
| **Author username** | Underline, color → `text-link` |
| **Avatar (clickable)** | Scale 1.05 |
| **Genre chip (in filter)** | Background opacity increases |
| **Paragraph (story reading)** | Faint `🖍️` icon appears at right margin for highlighting |
| **Notification item** | Background → `interactive-hover` |
| **"Read Full Story" link** | Arrow translates right 4px |

### 13.3 Swipe Gestures (Mobile Only)

| Gesture | Context | Action |
|---------|---------|--------|
| **Swipe left/right** | Story reading (swipe mode) | Navigate between stories on same prompt |
| **Swipe left on notification** | Notification list | Reveal "Mark read" / "Delete" actions |
| **Swipe down from top** | Feed | Pull-to-refresh |
| **Swipe right from edge** | Any page (iOS) | Navigate back (system gesture, don't override) |

### 13.4 Scroll Behaviors

| Behavior | Implementation |
|----------|---------------|
| **Infinite scroll** | Load next batch at 300px from bottom; show spinner; stop at end |
| **Sticky nav bar** | Nav sticks at top, glassmorphism activates on scroll |
| **Mobile tab bar** | Hides on scroll-down, reveals on scroll-up (similar to iOS Safari) |
| **Reading progress** | Thin `amber-500` bar at top of story pages, width = % scrolled |
| **Sticky CTA** | "Write Your Take" bar sticks to bottom on prompt/story pages |
| **Sidebar sticky** | Right sidebar sticks below nav, scrolls if longer than viewport |
| **Smooth anchor scroll** | Comments link scrolls to comments section with `scroll-behavior: smooth` |

### 13.5 Keyboard Shortcuts (Desktop)

| Shortcut | Action |
|----------|--------|
| `/` | Focus search bar |
| `n` | New prompt / write (when not in input) |
| `j` / `k` | Next / previous item in feed or story list |
| `Enter` | Open focused item |
| `Escape` | Close modal / search / go back |
| `b` | Bookmark focused item |
| `s` | Star focused story |
| `?` | Show keyboard shortcuts overlay |

### 13.6 Long Press (Mobile)

| Context | Action |
|---------|--------|
| **Story paragraph** | Trigger inline highlight flow |
| **Prompt card** | Quick actions: Bookmark, Share, Report |
| **Story card** | Quick actions: Bookmark, Share, Report |
| **Avatar** | Preview user card (popup) |

---

## 14. Accessibility Guidelines

### 14.1 WCAG Compliance Target

**WCAG 2.1 Level AA** across all pages and components.

### 14.2 Color Contrast Ratios

| Element | Minimum Ratio | Our Target | Verification |
|---------|--------------|------------|-------------|
| **Body text on dark bg** | 4.5:1 | `neutral-300` (#c2c2b6) on `green-950` (#0a1a0a) = **11.2:1** ✅ | Passes AAA |
| **Story text** | 4.5:1 | `neutral-200` (#deded4) on `surface-reading` (#16201a) = **10.8:1** ✅ | Passes AAA |
| **Secondary text** | 4.5:1 | `neutral-400` (#9e9e90) on `green-950` = **6.8:1** ✅ | Passes AA |
| **Placeholder text** | 3:1 (non-text) | `neutral-500` (#7a7a6e) on `green-900` = **3.5:1** ✅ | Passes minimum |
| **Button text (amber)** | 4.5:1 | `green-950` (#0a1a0a) on `amber-500` (#d4940a) = **6.4:1** ✅ | Passes AA |
| **Links** | 4.5:1 | `green-400` (#6bbd6f) on `green-950` = **7.2:1** ✅ | Passes AA |
| **Genre tag text** | 4.5:1 | Genre primary on genre background → All combinations ≥ 5.0:1 ✅ | Verified per genre |
| **Disabled text** | No requirement | `neutral-600` on `green-950` = **3.2:1** | Acceptable for disabled |

### 14.3 Keyboard Navigation

**Tab Order (per page):**

| Page | Tab Sequence |
|------|-------------|
| **Home Feed** | Skip link → Logo → Search → Write button → Bell → Avatar → Tab bar → First card → Card actions → Next card → ... → Sidebar sections |
| **Prompt Page** | Skip link → Back → Prompt bookmark/share/write → Sort buttons → Genre filter chips → First story card → ... |
| **Story Reading** | Skip link → Back → Story content (skips to reactions) → Reaction buttons → Author card → Comments → Write CTA |

**Focus Management Rules:**

| Scenario | Focus Behavior |
|----------|---------------|
| Modal opens | Focus moves to first interactive element in modal. Trap focus within modal. |
| Modal closes | Focus returns to the element that triggered the modal. |
| Tab switch | Focus moves to first content item in the new tab panel. |
| Page navigation | Focus moves to `<main>` element (or skip-link target). |
| Toast appears | Does NOT steal focus. Announced via `aria-live="polite"`. |
| Error appears | Focus moves to error message. Announced via `aria-live="assertive"`. |
| Infinite scroll loads | Focus remains on current position. New items are NOT announced (prevent spam). |

### 14.4 Screen Reader Annotations

**ARIA Roles & Labels:**

| Element | ARIA Implementation |
|---------|-------------------|
| **Nav bar** | `<nav aria-label="Main navigation">` |
| **Feed** | `<main aria-label="Story feed">` |
| **Tab bar** | `role="tablist"`, each tab `role="tab"`, panels `role="tabpanel"` |
| **Prompt card** | `<article aria-label="Prompt: [prompt text snippet]">` |
| **Story card** | `<article aria-label="Story: [title] by [author], [genre], [star count] stars">` |
| **Reaction bar** | `role="group" aria-label="Reactions"`, each button `aria-label="[reaction name], [count] reactions"` |
| **Reaction button (active)** | `aria-pressed="true"` |
| **Genre filter** | `role="radiogroup" aria-label="Filter by genre"` |
| **Search modal** | `role="dialog" aria-label="Search StoryTree"` |
| **Star count** | `aria-label="342 stars"` (not just "342") |
| **Reading time** | `aria-label="8 minute read"` |
| **Level badge** | `aria-label="Level: Oak, Tier 4"` |
| **Streak** | `aria-label="Writing streak: 4 days this week"` |
| **Skeleton loader** | `aria-hidden="true"` + `aria-busy="true"` on parent |
| **Toast** | `role="status" aria-live="polite"` |
| **Error state** | `role="alert" aria-live="assertive"` |
| **Notification count** | `aria-label="3 unread notifications"` |
| **Bookmark (toggled)** | `aria-label="Bookmark prompt" aria-pressed="false/true"` |

**Skip Link:**
- First element in DOM: `<a href="#main-content" class="skip-link">Skip to content</a>`
- Visually hidden until focused
- On focus: appears as a fixed banner at top of page, `amber-500` background

### 14.5 Semantic HTML Structure

```html
<!-- Page template -->
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header>
    <nav aria-label="Main navigation">...</nav>
  </header>
  <main id="main">
    <h1>Page Title</h1>
    <!-- Page content using article, section, aside -->
  </main>
  <aside aria-label="Sidebar">...</aside>
  <footer>...</footer>
</body>
```

**Heading Hierarchy (per page):**

| Page | h1 | h2 examples |
|------|-----|-------------|
| Home Feed | "Your Feed" (visually hidden) | "For You", "Trending" (tab labels) |
| Explore | "Explore" | "Trending Prompts", "Fresh Seeds", "Genres" |
| Prompt Page | The prompt text itself | "Stories", "Comments" |
| Story Reading | Story title | Author name section, "More on this prompt", "Comments" |
| Profile | "@username" | "Stories", "Prompts", "Badges" |

### 14.6 Touch Target Sizing

| Element | Minimum Size | Implementation |
|---------|-------------|----------------|
| All buttons | 44px × 44px | Increase hit area with transparent padding if visual size < 44px |
| Tab items | 44px height | Padding extends tap area |
| List items | 48px height minimum | Full-width tap area |
| Close buttons | 44px × 44px | Even if ✕ icon is 16px, the tap area is 44×44 |
| Spacing between targets | 8px minimum | Prevents mis-taps |

### 14.7 Reduced Motion Support

**Implementation:**

```
@media (prefers-reduced-motion: reduce) {
  /* All transitions become instant or opacity-only */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.15s !important;
  }
  
  /* Specific overrides for essential animations */
  .skeleton-loader { /* simplified pulse */ }
  .page-transition { /* cross-fade only */ }
}
```

- Skeleton loaders: opacity pulse only (no gradient sweep)
- Page transitions: simple cross-fade
- Reaction animations: immediate state change, no bounce
- Scroll-triggered animations: immediate appearance
- Parallax: disabled
- Auto-playing motion: stopped

### 14.8 Text Scaling

- All text sizes defined in `rem` (relative to root)
- Layout must remain functional at `200%` browser zoom
- No text truncation at `150%` zoom (except where explicitly designed with ellipsis)
- Reading font size adjustable in Settings (80%–150% range)

### 14.9 Focus Indicators

| Context | Focus Style |
|---------|------------|
| **Default** | `2px solid amber-500`, `2px offset`, rounded to match element |
| **On dark backgrounds** | `2px solid amber-400` (brighter for contrast) |
| **On amber backgrounds** | `2px solid green-950` (inverted for contrast) |
| **Visibility** | `:focus-visible` only (not `:focus`) — hides on mouse click, shows on keyboard |

### 14.10 Color-Blind Safe Design

- Genre identification uses **emoji + text label** — never color alone
- Reaction types use **distinct icons** — never distinguished only by color
- Charts/graphs (if ever added) must use pattern fills in addition to color
- Streak visualization: active days use `green-500` fill + subtle checkmark icon (not just color)
- Error states use `red border + ⚠️ icon + text` — not just red color

### 14.11 RTL (Right-to-Left) Considerations

- Layout uses CSS logical properties (`margin-inline-start` instead of `margin-left`)
- Icons that imply direction (arrows, share) are mirrored in RTL
- Text alignment respects `dir` attribute
- The reading column width and typography remain unchanged in RTL (Lora has RTL support)

---

## 15. Responsive Behavior Summary

| Component | Desktop (1024+) | Tablet (640–1023) | Mobile (0–639) |
|-----------|----------------|-------------------|----------------|
| **Nav** | Top bar with search, write button, bell, avatar | Top bar, search icon (opens full-width), write icon | Minimal top bar + bottom tab bar |
| **Sidebar** | 320px right column | Hidden (content moves inline or drawer) | Hidden |
| **Feed cards** | Max 720px, with preview tiles | Max 680px, 2 preview tiles | Full-bleed, 2 preview tiles |
| **Prompt page** | Max 800px centered, genre filter wraps | Max 680px, genre filter scrolls | Full-bleed, genre filter scrolls |
| **Story reading** | 640px column | 600px column | Full width, 20px padding |
| **Story swipe** | Not available (standard reading) | Not available | Full-screen swipe mode |
| **Profile** | Max 800px, 2xl avatar | Max 680px, xl avatar | Full-bleed, xl avatar left-aligned |
| **Modals** | Centered overlay, max 640px | Centered overlay, max 600px | Full-screen or bottom sheet |
| **Write editor** | 680px column, side toolbar | 600px column | Full-screen, bottom toolbar |
| **Search** | Modal overlay | Modal overlay | Full-screen |
