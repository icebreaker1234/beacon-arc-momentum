import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { WorkflowVisual } from "@/components/visuals/workflow-visual";
import { Callout } from "@/components/site/callout";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Beacon Arc" },
      {
        name: "description",
        content:
          "Explore Beacon Arc product concepts and case-study formats focused on practical business systems.",
      },
      { property: "og:title", content: "Work — Beacon Arc" },
      {
        property: "og:description",
        content: "Practical systems, presented with honest context and outcomes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});
function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="Selected work" title="Systems designed around real operations.">
        <p>
          We show the context, decisions, and evidence behind the work. Where a project is
          exploratory rather than live, we say so plainly.
        </p>
      </PageIntro>
      <section className="py-20 md:py-28">
        <div className="site-container">
          <Link
            to="/work/co-living-operations"
            className="group grid overflow-hidden border border-border bg-card lg:grid-cols-[1.1fr_.9fr]"
          >
            <WorkflowVisual compact />
            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Product concept · 01
                </span>
                <h2 className="mt-5 font-display text-4xl font-medium">
                  Co-living operations platform
                </h2>
                <p className="mt-5 leading-7 text-muted-foreground">
                  A connected view of residents, rooms, rent, expenses, and public
                  availability—designed to replace scattered operational tracking.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Operations", "Internal software", "Website publishing"].map((x) => (
                    <span
                      key={x}
                      className="border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <span className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Open case study{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-muted-foreground">
            Additional work will be added only when its context and outcomes can be represented
            accurately.
          </p>
        </div>
      </section>
      <Callout />
    </>
  );
}
