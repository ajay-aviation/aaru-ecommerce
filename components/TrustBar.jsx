const ITEMS = [
  { icon: "🚚", label: "Free delivery", detail: "On orders above ₹499" },
  { icon: "↩️", label: "7-day returns", detail: "No questions asked" },
  { icon: "🔒", label: "Secure payments", detail: "UPI, cards & COD" },
  { icon: "⭐", label: "Verified reviews", detail: "From real buyers" },
];

export default function TrustBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
      {ITEMS.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 bg-white border border-black/5 rounded-lg px-4 py-3 shadow-card"
        >
          <span className="text-xl">{item.icon}</span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">{item.label}</p>
            <p className="text-xs text-muted">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
