// Shared per-category identity (color + icon), matching the tones used
// in generated product artwork so the whole site reads as one system.
export const CATEGORY_STYLE = {
  "mobiles": { dark: "#1e3a8a", light: "#3b82f6", icon: "📱" },
  "laptops": { dark: "#312e81", light: "#6366f1", icon: "💻" },
  "electronics-accessories": { dark: "#0f172a", light: "#475569", icon: "🎧" },
  "fashion-men": { dark: "#134e4a", light: "#0d9488", icon: "👔" },
  "fashion-women": { dark: "#831843", light: "#db2777", icon: "👗" },
  "footwear": { dark: "#78350f", light: "#d97706", icon: "👟" },
  "home-kitchen": { dark: "#7c2d12", light: "#ea580c", icon: "🍳" },
  "furniture": { dark: "#422006", light: "#a16207", icon: "🛋️" },
  "large-appliances": { dark: "#1e293b", light: "#64748b", icon: "🧊" },
  "beauty-grooming": { dark: "#701a75", light: "#c026d3", icon: "💄" },
  "books": { dark: "#1e3a2f", light: "#16a34a", icon: "📚" },
  "sports-fitness": { dark: "#164e63", light: "#0891b2", icon: "🏋️" },
  "baby-kids": { dark: "#7c2d12", light: "#f59e0b", icon: "🧸" },
  "grocery-supermart": { dark: "#14532d", light: "#22c55e", icon: "🛒" },
  "watches": { dark: "#292524", light: "#78716c", icon: "⌚" },
  "bags-luggage": { dark: "#452a16", light: "#b45309", icon: "🎒" },
  "jewellery": { dark: "#78350f", light: "#eab308", icon: "💍" },
  "automotive": { dark: "#1c1917", light: "#57534e", icon: "🚗" },
  "musical-instruments": { dark: "#3b0764", light: "#9333ea", icon: "🎸" },
  "pet-supplies": { dark: "#365314", light: "#65a30d", icon: "🐾" },
};

export function categoryStyle(slug) {
  return CATEGORY_STYLE[slug] || { dark: "#1f2937", light: "#4b5563", icon: "🛍️" };
}
