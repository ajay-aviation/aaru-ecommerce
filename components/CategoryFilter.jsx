"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, getBrandsForCategory } from "@/lib/products";

const RATING_OPTIONS = [4, 3, 2];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minRating = searchParams.get("minRating") || "";
  const brand = searchParams.get("brand") || "";

  const [priceMin, setPriceMin] = useState(minPrice);
  const [priceMax, setPriceMax] = useState(maxPrice);

  const brands = getBrandsForCategory(active).slice(0, 12);

  function hrefFor(slug) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (slug) params.set("category", slug);
    return `/?${params.toString()}`;
  }

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/?${params.toString()}`);
  }

  function applyPriceRange(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (priceMin) params.set("minPrice", priceMin);
    else params.delete("minPrice");
    if (priceMax) params.set("maxPrice", priceMax);
    else params.delete("maxPrice");
    params.delete("page");
    router.push(`/?${params.toString()}`);
  }

  const hasActiveFilters = minPrice || maxPrice || minRating || brand;

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    ["minPrice", "maxPrice", "minRating", "brand", "page"].forEach((k) => params.delete(k));
    setPriceMin("");
    setPriceMax("");
    router.push(`/?${params.toString()}`);
  }

  return (
    <aside className="w-full md:w-56 shrink-0 space-y-5">
      <div>
        <h3 className="font-semibold text-sm text-ink mb-2">Categories</h3>
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
          <Link
            href={hrefFor("")}
            className={`text-sm px-3 py-1.5 rounded whitespace-nowrap ${
              !active ? "bg-brand text-white" : "bg-white border border-black/5 text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Categories
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={hrefFor(c.slug)}
              className={`text-sm px-3 py-1.5 rounded whitespace-nowrap ${
                active === c.slug ? "bg-brand text-white" : "bg-white border border-black/5 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-ink mb-2">Price range</h3>
        <form onSubmit={applyPriceRange} className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          />
          <span className="text-muted text-sm">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          />
        </form>
        <button
          onClick={applyPriceRange}
          className="mt-2 text-xs font-medium text-brand hover:underline"
        >
          Apply
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-ink mb-2">Customer rating</h3>
        <div className="space-y-1.5">
          {RATING_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => updateParam("minRating", minRating === String(r) ? "" : String(r))}
              className={`flex items-center gap-1.5 text-sm w-full text-left px-2 py-1 rounded ${
                minRating === String(r) ? "bg-brand/[0.08] text-brand font-medium" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="bg-emerald-600 text-white px-1 rounded text-xs font-semibold">{r}★</span>
              & above
            </button>
          ))}
        </div>
      </div>

      {brands.length > 1 && (
        <div>
          <h3 className="font-semibold text-sm text-ink mb-2">Brand</h3>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => updateParam("brand", brand === b ? "" : b)}
                className={`block w-full text-left text-sm px-2 py-1 rounded ${
                  brand === b ? "bg-brand/[0.08] text-brand font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-xs font-medium text-rose-600 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}
