import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SarcastIQ — We Read Reviews So You Don't Have to Cry Later",
  description:
    "India's first sarcasm-powered review aggregator. AI-analyzed product reviews from Amazon.in & Flipkart that cut through the fake 5-star propaganda and show you the brutal truth.",
  keywords: [
    "product reviews",
    "fake review detector",
    "amazon india reviews",
    "flipkart reviews",
    "sarcastic reviews",
    "honest reviews",
    "review analysis",
    "AI review analyzer",
  ],
  openGraph: {
    title: "SarcastIQ — The Truth Behind Your ⭐⭐⭐⭐⭐ Reviews",
    description:
      "AI-powered sarcasm that exposes what product reviews ACTUALLY mean. Because 68% of 5-star reviews are written by the seller's cousin.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SarcastIQ — Brutally Honest Review Intelligence",
    description:
      "We read the reviews so you don't have to cry later. AI-powered truth from Indian e-commerce.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-void-black antialiased">{children}</body>
    </html>
  );
}
