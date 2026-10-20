"use client";

import { useEffect } from "react";
import { clearBag } from "@/lib/bag";

/** Empties the shopping bag once an order has gone through. */
export function ClearBag() {
  useEffect(() => clearBag(), []);
  return null;
}
