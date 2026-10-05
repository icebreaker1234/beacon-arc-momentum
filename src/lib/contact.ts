import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid work email.").max(255),
  company: z.string().trim().max(150).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters) so we can prepare.")
    .max(2000),
  budget: z.string().max(50).optional(),
  contactMethod: z.string().min(1, "Choose how you would like us to reply."),
  /** Honeypot: real visitors never see or fill this. */
  website: z.string().max(0).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export type SubmitResult =
  { status: "sent" } | { status: "not-configured" } | { status: "error"; message: string };

/**
 * Sends an enquiry as JSON to the configured endpoint (Formspree, Basin,
 * Getform, or your own API). Success is reported only for a 2xx response.
 */
export async function submitEnquiry(
  values: Enquiry,
  endpoint: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint) return { status: "not-configured" };
  // Bots that fill the hidden field get a quiet, non-delivering response.
  if (values.website) return { status: "sent" };

  const { website: _ignored, ...payload } = values;
  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, source: "beacon-arc-website" }),
    });
    if (response.ok) return { status: "sent" };
    return {
      status: "error",
      message: `The form service responded with an error (${response.status}). Nothing was confirmed as sent.`,
    };
  } catch {
    return {
      status: "error",
      message: "We couldn’t reach the form service. Check your connection and try again.",
    };
  }
}
