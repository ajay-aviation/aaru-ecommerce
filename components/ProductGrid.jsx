import ProductCard from "./ProductCard";

export function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="text-center py-16 text-muted">
        No products found. Try a different search or category.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ProductRail({ title, subtitle, products, viewAllHref }) {
  if (!products.length) return null;
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <a href={viewAllHref} className="text-sm font-medium text-brand hover:underline">
            View all →
          </a>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {products.map((p) => (
          <div key={p.id} className="w-40 md:w-48 shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
