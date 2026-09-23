"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function AddToCartForm({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();
  const hasAffiliateLink = Boolean(product.affiliateLink);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    if (hasAffiliateLink) {
      window.open(product.affiliateLink, "_blank", "noopener,noreferrer");
      return;
    }
    addItem(product, qty);
    router.push("/checkout");
  }

  return (
    <div className="space-y-3">
      {hasAffiliateLink && (
        <p className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-3 py-1.5">
          ✅ Verified real listing — "Buy Now" takes you to Amazon.in to complete purchase.
        </p>
      )}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">Quantity</span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-1 text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="px-3 py-1 text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex gap-3">
        {!hasAffiliateLink && (
          <button
            onClick={handleAdd}
            className="flex-1 bg-accent text-brand-dark font-semibold py-3 rounded-sm hover:opacity-90"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        )}
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-brand text-white font-semibold py-3 rounded-sm hover:bg-brand-dark"
        >
          {hasAffiliateLink ? "Buy Now on Amazon ↗" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
