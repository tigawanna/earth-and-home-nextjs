import { ResponsiveDrawer } from "@/components/root/ResponsiveDrawer";
import { Hero } from "@/components/root/Hero";
import { PropertySearch } from "@/components/root/PropertySearch";
import { FeaturedProperties } from "@/components/root/FeaturedProperties";
import { About } from "@/components/root/About";
import { Footer } from "@/components/root/Footer";
import { SellYourHome } from "@/components/root/SellYourHome";

export default function Home() {
  return (
    <ResponsiveDrawer>
      <main className="min-h-screen ">
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
    </ResponsiveDrawer>
  );
}
