import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = [
  "",
  "/shop",
  "/services",
  "/pricing",
  "/gallery",
  "/about",
  "/book",
  "/sizing",
  "/faq",
  "/contact",
  "/policies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl()}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
