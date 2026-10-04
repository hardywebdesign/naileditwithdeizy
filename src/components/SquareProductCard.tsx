import Image from "next/image";
import { buyNow } from "@/app/(site)/shop/actions";
import { formatPrice, priceRange, type Product } from "@/lib/square";

/**
 * A product from Deizy's Square catalog. "Buy now" opens Square's secure
 * checkout (cards, Cash App Pay, Apple Pay, Google Pay). Works without
 * JavaScript, since it's a plain form posting to a Server Action.
 */
export function SquareProductCard({ product }: { product: Product }) {
  const single = product.variations.length === 1;
  return (
    <article className="flex flex-col">
      <div className="nail-arch relative aspect-[4/5] overflow-hidden bg-blush">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} press-on nail set`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center px-6 text-center font-display text-2xl text-lacquer">
            {product.name}
          </div>
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl text-ink">{product.name}</h3>
        <p className="shrink-0 text-lg font-medium text-lacquer">{priceRange(product.variations)}</p>
      </div>
      {product.description && <p className="mt-1 text-ink-soft">{product.description}</p>}
      <form action={buyNow} className="mt-5 flex flex-wrap items-end gap-3">
        {single ? (
          <input type="hidden" name="variationId" value={product.variations[0].id} />
        ) : (
          <label className="block">
            <span className="text-sm text-ink-soft">Option</span>
            <select
              name="variationId"
              className="mt-1 block h-10 rounded-full border border-ink/20 bg-surface px-4 text-sm text-ink"
            >
              {product.variations.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} · {formatPrice(v.priceCents)}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          type="submit"
          className="inline-flex h-10 items-center rounded-full bg-lacquer px-5 text-sm font-medium text-on-main transition-colors hover:bg-lacquer-deep"
        >
          Buy now
        </button>
      </form>
    </article>
  );
}
