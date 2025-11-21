import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
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
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-brand-pink text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-burgundy transition-all hover:scale-110 active:scale-95"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" strokeWidth={2} />
    </button>
  );
}
