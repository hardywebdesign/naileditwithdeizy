import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages rendered per visit (Book, Contact, Admin) read Deizy's text from
  // content/ while running, so ship those files with every server function.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  // The editor lives at /admin (patches/@keystatic+core moves Keystatic's
  // routes there). Old /keystatic links, including the Keystatic Cloud
  // sign-in callback, are sent to the same place under /admin.
  async redirects() {
    return [
      { source: "/keystatic", destination: "/admin", permanent: false },
      { source: "/keystatic/:path*", destination: "/admin/:path*", permanent: false },
      // Keystatic Cloud only accepts sign-ins from the site's real address, so
      // the editor on the old preview address goes to the www domain instead.
      ...["/admin", "/admin/:path*"].map((source) => ({
        source,
        has: [{ type: "host" as const, value: "naileditwithdeizy-yy9p.vercel.app" }],
        destination: `https://www.naileditwithdeizy.com${source}`,
        permanent: false,
      })),
      // The shop was replaced by the gallery (sets are requested by booking a
      // consultation), so old shop links land there.
      { source: "/shop", destination: "/gallery", permanent: true },
      { source: "/bag", destination: "/gallery", permanent: true },
      { source: "/thank-you", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
