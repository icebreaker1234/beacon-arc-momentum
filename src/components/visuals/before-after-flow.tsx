import { ArrowRight } from "lucide-react";

const BEFORE = [
  { text: "Enquiry arrives by email", shift: "sm:translate-x-6 sm:-rotate-1" },
  { text: "Details copied into a spreadsheet", shift: "sm:-translate-x-2 sm:rotate-1" },
  { text: "Follow-up kept in someone’s head", shift: "sm:translate-x-10" },
  { text: "Status chased over chat", shift: "sm:translate-x-1 sm:-rotate-[1.5deg]" },
  { text: "Weekly report rebuilt by hand", shift: "sm:translate-x-8 sm:rotate-[0.8deg]" },
];

const AFTER = [
  { step: "Enquiry captured once", note: "One form feeds one shared record." },
  { step: "Owner notified automatically", note: "The right person is told, with context." },
  { step: "Handoff with a clear next step", note: "Nothing waits on memory." },
  { step: "Progress visible in one place", note: "Status and reporting come from the same data." },
];

/** Before-and-after comparison for the homepage “shift” section. */
export function BeforeAfterFlow() {
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
      <section
        aria-labelledby="flow-before"
        className="relative overflow-hidden border border-border bg-background p-6 md:p-7"
      >
        <p
          id="flow-before"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Before · scattered
        </p>
        <ul className="mt-6 space-y-3">
          {BEFORE.map((item) => (
            <li
              key={item.text}
              className={`w-fit border border-dashed border-input bg-card px-3 py-2 text-sm text-muted-foreground ${item.shift}`}
            >
              {item.text}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Five tools, several people, and no single view of where things stand.
        </p>
      </section>

      <div className="flex items-center justify-center text-primary" aria-hidden="true">
        <ArrowRight className="size-5 rotate-90 md:rotate-0" />
      </div>

      <section
        aria-labelledby="flow-after"
        className="relative overflow-hidden border border-surface-dark-border bg-surface-dark p-6 text-surface-dark-foreground md:p-7"
      >
        <p id="flow-after" className="text-xs font-semibold uppercase tracking-widest text-primary">
          After · connected
        </p>
        <ol className="relative mt-6 space-y-5 pl-6">
          <span
            className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-primary to-glow"
            aria-hidden="true"
          />
          {AFTER.map((item) => (
            <li key={item.step} className="relative">
              <span
                className="absolute -left-6 top-1.5 size-[11px] rounded-full border border-primary bg-surface-dark"
                aria-hidden="true"
              >
                <span className="absolute inset-[2px] rounded-full bg-glow" />
              </span>
              <span className="block text-sm font-medium">{item.step}</span>
              <span className="mt-1 block text-xs leading-5 text-surface-dark-muted">
                {item.note}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs leading-5 text-surface-dark-muted">
          People stay in charge of decisions; the routine steps run on their own.
        </p>
      </section>
    </div>
  );
}
