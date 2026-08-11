# Exercise image specification

## Visual system

- Clean fitness illustration on pure white or transparent background.
- Adult athlete, anatomically coherent and proportionate.
- Consistent face, hairstyle, clothing, dumbbells, body proportions, camera angle, and lighting across all images.
- High-contrast black/gray clothing with natural skin tones.
- Small red muscle highlight only where it improves target-muscle understanding.
- Blue motion arrows are allowed in step art, but keep them clear of the athlete and UI text zones.
- No photorealistic gym background; the interface needs clean crops.

## Default equipment policy

- Show only the dumbbell or dumbbells required by the exercise.
- Default to standing, split-stance, or hip-hinge variants that support themselves without furniture.
- Do not add a workout bench, chair, box, wall, yoga mat, resistance band, rack, or machine for visual convenience.
- A free hand may brace on the athlete's own thigh when this keeps the named movement recognizable and stable.
- Add auxiliary equipment only when the user explicitly requests it or it is essential to the exact named exercise. If removing it changes the exercise identity, ask before generating.
- Repeat the allowed equipment and forbidden props in the image-generation prompt, then reject any storyboard containing unapproved equipment.

## Forbidden bitmap content

Do not generate:

- Chinese or English text;
- step numbers or badges;
- UI card borders or section headings;
- logos, signatures, or watermarks;
- multiple athletes in one frame;
- anatomy labels embedded into the image.

The React UI renders all labels, numbers, callouts, and cards.

## Required files

| File             | Composition                            | Notes                                                                            |
| ---------------- | -------------------------------------- | -------------------------------------------------------------------------------- |
| `analysis.webp`  | Landscape-friendly peak or key posture | Target muscle may be highlighted red; leave open space to the right for callouts |
| `steps/01.webp`  | Full body setup                        | Keep feet, hands, and dumbbells visible                                          |
| `steps/02.webp`  | Preparation/load                       | Make the hinge or joint setup unambiguous                                        |
| `steps/03.webp`  | Main movement/peak                     | Show direction clearly; a blue arrow is optional                                 |
| `steps/04.webp`  | Controlled return                      | Distinguish the return from step 2 with arrow direction or position              |
| `thumbnail.webp` | Recognizable exercise silhouette       | Legible in a small list card                                                     |

Generate at least 1024 px on the long edge. Export production images as WebP when practical. Keep each production file reasonably small without introducing visible artifacts.

## Fast storyboard workflow

Use this workflow unless the user explicitly prefers separate high-quality generations.

1. Generate one square 2 × 2 storyboard at the highest practical resolution.
2. Place the phases in reading order: setup top-left, preparation top-right, peak bottom-left, controlled return bottom-right.
3. Keep one athlete per panel, generous white space around every body and dumbbell, and no panel borders, captions, badges, or text.
4. Save the source outside `public/` and pass it to `scripts/prepare-exercise-images.mjs`.
5. Inspect the storyboard once and the final UI crop once. Inspect full-size panels only when defects are suspected.
6. Regenerate only a failed panel and replace it with `--replace-step`; regenerate the whole storyboard only when the character is inconsistent across multiple panels.

Prompt addition for the storyboard:

```text
Create one clean square 2x2 exercise storyboard with four equal borderless panels in reading order. Top-left: setup. Top-right: preparation. Bottom-left: peak contraction. Bottom-right: controlled return. Exactly one full-body athlete and two dumbbells in each panel. Keep the complete body, hands, feet, and dumbbells inside each panel with generous white margins. No captions, numbers, separators, borders, logos, or watermarks.
```

Process the generated source:

```bash
node .agents/skills/add-dumbbell-exercise/scripts/prepare-exercise-images.mjs <exercise-id> <storyboard-path>
```

Useful overrides:

```bash
# Horizontally arranged four-panel source
node .agents/skills/add-dumbbell-exercise/scripts/prepare-exercise-images.mjs <exercise-id> <storyboard-path> --layout horizontal

# Replace only a failed second phase with a separately generated image
node .agents/skills/add-dumbbell-exercise/scripts/prepare-exercise-images.mjs <exercise-id> <single-image-path> --replace-step 2

# Use a separately generated force-analysis hero while keeping storyboard steps
node .agents/skills/add-dumbbell-exercise/scripts/prepare-exercise-images.mjs <exercise-id> <storyboard-path> --hero-source <hero-path>
```

The script normalizes every step to 1024 × 1280, writes WebP assets, derives the thumbnail from the peak frame, and creates the landscape analysis canvas with room for UI callouts.

## Consistency prompt block

Reuse this block in every generation prompt:

```text
Same adult athlete in every frame, same face and hairstyle, same gray sleeveless top, black shorts, white socks and gray trainers, same pair of black hex dumbbells, clean white background, consistent three-quarter camera, crisp fitness instruction illustration, anatomically correct hands and joints, no text, no numbers, no logo, no watermark.
```

Add only the pose, motion direction, and muscle highlight that change for each frame.

## Visual QA checklist

- Confirm that every visible prop appears in the approved `equipment` list; reject unrequested benches, chairs, mats, boxes, walls, bands, racks, or machines.
- Count fingers, hands, arms, legs, dumbbells, and plates.
- Compare grip and wrist orientation across frames.
- Check that the written left/right or up/down direction matches the art.
- Confirm the target muscle highlight is anatomically plausible.
- Check the source storyboard once for cross-panel athlete consistency.
- Crop-test all derived assets together at the actual four-column card size before accepting them.
- Open an individual full-resolution panel only when the contact sheet or UI crop reveals a possible defect.
- Inspect the hero at 430 px width and ensure the callout column remains readable.
