import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const screenshotBucket = "dashboard-screenshots";
const fileBucket = "dashboard-files";

export async function POST(request: Request) {
  if (!(await assertAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const slug = String(formData.get("slug") || "dashboard");
  const type = String(formData.get("type") || "screenshot");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const bucket = type === "file" ? fileBucket : screenshotBucket;
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, "-");
  const path = `${slug}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type || undefined
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (bucket === screenshotBucket) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ bucket, path, publicUrl: data.publicUrl });
  }

  return NextResponse.json({ bucket, path });
}
