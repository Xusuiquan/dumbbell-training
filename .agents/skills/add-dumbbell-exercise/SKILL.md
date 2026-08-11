---
name: add-dumbbell-exercise
description: Add or overhaul an exercise in this dumbbell-training repository. Use when the user asks to 新增动作、补动作图解、生成四步训练图、编写动作详情文案、把动作数据接入代码, or make a new exercise match the approved mobile detail UI. Produces a fixed four-step visual sequence, compact Chinese/English coaching copy, typed ExerciseDetailContent data, image assets, and verified project integration.
---

# Add Dumbbell Exercise

Create one complete, production-ready exercise entry that matches this project's approved compact mobile detail screen. Treat four steps as a code and content constraint, not a loose preference.

## Required reading

Read these files before editing the project:

1. `references/project-schema.md`
2. `references/copy-spec.md`
3. `references/image-spec.md` when generating or changing artwork
4. `references/ui-spec.md` when changing layout, density, or visual hierarchy

Use the benchmark PNGs in `assets/` as visual references. Do not copy text baked into a benchmark image into a new bitmap; UI text belongs in data.

## Workflow

### 1. Inspect before writing

- Read `src/types/exercise.ts`, `src/data/exercises/dumbbell.ts`, and the target exercise entry.
- Read `src/components/ExerciseDetail/ExerciseDetailContent.tsx` before adding fields or changing the renderer.
- Check `git status --short` and preserve unrelated user changes.
- Reuse the existing component and domain model. Do not create a one-off detail page for one exercise.

### 2. Write the movement model first

- Identify the primary muscle, one or two supporting muscles, setup, concentric phase, peak position, and eccentric return.
- Default to a self-supported standing movement using only the dumbbell or dumbbells named by the exercise. Do not add a bench, chair, box, wall, yoga mat, resistance band, or other support unless the user explicitly requests it or the named movement genuinely requires it.
- Prefer stable split stances, hip hinges, and bracing the free hand on the athlete's own thigh when they preserve the named movement. Do not silently change to a different exercise merely to remove equipment; ask before adding essential equipment.
- Normalize the action to exactly four visible phases:
  1. setup or stance
  2. load or preparation
  3. main movement or peak
  4. controlled return
- Merge intermediate frames into the nearest meaningful phase. Use five steps only when the user explicitly approves an exception and the shared type is intentionally updated.
- Keep coaching practical and conservative. Never promise pain relief, rehabilitation, or medical outcomes. If pain occurs, tell the user to stop and seek qualified guidance rather than coaching through it.

### 3. Draft the structured copy

- Follow every length and count limit in `references/copy-spec.md`.
- Produce: three analysis callouts, four steps, four key points, three common mistakes with corrections, and three prescription metrics.
- Add English mappings for every new Chinese string in `src/hooks/useLanguage.tsx`.
- Prefer action cues over anatomy jargon. Keep each card scannable while someone is training.

### 4. Generate the image set

- Use the available image generation or editing skill for bitmap artwork.
- Read the fast storyboard workflow in `references/image-spec.md` and use it by default.
- Generate one square 2 × 2 storyboard containing all four ordered phases. Do not generate the thumbnail or analysis image separately in the first pass.
- Save the storyboard outside `public/`, then run:

  ```bash
  node .agents/skills/add-dumbbell-exercise/scripts/prepare-exercise-images.mjs <exercise-id> <storyboard-path>
  ```

- The script crops the four panels and derives `analysis.webp` and `thumbnail.webp` from the peak frame. Use `--hero-source <path>` only when the user requests a separately generated hero.
- If one panel fails QA, regenerate only that pose and replace it with `--replace-step <1-4>`. Do not regenerate the complete storyboard unless athlete consistency is broken across several panels.
- Follow `references/image-spec.md`. Images must contain no Chinese or English text, step numbers, logos, or watermarks. The UI owns labels and numbers.
- Save new assets under `public/images/exercises/<exercise-id>/` using the required filenames. Keep source masters outside the production bundle if they are materially larger.
- Inspect the storyboard once, then crop-test the derived assets in the actual UI. Open an individual source at full size only when a panel is questionable. Reject extra limbs, malformed dumbbells, inconsistent grip, reversed direction, or a pose that contradicts the written phase.

### 5. Integrate through the typed data model

- Copy `assets/exercise-data-template.ts` as a drafting aid, then adapt the values inside the target `Exercise` record.
- Add `detail` to the exercise entry without duplicating the UI component.
- Keep `steps`, `tips`, `mistakes`, `sets`, `reps`, and `rest` populated for legacy surfaces.
- Register a new exercise in `src/data/exercises/dumbbell.ts`; the catalog already imports that collection.
- Keep IDs lowercase kebab-case and stable after release.

### 6. Verify before handoff

Run:

```bash
npm run build
node .agents/skills/add-dumbbell-exercise/scripts/validate-exercise.mjs <exercise-id>
```

Then inspect `/exercises/<exercise-id>` at 430 × 932 and at one narrower width. Confirm:

- exactly four numbered step cards render;
- no horizontal overflow exists;
- all training-advice cards are reachable and ideally visible at 430 × 932;
- the bottom navigation is hidden on the detail route;
- image crops keep the body and dumbbells legible;
- Chinese and English layouts remain usable.

Report the exercise ID, asset directory, changed data file, build result, validator result, and any deliberate exception.

## Guardrails

- Do not silently replace an existing exercise's art direction.
- Do not introduce auxiliary equipment as a convenience. Keep the data `equipment` list, written setup, and generated artwork consistent with the equipment the user approved.
- Do not add a sixth frame to solve weak copy; rewrite or merge phases first.
- Do not bake labels into production bitmaps.
- Do not invent new icon families; use `DetailIcon.tsx` and its semantic kinds.
- Do not weaken tuple types into free-length arrays to make invalid data compile.
- Do not delete legacy data fields until every consumer has migrated.
