"use client";

import Link from "next/link";
import { bagCount, useBag } from "@/lib/bag";

/** Bag icon for the header. Only shows once something is in the bag. */
export function BagLink() {
  const count = bagCount(useBag());
  if (count === 0) return null;
  return (
    <Link
      href="/bag"
      aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative grid size-11 place-items-center rounded-full text-ink hover:bg-blush"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z" strokeLinejoin="round" />
        <path d="M9 10V6.5a3 3 0 0 1 6 0V10" strokeLinecap="round" />
      </svg>
      <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-lacquer px-1 text-[0.7rem] font-semibold leading-5 text-on-main">
        {count}
      </span>
    </Link>
  );
}
