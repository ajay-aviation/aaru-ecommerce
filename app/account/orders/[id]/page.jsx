"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/products";

const STAGES = [
  { key: "confirmed", label: "Order Confirmed", icon: "✅", afterMin: 0 },
  { key: "packed", label: "Packed", icon: "📦", afterMin: 2 },
  { key: "shipped", label: "Shipped", icon: "🚚", afterMin: 5 },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "🛵", afterMin: 10 },
  { key: "delivered", label: "Delivered", icon: "🏠", afterMin: 20 },
];

function currentStageIndex(orderDate) {
  const elapsedMin = (Date.now() - new Date(orderDate).getTime()) / 60000;
  let idx = 0;
  STAGES.forEach((s, i) => {
    if (elapsedMin >= s.afterMin) idx = i;
  });
  return idx;
}

export default function OrderTrackingPage({ params }) {
  const { user, loaded, getOrders } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    if (loaded && !user) router.push("/login");
    if (user) {
      const found = getOrders().find((o) => o.id === params.id);
      setOrder(found || null);
      if (found) setStageIdx(currentStageIndex(found.date));
    }
  }, [loaded, user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!order) return;
    const t = setInterval(() => setStageIdx(currentStageIndex(order.date)), 15000);
    return () => clearInterval(t);
  }, [order]);

  if (!user) return null;

  if (!order) {
    return (
      <div className="text-center py-16">
        <h1 className="font-display text-xl font-bold mb-2">Order not found</h1>
        <Link href="/account/orders" className="text-brand font-medium hover:underline">
          Back to order history
        </Link>
      </div>
    );
  }

  const delivered = stageIdx === STAGES.length - 1;

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/account/orders" className="text-sm text-brand hover:underline">
        Back to order history
      </Link>

      <div className="mt-3 flex items-start justify-between">
        <div>
          <h1 className="font-display text-xl font-bold">{order.id}</h1>
          <p className="text-sm text-muted">{new Date(order.date).toLocaleString("en-IN")}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded font-medium ${
            delivered ? "bg-emerald-100 text-emerald-700" : "bg-brand/[0.08] text-brand"
          }`}
        >
          {delivered ? "Delivered" : "In transit"}
        </span>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-5">
        {STAGES.map((s, i) => {
          const done = i <= stageIdx;
          const isLast = i === STAGES.length - 1;
          return (
            <div key={s.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-base shrink-0 ${
                    done ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {s.icon}
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 min-h-[28px] ${done ? "bg-emerald-600" : "bg-gray-200"}`} />
                )}
              </div>
              <div className={`pb-6 ${!isLast ? "" : ""}`}>
                <p className={`text-sm font-medium ${done ? "text-ink" : "text-gray-400"}`}>{s.label}</p>
                {done && i === stageIdx && (
                  <p className="text-xs text-muted mt-0.5">
                    {delivered ? "Your package has arrived." : "Updated just now"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm font-semibold mb-2">Items in this order</h2>
        <ul className="text-sm text-gray-700 space-y-1 mb-3">
          {order.items.map((it) => (
            <li key={it.slug} className="flex justify-between">
              <span>{it.quantity} × {it.name}</span>
              <span>{formatPrice(it.price * it.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
        <p className="text-xs text-muted mt-2">
          Delivering to {order.address?.line1}, {order.address?.city} - {order.address?.pincode}
        </p>
      </div>
    </div>
  );
}
