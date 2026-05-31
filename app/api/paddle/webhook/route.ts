import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("Paddle-Signature") || "";
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET || "";

  if (!webhookSecret || !isValidPaddleSignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as PaddleWebhookEvent;

  if (!["transaction.completed", "transaction.paid"].includes(event.event_type)) {
    return NextResponse.json({ ok: true });
  }

  const transaction = event.data;
  const transactionId = transaction.id;
  const email = transaction.customer?.email || transaction.customer_email || null;
  const currency = transaction.currency_code || transaction.details?.totals?.currency_code || "USD";
  const total = minorUnitsToWholeCurrency(transaction.details?.totals?.grand_total || transaction.details?.totals?.total || 0);
  const items = transaction.items || transaction.details?.line_items || [];

  const supabase = getSupabaseAdmin();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .upsert(
      {
        paddle_transaction_id: transactionId,
        buyer_email: email,
        gross_amount: total,
        currency,
        status: "completed"
      },
      { onConflict: "paddle_transaction_id" }
    )
    .select("id")
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  for (const item of items) {
    const priceId = item.price?.id || item.price_id || item.priceId;
    const quantity = Number(item.quantity || 1);
    const unitPrice = minorUnitsToWholeCurrency(item.price?.unit_price?.amount || item.unit_totals?.total || item.totals?.total || 0);

    if (!priceId) continue;

    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("paddle_price_id", priceId)
      .maybeSingle();

    if (!product) continue;

    await supabase.from("order_items").upsert(
      {
        order_id: order.id,
        product_id: product.id,
        quantity,
        unit_price: unitPrice
      },
      { onConflict: "order_id,product_id" }
    );
  }

  return NextResponse.json({ ok: true });
}

function minorUnitsToWholeCurrency(value: string | number) {
  return Math.round(Number(value || 0) / 100);
}

function isValidPaddleSignature(rawBody: string, header: string, secret: string) {
  const parts = Object.fromEntries(
    header.split(";").map((part) => {
      const [key, value] = part.split("=");
      return [key, value];
    })
  );
  const timestamp = parts.ts;
  const signature = parts.h1;

  if (!timestamp || !signature) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (ageSeconds > 300) return false;

  const signedPayload = `${timestamp}:${rawBody}`;
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

type PaddleWebhookEvent = {
  event_type: string;
  data: {
    id: string;
    customer_email?: string;
    customer?: { email?: string };
    currency_code?: string;
    details?: {
      totals?: {
        total?: string | number;
        grand_total?: string | number;
        currency_code?: string;
      };
      line_items?: PaddleLineItem[];
    };
    items?: PaddleLineItem[];
  };
};

type PaddleLineItem = {
  quantity?: number;
  price_id?: string;
  priceId?: string;
  price?: {
    id?: string;
    unit_price?: { amount?: string | number };
  };
  unit_totals?: { total?: string | number };
  totals?: { total?: string | number };
};
