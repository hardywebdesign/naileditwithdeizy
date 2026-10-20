"use server";

import { redirect } from "next/navigation";
import { createCheckoutUrl, findVariation, type OrderLine } from "@/lib/square";
import { getBusiness } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { MAX_LINES, MAX_QUANTITY } from "@/lib/bag-limits";

/**
 * "Check out": turns the shopping bag into one Square checkout and sends the
 * customer there. The bag comes from the browser, so every item is looked up
 * in Deizy's Square catalog again; only real items can be bought, and Square
 * always charges its own prices.
 */
export async function checkout(formData: FormData) {
  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    redirect("/bag?checkout=unavailable");
  }
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_LINES) {
    redirect("/bag?checkout=unavailable");
  }

  const lines: OrderLine[] = [];
  for (const entry of raw) {
    const variationId = String(entry?.variationId ?? "");
    const quantity = Number(entry?.quantity);
    if (!/^[A-Z0-9]{10,40}$/.test(variationId)) redirect("/bag?checkout=unavailable");
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      redirect("/bag?checkout=unavailable");
    }
    if (!(await findVariation(variationId))) redirect("/bag?checkout=unavailable");
    lines.push({ variationId, quantity });
  }

  const business = await getBusiness();

  let url: string;
  try {
    url = await createCheckoutUrl(lines, `${siteUrl()}/thank-you`, business.email);
  } catch (error) {
    console.error("[square] checkout failed:", error);
    redirect("/bag?checkout=unavailable");
  }
  redirect(url);
}
