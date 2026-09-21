# AARU — Multi-Category Storefront (Next.js App Router)

A Flipkart-style shopping experience: search-first sticky header, category
rails, a rotating hero banner + permanent value-prop strip, deal-of-the-day
rail, per-category rails on the homepage, and a full filter/sort/paginate
catalog — **1,200 products across 20 categories**, procedurally generated.

## What's real vs. mocked

This build is **fully working front-end** with no server dependency:

- ✅ Search, category filter, sort (price/rating/discount), pagination
- ✅ Product detail pages with gallery, related products, reviews
- ✅ Cart + Wishlist (persisted to `localStorage`)
- ✅ Checkout flow that creates a mock order
- ✅ Login/Register (mock — stores a name+email in `localStorage`, no real
  auth/password, no server)
- ✅ Order history (per-browser, via `localStorage`)

There's **no database and no real payment gateway** — the previous version
of this project referenced Prisma + NextAuth + Stripe. Those need a real DB
connection and network access to install, which wasn't available while
building this, so this version runs entirely client-side and still gives
you the full shopping *flow* to click through. Swapping in a real backend
later (Prisma + Postgres + NextAuth + Stripe) is a matter of replacing the
functions in `lib/products.js`, `lib/auth-context.jsx`, and the checkout
handler — the UI doesn't need to change.

## Stack

- **Next.js 14** (App Router) + **Tailwind CSS**
- Plain React Context for cart / wishlist / auth (all `localStorage`-backed)
- 1,200-item catalog, procedurally generated (`scripts/generate-products.js`)
  across 20 categories, with search, filtering, sorting, and pagination
- Product photos via `picsum.photos` (real placeholder images, no API key
  needed)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
aaru/
├── app/
│   ├── page.jsx                  # homepage — hero, rails, filter/sort/paginate
│   ├── product/[slug]/page.jsx   # detail + gallery + reviews + related
│   ├── checkout/page.jsx         # cart review + address + mock order
│   ├── wishlist/page.jsx
│   ├── login/page.jsx / register/page.jsx
│   ├── account/orders/page.jsx
│   ├── layout.jsx                # wraps app in Auth/Cart/Wishlist providers
│   └── globals.css
├── components/
│   ├── Header.jsx                 # sticky, search-first, category strip
│   ├── HeroBanner.jsx             # auto-rotating + permanent value-prop strip
│   ├── ProductCard.jsx / ProductGrid.jsx  (grid + horizontal rails)
│   ├── CategoryFilter.jsx / SortBar.jsx / Pagination.jsx
│   ├── AddToCartForm.jsx / WishlistButton.jsx
│   ├── Reviews.jsx                 # localStorage-backed reviews
│   └── Footer.jsx
├── lib/
│   ├── products.js                 # catalog query/format functions
│   ├── products-data.json          # generated — 1,200 products
│   ├── categories-data.json        # generated — 20 categories
│   ├── cart-context.jsx / wishlist-context.jsx / auth-context.jsx
├── scripts/generate-products.js    # regenerates the catalog
└── package.json / tailwind.config.js / postcss.config.js / next.config.js
```

## Regenerating the catalog

Edit the `CATEGORIES` array in `scripts/generate-products.js` (brands,
nouns, adjectives, price ranges) and re-run:

```bash
npm run generate-products
```

## Design notes

Layout patterns are inspired by common Indian e-commerce UX (search-first
header, horizontal category rails, deal grids, on-card trust badges), but
branding, copy, colors and images are original to AARU — nothing here
reproduces Flipkart's (or anyone else's) actual name, logo, or content.
