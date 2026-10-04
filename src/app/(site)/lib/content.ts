import "server-only";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

/**
 * Reads the content Deizy edits in /keystatic (YAML files in /content).
 * Each getter is cached per request so pages and layouts can call them freely.
 */
const reader = createReader(process.cwd(), keystaticConfig);

function required<T>(value: T | null, name: string): T {
  if (!value) throw new Error(`Missing content file: content/${name}.yaml`);
  return value;
}

export const getTheme = cache(async () => required(await reader.singletons.theme.read(), "theme"));
export const getHome = cache(async () => required(await reader.singletons.home.read(), "home"));
export const getGallery = cache(async () => required(await reader.singletons.gallery.read(), "gallery"));
export const getAbout = cache(async () => required(await reader.singletons.about.read(), "about"));
export const getServices = cache(async () => required(await reader.singletons.services.read(), "services"));
export const getPricing = cache(async () => required(await reader.singletons.pricing.read(), "pricing"));
export const getSizing = cache(async () => required(await reader.singletons.sizing.read(), "sizing"));
export const getFaq = cache(async () => required(await reader.singletons.faq.read(), "faq"));
export const getPolicies = cache(async () => required(await reader.singletons.policies.read(), "policies"));
export const getReviews = cache(async () => required(await reader.singletons.reviews.read(), "reviews"));
export const getBusiness = cache(async () => required(await reader.singletons.business.read(), "business"));

export type Business = Awaited<ReturnType<typeof getBusiness>>;
export type GalleryPhoto = Awaited<ReturnType<typeof getGallery>>["photos"][number];
