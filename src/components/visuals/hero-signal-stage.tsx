import {
  ARC,
  ARC_PATH,
  SIGNAL_NODES,
  TIMELINE,
  arcProgressAt,
  bloomAt,
  easeOutCubic,
  pointAtLength,
  range,
  toPercent,
} from "@/lib/hero-motion";

/**
 * Hero-only animated sequence: beacon → arc → workflow signals → operations interface.
 *
 * Driven entirely by `progress` (0–1). It holds no timers of its own apart from
 * the CSS beacon pulse, so scrolling up replays every stage in reverse.
 * The reusable static graphic for other sections lives in `workflow-visual.tsx`.
 */
export function HeroSignalStage({ progress }: { progress: number }) {
  const arc = arcProgressAt(progress);
  const tip = pointAtLength(arc);
  const end = ARC[3];

  // The tip and its trail exist only while the arc is being drawn.
  const tipOpacity =
    range(arc, 0, 0.03) * (1 - range(progress, TIMELINE.arc[1], TIMELINE.arc[1] + 0.05));
  const trailLong = 0.2;
  const trailShort = 0.07;

  // Once complete, the arc steps back so the interface can come forward.
  const system = easeOutCubic(range(progress, TIMELINE.system[0], TIMELINE.system[1]));
  const arcOpacity = 1 - system * 0.55;
  const labelsOut = 1 - range(progress, TIMELINE.labelsOut[0], TIMELINE.labelsOut[1]);
  const beaconEmission = 1 - range(progress, 0.5, 0.7) * 0.75;
  const endBloom =
    range(arc, 0.97, 1) * (1 - range(progress, TIMELINE.arc[1] + 0.02, TIMELINE.system[0] + 0.04));
  const live = range(progress, TIMELINE.live[0], TIMELINE.live[1]);

  return (
    <figure className="hero-stage-frame relative mx-auto">
      <figcaption className="sr-only">
        Illustration: a point of light draws an arc that connects three workflow steps — new
        enquiry, automation and team handoff — and then becomes an operations overview showing each
        step completed.
      </figcaption>

      <div className="absolute inset-0 hero-stage-backdrop" aria-hidden="true" />

      <svg
        viewBox="0 0 640 520"
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="heroArcStroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" className="text-primary" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="0.6" className="text-primary" stopColor="currentColor" />
            <stop offset="1" className="text-glow" stopColor="currentColor" />
          </linearGradient>
          <radialGradient id="heroHalo">
            <stop offset="0" className="text-glow" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="0.45" className="text-glow" stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="1" className="text-glow" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <filter id="heroSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroWideGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* Faint guide: where the signal is heading. */}
        <path
          d={ARC_PATH}
          fill="none"
          className="stroke-surface-dark-border"
          strokeWidth="1"
          strokeDasharray="2 8"
          opacity={0.9 - system * 0.5}
        />

        <g opacity={arcOpacity}>
          {/* Glow trail: a long faint wash and a short bright core, both trailing the tip. */}
          <path
            d={ARC_PATH}
            pathLength={1}
            fill="none"
            className="stroke-glow"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${trailLong} 3`}
            strokeDashoffset={trailLong - arc}
            filter="url(#heroWideGlow)"
            opacity={tipOpacity * 0.32}
          />
          <path
            d={ARC_PATH}
            pathLength={1}
            fill="none"
            className="stroke-glow"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${trailShort} 3`}
            strokeDashoffset={trailShort - arc}
            filter="url(#heroSoftGlow)"
            opacity={tipOpacity * 0.55}
          />

          {/* The arc itself, drawn exactly to the current progress. */}
          <path
            d={ARC_PATH}
            pathLength={1}
            fill="none"
            stroke="url(#heroArcStroke)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeDasharray="1 1"
            strokeDashoffset={1 - arc}
          />

          {SIGNAL_NODES.map((node) => {
            const point = pointAtLength(node.at);
            const shown = range(arc, node.at - 0.015, node.at + 0.03);
            const bloom = bloomAt(arc, node.at);
            return (
              <g key={node.id} transform={`translate(${point.x} ${point.y})`}>
                <circle
                  r={18 + bloom * 26}
                  fill="url(#heroHalo)"
                  opacity={bloom}
                  className="hero-bloom"
                />
                <circle
                  r={11}
                  fill="none"
                  className="stroke-primary"
                  strokeOpacity={0.45 * shown}
                />
                <circle r={4.5 * (0.6 + shown * 0.4)} className="fill-glow" opacity={shown} />
              </g>
            );
          })}

          {/* Destination node: where the interface resolves from. */}
          <g transform={`translate(${end.x} ${end.y})`}>
            <circle r={20 + endBloom * 34} fill="url(#heroHalo)" opacity={endBloom} />
            <circle r={7} fill="none" className="stroke-glow" strokeOpacity={range(arc, 0.96, 1)} />
            <circle r={3} className="fill-glow" opacity={range(arc, 0.96, 1)} />
          </g>
        </g>

        {/* Beacon: a focused point with a softly pulsing halo and slow emission rings. */}
        <g transform={`translate(${ARC[0].x} ${ARC[0].y})`}>
          <g opacity={beaconEmission}>
            <circle r="16" fill="none" className="stroke-glow beacon-emit" strokeWidth="1" />
            <circle
              r="16"
              fill="none"
              className="stroke-glow beacon-emit beacon-emit-late"
              strokeWidth="1"
            />
          </g>
          <circle r="44" fill="url(#heroHalo)" className="beacon-pulse" />
          <circle r="7.5" className="fill-glow" filter="url(#heroSoftGlow)" />
          <circle r="3" className="fill-surface-dark-foreground" />
        </g>

        {/* Moving bright tip. */}
        <g transform={`translate(${tip.x} ${tip.y})`} opacity={tipOpacity}>
          <circle r="26" fill="url(#heroHalo)" />
          <circle r="5" className="fill-glow" filter="url(#heroSoftGlow)" />
          <circle r="2" className="fill-surface-dark-foreground" />
        </g>
      </svg>

      {/* Workflow labels appear as the signal reaches each node. */}
      {SIGNAL_NODES.map((node, index) => {
        const position = toPercent(pointAtLength(node.at));
        const shown = range(arc, node.at, node.at + 0.07) * labelsOut;
        const next = SIGNAL_NODES[index + 1];
        // Used on small screens, where only the newest label is shown.
        const past = next ? range(arc, next.at - 0.02, next.at + 0.02) : 0;
        return (
          <div
            key={node.id}
            aria-hidden="true"
            className="hero-signal-label absolute"
            style={{
              left: `calc(${position.left} + ${node.offset.x}%)`,
              top: `calc(${position.top} + ${node.offset.y}%)`,
              ["--shown" as string]: shown,
              ["--past" as string]: past,
              transform: `translate3d(0, ${(1 - shown) * 10}px, 0)`,
              visibility: shown > 0.01 ? "visible" : "hidden",
            }}
          >
            <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[10px]">
              {node.label}
            </span>
            <span className="mt-1 hidden text-xs text-surface-dark-foreground sm:block">
              {node.detail}
            </span>
          </div>
        );
      })}

      <OperationsPanel progress={progress} system={system} live={live} />
    </figure>
  );
}

const ROWS = [
  { name: "New enquiry", status: "Captured" },
  { name: "Owner notified", status: "Sent" },
  { name: "Team handoff", status: "Assigned" },
  { name: "Follow-up", status: "Scheduled" },
] as const;

function OperationsPanel({
  progress,
  system,
  live,
}: {
  progress: number;
  system: number;
  live: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="hero-ops-panel absolute"
      style={{
        opacity: system,
        transform: `translate3d(0, ${(1 - system) * 18}px, 0) scale(${0.92 + system * 0.08})`,
        visibility: system > 0.01 ? "visible" : "hidden",
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-surface-dark-border px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="font-display text-[11px] font-medium text-surface-dark-foreground sm:text-sm">
          Operations overview
        </span>
        <span className="relative inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] sm:text-[10px]">
          <span
            className="size-1.5 rounded-full bg-primary"
            style={{ boxShadow: `0 0 ${live * 10}px var(--glow)`, opacity: 0.4 + live * 0.6 }}
          />
          <span className="grid">
            <span
              className="col-start-1 row-start-1 text-surface-dark-muted"
              style={{ opacity: 1 - live }}
            >
              Connecting
            </span>
            <span className="col-start-1 row-start-1 text-primary" style={{ opacity: live }}>
              Running
            </span>
          </span>
        </span>
      </div>
      <ul className="px-3 py-1.5 sm:px-4 sm:py-2">
        {ROWS.map((row, index) => {
          const start = TIMELINE.rows[index] ?? 1;
          const shown = easeOutCubic(range(progress, start, start + TIMELINE.rowLength));
          const done = range(
            progress,
            start + TIMELINE.rowLength * 0.55,
            start + TIMELINE.rowLength * 1.1,
          );
          return (
            <li
              key={row.name}
              className="flex items-center justify-between gap-3 border-b border-surface-dark-border/60 py-2 text-[10px] last:border-b-0 sm:py-2.5 sm:text-xs"
              style={{ opacity: shown, transform: `translate3d(${(1 - shown) * 12}px, 0, 0)` }}
            >
              <span className="flex items-center gap-2 text-surface-dark-foreground/85">
                <span
                  className="inline-block size-1.5 rounded-full border border-primary"
                  style={{
                    backgroundColor: `color-mix(in oklab, var(--glow) ${done * 100}%, transparent)`,
                  }}
                />
                {row.name}
              </span>
              <span className="grid text-right">
                <span
                  className="col-start-1 row-start-1 text-surface-dark-muted"
                  style={{ opacity: 1 - done }}
                >
                  Waiting
                </span>
                <span className="col-start-1 row-start-1 text-primary" style={{ opacity: done }}>
                  {row.status}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="h-px bg-surface-dark-border">
        <div
          className="h-px origin-left bg-primary"
          style={{ transform: `scaleX(${range(progress, TIMELINE.rows[0], TIMELINE.live[1])})` }}
        />
      </div>
    </div>
  );
}
