import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { Reviews } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";
import { SeasonMotif } from "@/components/Motif";
import { getAbout, getBusiness } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const business = await getBusiness();
  return { title: "About", description: `Meet the artist behind ${business.name}.` };
}

export default async function AboutPage() {
  const about = await getAbout();
  const [first, ...rest] = about.story;
  return (
    <>
      <PageIntro eyebrow="About" title={about.heading} intro={about.intro || undefined} />

      <section className="mx-auto grid max-w-6xl gap-16 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8 md:py-28">
        {about.photo && (
          <div className="relative mx-auto w-full max-w-sm">
            <div aria-hidden className="nail-arch absolute -inset-4 border border-accent/40" />
            <Photo
              src={about.photo}
              alt={about.photoAlt || ""}
              sizes="(min-width: 768px) 35vw, 90vw"
              priority
            />
            <div
              aria-hidden
              className="absolute -bottom-6 -right-4 grid size-20 place-items-center rounded-full bg-lacquer text-on-main shadow-[0_12px_30px_-12px_var(--color-lacquer)]"
            >
              <SeasonMotif className="size-7" />
            </div>
          </div>
        )}
        <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:text-xl">
          {first && (
            <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-lacquer">
              {first}
            </p>
          )}
          {rest.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="pt-2 font-display text-3xl italic text-lacquer">Deizy</p>
        </div>
      </section>

      <Reviews />
      <CtaBand />
    </>
  );
}
