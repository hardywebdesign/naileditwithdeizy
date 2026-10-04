import "server-only";

/**
 * Square integration: reads Deizy's catalog (products, photos, prices) and
 * creates checkout links. Deizy manages everything in her Square Dashboard;
 * the site picks up changes within a few minutes.
 *
 * Environment variables (Vercel > Project > Settings > Environment Variables):
 *   SQUARE_ACCESS_TOKEN   production access token from Deizy's Square developer app
 *   SQUARE_LOCATION_ID    optional; the first active location is used if unset
 *   SQUARE_ENVIRONMENT    "production" (default) or "sandbox" for testing
 */

const SQUARE_VERSION = "2026-09-16";

export type ProductVariation = {
  id: string;
  name: string;
  /** Price in cents, or null for "price varies" */
  priceCents: number | null;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  category: string | null;
  variations: ProductVariation[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  priceCents: number | null;
  durationMinutes: number | null;
};

export function squareConfigured() {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN);
}

function baseUrl() {
  return process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";
}

async function squareFetch<T>(path: string, init?: RequestInit & { revalidate?: number }): Promise<T> {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) throw new Error("SQUARE_ACCESS_TOKEN is not set");
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Square-Version": SQUARE_VERSION,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    // Catalog reads are cached and refreshed every 5 minutes.
    next: init?.revalidate ? { revalidate: init.revalidate } : undefined,
    cache: init?.revalidate ? undefined : "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Square ${path} failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

// Minimal shapes of the Square objects we read.
type Money = { amount?: number; currency?: string };
type CatalogObject = {
  type: string;
  id: string;
  is_deleted?: boolean;
  item_data?: {
    name?: string;
    description_plaintext?: string;
    description?: string;
    image_ids?: string[];
    categories?: { id: string }[];
    category_id?: string;
    is_archived?: boolean;
    ecom_visibility?: string;
    product_type?: string;
    variations?: {
      id: string;
      is_deleted?: boolean;
      item_variation_data?: {
        name?: string;
        price_money?: Money;
        ordinal?: number;
        sellable?: boolean;
        service_duration?: number;
      };
    }[];
  };
  image_data?: { url?: string };
  category_data?: { name?: string };
};

async function listCatalog(): Promise<CatalogObject[]> {
  const objects: CatalogObject[] = [];
  let cursor: string | undefined;
  do {
    const params = new URLSearchParams({ types: "ITEM,IMAGE,CATEGORY" });
    if (cursor) params.set("cursor", cursor);
    const page = await squareFetch<{ objects?: CatalogObject[]; cursor?: string }>(
      `/v2/catalog/list?${params}`,
      { revalidate: 300 },
    );
    objects.push(...(page.objects ?? []));
    cursor = page.cursor;
  } while (cursor);
  return objects;
}

type Catalog = { products: Product[]; services: Service[] };

/** Products and appointment services from Square, or null if not connected or unreachable. */
export async function getCatalog(): Promise<Catalog | null> {
  if (!squareConfigured()) return null;
  try {
    const objects = await listCatalog();
    const images = new Map(
      objects.filter((o) => o.type === "IMAGE").map((o) => [o.id, o.image_data?.url ?? null]),
    );
    const categories = new Map(
      objects.filter((o) => o.type === "CATEGORY").map((o) => [o.id, o.category_data?.name ?? null]),
    );

    const products: Product[] = [];
    const services: Service[] = [];

    for (const o of objects) {
      const item = o.item_data;
      if (o.type !== "ITEM" || !item || o.is_deleted || item.is_archived) continue;
      if (item.ecom_visibility === "HIDDEN") continue;

      const variations = (item.variations ?? [])
        .filter((v) => !v.is_deleted && v.item_variation_data?.sellable !== false)
        .sort((a, b) => (a.item_variation_data?.ordinal ?? 0) - (b.item_variation_data?.ordinal ?? 0))
        .map((v) => ({
          id: v.id,
          name: v.item_variation_data?.name ?? "Regular",
          priceCents: v.item_variation_data?.price_money?.amount ?? null,
          durationMs: v.item_variation_data?.service_duration ?? null,
        }));
      if (!variations.length) continue;

      const description = item.description_plaintext ?? item.description ?? "";

      if (item.product_type === "APPOINTMENTS_SERVICE") {
        const first = variations[0];
        services.push({
          id: o.id,
          name: item.name ?? "Appointment",
          description,
          priceCents: first.priceCents,
          durationMinutes: first.durationMs ? Math.round(first.durationMs / 60000) : null,
        });
        continue;
      }

      const categoryId = item.categories?.[0]?.id ?? item.category_id;
      products.push({
        id: o.id,
        name: item.name ?? "Untitled set",
        description,
        image: item.image_ids?.map((id) => images.get(id)).find(Boolean) ?? null,
        category: categoryId ? (categories.get(categoryId) ?? null) : null,
        variations: variations.map(({ id, name, priceCents }) => ({ id, name, priceCents })),
      });
    }

    return { products, services };
  } catch (error) {
    // Never take the site down because Square is unreachable: pages fall back
    // to the request-a-set flow and the error shows up in Vercel's logs.
    console.error("[square] catalog unavailable:", error);
    return null;
  }
}

/** Find a sellable variation by id, so checkout only ever sells real catalog items. */
export async function findVariation(variationId: string) {
  const catalog = await getCatalog();
  for (const product of catalog?.products ?? []) {
    const variation = product.variations.find((v) => v.id === variationId);
    if (variation) return { product, variation };
  }
  return null;
}

let cachedLocationId: string | undefined;

async function locationId(): Promise<string> {
  if (process.env.SQUARE_LOCATION_ID) return process.env.SQUARE_LOCATION_ID;
  if (cachedLocationId) return cachedLocationId;
  const data = await squareFetch<{ locations?: { id: string; status?: string }[] }>("/v2/locations");
  const location = data.locations?.find((l) => l.status === "ACTIVE") ?? data.locations?.[0];
  if (!location) throw new Error("No Square location found");
  cachedLocationId = location.id;
  return location.id;
}

/** Creates a Square checkout page for one item and returns its URL. */
export async function createCheckoutUrl(variationId: string, redirectUrl: string, supportEmail: string) {
  const data = await squareFetch<{ payment_link?: { url?: string } }>(
    "/v2/online-checkout/payment-links",
    {
      method: "POST",
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        order: {
          location_id: await locationId(),
          line_items: [{ catalog_object_id: variationId, quantity: "1" }],
        },
        checkout_options: {
          redirect_url: redirectUrl,
          merchant_support_email: supportEmail,
          ask_for_shipping_address: true,
          allow_tipping: true,
          // Square shows these as short questions on its checkout page.
          custom_fields: [
            { title: "Shipping or local pickup?" },
            { title: "Your nail sizes, shape and length" },
          ],
          accepted_payment_methods: { apple_pay: true, google_pay: true, cash_app_pay: true },
        },
      }),
    },
  );
  const url = data.payment_link?.url;
  if (!url) throw new Error("Square did not return a checkout URL");
  return url;
}

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
