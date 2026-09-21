"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { getProductBySlug } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const products = slugs.map(getProductBySlug).filter(Boolean);

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-4">
        My Wishlist {products.length > 0 && `(${products.length})`}
      </h1>
      {products.length === 0 ? (
        <p className="text-muted text-sm">
          Nothing here yet. Tap the ♡ on any product to save it for later.
        </p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
