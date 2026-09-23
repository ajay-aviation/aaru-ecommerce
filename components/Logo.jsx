export default function Logo({ size = 36, withText = true, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aaruBadge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1F3B73" />
            <stop offset="1" stopColor="#0B1D3A" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#aaruBadge)" />
        {/* Monogram "A" — the two strokes double as a roof, for "everyday shopping" */}
        <path d="M24 11 L14.5 36" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
        <path d="M24 11 L33.5 36" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
        <path d="M18.8 27 L29.2 27" stroke="#F5A623" strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="7.5" r="2.1" fill="#F5A623" />
      </svg>
      {withText && (
        <span
          className="font-display font-bold leading-none tracking-tight"
          style={{ fontSize: size * 0.52 }}
        >
          AAR<span className="text-accent">U</span>
        </span>
      )}
    </span>
  );
}
