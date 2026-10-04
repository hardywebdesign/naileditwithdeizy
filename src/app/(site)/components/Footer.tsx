import Link from "next/link";
import { getBusiness } from "@/lib/content";
import { footerNav, nav } from "@/lib/site";

export async function Footer() {
  const business = await getBusiness();
  const year = new Date().getFullYear();
  const social = [
    { label: "TikTok", href: business.tiktok },
    { label: "Facebook", href: business.facebook },
    { label: "Instagram", href: business.instagram },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="bg-lacquer-deep text-on-deep">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl italic">{business.name}</p>
          {business.tagline && <p className="mt-3 max-w-xs text-on-deep/75">{business.tagline}</p>}
          <ul className="mt-6 space-y-1 text-on-deep/85">
            <li>
              <a href={`mailto:${business.email}`} className="hover:underline underline-offset-4">
                {business.email}
              </a>
            </li>
            {business.phone && (
              <li>
                <a
                  href={`tel:${business.phone.replace(/\D/g, "")}`}
                  className="hover:underline underline-offset-4"
                >
                  {business.phone}
                </a>
              </li>
            )}
          </ul>
          {business.tipUrl && (
            <a
              href={business.tipUrl}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex h-10 items-center rounded-full border border-on-deep/40 px-5 text-sm hover:bg-on-deep hover:text-lacquer-deep"
            >
              Leave a tip
            </a>
          )}
        </div>

        <nav aria-label="Shop and learn">
          <p className="text-sm text-on-deep/70">Explore</p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Help">
          <p className="text-sm text-on-deep/70">Help</p>
          <ul className="mt-3 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:underline underline-offset-4" rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-on-deep/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-on-deep/70 sm:flex-row sm:justify-between">
          <p>
            © {year} {business.name}
          </p>
          <p>
            Website by{" "}
            {/* TODO: link to Hardy Web Design once the business site is live */}
            <span className="text-on-deep/85">Hardy Web Design</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
