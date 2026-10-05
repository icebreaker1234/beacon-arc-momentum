/**
 * Editable business details. Leave a value empty ("") until it is real —
 * empty values are hidden on the site rather than shown as fake details.
 */
export const site: {
  name: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
} = {
  name: "Beacon Arc",
  /** Public enquiry email. */
  contactEmail: "team.beaconarc@gmail.com",
  /** Public phone number in international format, e.g. "+44 20 0000 0000". */
  contactPhone: "",
  /** Where you are based, if you want to say, e.g. "Remote-first · UK". */
  location: "",
};

/**
 * Form delivery endpoint. Enquiries are delivered to the team inbox via
 * FormSubmit's JSON endpoint. Override with VITE_CONTACT_ENDPOINT if the
 * delivery service ever changes.
 */
export const contactEndpoint: string = (
  import.meta.env.VITE_CONTACT_ENDPOINT ?? "https://formsubmit.co/ajax/team.beaconarc@gmail.com"
).trim();

export const budgetOptions = [
  { value: "exploring", label: "Still exploring" },
  { value: "small", label: "Small first project" },
  { value: "medium", label: "Defined project with a budget" },
  { value: "ongoing", label: "Ongoing support or roadmap" },
] as const;

export const contactMethods = [
  { value: "email", label: "Email" },
  { value: "video", label: "Video call" },
  { value: "phone", label: "Phone" },
] as const;
