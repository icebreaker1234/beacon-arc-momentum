import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, CheckCircle2, Info, Loader2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageIntro } from "@/components/site/page-intro";
import { budgetOptions, contactEndpoint, contactMethods, site } from "@/config/site";
import { enquirySchema, submitEnquiry, type Enquiry, type SubmitResult } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Beacon Arc" },
      {
        name: "description",
        content:
          "Tell Beacon Arc about one process, system, website, or workflow you want to improve.",
      },
      { property: "og:title", content: "Contact Beacon Arc" },
      { property: "og:description", content: "Start with one process you want to make clearer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const EMPTY: Enquiry = {
  name: "",
  email: "",
  company: "",
  message: "",
  budget: "",
  contactMethod: "",
  website: "",
};

function ContactPage() {
  const configured = contactEndpoint.length > 0;
  const [result, setResult] = useState<SubmitResult | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({ resolver: zodResolver(enquirySchema), defaultValues: EMPTY });

  const submit = async (values: Enquiry) => {
    setResult(null);
    const outcome = await submitEnquiry(values, contactEndpoint);
    setResult(outcome);
    if (outcome.status === "sent") reset(EMPTY);
  };

  return (
    <>
      <PageIntro eyebrow="Let’s talk" title="Start with one process you want to improve.">
        <p>
          Tell us what is taking too much time, where information gets lost, or what you want
          customers and staff to do more easily.
        </p>
      </PageIntro>
      <section className="py-20 md:py-28">
        <div className="site-container grid gap-16 lg:grid-cols-[.65fr_1.35fr]">
          <aside>
            <p className="eyebrow">What happens next</p>
            <ol className="mt-7 space-y-7">
              {[
                ["01", "We read the context you share"],
                ["02", "We suggest a useful first conversation"],
                ["03", "We agree the right next step — which may be a small one"],
              ].map(([n, t]) => (
                <li key={n} className="flex gap-5 border-t border-border pt-5">
                  <span className="text-xs text-primary">{n}</span>
                  <span className="text-sm font-medium">{t}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 space-y-2 text-sm leading-6 text-muted-foreground">
              {site.contactEmail && (
                <p>
                  Email:{" "}
                  <a
                    className="text-foreground underline-offset-4 hover:underline"
                    href={`mailto:${site.contactEmail}`}
                  >
                    {site.contactEmail}
                  </a>
                </p>
              )}
              {site.contactPhone && (
                <p>
                  Phone:{" "}
                  <a
                    className="text-foreground underline-offset-4 hover:underline"
                    href={`tel:${site.contactPhone.replace(/\s/g, "")}`}
                  >
                    {site.contactPhone}
                  </a>
                </p>
              )}
              {!configured && (
                <p>
                  The online form is not connected to a delivery service yet, so it can check your
                  details but cannot send them.
                </p>
              )}
            </div>
          </aside>

          <form
            noValidate
            onSubmit={handleSubmit(submit)}
            className="grid gap-6"
            aria-label="Project enquiry form"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" id="name" error={errors.name?.message}>
                <Input
                  id="name"
                  autoComplete="name"
                  maxLength={100}
                  className="h-12"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                />
              </Field>
              <Field label="Work email" id="email" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  className="h-12"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
              </Field>
            </div>
            <Field label="Company (optional)" id="company" error={errors.company?.message}>
              <Input
                id="company"
                autoComplete="organization"
                maxLength={150}
                className="h-12"
                {...register("company")}
              />
            </Field>
            <Field
              label="What problem would you like to solve?"
              id="message"
              error={errors.message?.message}
            >
              <Textarea
                id="message"
                rows={7}
                maxLength={2000}
                placeholder="Describe the process, who it affects, and what better would look like."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message")}
              />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Budget (optional)" id="budget">
                <Controller
                  control={control}
                  name="budget"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger ref={field.ref} id="budget" className="h-12 w-full">
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field
                label="Preferred contact method"
                id="contactMethod"
                error={errors.contactMethod?.message}
              >
                <Controller
                  control={control}
                  name="contactMethod"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger
                        ref={field.ref}
                        id="contactMethod"
                        className="h-12 w-full"
                        aria-invalid={!!errors.contactMethod}
                        aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}
                      >
                        <SelectValue placeholder="Choose one" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactMethods.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>

            {/* Honeypot for simple bots; hidden from people and assistive tech. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <div aria-live="polite">{result && <ResultNotice result={result} />}</div>

            <div>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : configured ? (
                  <>
                    Send enquiry <ArrowRight />
                  </>
                ) : (
                  <>
                    Check my details <ArrowRight />
                  </>
                )}
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                {configured
                  ? "We use these details only to reply to your enquiry. See our privacy policy."
                  : "Form delivery is not set up yet: this checks your details but does not send or store them."}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function ResultNotice({ result }: { result: SubmitResult }) {
  if (result.status === "sent") {
    return (
      <div
        role="status"
        className="flex gap-3 border border-primary/40 bg-accent p-4 text-sm leading-6"
      >
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          Thank you — your enquiry was sent. We’ll reply using your preferred contact method.
        </span>
      </div>
    );
  }
  if (result.status === "error") {
    return (
      <div
        role="alert"
        className="flex gap-3 border border-destructive/50 bg-destructive/5 p-4 text-sm leading-6"
      >
        <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
        <span>
          {result.message}
          {site.contactEmail && (
            <>
              {" "}
              You can also email{" "}
              <a className="underline" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
              .
            </>
          )}
        </span>
      </div>
    );
  }
  return (
    <div
      role="status"
      className="flex gap-3 border border-border bg-secondary p-4 text-sm leading-6"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>
        Your details look complete, but <strong>nothing was sent</strong>: the form’s delivery
        service hasn’t been connected yet.
        {site.contactEmail ? (
          <>
            {" "}
            Please email{" "}
            <a className="underline" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>{" "}
            instead.
          </>
        ) : (
          " Please check back soon."
        )}
      </span>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
