"use client";

import { initializePaddle, type Environments } from "@paddle/paddle-js";
import type { ReactNode } from "react";
import { useState } from "react";

type BuyButtonProps = {
  paddlePriceId: string;
  productSlug: string;
  label?: ReactNode;
  className?: string;
};

export function BuyButton({
  paddlePriceId,
  productSlug,
  label = "Buy Now",
  className = ""
}: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function openCheckout() {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const environment = (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "sandbox") as Environments;

    if (!token) {
      alert("Paddle is not configured yet.");
      return;
    }

    setIsLoading(true);
    const paddle = await initializePaddle({ token, environment });
    setIsLoading(false);

    if (!paddle) {
      alert("Paddle checkout could not load. Please try again.");
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId: paddlePriceId, quantity: 1 }],
      customData: { productSlug },
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: `${window.location.origin}/checkout/success`
      }
    });
  }

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={isLoading || !paddlePriceId}
      className={`btn-primary inline-flex min-h-11 items-center justify-center text-center disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
}
