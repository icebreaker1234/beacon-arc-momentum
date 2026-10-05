import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Callout() {
  return <section className="bg-primary text-primary-foreground"><div className="site-container flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-end md:py-24"><div><p className="text-xs font-semibold uppercase tracking-widest opacity-70">One process is enough to start</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight md:text-6xl">What would make work feel simpler next month?</h2></div><Button asChild variant="secondary" size="lg" className="shrink-0"><Link to="/contact">Let’s talk <ArrowRight /></Link></Button></div></section>;
}
