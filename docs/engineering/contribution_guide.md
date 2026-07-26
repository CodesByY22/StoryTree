# Contribution Guide

This guide outlines the process for contributing to the StoryTree repository.

## 1. Git Workflow
We use a feature-branch workflow.
1. Ensure you are up to date with `main`.
2. Create a new branch for your feature or fix.
3. Commit your changes locally.
4. Push to origin and open a Pull Request against `main`.

## 2. Branch Naming
Use the following prefixes:
- `feat/` for new features (e.g., `feat/auth-integration`)
- `fix/` for bug fixes (e.g., `fix/header-alignment`)
- `chore/` for maintenance (e.g., `chore/update-deps`)
- `docs/` for documentation updates

## 3. Commit Message Conventions
We follow Conventional Commits:
- `feat: add user profile page`
- `fix: resolve race condition in feed`
- `docs: update architecture diagrams`
- `chore: configure prettier`

## 4. Pull Request Guidelines
- Keep PRs small and focused on a single responsibility.
- Ensure all CI checks (linting, type-checking, building) pass before requesting a review.
- Write a clear PR description explaining *what* changed and *why*.
- Include screenshots or screen recordings for UI changes.

## 5. Review Process
- All code must be reviewed by at least one other engineer before merging.
- Reviewers should focus on architecture, maintainability, and adherence to the `coding_standards.md`.
- Once approved and CI passes, the PR can be squashed and merged into `main`.
