"use client";

import Link from "next/link";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#templates", label: "Templates" },
  { href: "/#categories", label: "Categories" },
  { href: "/#pricing", label: "Pricing" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-bold text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white">
            <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
          </span>
          FlowBoard
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/#templates" className="btn-primary hidden min-h-11 items-center px-5 text-sm md:inline-flex">
          Browse Templates
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-line bg-surface px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 rounded-md px-2 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
