"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { TopDealsSlider } from "@/components/top-deals-slider";
import { HalfPriceDeals } from "@/components/half-price-deals";
import { SmartphoneDeals } from "@/components/smartphone-deals";
import { TopBrands } from "@/components/top-brands";
import { HomeEntertainmentDeals } from "@/components/home-entertainment-deals";
import { AllProductsSection } from "@/components/all-products-section";
import { CategoryGrid } from "@/components/category-grid";
// import { FeaturedProducts } from "@/components/featured-products";
// import { TestimonialsSection } from "@/components/testimonials-section";
// import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TopDealsSlider />
        <HalfPriceDeals />
        <SmartphoneDeals />
        <TopBrands />
        <HomeEntertainmentDeals />
        <AllProductsSection />
        <CategoryGrid />
        {/* <FeaturedProducts /> */}
        {/* <TestimonialsSection /> */}
        {/* <NewsletterSection /> */}
      </main>
      <Footer />
    </div>
  );
}
