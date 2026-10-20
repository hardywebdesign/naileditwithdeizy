"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { checkout } from "@/app/(site)/shop/actions";
import { MAX_QUANTITY, removeFromBag, setQuantity, useBag } from "@/lib/bag";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/ButtonLink";

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-13 w-full items-center justify-center rounded-full bg-lacquer px-8 font-semibold tracking-wide text-on-main shadow-[0_10px_30px_-12px_var(--color-lacquer)] transition-colors hover:bg-lacquer-deep disabled:opacity-60"
    >
      {pending ? "Opening secure checkout…" : "Check out"}
    </button>
  );
}

/** The shopping bag: change quantities, remove sets, and check out on Square. */
export function BagContents() {
  const items = useBag();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-[2.5rem] border border-accent/25 bg-surface p-10 text-center md:p-12">
        <h2 className="font-display text-3xl text-ink">Your bag is empty</h2>
        <p className="mt-3 text-lg text-ink-soft">Find a set you love and add it here.</p>
        <ButtonLink href="/shop" className="mt-8">
          Shop sets
        </ButtonLink>
      </div>
    );
  }

  const priced = items.every((i) => i.priceCents !== null);
  const subtotal = items.reduce((sum, i) => sum + (i.priceCents ?? 0) * i.quantity, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      <ul className="divide-y divide-accent/20 rounded-[2.5rem] border border-accent/25 bg-surface px-6 md:px-8">
        {items.map((item) => (
          <li key={item.variationId} className="flex gap-5 py-6">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-blush">
              {item.image && (
                <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-xl text-ink md:text-2xl">{item.name}</h3>
                <p className="font-semibold text-lacquer">
                  {item.priceCents === null
                    ? formatPrice(null)
                    : formatPrice(item.priceCents * item.quantity)}
                </p>
              </div>
              {item.option && <p className="text-sm text-ink-soft">{item.option}</p>}
              <div className="mt-auto flex items-center gap-4 pt-3">
                <div className="flex items-center rounded-full border border-accent/30">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.variationId, item.quantity - 1)}
                    aria-label={`One fewer ${item.name}`}
                    className="grid size-9 place-items-center rounded-full text-lg text-ink hover:bg-blush"
                  >
                    −
                  </button>
                  <span className="w-8 text-center" aria-label="Quantity">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.variationId, item.quantity + 1)}
                    disabled={item.quantity >= MAX_QUANTITY}
                    aria-label={`One more ${item.name}`}
                    className="grid size-9 place-items-center rounded-full text-lg text-ink hover:bg-blush disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromBag(item.variationId)}
                  className="text-sm text-ink-soft underline underline-offset-4 hover:text-lacquer"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="rounded-[2.5rem] bg-blush p-8 md:p-10">
        <h2 className="font-display text-3xl text-ink">Order summary</h2>
        <div className="mt-6 flex items-baseline justify-between border-b border-accent/30 pb-4 text-lg">
          <span className="text-ink-soft">Subtotal</span>
          <span className="font-display text-3xl text-lacquer">
            {priced ? formatPrice(subtotal) : `${formatPrice(subtotal)}+`}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          At checkout you&apos;ll choose shipping or local pickup and tell me your sizes, shape and
          length for each set. Pay with card, Cash App Pay, Apple Pay or Google Pay.
        </p>
        <form action={checkout} className="mt-8">
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(
              items.map((i) => ({ variationId: i.variationId, quantity: i.quantity })),
            )}
          />
          <CheckoutButton />
        </form>
        <Link
          href="/shop"
          className="mt-5 block text-center text-sm font-semibold text-lacquer underline underline-offset-4"
        >
          Keep shopping
        </Link>
      </aside>
    </div>
  );
}
