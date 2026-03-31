import type { Metadata } from "next";
import Link from "next/link";
import { products, getProductBySlug, getAllSlugs } from "@/lib/stub-data";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const product = getProductBySlug(slug);
    if (!product) return { title: "Not Found — PaisaBarbad" };
    return {
      title: `${product.productName} — Roasted by PaisaBarbad`,
      description: product.sarcasticVerdict,
      openGraph: {
        title: `${product.productName} — Reality Score: ${product.realityScore}/5 💀`,
        description: product.sarcasticVerdict,
      },
    };
  });
}

function SentimentBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-right font-mono text-xs text-gray-400">
        {label}
      </span>
      <div className="h-3 flex-1 rounded-full bg-void-lighter">
        <div
          className={`h-3 rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 font-mono text-xs font-bold text-gray-300">
        {pct}%
      </span>
    </div>
  );
}

function FlagBadge({
  flag,
}: {
  flag: "genuine" | "suspicious" | "copypasta" | "bribed";
}) {
  const styles = {
    genuine: "bg-genuine-green/15 text-genuine-green border-genuine-green/30",
    suspicious:
      "bg-suspicious-yellow/15 text-suspicious-yellow border-suspicious-yellow/30",
    copypasta:
      "bg-copypasta-purple/15 text-copypasta-purple border-copypasta-purple/30",
    bribed: "bg-bribed-orange/15 text-bribed-orange border-bribed-orange/30",
  };
  const labels = {
    genuine: "✓ Genuine",
    suspicious: "🤔 Suspicious",
    copypasta: "📋 Copypasta",
    bribed: "💰 Bribed",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-xs ${styles[flag]}`}
    >
      {labels[flag]}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="font-mono text-sm">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default async function ProductReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-sarcasm-pink">
            404 — Product Not Found
          </h1>
          <p className="mt-2 text-gray-400">
            Even our sarcasm couldn&apos;t find this one.
          </p>
          <Link
            href="/reviews/"
            className="mt-4 inline-block font-mono text-sm text-toxic-green hover:underline"
          >
            ← Back to all products
          </Link>
        </div>
      </main>
    );
  }

  const { aiAnalysis } = product;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex gap-2 font-mono text-xs text-gray-500">
        <Link href="/" className="hover:text-toxic-green">
          Home
        </Link>
        <span>/</span>
        <Link href="/reviews/" className="hover:text-toxic-green">
          Reviews
        </Link>
        <span>/</span>
        <span className="text-gray-300">{product.productName}</span>
      </nav>

      {/* ═══ HEADER ═══ */}
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-500">
          {product.category} · {product.source} · {product.brand}
        </p>
        <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
          {product.productName}
        </h1>
        <p className="mt-1 font-display text-2xl font-bold text-sarcasm-pink">
          {product.price}
        </p>
      </header>

      {/* ═══ SCORES ═══ */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="gradient-border rounded-xl bg-void-gray p-5 text-center">
          <p className="font-mono text-xs text-gray-500">Seller&apos;s Delusion ⭐</p>
          <p className="font-display text-3xl font-bold text-white">
            {product.sellerRating}/5
          </p>
          <p className="text-xs text-gray-600">
            (what they WANT you to believe)
          </p>
        </div>
        <div className="gradient-border rounded-xl bg-void-gray p-5 text-center">
          <p className="font-mono text-xs text-gray-500">Reality Score 💀</p>
          <p className="font-display text-3xl font-bold text-lie-red">
            {product.realityScore}/5
          </p>
          <p className="text-xs text-gray-600">(what it ACTUALLY is)</p>
        </div>
        <div className="gradient-border rounded-xl bg-void-gray p-5 text-center">
          <p className="font-mono text-xs text-gray-500">Fake Reviews 🤥</p>
          <p className="font-display text-3xl font-bold text-roast-orange">
            {product.fakeReviewPercent}%
          </p>
          <p className="text-xs text-gray-600">
            of {product.totalReviews.toLocaleString("en-IN")} reviews
          </p>
        </div>
      </section>

      {/* ═══ SARCASTIC VERDICT ═══ */}
      <section className="mb-8 rounded-2xl bg-gradient-to-r from-sarcasm-pink/10 to-void-gray p-6">
        <h2 className="mb-2 font-display text-lg font-bold text-sarcasm-pink">
          🎭 The Sarcastic Verdict
        </h2>
        <p className="text-lg italic text-gray-200 leading-relaxed">
          &ldquo;{product.sarcasticVerdict}&rdquo;
        </p>
      </section>

      {/* ═══ WHAT THEY SAY vs MEAN ═══ */}
      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-genuine-green/5 p-5 border border-genuine-green/20">
          <h3 className="mb-2 font-mono text-xs text-genuine-green">
            💬 What the Reviews Say
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            &ldquo;{product.whatTheySay}&rdquo;
          </p>
        </div>
        <div className="rounded-xl bg-lie-red/5 p-5 border border-lie-red/20">
          <h3 className="mb-2 font-mono text-xs text-lie-red">
            🎭 What They Actually Mean
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            &ldquo;{product.whatTheyMean}&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ AI ANALYSIS ═══ */}
      <section className="mb-8 gradient-border rounded-2xl bg-void-gray p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-truth-blue">
          🤖 AI Sarcasm Analysis
        </h2>

        {/* Sentiment Breakdown */}
        <div className="mb-6">
          <h3 className="mb-3 font-mono text-sm text-gray-400">
            Review Sentiment Breakdown
          </h3>
          <div className="space-y-2">
            <SentimentBar
              label="Genuine"
              pct={aiAnalysis.sentimentBreakdown.genuine}
              color="bg-genuine-green"
            />
            <SentimentBar
              label="Suspicious"
              pct={aiAnalysis.sentimentBreakdown.suspicious}
              color="bg-suspicious-yellow"
            />
            <SentimentBar
              label="Copypasta"
              pct={aiAnalysis.sentimentBreakdown.copypasta}
              color="bg-copypasta-purple"
            />
            <SentimentBar
              label="Bribed"
              pct={aiAnalysis.sentimentBreakdown.bribed}
              color="bg-bribed-orange"
            />
          </div>
        </div>

        {/* Top Insight */}
        <div className="mb-6 rounded-lg bg-void-lighter p-4">
          <p className="font-mono text-xs text-truth-blue mb-1">
            🔍 Top Sarcastic Insight
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {aiAnalysis.topSarcasticInsight}
          </p>
        </div>

        {/* Pros & Cons */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-mono text-sm text-genuine-green">
              ✓ Real Pros (the few that exist)
            </h3>
            <ul className="space-y-1">
              {aiAnalysis.realPros.map((pro, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-genuine-green">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-mono text-sm text-lie-red">
              ✗ Real Cons (the painful truth)
            </h3>
            <ul className="space-y-1">
              {aiAnalysis.realCons.map((con, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-lie-red">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buy or Cry */}
        <div className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-void-black p-4">
          <span className="font-display text-sm text-gray-400">
            Final Verdict:
          </span>
          {aiAnalysis.buyOrCry === "buy" && (
            <span className="rounded-lg bg-genuine-green/20 px-4 py-2 font-display text-lg font-bold text-genuine-green border border-genuine-green/40">
              🛒 BUY IT (surprisingly)
            </span>
          )}
          {aiAnalysis.buyOrCry === "cry" && (
            <span className="rounded-lg bg-lie-red/20 px-4 py-2 font-display text-lg font-bold text-lie-red border border-lie-red/40">
              😭 CRY ABOUT IT
            </span>
          )}
          {aiAnalysis.buyOrCry === "maybe" && (
            <span className="rounded-lg bg-suspicious-yellow/20 px-4 py-2 font-display text-lg font-bold text-suspicious-yellow border border-suspicious-yellow/40">
              🤷 PROCEED WITH CAUTION
            </span>
          )}
        </div>
      </section>

      {/* ═══ INDIVIDUAL REVIEWS ═══ */}
      <section className="mb-8">
        <h2 className="mb-4 font-display text-xl font-bold text-white">
          Reviews — Translated for Humans 🗣️
        </h2>
        <div className="space-y-4">
          {product.reviews.map((review, i) => (
            <div
              key={i}
              className="gradient-border rounded-xl bg-void-gray p-5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-display text-sm font-bold text-white">
                  {review.author}
                </span>
                <StarRating rating={review.rating} />
                <FlagBadge flag={review.flagged} />
              </div>

              <div className="mb-3 rounded-lg bg-void-lighter p-3">
                <p className="mb-1 font-mono text-xs text-gray-500">
                  Original Review:
                </p>
                <p className="text-sm text-gray-300">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="rounded-lg bg-sarcasm-pink/5 p-3 border border-sarcasm-pink/20">
                <p className="mb-1 font-mono text-xs text-sarcasm-pink">
                  🎭 Sarcastic Translation:
                </p>
                <p className="text-sm text-gray-300">
                  &ldquo;{review.sarcasticTranslation}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="text-center">
        <Link
          href="/reviews/"
          className="inline-flex items-center gap-2 rounded-lg bg-void-lighter px-6 py-3 font-mono text-sm text-toxic-green hover:bg-void-gray transition"
        >
          ← Roast More Products
        </Link>
      </div>
    </main>
  );
}
