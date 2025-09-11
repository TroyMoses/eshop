import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { CategoryHeader } from "@/components/category-header";
import { ProductFilters } from "@/components/product-filters";
import { categories, products } from "@/lib/dummy-data";

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: string;
    price?: string;
    brand?: string;
    rating?: string;
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Filter products by category
  let categoryProducts = products.filter(
    (product) => product.category === category.name
  );

  // Apply filters based on search params
  if (searchParams.brand) {
    categoryProducts = categoryProducts.filter(
      (product) => product.brand === searchParams.brand
    );
  }

  if (searchParams.rating) {
    const minRating = Number.parseFloat(searchParams.rating);
    categoryProducts = categoryProducts.filter(
      (product) => product.rating >= minRating
    );
  }

  if (searchParams.price) {
    const [min, max] = searchParams.price.split("-").map(Number);
    categoryProducts = categoryProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  // Apply sorting
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "price-low":
        categoryProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        categoryProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        categoryProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        categoryProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // Default sorting by featured first, then by rating
        categoryProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CategoryHeader category={category} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters category={category} />
          </aside>
          <main className="flex-1">
            <ProductGrid products={categoryProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - EliteStore`,
    description: category.description,
  };
}
