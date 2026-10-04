import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { FaqList } from "@/components/FaqList";
import { getFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about prices, turnaround, sizing, shipping, pickup and payment.",
};

export default async function FaqPage() {
  const { questions } = await getFaq();
  return (
    <>
      <PageIntro eyebrow="FAQ" title="Questions" intro="The things people ask most about press-ons." />
      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <FaqList items={questions.map((q) => ({ q: q.question, a: q.answer }))} />
        <p className="mt-12 text-lg text-ink-soft">
          Still wondering about something?{" "}
          <Link
            href="/contact?topic=other"
            className="text-lacquer underline decoration-1 underline-offset-4"
          >
            Send me a message
          </Link>
          .
        </p>
      </section>
    </>
  );
}
