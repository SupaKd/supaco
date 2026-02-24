import { memo, useCallback, useMemo } from 'react';
import { useLegalModals } from './LegalModals';

const FooterLink = memo(({ link, onClick }) => (
  <a
    href={link.href}
    className="footer__link"
    onClick={onClick}
  >
    {link.label}
  </a>
));

FooterLink.displayName = 'FooterLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openMentionsLegales, openConfidentialite, openCookieConsent } = useLegalModals();

  const footerLinks = useMemo(() => ({
    services: [
      { label: 'Site Vitrine', href: '#services' },
      { label: 'E-Commerce', href: '#services' },
      { label: 'Application Web', href: '#services' },
      { label: 'Maintenance', href: '#contact' },
    ],
    company: [
      { label: 'À propos', href: '#' },
      { label: 'Portfolio', href: '#projects' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Contact', href: '#contact' },
    ],
    legal: [
      { label: 'Mentions légales', action: openMentionsLegales },
      { label: 'Politique de confidentialité', action: openConfidentialite },
      { label: 'Gérer mes cookies', action: openCookieConsent },
    ],
  }), [openMentionsLegales, openConfidentialite, openCookieConsent]);

  const scrollToSection = useCallback((e, href) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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
            <p className="footer__tagline">
              Votre partenaire pour une présence web professionnelle.
              Sites livrés en 72h, prix transparents, satisfaction garantie.
            </p>
            <div className="footer__newsletter">
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="Votre email"
              />
              <button className="footer__newsletter-btn">
                S'abonner
              </button>
            </div>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Services</h4>
            {footerLinks.services.map((link) => (
              <FooterLink
                key={link.label}
                link={link}
                onClick={(e) => scrollToSection(e, link.href)}
              />
            ))}
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Entreprise</h4>
            {footerLinks.company.map((link) => (
              <FooterLink
                key={link.label}
                link={link}
                onClick={(e) => scrollToSection(e, link.href)}
              />
            ))}
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Légal</h4>
            {footerLinks.legal.map((link) => (
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
            © {currentYear} Supaco Digital. Tous droits réservés.
          </p>
        </div>
      </div>

      <div className="footer__decoration" />
    </footer>
  );
};

export default memo(Footer);