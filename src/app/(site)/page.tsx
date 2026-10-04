import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Photo } from "@/components/Photo";
import { SetCard } from "@/components/SetCard";
import { Reviews } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";
import { getGallery, getHome, getPricing, getServices } from "@/lib/content";

const steps = [
  {
    title: "Choose your look",
    text: "Pick a finished set, or send me a photo or idea for a custom design.",
  },
  {
    title: "Send your sizes",
    text: "Send a few photos of your hands with a quarter, and I'll measure for you.",
  },
  {
    title: "Press on and go",
    text: "Your set comes with glue, tabs, a file and everything you need to apply it.",
  },
];

export default async function Home() {
  const [home, services, gallery, pricing] = await Promise.all([
    getHome(),
    getServices(),
    getGallery(),
    getPricing(),
  ]);
  const [main, second, third] = home.heroPhotos.filter((p) => p.image);
  const featured = gallery.photos.filter((p) => p.featured && p.image).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-lacquer text-on-main">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[1fr_1.05fr] md:pb-24 md:pt-20">
          <div className="animate-rise">
            <h1 className="font-display text-[3.2rem] leading-[0.98] tracking-tight sm:text-7xl lg:text-[4.6rem]">
              {home.headline}
            </h1>
            {home.intro && (
              <p className="mt-7 max-w-md text-lg leading-relaxed text-on-main/85 md:text-xl">
                {home.intro}
              </p>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/shop" variant="light">
                Shop sets
              </ButtonLink>
              <ButtonLink href="/contact?topic=custom" variant="outline-light">
                Request a custom set
              </ButtonLink>
            </div>
          </div>

          {main?.image && (
            <div className="relative grid grid-cols-[1.35fr_1fr] gap-4 sm:gap-5">
              <Photo
                src={main.image}
                alt={main.alt ?? ""}
                aspect={second?.image ? "min-h-80" : "aspect-[3/4]"}
                sizes="(min-width: 768px) 30vw, 60vw"
                priority
                className="animate-rise row-span-2 h-full ring-1 ring-on-main/20"
              />
              {second?.image && (
                <Photo
                  src={second.image}
                  alt={second.alt ?? ""}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 20vw, 40vw"
                  priority
                  className="animate-rise ring-1 ring-on-main/20 [animation-delay:0.15s]"
                />
              )}
              {third?.image && (
                <Photo
                  src={third.image}
                  alt={third.alt ?? ""}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 20vw, 40vw"
                  className="animate-rise ring-1 ring-on-main/20 [animation-delay:0.3s]"
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured sets */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl text-lacquer md:text-5xl">Fresh off the table</h2>
              <p className="mt-3 text-lg text-ink-soft">
                Every set is hand-painted. Sets start at {pricing.startingPrice || "$20"}.
              </p>
            </div>
            <Link
              href="/gallery"
              className="font-medium text-lacquer underline decoration-1 underline-offset-4"
            >
              See the full gallery
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8">
            {featured.map((p) => (
              <SetCard key={p.title} title={p.title} image={p.image} style={p.style} requestable />
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-lacquer md:text-5xl">
            Three ways to get your nails done
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {services.items.map((s) => (
              <article key={s.name} className="flex flex-col">
                <h3 className="font-display text-3xl text-ink">{s.name}</h3>
                <p className="mt-3 flex-1 text-lg leading-relaxed text-ink-soft">{s.summary}</p>
                {s.buttonLink && (
                  <Link
                    href={s.buttonLink}
                    className="mt-5 self-start font-medium text-lacquer underline decoration-1 underline-offset-4 hover:text-lacquer-deep"
                  >
                    {s.buttonLabel || "Learn more"}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h2 className="font-display text-4xl text-lacquer md:text-5xl">How it works</h2>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="font-display text-6xl italic text-lacquer/40">{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <ButtonLink href="/sizing" variant="outline">
            See how sizing works
          </ButtonLink>
        </div>
      </section>

      <div className="border-t border-ink/10">
        <Reviews />
      </div>

      <CtaBand />
    </>
  );
}
