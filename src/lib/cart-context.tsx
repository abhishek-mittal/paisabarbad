"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ProductReview } from "./types";

interface CartItem {
  product: ProductReview;
  addedAt: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductReview) => void;
  removeFromCart: (slug: string) => void;
  isInCart: (slug: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("paisabarbad-cart");
      if (saved) setCartItems(JSON.parse(saved));
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("paisabarbad-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: ProductReview) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.product.slug === product.slug)) return prev;
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.slug !== slug));
  };

  const isInCart = (slug: string) =>
    cartItems.some((item) => item.product.slug === slug);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
