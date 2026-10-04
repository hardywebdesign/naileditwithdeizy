interface FaqListProps {
  items: { q: string; a: string }[];
}

/** Accessible FAQ built on native <details>, no JavaScript needed. */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-[1.75rem] border border-accent/20 bg-surface px-6 py-5 transition-shadow open:shadow-[0_20px_50px_-35px_var(--color-lacquer)] md:px-8 md:py-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink marker:hidden md:text-2xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/50 text-lacquer transition-all group-open:rotate-45 group-open:bg-lacquer group-open:text-on-main"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
