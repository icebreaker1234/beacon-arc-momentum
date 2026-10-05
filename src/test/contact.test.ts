import { describe, expect, it, vi } from "vitest";
import { enquirySchema, submitEnquiry, type Enquiry } from "@/lib/contact";

const valid: Enquiry = {
  name: "Asha Patel",
  email: "asha@example.com",
  company: "Example Ltd",
  message: "Our enquiries arrive by email and get copied into a spreadsheet by hand.",
  budget: "",
  contactMethod: "email",
  website: "",
};

describe("contact form", () => {
  it("validates required fields", () => {
    const result = enquirySchema.safeParse({ ...valid, email: "nope", message: "short" });
    expect(result.success).toBe(false);
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });

  it("never reports success when no endpoint is configured", async () => {
    const fetchImpl = vi.fn();
    await expect(submitEnquiry(valid, "", fetchImpl)).resolves.toEqual({
      status: "not-configured",
    });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("reports sent only for a successful response", async () => {
    const ok = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    await expect(submitEnquiry(valid, "https://forms.example/f", ok)).resolves.toEqual({
      status: "sent",
    });
    const body = JSON.parse(ok.mock.calls[0]![1].body as string);
    expect(body).not.toHaveProperty("website");
    expect(body.email).toBe(valid.email);
  });

  it("reports errors for failed responses and network failures", async () => {
    const bad = vi.fn().mockResolvedValue(new Response("", { status: 500 }));
    expect((await submitEnquiry(valid, "https://forms.example/f", bad)).status).toBe("error");
    const offline = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    expect((await submitEnquiry(valid, "https://forms.example/f", offline)).status).toBe("error");
  });
});
