"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/products";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";

  function hrefFor(slug) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (slug) params.set("category", slug);
    return `/?${params.toString()}`;
  }

  return (
    <aside className="w-full md:w-52 shrink-0">
      <h3 className="font-semibold text-sm text-gray-900 mb-2">Categories</h3>
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
        <Link
          href={hrefFor("")}
          className={`text-sm px-3 py-1.5 rounded whitespace-nowrap ${
            !active ? "bg-brand text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Categories
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={hrefFor(c.slug)}
            className={`text-sm px-3 py-1.5 rounded whitespace-nowrap ${
              active === c.slug ? "bg-brand text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
