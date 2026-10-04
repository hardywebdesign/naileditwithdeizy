import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
import { Reviews } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";
import { getAbout, getBusiness } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const business = await getBusiness();
  return { title: "About", description: `Meet the artist behind ${business.name}.` };
}

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <>
      <PageIntro title={about.heading} intro={about.intro || undefined} />

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-[1fr_1.3fr] md:items-center md:py-28">
        {about.photo && (
          <Photo
            src={about.photo}
            alt={about.photoAlt || ""}
            className="mx-auto w-full max-w-sm"
            sizes="(min-width: 768px) 35vw, 90vw"
          />
        )}
        <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:text-xl">
          {about.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <div className="border-t border-ink/10">
        <Reviews />
      </div>
      <CtaBand />
    </>
  );
}
