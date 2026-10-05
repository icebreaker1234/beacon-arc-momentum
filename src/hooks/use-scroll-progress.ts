import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Reports how far the visitor has scrolled through a tall "chapter" whose child
 * stage is `position: sticky`, as a reversible value from 0 to 1.
 *
 * - Reads layout only inside requestAnimationFrame, from a passive scroll listener.
 * - Eases toward the target so coarse wheel steps feel smooth; the loop stops as
 *   soon as the value settles, so an idle page does no work.
 * - Never changes scroll position: the page scrolls exactly as the browser decides.
 * - With reduced motion it reports 1, the complete composed state.
 */
export function useScrollProgress(
  chapterRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
) {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);
    let frame = 0;
    let current = 0;
    let target = 0;

    const measure = () => {
      const chapter = chapterRef.current;
      const stage = stageRef.current;
      if (!chapter || !stage) return 0;
      const chapterBox = chapter.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();
      // While stuck, the stage's top stays fixed and the chapter slides up beneath it.
      const travelled = stageBox.top - chapterBox.top;
      const distance = Math.max(1, chapterBox.height - stageBox.height);
      return Math.max(0, Math.min(1, travelled / distance));
    };

    const tick = () => {
      frame = 0;
      if (media.matches) {
        current = target = 1;
        setProgress(1);
        return;
      }
      target = measure();
      const delta = target - current;
      current = Math.abs(delta) < 0.0008 ? target : current + delta * 0.22;
      setProgress(current);
      if (current !== target) frame = window.requestAnimationFrame(tick);
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const onMotionChange = () => {
      setReducedMotion(media.matches);
      request();
    };

    // Start where the page already is (e.g. after a reload part-way down) without easing.
    setReducedMotion(media.matches);
    current = target = media.matches ? 1 : measure();
    setProgress(current);

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    media.addEventListener("change", onMotionChange);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      media.removeEventListener("change", onMotionChange);
    };
  }, [chapterRef, stageRef]);

  return { progress, reducedMotion };
}
