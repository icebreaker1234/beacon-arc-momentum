import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/site/callout";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHeading } from "@/components/site/section-heading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Beacon Arc" },
      {
        name: "description",
        content:
          "The principles behind Beacon Arc’s thoughtful, practical approach to software, automation, and AI.",
      },
      { property: "og:title", content: "About — Beacon Arc" },
      {
        property: "og:description",
        content: "A dependable technology partner focused on clear decisions and useful systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});
const principles = [
  [
    "Clarity before complexity",
    "We make the problem understandable before recommending a solution. If a simpler path works, we will say so.",
  ],
  [
    "Progress you can see",
    "Work is broken into visible stages. Decisions, risks, and next steps are discussed in plain language.",
  ],
  [
    "Technology in service of work",
    "A tool is useful only when it improves the day-to-day experience of the people who rely on it.",
  ],
  [
    "Ownership stays clear",
    "Documentation, access, and maintainability are part of delivery—not an afterthought.",
  ],
  [
    "Evidence over theatre",
    "We test assumptions, distinguish concepts from live results, and avoid promises the work cannot support.",
  ],
  [
    "A long-view foundation",
    "Security, flexibility, and sensible architecture help useful systems keep serving the business.",
  ],
];
function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Beacon Arc"
        title="A thoughtful technology partner for practical change."
      >
        <p>
          Beacon Arc helps growing businesses make work easier to manage. We bring structure to
          unclear processes, connect the tools worth keeping, and build what is missing.
        </p>
      </PageIntro>
      <section className="py-24 md:py-32">
        <div className="site-container grid gap-16 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading eyebrow="Working principles" title="How we make decisions together." />
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {principles.map(([t, c], i) => (
              <article key={t} className="bg-background p-7">
                <span className="text-xs text-primary">0{i + 1}</span>
                <h2 className="mt-8 font-display text-2xl font-medium">{t}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-secondary/45 py-24">
        <div className="site-container grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">What partnership feels like</p>
            <h2 className="mt-4 font-display text-4xl font-medium">
              Direct, collaborative, and grounded.
            </h2>
          </div>
          <div className="space-y-6 leading-7 text-muted-foreground">
            <p>
              You should know what is being built, why it matters, and what choices are ahead. We
              communicate regularly, invite feedback early, and keep scope visible.
            </p>
            <p>
              We do not assume every problem needs custom software or AI. The right answer might be
              improving an existing tool, changing a process, connecting two systems, or building
              something new.
            </p>
          </div>
        </div>
      </section>
      <Callout />
    </>
  );
}
