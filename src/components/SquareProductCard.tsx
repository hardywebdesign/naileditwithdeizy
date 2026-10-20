import Image from "next/image";
import { AddToBag } from "@/components/AddToBag";
import { priceRange, type Product } from "@/lib/square";

/**
 * A product from Deizy's Square catalog. "Add to bag" puts it in the
 * shopping bag; the bag checks out everything at once on Square's secure
 * checkout (cards, Cash App Pay, Apple Pay, Google Pay).
 */
export function SquareProductCard({ product }: { product: Product }) {
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
      <AddToBag name={product.name} image={product.image} variations={product.variations} />
    </article>
  );
}
