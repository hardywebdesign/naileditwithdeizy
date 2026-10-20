"use client";

import { useSyncExternalStore } from "react";
import { MAX_LINES, MAX_QUANTITY } from "@/lib/bag-limits";

export { MAX_LINES, MAX_QUANTITY };

/**
 * The shopping bag. It lives in the visitor's browser (localStorage), so it
 * survives page changes and refreshes without accounts or a database.
 * Prices here are only for display: checkout looks every item up in
 * Deizy's Square catalog again, so Square always charges the real price.
 */

export type BagItem = {
  /** Square variation id: the exact set and option being bought */
  variationId: string;
  name: string;
  /** Size, length or style, when the set has more than one option */
  option: string | null;
  priceCents: number | null;
  image: string | null;
  quantity: number;
};

const KEY = "nailed-it-bag";
const EMPTY: BagItem[] = [];
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedItems: BagItem[] = EMPTY;

function read(): BagItem[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // Private browsing or blocked storage: the bag just starts empty.
  }
  if (raw === cachedRaw) return cachedItems;
  cachedRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    cachedItems = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cachedItems = EMPTY;
  }
  return cachedItems;
}

function write(items: BagItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable: nothing more we can do.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep tabs in sync when the bag changes in another tab.
  const onStorage = (e: StorageEvent) => e.key === KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** The bag's items. Empty during server rendering, then filled in the browser. */
export function useBag() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function addToBag(item: Omit<BagItem, "quantity">, quantity = 1) {
  const items = read();
  const existing = items.find((i) => i.variationId === item.variationId);
  if (existing) {
    setQuantity(item.variationId, existing.quantity + quantity);
    return;
  }
  if (items.length >= MAX_LINES) return;
  write([...items, { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }]);
}

export function setQuantity(variationId: string, quantity: number) {
  const q = Math.max(0, Math.min(MAX_QUANTITY, Math.round(quantity)));
  write(
    read()
      .map((i) => (i.variationId === variationId ? { ...i, quantity: q } : i))
      .filter((i) => i.quantity > 0),
  );
}

export function removeFromBag(variationId: string) {
  write(read().filter((i) => i.variationId !== variationId));
}

export function clearBag() {
  write([]);
}

export function bagCount(items: BagItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
