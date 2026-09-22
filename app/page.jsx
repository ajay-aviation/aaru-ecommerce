import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import CategoryNav from "@/components/CategoryNav";
import TrustBar from "@/components/TrustBar";
import CategoryFilter from "@/components/CategoryFilter";
import SortBar from "@/components/SortBar";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ProductGrid, ProductRail } from "@/components/ProductGrid";
import {
  queryProducts,
  getDealsOfTheDay,
  getFeaturedByCategory,
  CATEGORIES,
} from "@/lib/products";

export function generateMetadata({ searchParams }) {
  const q = searchParams?.q || "";
  const category = searchParams?.category || "";
  const categoryName = category
    ? CATEGORIES.find((c) => c.slug === category)?.name
    : "";

  if (q) {
    return {
      title: `"${q}" — Search results | AARU`,
      description: `Search results for "${q}" on AARU — 1,200+ products across 20 categories.`,
    };
  }
  if (categoryName) {
    return {
      title: `${categoryName} — Shop online | AARU`,
      description: `Shop ${categoryName} on AARU. Free delivery on orders above ₹499, 7-day returns, secure payments.`,
    };
  }
  return {};
}

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
  const categoryName = category
    ? CATEGORIES.find((c) => c.slug === category)?.name
    : "";

  const crumbs = [{ label: "Home", href: "/" }];
  if (q) crumbs.push({ label: `Search: "${q}"` });
  else if (categoryName) crumbs.push({ label: categoryName });

  return (
    <div>
      {!isBrowsing && (
        <>
          <div className="mb-8">
            <HeroBanner />
          </div>
          <div className="mb-10">
            <CategoryNav />
          </div>
          <TrustBar />
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
            <>
              <Breadcrumbs items={crumbs} />
              <h1 className="font-display text-xl font-bold mb-3">
                {q ? `Results for "${q}"` : category
                  ? categoryName || "Products"
                  : "All Products"}
              </h1>
            </>
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
