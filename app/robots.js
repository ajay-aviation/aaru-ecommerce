const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aaru-ecommerce.netlify.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/account", "/login", "/register"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
