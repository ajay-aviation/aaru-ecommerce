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
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
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
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} AARU. Demo storefront — not a real store.
      </div>
    </footer>
  );
}
