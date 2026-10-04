import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

/** Where Square sends customers after they pay. */
export default function ThankYouPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28 text-center">
      <h1 className="font-display text-5xl text-lacquer md:text-6xl">Thank you!</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Your order is in. Square will email your receipt, and I&apos;ll reach out about your
        sizes and when your set will be ready.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/sizing">Sizing tips</ButtonLink>
        <ButtonLink href="/gallery" variant="outline">
          Browse more sets
        </ButtonLink>
      </div>
    </section>
  );
}
