"use client";

import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistButton({ slug, className = "" }) {
  const { toggle, isWishlisted } = useWishlist();
  const active = isWishlisted(slug);

  return (
    <button
      onClick={() => toggle(slug)}
      className={`flex items-center gap-2 border rounded-sm px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? "border-rose-600 text-rose-600 bg-rose-50"
          : "border-gray-300 text-gray-700 hover:border-gray-400"
      } ${className}`}
    >
      <span>{active ? "♥" : "♡"}</span>
      {active ? "Wishlisted" : "Add to Wishlist"}
    </button>
  );
}
