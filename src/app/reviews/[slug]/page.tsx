import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug, getAllSlugs } from "@/lib/stub-data";
import { ImageSwitcher } from "@/components/ImageSwitcher";
import { AddToCartButton } from "@/components/AddToCartButton";

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
      <span className="w-24 text-right font-mono text-xs text-text-muted">
        {label}
      </span>
      <div className="h-3 flex-1 rounded-full bg-surface-muted">
        <div
          className={`h-3 rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 font-mono text-xs font-bold text-text-secondary">
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
    genuine: "bg-genuine-green/10 text-genuine-green border-genuine-green/25",
    suspicious:
      "bg-suspicious-yellow/10 text-suspicious-yellow border-suspicious-yellow/25",
    copypasta:
      "bg-copypasta-purple/10 text-copypasta-purple border-copypasta-purple/25",
    bribed: "bg-bribed-orange/10 text-bribed-orange border-bribed-orange/25",
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
    <span className="font-mono text-sm text-suspicious-yellow">
      {"★".repeat(rating)}
      <span className="text-text-muted">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function scoreColor(value: number, low: number, mid: number): string {
  if (value < low) return "text-lie-red";
  if (value < mid) return "text-suspicious-yellow";
  return "text-genuine-green";
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
          <h1 className="font-display text-4xl font-bold text-accent">
            404 — Product Not Found
          </h1>
          <p className="mt-2 text-text-secondary">
            Even our sarcasm couldn&apos;t find this one.
          </p>
          <Link
            href="/reviews/"
            className="mt-4 inline-block font-mono text-sm text-primary hover:underline"
          >
            ← Back to all products
          </Link>
        </div>
      </main>
    );
  }

  const { aiAnalysis } = product;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* ═══ STEP 1: Breadcrumb Navigation ═══ */}
      <nav className="mb-6 flex gap-2 font-mono text-xs text-text-muted">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/reviews/" className="hover:text-primary transition-colors">
          Reviews
        </Link>
        <span>/</span>
        <span className="text-text">{product.productName}</span>
      </nav>

      {/* ═══ STEP 1: Product Overview (Bento) ═══ */}
      <section className="mb-8 grid gap-4 md:grid-cols-3">
        {/* Image switcher — left column */}
        <div className="bento-card col-span-full overflow-hidden p-4 md:col-span-1">
          <ImageSwitcher
            officialImages={product.images.official}
            reviewImages={product.images.review}
            productName={product.productName}
            verdict={product.aiAnalysis.buyOrCry}
          />
        </div>

        {/* Product info — right two cols */}
        <div className="bento-card col-span-full p-6 md:col-span-2">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-text-muted">
            {product.category} · {product.source} · {product.brand}
          </p>
          <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
            {product.productName}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="font-display text-2xl font-bold text-primary">
              {product.price}
            </p>
            <AddToCartButton product={product} size="md" />
          </div>
          <div className="mt-4 rounded-xl bg-accent/5 p-4 border border-accent/15">
            <p className="mb-1 font-mono text-xs font-medium text-accent">
              🎭 The Sarcastic Verdict
            </p>
            <p className="text-base italic text-text-secondary leading-relaxed">
              &ldquo;{product.sarcasticVerdict}&rdquo;
            </p>
          </div>
        </div>

        {/* Score cards — span full width below */}
        <div className="col-span-full grid gap-4 sm:grid-cols-3">
          <div className="bento-card p-5 text-center">
            <p className="font-mono text-xs text-text-muted">
              Seller&apos;s Delusion ⭐
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-text">
              {product.sellerRating}/5
            </p>
            <p className="text-xs text-text-muted">
              (what they WANT you to believe)
            </p>
          </div>
          <div className="bento-card p-5 text-center">
            <p className="font-mono text-xs text-text-muted">Reality Score 💀</p>
            <p className="mt-1 font-display text-3xl font-bold text-lie-red">
              {product.realityScore}/5
            </p>
            <p className="text-xs text-text-muted">(what it ACTUALLY is)</p>
          </div>
          <div className="bento-card p-5 text-center">
            <p className="font-mono text-xs text-text-muted">Fake Reviews 🤥</p>
            <p className="mt-1 font-display text-3xl font-bold text-roast-orange">
              {product.fakeReviewPercent}%
            </p>
            <p className="text-xs text-text-muted">
              of {product.totalReviews.toLocaleString("en-IN")} reviews
            </p>
          </div>
        </div>
      </section>

      {/* ═══ What They Say vs Mean — Bento ═══ */}
      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="bento-card p-5 border-l-4 border-l-genuine-green">
          <h3 className="mb-2 font-mono text-xs font-medium text-genuine-green">
            💬 What the Reviews Say
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            &ldquo;{product.whatTheySay}&rdquo;
          </p>
        </div>
        <div className="bento-card p-5 border-l-4 border-l-lie-red">
          <h3 className="mb-2 font-mono text-xs font-medium text-lie-red">
            🎭 What They Actually Mean
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            &ldquo;{product.whatTheyMean}&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ Service Metrics — Bento ═══ */}
      <section className="mb-8 bento-card p-6">
        <h2 className="mb-6 font-display text-xl font-bold text-primary">
          🛎️ Seller &amp; Service Metrics
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-xl bg-surface-muted p-4 text-center">
            <p className="font-mono text-xs text-text-muted">Return Policy</p>
            <p className="mt-1 font-display text-sm font-bold text-text">
              {product.serviceMetrics.returnPolicy}
            </p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 text-center">
            <p className="font-mono text-xs text-text-muted">Return Success</p>
            <p className={`mt-1 font-display text-2xl font-bold ${scoreColor(product.serviceMetrics.returnSuccessRate, 40, 60)}`}>
              {product.serviceMetrics.returnSuccessRate}%
            </p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 text-center">
            <p className="font-mono text-xs text-text-muted">Delivery Rating</p>
            <p className={`mt-1 font-display text-2xl font-bold ${scoreColor(product.serviceMetrics.deliveryRating, 3, 4)}`}>
              {product.serviceMetrics.deliveryRating}/5
            </p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 text-center">
            <p className="font-mono text-xs text-text-muted">Support Score</p>
            <p className={`mt-1 font-display text-2xl font-bold ${scoreColor(product.serviceMetrics.customerSupportScore, 2, 3)}`}>
              {product.serviceMetrics.customerSupportScore}/5
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-surface-muted p-4">
            <p className="font-mono text-xs text-text-muted mb-1">⏱️ Seller Response Time</p>
            <p className="font-display text-sm font-bold text-text">
              {product.serviceMetrics.sellerResponseTime}
            </p>
          </div>
          <div className="rounded-xl bg-accent/5 p-4 border border-accent/15">
            <p className="font-mono text-xs text-accent mb-1">🎭 Service Reality Check</p>
            <p className="text-sm text-text-secondary leading-relaxed italic">
              &ldquo;{product.serviceMetrics.sarcasticServiceVerdict}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ═══ STEP 2: Detailed AI Analysis (Bento) ═══ */}
      <section className="mb-8 bento-card p-6">
        <h2 className="mb-6 font-display text-xl font-bold text-truth-blue">
          🤖 AI Sarcasm Analysis
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Sentiment Breakdown */}
          <div>
            <h3 className="mb-3 font-mono text-sm font-medium text-text-secondary">
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
          <div className="rounded-xl bg-truth-blue/5 p-4 border border-truth-blue/15">
            <p className="font-mono text-xs font-medium text-truth-blue mb-2">
              🔍 Top Sarcastic Insight
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {aiAnalysis.topSarcasticInsight}
            </p>
          </div>
        </div>

        {/* Pros & Cons — clean bento layout */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-genuine-green/5 p-4 border border-genuine-green/15">
            <h3 className="mb-3 font-mono text-sm font-medium text-genuine-green">
              ✓ Real Pros (the few that exist)
            </h3>
            <ul className="space-y-1.5">
              {aiAnalysis.realPros.map((pro, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <span className="text-genuine-green">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-lie-red/5 p-4 border border-lie-red/15">
            <h3 className="mb-3 font-mono text-sm font-medium text-lie-red">
              ✗ Real Cons (the painful truth)
            </h3>
            <ul className="space-y-1.5">
              {aiAnalysis.realCons.map((con, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <span className="text-lie-red">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buy or Cry — Final Verdict */}
        <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-surface-alt p-4">
          <span className="font-display text-sm text-text-secondary">
            Final Verdict:
          </span>
          {aiAnalysis.buyOrCry === "buy" && (
            <span className="rounded-lg bg-genuine-green/10 px-4 py-2 font-display text-lg font-bold text-genuine-green border border-genuine-green/30">
              🛒 BUY IT (surprisingly)
            </span>
          )}
          {aiAnalysis.buyOrCry === "cry" && (
            <span className="rounded-lg bg-lie-red/10 px-4 py-2 font-display text-lg font-bold text-lie-red border border-lie-red/30">
              😭 CRY ABOUT IT
            </span>
          )}
          {aiAnalysis.buyOrCry === "maybe" && (
            <span className="rounded-lg bg-suspicious-yellow/10 px-4 py-2 font-display text-lg font-bold text-suspicious-yellow border border-suspicious-yellow/30">
              🤷 PROCEED WITH CAUTION
            </span>
          )}
        </div>
      </section>

      {/* ═══ STEP 2: Individual Reviews ═══ */}
      <section className="mb-8">
        <h2 className="mb-4 font-display text-xl font-bold text-text">
          Reviews — Translated for Humans 🗣️
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {product.reviews.map((review, i) => (
            <div key={i} className="bento-card p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="font-display text-sm font-bold text-text">
                  {review.author}
                </span>
                <StarRating rating={review.rating} />
                <FlagBadge flag={review.flagged} />
              </div>

              <div className="mb-3 rounded-xl bg-surface-muted p-3">
                <p className="mb-1 font-mono text-xs text-text-muted">
                  Original Review:
                </p>
                <p className="text-sm text-text-secondary">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="rounded-xl bg-accent/5 p-3 border border-accent/15">
                <p className="mb-1 font-mono text-xs text-accent">
                  🎭 Sarcastic Translation:
                </p>
                <p className="text-sm text-text-secondary">
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
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-medium text-white hover:bg-primary-dark transition"
        >
          ← Roast More Products
        </Link>
      </div>
    </main>
  );
}
