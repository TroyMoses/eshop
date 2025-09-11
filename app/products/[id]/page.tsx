import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product-details";
import { ProductReviews } from "@/components/product-reviews";
import { RelatedProducts } from "@/components/related-products";
import { products } from "@/lib/dummy-data";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        <div className="mt-16">
          <ProductReviews productId={product.id} />
        </div>
        <div className="mt-16">
          <RelatedProducts currentProduct={product} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - EliteStore`,
    description: product.description,
  };
}
