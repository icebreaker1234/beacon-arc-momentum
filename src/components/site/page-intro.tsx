import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="border-b border-border bg-background"><div className="site-container py-20 md:py-28"><p className="eyebrow">{eyebrow}</p><h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-foreground md:text-7xl">{title}</h1><div className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div></div></section>;
}
