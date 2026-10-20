import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { getBusiness } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a consultation",
  description: "Book a free 15-minute consultation by Zoom or phone to plan your custom set.",
};

/**
 * Calendly links are shown as a calendar right on the page, so customers
 * pick a time without leaving the site. Any other booking link (Square,
 * etc.) gets a "Book now" button instead.
 */
function calendlyEmbedUrl(link: string) {
  try {
    const url = new URL(link);;
    if (!/(^|\.)calendly\.com$/.test(url.hostname)) return null;
    url.searchParams.set("hide_gdpr_banner", "1");
    return url.toString();
  } catch {
    return null;
  }
}

export default async function BookPage() {
  const business = await getBusiness();
  const bookingUrl = business.bookingUrl;
  const embedUrl = bookingUrl ? calendlyEmbedUrl(bookingUrl) : null;

  return (
    <>
      <PageIntro
        eyebrow="Free · 15 minutes"
        title="Book a consultation"
        intro="Let's plan your custom set together. Pick a time that works for you."
      />

      {business.bookingInfo.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-24">
          <ol className="grid gap-8 md:grid-cols-3">
            {business.bookingInfo.map((line, i) => (
              <li key={i} className="flex items-center gap-5 text-lg text-ink-soft">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/40 font-display text-2xl italic text-lacquer">
                  {i + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {embedUrl ? (
          <div className="overflow-hidden rounded-[2.5rem] border border-accent/25 bg-surface shadow-[0_30px_60px_-45px_var(--color-lacquer)]">
            <iframe
              src={embedUrl}
              title="Pick a time for your consultation"
              loading="lazy"
              className="block h-[1100px] w-full md:h-[760px]"
            />
            <p className="border-t border-accent/20 px-6 py-4 text-center text-sm text-ink-soft">
              Calendar not loading?{" "}
              <a
                href={bookingUrl!}
                target="_blank"
                rel="noopener"
                className="font-semibold text-lacquer underline underline-offset-4"
              >
                Open it in a new tab
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="candlelight-deep mx-auto max-w-xl overflow-hidden rounded-[2.5rem] p-10 text-center text-on-deep md:p-12">
            {bookingUrl ? (
              <>
                <h2 className="font-display text-3xl">See open times</h2>
                <p className="mt-3 text-on-deep/80">Booking opens on a secure page.</p>
                <ButtonLink
                  href={bookingUrl}
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
        )}
      </section>
    </>
  );
}
