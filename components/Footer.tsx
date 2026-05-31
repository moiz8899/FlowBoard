import Link from "next/link";
import { Github, LayoutDashboard, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#08080d]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-bold text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white">
              <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
            </span>
            FlowBoard
          </Link>
          <p className="mt-3 max-w-md text-sm text-muted">
            Premium HTML dashboard templates. One-time payment. Yours forever.
          </p>
          <a href="mailto:dialyn360@gmail.com" className="mt-3 inline-block text-sm text-muted hover:text-white">
            dialyn360@gmail.com
          </a>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Secured by 2Checkout
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/#templates" className="hover:text-white">Templates</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/delivery" className="hover:text-white">Delivery</Link>
          <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
          <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <a href="https://github.com" className="inline-flex items-center gap-1 hover:text-white" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        Copyright 2026 FlowBoard. All rights reserved.
      </div>
    </footer>
  );
}
