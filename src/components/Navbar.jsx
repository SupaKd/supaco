import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <motion.nav
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="navbar__container">
          <a href="/" className="navbar__logo">
            <img src="/newlogo.png" alt="logo" loading="eager" />
          </a>

          <div className="navbar__menu">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="navbar__link"
                onClick={(e) => scrollToSection(e, link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#contact"
            className="navbar__cta"
            onClick={(e) => scrollToSection(e, "#contact")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Démarrer un projet
          </motion.a>

          <motion.button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <button
            className="navbar__mobile-toggle navbar__mobile-toggle--icon"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isMobileMenuOpen ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navbar__mobile-menu navbar__mobile-menu--open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="navbar__link"
                onClick={(e) => scrollToSection(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="navbar__cta"
              onClick={(e) => scrollToSection(e, "#contact")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Démarrer un projet
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;