/** Price helpers shared by the server (Square) and the browser (shopping bag). */

export type ProductVariation = {
  id: string;
  name: string;
  /** Price in cents, or null for "price varies" */
  priceCents: number | null;
};

export function formatPrice(cents: number | null) {
  if (cents === null) return "Price varies";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** "$20" or "$20 – $35" across an item's variations */
export function priceRange(variations: ProductVariation[]) {
  const prices = variations.map((v) => v.priceCents).filter((c): c is number => c !== null);
  if (!prices.length) return "Price varies";
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  return lo === hi ? formatPrice(lo) : `${formatPrice(lo)} – ${formatPrice(hi)}`;
}
