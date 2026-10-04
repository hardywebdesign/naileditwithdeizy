/** The site's public address, used for SEO, the sitemap and checkout returns. */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Sizing & care", href: "/sizing" },
];

export const footerNav = [
  { label: "FAQ", href: "/faq" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" },
  { label: "Book a consultation", href: "/book" },
];

/** Order the gallery sections appear in */
export const gallerySections = [
  "Spooky",
  "Fall",
  "Holiday",
  "Glam and chrome",
  "Soft and pretty",
  "Specialty",
];
