import { getReviews } from "@/lib/content";
import { Ornament } from "@/components/Motif";

/** Customer reviews, edited at /admin under Pages > Reviews. */
export async function Reviews({ title = "Kind words from clients" }: { title?: string }) {
  const { items } = await getReviews();
  if (!items.length) return null;
  return (
    <section className="bg-blush/50">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">{title}</h2>
          <Ornament className="mt-6" />
        </div>
        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:gap-8">
          {items.map((r, i) => (
            <figure
              key={i}
              className="mb-6 break-inside-avoid rounded-[2rem] border border-accent/20 bg-surface p-8 shadow-[0_20px_50px_-35px_var(--color-lacquer)] md:p-10 lg:mb-8"
            >
              <p className="tracking-[0.2em] text-accent">
                <span aria-hidden>★★★★★</span>
                <span className="sr-only">5 out of 5 stars</span>
              </p>
              <blockquote className="mt-4 font-display text-xl leading-snug text-ink md:text-[1.6rem]">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
                <span aria-hidden className="h-px w-8 bg-accent" />
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
