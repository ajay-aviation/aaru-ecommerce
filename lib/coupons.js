export const COUPONS = {
  WELCOME10: { type: "percent", value: 10, minOrder: 500, label: "10% off on your order" },
  AARU50: { type: "flat", value: 50, minOrder: 999, label: "₹50 off" },
  FESTIVE20: { type: "percent", value: 20, minOrder: 2000, maxDiscount: 500, label: "20% off, up to ₹500" },
};

export function validateCoupon(code, subtotal) {
  const coupon = COUPONS[code.trim().toUpperCase()];
  if (!coupon) return { valid: false, message: "Invalid coupon code" };
  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      message: `Add items worth ₹${coupon.minOrder - subtotal} more to use this coupon`,
    };
  }
  let discount = coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  discount = Math.min(discount, subtotal);
  return { valid: true, code: code.trim().toUpperCase(), discount, label: coupon.label };
}
