# PaisaBarbad — Product Vision & Agent Context

## Identity

**Name:** PaisaBarbad (पैसा बर्बाद)
**Tagline:** "We read the reviews so you don't have to cry later."
**Domain:** PaisaBarbad.com
**Tone:** Sarcastic, brutally honest, irreverent — but never cruel to real users.

## Problem

Indian e-commerce is drowning in fake reviews. Sellers game the system with incentivized ratings, copypasta templates, and review farms. Shoppers waste money trusting manufactured consensus — their paisa gets barbad.

Key stats driving the product:
- ~60-70% of 5-star reviews on Indian platforms show patterns of manipulation
- Review text rarely matches the actual star rating ("good product" → 1★)
- Buyers have no signal to separate genuine feedback from paid noise

## Solution

An AI-powered review aggregator that:

1. **Scrapes** product reviews from Amazon.in, Flipkart, and other Indian e-commerce platforms
2. **Classifies** each review as genuine, suspicious, copypasta, or bribed
3. **Computes a Reality Score™** — the actual quality score after filtering out noise
4. **Generates sarcastic verdicts** — translating corporate-speak into what reviewers actually mean
5. **Delivers a Buy or Cry™ verdict** — the final call: buy it, cry about it, or maybe

## Core Concepts

| Concept | Description |
|---|---|
| **Reality Score™** | 0-5 score computed from genuine review ratio, sentiment, and timing analysis |
| **Buy or Cry™** | Final AI verdict: `buy` / `cry` / `maybe` |
| **Sarcastic Verdict** | One-liner that captures the product's truth in the most entertaining way |
| **What They Say vs What They Mean** | Side-by-side translation of review-speak to reality |
| **Review Flags** | `genuine` · `suspicious` · `copypasta` · `bribed` — every review gets tagged |
| **Seller's Delusion** | The inflated rating the seller shows vs. Reality Score |

## Data Model

```
ProductReview
├── slug, productName, brand, category, price, source
├── sellerRating (what they claim)
├── realityScore (what's real)
├── fakeReviewPercent
├── sarcasticVerdict
├── whatTheySay / whatTheyMean
├── aiAnalysis
│   ├── sentimentBreakdown { genuine, suspicious, copypasta, bribed }
│   ├── topSarcasticInsight
│   ├── realPros[], realCons[]
│   └── buyOrCry: "buy" | "cry" | "maybe"
└── reviews[]
    ├── author, rating, text
    ├── sarcasticTranslation
    └── flagged: "genuine" | "suspicious" | "copypasta" | "bribed"
```

## Design Language

- **Theme:** Dark-mode-first with neon accents (toxic green, sarcasm pink, roast orange)
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (data/mono)
- **Palette:** Void black base, color-coded review flags (green=genuine, yellow=suspicious, purple=copypasta, orange=bribed, red=lie)
- **Vibe:** Cyberpunk meets consumer activism — feels like a hacker terminal exposing the truth

## Architecture

- **Next.js 15** App Router, static export
- **React 19** + **TypeScript 5.7** strict
- **Tailwind CSS 4** with custom theme tokens
- **GitHub Pages** for deployment (basePath: `/paisabarbad` when on GH Pages)
- **pnpm** package manager

## Roadmap

### Phase 0 — POC (current)
- [x] Static site with stub data (6 mock products)
- [x] Landing page with hero, stats, how-it-works
- [x] Product listing and detail pages
- [x] GitHub Pages deployment

### Phase 1 — Real Data
- [ ] Playwright scraper for Amazon.in product reviews
- [ ] Playwright scraper for Flipkart product reviews
- [ ] Review storage (JSON files or SQLite)
- [ ] Build-time data ingestion for static generation

### Phase 2 — AI Analysis
- [ ] LLM-powered review classification (genuine/suspicious/copypasta/bribed)
- [ ] Reality Score computation algorithm
- [ ] Sarcastic verdict generation
- [ ] "What they say vs what they mean" generation

### Phase 3 — Scale & Features
- [ ] Search and filter by category, brand, price range
- [ ] Browser extension for inline reality scores on Amazon/Flipkart
- [ ] User-submitted product requests
- [ ] Trending "most barbad" products leaderboard
- [ ] Email digest: "This week's biggest paisa barbad products"

## Agent Guidelines

When working on this project:

- **Preserve the sarcastic tone** — every user-facing string should have personality
- **Never water down the honesty** — the whole point is brutal truth
- **Indian context matters** — prices in ₹, platforms are Amazon.in & Flipkart, cultural references are Indian
- **SEO/AEO first** — every page needs proper metadata, structured data potential
- **Static export** — no server required, everything builds to static HTML
- **Dark mode only** — this is not a "light theme" kind of product
