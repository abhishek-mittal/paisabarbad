"use client";

import { useCart } from "@/lib/cart-context";
import type { ProductReview } from "@/lib/types";

interface AddToCartButtonProps {
  product: ProductReview;
  size?: "sm" | "md";
}

export function AddToCartButton({ product, size = "md" }: AddToCartButtonProps) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(product.slug);

  const baseClass =
    size === "sm"
      ? "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs font-bold transition"
      : "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-display text-sm font-bold transition";

  if (inCart) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFromCart(product.slug);
        }}
        className={`${baseClass} border border-lie-red/30 bg-lie-red/10 text-lie-red hover:bg-lie-red hover:text-white`}
      >
        ✕ Remove
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      }}
      className={`${baseClass} bg-primary text-white hover:bg-primary-dark`}
    >
      🛒 Add to Compare
    </button>
  );
}
