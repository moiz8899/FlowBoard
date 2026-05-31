import { NextResponse } from "next/server";
import { findProductBySlug } from "@/lib/product-store";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type DownloadRouteProps = {
  params: { slug: string };
};

export async function GET(_request: Request, { params }: DownloadRouteProps) {
  const product = await findProductBySlug(params.slug);

  if (!product || !product.paymentBypassEnabled) {
    return NextResponse.json({ error: "Download is not available." }, { status: 403 });
  }

  if (!product.filePath) {
    return NextResponse.json({ error: "No dashboard ZIP has been uploaded for this product." }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from("dashboard-files")
    .createSignedUrl(product.filePath, 60 * 10);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: error?.message || "Could not create download link." }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
