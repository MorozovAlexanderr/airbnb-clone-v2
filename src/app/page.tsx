import Header from "@/components/Header";
import SearchModal from "@/components/SearchModal";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <HeroSection />
        <Header />
      </div>
      <SearchModal />
      <CategoriesSection />
      <FeaturedProperties />
      <Footer />
    </main>
  );
}
