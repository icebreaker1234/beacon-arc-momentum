const clampStage = (progress: number, start: number, end: number) =>
  Math.max(0, Math.min(1, (progress - start) / (end - start)));

const arcPoint = (progress: number) => {
  const t = Math.max(0, Math.min(1, progress));
  const inverse = 1 - t;
  return {
    x: inverse ** 3 * 58 + 3 * inverse ** 2 * t * 112 + 3 * inverse * t ** 2 * 388 + t ** 3 * 620,
    y: inverse ** 3 * 386 + 3 * inverse ** 2 * t * 94 + 3 * inverse * t ** 2 * 38 + t ** 3 * 132,
  };
};

export function WorkflowVisual({ compact = false, progress }: { compact?: boolean; progress?: number }) {
  const isScrollStory = typeof progress === "number";
  const resolvedProgress = progress ?? 1;
  const arcProgress = clampStage(resolvedProgress, 0.06, 0.46);
  const dashboardProgress = clampStage(resolvedProgress, 0.61, 0.78);
  const tip = arcPoint(arcProgress);
  const nodes = [
    { x: 58, y: 386, start: 0 },
    { x: 205, y: 164, start: 0.32 },
    { x: 405, y: 84, start: 0.43 },
    { x: 620, y: 132, start: 0.54 },
  ];

  return (
    <div className={`relative overflow-hidden border border-surface-dark-border bg-surface-dark ${compact ? "min-h-80" : isScrollStory ? "min-h-[19rem] sm:min-h-[22rem] lg:min-h-[34rem]" : "min-h-[34rem]"}`} aria-label="A beacon signal connects business workflow steps and resolves into an operations dashboard">
      <div className="absolute inset-0 opacity-30 fine-grid" />
      <svg viewBox="0 0 680 500" className="absolute inset-0 size-full" role="img" aria-label="A luminous arc connects business workflow steps into one software interface">
        <defs>
          <linearGradient id="arcGradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" className="text-primary" stopColor="currentColor" stopOpacity="0.25"/><stop offset="0.65" className="text-primary" stopColor="currentColor"/><stop offset="1" className="text-glow" stopColor="currentColor"/></linearGradient>
          <filter id="arcGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="beaconHalo"><stop offset="0" className="text-glow" stopColor="currentColor" stopOpacity="0.45"/><stop offset="1" className="text-glow" stopColor="currentColor" stopOpacity="0"/></radialGradient>
        </defs>
        <path d="M58 386 C112 94 388 38 620 132" fill="none" className="stroke-surface-dark-border" strokeWidth="1" strokeDasharray="3 9" />
        <path d="M58 386 C112 94 388 38 620 132" fill="none" stroke="url(#arcGradient)" strokeWidth="2.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - arcProgress} filter="url(#arcGlow)" className={isScrollStory ? "" : "arc-draw"} />
        {isScrollStory && arcProgress > 0.01 && <g transform={`translate(${tip.x} ${tip.y})`} opacity={clampStage(arcProgress, 0.01, 0.08)}>
          <circle r="22" fill="url(#beaconHalo)" />
          <circle r="4.5" className="fill-glow" filter="url(#arcGlow)" />
        </g>}
        {nodes.map((node, index) => {
          const nodeProgress = isScrollStory ? clampStage(resolvedProgress, node.start, node.start + 0.09) : 1;
          return <g key={index} opacity={nodeProgress} transform={`translate(${node.x} ${node.y}) scale(${0.7 + nodeProgress * 0.3})`}>
            <circle r={index === 0 ? 34 : 22} fill="url(#beaconHalo)" className={index === 0 ? "beacon-pulse" : ""}/>
            <circle r={index === 0 ? 7 : 5} className="fill-primary" filter="url(#arcGlow)"/>
            <circle r={index === 0 ? 17 : 12} fill="none" className="stroke-primary/40" />
          </g>;
        })}
      </svg>
      <div className="absolute left-[7%] top-[65%] w-32 border border-surface-dark-border bg-surface-dark/90 p-3 shadow-2xl backdrop-blur sm:top-[71%] sm:w-36" style={isScrollStory ? { opacity: clampStage(resolvedProgress, 0.24, 0.36), transform: `translateY(${(1 - clampStage(resolvedProgress, 0.24, 0.36)) * 14}px)` } : undefined}>
        <span className="block text-[10px] uppercase tracking-widest text-surface-dark-muted">New enquiry</span><span className="mt-2 block text-sm text-surface-dark-foreground">Details captured</span>
      </div>
      <div className="absolute left-[25%] top-[21%] w-32 border border-surface-dark-border bg-surface-dark/90 p-3 shadow-2xl backdrop-blur sm:left-[27%] sm:top-[24%] sm:w-36" style={isScrollStory ? { opacity: clampStage(resolvedProgress, 0.37, 0.49), transform: `translateY(${(1 - clampStage(resolvedProgress, 0.37, 0.49)) * 14}px)` } : undefined}>
        <span className="block text-[10px] uppercase tracking-widest text-surface-dark-muted">Automation</span><span className="mt-2 block text-sm text-surface-dark-foreground">Owner notified</span>
      </div>
      {isScrollStory && <div className="absolute right-[7%] top-[35%] w-32 border border-surface-dark-border bg-surface-dark/90 p-3 shadow-2xl backdrop-blur sm:top-[40%] sm:w-36" style={{ opacity: clampStage(resolvedProgress, 0.49, 0.59), transform: `translateY(${(1 - clampStage(resolvedProgress, 0.49, 0.59)) * 14}px)` }}>
        <span className="block text-[10px] uppercase tracking-widest text-surface-dark-muted">Team handoff</span><span className="mt-2 block text-sm text-surface-dark-foreground">Next step assigned</span>
      </div>}
      <div className="absolute right-[5%] top-[13%] w-[53%] min-w-48 border border-surface-dark-border bg-surface-dark/95 p-3 shadow-2xl backdrop-blur md:right-[7%] md:top-[18%] md:w-[46%] md:p-5" style={isScrollStory ? { opacity: dashboardProgress, transform: `translateY(${(1 - dashboardProgress) * 24}px) scale(${0.96 + dashboardProgress * 0.04})` } : undefined}>
        <div className="flex items-center justify-between border-b border-surface-dark-border pb-3"><span className="text-xs font-medium text-surface-dark-foreground">Operations overview</span><span className="size-2 rounded-full bg-primary" /></div>
        <div className="mt-4 grid grid-cols-3 gap-2"><Metric label="Open" value="08"/><Metric label="Moving" value="14"/><Metric label="Done" value="31"/></div>
        <div className="mt-4 space-y-2"><Row name="Client record" state="Ready" progress={isScrollStory ? clampStage(resolvedProgress, 0.72, 0.81) : 1}/><Row name="Team handoff" state="Sent" progress={isScrollStory ? clampStage(resolvedProgress, 0.79, 0.88) : 1}/><Row name="Next action" state="Set" progress={isScrollStory ? clampStage(resolvedProgress, 0.86, 0.95) : 1}/></div>
      </div>
      <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.16em] text-surface-dark-muted">From signal → system</div>
    </div>
  );
}
function Metric({label,value}:{label:string;value:string}) { return <div className="border border-surface-dark-border p-2"><span className="block text-[9px] uppercase text-surface-dark-muted">{label}</span><strong className="mt-1 block font-display text-xl font-medium text-surface-dark-foreground">{value}</strong></div> }
function Row({name,state,progress = 1}:{name:string;state:string;progress?:number}) { return <div className="flex items-center justify-between border-b border-surface-dark-border/70 py-2 text-[11px]" style={{ opacity: progress, transform: `translateX(${(1-progress)*10}px)` }}><span className="text-surface-dark-muted">{name}</span><span className="text-primary">{state}</span></div> }
