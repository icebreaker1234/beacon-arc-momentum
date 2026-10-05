import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/site/callout";
import { PageIntro } from "@/components/site/page-intro";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Beacon Arc" },
      {
        name: "description",
        content:
          "Custom software, websites, automation, practical AI, dashboards, integrations, and cloud systems for growing businesses.",
      },
      { property: "og:title", content: "Services — Beacon Arc" },
      {
        property: "og:description",
        content: "Practical digital systems built around how your business works.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    id: "custom-software",
    title: "Custom business software",
    helps: "Teams whose day-to-day work no longer fits spreadsheets or off-the-shelf tools.",
    problem:
      "Important processes depend on workarounds, duplicate entry, or knowledge held by one person.",
    deliver:
      "Internal tools, management systems, customer portals, and purpose-built applications.",
    first:
      "Turn one high-friction workflow into a focused internal tool with clear owners and status.",
  },
  {
    n: "02",
    id: "websites",
    title: "Websites and digital products",
    helps: "Businesses that need a clearer digital front door or a better customer experience.",
    problem:
      "Your site is hard to update, does not explain your value, or sends customers through a confusing journey.",
    deliver:
      "Professional websites, self-service experiences, customer portals, and digital products.",
    first:
      "Clarify the core journey and launch one well-defined experience that can grow over time.",
  },
  {
    n: "03",
    id: "automation",
    title: "Workflow automation",
    helps: "Teams spending valuable hours moving information and chasing routine follow-ups.",
    problem:
      "Tools do not talk to each other, creating repetitive work, slow handoffs, and avoidable errors.",
    deliver:
      "Connected workflows, approvals, notifications, document handling, and operational safeguards.",
    first:
      "Map one repeated process and automate the stable steps while keeping people in control.",
  },
  {
    n: "04",
    id: "ai",
    title: "Practical AI solutions",
    helps: "Teams with document-heavy, knowledge-heavy, or repetitive information work.",
    problem: "Useful information is difficult to find, review, summarise, or apply consistently.",
    deliver:
      "Assistants, document and data workflows, search, classification, and AI features inside existing systems.",
    first:
      "Prototype one narrow use case using real examples, then assess quality and risk before expanding.",
  },
  {
    n: "05",
    id: "dashboards",
    title: "Dashboards and data systems",
    helps: "Owners and operators who need a reliable view of activity, performance, or exceptions.",
    problem:
      "Reports take too long to prepare, disagree with each other, or arrive too late to guide decisions.",
    deliver: "Operational dashboards, data pipelines, reporting tools, and clear data definitions.",
    first: "Bring one decision-critical view together from the smallest useful set of sources.",
  },
  {
    n: "06",
    id: "integrations",
    title: "Integrations and cloud systems",
    helps: "Businesses with growing platforms that need to share data safely and reliably.",
    problem:
      "Disconnected systems, fragile manual exports, and unclear technical ownership slow change down.",
    deliver:
      "Platform integrations, APIs, secure cloud foundations, monitoring, and maintainable infrastructure.",
    first: "Connect two important systems with clear error handling, ownership, and documentation.",
  },
];
function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Build what your business needs. Connect what already works."
      >
        <p>
          We start with the operational problem, not a predetermined tool. That keeps the work
          focused, useful, and proportionate to your business.
        </p>
      </PageIntro>
      <section className="py-8 md:py-16">
        <div className="site-container">
          {services.map((s) => (
            <article
              key={s.title}
              id={s.id}
              className="scroll-mt-24 grid gap-8 border-b border-border py-14 lg:grid-cols-[.6fr_1.4fr]"
            >
              <div>
                <span className="text-xs text-primary">{s.n}</span>
                <h2 className="mt-5 max-w-sm font-display text-3xl font-medium md:text-4xl">
                  {s.title}
                </h2>
              </div>
              <div className="grid gap-7 sm:grid-cols-2">
                <Detail label="Who it helps" text={s.helps} />
                <Detail label="Common problem" text={s.problem} />
                <Detail label="What we can deliver" text={s.deliver} />
                <Detail label="A sensible first project" text={s.first} />
                <div className="sm:col-span-2">
                  <Button asChild variant="outline">
                    <Link to="/contact">
                      Discuss this service <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Callout />
    </>
  );
}
function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</h3>
      <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}
