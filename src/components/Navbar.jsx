import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projects" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

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
            <img src="/newlogo.png" alt="logo" />
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

          <button
            className="navbar__mobile-toggle navbar__mobile-toggle--icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.div
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{
                rotate: isMobileMenuOpen ? 180 : 0,
                scale: 1,
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
