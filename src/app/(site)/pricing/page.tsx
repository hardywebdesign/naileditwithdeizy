import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { SeasonMotif } from "@/components/Motif";
import { getBusiness, getPricing } from "@/lib/content";
import { formatPrice, getCatalog, priceRange } from "@/lib/square";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Press-on nail set prices, what's included with every set, and consultations.",
};

export const revalidate = 300;

export default async function PricingPage() {
  const [pricing, business, catalog] = await Promise.all([
    getPricing(),
    getBusiness(),
    getCatalog(),
  ]);

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
            <ButtonLink href="/shop" variant="deep">
              Shop sets
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

      {catalog && catalog.products.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pb-20 md:pb-28">
          <h2 className="text-center font-display text-4xl text-ink md:text-5xl">Price list</h2>
          <table className="mt-8 w-full text-lg">
            <caption className="sr-only">Prices for each set</caption>
            <tbody className="divide-y divide-accent/20 border-y border-accent/20">
              {catalog.products.map((p) => (
                <tr key={p.id}>
                  <th scope="row" className="py-4 pr-4 text-left font-normal text-ink">
                    {p.name}
                  </th>
                  <td className="py-4 text-right font-medium text-lacquer">
                    {priceRange(p.variations)}
                  </td>
                </tr>
              ))}
              {catalog.services.map((s) => (
                <tr key={s.id}>
                  <th scope="row" className="py-4 pr-4 text-left font-normal text-ink">
                    {s.name}
                    {s.durationMinutes ? (
                      <span className="text-ink-soft"> · {s.durationMinutes} min</span>
                    ) : null}
                  </th>
                  <td className="py-4 text-right font-medium text-lacquer">
                    {s.priceCents === 0 ? "Free" : formatPrice(s.priceCents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <CtaBand />
    </>
  );
}
