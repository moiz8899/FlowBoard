import { NextResponse } from "next/server";
import { findProductBySlug } from "@/lib/product-store";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type DownloadRouteProps = {
  params: { slug: string };
};

export async function GET(_request: Request, { params }: DownloadRouteProps) {
  const product = await findProductBySlug(params.slug);

  if (!canDownloadTestFile(product)) {
    return NextResponse.json({ error: "Download is not available." }, { status: 403 });
  }

  const filePath = product.filePath;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from("dashboard-files")
    .download(filePath);

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Could not download file." }, { status: 500 });
  }

  const fileName = filePath.split("/").pop() || `${product.slug}.zip`;
  return new Response(data, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": data.type || "application/zip"
    }
  });
}

export async function HEAD(_request: Request, { params }: DownloadRouteProps) {
  const product = await findProductBySlug(params.slug);
  return new Response(null, { status: canDownloadTestFile(product) ? 204 : 403 });
}

function canDownloadTestFile(
  product: Awaited<ReturnType<typeof findProductBySlug>>
): product is NonNullable<typeof product> & { filePath: string } {
  return Boolean(product?.paymentBypassEnabled && product.filePath);
}
