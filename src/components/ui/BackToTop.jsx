import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Dé-duplique les événements scroll via rAF pour éviter le thrashing sur mobile
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > 500);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={`back-to-top ${visible ? "back-to-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
    >
      <ArrowUp size={18} />
    </button>
  );
}
