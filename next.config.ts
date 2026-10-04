import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos uploaded to Square are served from these hosts.
    remotePatterns: [
      { protocol: "https", hostname: "items-images-production.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com" },
    ],
  },
  // The editor lives at /admin (patches/@keystatic+core moves Keystatic's
  // routes there). Old /keystatic links, including the Keystatic Cloud
  // sign-in callback, are sent to the same place under /admin.
  async redirects() {
    return [
      { source: "/keystatic", destination: "/admin", permanent: false },
      { source: "/keystatic/:path*", destination: "/admin/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
