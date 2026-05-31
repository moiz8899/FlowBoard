import { getCheckoutUrl } from "@/lib/products";
import type { ReactNode } from "react";

type BuyButtonProps = {
  twoCheckoutProductId: string;
  label?: ReactNode;
  className?: string;
};

export function BuyButton({
  twoCheckoutProductId,
  label = "Buy Now",
  className = ""
}: BuyButtonProps) {
  return (
    <a
      href={getCheckoutUrl(twoCheckoutProductId)}
      className={`btn-primary inline-flex min-h-11 items-center justify-center text-center ${className}`}
    >
      {label}
    </a>
  );
}
