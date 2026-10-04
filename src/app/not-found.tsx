import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBusiness } from "@/lib/content";

export default async function NotFound() {
  const business = await getBusiness();
  return (
    <>
      <Header businessName={business.name} />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-5 py-28 text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 font-display text-6xl text-ink md:text-7xl">
            Page <em className="font-normal text-lacquer">not found</em>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            That link doesn&apos;t go anywhere. Try the shop, or head back{" "}
            <Link href="/" className="text-lacquer underline underline-offset-4">
              home
            </Link>
            .
          </p>
          <ButtonLink href="/shop" className="mt-10">
            Shop sets
          </ButtonLink>
        </section>
      </main>
      <Footer />
    </>
  );
}
