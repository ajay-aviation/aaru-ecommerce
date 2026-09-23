"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/products";

export default function OrdersPage() {
  const { user, loaded, getOrders } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (loaded && !user) router.push("/login");
    if (user) setOrders(getOrders());
  }, [loaded, user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-muted text-sm">
          No orders yet — anything you buy through checkout will show up here.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border border-gray-200 rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-mono text-sm font-medium">{o.id}</p>
                  <p className="text-xs text-muted">{new Date(o.date).toLocaleString("en-IN")}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium capitalize">
                  {o.status}
                </span>
              </div>
              <ul className="text-sm text-gray-700 space-y-0.5 mb-2">
                {o.items.map((it) => (
                  <li key={it.slug}>
                    {it.quantity} × {it.name}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold mb-2">Total: {formatPrice(o.total)}</p>
              <Link href={`/account/orders/${o.id}`} className="text-xs font-medium text-brand hover:underline">
                Track this order
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
