import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Download, FolderKanban, LockKeyhole } from "lucide-react";
import { HeroDashboardMockup } from "@/components/HeroDashboardMockup";
import { ProductGrid } from "@/components/ProductGrid";
import { TrustBar } from "@/components/TrustBar";
import { categories } from "@/lib/products";
import { readProducts } from "@/lib/product-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await readProducts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-ink">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#1f1f2e_1px,transparent_1px),linear-gradient(90deg,#1f1f2e_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.26),transparent_32%),radial-gradient(circle_at_72%_30%,rgba(5,150,105,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-muted">
              Premium HTML templates for local-first builders
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              FlowBoard Dashboard Templates
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              One-time payment. No subscriptions. Download a polished dashboard, open it in the browser, and start adapting it to real client work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#templates" className="btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-6">
                Browse Templates
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/delivery" className="btn-ghost inline-flex min-h-11 items-center justify-center px-6">
                Delivery Info
              </Link>
            </div>
          </div>
          <HeroDashboardMockup />
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Browse by Category</h2>
            <p className="mt-2 text-muted">Choose the workflow your next dashboard needs to support.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-lg border border-line bg-surface p-4 transition hover:-translate-y-1 hover:border-accent"
            >
              <span className="mb-4 block h-2 w-14 rounded-full" style={{ backgroundColor: category.color }} />
              <h3 className="font-display text-lg font-bold text-white">{category.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <ProductGrid initialProducts={products} />
      <TrustBar />

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: BadgeDollarSign,
              title: "One-Time Purchase",
              text: "No recurring fees, ever. Buy the template once and keep the source files."
            },
            {
              icon: LockKeyhole,
              title: "Local-First",
              text: "Template data stays in the browser, making each build easy to demo and customize."
            },
            {
              icon: Download,
              title: "Instant Download",
              text: "Paddle handles secure checkout while FlowBoard delivers private dashboard files after purchase."
            }
          ].map((feature) => (
            <div key={feature.title} className="rounded-lg border border-line bg-surface p-6">
              <feature.icon className="h-8 w-8 text-accent" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-2 leading-7 text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3 rounded-lg border border-line bg-[#101018] p-5 text-sm text-muted">
          <FolderKanban className="h-5 w-5 flex-none text-emerald-400" aria-hidden="true" />
          Refund Policy: every template includes a 30-day money-back guarantee.
        </div>
      </section>
    </>
  );
}
