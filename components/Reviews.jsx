"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

function storageKey(slug) {
  return `aaru_reviews_${slug}`;
}

export default function Reviews({ productSlug }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(productSlug));
      setReviews(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setReviews([]);
    }
  }, [productSlug]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    const next = [
      {
        name: user?.name || "Guest",
        rating,
        comment: comment.trim(),
        date: new Date().toISOString().slice(0, 10),
      },
      ...reviews,
    ];
    setReviews(next);
    try {
      localStorage.setItem(storageKey(productSlug), JSON.stringify(next));
    } catch (e) {
      // ignore
    }
    setComment("");
    setRating(5);
  }

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="font-display text-lg font-bold mb-4">Ratings & Reviews</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 bg-white border border-gray-200 rounded p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Your rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                className={n <= rating ? "text-amber-500" : "text-gray-300"}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            rows={3}
          />
          <button
            type="submit"
            className="bg-brand text-white text-sm font-medium px-4 py-2 rounded hover:bg-brand-dark"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p className="text-sm text-muted mb-6">
          <a href="/login" className="text-brand font-medium hover:underline">
            Log in
          </a>{" "}
          to write a review.
        </p>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-muted">No reviews yet — be the first to review this product.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r, i) => (
            <li key={i} className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-emerald-600 text-white px-1.5 rounded text-xs font-semibold">
                  {r.rating} ★
                </span>
                <span className="font-medium">{r.name}</span>
                <span className="text-muted text-xs">{r.date}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
