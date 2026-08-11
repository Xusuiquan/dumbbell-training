# Project schema and insertion points

## Source of truth

- Domain types: `src/types/exercise.ts`
- Dumbbell records: `src/data/exercises/dumbbell.ts`
- Catalog export: `src/data/exerciseCatalog.ts`
- Detail renderer: `src/components/ExerciseDetail/ExerciseDetailContent.tsx`
- Detail styles: `src/components/ExerciseDetail/ExerciseDetailContent.css`
- Translation resolver: `src/hooks/useLanguage.tsx`
- Route: `/exercises/:id`

## Required record shape

Every new exercise keeps the legacy `Exercise` fields and adds `detail: ExerciseDetailContent`.

`ExerciseDetailContent` has fixed tuple counts:

| Field               | Count | Purpose                                    |
| ------------------- | ----: | ------------------------------------------ |
| `analysis.callouts` |     3 | Highest-value body-position cues           |
| `steps`             |     4 | Setup, preparation, movement/peak, return  |
| `keyPoints`         |     4 | Spine, joint, muscle, and tempo control    |
| `mistakes`          |     3 | Most likely visible faults and corrections |
| `prescription`      |     3 | Sets, reps, rest                           |

Use only the icon kinds declared by `ExerciseDetailIconKind`. Add a new kind only when it represents a reusable coaching concept, then update `DetailIcon.tsx` in the same change.

## Asset paths

New assets use public, stable paths:

```text
public/images/exercises/<exercise-id>/
├── analysis.webp
├── thumbnail.webp
└── steps/
    ├── 01.webp
    ├── 02.webp
    ├── 03.webp
    └── 04.webp
```

Reference them as `/images/exercises/<exercise-id>/analysis.webp` and `/images/exercises/<exercise-id>/steps/01.webp` inside the data record.

The existing reverse-fly record temporarily imports its historical PNG set from the repository root. Do not use that legacy layout for new exercises.

## Compatibility

Keep these legacy fields meaningful because list cards and fallback screens may still read them:

- `thumbnail`, `startImage`, `endImage`
- `steps`, `tips`, `mistakes`
- `sets`, `reps`, `rest`

The new renderer is selected only when `exercise.detail` exists. Exercises without it continue through the legacy tabbed detail path.
