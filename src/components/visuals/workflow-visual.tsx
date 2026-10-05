import { useId } from "react";

/**
 * Reusable static workflow graphic used in later homepage sections and case studies.
 * The animated, scroll-driven hero sequence is a separate component
 * (`hero-signal-stage.tsx`) so this graphic stays stable wherever it is reused.
 */
export function WorkflowVisual({ compact = false }: { compact?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const gradient = `arcGradient-${uid}`;
  const glow = `arcGlow-${uid}`;
  const halo = `beaconHalo-${uid}`;
  const nodes = [
    { x: 58, y: 386 },
    { x: 205, y: 164 },
    { x: 405, y: 84 },
    { x: 620, y: 132 },
  ];

  return (
    <div
      className={`relative overflow-hidden border border-surface-dark-border bg-surface-dark ${compact ? "min-h-80" : "min-h-[34rem]"}`}
    >
      <div className="absolute inset-0 opacity-30 fine-grid" aria-hidden="true" />
      <svg
        viewBox="0 0 680 500"
        className="absolute inset-0 size-full"
        role="img"
        aria-label="A luminous arc connects business workflow steps into one operations overview"
      >
        <defs>
          <linearGradient id={gradient} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" className="text-primary" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="0.65" className="text-primary" stopColor="currentColor" />
            <stop offset="1" className="text-glow" stopColor="currentColor" />
          </linearGradient>
          <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={halo}>
            <stop offset="0" className="text-glow" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="1" className="text-glow" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M58 386 C112 94 388 38 620 132"
          fill="none"
          className="stroke-surface-dark-border"
          strokeWidth="1"
          strokeDasharray="3 9"
        />
        <path
          d="M58 386 C112 94 388 38 620 132"
          fill="none"
          stroke={`url(#${gradient})`}
          strokeWidth="2.5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={0}
          filter={`url(#${glow})`}
          className="arc-draw"
        />
        {nodes.map((node, index) => (
          <g key={index} transform={`translate(${node.x} ${node.y})`}>
            <circle
              r={index === 0 ? 34 : 22}
              fill={`url(#${halo})`}
              className={index === 0 ? "beacon-pulse" : ""}
            />
            <circle r={index === 0 ? 7 : 5} className="fill-primary" filter={`url(#${glow})`} />
            <circle r={index === 0 ? 17 : 12} fill="none" className="stroke-primary/40" />
          </g>
        ))}
      </svg>
      <div
        className="absolute left-[7%] top-[65%] w-32 border border-surface-dark-border bg-surface-dark/90 p-3 shadow-2xl backdrop-blur sm:top-[71%] sm:w-36"
        aria-hidden="true"
      >
        <span className="block text-[10px] uppercase tracking-widest text-surface-dark-muted">
          New enquiry
        </span>
        <span className="mt-2 block text-sm text-surface-dark-foreground">Details captured</span>
      </div>
      <div
        className="absolute left-[25%] top-[21%] w-32 border border-surface-dark-border bg-surface-dark/90 p-3 shadow-2xl backdrop-blur sm:left-[27%] sm:top-[24%] sm:w-36"
        aria-hidden="true"
      >
        <span className="block text-[10px] uppercase tracking-widest text-surface-dark-muted">
          Automation
        </span>
        <span className="mt-2 block text-sm text-surface-dark-foreground">Owner notified</span>
      </div>
      <div
        className="absolute right-[4%] top-[12%] w-[62%] min-w-48 border border-surface-dark-border bg-surface-dark/95 p-3 shadow-2xl backdrop-blur md:right-[7%] md:top-[18%] md:w-[46%] md:p-5"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between border-b border-surface-dark-border pb-3">
          <span className="text-xs font-medium text-surface-dark-foreground">
            Operations overview
          </span>
          <span className="size-2 rounded-full bg-primary" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric label="Open" value="08" />
          <Metric label="Moving" value="14" />
          <Metric label="Done" value="31" />
        </div>
        <div className="mt-4 space-y-2">
          <Row name="Client record" state="Ready" />
          <Row name="Team handoff" state="Sent" />
          <Row name="Next action" state="Set" />
        </div>
      </div>
      <div
        className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.16em] text-surface-dark-muted"
        aria-hidden="true"
      >
        From signal → system
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-surface-dark-border p-2">
      <span className="block text-[9px] uppercase text-surface-dark-muted">{label}</span>
      <strong className="mt-1 block font-display text-xl font-medium text-surface-dark-foreground">
        {value}
      </strong>
    </div>
  );
}

function Row({ name, state }: { name: string; state: string }) {
  return (
    <div className="flex items-center justify-between border-b border-surface-dark-border/70 py-2 text-[11px]">
      <span className="text-surface-dark-muted">{name}</span>
      <span className="text-primary">{state}</span>
    </div>
  );
}
