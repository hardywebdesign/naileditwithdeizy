import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Photo } from "@/components/Photo";
import { SetCard } from "@/components/SetCard";
import { Reviews } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";
import { Headline } from "@/components/Headline";
import { DriftingMotifs, Ornament, SeasonMotif } from "@/components/Motif";
import { getAbout, getGallery, getHome, getPricing, getServices } from "@/lib/content";

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

const promises = [
  "Hand-painted by Deizy",
  "Sized to your nails",
  "Glue and tabs included",
  "Shipping or local pickup",
  "Custom requests welcome",
  "Cash App Pay accepted",
];

export default async function Home() {
  const [home, services, gallery, pricing, about] = await Promise.all([
    getHome(),
    getServices(),
    getGallery(),
    getPricing(),
    getAbout(),
  ]);
  const [main, second, third] = home.heroPhotos.filter((p) => p.image);
  const featured = gallery.photos.filter((p) => p.featured && p.image).slice(0, 6);
  const startingPrice = pricing.startingPrice || "$20";

  return (
    <>
      {/* Hero */}
      <section className="candlelight relative overflow-hidden">
        <DriftingMotifs />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:pb-28 lg:pt-20">
          <div className="animate-rise text-center lg:text-left">
            <p className="eyebrow">Custom press-on nails</p>
            <h1 className="mt-6 font-display text-[3.1rem] leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[5.4rem]">
              <Headline text={home.headline} />
            </h1>
            {home.intro && (
              <p className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-ink-soft md:text-xl lg:mx-0">
                {home.intro}
              </p>
            )}
            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <ButtonLink href="/shop">Shop sets</ButtonLink>
              <ButtonLink href="/contact?topic=custom" variant="outline">
                Request a custom set
              </ButtonLink>
            </div>
            <dl className="mx-auto mt-12 grid max-w-md grid-cols-3 divide-x divide-accent/30 border-y border-accent/30 py-5 lg:mx-0">
              {[
                { term: "Sets from", value: startingPrice },
                { term: "Ready in", value: "A few days" },
                { term: "Painted", value: "By hand" },
              ].map((item) => (
                <div key={item.term} className="px-3 text-center">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                    {item.term}
                  </dt>
                  <dd className="mt-1 whitespace-nowrap font-display text-xl italic text-lacquer sm:text-2xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {main?.image && (
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="grid grid-cols-[1.4fr_1fr] items-end gap-4 sm:gap-6">
                <Photo
                  src={main.image}
                  alt={main.alt ?? ""}
                  aspect="aspect-[3/4]"
                  sizes="(min-width: 1024px) 32vw, 58vw"
                  priority
                  className="animate-rise shadow-[0_40px_80px_-40px_var(--color-lacquer)] ring-1 ring-accent/30 ring-offset-[6px] ring-offset-pearl"
                />
                <div className="grid gap-4 sm:gap-6">
                  {second?.image && (
                    <Photo
                      src={second.image}
                      alt={second.alt ?? ""}
                      aspect="aspect-[4/5]"
                      sizes="(min-width: 1024px) 22vw, 40vw"
                      priority
                      className="animate-rise ring-1 ring-accent/30 ring-offset-4 ring-offset-pearl [animation-delay:0.15s]"
                    />
                  )}
                  {third?.image && (
                    <Photo
                      src={third.image}
                      alt={third.alt ?? ""}
                      aspect="aspect-square"
                      shape="rounded"
                      sizes="(min-width: 1024px) 22vw, 40vw"
                      className="animate-rise ring-1 ring-accent/30 ring-offset-4 ring-offset-pearl [animation-delay:0.3s]"
                    />
                  )}
                </div>
              </div>

              {/* Turning seal over the corner of the main photo */}
              <div
                aria-hidden
                className="absolute -left-3 top-6 grid size-28 place-items-center rounded-full bg-pearl text-lacquer shadow-[0_12px_30px_-12px_var(--color-lacquer)] sm:-left-6 sm:size-32"
              >
                <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full p-1.5">
                  <defs>
                    <path id="seal" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
                  </defs>
                  <text className="fill-current text-[8.5px] font-semibold uppercase">
                    <textPath href="#seal" textLength="236" lengthAdjust="spacing">
                      Hand-painted · Made to fit · Sized for you ·
                    </textPath>
                  </text>
                </svg>
                <SeasonMotif className="size-7 text-accent" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ribbon of selling points */}
      <div className="overflow-hidden border-y border-accent/25 bg-lacquer py-4 text-on-main">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {promises.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-8 pr-8 font-display text-lg italic md:text-xl"
                >
                  {p}
                  <SeasonMotif className="size-3.5 opacity-70" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Featured sets */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow">New this season</p>
            <h2 className="mt-4 font-display text-4xl text-ink md:text-6xl">
              Fresh off the <em className="font-normal text-lacquer">table</em>
            </h2>
            <Ornament className="mt-6" />
            <p className="mt-6 max-w-lg text-lg text-ink-soft">
              Every set is hand-painted, one nail at a time. Sets start at {startingPrice}.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-10">
            {featured.map((p) => (
              <SetCard key={p.title} title={p.title} image={p.image} style={p.style} requestable />
            ))}
          </div>
          <div className="mt-16 text-center">
            <ButtonLink href="/gallery" variant="outline">
              See the full gallery
            </ButtonLink>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="relative bg-blush">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink md:text-6xl">
              Three ways to get <em className="font-normal text-lacquer">your nails done</em>
            </h2>
            <Ornament className="mt-6" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
            {services.items.map((s, i) => (
              <article
                key={s.name}
                className="group flex flex-col rounded-[2.25rem] border border-accent/20 bg-surface p-3 shadow-[0_30px_60px_-45px_var(--color-lacquer)]"
              >
                {s.photo && (
                  <Photo
                    src={s.photo}
                    alt={`${s.name} example`}
                    aspect="aspect-[5/4]"
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="[&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
                  />
                )}
                <div className="flex flex-1 flex-col px-5 pb-6 pt-7">
                  <p className="font-display text-sm italic text-accent">No. {i + 1}</p>
                  <h3 className="mt-1 font-display text-3xl text-ink">{s.name}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{s.summary}</p>
                  {s.buttonLink && (
                    <Link
                      href={s.buttonLink}
                      className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.16em] text-lacquer hover:text-lacquer-deep"
                    >
                      {s.buttonLabel || "Learn more"}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-6xl">
            Salon nails, <em className="font-normal text-lacquer">from home</em>
          </h2>
          <Ornament className="mt-6" />
        </div>
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          <span
            aria-hidden
            className="absolute left-[16.6%] right-[16.6%] top-10 hidden border-t border-dashed border-accent/50 md:block"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span className="grid size-20 place-items-center rounded-full border border-accent/40 bg-pearl font-display text-4xl italic text-lacquer shadow-[0_0_0_8px_var(--color-pearl)]">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl text-ink md:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-xs text-lg leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 text-center">
          <ButtonLink href="/sizing" variant="outline">
            See how sizing works
          </ButtonLink>
        </div>
      </section>

      {/* Meet Deizy */}
      <section className="border-t border-accent/20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-28">
          {about.photo && (
            <div className="relative mx-auto w-full max-w-sm">
              <div aria-hidden className="nail-arch absolute -inset-4 border border-accent/40" />
              <Photo
                src={about.photo}
                alt={about.photoAlt || ""}
                sizes="(min-width: 768px) 35vw, 90vw"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <p className="eyebrow">Meet the artist</p>
            <h2 className="mt-4 font-display text-4xl text-ink md:text-6xl">
              <Headline text={about.heading} />
            </h2>
            {about.intro && (
              <p className="mt-6 font-display text-2xl italic leading-snug text-lacquer">
                {about.intro}
              </p>
            )}
            {about.story[0] && (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{about.story[0]}</p>
            )}
            <div className="mt-9">
              <ButtonLink href="/about" variant="outline">
                Read my story
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      <CtaBand />
    </>
  );
}
