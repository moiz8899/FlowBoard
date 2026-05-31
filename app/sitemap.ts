import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/products";
import { readProducts } from "@/lib/product-store";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const catalogProducts = await readProducts();
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/delivery",
    "/refund-policy",
    "/privacy-policy",
    "/terms",
    "/checkout/success",
    "/checkout/cancel"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date()
  }));

  const productRoutes = catalogProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.createdAt)
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
