import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import { categoryStyle } from "@/lib/category-style";

export default function CategoryNav() {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
      {CATEGORIES.map((c) => {
        const s = categoryStyle(c.slug);
        return (
          <Link
            key={c.slug}
            href={`/?category=${c.slug}`}
            className="group flex flex-col items-center gap-2 shrink-0 w-20"
          >
            <span
              className="h-14 w-14 rounded-full flex items-center justify-center text-2xl shadow-card transition-transform group-hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${s.dark}, ${s.light})` }}
            >
              {s.icon}
            </span>
            <span className="text-[11px] text-center leading-tight text-ink/80 group-hover:text-brand font-medium">
              {c.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
