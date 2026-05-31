import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { categories, formatPrice, type Product } from "@/lib/products";
import { BuyButton } from "@/components/BuyButton";
import { CategoryBadge } from "@/components/CategoryBadge";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const category = categories.find((item) => item.slug === product.category);

  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-hover">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          {product.screenshots[0] ? (
            <Image
              src={product.screenshots[0]}
              alt={`${product.name} dashboard preview`}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#13131A,#0A0A0F)] text-sm font-semibold text-muted">
              Preview coming soon
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <CategoryBadge label={product.categoryLabel} color={category?.color} />
          <span className="inline-flex items-center gap-1 text-sm text-amber-300">
            <Star className="h-4 w-4 fill-current" aria-hidden="true" />
            {product.rating}
          </span>
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-white">{product.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="ml-2 text-sm text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <span className="text-xs text-muted">{product.reviewCount} reviews</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="btn-ghost inline-flex min-h-11 items-center justify-center gap-2 text-sm"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            Details
          </Link>
          <BuyButton
            paddlePriceId={product.paddlePriceId}
            productSlug={product.slug}
            paymentBypassEnabled={product.paymentBypassEnabled}
            className="gap-2 px-3 text-sm"
            label={
              <>
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                Buy
              </>
            }
          />
        </div>
      </div>
    </article>
  );
}
