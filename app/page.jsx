import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import CategoryFilter from "@/components/CategoryFilter";
import SortBar from "@/components/SortBar";
import Pagination from "@/components/Pagination";
import { ProductGrid, ProductRail } from "@/components/ProductGrid";
import {
  queryProducts,
  getDealsOfTheDay,
  getFeaturedByCategory,
  CATEGORIES,
} from "@/lib/products";

export default function HomePage({ searchParams }) {
  const q = searchParams?.q || "";
  const category = searchParams?.category || "";
  const page = parseInt(searchParams?.page || "1", 10);
  const sort = searchParams?.sort || "";

  const { items, total, page: currentPage, totalPages } = queryProducts({
    q,
    category,
    page,
    sort,
  });

  const isBrowsing = Boolean(q || category || sort || page > 1);

  return (
    <div>
      {!isBrowsing && (
        <>
          <div className="mb-8">
            <HeroBanner />
          </div>
          <ProductRail
            title="Deals of the Day"
            subtitle="Up to 60% off — refreshed daily"
            products={getDealsOfTheDay(12)}
            viewAllHref="/?sort=discount"
          />
          {CATEGORIES.slice(0, 6).map((c) => (
            <ProductRail
              key={c.slug}
              title={c.name}
              products={getFeaturedByCategory(c.slug, 10)}
              viewAllHref={`/?category=${c.slug}`}
            />
          ))}
        </>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <Suspense fallback={<div className="w-52 shrink-0" />}>
          <CategoryFilter />
        </Suspense>
        <div className="flex-1 min-w-0">
          {isBrowsing && (
            <h1 className="font-display text-xl font-bold mb-3">
              {q ? `Results for "${q}"` : category
                ? CATEGORIES.find((c) => c.slug === category)?.name || "Products"
                : "All Products"}
            </h1>
          )}
          <Suspense fallback={null}>
            <SortBar total={total} />
          </Suspense>
          <ProductGrid products={items} />
          <Suspense fallback={null}>
            <Pagination page={currentPage} totalPages={totalPages} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
