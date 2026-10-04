import { Headline } from "@/components/Headline";
import { DriftingMotifs, Ornament } from "@/components/Motif";

interface PageIntroProps {
  title: string;
  intro?: string;
  /** Small label above the title */
  eyebrow?: string;
  children?: React.ReactNode;
}

/** Heading block used at the top of every inner page. */
export function PageIntro({ title, intro, eyebrow, children }: PageIntroProps) {
  return (
    <section className="candlelight relative overflow-hidden border-b border-accent/20">
      <DriftingMotifs className="opacity-60" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-16 text-center md:pb-24 md:pt-24">
        {eyebrow && <p className="eyebrow animate-rise mb-5">{eyebrow}</p>}
        <h1 className="animate-rise font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
          <Headline text={title} />
        </h1>
        <Ornament className="mt-7" />
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {intro}
          </p>
        )}
        {children && <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
