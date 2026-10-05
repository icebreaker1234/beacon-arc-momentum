import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { HeroSignalStage } from "@/components/visuals/hero-signal-stage";
import { SoundToggle } from "@/components/visuals/sound-toggle";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { phaseAt, type HeroPhase } from "@/lib/hero-motion";

const PHASES: { id: HeroPhase; label: string; caption: string }[] = [
  { id: "beacon", label: "Beacon", caption: "It starts with one signal." },
  { id: "arc", label: "Arc", caption: "The signal finds a clear path." },
  { id: "signals", label: "Signals", caption: "Each step connects to the next." },
  { id: "system", label: "System", caption: "And the work runs as one system." },
];

/**
 * Homepage hero.
 *
 * The visual stage lives in a tall "track" and is `position: sticky`, so the
 * sequence advances with ordinary scrolling and nothing intercepts the scroll.
 * Desktop: copy and stage stick side by side for the whole chapter.
 * Phones: copy reads first in normal flow, then the stage takes a full screen.
 */
export function HeroChapter({ nextId }: { nextId: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { progress } = useScrollProgress(trackRef, stageRef);
  const phase = phaseAt(progress);
  const phaseIndex = PHASES.findIndex((item) => item.id === phase);

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface-dark text-surface-dark-foreground"
      aria-labelledby="hero-title"
    >
      <a href={`#${nextId}`} className="hero-skip">
        Skip the intro animation
      </a>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] fine-grid"
        aria-hidden="true"
      />

      <div className="site-container relative grid lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="hero-copy relative z-10 flex flex-col justify-center pt-8 pb-6 rise lg:py-10">
            <div className="flex min-h-9 items-center justify-between gap-4">
              <p className="eyebrow">Software, automation & AI for growing businesses</p>
              <SoundToggle areaRef={sectionRef} />
            </div>
            <h1
              id="hero-title"
              className="mt-4 font-display text-[2.6rem] font-medium leading-[1] tracking-tight sm:mt-6 sm:text-6xl lg:text-[clamp(3rem,4.2vw,4.4rem)]"
            >
              Better systems.
              <br />
              <span className="text-primary">Clearer momentum.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-surface-dark-muted sm:mt-6 sm:text-lg sm:leading-8">
              We turn time-consuming processes and disconnected tools into useful software,
              automation, and AI workflows — so your team can spend less time fighting its tools
              and more time moving the business forward.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Button asChild size="lg">
                <Link to="/contact">
                  Book a discovery call <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-surface-dark-border bg-transparent text-surface-dark-foreground hover:bg-surface-dark-foreground hover:text-surface-dark"
              >
                <Link to="/services">Explore what we build</Link>
              </Button>
            </div>
          </div>
        </div>

        <div ref={trackRef} className="hero-track relative">
          <div ref={stageRef} className="hero-sticky sticky top-20 flex flex-col">
            {/* Phone-only caption narrating the current chapter. */}
            <p
              className="relative pt-5 font-display text-lg text-surface-dark-foreground lg:hidden"
              aria-hidden="true"
            >
              <span className="mr-2 text-xs text-primary">0{phaseIndex + 1}</span>
              {PHASES[phaseIndex]?.caption}
            </p>

            <div className="hero-stage-slot relative flex-1 py-4 lg:py-8">
              <div className="flex h-full items-center">
                <HeroSignalStage progress={progress} />
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-4 border-t border-surface-dark-border py-3 text-[10px] uppercase tracking-[0.16em] text-surface-dark-muted sm:text-xs">
              <span className="hidden whitespace-nowrap lg:grid" aria-hidden="true">
                <span
                  className="col-start-1 row-start-1"
                  style={{ opacity: 1 - Math.min(1, progress * 6) }}
                >
                  Scroll to follow the signal <span className="ml-2 text-primary">↓</span>
                </span>
                <span
                  className="col-start-1 row-start-1"
                  style={{ opacity: Math.min(1, Math.max(0, progress * 6 - 1)) }}
                >
                  From signal to system
                </span>
              </span>
              <Button asChild size="sm" className="normal-case tracking-normal lg:hidden">
                <Link to="/contact">
                  Book a call <ArrowRight />
                </Link>
              </Button>
              <ol className="flex items-center gap-3 sm:gap-5" aria-hidden="true">
                {PHASES.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 transition-colors duration-300"
                    style={{
                      color: index <= phaseIndex ? "var(--surface-dark-foreground)" : undefined,
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor:
                          index === phaseIndex
                            ? "var(--glow)"
                            : index < phaseIndex
                              ? "var(--primary)"
                              : "var(--surface-dark-border)",
                      }}
                    />
                    <span className={index === phaseIndex ? "" : "hidden xl:inline"}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="absolute inset-x-0 -top-px h-px" aria-hidden="true">
                <div
                  className="h-px origin-left bg-primary/70"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
