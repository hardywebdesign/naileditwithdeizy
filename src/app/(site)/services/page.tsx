import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
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
        title="Services"
        intro="Whether you know exactly what you want or you're still deciding, there's a set for you."
      />

      <div className="mx-auto max-w-6xl px-5">
        {items.map((s, i) => (
          <section
            key={s.name}
            className="grid gap-10 border-b border-ink/10 py-16 last:border-0 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-16 md:py-24"
          >
            {s.photo && (
              <Photo
                src={s.photo}
                alt={`${s.name} example`}
                className={`mx-auto w-full max-w-xs ${i % 2 ? "md:order-2" : ""}`}
                sizes="(min-width: 768px) 30vw, 80vw"
              />
            )}
            <div>
              <h2 className="font-display text-4xl text-lacquer md:text-5xl">{s.name}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {s.summary}
              </p>
              {s.details.length > 0 && (
                <ul className="mt-6 space-y-2 text-lg text-ink">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-lacquer" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {s.buttonLink && (
                <ButtonLink href={s.buttonLink} className="mt-8">
                  {s.buttonLabel || "Learn more"}
                </ButtonLink>
              )}
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
