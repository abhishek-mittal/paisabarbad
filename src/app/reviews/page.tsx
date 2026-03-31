import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/stub-data";
import { PaisaBarbadStamp } from "@/components/PaisaBarbadStamp";
import { AddToCartButton } from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "All Roasted Products — PaisaBarbad",
  description:
    "Browse every product we've ruthlessly analyzed. Fake review percentages, Reality Scores, and sarcastic AI verdicts included at no extra charge.",
};

function RealityMeter({ score }: { score: number }) {
  const pct = (score / 5) * 100;
  const color =
    score <= 2
      ? "bg-lie-red"
      : score <= 3.5
        ? "bg-suspicious-yellow"
        : "bg-genuine-green";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded-full bg-surface-muted">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-sm font-bold text-text">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

function BuyOrCryBadge({ verdict }: { verdict: "buy" | "cry" | "maybe" }) {
  const styles = {
    buy: "bg-genuine-green/10 text-genuine-green border-genuine-green/30",
    cry: "bg-lie-red/10 text-lie-red border-lie-red/30",
    maybe: "bg-suspicious-yellow/10 text-suspicious-yellow border-suspicious-yellow/30",
  };
  const labels = { buy: "🛒 BUY", cry: "😭 CRY", maybe: "🤷 MAYBE" };
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2 py-0.5 font-display text-xs font-bold ${styles[verdict]}`}
    >
      {labels[verdict]}
    </span>
  );
}

function supportScoreColor(score: number): string {
  if (score < 2) return "bg-lie-red/8 text-lie-red";
  if (score < 3) return "bg-suspicious-yellow/10 text-suspicious-yellow";
  return "bg-genuine-green/10 text-genuine-green";
}

export default function ReviewsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Navigation */}
      <div className="mb-2">
        <Link
          href="/"
          className="font-mono text-sm text-text-muted hover:text-primary transition-colors"
        >
          ← Back to home
        </Link>
      </div>

      <h1 className="mb-2 font-display text-4xl font-bold text-text">
        All Roasted Products 🔥
      </h1>
      <p className="mb-8 text-text-secondary">
        {products.length} products analyzed ·{" "}
        {products
          .reduce(
            (s, p) =>
              s + Math.round(p.totalReviews * (p.fakeReviewPercent / 100)),
            0
          )
          .toLocaleString("en-IN")}{" "}
        fake reviews exposed
      </p>

      {/* Bento product grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.slug} className="bento-card group flex flex-col overflow-hidden">
            {/* Product image */}
            <Link
              href={`/reviews/${p.slug}/`}
              className="relative block aspect-[4/3] overflow-hidden bg-surface-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.images.official[0]}
                alt={p.productName}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {p.aiAnalysis.buyOrCry === "cry" && <PaisaBarbadStamp size="md" />}
              <span className="absolute left-2 top-2 rounded-lg bg-surface/90 px-2 py-0.5 font-mono text-xs text-text-muted backdrop-blur-sm">
                {p.category}
              </span>
            </Link>

            {/* Card body */}
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="mb-0.5 font-mono text-xs uppercase tracking-wider text-text-muted">
                    {p.source} · {p.price}
                  </p>
                  <Link href={`/reviews/${p.slug}/`}>
                    <h2 className="font-display text-lg font-bold text-text transition-colors group-hover:text-primary">
                      {p.productName}
                    </h2>
                  </Link>
                  <p className="text-sm text-text-secondary">{p.brand}</p>
                </div>
                <BuyOrCryBadge verdict={p.aiAnalysis.buyOrCry} />
              </div>

              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="font-mono text-xs text-text-muted">
                    Seller&apos;s Delusion
                  </p>
                  <p className="font-bold text-text">{p.sellerRating}/5 ⭐</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-text-muted">Reality Score 💀</p>
                  <RealityMeter score={p.realityScore} />
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-lg bg-lie-red/8 px-2 py-0.5 font-mono text-xs font-bold text-lie-red">
                  {p.fakeReviewPercent}% Fake
                </span>
                <span className="rounded-lg bg-surface-muted px-2 py-0.5 font-mono text-xs text-text-secondary">
                  {p.totalReviews.toLocaleString("en-IN")} reviews
                </span>
                <span
                  className={`rounded-lg px-2 py-0.5 font-mono text-xs font-bold ${supportScoreColor(p.serviceMetrics.customerSupportScore)}`}
                >
                  🛎️ Support {p.serviceMetrics.customerSupportScore}/5
                </span>
              </div>

              <p className="mb-4 flex-1 text-sm italic leading-relaxed text-text-secondary">
                &ldquo;{p.sarcasticVerdict}&rdquo;
              </p>

              <div className="flex items-center gap-2">
                <AddToCartButton product={p} size="sm" />
                <Link
                  href={`/reviews/${p.slug}/`}
                  className="inline-flex items-center rounded-lg bg-surface-muted px-3 py-1.5 font-mono text-xs text-text-secondary transition hover:bg-border hover:text-text"
                >
                  Full Review →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
