import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

export type Category = {
  slug: string;
  label: string;
  color: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  screenshots: string[];
  filePath?: string;
  rating: number;
  reviewCount: number;
  downloadCount: number;
  tags: string[];
  paddlePriceId: string;
  paymentBypassEnabled: boolean;
  createdAt: string;
  version: string;
};

export const categories = categoriesData as Category[];
export const products = productsData as Product[];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category === slug);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}
