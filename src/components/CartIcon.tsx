"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartIcon() {
  const { cartItems } = useCart();
  const count = cartItems.length;

  return (
    <Link
      href="/cart/"
      className="relative inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 font-mono text-sm text-text-secondary transition hover:border-primary/40 hover:text-primary"
    >
      🛒
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-white">
          {count}
        </span>
      )}
      <span className="hidden sm:inline">
        Compare {count > 0 ? `(${count})` : ""}
      </span>
    </Link>
  );
}
