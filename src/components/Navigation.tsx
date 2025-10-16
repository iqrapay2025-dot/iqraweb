import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";
import logoLight from "figma:asset/39ba4a0dd03e9a935003109f9573af3b0b10ff85.png";
import logoDark from "figma:asset/95c433e7c8d7b15a23b7736bc56fc1d657934d51.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navigation({ currentPage, onNavigate, darkMode, toggleDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [logoTapTimer, setLogoTapTimer] = useState<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  // Triple tap on logo to access admin (mobile friendly)
  const handleLogoTap = () => {
    const newCount = logoTapCount + 1;
    setLogoTapCount(newCount);

    if (logoTapTimer) {
      clearTimeout(logoTapTimer);
    }

    if (newCount === 3) {
      // Three taps to access admin
      onNavigate('admin-login');
      setLogoTapCount(0);
      setLogoTapTimer(null);
      return;
    }

    // Reset after 5 seconds of inactivity
    const timer = setTimeout(() => {
      setLogoTapCount(0);
    }, 5000);
    setLogoTapTimer(timer);
  };

  const navItems = [
    { name: t('nav.home'), id: "home" },
    { name: t('nav.about'), id: "about" },
    { name: t('nav.howItWorks'), id: "how-it-works" },
    { name: t('nav.ambassadors'), id: "ambassadors" },
    { name: t('nav.blog'), id: "blog-list" },
    { name: t('nav.contact'), id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={(e) => {
              if (e.detail === 1) {
                // Single click - go home
                setTimeout(() => {
                  if (logoTapCount < 2) {
                    onNavigate("home");
                  }
                }, 250);
              }
              // Track taps for admin access
              handleLogoTap();
            }}
          >
            <img 
              src={darkMode ? logoDark : logoLight} 
              alt="IqraPay Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Language Selector, Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-lg"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
