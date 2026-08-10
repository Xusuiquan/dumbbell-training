# Dumbbell Training PWA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, installable dumbbell exercise reference with static training UI.

**Architecture:** A Vite React app uses typed local exercise data, compact reusable view components, React Router pages, and CSS custom properties for persisted theme state. Favorites are held in localStorage through a small hook.

**Tech Stack:** React, TypeScript, Vite, React Router, lucide-react, vite-plugin-pwa, CSS.

---

### Task 1: Bootstrap the app

**Files:** Create `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`.

- [ ] Add the React/Vite build scripts and PWA configuration; register the app entry point.
- [ ] Run `npm install` and `npm run build`; expected output: a production bundle without TypeScript errors.

### Task 2: Establish the app foundation

**Files:** Create `src/types/exercise.ts`, `src/data/exercises.ts`, `src/styles/variables.css`, `src/styles/reset.css`, `src/styles/global.css`, `src/hooks/useTheme.ts`, `src/hooks/useFavorites.ts`.

- [ ] Define the required exercise shape and four chest exercise records.
- [ ] Add shared tokens, reset rules, and persisted theme/favorite state.

### Task 3: Create reusable interface pieces

**Files:** Create `src/components/AppHeader/AppHeader.tsx`, `src/components/BottomNavigation/BottomNavigation.tsx`, `src/components/ExerciseIllustration/ExerciseIllustration.tsx`, `src/components/ExerciseCard/ExerciseCard.tsx`, `src/components/BodyPartGrid/BodyPartGrid.tsx`, `src/components/Tag/Tag.tsx`.

- [ ] Build the placeholder image, cards, tags, header, body-part selector and safe-area bottom navigation.

### Task 4: Compose routing and pages

**Files:** Create `src/App.tsx` and page components/styles under `src/pages/`.

- [ ] Implement the home, library, detail, search, favorites and settings pages, including theme and favorite interaction.
- [ ] Route every requested URL and verify navigation/card actions manually.

### Task 5: Verify delivery

**Files:** Modify any files reported by build checks.

- [ ] Run `npm run build`; expected output: `✓ built`.
- [ ] Check the app at a narrow viewport and confirm content clears the fixed bottom navigation.
