"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice } from "@/lib/products";
import { categoryStyle } from "@/lib/category-style";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.slug);
  const style = categoryStyle(product.categorySlug);

  return (
    <div className="group relative bg-white border border-black/5 rounded-lg overflow-hidden shadow-card hover:shadow-cardHover transition-shadow">
      <button
        onClick={() => toggle(product.slug)}
        aria-label="Toggle wishlist"
        className={`absolute top-2 right-2 z-10 h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors ${
          wishlisted ? "bg-rose-600 text-white" : "bg-white/90 text-gray-500 hover:text-rose-600"
        }`}
      >
        {wishlisted ? "♥" : "♡"}
      </button>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-canvas">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
          {product.discountPct > 0 && (
            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded">
              {product.discountPct}% off
            </span>
          )}
        </div>
        <div className="p-3">
          <p className="flex items-center gap-1.5 text-xs text-muted mb-0.5">
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: style.light }}
            />
            {product.brand}
          </p>
          <h3 className="text-sm font-medium text-ink line-clamp-2 min-h-[2.5em]">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-xs">
            <span className="bg-emerald-600 text-white px-1 rounded font-semibold">
              {product.rating} ★
            </span>
            <span className="text-muted">({product.reviewCount.toLocaleString("en-IN")})</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-semibold text-ink text-[15px]">{formatPrice(product.price)}</span>
            {product.discountPct > 0 && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <span className="text-[10px] text-brand bg-brand/[0.06] px-1.5 py-0.5 rounded">
              No Cost EMI
            </span>
            <span className="text-[10px] text-brand bg-brand/[0.06] px-1.5 py-0.5 rounded">
              Free delivery
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => addItem(product, 1)}
        className="w-full border-t border-black/5 py-2 text-sm font-medium text-brand hover:bg-brand hover:text-white transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
}
