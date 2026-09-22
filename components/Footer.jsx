import Link from "next/link";
import { CATEGORIES } from "@/lib/products";

export default function Footer() {
  const cols = [
    CATEGORIES.slice(0, 5),
    CATEGORIES.slice(5, 10),
    CATEGORIES.slice(10, 15),
    CATEGORIES.slice(15, 20),
  ];

  return (
    <footer className="bg-brand-dark text-white/80 mt-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-8 border-b border-white/10">
          <div>
            <span className="font-display text-2xl font-bold text-white">
              AAR<span className="text-accent">U</span>
            </span>
            <p className="text-sm text-white/60 mt-1 max-w-sm">
              20 categories, one checkout. Everyday shopping for Indian homes,
              from mobiles to groceries.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-white/60">
            <span>🔒 Secure payments</span>
            <span>🚚 Pan-India delivery</span>
            <span>↩️ 7-day returns</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {cols.map((col, i) => (
            <div key={i}>
              {col.map((c) => (
                <Link key={c.slug} href={`/?category=${c.slug}`} className="block py-1 hover:text-accent">
                  {c.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} AARU. Demo storefront — not a real store.
      </div>
    </footer>
  );
}
