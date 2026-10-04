import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { SetCard } from "@/components/SetCard";
import { CtaBand } from "@/components/CtaBand";
import { Ornament } from "@/components/Motif";
import { getGallery } from "@/lib/content";
import { gallerySections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Hand-painted press-on nail sets: spooky, fall, chrome, soft and specialty designs.",
};

export default async function GalleryPage() {
  const { photos } = await getGallery();
  const withImages = photos.filter((p) => p.image);
  const sections = [
    ...gallerySections,
    ...new Set(withImages.map((p) => p.style).filter((s) => !gallerySections.includes(s))),
  ].filter((section) => withImages.some((p) => p.style === section));

  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Gallery"
        intro="Recent sets, all painted by hand. See something you love? Request it in your size, or ask for it in your colors."
      >
        <nav aria-label="Gallery sections" className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-accent/40 bg-surface/60 px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-lacquer hover:bg-lacquer hover:text-on-main"
            >
              {s}
            </a>
          ))}
        </nav>
      </PageIntro>

      {sections.map((section, si) => (
        <section
          key={section}
          id={section.toLowerCase().replace(/\s+/g, "-")}
          className="mx-auto max-w-7xl scroll-mt-28 border-b border-accent/20 px-5 py-16 last:border-0 md:px-8 md:py-24"
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="font-display text-4xl text-ink md:text-5xl">{section}</h2>
            <Ornament className="mt-5" />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {withImages
              .filter((p) => p.style === section)
              .map((p, i) => (
                <SetCard
                  key={p.title}
                  title={p.title}
                  image={p.image}
                  requestable
                  priority={si === 0 && i < 4}
                />
              ))}
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
