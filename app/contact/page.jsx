export const metadata = { title: "Contact Us — AARU" };

export default function ContactPage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold mb-1">Contact Us</h1>
      <p className="text-sm text-muted mb-6">
        We usually respond within 24–48 hours.
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div>
          <p className="text-xs text-muted mb-0.5">Business name</p>
          <p className="text-sm font-medium">Aaravv Enterprises (AARU)</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-0.5">Email</p>
          <a href="mailto:support@aaru-ecommerce.example" className="text-sm font-medium text-brand hover:underline">
            support@aaru-ecommerce.example
          </a>
        </div>
        <div>
          <p className="text-xs text-muted mb-0.5">Phone</p>
          <p className="text-sm font-medium">+91-XXXXXXXXXX</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-0.5">Address</p>
          <p className="text-sm font-medium">Ahmedabad, Gujarat, India</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-0.5">Support hours</p>
          <p className="text-sm font-medium">Mon–Sat, 10 AM – 7 PM IST</p>
        </div>
      </div>

      <p className="text-xs text-muted mt-4">
        For order-specific queries, please include your order ID (found under{" "}
        <a href="/account/orders" className="text-brand hover:underline">My Orders</a>).
      </p>
    </div>
  );
}
