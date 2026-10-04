import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getBusiness, getTheme } from "@/lib/content";
import { resolvePalette, themeVariables, type ThemeSetting } from "@/lib/theme";
import { siteUrl } from "@/lib/site";

// Fonts are self-hosted from npm (@fontsource-variable), so the site makes
// no requests to Google Fonts. Bodoni Moda's optical-size files sharpen
// automatically at large display sizes.
const bodoni = localFont({
  variable: "--font-bodoni",
  display: "swap",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-normal.woff2",
      style: "normal",
      weight: "400 900",
    },
    {
      path: "../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-italic.woff2",
      style: "italic",
      weight: "400 900",
    },
  ],
});

const figtree = localFont({
  variable: "--font-figtree",
  display: "swap",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
      style: "normal",
      weight: "300 900",
    },
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  const business = await getBusiness();
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: `${business.name} | Hand-painted press-on nails`,
      template: `%s | ${business.name}`,
    },
    description:
      business.tagline ||
      "Custom hand-painted press-on nails, sized to fit you. Shop sets, request a custom design or book a free consultation.",
    openGraph: {
      siteName: business.name,
      type: "website",
      locale: "en_US",
      images: ["/images/hero/hero-1.jpg"],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = await getTheme();
  const style = themeVariables(resolvePalette(theme.palette as ThemeSetting));

  return (
    <html
      lang="en"
      style={style}
      className={`${bodoni.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
