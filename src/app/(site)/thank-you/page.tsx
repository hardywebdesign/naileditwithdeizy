import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

/** Where Square sends customers after they pay. */
export default function ThankYouPage() {
  return (
    <section className="candlelight mx-auto max-w-none px-5 py-28 text-center">
      <p className="eyebrow">Order received</p>
      <h1 className="mt-4 font-display text-5xl text-ink md:text-7xl">
        Thank you, <em className="font-normal text-lacquer">truly.</em>
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
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
