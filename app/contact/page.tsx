import { Mail, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Contact FlowBoard support."
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
        Contact FlowBoard
      </h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        For product questions, payment help, download issues, or refund requests, contact us by email.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:dialyn360@gmail.com"
          className="rounded-lg border border-line bg-surface p-6 transition hover:border-accent"
        >
          <Mail className="h-7 w-7 text-accent" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-bold text-white">Email Support</h2>
          <p className="mt-2 text-muted">dialyn360@gmail.com</p>
        </a>
        <div className="rounded-lg border border-line bg-surface p-6">
          <ShieldCheck className="h-7 w-7 text-emerald-400" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-bold text-white">Response Time</h2>
          <p className="mt-2 text-muted">We aim to respond within 1-2 business days.</p>
        </div>
      </div>
    </section>
  );
}
