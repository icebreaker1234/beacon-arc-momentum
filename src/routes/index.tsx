import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Layers, Link2, Repeat2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/site/callout";
import { SectionHeading } from "@/components/site/section-heading";
import { WorkflowVisual } from "@/components/visuals/workflow-visual";
import { SoundToggle } from "@/components/visuals/sound-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beacon Arc — Better systems. Clearer momentum." },
      {
        name: "description",
        content:
          "Custom software, automation, websites, integrations, and practical AI for growing businesses.",
      },
      { property: "og:title", content: "Beacon Arc — Better systems. Clearer momentum." },
      {
        property: "og:description",
        content:
          "We turn time-consuming processes and disconnected tools into clear, useful systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  ["01", "Custom business software", "Tools shaped around the way your team actually works."],
  [
    "02",
    "Websites & digital products",
    "Clear digital experiences that help customers take the next step.",
  ],
  ["03", "Workflow automation", "Reliable handoffs between people, systems, and routine tasks."],
  [
    "04",
    "Practical AI solutions",
    "Focused assistants and document workflows inside real operations.",
  ],
  [
    "05",
    "Dashboards & data systems",
    "A clearer view of what is happening and what needs attention.",
  ],
  ["06", "Integrations & cloud systems", "Connected tools with a secure, maintainable foundation."],
];
const trustItems = [
  {
    icon: Layers,
    title: "Maintainable by design",
    copy: "Sensible foundations instead of needless complexity.",
  },
  {
    icon: Link2,
    title: "Clear ownership",
    copy: "Documentation, access, and decisions stay visible.",
  },
  {
    icon: Repeat2,
    title: "Transparent recommendations",
    copy: "We explain trade-offs and say when simpler is better.",
  },
  {
    icon: Sparkles,
    title: "Security-minded delivery",
    copy: "Careful access, data handling, and dependable implementation.",
  },
];
function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        setHeroProgress(1);
        return;
      }
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setHeroProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
    };
  }, []);
  return (
    <>
      <section
        ref={heroRef}
        className="relative h-[210svh] bg-surface-dark text-surface-dark-foreground md:h-[190svh]"
      >
        <div className="absolute inset-0 opacity-20 fine-grid" aria-hidden="true" />
        <div className="sticky top-16 overflow-hidden md:top-20">
          <div className="site-container relative grid min-h-[calc(100svh-4rem)] content-center gap-5 py-5 md:min-h-[calc(100svh-5rem)] md:gap-8 md:py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12 lg:py-12">
            <div className="relative z-10 rise">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow">Software, automation & AI for growing businesses</p>
                <SoundToggle heroRef={heroRef} />
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[0.98] sm:text-5xl md:mt-6 md:text-7xl lg:text-[5.4rem]">
                Better systems.
                <br />
                <span className="text-primary">Clearer momentum.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-surface-dark-muted md:mt-6 md:text-lg md:leading-8">
                We turn time-consuming processes and disconnected tools into useful software,
                automation, and AI workflows—so your team can focus on moving the business forward.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-8">
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
            <div className="relative lg:-mr-16">
              <WorkflowVisual progress={heroProgress} />
            </div>
          </div>
          <div className="site-container relative border-t border-surface-dark-border py-3 text-xs uppercase tracking-widest text-surface-dark-muted md:py-4">
            Scroll to follow the signal <span className="ml-3 text-primary">↓</span>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="The friction"
            title="Good teams lose time in the gaps between tools."
            copy="The problem is rarely a lack of effort. It is usually a process held together by copying, chasing, checking, and remembering."
          />
          <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Repetitive work",
              "Disconnected systems",
              "Manual reporting",
              "Slow handoffs",
              "Unclear data",
            ].map((x, i) => (
              <div key={x} className="min-h-44 border-b border-r border-border p-6">
                <span className="text-xs text-primary">0{i + 1}</span>
                <h3 className="mt-10 font-display text-xl font-medium">{x}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/45 py-24 md:py-32">
        <div className="site-container grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="The shift" title="From scattered actions to one clear flow." />
            <p className="mt-6 leading-7 text-muted-foreground">
              We map what happens now, remove avoidable steps, and connect the right tools. The
              result is not “more technology.” It is a calmer operating rhythm with clear ownership
              and fewer dropped details.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Information captured once",
                "Next steps happen automatically",
                "People see what needs attention",
                "Progress is easier to understand",
              ].map((x) => (
                <li key={x} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 size-4 text-primary" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <WorkflowVisual compact />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we build"
              title="Practical systems for the work that matters."
            />
            <Button asChild variant="outline">
              <Link to="/services">
                View all services <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-14 grid border-t border-border md:grid-cols-2">
            {services.map(([n, t, c]) => (
              <Link
                key={t}
                to="/services"
                className="group border-b border-border py-7 md:odd:pr-10 md:even:border-l md:even:pl-10"
              >
                <div className="flex gap-5">
                  <span className="pt-1 text-xs text-primary">{n}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium group-hover:text-primary">
                      {t}
                    </h3>
                    <p className="mt-2 max-w-md leading-7 text-muted-foreground">{c}</p>
                  </div>
                  <ArrowRight className="ml-auto mt-1 size-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-24 text-surface-dark-foreground md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="Selected work"
            title="A clearer way to run shared living operations."
            copy="A product concept showing how resident, room, rent, expense, and availability workflows can live in one coherent system."
          />
          <Link
            to="/work/co-living-operations"
            className="group mt-14 grid overflow-hidden border border-surface-dark-border lg:grid-cols-[1.15fr_.85fr]"
          >
            <WorkflowVisual compact />
            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary">
                  Product concept · not a live deployment
                </span>
                <h3 className="mt-5 font-display text-3xl font-medium">
                  Co-living operations platform
                </h3>
                <p className="mt-4 leading-7 text-surface-dark-muted">
                  One operational view for resident profiles, room occupancy, rent tracking,
                  expenses, and website availability.
                </p>
              </div>
              <span className="mt-12 flex items-center gap-2 text-sm text-primary">
                Read the case study{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="How we work"
            title="A steady path from problem to useful system."
          />
          <div className="mt-16 grid gap-px bg-border md:grid-cols-4">
            {[
              [
                "Discover",
                "Understand the work, constraints, users, and what success needs to mean.",
              ],
              [
                "Design",
                "Make scope tangible with flows, prototypes, and clear technical choices.",
              ],
              ["Build", "Deliver in visible stages, with regular feedback and no black box."],
              ["Improve", "Launch carefully, document ownership, and refine from real use."],
            ].map(([t, c], i) => (
              <div key={t} className="bg-background p-7">
                <span className="text-xs text-primary">0{i + 1}</span>
                <h3 className="mt-10 font-display text-2xl font-medium">{t}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/45 py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading eyebrow="Built for trust" title="Clear advice. Clean handover." />
          <div className="grid gap-8 sm:grid-cols-2">
            {trustItems.map(({ icon: Icon, title, copy }) => (
              <div key={title}>
                <Icon className="size-5 text-primary" />
                <h3 className="mt-4 font-display text-xl font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Callout />
    </>
  );
}
