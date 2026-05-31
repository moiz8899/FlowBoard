import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Payment Cancelled",
  description: "Your FlowBoard checkout was cancelled."
};

export default function CheckoutCancelPage() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <XCircle className="h-16 w-16 text-red-400" aria-hidden="true" />
      <h1 className="mt-6 font-display text-4xl font-bold text-white">Payment cancelled.</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        No charges were made. You can return to the catalog and try again anytime.
      </p>
      <Link href="/#templates" className="btn-primary mt-8 inline-flex min-h-11 items-center px-6">
        Try Again
      </Link>
    </section>
  );
}
