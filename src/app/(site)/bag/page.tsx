import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { BagContents } from "@/components/BagContents";

export const metadata: Metadata = {
  title: "Your bag",
  robots: { index: false },
};

export default async function BagPage({ searchParams }: PageProps<"/bag">) {
  const { checkout } = await searchParams;
  return (
    <>
      <PageIntro eyebrow="Almost yours" title="Your bag" />
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {checkout === "unavailable" && (
          <p role="alert" className="mb-8 rounded-2xl bg-blush px-5 py-4 text-ink">
            Something in your bag can&apos;t be checked out right now. It may have sold out or
            changed. Remove it and try again, or{" "}
            <a href="/contact?topic=order" className="font-semibold text-lacquer underline">
              send me a message
            </a>{" "}
            and I&apos;ll set up your order.
          </p>
        )}
        <BagContents />
      </section>
    </>
  );
}
