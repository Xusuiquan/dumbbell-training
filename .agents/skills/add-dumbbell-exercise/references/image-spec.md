# Exercise image specification

## Visual system

- Clean fitness illustration on pure white or transparent background.
- Adult athlete, anatomically coherent and proportionate.
- Consistent face, hairstyle, clothing, dumbbells, body proportions, camera angle, and lighting across all images.
- High-contrast black/gray clothing with natural skin tones.
- Small red muscle highlight only where it improves target-muscle understanding.
- Blue motion arrows are allowed in step art, but keep them clear of the athlete and UI text zones.
- No photorealistic gym background; the interface needs clean crops.

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

## Consistency prompt block

Reuse this block in every generation prompt:

```text
Same adult athlete in every frame, same face and hairstyle, same gray sleeveless top, black shorts, white socks and gray trainers, same pair of black hex dumbbells, clean white background, consistent three-quarter camera, crisp fitness instruction illustration, anatomically correct hands and joints, no text, no numbers, no logo, no watermark.
```

Add only the pose, motion direction, and muscle highlight that change for each frame.

## Visual QA checklist

- Count fingers, hands, arms, legs, dumbbells, and plates.
- Compare grip and wrist orientation across frames.
- Check that the written left/right or up/down direction matches the art.
- Confirm the target muscle highlight is anatomically plausible.
- Crop-test at the actual four-column card size before accepting the asset.
- Inspect the hero at 430 px width and ensure the callout column remains readable.
