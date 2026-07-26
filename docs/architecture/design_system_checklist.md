# StoryTree Design System — Token Checklist

Before implementing Milestone 0.1B, verify that all of the following tokens are established in the Tailwind v4 configuration and CSS variables.

## 1. Color Tokens (Core Palette)

### 1.1 Forest Greens (Primary)
- `[ ]` `--color-green-950` (#0a1a0a)
- `[ ]` `--color-green-900` (#0f2610)
- `[ ]` `--color-green-800` (#1a3a1c)
- `[ ]` `--color-green-700` (#264d28)
- `[ ]` `--color-green-600` (#357538)
- `[ ]` `--color-green-500` (#4a9e4e)
- `[ ]` `--color-green-400` (#6bbd6f)
- `[ ]` `--color-green-300` (#95d498)
- `[ ]` `--color-green-200` (#c0e7c2)
- `[ ]` `--color-green-100` (#e5f5e6)

### 1.2 Ambers (Accent)
- `[ ]` `--color-amber-900` (#3d2800)
- `[ ]` `--color-amber-800` (#6b4700)
- `[ ]` `--color-amber-700` (#946200)
- `[ ]` `--color-amber-600` (#b87a00)
- `[ ]` `--color-amber-500` (#d4940a)
- `[ ]` `--color-amber-400` (#e8ad2a)
- `[ ]` `--color-amber-300` (#f0c55e)
- `[ ]` `--color-amber-200` (#f5dba0)
- `[ ]` `--color-amber-100` (#faf0d6)

### 1.3 Warm Grays (Neutral)
- `[ ]` `--color-neutral-950` (#0d0d0b)
- `[ ]` `--color-neutral-900` (#1a1a17)
- `[ ]` `--color-neutral-800` (#2a2a25)
- `[ ]` `--color-neutral-700` (#3d3d36)
- `[ ]` `--color-neutral-600` (#5c5c52)
- `[ ]` `--color-neutral-500` (#7a7a6e)
- `[ ]` `--color-neutral-400` (#9e9e90)
- `[ ]` `--color-neutral-300` (#c2c2b6)
- `[ ]` `--color-neutral-200` (#deded4)
- `[ ]` `--color-neutral-100` (#f0f0ea)
- `[ ]` `--color-neutral-50` (#fafaf6)

### 1.4 Feedback & Genre Colors
- `[ ]` `--color-success` (#4a9e4e)
- `[ ]` `--color-warning` (#d4940a)
- `[ ]` `--color-error` (#d64545)
- `[ ]` `--color-info` (#5b9bd5)
- `[ ]` Genre: Horror (`#e05252`)
- `[ ]` Genre: Sci-Fi (`#5b9bd5`)
- `[ ]` Genre: Fantasy (`#a87de0`)
- `[ ]` Genre: Romance (`#e87da0`)
- `[ ]` Genre: Thriller (`#d4870a`)
- `[ ]` Genre: Literary (`#8bb06e`)
- `[ ]` Genre: Comedy (`#e8c84a`)
- `[ ]` Genre: Drama (`#c490d1`)

---

## 2. Semantic Theme Variables

### 2.1 Surfaces
- `[ ]` `--surface-base`
- `[ ]` `--surface-raised`
- `[ ]` `--surface-overlay`
- `[ ]` `--surface-sunken`
- `[ ]` `--surface-glass`
- `[ ]` `--surface-reading`

### 2.2 Text
- `[ ]` `--text-primary`
- `[ ]` `--text-secondary`
- `[ ]` `--text-tertiary`
- `[ ]` `--text-disabled`
- `[ ]` `--text-inverse`
- `[ ]` `--text-link`
- `[ ]` `--text-accent`
- `[ ]` `--text-story`

### 2.3 Borders
- `[ ]` `--border-subtle`
- `[ ]` `--border-default`
- `[ ]` `--border-strong`
- `[ ]` `--border-accent`

### 2.4 Interactive States
- `[ ]` `--interactive-hover`
- `[ ]` `--interactive-pressed`
- `[ ]` `--interactive-focus`
- `[ ]` `--interactive-selected`

---

## 3. Typography Tokens

### 3.1 Font Families
- `[ ]` `font-sans` (Inter)
- `[ ]` `font-story` (Lora)
- `[ ]` `font-display` (Playfair Display)
- `[ ]` `font-mono` (JetBrains Mono)

### 3.2 UI Scale (Inter)
- `[ ]` `--type-ui-xs` (11px / 0.6875rem)
- `[ ]` `--type-ui-sm` (13px / 0.8125rem)
- `[ ]` `--type-ui-base` (15px / 0.9375rem)
- `[ ]` `--type-ui-md` (16px / 1rem)
- `[ ]` `--type-ui-lg` (18px / 1.125rem)
- `[ ]` `--type-ui-xl` (22px / 1.375rem)
- `[ ]` `--type-ui-2xl` (28px / 1.75rem)

### 3.3 Story Scale (Lora)
- `[ ]` `--type-story-body` (19px / 1.1875rem, lh: 1.8)
- `[ ]` `--type-story-body-mobile` (17px / 1.0625rem, lh: 1.75)

### 3.4 Display Scale (Playfair)
- `[ ]` `--type-display-sm` (24px / 1.5rem)
- `[ ]` `--type-display-md` (32px / 2rem)
- `[ ]` `--type-display-lg` (40px / 2.5rem)
- `[ ]` `--type-display-xl` (52px / 3.25rem)

---

## 4. Spacing Tokens

- `[ ]` `--space-0` (0px)
- `[ ]` `--space-1` (4px)
- `[ ]` `--space-2` (8px)
- `[ ]` `--space-3` (12px)
- `[ ]` `--space-4` (16px)
- `[ ]` `--space-5` (20px)
- `[ ]` `--space-6` (24px)
- `[ ]` `--space-8` (32px)
- `[ ]` `--space-10` (40px)
- `[ ]` `--space-12` (48px)
- `[ ]` `--space-16` (64px)
- `[ ]` `--space-20` (80px)
- `[ ]` `--space-24` (96px)

---

## 5. Layout & Breakpoints

### 5.1 Breakpoints
- `[ ]` `mobile-sm` (0-374px)
- `[ ]` `mobile` (375px)
- `[ ]` `tablet` (640px)
- `[ ]` `desktop` (1024px)
- `[ ]` `desktop-lg` (1440px)

### 5.2 Border Radius
- `[ ]` `--radius-none` (0px)
- `[ ]` `--radius-sm` (4px)
- `[ ]` `--radius-md` (8px)
- `[ ]` `--radius-lg` (12px)
- `[ ]` `--radius-xl` (16px)
- `[ ]` `--radius-2xl` (24px)
- `[ ]` `--radius-full` (9999px)

---

## 6. Elevation & Shadows

- `[ ]` `--shadow-none`
- `[ ]` `--shadow-xs`
- `[ ]` `--shadow-sm`
- `[ ]` `--shadow-md`
- `[ ]` `--shadow-lg`
- `[ ]` `--shadow-xl`
- `[ ]` `--shadow-glow-amber`
- `[ ]` `--shadow-glow-genre`
- `[ ]` `--glass-background`
- `[ ]` `--glass-blur`
- `[ ]` `--glass-border`
- `[ ]` `--glass-inner-glow`

---

## 7. Animation & Motion Tokens

- `[ ]` `--motion-instant` (100ms, ease-out)
- `[ ]` `--motion-fast` (150ms, ease-out)
- `[ ]` `--motion-normal` (250ms, cubic-bezier(0.4, 0, 0.2, 1))
- `[ ]` `--motion-slow` (400ms, cubic-bezier(0.4, 0, 0.2, 1))
- `[ ]` `--motion-gentle` (600ms, cubic-bezier(0.22, 1, 0.36, 1))
- `[ ]` `--motion-spring` (500ms, cubic-bezier(0.34, 1.56, 0.64, 1))
