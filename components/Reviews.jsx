"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import RatingSummary from "@/components/RatingSummary";

function storageKey(slug) {
  return `aaru_reviews_${slug}`;
}

const SORTS = {
  helpful: (a, b) => (b.helpful || 0) - (a.helpful || 0),
  recent: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || 0,
};

export default function Reviews({ productSlug, seedReviews = [], rating = 0, reviewCount = 0 }) {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [rateInput, setRateInput] = useState(5);
  const [comment, setComment] = useState("");
  const [sortBy, setSortBy] = useState("helpful");
  const [votedIdx, setVotedIdx] = useState(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(productSlug));
      setUserReviews(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setUserReviews([]);
    }
  }, [productSlug]);

  const allReviews = useMemo(
    () => [...userReviews, ...seedReviews].map((r) => ({ helpful: 0, ...r })),
    [userReviews, seedReviews]
  );

  const sortedReviews = useMemo(() => {
    const copy = [...allReviews];
    copy.sort(SORTS[sortBy]);
    return copy;
  }, [allReviews, sortBy]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    const next = [
      {
        name: user?.name || "Guest",
        rating: rateInput,
        comment: comment.trim(),
        date: new Date().toISOString().slice(0, 10),
        verified: false,
        helpful: 0,
      },
      ...userReviews,
    ];
    setUserReviews(next);
    try {
      localStorage.setItem(storageKey(productSlug), JSON.stringify(next));
    } catch (e) {
      // ignore
    }
    setComment("");
    setRateInput(5);
  }

  function markHelpful(idx) {
    setVotedIdx((prev) => new Set(prev).add(idx));
  }

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="font-display text-lg font-bold mb-1">Ratings & Reviews</h2>

      {allReviews.length > 0 && (
        <RatingSummary rating={rating} reviewCount={reviewCount} reviews={allReviews} />
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 bg-white border border-gray-200 rounded p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Your rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRateInput(n)}
                className={n <= rateInput ? "text-amber-500" : "text-gray-300"}
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

      {sortedReviews.length === 0 ? (
        <p className="text-sm text-muted">No reviews yet — be the first to review this product.</p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-ink">{sortedReviews.length} reviews</p>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted">Sort by</span>
              <button
                onClick={() => setSortBy("helpful")}
                className={`px-2 py-1 rounded ${sortBy === "helpful" ? "bg-brand text-white" : "text-brand hover:bg-brand/[0.08]"}`}
              >
                Most helpful
              </button>
              <button
                onClick={() => setSortBy("recent")}
                className={`px-2 py-1 rounded ${sortBy === "recent" ? "bg-brand text-white" : "text-brand hover:bg-brand/[0.08]"}`}
              >
                Most recent
              </button>
            </div>
          </div>

          <ul className="space-y-4">
            {sortedReviews.map((r, i) => {
              const voted = votedIdx.has(i);
              return (
                <li key={i} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-emerald-600 text-white px-1.5 rounded text-xs font-semibold">
                      {r.rating} ★
                    </span>
                    <span className="font-medium">{r.name}</span>
                    {r.verified && (
                      <span className="text-emerald-700 text-[11px] font-medium">✓ Verified Purchase</span>
                    )}
                    <span className="text-muted text-xs">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
                  <button
                    onClick={() => markHelpful(i)}
                    disabled={voted}
                    className="mt-2 text-xs text-muted hover:text-brand disabled:text-brand disabled:font-medium"
                  >
                    👍 Helpful{voted ? "" : ""} ({(r.helpful || 0) + (voted ? 1 : 0)})
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
