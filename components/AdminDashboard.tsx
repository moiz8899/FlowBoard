"use client";

import { useMemo, useState, useTransition } from "react";
import type { FormEvent } from "react";
import {
  BarChart3,
  DollarSign,
  Eye,
  FileArchive,
  FileUp,
  ImageUp,
  PackagePlus,
  ShoppingCart,
  Trash2,
  TrendingUp
} from "lucide-react";
import type { Category, Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import type { AdminMetrics } from "@/lib/product-store";

type AdminDashboardProps = {
  initialProducts: Product[];
  categories: Category[];
  adminEmail: string;
  metrics: AdminMetrics;
};

type FormState = {
  name: string;
  slug: string;
  category: string;
  price: string;
  originalPrice: string;
  description: string;
  longDescription: string;
  screenshots: string;
  filePath: string;
  features: string;
  techStack: string;
  tags: string;
  twoCheckoutProductId: string;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  category: "crm",
  price: "",
  originalPrice: "",
  description: "",
  longDescription: "",
  screenshots: "",
  filePath: "",
  features: "",
  techStack: "HTML5, CSS3, JavaScript",
  tags: "",
  twoCheckoutProductId: ""
};

export function AdminDashboard({ initialProducts, categories, adminEmail, metrics }: AdminDashboardProps) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const metricCards = useMemo(
    () => [
      { label: "Website Traffic", value: String(metrics.websiteTraffic), note: "Connect analytics API", icon: Eye },
      {
        label: "Revenue",
        value: formatPrice(metrics.revenue),
        note: "From synced orders",
        icon: DollarSign
      },
      { label: "Daily Sales", value: String(metrics.dailySales), note: "Today", icon: ShoppingCart },
      { label: "Conversion Rate", value: `${metrics.conversionRate}%`, note: "Needs visits + orders", icon: TrendingUp }
    ],
    [metrics]
  );

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: current.slug || slugify(value)
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const category = categories.find((item) => item.slug === form.category) || categories[0];
    const payload = {
      name: form.name,
      slug: form.slug,
      category: category.slug,
      categoryLabel: category.label,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      description: form.description,
      longDescription: form.longDescription,
      screenshots: splitList(form.screenshots),
      filePath: form.filePath || undefined,
      features: splitList(form.features),
      techStack: splitList(form.techStack),
      tags: splitList(form.tags),
      twoCheckoutProductId: form.twoCheckoutProductId
    };

    startTransition(async () => {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Could not add dashboard.");
        return;
      }

      setProducts((current) => [data.product, ...current]);
      setForm(emptyForm);
      setMessage("Dashboard added.");
    });
  }

  function handleDelete(slug: string) {
    setMessage("");
    startTransition(async () => {
      const response = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Could not delete dashboard.");
        return;
      }

      setProducts((current) => current.filter((product) => product.slug !== slug));
      setMessage("Dashboard deleted.");
    });
  }

  async function uploadFile(file: File, type: "screenshot" | "file") {
    setMessage(`Uploading ${file.name}...`);
    const body = new FormData();
    body.append("file", file);
    body.append("type", type);
    body.append("slug", form.slug || slugify(form.name) || "dashboard");

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Upload failed.");
      return;
    }

    if (type === "screenshot") {
      setForm((current) => ({
        ...current,
        screenshots: current.screenshots
          ? `${current.screenshots}\n${data.publicUrl}`
          : data.publicUrl
      }));
    } else {
      setForm((current) => ({ ...current, filePath: data.path }));
    }

    setMessage("Upload complete.");
  }

  return (
    <section className="min-h-[80vh] bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-muted">
              Signed in as {adminEmail}
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">
              FlowBoard Admin
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Manage dashboard products now. Traffic, revenue, and sales metrics are ready for analytics and 2Checkout integrations.
            </p>
          </div>
          <a href="/" className="btn-ghost inline-flex min-h-11 items-center justify-center px-5">
            View Storefront
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-muted">{metric.label}</p>
                <metric.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-white">{metric.value}</p>
              <p className="mt-1 text-sm text-muted">{metric.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="rounded-lg border border-line bg-surface">
            <div className="border-b border-line p-5">
              <h2 className="font-display text-2xl font-bold text-white">Dashboard Products</h2>
              <p className="mt-1 text-sm text-muted">These products are stored in Supabase through the admin API.</p>
            </div>
            {products.length === 0 ? (
              <div className="p-10 text-center">
                <FileArchive className="mx-auto h-12 w-12 text-muted" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold text-white">No dashboards in the catalog</h3>
                <p className="mx-auto mt-3 max-w-lg text-muted">Add your first dashboard using the form.</p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="font-semibold text-white">{product.name}</p>
                      <p className="text-sm text-muted">
                        {product.categoryLabel} · {formatPrice(product.price)}
                      </p>
                    </div>
                    <button
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-muted transition hover:border-red-400 hover:text-red-300 disabled:opacity-50"
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(product.slug)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <form className="rounded-lg border border-line bg-surface p-5" onSubmit={handleSubmit}>
              <div className="flex items-center gap-3">
                <PackagePlus className="h-6 w-6 text-accent" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold text-white">Add Dashboard</h2>
              </div>
              <div className="mt-5 space-y-4">
                <Field label="Name" value={form.name} onChange={handleNameChange} required />
                <Field label="Slug" value={form.slug} onChange={(value) => updateField("slug", slugify(value))} required />
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Category</span>
                  <select
                    className="mt-2 min-h-11 w-full rounded-md border border-line bg-ink px-3 text-white outline-none focus:border-accent"
                    value={form.category}
                    onChange={(event) => updateField("category", event.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price" value={form.price} onChange={(value) => updateField("price", value)} required />
                  <Field label="Original Price" value={form.originalPrice} onChange={(value) => updateField("originalPrice", value)} />
                </div>
                <Field label="Short Description" value={form.description} onChange={(value) => updateField("description", value)} required />
                <TextField label="Long Description" value={form.longDescription} onChange={(value) => updateField("longDescription", value)} required />
                <Field label="2Checkout Product ID" value={form.twoCheckoutProductId} onChange={(value) => updateField("twoCheckoutProductId", value)} required />
                <FilePicker
                  label="Upload Dashboard ZIP"
                  accept=".zip,application/zip,application/x-zip-compressed"
                  icon="file"
                  onPick={(file) => uploadFile(file, "file")}
                />
                {form.filePath ? (
                  <p className="rounded-md border border-line bg-ink p-3 text-xs text-muted">ZIP path: {form.filePath}</p>
                ) : null}
                <FilePicker
                  label="Upload Screenshots"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  icon="image"
                  multiple
                  onPick={(file) => uploadFile(file, "screenshot")}
                />
                <TextField label="Screenshot Paths, one per line" value={form.screenshots} onChange={(value) => updateField("screenshots", value)} />
                <TextField label="Features, one per line" value={form.features} onChange={(value) => updateField("features", value)} />
                <Field label="Tech Stack, comma separated" value={form.techStack} onChange={(value) => updateField("techStack", value)} />
                <Field label="Tags, comma separated" value={form.tags} onChange={(value) => updateField("tags", value)} />
              </div>
              {message ? <p className="mt-4 text-sm text-muted">{message}</p> : null}
              <button className="btn-primary mt-5 inline-flex min-h-11 w-full items-center justify-center px-5 disabled:opacity-60" disabled={isPending}>
                {isPending ? "Saving..." : "Add Dashboard"}
              </button>
            </form>

            <div className="rounded-lg border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-accent" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold text-white">Top Selling</h2>
              </div>
              {metrics.topProducts.length === 0 ? (
                <div className="mt-6 rounded-md border border-dashed border-line p-6 text-center text-sm text-muted">
                  Connect 2Checkout order data to rank dashboards by sales.
                </div>
              ) : (
                <div className="mt-5 divide-y divide-line">
                  {metrics.topProducts.map((product) => (
                    <div key={product.slug} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <p className="font-semibold text-white">{product.name}</p>
                        <p className="text-muted">{product.unitsSold} sold</p>
                      </div>
                      <p className="font-semibold text-white">{formatPrice(product.revenue)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilePicker({
  label,
  accept,
  multiple = false,
  icon,
  onPick
}: {
  label: string;
  accept: string;
  multiple?: boolean;
  icon: "file" | "image";
  onPick: (file: File) => void;
}) {
  const Icon = icon === "file" ? FileUp : ImageUp;

  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-line bg-ink px-3 text-sm font-semibold text-white transition hover:border-accent">
      <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
      {label}
      <input
        className="sr-only"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => {
          Array.from(event.target.files || []).forEach(onPick);
          event.target.value = "";
        }}
      />
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <input
        className="mt-2 min-h-11 w-full rounded-md border border-line bg-ink px-3 text-white outline-none focus:border-accent"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <textarea
        className="mt-2 min-h-24 w-full resize-y rounded-md border border-line bg-ink px-3 py-3 text-white outline-none focus:border-accent"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

function splitList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
