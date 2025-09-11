import { ProductGrid } from "@/components/product-grid";
import type { Product } from "@/lib/types";
import { products } from "@/lib/dummy-data";

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Get related products from the same category, excluding the current product
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-balance">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
}
