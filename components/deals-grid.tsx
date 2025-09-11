import { ProductGrid } from "@/components/product-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, promotions } from "@/lib/dummy-data";

export function DealsGrid() {
  // Get products on sale (with originalPrice)
  const saleProducts = products.filter((product) => product.originalPrice);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Active Promotions */}
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6 text-balance">
            Active Promotions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions
              .filter((promo) => promo.active)
              .map((promotion, index) => (
                <Card
                  key={promotion.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {promotion.title}
                      </CardTitle>
                      <Badge variant="destructive">
                        {promotion.discountType === "percentage"
                          ? `${promotion.discountValue}% OFF`
                          : `$${promotion.discountValue} OFF`}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-pretty">
                      {promotion.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      {promotion.code && (
                        <Badge variant="outline" className="font-mono">
                          {promotion.code}
                        </Badge>
                      )}
                      <span className="text-muted-foreground">
                        Valid until{" "}
                        {new Date(promotion.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Sale Products */}
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6 text-balance">
            Products on Sale
          </h2>
          <ProductGrid products={saleProducts} />
        </div>
      </div>
    </section>
  );
}
