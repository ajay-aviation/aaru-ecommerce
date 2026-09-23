export default function RatingSummary({ rating, reviewCount, reviews = [] }) {
  const counts = [5, 4, 3, 2, 1].map((star) => {
    const n = reviews.filter((r) => r.rating === star).length;
    return { star, n };
  });
  const totalSeed = reviews.length || 1;

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 py-4">
      <div className="text-center sm:text-left shrink-0">
        <p className="text-4xl font-bold text-ink">{rating}</p>
        <p className="text-accent text-lg leading-none">
          {"★".repeat(Math.round(rating))}
          <span className="text-gray-300">{"★".repeat(5 - Math.round(rating))}</span>
        </p>
        <p className="text-xs text-muted mt-1">{reviewCount.toLocaleString("en-IN")} ratings</p>
      </div>
      <div className="flex-1 max-w-xs space-y-1">
        {counts.map(({ star, n }) => {
          const pct = Math.round((n / totalSeed) * 100);
          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-8 text-muted">{star} ★</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-8 text-muted text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
