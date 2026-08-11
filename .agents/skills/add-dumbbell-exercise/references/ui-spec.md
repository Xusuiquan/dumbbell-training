# Approved mobile detail UI

Use `../assets/training-detail-benchmark.png` as the primary benchmark and `../assets/action-guide-benchmark.png` as the action-sequence reference.

## Hierarchy

1. Compact header with back, centered exercise name, and favorite.
2. Force-analysis hero with a target icon, large athlete, three callouts, primary muscle, supporting muscles, and one-line summary.
3. `动作步骤` with four equal-width cards and black `01–04` badges.
4. `关键要点` as a 2 × 2 grid with small, simple outline icons.
5. `常见错误` as three compact red-tinted cards.
6. `训练建议` as three metric cards for sets, reps, and rest.

## Density rules

- At 430 × 932, the benchmark hierarchy should fit without horizontal scrolling and should expose all three prescription cards.
- Remove metadata chips, difficulty badges, tab controls, banners, and ornamental whitespace from the structured detail page.
- Use tight vertical gaps around 6–12 px and compact borders. Avoid heavy shadows.
- Keep step number badges black. Semantic icon colors may use blue, green, orange, and red.
- Icons are supportive, not decorative: around 21–25 px inside compact cards.
- Preserve 44 px tap targets for back and favorite even when visual icons are smaller.

## Responsive behavior

- The detail panel may scroll vertically on shorter devices.
- Never shrink the four step columns until text becomes illegible. At very narrow widths, reduce gaps and badge size before reducing body copy below 9.5 px.
- Do not introduce horizontal page scrolling.
- Hide the global bottom navigation on `/exercises/:id`.

## Ownership boundary

- Exercise-specific words, images, icon kinds, and tone values live in data.
- Layout, spacing, typography, and component hierarchy live in the shared detail component and CSS.
- Benchmark images are references only; they are not shipped in the app bundle.
