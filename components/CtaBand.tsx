import { ButtonLink } from "@/components/ButtonLink";
import { DriftingMotifs, SeasonMotif } from "@/components/Motif";

interface CtaBandProps {
  title?: string;
  text?: string;
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBand({
  title = "Ready for your next set?",
  text = "Shop a finished design, or tell me what you're dreaming of and I'll paint it just for you.",
}: CtaBandProps) {
  return (
    <section className="candlelight-deep relative overflow-hidden text-on-deep">
      <DriftingMotifs className="opacity-50" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center md:py-28">
        <SeasonMotif className="size-6 text-accent" />
        <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">{title}</h2>
        <p className="mt-5 max-w-xl text-lg text-on-deep/80">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" variant="deep">
            Shop sets
          </ButtonLink>
          <ButtonLink href="/contact?topic=custom" variant="outline-deep">
            Request a custom set
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
