"use client";

import { useState } from "react";
import { PaisaBarbadStamp } from "./PaisaBarbadStamp";

interface ImageSwitcherProps {
  officialImages: string[];
  reviewImages: string[];
  productName: string;
  verdict: "buy" | "cry" | "maybe";
}

export function ImageSwitcher({
  officialImages,
  reviewImages,
  productName,
  verdict,
}: ImageSwitcherProps) {
  const [mode, setMode] = useState<"official" | "review">("official");
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = mode === "official" ? officialImages : reviewImages;
  const currentImage = images[currentIndex] ?? images[0];

  function switchMode(next: "official" | "review") {
    setMode(next);
    setCurrentIndex(0);
  }

  return (
    <div>
      {/* Toggle buttons */}
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => switchMode("official")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition ${
            mode === "official"
              ? "bg-primary text-white"
              : "bg-surface-muted text-text-secondary hover:bg-border"
          }`}
        >
          📸 Official Photo
        </button>
        <button
          onClick={() => switchMode("review")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition ${
            mode === "review"
              ? "bg-accent text-white"
              : "bg-surface-muted text-text-secondary hover:bg-border"
          }`}
        >
          👤 Review Photo
        </button>
      </div>

      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage}
          alt={
            mode === "official"
              ? `${productName} official product photo`
              : `${productName} customer review photo`
          }
          className="h-full w-full object-cover"
        />

        {verdict === "cry" && <PaisaBarbadStamp size="lg" />}

        <div
          className={`absolute bottom-2 left-2 rounded-lg px-2 py-1 font-mono text-xs font-medium ${
            mode === "official" ? "bg-primary/90 text-white" : "bg-accent/90 text-white"
          }`}
        >
          {mode === "official" ? "📸 Seller's Photo" : "👤 Customer Reality"}
        </div>

        {mode === "review" && verdict === "cry" && (
          <div className="absolute right-2 top-2 rounded-lg bg-red-600/90 px-2 py-1 font-mono text-xs font-bold text-white">
            😭 Reality Check
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-2 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-12 w-12 overflow-hidden rounded-lg border-2 transition ${
                i === currentIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {mode === "review" && (
        <p className="mt-2 font-mono text-xs text-text-muted">
          ⚠️ Review photos show what customers actually received
        </p>
      )}
    </div>
  );
}
