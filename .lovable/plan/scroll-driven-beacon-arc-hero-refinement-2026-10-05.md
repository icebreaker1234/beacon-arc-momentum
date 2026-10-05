# Scroll-driven Beacon Arc hero refinement

## Implementation
- Extend the homepage hero into a taller natural-scroll chapter with a sticky inner stage, keeping the existing headline, copy, calls to action, and sound control continuously usable.
- Track the hero’s scroll position with a lightweight requestAnimationFrame listener and pass a reversible 0–1 progress value into the existing workflow visual.
- Rebuild the hero visual as layered SVG and CSS: pulsing beacon and halo, progressive arc stroke, bright moving tip with fading trail, sequential signal nodes and workflow labels, then the operations dashboard and its rows.
- Keep the reusable static workflow visual unchanged for later homepage sections and case-study pages; enable the scroll sequence only in the hero.
- Provide a fully composed static end-state for reduced-motion visitors and a simplified but complete mobile arrangement.

## Verification
- Check the hero at several scroll positions on desktop and mobile to confirm each stage is visibly distinct and reverses when scrolling upward.
- Verify sound remains off by default, page scrolling stays natural, controls remain usable, and the preview has no overflow, console, runtime, or build errors.
