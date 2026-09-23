export const metadata = { title: "About Us — AARU" };

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto prose-sm">
      <h1 className="font-display text-2xl font-bold mb-4">About AARU</h1>

      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        AARU is an online marketplace bringing together everyday shopping —
        mobiles, fashion, home & kitchen, electronics, and more — under one
        roof for Indian shoppers. AARU is operated by{" "}
        <strong>Aaravv Enterprises</strong>.
      </p>

      <h2 className="font-display text-base font-bold mt-6 mb-2">What we do</h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        We help shoppers discover and compare products across 20+ categories,
        with honest pricing, verified customer reviews, and a simple
        checkout experience. Some listings on AARU link out to trusted
        retail partners — when you buy through those links, AARU may earn a
        small commission at no extra cost to you.
      </p>

      <h2 className="font-display text-base font-bold mt-6 mb-2">Our commitment</h2>
      <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-1 mb-4">
        <li>Transparent pricing with no hidden charges</li>
        <li>7-day easy returns on eligible items</li>
        <li>Secure checkout and data handling</li>
        <li>Responsive customer support</li>
      </ul>

      <p className="text-sm text-gray-700 leading-relaxed">
        Questions or feedback? Reach us on the{" "}
        <a href="/contact" className="text-brand hover:underline">Contact page</a>.
      </p>
    </div>
  );
}
