import { memo, useCallback, useMemo } from "react";
import { useLegalModals } from "./LegalModals";
import { useLanguage } from "../context/LanguageContext";

const FooterLink = memo(({ link, onClick }) => (
  <a href={link.href} className="footer__link" onClick={onClick}>
    {link.label}
  </a>
));

FooterLink.displayName = "FooterLink";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const { openMentionsLegales, openConfidentialite, openCookieConsent } = useLegalModals();

  const legalLinks = useMemo(
    () => [
      { label: "Mentions légales", action: openMentionsLegales },
      { label: "Politique de confidentialité", action: openConfidentialite },
      { label: "Gérer mes cookies", action: openCookieConsent },
    ],
    [openMentionsLegales, openConfidentialite, openCookieConsent]
  );

  const scrollToSection = useCallback((e, href) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <span className="footer__logo-dot" />
              Supaco Digital
            </a>
            <p className="footer__tagline">{t.footer.tagline}</p>
            <div className="footer__newsletter">
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder={t.footer.emailPlaceholder}
              />
              <button className="footer__newsletter-btn">{t.footer.subscribe}</button>
            </div>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">{t.footer.servicesTitle}</h4>
            {t.footer.links.services.map((link) => (
              <FooterLink
                key={link.label}
                link={link}
                onClick={(e) => scrollToSection(e, link.href)}
              />
            ))}
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">{t.footer.companyTitle}</h4>
            {t.footer.links.company.map((link) => (
              <FooterLink
                key={link.label}
                link={link}
                onClick={(e) => scrollToSection(e, link.href)}
              />
            ))}
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">{t.footer.legalTitle}</h4>
            {legalLinks.map((link) => (
              <button
                key={link.label}
                className="footer__link footer__link--btn"
                onClick={link.action}
                type="button"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Supaco Digital. {t.footer.copyright}
          </p>
          <div className="footer__social" aria-label="Réseaux sociaux">
            <a
              href="https://www.instagram.com/supacodigital"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Supaco Digital sur Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/supaco-digital"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Supaco Digital sur LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__decoration" />
    </footer>
  );
};

export default memo(Footer);
