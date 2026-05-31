import { Download, LockKeyhole, Puzzle, Star } from "lucide-react";

const stats = [
  { icon: Puzzle, label: "Templates Coming Soon" },
  { icon: Download, label: "Instant Downloads" },
  { icon: Star, label: "Buyer Reviews Ready" },
  { icon: LockKeyhole, label: "Secure 2Checkout Payments" }
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-surface/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/5 text-accent">
              <stat.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-semibold text-white">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
