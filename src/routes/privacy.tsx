import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Beacon Arc" },
      {
        name: "description",
        content: "How Beacon Arc handles information shared through this website.",
      },
      { property: "og:title", content: "Privacy Policy — Beacon Arc" },
      {
        property: "og:description",
        content: "How information is handled on the Beacon Arc website.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});
function Privacy() {
  return (
    <>
      <PageIntro eyebrow="Information" title="Privacy policy">
        <p>
          A plain-language starting point for how this website handles information. This policy
          should be reviewed before launch with final business and service details.
        </p>
      </PageIntro>
      <article className="site-container max-w-3xl py-20">
        <Legal title="Information you provide">
          The enquiry form asks for your name, work email, company, project context, optional budget
          range, and preferred contact method. When you send the form, these details are delivered
          to the Beacon Arc team inbox (team.beaconarc@gmail.com) through FormSubmit, the form
          delivery service. They are used only to reply to your enquiry.
        </Legal>
        <Legal title="Browser preferences">
          If you turn the optional hero sound on or off, the site remembers that choice in this
          browser’s local storage under a single key. It is not sent anywhere, and clearing your
          site data removes it. Sound never starts without you pressing the sound control.
        </Legal>
        <Legal title="Analytics and third parties">
          No analytics or advertising trackers are configured on this site. The only third party
          that receives information you share is FormSubmit, which delivers enquiry form messages to
          the team inbox.
        </Legal>
        <Legal title="Your choices">
          You can use the website with sound off and without submitting information. For any privacy
          request — including deleting an enquiry you sent — email team.beaconarc@gmail.com.
        </Legal>
        <p className="mt-12 text-xs text-muted-foreground">
          Last updated: October 2026 · Draft pending final business and service details.
        </p>
      </article>
    </>
  );
}
function Legal({ title, children }: { title: string; children: string }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="font-display text-2xl font-medium">{title}</h2>
      <p className="mt-4 leading-7 text-muted-foreground">{children}</p>
    </section>
  );
}
