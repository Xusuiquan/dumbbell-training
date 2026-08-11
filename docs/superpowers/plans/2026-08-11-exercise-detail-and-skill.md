# Exercise Detail UI and Exercise-Creation Skill Implementation Plan

> **For Codex:** Execute this plan task-by-task in the current workspace and verify each milestone before moving on.

**Goal:** Turn the approved reverse-fly mobile UI into a data-driven exercise detail page, then package the same four-step image and copy workflow as a repository-scoped Codex skill for future exercises.

**Architecture:** Add a typed `ExerciseDetailContent` model under the existing exercise domain, render it through a small set of reusable presentation components, and attach one complete record to the reverse-fly exercise. Preserve the current legacy detail experience as a fallback for exercises without the new field. Store the automation skill in `.agents/skills/add-dumbbell-exercise` with project-specific references, benchmark images, a data template, and deterministic validation.

**Tech Stack:** React 18, TypeScript, Vite, CSS, Lucide React, Codex repository skills

---

### Task 1: Define the structured exercise-detail contract

**Files:**

- Modify: `src/types/exercise.ts`
- Test: `npm run build`

1. Add explicit types for muscle analysis, four-step action breakdown, key points, common mistakes, and training prescription.
2. Restrict new action content to a four-step tuple so incomplete and overlong records fail TypeScript checks.
3. Add an optional `detail` field to `Exercise` so existing exercises continue to compile.

### Task 2: Add the reverse-fly content record

**Files:**

- Modify: `src/data/exercises/dumbbell.ts`
- Modify: `src/hooks/useLanguage.tsx`

1. Condense the five legacy frames into four stages: stand, hinge, open, controlled return.
2. Add concise Chinese and English strings for the analysis callouts, steps, four key points, three mistakes, and three prescription values.
3. Reuse the existing reverse-fly artwork in the first implementation so the data and renderer can be validated before producing replacement assets.

### Task 3: Build the approved compact detail UI

**Files:**

- Create: `src/components/ExerciseDetail/ExerciseDetailContent.tsx`
- Create: `src/components/ExerciseDetail/DetailIcon.tsx`
- Create: `src/components/ExerciseDetail/ExerciseDetailContent.css`
- Modify: `src/pages/ExerciseDetail.tsx`
- Modify: `src/pages/Pages.css`
- Modify: `src/App.tsx`

1. Render the force-analysis hero card with the target muscle, supporting muscles, and three coaching callouts.
2. Render exactly four narrow step cards with black `01–04` badges and full-height figure art.
3. Render compact two-column key-point cards, three mistake cards, and three prescription cards using small cartoon-like outline icons.
4. Remove the old tab switcher for exercises with structured detail content while retaining the existing guide/details fallback for all other exercises.
5. Hide the bottom navigation on an exercise detail route to recover vertical space.

### Task 4: Create the repository exercise-authoring skill

**Files:**

- Create: `.agents/skills/add-dumbbell-exercise/SKILL.md`
- Create: `.agents/skills/add-dumbbell-exercise/agents/openai.yaml`
- Create: `.agents/skills/add-dumbbell-exercise/references/ui-spec.md`
- Create: `.agents/skills/add-dumbbell-exercise/references/project-schema.md`
- Create: `.agents/skills/add-dumbbell-exercise/references/image-spec.md`
- Create: `.agents/skills/add-dumbbell-exercise/references/copy-spec.md`
- Create: `.agents/skills/add-dumbbell-exercise/assets/exercise-data-template.ts`
- Create: `.agents/skills/add-dumbbell-exercise/assets/action-guide-benchmark.png`
- Create: `.agents/skills/add-dumbbell-exercise/assets/training-detail-benchmark.png`
- Create: `.agents/skills/add-dumbbell-exercise/scripts/validate-exercise.mjs`

1. Initialize the skill with the official skill-creator scaffold.
2. Document the fixed four-step rule, image consistency constraints, copy-length limits, and project insertion points.
3. Bundle the two approved benchmark designs and a typed record template.
4. Add a non-destructive validator for image count, required filenames, and project registration.

### Task 5: Verify behavior and visual density

**Files:**

- Test: `npm run build`
- Test: `python3 /Users/xusuiquan/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/add-dumbbell-exercise`
- Test: `node .agents/skills/add-dumbbell-exercise/scripts/validate-exercise.mjs reverse-fly`

1. Run the production TypeScript/Vite build.
2. Run the official skill validator.
3. Exercise the repository validator against reverse fly.
4. Open the local detail route at a mobile viewport and compare hierarchy, density, text wrapping, and icon scale against the approved benchmark.
5. Fix any overflow, illegible type, or tap-target regressions before handoff.
