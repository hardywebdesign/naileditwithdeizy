interface PageIntroProps {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}

/** Heading block used at the top of every inner page. */
export function PageIntro({ title, intro, children }: PageIntroProps) {
  return (
    <section className="border-b border-ink/10 bg-blush/60">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:pb-20 md:pt-24">
        <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-lacquer md:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {intro}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
