import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { getBusiness } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a consultation",
  description: "Book a free 15-minute consultation by video, text or phone to plan your custom set.",
};

export default async function BookPage() {
  const business = await getBusiness();

  return (
    <>
      <PageIntro
        eyebrow="Free · 15 minutes"
        title="Book a consultation"
        intro="Let's plan your custom set together. Pick a time that works for you."
      />

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-28">
        <div>
          <p className="eyebrow">What to expect</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">How it works</h2>
          <ol className="mt-10 space-y-6 text-lg text-ink-soft">
            {business.bookingInfo.map((line, i) => (
              <li key={i} className="flex items-center gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/40 font-display text-2xl italic text-lacquer">
                  {i + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="candlelight-deep overflow-hidden rounded-[2.5rem] p-10 text-center text-on-deep md:p-12">
          {business.bookingUrl ? (
            <>
              <h2 className="font-display text-3xl">See open times</h2>
              <p className="mt-3 text-on-deep/80">Booking opens on Square&apos;s secure page.</p>
              <ButtonLink
                href={business.bookingUrl}
                variant="deep"
                target="_blank"
                rel="noopener"
                className="mt-8 w-full"
              >
                Book now
              </ButtonLink>
            </>
          ) : (
            <>
              <h2 className="font-display text-3xl">Online booking opens soon</h2>
              <p className="mt-3 text-on-deep/80">
                In the meantime, send a message and I&apos;ll find a time with you.
              </p>
              <ButtonLink href="/contact?topic=custom" variant="deep" className="mt-8 w-full">
                Send a message
              </ButtonLink>
            </>
          )}
        </div>
      </section>
    </>
  );
}
