import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "beacon-arc:sound";
const VOLUME = 0.022;

type SoundState = "off" | "resume" | "on";

type AmbientGraph = {
  ctx: AudioContext;
  master: GainNode;
  filter: BiquadFilterNode;
  low: OscillatorNode;
  high: OscillatorNode;
};

const readPreference = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
};

const writePreference = (on: boolean) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* Storage can be blocked; the control still works for this visit. */
  }
};

/** One soft, filtered tone — two sines a fifth apart — built only after a click. */
function createAmbient(): AmbientGraph | null {
  const AudioCtor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return null;
  const ctx = new AudioCtor();
  const master = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const low = ctx.createOscillator();
  const high = ctx.createOscillator();
  const highGain = ctx.createGain();

  filter.type = "lowpass";
  filter.frequency.value = 700;
  filter.Q.value = 0.4;
  low.type = "sine";
  low.frequency.value = 110;
  high.type = "sine";
  high.frequency.value = 165;
  high.detune.value = 4;
  highGain.gain.value = 0.35;
  master.gain.value = 0;

  low.connect(filter);
  high.connect(highGain).connect(filter);
  filter.connect(master).connect(ctx.destination);
  low.start();
  high.start();
  return { ctx, master, filter, low, high };
}

/**
 * Optional ambient sound for the hero. Off by default, never autoplays, and is
 * offered only on devices with a fine pointer and without reduced-motion set.
 * A remembered "on" choice shows as "Resume sound" and still needs a click.
 */
export function SoundToggle({ areaRef }: { areaRef: RefObject<HTMLElement | null> }) {
  const [available, setAvailable] = useState(false);
  const [state, setState] = useState<SoundState>("off");
  const graph = useRef<AmbientGraph | null>(null);
  const inView = useRef(true);
  const wantsSound = useRef(false);
  wantsSound.current = state === "on";

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => {
      const ok = fine.matches && !reduced.matches && "AudioContext" in window;
      setAvailable(ok);
      if (!ok) setState("off");
    };
    evaluate();
    if (readPreference()) setState("resume");
    fine.addEventListener("change", evaluate);
    reduced.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      reduced.removeEventListener("change", evaluate);
    };
  }, []);

  const level = useCallback((target: number, time = 0.6) => {
    const g = graph.current;
    if (!g) return;
    g.master.gain.cancelScheduledValues(g.ctx.currentTime);
    g.master.gain.setTargetAtTime(target, g.ctx.currentTime, time / 3);
  }, []);

  // Run the tone only while sound is on; fade it whenever the hero is out of view.
  useEffect(() => {
    if (state !== "on" || !available) return;
    const area = areaRef.current;
    const g = graph.current;
    if (!area || !g) return;
    void g.ctx.resume();
    level(inView.current ? VOLUME : 0, 1.2);

    let frame = 0;
    let pointer = { x: 0.5, y: 0.5 };
    const apply = () => {
      frame = 0;
      const now = g.ctx.currentTime;
      // Gentle, smoothed modulation: pitch drifts within a narrow range, brightness follows height.
      g.low.frequency.setTargetAtTime(98 + pointer.x * 34, now, 0.35);
      g.high.frequency.setTargetAtTime((98 + pointer.x * 34) * 1.5, now, 0.35);
      g.filter.frequency.setTargetAtTime(420 + (1 - pointer.y) * 900, now, 0.4);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const box = area.getBoundingClientRect();
      pointer = {
        x: Math.min(1, Math.max(0, (event.clientX - box.left) / box.width)),
        y: Math.min(1, Math.max(0, (event.clientY - box.top) / window.innerHeight)),
      };
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      inView.current = entry.isIntersecting;
      level(entry.isIntersecting ? VOLUME : 0, 0.8);
    });
    const onVisibility = () => {
      if (document.hidden) void g.ctx.suspend();
      else void g.ctx.resume();
    };

    area.addEventListener("pointermove", onMove, { passive: true });
    observer.observe(area);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      level(0, 0.25);
      // Stop processing once silent; a later "on" resumes the same context.
      window.setTimeout(() => {
        if (!wantsSound.current && g.ctx.state === "running") void g.ctx.suspend();
      }, 400);
    };
  }, [state, available, areaRef, level]);

  // Release audio resources when the hero unmounts (e.g. navigating to another page).
  useEffect(
    () => () => {
      const g = graph.current;
      graph.current = null;
      if (!g) return;
      window.setTimeout(() => {
        g.low.stop();
        g.high.stop();
        void g.ctx.close();
      }, 200);
    },
    [],
  );

  const toggle = () => {
    if (state === "on") {
      setState("off");
      writePreference(false);
      return;
    }
    // Created inside the click handler: browsers allow audio only after a user gesture.
    if (!graph.current) graph.current = createAmbient();
    if (!graph.current) return;
    setState("on");
    writePreference(true);
  };

  if (!available) return null;

  const on = state === "on";
  const label = on ? "Sound on" : state === "resume" ? "Resume sound" : "Sound off";
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-pressed={on}
      aria-label={
        on ? "Ambient sound is on. Turn sound off" : "Ambient sound is off. Turn sound on"
      }
      title={on ? "Mute ambient sound" : "Play a soft ambient tone that follows your cursor"}
      className="shrink-0 border border-surface-dark-border bg-surface-dark/60 text-surface-dark-foreground hover:bg-surface-dark hover:text-primary aria-pressed:border-primary/60 aria-pressed:text-primary"
    >
      {on ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      <span>{label}</span>
    </Button>
  );
}
