
import { Gift, LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Find Gifts', href: '/gift-suggestions' },
    { name: 'Recipients', href: '/recipients' },
    { name: 'Explore', href: '/explore' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gift-gradient rounded-lg group-hover:animate-pulse-glow">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gift-gradient bg-clip-text text-transparent">
            Giftease
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-gift-primary ${
                location.pathname === item.href
                  ? 'text-gift-primary'
                  : 'text-gray-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600 hover:text-gift-primary">
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button className="btn-hero">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/20">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-sm font-medium transition-colors hover:text-gift-primary ${
                  location.pathname === item.href
                    ? 'text-gift-primary'
                    : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/20 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-gray-600">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button className="btn-hero w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
