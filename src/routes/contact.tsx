import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid work email.").max(255),
  company: z.string().trim().max(150).optional(),
  message: z.string().trim().min(20, "Tell us a little more so we can prepare.").max(2000),
  budget: z.string().max(50).optional(),
  contactMethod: z.string().min(1, "Choose how you would like us to reply."),
});
type FormValues = z.infer<typeof schema>;
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
function ContactPage() {
  const [notice, setNotice] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const submit = () => setNotice(true);
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
                ["01", "We read the context"],
                ["02", "We identify a useful first conversation"],
                ["03", "We agree the right next step"],
              ].map(([n, t]) => (
                <li key={n} className="flex gap-5 border-t border-border pt-5">
                  <span className="text-xs text-primary">{n}</span>
                  <span className="text-sm font-medium">{t}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm leading-6 text-muted-foreground">
              No contact details have been published yet. This form is ready for a delivery service
              to be connected.
            </p>
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
              label="What would you like to improve?"
              id="message"
              error={errors.message?.message}
            >
              <Textarea
                id="message"
                rows={7}
                maxLength={2000}
                placeholder="Describe the process, who it affects, and what better would look like."
                {...register("message")}
              />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Budget range (optional)" id="budget">
                <Select onValueChange={(v) => setValue("budget", v)}>
                  <SelectTrigger id="budget" className="h-12">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exploring">Still exploring</SelectItem>
                    <SelectItem value="under-10k">Under £10,000</SelectItem>
                    <SelectItem value="10-25k">£10,000–£25,000</SelectItem>
                    <SelectItem value="25-50k">£25,000–£50,000</SelectItem>
                    <SelectItem value="50k-plus">£50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field
                label="Preferred contact method"
                id="contactMethod"
                error={errors.contactMethod?.message}
              >
                <Select
                  onValueChange={(v) => setValue("contactMethod", v, { shouldValidate: true })}
                >
                  <SelectTrigger id="contactMethod" className="h-12">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="video">Video call</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            {notice && (
              <div
                role="status"
                className="flex gap-3 border border-primary/40 bg-accent p-4 text-sm leading-6"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  Your details are valid, but the delivery service is not connected yet, so nothing
                  was sent. Once a form provider is configured, this will submit securely.
                </span>
              </div>
            )}
            <div>
              <Button type="submit" size="lg">
                Review enquiry <ArrowRight />
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Submitting currently validates your message only; it does not send or store your
                details.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
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
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
