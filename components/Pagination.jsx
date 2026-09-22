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

  const windowSize = 2; // pages shown on each side of current
  const start = Math.max(2, page - windowSize);
  const end = Math.min(totalPages - 1, page + windowSize);

  const middle = [];
  for (let p = start; p <= end; p++) middle.push(p);

  const pageLink = (p, key) => (
    <Link
      key={key ?? p}
      href={hrefFor(p)}
      aria-current={p === page ? "page" : undefined}
      className={`min-w-[2.25rem] text-center px-3 py-1.5 rounded border ${
        p === page ? "bg-brand text-white border-brand" : "hover:bg-gray-100"
      }`}
    >
      {p}
    </Link>
  );

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-col items-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <Link
          href={hrefFor(Math.max(1, page - 1))}
          className={`px-3 py-1.5 rounded border ${
            page === 1 ? "pointer-events-none opacity-40" : "hover:bg-gray-100"
          }`}
        >
          ← Prev
        </Link>

        {pageLink(1, "first")}
        {start > 2 && <span className="px-1 text-muted">…</span>}
        {middle.map((p) => pageLink(p))}
        {end < totalPages - 1 && <span className="px-1 text-muted">…</span>}
        {totalPages > 1 && pageLink(totalPages, "last")}

        <Link
          href={hrefFor(Math.min(totalPages, page + 1))}
          className={`px-3 py-1.5 rounded border ${
            page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-gray-100"
          }`}
        >
          Next →
        </Link>
      </div>
      <p className="text-xs text-muted">
        Page {page} of {totalPages.toLocaleString("en-IN")}
      </p>
    </nav>
  );
}
