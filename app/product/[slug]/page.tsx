import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, ShieldCheck, Star } from "lucide-react";
import { BuyButton } from "@/components/BuyButton";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ProductCard } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import {
  categories,
  formatPrice,
  products
} from "@/lib/products";
import { findProductBySlug, readProducts } from "@/lib/product-store";

type ProductPageProps = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await findProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | FlowBoard`,
      description: product.description,
      images: [product.screenshots[0]]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await findProductBySlug(params.slug);
  if (!product) notFound();

  const category = categories.find((item) => item.slug === product.category);
  const allProducts = await readProducts();
  const relatedProducts = allProducts
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.screenshots[0] || undefined,
    brand: { "@type": "Brand", name: "FlowBoard" },
    offers: {
      "@type": "Offer",
      price: product.price.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link href="/#templates" className="hover:text-white">Templates</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-white">{product.name}</span>
          </div>
          <CategoryBadge label={product.categoryLabel} color={category?.color} />
          <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{product.longDescription}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              {product.rating} from {product.reviewCount} reviews
            </span>
            <span>{product.downloadCount}+ downloads</span>
            <span>Version {product.version}</span>
          </div>
          <div className="mt-8">
            <ScreenshotCarousel screenshots={product.screenshots} name={product.name} />
          </div>
          <ProductTabs product={product} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
            <p className="text-sm font-semibold text-muted">Lifetime access</p>
            <div className="mt-2 flex items-end gap-3">
              <span className="font-display text-5xl font-extrabold text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice ? (
                <span className="pb-2 text-lg text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
            </div>
            <BuyButton
              twoCheckoutProductId={product.twoCheckoutProductId}
              className="mt-6 w-full px-6 py-3"
            />
            <div className="my-6 h-px bg-line" />
            <ul className="space-y-3 text-sm text-muted">
              {["Full source code", "Lifetime access", "Free future updates", "Documentation included"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="my-6 h-px bg-line" />
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-semibold text-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              30-day money-back guarantee
            </p>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white">Related Templates</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white">Buyer Notes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Clean layout and much faster than starting every CRM screen from zero.",
              "The local-first structure made client demos painless.",
              "Good component naming, easy to pull apart and adapt."
            ].map((review) => (
              <blockquote key={review} className="rounded-lg border border-line bg-surface p-5 text-muted">
                "{review}"
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
