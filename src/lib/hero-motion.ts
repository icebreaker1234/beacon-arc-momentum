/**
 * Pure timing and geometry for the hero signal sequence.
 *
 * Everything here is deterministic so the server render, the client render and
 * the unit tests all agree. The hero maps a single scroll-progress value
 * (0 → 1) through these helpers; scrolling back up simply feeds a smaller value,
 * which is what makes every stage reverse naturally.
 */

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** 0 before `start`, 1 after `end`, linear in between. */
export const range = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));

export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * clamp01(t)) - 1) / 2;
export const easeOutCubic = (t: number) => 1 - (1 - clamp01(t)) ** 3;

/** SVG coordinate space shared by the stage and the HTML overlays. */
export const STAGE = { width: 640, height: 520 } as const;

type Point = { x: number; y: number };

/** Cubic Bézier for the arc: a focused point lower-left sweeping up and right. */
export const ARC: readonly [Point, Point, Point, Point] = [
  { x: 72, y: 432 },
  { x: 116, y: 186 },
  { x: 332, y: 70 },
  { x: 566, y: 114 },
];

export const ARC_PATH = `M${ARC[0].x} ${ARC[0].y} C${ARC[1].x} ${ARC[1].y} ${ARC[2].x} ${ARC[2].y} ${ARC[3].x} ${ARC[3].y}`;

const bezier = (t: number): Point => {
  const u = 1 - t;
  const [a, b, c, d] = ARC;
  return {
    x: u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x,
    y: u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y,
  };
};

// Arc-length lookup table so the bright tip sits exactly where the drawn stroke ends
// (stroke dashes are measured along length, not along the Bézier parameter).
const SAMPLES = 240;
const lengthTable: number[] = (() => {
  const table = [0];
  let previous = bezier(0);
  for (let i = 1; i <= SAMPLES; i += 1) {
    const point = bezier(i / SAMPLES);
    table.push(table[i - 1]! + Math.hypot(point.x - previous.x, point.y - previous.y));
    previous = point;
  }
  return table;
})();
const totalLength = lengthTable[SAMPLES]!;

/** Point on the arc at a fraction (0–1) of its drawn length. */
export function pointAtLength(fraction: number): Point {
  const target = clamp01(fraction) * totalLength;
  let low = 0;
  let high = SAMPLES;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (lengthTable[mid]! < target) low = mid + 1;
    else high = mid;
  }
  if (low === 0) return bezier(0);
  const before = lengthTable[low - 1]!;
  const span = lengthTable[low]! - before || 1;
  return bezier((low - 1 + (target - before) / span) / SAMPLES);
}

/** Percentage position of an SVG point inside the stage, for HTML overlays. */
export const toPercent = ({ x, y }: Point) => ({
  left: `${(x / STAGE.width) * 100}%`,
  top: `${(y / STAGE.height) * 100}%`,
});

export type SignalNode = {
  id: string;
  /** Fraction of arc length where the node sits. */
  at: number;
  label: string;
  detail: string;
  /** Label offset from the node, in % of stage size. */
  offset: { x: number; y: number };
};

export const SIGNAL_NODES: readonly SignalNode[] = [
  {
    id: "enquiry",
    at: 0.3,
    label: "New enquiry",
    detail: "Details captured once",
    offset: { x: 4, y: 3 },
  },
  {
    id: "automation",
    at: 0.58,
    label: "Automation",
    detail: "Owner notified",
    offset: { x: -6, y: 6 },
  },
  {
    id: "handoff",
    at: 0.84,
    label: "Team handoff",
    detail: "Next step assigned",
    offset: { x: -10, y: 8 },
  },
];

/** Scroll-progress windows for each chapter of the sequence. */
export const TIMELINE = {
  arc: [0.06, 0.5],
  system: [0.62, 0.75],
  /** Labels clear away before the interface arrives. */
  labelsOut: [0.55, 0.61],
  rows: [0.7, 0.77, 0.84, 0.9],
  rowLength: 0.06,
  live: [0.93, 0.98],
} as const;

export type HeroPhase = "beacon" | "arc" | "signals" | "system";

export const arcProgressAt = (progress: number) =>
  easeInOutSine(range(progress, TIMELINE.arc[0], TIMELINE.arc[1]));

export function phaseAt(progress: number): HeroPhase {
  if (progress >= TIMELINE.system[0]) return "system";
  const arc = arcProgressAt(progress);
  if (arc >= SIGNAL_NODES[0]!.at) return "signals";
  if (arc > 0.01) return "arc";
  return "beacon";
}

/** A soft flash that rises as the tip reaches a node, then fades behind it. */
export const bloomAt = (arcProgress: number, at: number) =>
  range(arcProgress, at - 0.025, at) * (1 - range(arcProgress, at, at + 0.16));
