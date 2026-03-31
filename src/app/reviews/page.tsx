import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/stub-data";

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
      <div className="h-2 flex-1 rounded-full bg-void-lighter">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-sm font-bold">{score.toFixed(1)}</span>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-2">
        <Link
          href="/"
          className="font-mono text-sm text-gray-500 hover:text-toxic-green"
        >
          ← Back to home
        </Link>
      </div>
      <h1 className="mb-2 font-display text-4xl font-bold text-white">
        All Roasted Products 🔥
      </h1>
      <p className="mb-8 text-gray-400">
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

      <div className="grid gap-6">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/reviews/${p.slug}/`}
            className="gradient-border group grid gap-4 rounded-xl bg-void-gray p-6 transition hover:bg-void-lighter md:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="mb-1 font-mono text-xs uppercase tracking-wider text-gray-500">
                {p.category} · {p.source} · {p.price}
              </p>
              <h2 className="mb-1 font-display text-xl font-bold text-white group-hover:text-toxic-green transition-colors">
                {p.productName}
              </h2>
              <p className="text-sm text-gray-400">{p.brand}</p>
              <p className="mt-3 text-sm italic text-gray-500 leading-relaxed">
                &ldquo;{p.sarcasticVerdict}&rdquo;
              </p>
            </div>

            <div className="flex flex-col gap-3 md:w-56">
              <div>
                <p className="font-mono text-xs text-gray-500">
                  Seller&apos;s Delusion
                </p>
                <p className="font-bold text-white">
                  {p.sellerRating}/5 ⭐
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-gray-500">
                  Reality Score 💀
                </p>
                <RealityMeter score={p.realityScore} />
              </div>
              <div className="flex gap-2">
                <span className="rounded bg-lie-red/10 px-2 py-0.5 font-mono text-xs font-bold text-lie-red">
                  {p.fakeReviewPercent}% Fake
                </span>
                <span className="rounded bg-void-lighter px-2 py-0.5 font-mono text-xs text-gray-400">
                  {p.totalReviews.toLocaleString("en-IN")} reviews
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
