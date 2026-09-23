export const metadata = { title: "Privacy Policy — AARU" };

const SECTIONS = [
  {
    h: "Information we collect",
    p: "When you create an account, place an order, or contact us, we may collect your name, email address, phone number, shipping address, and order history. We do not collect payment card details directly — payments are processed securely by our payment partners.",
  },
  {
    h: "How we use your information",
    p: "We use your information to process orders, provide customer support, send order updates, and improve our services. We do not sell your personal information to third parties.",
  },
  {
    h: "Cookies & local storage",
    p: "AARU uses browser storage to remember your cart, wishlist, and login session on this device. You can clear this at any time from your browser settings.",
  },
  {
    h: "Third-party links",
    p: "Some product listings link to external retail or affiliate partners. Once you leave AARU, that partner's own privacy policy applies to any information you share with them.",
  },
  {
    h: "Data security",
    p: "We take reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.",
  },
  {
    h: "Your rights",
    p: "You may request access to, correction of, or deletion of your personal data at any time by contacting us.",
  },
  {
    h: "Changes to this policy",
    p: "We may update this policy from time to time. Continued use of AARU after changes means you accept the updated policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-1">Privacy Policy</h1>
      <p className="text-xs text-muted mb-6">Last updated: September 2026</p>

      {SECTIONS.map((s) => (
        <div key={s.h} className="mb-5">
          <h2 className="font-display text-base font-bold mb-1.5">{s.h}</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{s.p}</p>
        </div>
      ))}

      <p className="text-sm text-gray-700 leading-relaxed">
        For any privacy-related questions, contact us via the{" "}
        <a href="/contact" className="text-brand hover:underline">Contact page</a>.
      </p>
    </div>
  );
}
