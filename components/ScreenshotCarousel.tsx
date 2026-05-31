"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type ScreenshotCarouselProps = {
  screenshots: string[];
  name: string;
};

export function ScreenshotCarousel({ screenshots, name }: ScreenshotCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = screenshots[index];

  if (!current) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-dashed border-line bg-surface text-muted">
        Screenshots coming soon
      </div>
    );
  }

  function move(direction: -1 | 1) {
    setIndex((value) => (value + direction + screenshots.length) % screenshots.length);
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface shadow-card">
        <Image
          src={current}
          alt={`${name} screenshot ${index + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
        <button
          type="button"
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/10 bg-ink/80 text-white backdrop-blur transition hover:bg-accent"
          onClick={() => move(-1)}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/10 bg-ink/80 text-white backdrop-blur transition hover:bg-accent"
          onClick={() => move(1)}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {screenshots.map((screenshot, screenshotIndex) => (
          <button
            key={screenshot}
            type="button"
            onClick={() => setIndex(screenshotIndex)}
            className={`relative aspect-[16/10] overflow-hidden rounded-md border ${
              screenshotIndex === index ? "border-accent" : "border-line"
            }`}
            aria-label={`View screenshot ${screenshotIndex + 1}`}
          >
            <Image src={screenshot} alt="" fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
