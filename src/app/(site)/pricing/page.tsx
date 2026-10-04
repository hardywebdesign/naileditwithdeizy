import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
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
      <PageIntro title="Pricing" intro={pricing.note || undefined} />

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="text-lg text-ink-soft">Sets start at</p>
          <p className="font-display text-8xl leading-none text-lacquer md:text-9xl">
            {pricing.startingPrice || "$20"}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/shop">Shop sets</ButtonLink>
            {business.tipUrl && (
              <ButtonLink href={business.tipUrl} variant="outline" target="_blank" rel="noopener">
                Leave a tip
              </ButtonLink>
            )}
          </div>
        </div>

        {pricing.kitIncludes.length > 0 && (
          <div className="rounded-[2rem] bg-blush p-8 md:p-10">
            <h2 className="font-display text-3xl text-lacquer">Every set includes</h2>
            <ul className="mt-6 grid gap-3 text-lg text-ink sm:grid-cols-2">
              {pricing.kitIncludes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-lacquer" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {catalog && catalog.products.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pb-20 md:pb-28">
          <h2 className="font-display text-4xl text-lacquer">Price list</h2>
          <table className="mt-8 w-full text-lg">
            <caption className="sr-only">Prices for each set</caption>
            <tbody className="divide-y divide-ink/10 border-y border-ink/10">
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
