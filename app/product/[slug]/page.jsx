import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, formatPrice } from "@/lib/products";
import AddToCartForm from "@/components/AddToCartForm";
import WishlistButton from "@/components/WishlistButton";
import Reviews from "@/components/Reviews";
import { ProductRail } from "@/components/ProductGrid";

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found — AARU" };
  return {
    title: `${product.name} — AARU`,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 10);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-square bg-white border border-gray-200 rounded-md overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>
          <div className="flex gap-2 mt-2">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="relative h-16 w-16 rounded border border-gray-200 overflow-hidden bg-white"
              >
                <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted">{product.brand}</p>
          <h1 className="font-display text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>

          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded font-semibold text-xs">
              {product.rating} ★
            </span>
            <span className="text-muted">{product.reviewCount.toLocaleString("en-IN")} ratings</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.discountPct > 0 && (
              <>
                <span className="text-muted line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-emerald-600 font-semibold">{product.discountPct}% off</span>
              </>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
            <span>✓ No Cost EMI available</span>
            <span>✓ Free delivery on orders ₹499+</span>
            <span>✓ 7-day easy returns</span>
            <span>✓ {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          </div>

          <p className="mt-5 text-sm text-gray-700 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>
          <div className="mt-3">
            <WishlistButton slug={product.slug} />
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h2 className="font-display text-sm font-bold text-gray-900 mb-3">Specifications</h2>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-100 last:border-0">
                      <td className="py-1.5 pr-4 text-muted w-1/3 align-top">{k}</td>
                      <td className="py-1.5 text-gray-800 font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Reviews productSlug={product.slug} seedReviews={product.reviews || []} />

      <div className="mt-10">
        <ProductRail title="You may also like" products={related} />
      </div>
    </div>
  );
}
