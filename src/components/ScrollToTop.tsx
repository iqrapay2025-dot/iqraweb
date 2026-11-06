import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

export function ScrollToTop() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-[60] h-12 w-12 rounded-full bg-action text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-action/90"
          aria-label={t("nav.scrollToTop")}
        >
          <ArrowUp className="h-6 w-6" stroke="white" />
        </Button>
      )}
    </>
  );
}
