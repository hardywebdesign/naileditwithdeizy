"use client";

import Link from "next/link";
import { useState } from "react";
import { addToBag } from "@/lib/bag";
import { formatPrice, type ProductVariation } from "@/lib/format";
import { cn } from "@/lib/cn";

interface AddToBagProps {
  name: string;
  image: string | null;
  variations: ProductVariation[];
}

/** Option picker and "Add to bag" button for one product in the shop. */
export function AddToBag({ name, image, variations }: AddToBagProps) {
  const [variationId, setVariationId] = useState(variations[0]?.id ?? "");
  const [added, setAdded] = useState(false);
  const single = variations.length === 1;
  const variation = variations.find((v) => v.id === variationId) ?? variations[0];

  function add() {
    if (!variation) return;
    addToBag({
      variationId: variation.id,
      name,
      option: single ? null : variation.name,
      priceCents: variation.priceCents,
      image,
    });
    setAdded(true);
  }

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-end gap-3">
        {!single && (
          <label className="block">
            <span className="text-sm text-ink-soft">Option</span>
            <select
              value={variationId}
              onChange={(e) => {
                setVariationId(e.target.value);
                setAdded(false);
              }}
              className="mt-1 block h-10 rounded-full border border-accent/30 bg-surface px-4 text-sm text-ink"
            >
              {variations.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} · {formatPrice(v.priceCents)}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          type="button"
          onClick={add}
          className={cn(
            "inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold tracking-wide transition-colors",
            added
              ? "border border-lacquer text-lacquer"
              : "bg-lacquer text-on-main hover:bg-lacquer-deep",
          )}
        >
          {added ? "Added ✓ Add another" : "Add to bag"}
        </button>
      </div>
      <p role="status" className="mt-2 min-h-5 text-sm">
        {added && (
          <Link href="/bag" className="font-semibold text-lacquer underline underline-offset-4">
            View bag and check out →
          </Link>
        )}
      </p>
    </div>
  );
}
