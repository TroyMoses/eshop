import { AboutHero } from "@/components/about-hero";
import { AboutStats } from "@/components/about-stats";
import { AboutTeam } from "@/components/about-team";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <AboutStats />
        <AboutTeam />
      </main>
      <Footer />
    </div>
  );
}

export const metadata = {
  title: "About Us - EliteStore",
  description: "Learn more about our company and mission",
};
