import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Layers, Link2, Repeat2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/site/callout";
import { SectionHeading } from "@/components/site/section-heading";
import { WorkflowVisual } from "@/components/visuals/workflow-visual";
import { BeforeAfterFlow } from "@/components/visuals/before-after-flow";
import { HeroChapter } from "@/components/site/hero-chapter";

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

const services: [string, string, string, string][] = [
  [
    "01",
    "custom-software",
    "Custom business software",
    "Tools shaped around the way your team actually works.",
  ],
  [
    "02",
    "websites",
    "Websites & digital products",
    "Clear digital experiences that help customers take the next step.",
  ],
  [
    "03",
    "automation",
    "Workflow automation",
    "Reliable handoffs between people, systems, and routine tasks.",
  ],
  [
    "04",
    "ai",
    "Practical AI solutions",
    "Focused assistants and document workflows inside real operations.",
  ],
  [
    "05",
    "dashboards",
    "Dashboards & data systems",
    "A clearer view of what is happening and what needs attention.",
  ],
  [
    "06",
    "integrations",
    "Integrations & cloud systems",
    "Connected tools with a secure, maintainable foundation.",
  ],
];
const friction = [
  ["Repetitive work", "The same details typed into a form, a spreadsheet and an email."],
  ["Disconnected systems", "Tools that each hold part of the picture and never compare notes."],
  ["Manual reporting", "Friday afternoons spent stitching exports into one summary."],
  ["Slow handoffs", "Work waits because nobody was told it was their turn."],
  ["Unclear data", "Two reports, two numbers, and no quick way to know which is right."],
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
  return (
    <>
      <HeroChapter nextId="after-hero" />

      <section
        id="after-hero"
        tabIndex={-1}
        className="scroll-mt-20 bg-background py-24 outline-none md:py-32"
      >
        <div className="site-container">
          <SectionHeading
            eyebrow="The friction"
            title="Good teams lose time in the gaps between tools."
            copy="The problem is rarely a lack of effort. It is usually a process held together by copying, chasing, checking, and remembering."
          />
          <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">
            {friction.map(([title, example], i) => (
              <div key={title} className="min-h-52 border-b border-r border-border p-6">
                <span className="text-xs text-primary">0{i + 1}</span>
                <h3 className="mt-10 font-display text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{example}</p>
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
          <BeforeAfterFlow />
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
            {services.map(([n, hash, t, c]) => (
              <Link
                key={t}
                to="/services"
                hash={hash}
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
