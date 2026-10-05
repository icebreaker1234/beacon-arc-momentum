import { Link } from "@tanstack/react-router";

export function BrandMark() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Beacon Arc home">
      <svg viewBox="0 0 38 38" className="size-8" aria-hidden="true">
        <circle cx="8" cy="28" r="3" className="fill-primary" />
        <path d="M8 28C9 12 19 5 34 7" className="fill-none stroke-foreground/70 transition-colors group-hover:stroke-primary" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="7" r="1.5" className="fill-foreground" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">Beacon Arc</span>
    </Link>
  );
}
