# StoryTree — Design System Specification (continued)

---

# Part II: Component Library

Every component is documented with: anatomy, variants, states, sizing, and responsive behavior.

---

## 8. Atoms

### 8.1 Button

**Variants:**

| Variant | Background | Text Color | Border | Use Case |
|---------|-----------|------------|--------|----------|
| **Primary** | `amber-500` | `text-inverse` | none | Main CTAs: "Write Your Take", "Publish" |
| **Secondary** | `transparent` | `green-400` | `1px solid green-600` | Secondary actions: "Follow", "Share" |
| **Ghost** | `transparent` | `neutral-300` | none | Tertiary actions: "Cancel", sort options |
| **Danger** | `transparent` | `error` | `1px solid error` | Destructive: "Delete Story", "Remove" |
| **Icon-only** | `transparent` | `neutral-400` | none | Bookmark, share, more menu |

**Sizes:**

| Size | Height | Font | Padding (H) | Icon Size | Border Radius |
|------|--------|------|-------------|-----------|---------------|
| `sm` | 32px | `type-ui-sm` | 12px | 16px | `radius-md` |
| `md` | 40px | `type-ui-base` | 16px | 20px | `radius-md` |
| `lg` | 48px | `type-ui-md` | 24px | 20px | `radius-md` |
| `xl` | 56px | `type-ui-lg` | 32px | 24px | `radius-lg` |

**States:**

| State | Visual Change |
|-------|--------------|
| **Default** | As specified per variant |
| **Hover** | Background lightens 10%, cursor `pointer`, `shadow-xs`, scale `1.01` over 150ms |
| **Focus** | `2px` outline in `amber-500` at 40% opacity, `2px` offset. Visible on keyboard nav only (`:focus-visible`) |
| **Active / Pressed** | Background darkens 5%, scale `0.98` over 80ms |
| **Disabled** | Opacity `0.4`, cursor `not-allowed`, no hover effects |
| **Loading** | Text replaced with spinning loader (16px), button width locked to prevent layout shift |

### 8.2 Input / Text Field

**Variants:**

| Variant | Description |
|---------|-------------|
| **Default** | Single-line text input |
| **Search** | With magnifying glass icon prefix |
| **Textarea** | Multi-line, resizable vertically |

**Anatomy:**

```
┌───────────────────────────────────────┐
│ [🔍 icon]  Placeholder text...        │
└───────────────────────────────────────┘
  ↑ Optional prefix icon       ↑ Optional clear (✕) button
```

**Specifications:**

| Property | Value |
|----------|-------|
| Height (single-line) | 44px |
| Background | `surface-raised` |
| Border | `1px solid border-default` |
| Border Radius | `radius-md` (8px) |
| Text | `type-ui-base`, `text-primary` |
| Placeholder | `type-ui-base`, `text-tertiary` |
| Padding | `12px 16px` |
| Icon size | 20px, `text-secondary` |

**States:**

| State | Visual Change |
|-------|--------------|
| **Default** | As specified |
| **Hover** | Border → `border-strong` |
| **Focus** | Border → `amber-500`, outer glow `0 0 0 3px rgba(212,148,10,0.15)` |
| **Filled** | Text in `text-primary`, clear button appears (if enabled) |
| **Error** | Border → `color-error`, error message appears below in `type-ui-sm` + `color-error` |
| **Disabled** | Background → `surface-sunken`, opacity `0.5` |

### 8.3 Avatar

**Sizes:**

| Size | Dimensions | Font (initials) | Usage |
|------|-----------|-----------------|-------|
| `xs` | 24px | 10px / 700 | Inline mentions, compact lists |
| `sm` | 32px | 13px / 600 | Comment threads, notification items |
| `md` | 40px | 15px / 600 | Story cards, author rows |
| `lg` | 56px | 20px / 600 | Profile headers (mobile) |
| `xl` | 80px | 28px / 700 | Profile page hero |
| `2xl` | 120px | 40px / 700 | Profile page hero (desktop) |

**Specifications:**

| Property | Value |
|----------|-------|
| Shape | Circle (`radius-full`) |
| Border | `2px solid border-subtle` |
| Fallback | First letter of username, on `green-700` background |
| Level badge | Overlaid at bottom-right, 40% of avatar size |
| Online indicator | Green dot at bottom-right (if ever needed, not V1) |

**States:**

| State | Visual |
|-------|--------|
| **Default** | Image or initials |
| **Loading** | Circular skeleton pulse |
| **Error (image fail)** | Initials fallback |
| **Hover (clickable)** | Subtle scale `1.05`, 150ms ease |

### 8.4 Badge

**Types:**

| Type | Example | Background | Text | Shape |
|------|---------|-----------|------|-------|
| **Count** | `47 stories` | `green-800` | `neutral-200` | Pill (`radius-2xl`) |
| **Notification** | `3` | `color-error` | `white` | Circle (min 20px) |
| **Level** | `🌲 Oak` | `green-800` | `amber-300` | Pill |
| **Staff Pick** | `💎 Staff Pick` | `amber-500` at 15% | `amber-300` | Pill |
| **New** | `New` | `green-500` at 20% | `green-300` | Pill |

**Specifications:**

| Property | Value |
|----------|-------|
| Height | 22px (count/level), 18px (notification) |
| Font | `type-ui-xs` |
| Padding | `2px 8px` (pill), `0` (circle) |
| Min width (circle) | 20px |

### 8.5 Genre Tag

The genre tag is a colored chip that identifies a story's genre.

**Anatomy:**

```
┌─────────────────┐
│ 🩸 Horror       │
└─────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Height | 28px |
| Font | `type-ui-sm`, weight 500 |
| Padding | `4px 12px` |
| Border Radius | `radius-sm` (4px) |
| Background | Genre color at 15% opacity |
| Text Color | Genre primary color |
| Border | `1px solid` genre color at 25% opacity |
| Icon | Genre emoji, 14px |
| Gap (icon to text) | 4px |

**States:**

| State | Visual |
|-------|--------|
| **Default** | As specified |
| **Hover** (in filter context) | Background opacity → 25%, border opacity → 40% |
| **Selected** (in filter context) | Background opacity → 30%, text weight → 600, checkmark icon appears |

### 8.6 Reaction Button

The individual reaction button within the Reaction Bar.

**Anatomy:**

```
┌───────────────┐
│  🔥  89       │
└───────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Height | 36px |
| Min Width | 56px |
| Font | `type-ui-sm` (count), Mono for the number |
| Padding | `6px 12px` |
| Border Radius | `radius-2xl` (pill) |
| Background | `transparent` |
| Border | `1px solid border-subtle` |
| Gap (icon to count) | 6px |
| Icon Size | 18px |

**States:**

| State | Visual |
|-------|--------|
| **Default** | Neutral colors, subtle border |
| **Hover** | Background → `interactive-hover`, icon scale `1.1` |
| **Active (user has reacted)** | Background → genre color at 15%, text → genre color, border → genre color at 30%, icon has subtle pulse animation (0.3s) |
| **Animating** (just tapped) | Icon jumps up 4px then settles, count increments with slot-machine animation |

### 8.7 Tooltip

| Property | Value |
|----------|-------|
| Background | `surface-overlay` |
| Text | `type-ui-sm`, `text-primary` |
| Padding | `6px 12px` |
| Border Radius | `radius-md` |
| Shadow | `shadow-md` |
| Arrow | 6px, matches background |
| Max Width | 240px |
| Delay | 400ms hover before appearing |
| Animation | Fade in + slide 4px toward trigger over 150ms |

### 8.8 Divider

| Variant | Visual |
|---------|--------|
| **Horizontal** | `1px solid border-subtle`, full width |
| **Vertical** | `1px solid border-subtle`, full height |
| **Section** | `1px solid border-subtle`, with centered label text in `type-ui-sm` + `text-secondary` |
| **Story break** | Three centered dots `· · ·` in `text-tertiary`, `space-8` vertical margin |

### 8.9 Skeleton Loader

Skeleton loaders replace content during loading states. They pulse between two luminance values.

| Property | Value |
|----------|-------|
| Base Color | `green-800` |
| Pulse Color | `green-700` |
| Animation | Pulse between base and pulse color, `1.5s` ease-in-out, infinite |
| Border Radius | Matches the element being replaced |
| Height | Matches the element being replaced |

**Skeleton Shapes:**

| Element | Skeleton |
|---------|----------|
| Text line | Rectangle, 80-100% width, 14px height, `radius-sm` |
| Avatar | Circle, matching avatar size |
| Card | Rectangle matching card dimensions, internal text lines + avatar skeleton |
| Image | Rectangle with slight gradient overlay |
| Button | Rectangle matching button dimensions |
| Genre tag | Pill shape, 60px × 28px |

---

## 9. Molecules

### 9.1 Prompt Card (Feed Variant)

The prompt card is the primary content unit in the feed. It shows a prompt with inline story previews.

**Anatomy:**

```
┌─── Prompt Card ─────────────────────────────────────────┐
│                                                          │
│  🌱  [Prompt text in Playfair Display, 2 lines max]      │
│                                                          │
│  [Avatar xs] @username · 6h ago         [···] overflow   │
│                                                          │
│  [🔥 47 stories]  [🩸 Horror] [🚀 Sci-Fi] [💕 Romance]  │
│                                                          │
│  ┌─ Preview ──┐  ┌─ Preview ──┐  ┌─ Preview ──┐        │
│  │ "The Last  │  │ "REM       │  │ "Dreamless │        │
│  │  Dreamer"  │  │  Protocol" │  │  Love"     │        │
│  │ @darkwriter│  │ @scifi_fan │  │ @romantic  │        │
│  │ ⭐ 342     │  │ ⭐ 218     │  │ ⭐ 156     │        │
│  └────────────┘  └────────────┘  └────────────┘        │
│                                                          │
│  [✍️ Write Your Take]              [📌 Bookmark]         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Background | `surface-raised` |
| Border | `1px solid border-subtle` |
| Border Radius | `radius-lg` (12px) |
| Padding | `24px` (desktop), `20px` (mobile) |
| Shadow | `shadow-sm` |
| Max Width | `720px` |
| Prompt Font | `type-display-sm` (Playfair Display), 2 lines max, ellipsis overflow |
| Metadata Font | `type-ui-sm`, `text-secondary` |
| Story Preview Width | `calc((100% - 2 × 12px) / 3)` — three equal columns with 12px gap |

**States:**

| State | Visual |
|-------|--------|
| **Default** | As specified |
| **Hover** | `shadow-md`, border lightens slightly, subtle background shift to `green-800` |
| **Loading** | Skeleton: 2 text lines + 3 preview card skeletons + 1 metadata line |
| **Prompt with 0 stories** | No preview section. Instead: "🌱 Be the first to write a story" amber text with sparkle animation |

**Responsive (Mobile):**
- Full-bleed (no horizontal margin)
- Preview cards stack to show 2 (third hidden with `+N more` label)
- Prompt text max 3 lines

### 9.2 Story Card (Prompt Page Variant)

Shown on the Prompt Page under the story list.

**Anatomy:**

```
┌─── Story Card ──────────────────────────────────────┐
│                                                      │
│  "The Last Dreamer"                                  │
│  [🩸 Horror]  ·  📖 8 min read                       │
│                                                      │
│  "On the 47th night without dreams, the              │
│   shadows started moving on their own.               │
│   First in the corners of rooms nobody               │
│   entered. Then..."                                  │
│                                                      │
│  [Avatar sm] @darkwriter · 🌲 Oak                    │
│  ⭐ 342  ·  💬 28 comments                           │
│                                                      │
│  [Read Full Story →]                                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Background | `surface-raised` |
| Border | `1px solid border-subtle` |
| Border Radius | `radius-lg` |
| Padding | `24px` |
| Title Font | `type-ui-lg` (Inter 600), `text-primary` |
| Preview Font | `type-story-body` (Lora), `text-story`, 4 lines max with gradient fade-out |
| Metadata Font | `type-ui-sm`, `text-secondary` |
| "Read Full Story" | `type-ui-base`, `text-link`, with right arrow → |

**States:**

| State | Visual |
|-------|--------|
| **Default** | As specified |
| **Hover** | `shadow-md`, left border → `3px solid` genre color (the card "tags" itself with genre color on hover) |
| **Loading** | Skeleton: title line + genre tag + 4 text lines + author row |
| **Expanded (tablet)** | Shows 6 lines of preview instead of 4 |

### 9.3 Story Preview Tile (Feed Card Inline)

The small preview shown inside a Prompt Card.

**Specifications:**

| Property | Value |
|----------|-------|
| Background | `surface-base` (darker than card, creates depth) |
| Border | `1px solid border-subtle` |
| Border Radius | `radius-md` |
| Padding | `12px` |
| Title Font | `type-ui-sm`, weight 600, `text-primary`, 1 line, ellipsis |
| Author Font | `type-ui-xs`, `text-secondary`, 1 line |
| Star Count | `type-ui-xs`, `text-accent` |
| Height | Auto (content-driven) |
| Min Height | 80px |

### 9.4 Author Row

Reusable component showing author avatar, name, and level.

**Anatomy:**

```
[Avatar sm] @darkwriter · 🌲 Oak
```

| Property | Value |
|----------|-------|
| Avatar | `sm` (32px) or `xs` (24px) depending on context |
| Username | `type-ui-sm`, weight 500, `text-primary` |
| Level badge | `type-ui-xs`, `text-accent` |
| Gap | `8px` avatar-to-text, `4px` between name items |
| Hover | Username underlines, cursor pointer |

### 9.5 Reaction Bar

The full reaction bar shown beneath stories.

**Anatomy:**

```
┌─────────────────────────────────────────────────────┐
│  [⭐ 342]  [🔥 89 Chills]  [🤯 56]  [😢 31]  [✨ 18] │
└─────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Layout | Horizontal flex, wrap on mobile, `8px` gap between buttons |
| Background | `surface-raised` or transparent depending on context |
| Border | `1px solid border-subtle` (when in its own container) |
| Border Radius | `radius-lg` |
| Padding | `12px 16px` |
| Star button | Slightly larger than others (height `40px` vs `36px`), `amber-500` border when active |

**States:**

| State | Behavior |
|-------|----------|
| **Not logged in** | Buttons clickable → triggers sign-up modal |
| **Logged in, not reacted** | All buttons neutral |
| **Logged in, starred** | Star button filled, amber-colored |
| **Logged in, starred + emotional** | Star + one emotional button active (genre-colored) |
| **Tapping a reaction** | Bounce animation (scale 1.0 → 1.3 → 1.0 over 300ms), count increments with number flip |

### 9.6 Genre Filter Bar

Horizontal scrollable chip bar for filtering stories on the Prompt Page.

**Anatomy:**

```
[All ✓] [🩸 Horror] [🚀 Sci-Fi] [💕 Romance] [🔪 Thriller] →
```

**Specifications:**

| Property | Value |
|----------|-------|
| Layout | Horizontal scroll with fade-out gradient on overflow edges |
| Chip Height | 36px |
| Chip Padding | `6px 16px` |
| Chip Font | `type-ui-sm`, weight 500 |
| Chip Border Radius | `radius-2xl` (pill) |
| Gap | `8px` |
| Scroll padding | `16px` on each side |

**Chip States:**

| State | Background | Text | Border |
|-------|-----------|------|--------|
| **Default** | `transparent` | `text-secondary` | `1px solid border-default` |
| **Hover** | `interactive-hover` | `text-primary` | `1px solid border-strong` |
| **Selected** | Genre color at 20% opacity | Genre color | `1px solid` genre color at 40% |
| **"All" selected** | `green-700` | `text-primary` | none |

**Behavior:**
- Only one genre can be selected at a time (radio behavior)
- "All" is the default selected state
- Selecting a genre filters the story list with a `200ms` fade transition
- On mobile: horizontally scrollable, no wrapping
- On desktop: wraps to second line if more than screen width

### 9.7 Comment Component

**Variant A: Standard Comment**

```
┌─── Comment ──────────────────────────────────────┐
│  [Avatar sm] @reader_name · 2h ago     [···]     │
│                                                   │
│  "This paragraph gave me absolute chills.         │
│   The way you described the shadows was           │
│   masterful."                                     │
│                                                   │
│  [❤️ 12]  [Reply]                                 │
│                                                   │
│  ┌─── Reply (indented) ──────────────────────┐   │
│  │  [Avatar xs] @darkwriter · 1h ago          │   │
│  │  "Thank you! That was the hardest          │   │
│  │   paragraph to write."                     │   │
│  │  [❤️ 3]  [Reply]                           │   │
│  └────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Background | transparent (no card, lives within story page) |
| Left border (replies) | `2px solid border-subtle`, `16px` left indent |
| Max nesting depth | 2 levels (comment → reply → no deeper) |
| Comment font | `type-ui-base`, `text-primary`, Inter |
| Timestamp | `type-ui-sm`, `text-secondary` |
| Max collapsed lines | 6 (expand with "Show more") |
| Like button | Heart icon, `type-ui-sm` count |
| Reply button | `type-ui-sm`, ghost button |
| Max reply depth displayed | 2 (deeper replies flat-linked: "View 3 more replies") |

**Variant B: Inline Highlight Comment**

```
┌─── Inline Highlight ──────────────────────────────────┐
│  🖍️ Highlighted paragraph:                             │
│  ┌────────────────────────────────────────────────┐   │
│  │  "the shadows started moving on their own"     │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  [Avatar sm] @reader · 3h ago                          │
│  "This is where the tone shifts perfectly."            │
│  [❤️ 24]  [Reply]                                      │
└────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Highlighted text | `surface-base` background, `amber-300` left border (3px), italic Lora |
| Highlight icon | 🖍️ marker emoji or `highlight` icon |
| Connection | Clicking the highlight scrolls the reading view to that paragraph and pulses its background `amber-500` at 10% for 2 seconds |

### 9.8 Notification Item

**Anatomy:**

```
┌─── Notification ─────────────────────────────────┐
│  [⭐ icon]  @reader starred your story            │
│             "The Last Dreamer"                    │
│             2h ago                        [•]     │
└───────────────────────────────────────────────────┘
   ↑ colored by type    ↑ linked story title   ↑ unread dot
```

**Specifications:**

| Property | Value |
|----------|-------|
| Height | Auto, min 56px |
| Padding | `12px 16px` |
| Background (unread) | `green-900` (slightly elevated from list background) |
| Background (read) | `transparent` |
| Unread indicator | `8px` circle, `amber-500`, right-aligned |
| Icon | 24px, colored by notification type (star→amber, comment→green, follow→blue) |
| Primary text | `type-ui-base`, `text-primary` |
| Secondary text | `type-ui-sm`, `text-secondary` |
| Timestamp | `type-ui-xs`, `text-tertiary` |
| Hover | Background → `interactive-hover` |
| Click | Navigates to relevant story/prompt/profile |

**Notification Types:**

| Type | Icon | Color | Template |
|------|------|-------|----------|
| Star | ⭐ | `amber-400` | "@user starred your story 'Title'" |
| Reaction | 🔥/🤯/etc | Genre color | "@user reacted 🔥 to your story 'Title'" |
| Comment | 💬 | `green-400` | "@user commented on 'Title'" |
| Follow | 👤 | `info` | "@user started following you" |
| Story on your prompt | 📖 | `green-400` | "@user wrote a story on your prompt 'Title'" |
| Challenge | 🏆 | `amber-400` | "This week's challenge: 'Title'" |
| Streak warning | 🔥 | `warning` | "Your writing streak ends today!" |
| Milestone | 🎉 | `amber-400` | "You earned the 'First Words' badge!" |

### 9.9 Challenge Card

**Anatomy:**

```
┌─── Challenge Card ───────────────────────────────────┐
│                                                       │
│  🏆 THIS WEEK'S CHALLENGE                             │
│                                                       │
│  "Flash Fiction Friday"                               │
│  Write a complete story in under 100 words.           │
│                                                       │
│  ⏰ 4 days left  ·  📝 283 entries                    │
│                                                       │
│  [✍️ Enter Challenge]                                  │
│                                                       │
└───────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Background | Gradient: `green-900` → `amber-900` at 20% opacity (gives a warm glow) |
| Border | `1px solid amber-500` at 30% opacity |
| Border Radius | `radius-xl` (16px) |
| Padding | `24px` |
| Label | `type-ui-xs`, `amber-300`, uppercase, letter-spacing `+0.08em` |
| Title | `type-display-sm` (Playfair), `text-primary` |
| Description | `type-ui-base`, `text-secondary` |
| Timer | `type-ui-sm`, `amber-300`, Mono font for the countdown |
| CTA | Primary button (amber) |

**States:**

| State | Visual |
|-------|--------|
| **Active** | Full display as above |
| **Last 24 hours** | Timer text pulses red, "Ending soon!" label |
| **Ended** | CTA → "View Winners", timer → "Challenge ended" |
| **User entered** | CTA → "View Your Entry" (secondary button), checkmark badge |

### 9.10 Empty States

Every list, feed, and content area has a designed empty state.

**Template:**

```
┌─── Empty State ──────────────────────┐
│                                       │
│         [Illustration Icon]           │
│         64px, text-tertiary           │
│                                       │
│         Primary Message               │
│         type-ui-lg, text-primary      │
│                                       │
│         Secondary Message             │
│         type-ui-base, text-secondary  │
│                                       │
│         [Action Button]               │
│         (optional)                    │
│                                       │
└───────────────────────────────────────┘
```

**Specific Empty States:**

| Context | Icon | Primary | Secondary | Action |
|---------|------|---------|-----------|--------|
| **Feed (no content)** | `seed` (64px) | "Your feed is empty" | "Follow genres and writers to see stories here." | "Explore StoryTree" |
| **Prompt (0 stories)** | `leaf` (64px) | "No stories yet" | "Be the first to write a story on this prompt." | "✍️ Write Your Take" |
| **Search (no results)** | `empty-search` (64px) | "No results for '[query]'" | "Try different keywords or browse genres." | "Explore Genres" |
| **Profile stories (own)** | `book-open` (64px) | "No stories yet" | "Your stories will appear here once you write your first one." | "✍️ Write a Story" |
| **Profile stories (other user)** | `book-open` (64px) | "No stories yet" | "@username hasn't written any stories yet." | — |
| **Bookmarks** | `bookmark` (64px) | "No bookmarks yet" | "Stories and prompts you save will appear here." | "Explore" |
| **Notifications** | `bell` (64px) | "All caught up!" | "We'll notify you when something happens." | — |
| **Comments** | `chat` (64px) | "No comments yet" | "Be the first to share your thoughts." | "Write a comment" |
| **Drafts** | `edit-pen` (64px) | "No drafts" | "Unfinished stories will be saved here automatically." | — |

### 9.11 Error States

**Template:**

```
┌─── Error State ──────────────────────┐
│                                       │
│         [Error Icon]                  │
│         error-cloud, 64px, color-error│
│                                       │
│         "Something went wrong"        │
│         type-ui-lg, text-primary      │
│                                       │
│         Context-specific message      │
│         type-ui-base, text-secondary  │
│                                       │
│         [Retry Button]               │
│                                       │
└───────────────────────────────────────┘
```

**Specific Error States:**

| Context | Message | Action |
|---------|---------|--------|
| **Feed load failure** | "We couldn't load your feed. Check your connection and try again." | "Retry" (primary button) |
| **Story load failure** | "This story couldn't be loaded." | "Retry" + "Back to prompt" |
| **Publish failure** | "Your story couldn't be published. It's been saved as a draft." | "Retry" + "Edit Draft" |
| **Search failure** | "Search is temporarily unavailable." | "Retry" |
| **404 (page not found)** | "This page doesn't exist — maybe the story was deleted, or the link is wrong." | "Go Home" |
| **Rate limited** | "You're posting too fast. Please wait a moment." | Auto-countdown timer |
| **Offline** | "You're offline. Showing cached content." | Banner at top, auto-dismisses on reconnection |

### 9.12 Toast Notification

In-app feedback toasts for completed actions.

**Anatomy:**

```
┌─── Toast ─────────────────────────────────┐
│  [✓ icon]  Story published successfully   │  [✕]
└───────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Position | Bottom-center (desktop), top-center (mobile, below status bar) |
| Background | `surface-overlay` with `glass-blur` |
| Border | `1px solid border-subtle` |
| Border Radius | `radius-lg` |
| Shadow | `shadow-lg` |
| Padding | `12px 20px` |
| Icon | 20px, colored by type (success=green, error=red, info=blue) |
| Font | `type-ui-base`, `text-primary` |
| Max Width | `420px` |
| Duration | 4 seconds (auto-dismiss), or persistent if error |
| Animation | Slide up 16px + fade in over 250ms, slide down + fade out to dismiss |
| Stacking | Max 3 toasts visible. New toasts push old ones up |

**Types:**

| Type | Icon Color | Left Accent Border |
|------|-----------|-------------------|
| **Success** | `color-success` | `3px solid color-success` |
| **Error** | `color-error` | `3px solid color-error` |
| **Info** | `color-info` | `3px solid color-info` |
| **Warning** | `color-warning` | `3px solid color-warning` |

---

## 10. Organisms

### 10.1 Desktop Navigation Bar

**Anatomy:**

```
┌──────────────────────────────────────────────────────────────────┐
│  [🌲 StoryTree]   [🔍 Search StoryTree...]   [✍️ Write] [🔔 3] [👤] │
└──────────────────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Height | 56px |
| Background | `surface-base` (when at top), transitions to `glass-background` + `glass-blur` on scroll |
| Border Bottom | `1px solid border-subtle` |
| Position | `sticky`, `top: 0`, `z-index: 50` |
| Padding | `0 24px` |
| Logo | `type-ui-lg`, weight 700, `text-primary`, tree icon (24px) in `green-400` |
| Search bar | `360px` max width, centered, `44px` height, expands to `480px` on focus |
| Write button | Primary button (amber), size `md`, with `edit-pen` icon |
| Notification bell | Icon-only button, `24px`, with count badge overlay |
| Avatar | `sm` (32px), clickable → dropdown menu |

**Scroll behavior:**
- **At top of page:** Fully opaque `surface-base` background, full shadow-free
- **After scrolling 20px+:** Transitions to glassmorphism (`glass-background` + blur), adds `shadow-sm`, over `200ms`

**States:**

| State | Visual |
|-------|--------|
| **Default (logged in)** | As specified |
| **Logged out** | "Write" button → "Sign In" (secondary), no bell, no avatar. Add "Sign Up" (primary amber) |
| **Search focused** | Search expands, slight overlay dims the page at 20% opacity |

### 10.2 Mobile Bottom Tab Bar

**Anatomy:**

```
┌─────────────────────────────────────────────────┐
│  [🏠]      [🧭]      [✍️]      [📌]      [👤]  │
│  Home     Explore    Write     Saved       Me   │
└─────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Height | 52px + safe area inset (iOS) |
| Background | `surface-base` with `glass-blur` |
| Border Top | `1px solid border-subtle` |
| Position | `fixed`, `bottom: 0`, `z-index: 50` |
| Tab Count | 5 |
| Icon Size | 24px |
| Label Font | `type-ui-xs`, weight 500 |
| Label Gap (below icon) | 2px |
| Active color | `amber-400` (icon + label) |
| Inactive color | `text-tertiary` |
| Write button | **Elevated** — extends 8px above the tab bar, 48px circle, `amber-500` background, `shadow-glow-amber`, `edit-pen` icon in white |

**States:**

| State | Behavior |
|-------|----------|
| **Tap** | Active tab icon + label turns amber, icon scales 1.0 → 1.15 → 1.0 over 200ms |
| **Scroll down** | Tab bar slides down and hides over 200ms (more reading space) |
| **Scroll up / stop** | Tab bar slides up and reappears over 200ms |
| **Write button tap** | Scale `1.0 → 0.9 → 1.0` spring animation, navigates to write flow |

### 10.3 Floating Write Button (FAB — Mobile)

This is the center tab, elevated.

| Property | Value |
|----------|-------|
| Size | 48px circle |
| Background | `amber-500` |
| Shadow | `shadow-xl` + `shadow-glow-amber` |
| Icon | `edit-pen`, 24px, white |
| Position | Integrated into bottom tab bar, raised 8px |
| Border | `3px solid surface-base` (creates separation from tab bar) |

### 10.4 Feed List (Organism)

A vertical list of Prompt Cards with infinite scroll.

**Specifications:**

| Property | Value |
|----------|-------|
| Gap between cards | `24px` (desktop), `16px` (mobile), `0px` (mobile full-bleed variant with 16px vertical gap) |
| Loading behavior | Skeleton of 3 prompt cards shown initially |
| Infinite scroll trigger | Load more when 300px from bottom |
| Load-more indicator | Spinner (24px) + "Loading more stories…" text, `text-tertiary` |
| End of feed | "You've reached the end 🌳" message + "Explore more" link |
| Pull-to-refresh (mobile) | Pull down → tree seedling animation grows → release to refresh |

### 10.5 Right Sidebar (Desktop Only)

**Anatomy:**

```
┌─── Sidebar (320px) ──────────────────┐
│                                       │
│  ┌── Challenge Card ──────────────┐  │
│  │  (see 9.9)                     │  │
│  └────────────────────────────────┘  │
│                                       │
│  ──── Rising Authors ─────────────   │
│  [Avatar sm] @writer1 · 🌿 Sprout   │
│  [Avatar sm] @writer2 · 🌳 Sapling  │
│  [Avatar sm] @writer3 · 🌱 Seed     │
│  See all →                           │
│                                       │
│  ──── Trending Genres ────────────   │
│  [#dystopia 238] [#noir 156]         │
│  [#time-travel 312] [#twist 89]      │
│                                       │
│  ──── Staff Picks ────────────────   │
│  [Story preview tile]                │
│  [Story preview tile]                │
│                                       │
│  ──── Footer ─────────────────────   │
│  About · Privacy · Terms · Help      │
│  © 2026 StoryTree                    │
│                                       │
└───────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Width | `320px` fixed |
| Position | `sticky`, top aligned to below nav |
| Padding | `0 0 0 24px` (gap from main content) |
| Section gap | `space-8` (32px) |
| Section title | `type-ui-xs`, `text-secondary`, uppercase, letter-spacing `+0.08em` |
| Content font | `type-ui-sm` |
| Hidden at | Below `1024px` (content moves to inline sections or bottom sheets) |

### 10.6 Search Modal

**Trigger:** Clicking the search bar (desktop) or search icon (mobile).

**Anatomy (Desktop):**

```
┌─── Search Modal ─────────────────────────────────────────┐
│                                                           │
│  🔍 [Search input, focused, full width          ] [✕]    │
│                                                           │
│  ─── Recent Searches ─────────────────────────────────   │
│  [🕐] "time travel"                           [✕ clear]  │
│  [🕐] "noir"                                  [✕ clear]  │
│                                                           │
│  ─── Trending ────────────────────────────────────────   │
│  [🔥] "AI uprising"  ·  [🔥] "last human on earth"      │
│                                                           │
│  ─── As user types: ──────────────────────────────────   │
│                                                           │
│  Prompts                                                  │
│  🌱 "What if time travel was real but only backwards?"    │
│  🌱 "What if time stopped for everyone except you?"       │
│                                                           │
│  Stories                                                  │
│  📖 "The Reverse Clock" by @writer · ⭐ 89                │
│                                                           │
│  Authors                                                  │
│  👤 @timewriter · "Sci-fi stories about time" · 🌲 Oak    │
│                                                           │
│  Tags                                                     │
│  🏷️ #time-travel (847 prompts)                            │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Overlay | `surface-base` at 60% opacity behind modal |
| Modal Background | `surface-overlay` |
| Border Radius | `radius-xl` |
| Shadow | `shadow-xl` |
| Max Width | `640px`, centered |
| Max Height | `70vh` |
| Input | Auto-focused, 56px height, `type-ui-lg` |
| Section label | `type-ui-xs`, `text-secondary`, uppercase |
| Result item height | 44px |
| Keyboard nav | Arrow keys navigate results, Enter selects, Escape closes |
| Debounce | 250ms after last keystroke before searching |
| Animation | Fade in + scale from `0.95` to `1.0` over 200ms |

**Mobile variant:**
- Full-screen overlay instead of modal
- Search input at top, full width
- Results below in scrollable list
- Back arrow to close (not ✕)

### 10.7 Write / Editor View

**Full-page editor for writing stories.**

**Desktop Anatomy:**

```
┌─── Editor ───────────────────────────────────────────────┐
│  [← Back]   Auto-saved 30s ago       [Preview] [Publish] │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  On prompt: "What if humans stopped dreaming?"            │
│                                                           │
│  Genre: [🩸 Horror ▾]                                     │
│                                                           │
│  ┌── Title (optional) ─────────────────────────────────┐ │
│  │  The Last Dreamer                                    │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌── Story body ───────────────────────────────────────┐ │
│  │                                                      │ │
│  │  On the 47th night without dreams, the               │ │
│  │  shadows started moving on their own.                │ │
│  │                                                      │ │
│  │  First in the corners of rooms nobody                │ │
│  │  entered...                                          │ │
│  │                                                      │ │
│  │  |  ← cursor                                        │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                           │
│  ─── Formatting Bar ──────────────────────────────────   │
│  [B] [I] [—] [" "]                                       │
│  Bold Italic Break Quote                                 │
│                                                           │
│  📊 847 words · 📖 ~4 min read                            │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Layout | Full-page, `surface-base` background |
| Content max-width | `680px` centered (matches reading width) |
| Title input | `type-display-sm` (Playfair), no visible input border (ghost input), placeholder "Untitled" in `text-tertiary` |
| Body editor | `type-story-body` (Lora), line-height `1.8`, same as reading experience |
| Prompt reference | `type-ui-sm`, `text-secondary`, with seed icon, linked (clickable) |
| Genre picker | Dropdown, `40px` height, shows genre emoji + name, required |
| Formatting bar | Sticky at bottom of editor area, `type-ui-sm` icon buttons, `32px` height |
| Word count | `type-ui-sm`, Mono font, `text-secondary`, real-time |
| Reading time | `type-ui-sm`, Mono font, `text-secondary`, calculated as `words / 200` |
| Auto-save | Every 30 seconds, "Auto-saved" indicator fades in for 2s then fades out |
| Publish button | Primary (amber), disabled until: genre selected + body ≥ 100 words |
| Preview button | Secondary, opens a modal showing the story in reading view |

**Formatting options (intentionally limited):**

| Format | Shortcut | Markdown |
|--------|----------|----------|
| **Bold** | Ctrl/⌘ + B | `**text**` |
| **Italic** | Ctrl/⌘ + I | `*text*` |
| **Section break** | `---` | Horizontal rule → renders as `· · ·` |
| **Block quote** | `> ` | Indented quote block |

> [!IMPORTANT]
> **No images, no embeds, no headers, no lists, no tables.** This is a creative writing editor, not a page builder. Limiting formatting forces focus on the prose itself. The editor should feel like a blank page in a journal, not a document editor.

**States:**

| State | Behavior |
|-------|----------|
| **Empty** | Placeholder text: "Start writing your story..." in `text-tertiary`, Lora italic |
| **Unsaved changes** | Dot indicator next to "Auto-saved" text, back button warns "Discard unsaved changes?" |
| **Publishing** | Button shows spinner, body becomes read-only |
| **Publish success** | Redirect to the published story page, toast "Story published! 🌿" |
| **Publish error** | Toast error, body remains editable, "Retry" button |
| **Offline** | Banner: "You're offline. Your draft is saved locally." |
| **Word limit approaching** | At 9,000+ words: subtle warning "Stories over 10,000 words may not be published" |

### 10.8 Onboarding Flow (New User)

**Step-by-step overlay flow after sign-up.**

**Step 1: Welcome**

```
┌─── Onboarding ───────────────────────┐
│                                       │
│         🌱                            │
│                                       │
│   Welcome to StoryTree               │
│                                       │
│   "Every story starts with           │
│    one idea."                        │
│                                       │
│   [Get Started →]                    │
│                                       │
│   ○ ○ ○  (progress dots)             │
└───────────────────────────────────────┘
```

**Step 2: Pick Genres (required, min 3)**

```
┌─── Onboarding ───────────────────────┐
│                                       │
│   What kind of stories do you enjoy? │
│   Pick at least 3.                   │
│                                       │
│   [🩸 Horror    ] [🚀 Sci-Fi   ]     │
│   [🐉 Fantasy   ] [💕 Romance  ]     │
│   [🔪 Thriller  ] [📜 Literary ]     │
│   [😂 Comedy    ] [🎭 Drama    ]     │
│                                       │
│   [Continue → (3/8 selected)]        │
│                                       │
│   ● ○ ○                              │
└───────────────────────────────────────┘
```

**Step 3: Follow Writers (suggested, min 3)**

```
┌─── Onboarding ───────────────────────┐
│                                       │
│   Writers you might enjoy             │
│   Based on your genre picks.         │
│                                       │
│   [Avatar] @darkwriter    [Follow]   │
│   🌲 Oak · Horror, Thriller          │
│                                       │
│   [Avatar] @stargazer     [Follow]   │
│   🌳 Sapling · Sci-Fi, Fantasy      │
│                                       │
│   [Avatar] @heartstrings  [Follow]   │
│   🌿 Sprout · Romance, Drama        │
│                                       │
│   ... (6-8 suggestions)              │
│                                       │
│   [Start Reading →]                  │
│                                       │
│   ● ● ○                              │
└───────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Overlay | Full-screen, `surface-base` |
| Content | Centered, `480px` max-width |
| Progress | 3 dots at bottom |
| Skip | "Skip" link in top-right, `text-secondary` (always available) |
| Animation | Steps slide left-to-right with 300ms ease |
| Genre chips | `48px` height, `16px` padding, large touch target, checkmark on selected |

### 10.9 Confirmation Dialog

Used for destructive or irreversible actions.

**Anatomy:**

```
┌─── Dialog ───────────────────────────┐
│                                       │
│   Delete this story?                 │
│                                       │
│   This action cannot be undone.      │
│   Your story will be permanently     │
│   removed from this prompt.          │
│                                       │
│         [Cancel]    [Delete]          │
│                                       │
└───────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Overlay | `surface-base` at 60% opacity, `glass-blur` |
| Background | `surface-overlay` |
| Border Radius | `radius-xl` |
| Shadow | `shadow-xl` |
| Max Width | `420px` |
| Padding | `32px` |
| Title | `type-ui-xl`, `text-primary` |
| Body | `type-ui-base`, `text-secondary` |
| Buttons | Right-aligned, Cancel (ghost) + Action (primary or danger) |
| Animation | Fade in + scale `0.95 → 1.0`, 200ms |
| Keyboard | Escape = Cancel, Enter = Confirm (with focus on Cancel by default for destructive actions) |
