import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { categories, getCategoryBySlug } from "@/lib/products";
import { findProductsByCategory } from "@/lib/product-store";

type CategoryPageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  return {
    title: `${category.label} Templates`,
    description: category.description
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryProducts = await findProductsByCategory(category.slug);

  return (
    <>
      <section className="border-b border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link href="/#templates" className="hover:text-white">Templates</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-white">{category.label}</span>
          </div>
          <span className="mb-5 block h-2 w-16 rounded-full" style={{ backgroundColor: category.color }} />
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            {category.label} Templates
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{category.description}</p>
        </div>
      </section>
      <ProductGrid initialProducts={categoryProducts} lockedCategory={category.slug} />
    </>
  );
}
