import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const COOKIE_KEY = "supaco-cookie-consent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Écouter l'événement de réouverture depuis le footer
  const handleReopen = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("cookie-consent-reopen", handleReopen);
    return () => window.removeEventListener("cookie-consent-reopen", handleReopen);
  }, [handleReopen]);

  // Bloquer le scroll quand le modal politique est ouvert
  useEffect(() => {
    if (showPolicy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPolicy]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="cookie-consent"
            initial={{ y: 60, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 60, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="cookie-consent__content">
              <div className="cookie-consent__icon">
                <Cookie size={24} />
              </div>
              <div className="cookie-consent__text">
                <p>
                  Nous utilisons des cookies pour améliorer votre expérience sur
                  notre site. En continuant, vous acceptez notre{" "}
                  <button
                    type="button"
                    className="cookie-consent__link"
                    onClick={() => setShowPolicy(true)}
                  >
                    politique de cookies
                  </button>
                  .
                </p>
              </div>
            </div>
            <div className="cookie-consent__actions">
              <button
                className="cookie-consent__btn cookie-consent__btn--decline"
                onClick={handleDecline}
              >
                Refuser
              </button>
              <button
                className="cookie-consent__btn cookie-consent__btn--accept"
                onClick={handleAccept}
              >
                Accepter
              </button>
            </div>
            <button
              className="cookie-consent__close"
              onClick={handleDecline}
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Politique de Cookies */}
      <AnimatePresence>
        {showPolicy && (
          <motion.div
            className="cookie-policy-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPolicy(false)}
          >
            <motion.div
              className="cookie-policy"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cookie-policy__header">
                <h2>Politique de Cookies</h2>
                <button
                  className="cookie-policy__close"
                  onClick={() => setShowPolicy(false)}
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="cookie-policy__body">
                <p className="cookie-policy__date">
                  Dernière mise à jour : Février 2026
                </p>

                <section>
                  <h3>1. Qu&apos;est-ce qu&apos;un cookie ?</h3>
                  <p>
                    Un cookie est un petit fichier texte déposé sur votre
                    terminal (ordinateur, tablette, smartphone) lors de votre
                    visite sur notre site. Il permet de stocker des informations
                    relatives à votre navigation.
                  </p>
                </section>

                <section>
                  <h3>2. Les cookies que nous utilisons</h3>
                  <p>
                    <strong>Cookies strictement nécessaires</strong> — Ces
                    cookies sont indispensables au fonctionnement du site
                    (mémorisation de vos préférences de thème, consentement
                    cookies). Ils ne peuvent pas être désactivés.
                  </p>
                  <p>
                    <strong>Cookies analytiques</strong> — Ils nous permettent
                    de mesurer l&apos;audience de notre site et
                    d&apos;améliorer son contenu. Les données collectées sont
                    anonymisées.
                  </p>
                </section>

                <section>
                  <h3>3. Durée de conservation</h3>
                  <p>
                    Les cookies sont conservés pour une durée maximale de 13
                    mois conformément aux recommandations de la CNIL. Votre
                    consentement est renouvelé à l&apos;expiration de cette
                    période.
                  </p>
                </section>

                <section>
                  <h3>4. Gérer vos préférences</h3>
                  <p>
                    Vous pouvez à tout moment modifier vos préférences en
                    matière de cookies via le lien &quot;Gérer mes cookies&quot;
                    situé en bas de chaque page, ou via les paramètres de votre
                    navigateur. La suppression des cookies peut affecter votre
                    expérience de navigation.
                  </p>
                </section>

                <section>
                  <h3>5. Vos droits</h3>
                  <p>
                    Conformément au RGPD, vous disposez d&apos;un droit
                    d&apos;accès, de rectification et de suppression de vos
                    données. Pour exercer ces droits, contactez-nous via notre
                    formulaire de contact.
                  </p>
                </section>
              </div>

              <div className="cookie-policy__footer">
                <button
                  className="cookie-consent__btn cookie-consent__btn--decline"
                  onClick={() => setShowPolicy(false)}
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
