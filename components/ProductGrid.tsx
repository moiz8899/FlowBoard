"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { categories, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type ProductGridProps = {
  initialProducts?: Product[];
  lockedCategory?: string;
};

export function ProductGrid({ initialProducts = [], lockedCategory }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(lockedCategory || "all");

  const visibleProducts = useMemo(() => {
    if (lockedCategory) return initialProducts;
    if (activeCategory === "all") return initialProducts;
    return initialProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory, initialProducts, lockedCategory]);

  return (
    <section id="templates" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {!lockedCategory ? (
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          <button
            className={`category-chip ${activeCategory === "all" ? "category-chip-active" : ""}`}
            onClick={() => setActiveCategory("all")}
            type="button"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            All Templates
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              className={`category-chip ${
                activeCategory === category.slug ? "category-chip-active" : ""
              }`}
              onClick={() => setActiveCategory(category.slug)}
              type="button"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: category.color }}
                aria-hidden="true"
              />
              {category.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visibleProducts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line bg-surface/60 p-10 text-center">
          <h3 className="font-display text-2xl font-bold text-white">No dashboards added yet</h3>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Add your first dashboard product to `data/products.json` when your screenshots, demo URL, and 2Checkout product ID are ready.
          </p>
        </div>
      ) : null}
    </section>
  );
}
