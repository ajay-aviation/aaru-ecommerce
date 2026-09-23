import productsData from "./products-data.json";
import categoriesData from "./categories-data.json";

const ALL_PRODUCTS = productsData;
export const CATEGORIES = categoriesData;

export function formatPrice(paise) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise);
}

const PAGE_SIZE = 24;

/**
 * Query the static catalog with search / category / pagination.
 * Mirrors the shape returned by the DB-backed query in get-products.js
 * so the UI doesn't need to know which source it came from.
 */
export function queryProducts({
  q = "",
  category = "",
  page = 1,
  sort = "",
  minPrice = "",
  maxPrice = "",
  minRating = "",
  brand = "",
} = {}) {
  let results = ALL_PRODUCTS;

  if (category) {
    results = results.filter((p) => p.categorySlug === category);
  }

  if (q) {
    const needle = q.trim().toLowerCase();
    if (needle) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.brand.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle)
      );
    }
  }

  if (minPrice) results = results.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) results = results.filter((p) => p.price <= Number(maxPrice));
  if (minRating) results = results.filter((p) => p.rating >= Number(minRating));
  if (brand) results = results.filter((p) => p.brand === brand);

  if (sort === "price-asc") {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    results = [...results].sort((a, b) => b.rating - a.rating);
  } else if (sort === "discount") {
    results = [...results].sort((a, b) => b.discountPct - a.discountPct);
  }

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const items = results.slice(start, start + PAGE_SIZE);

  return { items, total, page: safePage, totalPages, pageSize: PAGE_SIZE };
}

export function getBrandsForCategory(categorySlug) {
  const pool = categorySlug ? ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug) : ALL_PRODUCTS;
  return [...new Set(pool.map((p) => p.brand))].sort();
}

export function getProductBySlug(slug) {
  return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getRelatedProducts(product, count = 8) {
  if (!product) return [];
  return ALL_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, count);
}

export function getFeaturedByCategory(categorySlug, count = 10) {
  return ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

export function getDealsOfTheDay(count = 12) {
  return [...ALL_PRODUCTS]
    .filter((p) => p.discountPct >= 30)
    .sort((a, b) => b.discountPct - a.discountPct)
    .slice(0, count);
}
