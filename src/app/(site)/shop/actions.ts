"use server";

import { redirect } from "next/navigation";
import { createCheckoutUrl, findVariation } from "@/lib/square";
import { getBusiness } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/**
 * "Buy now": creates a Square checkout for the chosen size or style and
 * sends the customer there. Only variations that exist in Deizy's Square
 * catalog can be bought, so prices always come from Square.
 */
export async function buyNow(formData: FormData) {
  const variationId = String(formData.get("variationId") ?? "");
  if (!/^[A-Z0-9]{10,40}$/.test(variationId)) redirect("/shop?checkout=unavailable");

  const match = await findVariation(variationId);
  if (!match) redirect("/shop?checkout=unavailable");

  const business = await getBusiness();

  let url: string;
  try {
    url = await createCheckoutUrl(variationId, `${siteUrl()}/thank-you`, business.email);
  } catch (error) {
    console.error("[square] checkout failed:", error);
    redirect("/shop?checkout=unavailable");
  }
  redirect(url);
}
