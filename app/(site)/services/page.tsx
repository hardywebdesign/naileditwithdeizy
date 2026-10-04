import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { SeasonMotif } from "@/components/Motif";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom hand-painted press-on sets, ready-made designs and sizing kits, all made to fit your nails.",
};

export default async function ServicesPage() {
  const { items } = await getServices();
  return (
    <>
      <PageIntro
        eyebrow="What I offer"
        title="Services"
        intro="Whether you know exactly what you want or you're still deciding, there's a set for you."
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {items.map((s, i) => (
          <section
            key={s.name}
            className="grid gap-12 border-b border-accent/20 py-20 last:border-0 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-20 md:py-28"
          >
            {s.photo && (
              <div className={`relative mx-auto w-full max-w-xs ${i % 2 ? "md:order-2" : ""}`}>
                <div aria-hidden className="nail-arch absolute -inset-3 border border-accent/40" />
                <Photo src={s.photo} alt={`${s.name} example`} sizes="(min-width: 768px) 30vw, 80vw" />
              </div>
            )}
            <div className="text-center md:text-left">
              <p className="font-display text-lg italic text-accent">No. {i + 1}</p>
              <h2 className="mt-2 font-display text-4xl text-ink md:text-6xl">{s.name}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {s.summary}
              </p>
              {s.details.length > 0 && (
                <ul className="mt-8 inline-grid gap-3 text-left text-lg text-ink">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-3">
                      <SeasonMotif className="size-3.5 shrink-0 text-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {s.buttonLink && (
                <div className="mt-10">
                  <ButtonLink href={s.buttonLink}>{s.buttonLabel || "Learn more"}</ButtonLink>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
