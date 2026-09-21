"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login(name.trim(), email.trim());
    router.push("/");
  }

  return (
    <div className="max-w-sm mx-auto py-10">
      <h1 className="font-display text-2xl font-bold mb-1">Log in to AARU</h1>
      <p className="text-sm text-muted mb-6">
        Demo account — no password needed, this is a local mock login for the storefront.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="w-full bg-brand text-white font-semibold py-2.5 rounded hover:bg-brand-dark"
        >
          Log in
        </button>
      </form>
      <p className="text-sm text-muted mt-4">
        New here?{" "}
        <Link href="/register" className="text-brand font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
