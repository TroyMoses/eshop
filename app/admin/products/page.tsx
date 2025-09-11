import { ProductsManagement } from "@/components/admin/products-management";

export default function AdminProductsPage() {
  return <ProductsManagement />;
}

export const metadata = {
  title: "Products Management - Admin",
  description: "Manage your store products",
};
