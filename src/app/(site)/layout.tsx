import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { getBusiness } from "@/lib/content";

/** Header, footer and announcement bar for every public page. */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const business = await getBusiness();
  return (
    <>
      <a
        href="#main"
        className="
          sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
          focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-pearl
        "
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header businessName={business.name} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
