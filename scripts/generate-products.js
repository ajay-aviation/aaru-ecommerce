// Regenerates lib/products-data.json
// Run: node scripts/generate-products.js
const fs = require("fs");
const path = require("path");

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function pickMany(rand, arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(rand() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

// --- Category definitions -------------------------------------------------
const CATEGORIES = [
  {
    name: "Mobiles",
    keyword: "smartphone",
    brands: ["Samsung", "Xiaomi", "OnePlus", "Vivo", "Oppo", "Realme", "Apple", "Motorola", "Nothing", "iQOO"],
    nouns: ["Smartphone", "5G Phone", "Gaming Phone"],
    adjectives: ["Pro", "Max", "Ultra", "Lite", "Plus", "Neo", "Edge", "SE"],
    priceRange: [7999, 149999],
  },
  {
    name: "Laptops",
    keyword: "laptop",
    brands: ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Samsung"],
    nouns: ["Laptop", "Ultrabook", "Gaming Laptop", "Notebook"],
    adjectives: ["14 inch", "15.6 inch", "Core i5", "Core i7", "Ryzen 5", "Ryzen 7", "Slim"],
    priceRange: [24999, 189999],
  },
  {
    name: "Electronics & Accessories",
    keyword: "headphones",
    brands: ["boAt", "JBL", "Sony", "Noise", "Mi", "Realme", "Zebronics", "Portronics"],
    nouns: ["Wireless Earbuds", "Bluetooth Speaker", "Power Bank", "Smartwatch", "Neckband", "Headphones"],
    adjectives: ["Pro", "Lite", "Max", "2.0", "Bass Edition", "Sport"],
    priceRange: [499, 24999],
  },
  {
    name: "Fashion — Men",
    keyword: "mens-fashion",
    brands: ["Roadster", "H&M", "Levi's", "Puma", "Allen Solly", "US Polo", "Arrow", "Peter England"],
    nouns: ["Shirt", "T-Shirt", "Jeans", "Jacket", "Kurta", "Track Pants", "Sweatshirt"],
    adjectives: ["Slim Fit", "Regular Fit", "Casual", "Formal", "Cotton", "Printed"],
    priceRange: [349, 4999],
  },
  {
    name: "Fashion — Women",
    keyword: "womens-fashion",
    brands: ["Vero Moda", "Only", "Biba", "W", "Forever 21", "Global Desi", "AND", "Libas"],
    nouns: ["Kurti", "Dress", "Top", "Saree", "Leggings", "Jumpsuit", "Co-ord Set"],
    adjectives: ["Printed", "Solid", "Embroidered", "Casual", "Party Wear", "Ethnic"],
    priceRange: [399, 5999],
  },
  {
    name: "Footwear",
    keyword: "sneakers",
    brands: ["Nike", "Puma", "Adidas", "Woodland", "Bata", "Campus", "Skechers", "Red Tape"],
    nouns: ["Running Shoes", "Sneakers", "Sandals", "Formal Shoes", "Flip-Flops", "Loafers"],
    adjectives: ["Lightweight", "Air Cushioned", "Casual", "Sports", "Classic"],
    priceRange: [499, 8999],
  },
  {
    name: "Home & Kitchen",
    keyword: "kitchenware",
    brands: ["Prestige", "Milton", "Cello", "Bajaj", "Pigeon", "Borosil", "Wonderchef"],
    nouns: ["Mixer Grinder", "Non-Stick Pan", "Water Bottle", "Casserole Set", "Induction Cooktop", "Cookware Set"],
    adjectives: ["3-Piece", "Stainless Steel", "Electric", "1.5L", "Premium"],
    priceRange: [199, 7999],
  },
  {
    name: "Furniture",
    keyword: "furniture",
    brands: ["Nilkamal", "Godrej Interio", "Urban Ladder", "HomeTown", "Durian"],
    nouns: ["Sofa Set", "Bed", "Wardrobe", "Dining Table", "Bookshelf", "Study Table", "Recliner"],
    adjectives: ["3-Seater", "Engineered Wood", "Sheesham Wood", "Modern", "Compact"],
    priceRange: [2999, 89999],
  },
  {
    name: "Large Appliances",
    keyword: "home-appliance",
    brands: ["LG", "Samsung", "Whirlpool", "Voltas", "Daikin", "Haier", "Panasonic"],
    nouns: ["Refrigerator", "Washing Machine", "Air Conditioner", "Smart TV", "Microwave Oven"],
    adjectives: ["1.5 Ton", "6.5 Kg", "55 inch", "Double Door", "Inverter", "4K"],
    priceRange: [9999, 79999],
  },
  {
    name: "Beauty & Grooming",
    keyword: "cosmetics",
    brands: ["Mamaearth", "Lakme", "Nivea", "Philips", "L'Oreal", "The Man Company", "Plum"],
    nouns: ["Face Wash", "Trimmer", "Moisturizer", "Lipstick Set", "Hair Dryer", "Perfume"],
    adjectives: ["Vitamin C", "For Men", "For Women", "Long Lasting", "Travel Size"],
    priceRange: [149, 3999],
  },
  {
    name: "Books",
    keyword: "books",
    brands: ["Penguin", "HarperCollins", "Bloomsbury", "Rupa", "Westland"],
    nouns: ["Novel", "Self-Help Book", "Biography", "Fiction Collection", "Comic Set"],
    adjectives: ["Bestseller", "Award Winning", "Illustrated Edition", "Boxed Set"],
    priceRange: [149, 1499],
  },
  {
    name: "Sports & Fitness",
    keyword: "sports-equipment",
    brands: ["Nivia", "Cosco", "Yonex", "Decathlon", "boldfit", "Kore"],
    nouns: ["Yoga Mat", "Dumbbell Set", "Cricket Bat", "Badminton Racket", "Football", "Resistance Band"],
    adjectives: ["Pro", "Beginner", "6mm", "5kg", "Leather"],
    priceRange: [299, 6999],
  },
  {
    name: "Baby & Kids",
    keyword: "baby-products",
    brands: ["Pampers", "Huggies", "Chicco", "LuvLap", "Fisher-Price", "Johnson's"],
    nouns: ["Diaper Pack", "Baby Stroller", "Feeding Bottle", "Soft Toy", "Baby Carrier"],
    adjectives: ["Extra Soft", "Newborn", "0-6 Months", "Foldable", "Cute"],
    priceRange: [199, 8999],
  },
  {
    name: "Grocery & Supermart",
    keyword: "grocery",
    brands: ["Tata", "Fortune", "Aashirvaad", "Nestle", "Amul", "Saffola"],
    nouns: ["Atta 5kg", "Cooking Oil 1L", "Rice 5kg", "Tea Pack", "Ghee 1L", "Dal Pack"],
    adjectives: ["Premium", "Organic", "Family Pack", "Everyday", "Value Pack"],
    priceRange: [49, 899],
  },
  {
    name: "Watches",
    keyword: "wristwatch",
    brands: ["Fossil", "Titan", "Fastrack", "Casio", "Noise", "boAt"],
    nouns: ["Analog Watch", "Smartwatch", "Chronograph", "Digital Watch"],
    adjectives: ["Leather Strap", "Steel Chain", "Waterproof", "For Him", "For Her"],
    priceRange: [499, 12999],
  },
  {
    name: "Bags & Luggage",
    keyword: "backpack",
    brands: ["American Tourister", "Wildcraft", "Skybags", "Safari", "VIP"],
    nouns: ["Backpack", "Trolley Bag", "Duffel Bag", "Laptop Bag", "Sling Bag"],
    adjectives: ["Water Resistant", "28L", "Cabin Size", "Anti-Theft"],
    priceRange: [499, 6999],
  },
  {
    name: "Jewellery",
    keyword: "jewellery",
    brands: ["Tanishq", "CaratLane", "Giva", "Mia", "Voylla"],
    nouns: ["Necklace Set", "Earrings", "Bracelet", "Ring", "Anklet"],
    adjectives: ["Gold Plated", "Silver", "American Diamond", "Minimalist", "Traditional"],
    priceRange: [299, 14999],
  },
  {
    name: "Automotive",
    keyword: "car-accessories",
    brands: ["Bosch", "3M", "Michelin", "Philips", "Spidy Moto"],
    nouns: ["Car Vacuum Cleaner", "Tyre Inflator", "Dashboard Camera", "Car Cover", "Helmet"],
    adjectives: ["Portable", "Digital", "Universal Fit", "ISI Certified"],
    priceRange: [399, 9999],
  },
  {
    name: "Musical Instruments",
    keyword: "musical-instrument",
    brands: ["Yamaha", "Kadence", "Casio", "Juarez", "Fender"],
    nouns: ["Acoustic Guitar", "Keyboard", "Digital Piano", "Ukulele", "Drum Pad"],
    adjectives: ["Beginner", "38 inch", "61-Key", "Professional"],
    priceRange: [1499, 34999],
  },
  {
    name: "Pet Supplies",
    keyword: "pet-supplies",
    brands: ["Pedigree", "Drools", "Whiskas", "Himalaya", "Royal Canin"],
    nouns: ["Dog Food 3kg", "Cat Food 1.5kg", "Pet Shampoo", "Chew Toy", "Pet Bed"],
    adjectives: ["Adult", "Puppy", "Grain Free", "Washable", "Small Breed"],
    priceRange: [199, 2999],
  },
];

const PRODUCTS_PER_CATEGORY = 60;
const rand = seededRandom(42);

function money(rand, [min, max]) {
  const raw = min + rand() * (max - min);
  return Math.round(raw / 10) * 10; // round to nearest 10
}

const products = [];
let counter = 1;

for (const cat of CATEGORIES) {
  for (let i = 0; i < PRODUCTS_PER_CATEGORY; i++) {
    const brand = pick(rand, cat.brands);
    const noun = pick(rand, cat.nouns);
    const adjs = pickMany(rand, cat.adjectives, 1 + Math.floor(rand() * 2));
    const name = `${brand} ${noun} ${adjs.join(" ")}`.trim();
    const price = money(rand, cat.priceRange);
    const hasDiscount = rand() > 0.35;
    const discountPct = hasDiscount ? 5 + Math.floor(rand() * 55) : 0;
    const originalPrice = hasDiscount
      ? Math.round((price / (1 - discountPct / 100)) / 10) * 10
      : price;
    const rating = Math.round((3 + rand() * 2) * 10) / 10; // 3.0 - 5.0
    const reviewCount = Math.floor(rand() * 4500);
    const slug = `${slugify(name)}-${counter}`;

    // LoremFlickr serves real, keyword-tagged photos (not random unrelated
    // ones like a generic placeholder service). `lock=<n>` pins a specific
    // photo from that keyword's pool so it's stable across reloads, and
    // varying the lock per product/thumbnail gives visual variety within
    // the same, correct category.
    const img = (lockOffset) =>
      `https://loremflickr.com/600/600/${cat.keyword}?lock=${counter * 10 + lockOffset}`;

    products.push({
      id: counter,
      slug,
      name,
      brand,
      category: cat.name,
      categorySlug: slugify(cat.name),
      price,
      originalPrice,
      discountPct,
      rating,
      reviewCount,
      stock: Math.floor(rand() * 200),
      image: img(0),
      images: [img(1), img(2), img(3)],
      description: `${name} from ${brand}. A reliable pick in ${cat.name.toLowerCase()}, rated ${rating} out of 5 by ${reviewCount.toLocaleString(
        "en-IN"
      )} customers. Ships in 2-4 days with easy 7-day returns.`,
    });
    counter++;
  }
}

const outPath = path.join(__dirname, "..", "lib", "products-data.json");
fs.writeFileSync(outPath, JSON.stringify(products));
console.log(`Generated ${products.length} products across ${CATEGORIES.length} categories -> ${outPath}`);

const categoriesOut = CATEGORIES.map((c) => ({ name: c.name, slug: slugify(c.name) }));
fs.writeFileSync(
  path.join(__dirname, "..", "lib", "categories-data.json"),
  JSON.stringify(categoriesOut, null, 2)
);
console.log(`Wrote ${categoriesOut.length} categories -> lib/categories-data.json`);
