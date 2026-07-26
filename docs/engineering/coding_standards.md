# Coding Standards

All code contributed to StoryTree must adhere to these standards to ensure long-term maintainability.

## 1. TypeScript Standards
- **Strict Mode:** Always enabled (`strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`).
- **No `any`:** The use of `any` is strictly prohibited. Use `unknown` if the type is truly dynamic, then narrow it.
- **Interfaces over Types:** Prefer `interface` for object shapes, use `type` aliases for unions and intersections.

## 2. React Standards
- **Server Components by Default:** In Next.js (App Router), all components are Server Components unless `use client` is explicitly required.
- **Hooks:** Keep hooks near the top of the component. Custom hooks should be extracted if logic is reused or complex.
- **Prop Typing:** Always type component props. Avoid inline type definitions for complex props.

## 3. Naming Conventions
- **Files/Folders:** `kebab-case` for directories and most files (e.g., `user-profile.tsx`).
- **React Components:** `PascalCase` for component names (e.g., `UserProfile`).
- **Variables/Functions:** `camelCase`.
- **Constants:** `UPPER_SNAKE_CASE` for global constants.

## 4. Folder Conventions
- Keep components small and modular.
- Colocate styles, tests, and component files when possible (e.g., inside `packages/ui/src/atoms/button/`).

## 5. Import Order
Group imports logically:
1. Third-party libraries (e.g., `react`, `next`)
2. Internal monorepo packages (e.g., `@repo/ui`)
3. Absolute imports within the app (e.g., `@/components/`)
4. Relative imports (`./`, `../`)

## 6. Code Style
- **Prettier:** Code must be formatted using the monorepo's `.prettierrc`.
- **ESLint:** Code must pass all ESLint rules without warnings.
