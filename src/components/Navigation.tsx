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
    { name: t('nav.sponsors'), id: "sponsors" },
    { name: t('nav.contact'), id: "contact" },
  ];

  return (
    <nav className="relative z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex h-16 items-center justify-between md:h-[4.5rem]">
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
              width="666"
              height="435"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`rounded-sm py-2 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                  currentPage === item.id
                    ? "text-primary"
                    : "text-foreground"
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
              className="rounded-sm"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <button
              className="md:hidden rounded-sm p-2 transition-colors hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="iqrapay-mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="iqrapay-mobile-navigation" className="border-t border-border bg-background px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full rounded-sm px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-muted ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
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
