import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Throttle utility
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const lastScrollY = useRef(0);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      if (currentY > lastScrollY.current && currentY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: t.nav.services, href: "#services" },
      { label: t.nav.projects, href: "#projects" },
      { label: t.nav.contact, href: "#contact" },
    ],
    [t]
  );

  useEffect(() => {
    const sectionIds = ["services", "projects", "contact"];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  }, []);

  return (
    <>
      <nav
        className={`navbar${isScrolled ? " navbar--scrolled" : ""}${
          isHidden ? " navbar--hidden" : ""
        }`}
      >
        <div className="navbar__container">
          <a href="/" className="navbar__logo">
            <img src="/logo2026.png" alt="logo" loading="eager" />
          </a>

          <div className="navbar__menu">
            {navLinks.map((link) => {
              const sectionId = link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`navbar__link${
                    activeSection === sectionId ? " navbar__link--active" : ""
                  }`}
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="navbar__actions">
            <button
              className="navbar__lang-toggle"
              onClick={toggleLang}
              aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>

            <button
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={
                isDarkMode ? t.nav.lightMode : t.nav.darkMode
              }
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

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
          <div className="navbar__mobile-overlay" onClick={toggleMobileMenu} />
          <div className="navbar__mobile-menu navbar__mobile-menu--open">
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
                  key={link.href}
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
              {t.nav.startProject}
            </a>

            <div className="navbar__mobile-bottom">
              <button
                className="navbar__mobile-theme"
                onClick={toggleTheme}
                aria-label={isDarkMode ? t.nav.lightMode : t.nav.darkMode}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{isDarkMode ? t.nav.lightMode : t.nav.darkMode}</span>
              </button>

              <button
                className="navbar__mobile-lang"
                onClick={toggleLang}
                aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
              >
                {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
