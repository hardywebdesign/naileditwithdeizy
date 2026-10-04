interface FaqListProps {
  items: { q: string; a: string }[];
}

/** Accessible FAQ built on native <details>, no JavaScript needed. */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl text-ink marker:hidden">
            {item.q}
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-lacquer text-lacquer transition-transform group-open:rotate-45"
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
