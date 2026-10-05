export function WorkflowVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden border border-surface-dark-border bg-surface-dark ${compact ? "min-h-80" : "min-h-[34rem]"}`} aria-label="A workflow connecting an enquiry, approval, and completed customer record">
      <div className="absolute inset-0 opacity-30 fine-grid" />
      <svg viewBox="0 0 680 500" className="absolute inset-0 size-full" role="img" aria-label="A luminous arc connects business workflow steps into one software interface">
        <defs><linearGradient id="arcGradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" className="text-primary" stopColor="currentColor" stopOpacity="0.25"/><stop offset="0.65" className="text-primary" stopColor="currentColor"/><stop offset="1" className="text-glow" stopColor="currentColor"/></linearGradient></defs>
        <path d="M58 386 C112 94 388 38 620 132" fill="none" stroke="url(#arcGradient)" strokeWidth="2" pathLength="1" className="arc-draw" />
        {[{x:58,y:386},{x:205,y:164},{x:405,y:84},{x:620,y:132}].map((n,i)=><g key={i}><circle cx={n.x} cy={n.y} r={i===3?8:5} className="fill-primary"/><circle cx={n.x} cy={n.y} r={i===3?18:12} fill="none" className="stroke-primary/30"/></g>)}
      </svg>
      <div className="absolute left-[7%] top-[71%] w-36 border border-surface-dark-border bg-surface-dark/90 p-3 shadow-2xl backdrop-blur">
        <span className="block text-[10px] uppercase tracking-widest text-surface-dark-muted">New enquiry</span><span className="mt-2 block text-sm text-surface-dark-foreground">Details captured</span>
      </div>
      <div className="absolute left-[27%] top-[24%] w-36 border border-surface-dark-border bg-surface-dark/90 p-3 shadow-2xl backdrop-blur">
        <span className="block text-[10px] uppercase tracking-widest text-surface-dark-muted">Automation</span><span className="mt-2 block text-sm text-surface-dark-foreground">Owner notified</span>
      </div>
      <div className="absolute right-[7%] top-[18%] w-[46%] min-w-48 border border-surface-dark-border bg-surface-dark/95 p-3 shadow-2xl backdrop-blur md:p-5">
        <div className="flex items-center justify-between border-b border-surface-dark-border pb-3"><span className="text-xs font-medium text-surface-dark-foreground">Operations overview</span><span className="size-2 rounded-full bg-primary" /></div>
        <div className="mt-4 grid grid-cols-3 gap-2"><Metric label="Open" value="08"/><Metric label="Moving" value="14"/><Metric label="Done" value="31"/></div>
        <div className="mt-4 space-y-2"><Row name="Client record" state="Ready"/><Row name="Team handoff" state="Sent"/><Row name="Next action" state="Set"/></div>
      </div>
      <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.16em] text-surface-dark-muted">From signal → system</div>
    </div>
  );
}
function Metric({label,value}:{label:string;value:string}) { return <div className="border border-surface-dark-border p-2"><span className="block text-[9px] uppercase text-surface-dark-muted">{label}</span><strong className="mt-1 block font-display text-xl font-medium text-surface-dark-foreground">{value}</strong></div> }
function Row({name,state}:{name:string;state:string}) { return <div className="flex items-center justify-between border-b border-surface-dark-border/70 py-2 text-[11px]"><span className="text-surface-dark-muted">{name}</span><span className="text-primary">{state}</span></div> }
