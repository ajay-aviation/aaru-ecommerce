export const metadata = { title: "Terms & Conditions — AARU" };

const SECTIONS = [
  {
    h: "1. Acceptance of terms",
    p: "By accessing or using AARU, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use this site.",
  },
  {
    h: "2. Products & pricing",
    p: "We make every effort to display accurate pricing and product information. However, errors may occur, and we reserve the right to correct pricing or cancel orders affected by such errors, with a full refund where applicable.",
  },
  {
    h: "3. Orders & payments",
    p: "Placing an order constitutes an offer to purchase, which we may accept or decline. Payments are processed through secure third-party payment providers.",
  },
  {
    h: "4. Affiliate links",
    p: "Some listings on AARU link to external retail partners (such as Flipkart or Amazon). Purchases made through these links are governed by that partner's own terms, and AARU is not responsible for the fulfillment of those orders.",
  },
  {
    h: "5. Returns & refunds",
    p: "Please see our Returns & Refunds page for details on eligibility and process.",
  },
  {
    h: "6. User accounts",
    p: "You are responsible for maintaining the confidentiality of your account and for all activity under it.",
  },
  {
    h: "7. Limitation of liability",
    p: "AARU is provided on an \"as is\" basis. We are not liable for indirect or consequential losses arising from use of this site.",
  },
  {
    h: "8. Governing law",
    p: "These terms are governed by the laws of India, with courts in Ahmedabad, Gujarat having exclusive jurisdiction.",
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-1">Terms & Conditions</h1>
      <p className="text-xs text-muted mb-6">Last updated: September 2026</p>

      {SECTIONS.map((s) => (
        <div key={s.h} className="mb-5">
          <h2 className="font-display text-base font-bold mb-1.5">{s.h}</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{s.p}</p>
        </div>
      ))}
    </div>
  );
}
