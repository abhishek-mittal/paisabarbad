import Link from "next/link";
import { products } from "@/lib/stub-data";
import { PaisaBarbadStamp } from "@/components/PaisaBarbadStamp";
import { AddToCartButton } from "@/components/AddToCartButton";

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
      <div className="h-2 w-full rounded-full bg-surface-muted">
        <div
          className={`h-2 rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-sm font-bold tabular-nums text-text">
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
  const labels = { buy: "🛒 BUY IT", cry: "😭 CRY ABOUT IT", maybe: "🤷 MAYBE" };
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 py-1 font-display text-xs font-bold ${styles[verdict]}`}
    >
      {labels[verdict]}
    </span>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const isCry = product.aiAnalysis.buyOrCry === "cry";
  return (
    <div className="bento-card group flex flex-col overflow-hidden">
      {/* Product image */}
      <Link href={`/reviews/${product.slug}/`} className="relative block aspect-[4/3] overflow-hidden bg-surface-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images.official[0]}
          alt={product.productName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isCry && <PaisaBarbadStamp size="md" />}
        <span className="absolute left-2 top-2 rounded-lg bg-surface/90 px-2 py-0.5 font-mono text-xs text-text-muted backdrop-blur-sm">
          {product.category}
        </span>
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="mb-0.5 font-mono text-xs text-text-muted">{product.source}</p>
            <Link href={`/reviews/${product.slug}/`}>
              <h3 className="font-display text-base font-bold text-text transition-colors group-hover:text-primary">
                {product.productName}
              </h3>
            </Link>
            <p className="text-xs text-text-secondary">{product.brand}</p>
          </div>
          <span className="shrink-0 font-display text-lg font-bold text-primary">
            {product.price}
          </span>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <p className="mb-0.5 font-mono text-xs text-text-muted">
              Seller&apos;s Delusion ⭐
            </p>
            <p className="font-bold text-text">{product.sellerRating}/5</p>
          </div>
          <div>
            <p className="mb-0.5 font-mono text-xs text-text-muted">Reality Score 💀</p>
            <RealityMeter score={product.realityScore} />
          </div>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-lg bg-lie-red/8 px-2.5 py-1 font-mono text-xs font-bold text-lie-red">
            {product.fakeReviewPercent}% Fake
          </span>
          <span className="inline-flex items-center rounded-lg bg-surface-muted px-2.5 py-1 font-mono text-xs text-text-secondary">
            {product.totalReviews.toLocaleString("en-IN")} reviews
          </span>
          <BuyOrCryBadge verdict={product.aiAnalysis.buyOrCry} />
        </div>

        <p className="mb-4 flex-1 text-xs italic leading-relaxed text-text-secondary">
          &ldquo;{product.sarcasticVerdict}&rdquo;
        </p>

        <div className="flex items-center gap-2">
          <AddToCartButton product={product} size="sm" />
          <Link
            href={`/reviews/${product.slug}/`}
            className="inline-flex items-center rounded-lg bg-surface-muted px-3 py-1.5 font-mono text-xs text-text-secondary transition hover:bg-border hover:text-text"
          >
            Full Review →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const totalFakeReviews = products.reduce(
    (sum, p) => sum + Math.round(p.totalReviews * (p.fakeReviewPercent / 100)),
    0
  );
  const avgFakePercent = Math.round(
    products.reduce((sum, p) => sum + p.fakeReviewPercent, 0) / products.length
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* ═══ HERO ═══ */}
      <header className="py-16 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="font-mono text-xs text-primary">
            🎭 POC v0.1 — Stub Data Mode
          </span>
        </div>
        <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
          <span className="text-primary">Paisa</span>
          <span className="text-accent">Barbad</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-display text-xl text-text-secondary md:text-2xl">
          We read the reviews so you don&apos;t have to{" "}
          <span className="text-accent">cry later</span>.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted">
          India&apos;s first sarcasm-powered review aggregator. AI analysis that
          cuts through the fake ⭐⭐⭐⭐⭐ propaganda from Amazon.in &amp;
          Flipkart.
        </p>
      </header>

      {/* ═══ BENTO STATS ═══ */}
      <section className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
        {/* Large stat — spans 2 cols + 2 rows */}
        <div className="bento-card col-span-2 row-span-2 flex flex-col items-center justify-center p-8 accent-gradient">
          <p className="mb-2 font-mono text-sm uppercase tracking-wider text-text-muted">
            Fake Reviews Detected
          </p>
          <p className="font-display text-5xl font-bold text-primary md:text-6xl">
            {totalFakeReviews.toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-sm text-text-muted">and counting…</p>
        </div>
        {/* Stat 2 */}
        <div className="bento-card flex flex-col items-center justify-center p-6">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-text-muted">
            Average Fake %
          </p>
          <p className="font-display text-4xl font-bold text-lie-red">
            {avgFakePercent}%
          </p>
          <p className="mt-1 text-xs text-text-muted">of 5-star reviews</p>
        </div>
        {/* Stat 3 */}
        <div className="bento-card flex flex-col items-center justify-center p-6">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-text-muted">
            Products Roasted
          </p>
          <p className="font-display text-4xl font-bold text-roast-orange">
            {products.length}
          </p>
          <p className="mt-1 text-xs text-text-muted">no product is safe</p>
        </div>
        {/* Stat 4 — spans 2 cols */}
        <div className="bento-card col-span-2 flex items-center justify-between p-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Platforms Tracked
            </p>
            <p className="mt-1 font-display text-lg font-bold text-text">
              Amazon.in &amp; Flipkart
            </p>
          </div>
          <span className="text-3xl">🛒</span>
        </div>
      </section>

      {/* ═══ HOW IT WORKS — Bento ═══ */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold text-text">
          How <span className="text-roast-orange">PaisaBarbad</span> Works
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              icon: "🕵️",
              title: "Scrape & Collect",
              desc: "We vacuum up thousands of reviews from Amazon.in, Flipkart, and more. Yes, even the ones that say 'good product nice quality fast delivery'.",
            },
            {
              step: "02",
              icon: "🤖",
              title: "AI Sarcasm Engine",
              desc: "Our AI doesn't just analyze sentiment — it translates corporate shill-speak into what reviewers ACTUALLY mean. No sugar-coating.",
            },
            {
              step: "03",
              icon: "💀",
              title: "Reality Score",
              desc: "Every product gets a Reality Score™ — computed from genuine review ratio, sentiment analysis, and how many reviews were posted suspiciously fast.",
            },
          ].map((item) => (
            <div key={item.step} className="bento-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                  {item.step}
                </span>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-text">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED ROASTS — Bento ═══ */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-text">
            Latest <span className="text-lie-red">Roasts</span> 🔥
          </h2>
          <Link
            href="/reviews/"
            className="font-mono text-sm text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ═══ WHAT THEY SAY vs WHAT THEY MEAN — Bento ═══ */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold text-text">
          What They <span className="text-genuine-green">Say</span> vs What They{" "}
          <span className="text-lie-red">Mean</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => (
            <div key={p.slug} className="bento-card p-6">
              <p className="mb-3 font-mono text-xs font-medium text-text-muted">
                {p.productName}
              </p>
              <div className="mb-3 rounded-xl bg-genuine-green/5 p-4 border border-genuine-green/15">
                <p className="mb-1 font-mono text-xs font-medium text-genuine-green">
                  💬 What they say:
                </p>
                <p className="text-sm text-text-secondary">
                  &ldquo;{p.whatTheySay}&rdquo;
                </p>
              </div>
              <div className="rounded-xl bg-lie-red/5 p-4 border border-lie-red/15">
                <p className="mb-1 font-mono text-xs font-medium text-lie-red">
                  🎭 What they mean:
                </p>
                <p className="text-sm text-text-secondary">
                  &ldquo;{p.whatTheyMean}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="mb-16 bento-card accent-gradient p-12 text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Stop Trusting{" "}
          <span className="line-through text-text-muted">5-Star Reviews</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-text-secondary">
          Join the revolution of informed shoppers who prefer brutal honesty
          over polished lies. Coming soon to your browser, powered by AI and
          fueled by sarcasm.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/reviews/"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-display font-bold text-white transition hover:bg-primary-dark"
          >
            Browse Roasted Products →
          </Link>
          <span className="font-mono text-xs text-text-muted">
            Free forever · No fake reviews · Just vibes
          </span>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border py-8 text-center">
        <p className="font-display text-sm text-text-secondary">
          <span className="text-primary">PaisaBarbad</span> · Built with 🎭
          sarcasm and ☕ chai
        </p>
        <p className="mt-1 font-mono text-xs text-text-muted">
          POC — Stub data only · Not affiliated with any e-commerce platform ·
          © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
