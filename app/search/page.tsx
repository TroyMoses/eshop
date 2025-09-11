import { SearchResults } from "@/components/search-results";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <SearchResults searchParams={searchParams} />
      </main>
      <Footer />
    </div>
  );
}

export const metadata = {
  title: "Search Results - EliteStore",
  description: "Find the products you're looking for",
};
