import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Purchase Confirmed",
  description: "Your FlowBoard purchase is confirmed."
};

export default function CheckoutSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <CheckCircle2 className="h-16 w-16 text-emerald-400" aria-hidden="true" />
      <h1 className="mt-6 font-display text-4xl font-bold text-white">Your purchase is confirmed!</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        Check your email for the download link. If you do not see it, check spam or promotions.
      </p>
      <Link href="/#templates" className="btn-primary mt-8 inline-flex min-h-11 items-center px-6">
        Back to Templates
      </Link>
    </section>
  );
}
