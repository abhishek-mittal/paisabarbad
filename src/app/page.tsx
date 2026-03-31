import Link from "next/link";
import { products } from "@/lib/stub-data";

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
      <div className="h-2 w-full rounded-full bg-void-lighter">
        <div
          className={`h-2 rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-sm font-bold tabular-nums">
        {score.toFixed(1)}
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

function BuyOrCryBadge({ verdict }: { verdict: "buy" | "cry" | "maybe" }) {
  const styles = {
    buy: "from-genuine-green/20 to-genuine-green/5 text-genuine-green border-genuine-green/40",
    cry: "from-lie-red/20 to-lie-red/5 text-lie-red border-lie-red/40",
    maybe:
      "from-suspicious-yellow/20 to-suspicious-yellow/5 text-suspicious-yellow border-suspicious-yellow/40",
  };
  const labels = { buy: "🛒 BUY IT", cry: "😭 CRY ABOUT IT", maybe: "🤷 MAYBE" };
  return (
    <span
      className={`inline-flex items-center rounded-lg border bg-gradient-to-r px-3 py-1 font-display text-sm font-bold ${styles[verdict]}`}
    >
      {labels[verdict]}
    </span>
  );
}

function StatCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="gradient-border rounded-xl bg-void-gray p-6 text-center">
      <p className="mb-1 font-mono text-sm uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p className="font-display text-4xl font-bold text-toxic-green">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{subtext}</p>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <Link
      href={`/reviews/${product.slug}/`}
      className="gradient-border group block rounded-2xl bg-void-gray p-6 transition-all hover:bg-void-lighter"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-gray-500">
            {product.category} · {product.source}
          </p>
          <h3 className="font-display text-lg font-bold text-white group-hover:text-toxic-green transition-colors">
            {product.productName}
          </h3>
          <p className="text-sm text-gray-400">{product.brand}</p>
        </div>
        <span className="font-display text-xl font-bold text-sarcasm-pink">
          {product.price}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gray-500">
            Seller&apos;s Delusion ⭐
          </p>
          <p className="font-bold text-white">{product.sellerRating}/5</p>
        </div>
        <div>
          <p className="mb-1 font-mono text-xs text-gray-500">Reality Score 💀</p>
          <RealityMeter score={product.realityScore} />
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 items-center rounded-lg bg-lie-red/10 px-3">
          <span className="font-mono text-sm font-bold text-lie-red">
            {product.fakeReviewPercent}% Fake
          </span>
        </div>
        <div className="flex h-10 items-center rounded-lg bg-void-lighter px-3">
          <span className="font-mono text-sm text-gray-300">
            {product.totalReviews.toLocaleString("en-IN")} reviews
          </span>
        </div>
        <BuyOrCryBadge verdict={product.aiAnalysis.buyOrCry} />
      </div>

      <p className="text-sm italic text-gray-400 leading-relaxed">
        &ldquo;{product.sarcasticVerdict}&rdquo;
      </p>
    </Link>
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
        <div className="mb-6 inline-flex items-center rounded-full border border-sarcasm-pink/30 bg-sarcasm-pink/10 px-4 py-1.5">
          <span className="font-mono text-xs text-sarcasm-pink">
            🎭 POC v0.1 — Stub Data Mode
          </span>
        </div>
        <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
          <span className="glow-green text-toxic-green">Sarcasti</span>
          <span className="glow-pink text-sarcasm-pink">Q</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-display text-xl text-gray-300 md:text-2xl">
          We read the reviews so you don&apos;t have to{" "}
          <span className="text-sarcasm-pink">cry later</span>.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
          India&apos;s first sarcasm-powered review aggregator. AI analysis that
          cuts through the fake ⭐⭐⭐⭐⭐ propaganda from Amazon.in &amp;
          Flipkart.
        </p>
      </header>

      {/* ═══ STATS ═══ */}
      <section className="mb-16 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Fake Reviews Detected"
          value={totalFakeReviews.toLocaleString("en-IN")}
          subtext="and counting…"
        />
        <StatCard
          label="Average Fake %"
          value={`${avgFakePercent}%`}
          subtext="of all 5-star reviews are suspicious"
        />
        <StatCard
          label="Products Roasted"
          value={products.length.toString()}
          subtext="no product is safe"
        />
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold text-white">
          How <span className="text-roast-orange">SarcastIQ</span> Works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
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
            <div
              key={item.step}
              className="gradient-border rounded-xl bg-void-gray p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-sm text-toxic-green">
                  {item.step}
                </span>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED ROASTS ═══ */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-white">
            Latest <span className="text-lie-red">Roasts</span> 🔥
          </h2>
          <Link
            href="/reviews/"
            className="font-mono text-sm text-toxic-green hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ═══ WHAT THEY SAY vs WHAT THEY MEAN ═══ */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold text-white">
          What They <span className="text-genuine-green">Say</span> vs What They{" "}
          <span className="text-lie-red">Mean</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {products.slice(0, 3).map((p) => (
            <div
              key={p.slug}
              className="gradient-border rounded-xl bg-void-gray p-6"
            >
              <p className="mb-1 font-mono text-xs text-gray-500">
                {p.productName}
              </p>
              <div className="mb-3 rounded-lg bg-genuine-green/5 p-3">
                <p className="mb-1 font-mono text-xs text-genuine-green">
                  💬 What they say:
                </p>
                <p className="text-sm text-gray-300">&ldquo;{p.whatTheySay}&rdquo;</p>
              </div>
              <div className="rounded-lg bg-lie-red/5 p-3">
                <p className="mb-1 font-mono text-xs text-lie-red">
                  🎭 What they mean:
                </p>
                <p className="text-sm text-gray-300">&ldquo;{p.whatTheyMean}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="mb-16 rounded-2xl bg-gradient-to-r from-sarcasm-pink/10 via-void-gray to-toxic-green/10 p-12 text-center">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
          Stop Trusting{" "}
          <span className="line-through text-gray-500">5-Star Reviews</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-gray-400">
          Join the revolution of informed shoppers who prefer brutal honesty
          over polished lies. Coming soon to your browser, powered by AI and
          fueled by sarcasm.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/reviews/"
            className="inline-flex items-center rounded-lg bg-toxic-green px-6 py-3 font-display font-bold text-void-black transition hover:bg-toxic-green/80"
          >
            Browse Roasted Products →
          </Link>
          <span className="font-mono text-xs text-gray-500">
            Free forever · No fake reviews · Just vibes
          </span>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-void-lighter py-8 text-center">
        <p className="font-display text-sm text-gray-500">
          <span className="text-toxic-green">SarcastIQ</span> · Built with 🎭
          sarcasm and ☕ chai
        </p>
        <p className="mt-1 font-mono text-xs text-gray-600">
          POC — Stub data only · Not affiliated with any e-commerce platform ·
          © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
