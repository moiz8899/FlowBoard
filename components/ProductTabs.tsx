"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

const tabs = ["Overview", "Features", "Tech Stack", "Changelog"] as const;

type ProductTabsProps = {
  product: Product;
};

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div className="mt-8">
      <div className="flex gap-2 overflow-x-auto border-b border-line pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`min-h-11 rounded-md px-4 text-sm font-semibold transition ${
              activeTab === tab ? "bg-accent text-white" : "text-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-6 text-muted">
        {activeTab === "Overview" ? <p className="leading-7">{product.longDescription}</p> : null}
        {activeTab === "Features" ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="rounded-md border border-line bg-surface p-4 text-sm text-white">
                {feature}
              </li>
            ))}
          </ul>
        ) : null}
        {activeTab === "Tech Stack" ? (
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((item) => (
              <span key={item} className="rounded-md border border-line bg-surface px-3 py-2 text-sm text-white">
                {item}
              </span>
            ))}
          </div>
        ) : null}
        {activeTab === "Changelog" ? (
          <div className="rounded-md border border-line bg-surface p-5">
            <p className="font-semibold text-white">Version {product.version}</p>
            <p className="mt-2 text-sm">Initial release with responsive layouts, sample data, and documentation.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
