"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SLIDES = [
  {
    title: "Big Value Days",
    subtitle: "Up to 60% off across Electronics, Fashion & Home",
    cta: "Shop the sale",
    href: "/?sort=discount",
    bg: "bg-gradient-to-r from-brand to-brand-dark",
  },
  {
    title: "No Cost EMI",
    subtitle: "On mobiles, laptops & large appliances — zero processing fee",
    cta: "Explore offers",
    href: "/?category=mobiles",
    bg: "bg-gradient-to-r from-emerald-700 to-emerald-900",
  },
  {
    title: "New Season Fashion",
    subtitle: "Fresh drops in Men's & Women's wear, starting ₹349",
    cta: "Browse fashion",
    href: "/?category=fashion-men",
    bg: "bg-gradient-to-r from-rose-700 to-rose-900",
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className={`relative overflow-hidden rounded-lg ${slide.bg} text-white transition-colors`}>
      <div className="px-6 py-10 md:px-12 md:py-16 max-w-xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{slide.title}</h1>
        <p className="text-white/85 mb-5">{slide.subtitle}</p>
        <Link
          href={slide.href}
          className="inline-block bg-accent text-brand-dark font-semibold px-5 py-2 rounded-sm hover:opacity-90"
        >
          {slide.cta}
        </Link>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* permanent value-prop strip — not tied to the rotating sale banner */}
      <div className="absolute top-3 right-3 hidden md:flex gap-2 text-[11px]">
        <span className="bg-white/15 backdrop-blur px-2 py-1 rounded">Free delivery ₹499+</span>
        <span className="bg-white/15 backdrop-blur px-2 py-1 rounded">7-day returns</span>
      </div>
    </div>
  );
}
