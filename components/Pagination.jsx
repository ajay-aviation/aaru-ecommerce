"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({ page, totalPages }) {
  const searchParams = useSearchParams();

  function hrefFor(p) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `/?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 text-sm">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        className={`px-3 py-1.5 rounded border ${
          page === 1 ? "pointer-events-none opacity-40" : "hover:bg-gray-100"
        }`}
      >
        ← Prev
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          className={`px-3 py-1.5 rounded border ${
            p === page ? "bg-brand text-white border-brand" : "hover:bg-gray-100"
          }`}
        >
          {p}
        </Link>
      ))}
      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        className={`px-3 py-1.5 rounded border ${
          page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-gray-100"
        }`}
      >
        Next →
      </Link>
    </div>
  );
}
