import { ButtonLink } from "@/components/ButtonLink";

interface CtaBandProps {
  title?: string;
  text?: string;
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBand({
  title = "Ready for your next set?",
  text = "Shop a finished design, or tell me what you're dreaming of and I'll make it for you.",
}: CtaBandProps) {
  return (
    <section className="bg-lacquer text-on-main">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl leading-tight md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-on-main/80">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/shop" variant="light">
            Shop sets
          </ButtonLink>
          <ButtonLink
            href="/contact?topic=custom"
            variant="outline-light"
          >
            Request a custom set
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
