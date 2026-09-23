export const metadata = { title: "Returns & Refunds — AARU" };

export default function ReturnsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-1">Returns & Refunds</h1>
      <p className="text-xs text-muted mb-6">Last updated: September 2026</p>

      <div className="mb-5">
        <h2 className="font-display text-base font-bold mb-1.5">Return window</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Most items purchased on AARU are eligible for return within 7 days
          of delivery, provided they are unused and in original packaging
          with all tags and accessories intact.
        </p>
      </div>

      <div className="mb-5">
        <h2 className="font-display text-base font-bold mb-1.5">Non-returnable items</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Innerwear, personal care items, perishable goods, and items marked
          "non-returnable" on the product page cannot be returned for
          hygiene and safety reasons.
        </p>
      </div>

      <div className="mb-5">
        <h2 className="font-display text-base font-bold mb-1.5">How to request a return</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Go to <a href="/account/orders" className="text-brand hover:underline">My Orders</a>,
          select the item, and choose "Return". Our team will arrange
          pickup where available.
        </p>
      </div>

      <div className="mb-5">
        <h2 className="font-display text-base font-bold mb-1.5">Refunds</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Once the returned item is received and inspected, refunds are
          processed to the original payment method within 5–7 business days.
        </p>
      </div>

      <div className="mb-5">
        <h2 className="font-display text-base font-bold mb-1.5">Items bought via partner links</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          For items purchased through an affiliate/partner link (e.g.
          Flipkart or Amazon), returns are handled directly by that
          retailer under their own return policy.
        </p>
      </div>
    </div>
  );
}
