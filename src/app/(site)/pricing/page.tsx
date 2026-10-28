import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { SeasonMotif } from "@/components/Motif";
import { getBusiness, getPricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Press-on nail set prices and what's included with every set.",
};

export default async function PricingPage() {
  const [pricing, business] = await Promise.all([getPricing(), getBusiness()]);

  return (
    <>
      <PageIntro eyebrow="Pricing" title="Simple, honest prices" intro={pricing.note || undefined} />

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-28">
        <div className="candlelight-deep relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-on-deep">
          <SeasonMotif className="size-6 text-accent" />
          <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-on-deep/70">
            Sets start at
          </p>
          <p className="mt-2 font-display text-8xl leading-none md:text-9xl">
            {pricing.startingPrice || "$20"}
          </p>
          <p className="mt-4 font-display text-xl italic text-on-deep/80">hand-painted, made to fit</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/gallery" variant="deep">
              Browse sets
            </ButtonLink>
            {business.tipUrl && (
              <ButtonLink href={business.tipUrl} variant="outline-deep" target="_blank" rel="noopener">
                Leave a tip
              </ButtonLink>
            )}
          </div>
        </div>

        {pricing.kitIncludes.length > 0 && (
          <div className="rounded-[2.5rem] border border-accent/25 bg-surface p-8 md:p-12">
            <p className="eyebrow">In the box</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Every set includes</h2>
            <ul className="mt-8 grid gap-x-6 gap-y-4 text-lg text-ink sm:grid-cols-2">
              {pricing.kitIncludes.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-accent/15 pb-4">
                  <SeasonMotif className="size-3.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <CtaBand />
    </>
  );
}
