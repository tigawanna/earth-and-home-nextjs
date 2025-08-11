import { Header } from "@/components/root/Header";
import { Hero } from "@/components/root/Hero";
import { PropertySearch } from "@/components/root/PropertySearch";
import { FeaturedProperties } from "@/components/root/FeaturedProperties";
import { About } from "@/components/root/About";
import { Footer } from "@/components/root/Footer";
import { SellYourHome } from "@/components/root/SellYourHome";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Site Header */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* Search */}
      <PropertySearch />

      {/* Featured */}
      <FeaturedProperties />

      {/* Sell */}
      <SellYourHome />

      {/* About */}
      <About />

      {/* Footer */}
      <Footer />
    </main>
  );
}
