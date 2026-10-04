import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { SquareProductCard } from "@/components/SquareProductCard";
import { SetCard } from "@/components/SetCard";
import { getCatalog } from "@/lib/square";
import { getGallery, getPricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop hand-painted press-on nail sets and sizing kits. Pay with card, Cash App Pay, Apple Pay or Google Pay.",
};

// Products come from Square; refresh the page at most every 5 minutes.
export const revalidate = 300;

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const [{ checkout }, catalog, gallery, pricing] = await Promise.all([
    searchParams,
    getCatalog(),
    getGallery(),
    getPricing(),
  ]);
  const products = catalog?.products ?? [];
  const categories = [...new Set(products.map((p) => p.category ?? "Sets"))];

  return (
    <>
      <PageIntro
        title="Shop"
        intro={`Hand-painted sets, starting at ${pricing.startingPrice || "$20"}. Checkout accepts cards, Cash App Pay, Apple Pay and Google Pay.`}
      />

      {checkout === "unavailable" && (
        <p
          role="alert"
          className="mx-auto mt-10 max-w-6xl rounded-2xl bg-blush px-5 py-4 text-ink"
        >
          Checkout isn&apos;t available for that item right now. Send me a message and I&apos;ll
          set up your order.
        </p>
      )}

      {products.length > 0 ? (
        categories.map((category) => (
          <section key={category} className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            {categories.length > 1 && (
              <h2 className="mb-10 font-display text-3xl text-lacquer md:text-4xl">{category}</h2>
            )}
            <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {products
                .filter((p) => (p.category ?? "Sets") === category)
                .map((p) => (
                  <SquareProductCard key={p.id} product={p} />
                ))}
            </div>
          </section>
        ))
      ) : (
        // Until Square is connected, show her designs with a request link.
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="font-display text-3xl text-lacquer md:text-4xl">Order a set</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">
            Pick a design and send me a request. I&apos;ll confirm your size and send you a
            secure Square link to pay.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {gallery.photos
              .filter((p) => p.image)
              .map((p, i) => (
                <SetCard
                  key={p.title}
                  title={p.title}
                  image={p.image}
                  style={p.style}
                  requestable
                  priority={i < 4}
                />
              ))}
          </div>
        </section>
      )}

      <section className="bg-blush">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-lacquer md:text-4xl">
              Want something one of a kind?
            </h2>
            <p className="mt-3 text-lg text-ink-soft">
              Send me a photo or an idea and I&apos;ll paint a custom set just for you.
            </p>
          </div>
          <ButtonLink href="/contact?topic=custom">Request a custom set</ButtonLink>
        </div>
      </section>
    </>
  );
}
