import { useState, useEffect, useCallback, useMemo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Sun, Moon } from "lucide-react";

// Throttle utility
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialiser depuis localStorage ou true par défaut
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    // Appliquer le thème au chargement
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    // Throttle le scroll handler à 100ms
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoize les liens de navigation
  const navLinks = useMemo(() => [
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projects" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ], []);

  const scrollToSection = useCallback((e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__container">
          <a href="/" className="navbar__logo">
            <img src="/newlogo.png" alt="logo" loading="eager" />
          </a>

          <div className="navbar__menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="navbar__link"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="navbar__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <>
          {/* Overlay pour fermer en cliquant à l'extérieur */}
          <div
            className="navbar__mobile-overlay"
            onClick={toggleMobileMenu}
          />
          <div className="navbar__mobile-menu navbar__mobile-menu--open">
            {/* Bouton fermer en haut du menu */}
            <button
              className="navbar__mobile-close"
              onClick={toggleMobileMenu}
              aria-label="Fermer le menu"
            >
              <FiX size={28} />
            </button>

            <div className="navbar__mobile-links">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="navbar__link"
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="navbar__cta"
              onClick={(e) => scrollToSection(e, "#contact")}
            >
              Démarrer un projet
            </a>

            {/* Toggle thème dans le menu mobile */}
            <button
              className="navbar__mobile-theme"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Mode clair" : "Mode sombre"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? "Mode clair" : "Mode sombre"}</span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;