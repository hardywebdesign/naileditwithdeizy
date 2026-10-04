import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { getSizing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sizing & care",
  description:
    "How to size press-on nails with a few photos or a ruler, plus how to apply, remove and reuse them.",
};

export default async function SizingPage() {
  const sizing = await getSizing();

  return (
    <>
      <PageIntro eyebrow="Fit guide" title="Sizing & care" intro={sizing.intro || undefined}>
        {sizing.guidePdf && (
          <ButtonLink href={sizing.guidePdf} download>
            Download the sizing guide (PDF)
          </ButtonLink>
        )}
        <ButtonLink href="/contact?topic=sizing" variant="outline">
          Send me your photos
        </ButtonLink>
      </PageIntro>

      {(sizing.shapes.length > 0 || sizing.lengths.length > 0) && (
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 sm:grid-cols-2 md:pt-20">
          {[
            { title: "Shapes", items: sizing.shapes },
            { title: "Lengths", items: sizing.lengths },
          ].map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-3xl text-ink">{group.title}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-accent/40 bg-surface px-5 py-2 text-lg text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <div className="mx-auto max-w-6xl px-5">
        {sizing.sections.map((s, si) => (
          <section
            key={s.title}
            className="grid gap-8 border-b border-accent/20 py-16 last:border-0 md:grid-cols-[1fr_2fr] md:py-20"
          >
            <h2 className="font-display text-4xl text-ink">{s.title}</h2>
            <div>
              <ol className="space-y-5">
                {s.steps.map((step, i) => (
                  <li key={i} className="flex gap-5 text-lg leading-relaxed text-ink-soft">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/40 font-display text-xl italic text-lacquer">
                      {i + 1}
                    </span>
                    <span className="pt-1.5">{step}</span>
                  </li>
                ))}
              </ol>
              {si === 0 && sizing.guideImage && (
                <figure className="mt-10">
                  <Image
                    src={sizing.guideImage}
                    alt="Photo sizing guide: photos of each hand and each thumb next to a quarter, good and bad examples, and the shapes and lengths to choose from"
                    width={1024}
                    height={1536}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="w-full max-w-lg rounded-[1.5rem] border border-accent/20"
                  />
                </figure>
              )}
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
