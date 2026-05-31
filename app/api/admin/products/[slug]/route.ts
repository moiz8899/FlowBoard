import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { deleteProduct } from "@/lib/product-store";

type ProductRouteProps = {
  params: { slug: string };
};

export async function DELETE(_request: Request, { params }: ProductRouteProps) {
  if (!(await assertAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await deleteProduct(params.slug);
  if (!deleted) {
    return NextResponse.json({ error: "Dashboard not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
