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
        title="Book a consultation"
        intro="Let's plan your custom set together. Pick a time that works for you."
      />

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div>
          <h2 className="font-display text-4xl text-lacquer">How it works</h2>
          <ol className="mt-8 space-y-5 text-lg text-ink-soft">
            {business.bookingInfo.map((line, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-3xl italic leading-none text-lacquer/50">
                  {i + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="self-start rounded-[2rem] bg-lacquer p-10 text-on-main">
          {business.bookingUrl ? (
            <>
              <h2 className="font-display text-3xl">See open times</h2>
              <p className="mt-3 text-on-main/85">Booking opens on Square&apos;s secure page.</p>
              <ButtonLink
                href={business.bookingUrl}
                variant="light"
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
              <p className="mt-3 text-on-main/85">
                In the meantime, send a message and I&apos;ll find a time with you.
              </p>
              <ButtonLink href="/contact?topic=custom" variant="light" className="mt-8 w-full">
                Send a message
              </ButtonLink>
            </>
          )}
        </div>
      </section>
    </>
  );
}
