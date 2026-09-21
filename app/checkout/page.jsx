"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { user, saveOrder } = useAuth();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(null);
  const [address, setAddress] = useState({
    name: user?.name || "",
    email: user?.email || "",
    line1: "",
    city: "",
    pincode: "",
  });

  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setPlacing(true);
    // Mock checkout — no payment gateway wired up. See README "Notes on payments".
    setTimeout(() => {
      const order = {
        id: `AARU-${Date.now().toString().slice(-8)}`,
        items,
        subtotal,
        shipping,
        total,
        address,
        status: "paid",
        date: new Date().toISOString(),
      };
      saveOrder(order);
      clearCart();
      setPlaced(order);
      setPlacing(false);
    }, 700);
  }

  if (placed) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="font-display text-2xl font-bold mb-2">Order placed!</h1>
        <p className="text-muted mb-1">
          Order <span className="font-mono">{placed.id}</span> — {formatPrice(placed.total)}
        </p>
        <p className="text-sm text-muted mb-6">
          This is a mock order (no real payment was processed).
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/account/orders")}
            className="bg-brand text-white px-5 py-2 rounded font-medium"
          >
            View order history
          </button>
          <button
            onClick={() => router.push("/")}
            className="border border-gray-300 px-5 py-2 rounded font-medium"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="font-display text-xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted mb-4">Add something you like and it'll show up here.</p>
        <button onClick={() => router.push("/")} className="bg-brand text-white px-5 py-2 rounded font-medium">
          Start shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="font-display text-xl font-bold">Your Cart ({items.length})</h1>
        {items.map((item) => (
          <div key={item.slug} className="flex gap-4 bg-white border border-gray-200 rounded p-3">
            <div className="relative h-20 w-20 shrink-0 rounded overflow-hidden bg-gray-50">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-2">{item.name}</p>
              <p className="text-sm text-muted mt-1">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    className="px-2 py-0.5"
                  >
                    −
                  </button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    className="px-2 py-0.5"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="text-sm font-semibold shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handlePlaceOrder} className="bg-white border border-gray-200 rounded p-4 h-fit space-y-3">
        <h2 className="font-semibold">Delivery details</h2>
        <input
          required
          placeholder="Full name"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={address.email}
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <input
          required
          placeholder="Address"
          value={address.line1}
          onChange={(e) => setAddress({ ...address, line1: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
          <input
            required
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="PIN code"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-1">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-accent text-brand-dark font-semibold py-3 rounded-sm hover:opacity-90 disabled:opacity-60"
        >
          {placing ? "Placing order…" : "Place Order"}
        </button>
      </form>
    </div>
  );
}
