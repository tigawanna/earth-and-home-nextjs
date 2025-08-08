import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PropertySearch } from "@/components/landing/PropertySearch";
import { FeaturedProperties } from "@/components/landing/FeaturedProperties";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";
import { SellYourHome } from "@/components/landing/SellYourHome";

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
