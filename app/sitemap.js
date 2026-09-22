import { CATEGORIES } from "@/lib/products";
import productsData from "@/lib/products-data.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aaru-ecommerce.netlify.app";

export default function sitemap() {
  const now = new Date();

  const staticEntries = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  const categoryEntries = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/?category=${c.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productEntries = productsData.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
