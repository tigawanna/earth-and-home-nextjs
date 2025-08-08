import { Button } from "@/components/ui/button";
import { Search, Phone, Mail } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-background shadow-xs border-b border-border sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span>info@earthandhome.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Licensed Real Estate Professionals</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/lovable-uploads/85c65874-37e2-449d-b9ec-29ccbf629d79.png"
              alt="Earth & Home Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-playfair font-bold text-primary">
                Earth & Home
              </h1>
              <p className="text-sm text-muted-foreground">Real Estate Excellence</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#properties" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Properties
            </a>
            <a href="#buy" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Buy
            </a>
            <a href="#sell" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Sell
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              List Property
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
