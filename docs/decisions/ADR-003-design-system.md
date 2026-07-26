# ADR 003: Design System Architecture

## Decision
We will adopt an **Enterprise Design Token Architecture** utilizing a strict 4-tier hierarchy (Primitive Tokens ➡️ Semantic Tokens ➡️ Component Tokens ➡️ UI Components) implemented via CSS Variables and Tailwind v4.

## Context
We need a scalable design system that supports a complex UI, dark mode, and future multi-platform expansion (React Native, Admin Dashboards).

## Reasoning
1. **Maintainability:** Hardcoding values (e.g., `bg-green-500`) leads to massive technical debt. Forcing components to consume Component Tokens (e.g., `bg-button-primary`) insulates the UI from design changes.
2. **Tailwind v4 Alignment:** Tailwind v4 uses CSS variables via the `@theme` directive natively. Our architecture directly aligns with this, eliminating the need for a bloated JavaScript `tailwind.config.ts`.
3. **Future-Proof:** By strictly defining Primitive and Semantic tokens in CSS variables now, we can easily migrate to JSON-based tokens and Style Dictionary for multi-platform support in the future.

## Tradeoffs
- **Initial Velocity:** It takes slightly longer to set up tokens than to just write raw utility classes.
- **Complexity:** Developers must understand the 4-tier hierarchy before building components.

## Alternatives Considered
- **Standard Tailwind utility classes:** Rejected due to lack of semantic meaning and poor theming scalability.
- **CSS-in-JS (e.g., styled-components):** Rejected due to performance overhead and incompatibility with Next.js Server Components.
