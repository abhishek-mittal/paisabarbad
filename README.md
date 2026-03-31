# 🎭 SarcastIQ

> **We read the reviews so you don't have to cry later.**

India's first sarcasm-powered review aggregator. AI analysis that cuts through the fake ⭐⭐⭐⭐⭐ propaganda from Amazon.in & Flipkart.

## What is this?

SarcastIQ collects product reviews from Indian e-commerce platforms and uses AI to:

- **Detect fake reviews** — Flagging bribed, copypasta, and suspicious reviews
- **Translate review-speak** — What they say vs. what they actually mean
- **Generate Reality Scores™** — Because the seller's 4.5★ is NOT your real experience
- **Deliver sarcastic verdicts** — Because the truth doesn't need sugar-coating

## Tech Stack

- **Next.js 15** (App Router, Static Export)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS 4** (dark-mode-first, custom theme)
- **GitHub Pages** deployment

## Status

🏗️ **POC / Stub Data** — Currently using hardcoded mock data to demonstrate the concept.

## Development

```bash
pnpm install
pnpm dev
```

## Build & Deploy

```bash
GITHUB_PAGES=true pnpm build
```

Deploys automatically to GitHub Pages on push to `main`.

## License

MIT
