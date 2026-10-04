import { getReviews } from "@/lib/content";

/** Customer reviews, edited in the editor under Pages > Reviews. */
export async function Reviews({ title = "What customers say" }: { title?: string }) {
  const { items } = await getReviews();
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h2 className="font-display text-4xl text-lacquer md:text-5xl">{title}</h2>
      <div className="mt-12 grid gap-10 items-start md:grid-cols-2 md:gap-x-12 md:gap-y-14">
        {items.map((r, i) => (
          <figure key={i} className="border-l-2 border-lacquer pl-6">
            <p className="text-lacquer">
              <span aria-hidden>★★★★★</span>
              <span className="sr-only">5 out of 5 stars</span>
            </p>
            <blockquote className="mt-3 font-display text-xl leading-snug text-ink md:text-2xl">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-soft">{r.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
