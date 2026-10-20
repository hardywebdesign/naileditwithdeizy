import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ask about an order, get help with sizing, or ask any question about press-on nails.",
};

const validTopics = ["order", "sizing", "other"];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  const defaultTopic =
    typeof topic === "string" && validTopics.includes(topic) ? topic : "other";

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let's talk nails"
        intro="Questions about an order, help with sizing, or anything else? Send me a message and I'll reply by email."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[2fr_1fr] md:px-8 md:py-24">
        <div className="rounded-[2.5rem] border border-accent/25 bg-surface p-7 shadow-[0_30px_60px_-45px_var(--color-lacquer)] md:p-12">
          <ContactForm defaultTopic={defaultTopic} />
        </div>
        <aside className="self-start rounded-[2.5rem] bg-blush p-8 md:p-10">
          <h2 className="font-display text-2xl text-ink">Planning a custom set?</h2>
          <p className="mt-3 text-ink-soft">
            Book a free 15-minute consultation by Zoom or phone, and we&apos;ll plan it together.
          </p>
          <ButtonLink href="/book" size="sm" className="mt-5">
            Book a consultation
          </ButtonLink>
          <h2 className="mt-8 border-t border-accent/30 pt-8 font-display text-2xl text-ink">Sending sizing photos?</h2>
          <p className="mt-3 text-ink-soft">
            Send me a message and I&apos;ll reply by email. Then just reply with photos of each hand
            flat on a table, plus each thumb next to a quarter. The Sizing page shows how.
          </p>
        </aside>
      </section>
    </>
  );
}
