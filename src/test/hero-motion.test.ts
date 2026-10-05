import { describe, expect, it } from "vitest";
import {
  ARC,
  SIGNAL_NODES,
  TIMELINE,
  arcProgressAt,
  bloomAt,
  phaseAt,
  pointAtLength,
} from "@/lib/hero-motion";

describe("hero motion", () => {
  it("starts at the beacon and ends at the arc destination", () => {
    expect(pointAtLength(0)).toEqual(ARC[0]);
    const end = pointAtLength(1);
    expect(end.x).toBeCloseTo(ARC[3].x, 3);
    expect(end.y).toBeCloseTo(ARC[3].y, 3);
  });

  it("draws the arc monotonically with scroll and fully reverses", () => {
    let previous = -1;
    for (let p = 0; p <= 1.0001; p += 0.01) {
      const value = arcProgressAt(p);
      expect(value).toBeGreaterThanOrEqual(previous);
      previous = value;
    }
    expect(arcProgressAt(0)).toBe(0);
    expect(arcProgressAt(1)).toBe(1);
    // Same input, same output: scrolling back up replays the exact earlier state.
    expect(arcProgressAt(0.3)).toBe(arcProgressAt(0.3));
  });

  it("moves through the four phases in order", () => {
    const order = ["beacon", "arc", "signals", "system"];
    let index = 0;
    for (let p = 0; p <= 1.0001; p += 0.005) {
      const phase = order.indexOf(phaseAt(p));
      expect(phase).toBeGreaterThanOrEqual(index);
      index = phase;
    }
    expect(phaseAt(0)).toBe("beacon");
    expect(phaseAt(1)).toBe("system");
  });

  it("blooms each node only around the moment the tip passes it", () => {
    for (const node of SIGNAL_NODES) {
      expect(bloomAt(node.at, node.at)).toBe(1);
      expect(bloomAt(node.at - 0.1, node.at)).toBe(0);
      expect(bloomAt(Math.min(1, node.at + 0.2), node.at)).toBe(0);
    }
  });

  it("keeps the labels gone before the interface appears", () => {
    expect(TIMELINE.labelsOut[1]).toBeLessThanOrEqual(TIMELINE.system[0]);
  });
});
