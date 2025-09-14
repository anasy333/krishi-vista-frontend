import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Analytics", href: "/analytics" },
    { name: "Map View", href: "/map" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 py-4 backdrop-blur-md bg-black/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="px-6 py-3 transition-all duration-500 hover:bg-white/10 rounded-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-md">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">KrishiSat</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium text-lg transition-all duration-300 hover:text-primary hover:scale-105 ${
                    location.pathname === item.href
                      ? "text-primary font-bold"
                      : "text-white/90"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact Us Button & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-primary/20 text-white border border-white/30 hover:bg-primary hover:scale-105 font-medium px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  Get Started
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white hover:text-primary transition-all duration-300 hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-white/20 backdrop-blur-md bg-black/30 rounded-xl animate-fade-in">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-medium py-3 px-4 transition-all duration-300 hover:text-primary hover:bg-white/10 rounded-lg ${
                      location.pathname === item.href ? "text-primary bg-primary/20" : "text-white/90"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-primary/20 text-white border border-white/30 hover:bg-primary font-medium px-6 py-3 rounded-full mt-4 w-fit transition-all duration-300"
                >
                  Get Started
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;