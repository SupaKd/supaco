import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "announcement_banner_dismissed";

const TICKER_TEXT =
  "Bénéficiez de -15% sur votre premier site web — Offre réservée aux nouveaux clients.";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
      document.documentElement.style.setProperty("--banner-height", "44px");
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    document.documentElement.style.setProperty("--banner-height", "0px");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="announcement-banner" role="banner" aria-label="Offre spéciale">
      {/* Desktop : layout centré classique */}
      <div className="announcement-banner__desktop">
        <span className="announcement-banner__badge">Offre de bienvenue</span>
        <p className="announcement-banner__text">
          Bénéficiez de <strong>-15% sur votre premier site web</strong> — Offre
          réservée aux nouveaux clients.{" "}
          <a
            href="#contact"
            className="announcement-banner__link"
            onClick={handleDismiss}
          >
            En profiter maintenant
          </a>
        </p>
      </div>

      {/* Mobile / Tablette : badge fixe + ticker défilant */}
      <div className="announcement-banner__mobile">
        <span className="announcement-banner__badge">Offre de bienvenue</span>
        <div className="announcement-banner__ticker">
          <div className="announcement-banner__ticker-track">
            <span className="announcement-banner__ticker-item">
              {TICKER_TEXT}&nbsp;&nbsp;·&nbsp;&nbsp;
              <a
                href="#contact"
                className="announcement-banner__link"
                onClick={handleDismiss}
              >
                En profiter maintenant
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {/* Duplication pour la boucle fluide */}
            <span className="announcement-banner__ticker-item" aria-hidden="true">
              {TICKER_TEXT}&nbsp;&nbsp;·&nbsp;&nbsp;
              <a
                href="#contact"
                className="announcement-banner__link"
                onClick={handleDismiss}
              >
                En profiter maintenant
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>

      <button
        className="announcement-banner__close"
        onClick={handleDismiss}
        aria-label="Fermer la bannière"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
