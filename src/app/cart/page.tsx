"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { PaisaBarbadStamp } from "@/components/PaisaBarbadStamp";

function scoreColor(value: number, low: number, mid: number): string {
  if (value < low) return "text-lie-red";
  if (value < mid) return "text-suspicious-yellow";
  return "text-genuine-green";
}

function VerdictBadge({ verdict }: { verdict: "buy" | "cry" | "maybe" }) {
  const styles = {
    buy: "bg-genuine-green/10 text-genuine-green border-genuine-green/30",
    cry: "bg-lie-red/10 text-lie-red border-lie-red/30",
    maybe: "bg-suspicious-yellow/10 text-suspicious-yellow border-suspicious-yellow/30",
  };
  const labels = { buy: "🛒 BUY IT", cry: "😭 CRY ABOUT IT", maybe: "🤷 MAYBE" };
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 py-1 font-display text-xs font-bold ${styles[verdict]}`}
    >
      {labels[verdict]}
    </span>
  );
}

const METRICS = [
  { key: "price", label: "💰 Price" },
  { key: "sellerRating", label: "⭐ Seller Rating" },
  { key: "realityScore", label: "💀 Reality Score" },
  { key: "fakeReviewPercent", label: "🤥 Fake Reviews" },
  { key: "returnSuccessRate", label: "↩️ Return Success" },
  { key: "deliveryRating", label: "🚚 Delivery" },
  { key: "supportScore", label: "🛎️ Support Score" },
  { key: "verdict", label: "🎯 Verdict" },
] as const;

const MAX_DECISION_GUIDE_COLUMNS = 3;

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="bento-card p-12">
          <p className="mb-4 text-6xl">🛒</p>
          <h1 className="mb-2 font-display text-3xl font-bold text-text">
            Your comparison cart is empty
          </h1>
          <p className="mb-6 text-text-secondary">
            Add products to compare them side-by-side and make a smart decision
          </p>
          <Link
            href="/reviews/"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-display font-bold text-white transition hover:bg-primary-dark"
          >
            Browse Products →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-text">
            🛒 Compare Products
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {cartItems.length} product{cartItems.length !== 1 ? "s" : ""} in your
            comparison cart — make a smart decision
          </p>
        </div>
        <button
          onClick={clearCart}
          className="rounded-lg border border-border px-4 py-2 font-mono text-sm text-text-secondary transition hover:border-lie-red/40 hover:text-lie-red"
        >
          Clear All
        </button>
      </div>

      {/* Product image cards row */}
      <div
        className="mb-6 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${cartItems.length}, minmax(0, 1fr))`,
        }}
      >
        {cartItems.map(({ product }) => (
          <div key={product.slug} className="bento-card overflow-hidden">
            {/* Product image with stamp */}
            <div className="relative aspect-[4/3] w-full bg-surface-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images.official[0]}
                alt={product.productName}
                className="h-full w-full object-cover"
              />
              {product.aiAnalysis.buyOrCry === "cry" && (
                <PaisaBarbadStamp size="md" />
              )}
            </div>

            {/* Product info */}
            <div className="p-4">
              <p className="mb-0.5 font-mono text-xs uppercase tracking-wider text-text-muted">
                {product.category} · {product.source}
              </p>
              <Link
                href={`/reviews/${product.slug}/`}
                className="font-display text-base font-bold text-text transition hover:text-primary"
              >
                {product.productName}
              </Link>
              <p className="text-xs text-text-secondary">{product.brand}</p>
              <p className="mt-1 font-display text-lg font-bold text-primary">
                {product.price}
              </p>
              <button
                onClick={() => removeFromCart(product.slug)}
                className="mt-2 font-mono text-xs text-text-muted transition hover:text-lie-red"
              >
                ✕ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="bento-card overflow-x-auto p-0">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              <th className="p-4 text-left font-mono text-xs uppercase tracking-wider text-text-muted">
                Metric
              </th>
              {cartItems.map(({ product }) => (
                <th
                  key={product.slug}
                  className="p-4 text-center font-display text-sm font-bold text-text"
                >
                  {product.productName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRICS.map((metric, rowIdx) => (
              <tr
                key={metric.key}
                className={rowIdx % 2 === 0 ? "bg-surface" : "bg-surface-alt"}
              >
                <td className="p-4 font-mono text-xs font-medium text-text-secondary">
                  {metric.label}
                </td>
                {cartItems.map(({ product }) => {
                  const sm = product.serviceMetrics;
                  let cell: React.ReactNode = null;

                  switch (metric.key) {
                    case "price":
                      cell = (
                        <span className="font-display font-bold text-primary">
                          {product.price}
                        </span>
                      );
                      break;
                    case "sellerRating":
                      cell = (
                        <span className="font-bold text-text">
                          {product.sellerRating}/5 ⭐
                        </span>
                      );
                      break;
                    case "realityScore":
                      cell = (
                        <span
                          className={`font-display text-lg font-bold ${scoreColor(product.realityScore, 2, 3.5)}`}
                        >
                          {product.realityScore}/5
                        </span>
                      );
                      break;
                    case "fakeReviewPercent":
                      cell = (
                        <span
                          className={`font-display font-bold ${scoreColor(100 - product.fakeReviewPercent, 40, 60)}`}
                        >
                          {product.fakeReviewPercent}%
                        </span>
                      );
                      break;
                    case "returnSuccessRate":
                      cell = (
                        <span
                          className={`font-bold ${scoreColor(sm.returnSuccessRate, 40, 60)}`}
                        >
                          {sm.returnSuccessRate}%
                        </span>
                      );
                      break;
                    case "deliveryRating":
                      cell = (
                        <span
                          className={`font-bold ${scoreColor(sm.deliveryRating, 3, 4)}`}
                        >
                          {sm.deliveryRating}/5
                        </span>
                      );
                      break;
                    case "supportScore":
                      cell = (
                        <span
                          className={`font-bold ${scoreColor(sm.customerSupportScore, 2, 3)}`}
                        >
                          {sm.customerSupportScore}/5
                        </span>
                      );
                      break;
                    case "verdict":
                      cell = <VerdictBadge verdict={product.aiAnalysis.buyOrCry} />;
                      break;
                  }

                  return (
                    <td key={product.slug} className="p-4 text-center">
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Sarcastic verdict row */}
            <tr className="border-t border-border bg-surface">
              <td className="p-4 font-mono text-xs font-medium text-accent">
                🎭 Sarcastic Verdict
              </td>
              {cartItems.map(({ product }) => (
                <td key={product.slug} className="p-4">
                  <p className="text-xs italic leading-relaxed text-text-secondary">
                    &ldquo;{product.sarcasticVerdict}&rdquo;
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Smart decision summary */}
      <div className="mt-6 bento-card p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-text">
          🧠 Smart Decision Guide
        </h2>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${Math.min(cartItems.length, MAX_DECISION_GUIDE_COLUMNS)}, minmax(0, 1fr))`,
          }}
        >
          {cartItems.map(({ product }) => {
            const v = product.aiAnalysis.buyOrCry;
            const borderColor =
              v === "buy"
                ? "border-genuine-green/30 bg-genuine-green/5"
                : v === "cry"
                  ? "border-lie-red/30 bg-lie-red/5"
                  : "border-suspicious-yellow/30 bg-suspicious-yellow/5";
            return (
              <div
                key={product.slug}
                className={`rounded-xl border p-4 ${borderColor}`}
              >
                <p className="mb-1 font-display text-sm font-bold text-text">
                  {product.productName}
                </p>
                <VerdictBadge verdict={v} />
                <ul className="mt-3 space-y-1">
                  {product.aiAnalysis.realPros.slice(0, 2).map((pro, i) => (
                    <li key={i} className="flex gap-1.5 text-xs text-text-secondary">
                      <span className="text-genuine-green">✓</span> {pro}
                    </li>
                  ))}
                  {product.aiAnalysis.realCons.slice(0, 2).map((con, i) => (
                    <li key={i} className="flex gap-1.5 text-xs text-text-secondary">
                      <span className="text-lie-red">✗</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href="/reviews/"
          className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-display font-bold text-white transition hover:bg-primary-dark"
        >
          + Add More Products
        </Link>
        <Link
          href="/"
          className="font-mono text-sm text-text-secondary transition hover:text-primary"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
