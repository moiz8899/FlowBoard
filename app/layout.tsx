import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FlowBoard | Premium HTML Dashboard Templates",
    template: "%s | FlowBoard"
  },
  description:
    "Buy production-ready HTML dashboard templates with one-time pricing, instant download, and no subscription.",
  openGraph: {
    title: "FlowBoard",
    description: "Premium HTML dashboard templates for real work.",
    url: siteUrl,
    siteName: "FlowBoard",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const page = (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return page;
  }

  return <ClerkProvider>{page}</ClerkProvider>;
}
