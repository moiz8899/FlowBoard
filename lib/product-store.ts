import "server-only";

import type { Product } from "@/lib/products";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_label: string;
  price: number;
  original_price: number | null;
  description: string;
  long_description: string;
  features: string[];
  tech_stack: string[];
  screenshots: string[];
  file_path: string | null;
  rating: number;
  review_count: number;
  download_count: number;
  tags: string[];
  paddle_price_id: string;
  payment_bypass_enabled: boolean;
  created_at: string;
  version: string;
};

export type ProductPayload = Omit<Product, "id" | "rating" | "reviewCount" | "downloadCount" | "createdAt" | "version"> &
  Partial<Pick<Product, "id" | "rating" | "reviewCount" | "downloadCount" | "createdAt" | "version">>;

export type AdminMetrics = {
  websiteTraffic: number;
  revenue: number;
  dailySales: number;
  conversionRate: number;
  topProducts: Array<{
    name: string;
    slug: string;
    unitsSold: number;
    revenue: number;
  }>;
};

export async function readProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig()) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []).map(mapProductRow);
}

export async function findProductBySlug(slug: string) {
  if (!hasSupabaseConfig()) return undefined;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? mapProductRow(data as ProductRow) : undefined;
}

export async function findProductsByCategory(slug: string) {
  if (!hasSupabaseConfig()) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []).map(mapProductRow);
}

export async function addProduct(payload: ProductPayload) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured yet.");
  }

  const supabase = getSupabaseAdmin();
  const row = productPayloadToRow(payload);
  const { data, error } = await supabase
    .from("products")
    .insert(row)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapProductRow(data as ProductRow);
}

export async function deleteProduct(slug: string) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured yet.");
  }

  const supabase = getSupabaseAdmin();
  const { error, count } = await supabase
    .from("products")
    .delete({ count: "exact" })
    .eq("slug", slug);

  if (error) throw new Error(error.message);
  return Boolean(count);
}

export async function readAdminMetrics(): Promise<AdminMetrics> {
  if (!hasSupabaseConfig()) {
    return {
      websiteTraffic: 0,
      revenue: 0,
      dailySales: 0,
      conversionRate: 0,
      topProducts: []
    };
  }

  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().slice(0, 10);
  const [{ data: dailyRows }, { data: topRows }] = await Promise.all([
    supabase.from("admin_daily_sales").select("*").eq("day", today).maybeSingle(),
    supabase.from("admin_top_products").select("*").limit(5)
  ]);

  const daily = dailyRows as { sales?: number; revenue?: number } | null;
  const topProducts = ((topRows || []) as Array<{
    name: string;
    slug: string;
    units_sold: number;
    revenue: number;
  }>).map((product) => ({
    name: product.name,
    slug: product.slug,
    unitsSold: product.units_sold,
    revenue: product.revenue
  }));

  return {
    websiteTraffic: 0,
    revenue: daily?.revenue || 0,
    dailySales: daily?.sales || 0,
    conversionRate: 0,
    topProducts
  };
}

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categoryLabel: row.category_label,
    price: row.price,
    originalPrice: row.original_price || undefined,
    description: row.description,
    longDescription: row.long_description,
    features: row.features || [],
    techStack: row.tech_stack || [],
    screenshots: row.screenshots || [],
    filePath: row.file_path || undefined,
    rating: Number(row.rating || 0),
    reviewCount: row.review_count || 0,
    downloadCount: row.download_count || 0,
    tags: row.tags || [],
    paddlePriceId: row.paddle_price_id,
    paymentBypassEnabled: row.payment_bypass_enabled || false,
    createdAt: row.created_at,
    version: row.version
  };
}

function productPayloadToRow(payload: ProductPayload) {
  return {
    slug: payload.slug,
    name: payload.name,
    category: payload.category,
    category_label: payload.categoryLabel,
    price: Number(payload.price),
    original_price: payload.originalPrice ? Number(payload.originalPrice) : null,
    description: payload.description,
    long_description: payload.longDescription,
    features: payload.features || [],
    tech_stack: payload.techStack || [],
    screenshots: payload.screenshots || [],
    file_path: payload.filePath || null,
    rating: payload.rating ?? 0,
    review_count: payload.reviewCount ?? 0,
    download_count: payload.downloadCount ?? 0,
    tags: payload.tags || [],
    paddle_price_id: payload.paddlePriceId,
    payment_bypass_enabled: payload.paymentBypassEnabled || false,
    version: payload.version || "1.0.0"
  };
}
