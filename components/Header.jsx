"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useAuth } from "@/lib/auth-context";
import { CATEGORIES } from "@/lib/products";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { slugs } = useWishlist();
  const { user } = useAuth();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/?${params.toString()}`);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-brand text-white shadow-md">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <Link href="/" className="flex flex-col leading-none shrink-0">
            <span className="font-display text-2xl font-bold tracking-tight">
              AAR<span className="text-accent">U</span>
            </span>
            <span className="text-[10px] text-white/70 -mt-1">Shop the everyday</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full rounded-l-sm px-4 py-2 text-sm text-gray-900 outline-none"
            />
            <button
              type="submit"
              className="rounded-r-sm bg-white px-4 flex items-center justify-center text-brand"
              aria-label="Search"
            >
              🔍
            </button>
          </form>

          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium shrink-0">
            <Link href={user ? "/account/orders" : "/login"} className="hover:text-accent">
              {user ? `Hi, ${user.name.split(" ")[0]}` : "Login"}
            </Link>
            <Link href="/wishlist" className="hover:text-accent relative">
              Wishlist
              {slugs.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-accent text-brand text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {slugs.length}
                </span>
              )}
            </Link>
            <Link href="/checkout" className="hover:text-accent relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-accent text-brand text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          <button
            className="ml-auto md:hidden text-2xl"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-l-sm px-3 py-2 text-sm text-gray-900 outline-none"
              />
              <button type="submit" className="rounded-r-sm bg-white px-3 text-brand">
                🔍
              </button>
            </form>
            <div className="flex gap-4 text-sm">
              <Link href={user ? "/account/orders" : "/login"} onClick={() => setMobileOpen(false)}>
                {user ? `Hi, ${user.name.split(" ")[0]}` : "Login"}
              </Link>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)}>
                Wishlist ({slugs.length})
              </Link>
              <Link href="/checkout" onClick={() => setMobileOpen(false)}>
                Cart ({itemCount})
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* category strip */}
      <div className="border-t border-white/10 bg-brand-dark overflow-x-auto no-scrollbar">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 flex gap-5 py-2 text-xs whitespace-nowrap">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/?category=${c.slug}`} className="hover:text-accent">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
