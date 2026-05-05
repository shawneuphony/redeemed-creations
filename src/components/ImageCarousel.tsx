"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  url: string;
  alt: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
  heightClass?: string;
}

export default function ImageCarousel({
  slides,
  autoPlayInterval = 5000,
  className = "",
  heightClass = "h-64 md:h-80",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-2xl", heightClass, className)}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.url}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur transition"
        aria-label="Previous"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur transition"
        aria-label="Next"
      >
        <ArrowRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              idx === current ? "bg-pink-700" : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}