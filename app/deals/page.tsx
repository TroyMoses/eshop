import { DealsHero } from "@/components/deals-hero";
import { DealsGrid } from "@/components/deals-grid";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <DealsHero />
        <DealsGrid />
      </main>
      <Footer />
    </div>
  );
}

export const metadata = {
  title: "Deals & Promotions - EliteStore",
  description: "Discover amazing deals and promotions on premium products",
};
