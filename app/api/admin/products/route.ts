import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { addProduct, readProducts } from "@/lib/product-store";

export async function GET() {
  if (!(await assertAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ products: await readProducts() });
}

export async function POST(request: Request) {
  if (!(await assertAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const product = await addProduct(payload);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not add dashboard." },
      { status: 400 }
    );
  }
}
