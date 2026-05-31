import { UserButton } from "@clerk/nextjs";
import { AdminDashboard } from "@/components/AdminDashboard";
import { requireAdminUser } from "@/lib/admin-auth";
import { readAdminMetrics, readProducts } from "@/lib/product-store";
import { categories } from "@/lib/products";

export const metadata = {
  title: "Admin",
  description: "FlowBoard admin dashboard.",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { email } = await requireAdminUser();
  const [products, metrics] = await Promise.all([readProducts(), readAdminMetrics()]);

  return (
    <>
      <div className="fixed right-4 top-20 z-50">
        <UserButton afterSignOutUrl="/" />
      </div>
      <AdminDashboard initialProducts={products} categories={categories} adminEmail={email} metrics={metrics} />
    </>
  );
}
