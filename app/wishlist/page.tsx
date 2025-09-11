import { WishlistPage } from "@/components/wishlist-page";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Wishlist() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <WishlistPage />
      </main>
      <Footer />
    </div>
  );
}

export const metadata = {
  title: "Wishlist - EliteStore",
  description: "Your saved products and favorites",
};
