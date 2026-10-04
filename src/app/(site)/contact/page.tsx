import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";
import { getBusiness } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a custom press-on set, send sizing photos or ask a question.",
};

const validTopics = ["custom", "order", "sizing", "other"];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const [{ topic, set }, business] = await Promise.all([searchParams, getBusiness()]);
  const defaultTopic =
    typeof topic === "string" && validTopics.includes(topic) ? topic : "custom";
  const setName = typeof set === "string" ? set.slice(0, 80) : "";
  const defaultMessage = setName ? `I'd like the ${setName} set. ` : "";

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let's talk nails"
        intro="Request a custom set, order a design from the gallery or get help with sizing. I'll reply by email."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[2fr_1fr] md:px-8 md:py-24">
        <div className="rounded-[2.5rem] border border-accent/25 bg-surface p-7 shadow-[0_30px_60px_-45px_var(--color-lacquer)] md:p-12">
          <ContactForm defaultTopic={defaultTopic} defaultMessage={defaultMessage} />
        </div>
        <aside className="self-start rounded-[2.5rem] bg-blush p-8 md:p-10">
          <h2 className="font-display text-2xl text-ink">Prefer email?</h2>
          <p className="mt-3 text-ink-soft">
            <a
              href={`mailto:${business.email}`}
              className="break-all text-ink underline decoration-1 underline-offset-4"
            >
              {business.email}
            </a>
          </p>
          <h2 className="mt-8 border-t border-accent/30 pt-8 font-display text-2xl text-ink">Sending sizing photos?</h2>
          <p className="mt-3 text-ink-soft">
            Email me photos of each hand flat on a table, plus each thumb next to a quarter. The
            Sizing page shows how.
          </p>
        </aside>
      </section>
    </>
  );
}
