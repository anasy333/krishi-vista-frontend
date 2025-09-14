import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "#" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-md">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-gray-900">sabagroup</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-gray-700"
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
                  className="bg-secondary text-secondary-foreground hover:bg-secondary-hover font-medium px-6 py-2 rounded-full"
                >
                  Contact Us
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-medium py-2 transition-colors hover:text-primary ${
                      location.pathname === item.href ? "text-primary" : "text-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary-hover font-medium px-6 py-2 rounded-full mt-4 w-fit"
                >
                  Contact Us
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