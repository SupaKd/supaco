import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Context pour ouvrir les modals depuis n'importe quel composant
const LegalModalsContext = createContext(null);

export const useLegalModals = () => useContext(LegalModalsContext);

const COOKIE_KEY = "supaco-cookie-consent";

// ---- Contenu Mentions Légales ----
const MentionsLegalesContent = () => (
  <>
    <section>
      <h3>1. Éditeur du site</h3>
      <p>
        <strong>Supaco Digital</strong>
        <br />
        {/* TODO: Remplacez par vos vraies informations */}
        Forme juridique : EI
        <br />
        Adresse : Saint-Genis-Pouilly
        <br />
        Téléphone : 07.83.05.24.12
        <br />
        Email : contact@supaco.digital.com
      </p>
    </section>

    <section>
      <h3>2. Hébergement</h3>
      <p>
        {/* TODO: Remplacez par votre hébergeur */}
        Le site est hébergé par :<br />
        <strong>Hostinger</strong>
        <br />
        Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre
      </p>
    </section>

    <section>
      <h3>3. Propriété intellectuelle</h3>
      <p>
        L&apos;ensemble du contenu de ce site (textes, images, logos, icônes,
        vidéos, sons, logiciels) est protégé par le droit d&apos;auteur et le
        droit de la propriété intellectuelle. Toute reproduction, même
        partielle, est interdite sans autorisation préalable.
      </p>
    </section>

    <section>
      <h3>4. Limitation de responsabilité</h3>
      <p>
        Supaco Digital s&apos;efforce de fournir des informations aussi précises
        que possible. Toutefois, elle ne pourra être tenue responsable des
        omissions, inexactitudes ou des carences dans la mise à jour des
        informations.
      </p>
    </section>

    <section>
      <h3>5. Liens hypertextes</h3>
      <p>
        Le site peut contenir des liens vers d&apos;autres sites. Supaco Digital
        n&apos;exerce aucun contrôle sur ces sites et décline toute
        responsabilité quant à leur contenu.
      </p>
    </section>
  </>
);

// ---- Contenu Politique de Confidentialité ----
const PolitiqueConfidentialiteContent = () => (
  <>
    <section>
      <h3>1. Responsable du traitement</h3>
      <p>
        Le responsable du traitement des données personnelles est :<br />
        <strong>Supaco Digital</strong>
        <br />
        Email : contact@supaco.digital
      </p>
    </section>

    <section>
      <h3>2. Données collectées</h3>
      <p>
        Nous collectons les données suivantes dans le cadre de
        l&apos;utilisation de notre site :
      </p>
      <ul>
        <li>
          <strong>Formulaire de contact :</strong> nom, prénom, email, numéro de
          téléphone (optionnel), message
        </li>
        <li>
          <strong>Newsletter :</strong> adresse email
        </li>
        <li>
          <strong>Cookies :</strong> données de navigation (voir notre Politique
          de Cookies)
        </li>
      </ul>
    </section>

    <section>
      <h3>3. Finalités du traitement</h3>
      <p>Vos données sont collectées pour :</p>
      <ul>
        <li>Répondre à vos demandes via le formulaire de contact</li>
        <li>Vous envoyer notre newsletter (avec votre consentement)</li>
        <li>Améliorer notre site grâce aux données analytiques anonymisées</li>
      </ul>
    </section>

    <section>
      <h3>4. Base légale</h3>
      <p>
        Le traitement de vos données repose sur :<br />— Votre{" "}
        <strong>consentement</strong> (newsletter, cookies analytiques)
        <br />— Notre <strong>intérêt légitime</strong> (réponse aux demandes de
        contact, amélioration du site)
      </p>
    </section>

    <section>
      <h3>5. Durée de conservation</h3>
      <ul>
        <li>
          <strong>Données de contact :</strong> 3 ans après le dernier échange
        </li>
        <li>
          <strong>Données newsletter :</strong> jusqu&apos;à désinscription
        </li>
        <li>
          <strong>Cookies :</strong> 13 mois maximum
        </li>
      </ul>
    </section>

    <section>
      <h3>6. Destinataires des données</h3>
      <p>
        Vos données ne sont transmises à aucun tiers, sauf obligation légale.
        Elles peuvent être traitées par nos sous-traitants techniques
        (hébergeur, service d&apos;emailing) dans le respect du RGPD.
      </p>
    </section>

    <section>
      <h3>7. Vos droits</h3>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Droit d&apos;accès à vos données personnelles</li>
        <li>Droit de rectification</li>
        <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité</li>
        <li>Droit d&apos;opposition</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à : contact@supaco.digital</p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la{" "}
        <strong>CNIL</strong> (www.cnil.fr).
      </p>
    </section>

    <section>
      <h3>8. Sécurité</h3>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles
        appropriées pour protéger vos données personnelles contre tout accès non
        autorisé, modification, divulgation ou destruction.
      </p>
    </section>
  </>
);

// ---- Composant Modal générique ----
const LegalModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="legal-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="legal-modal"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="legal-modal__header">
              <h2>{title}</h2>
              <button
                className="legal-modal__close"
                onClick={onClose}
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="legal-modal__body">{children}</div>
            <div className="legal-modal__footer">
              <button className="legal-modal__btn" onClick={onClose}>
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---- Provider principal ----
const LegalModalsProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openMentionsLegales = useCallback(() => setActiveModal("mentions"), []);
  const openConfidentialite = useCallback(
    () => setActiveModal("confidentialite"),
    []
  );
  const openCookieConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_KEY);
    setActiveModal("reopenCookies");
    // Petit délai pour que le CookieConsent détecte le changement
    setTimeout(() => {
      setActiveModal(null);
      window.dispatchEvent(new Event("cookie-consent-reopen"));
    }, 50);
  }, []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <LegalModalsContext.Provider
      value={{ openMentionsLegales, openConfidentialite, openCookieConsent }}
    >
      {children}

      <LegalModal
        isOpen={activeModal === "mentions"}
        onClose={closeModal}
        title="Mentions Légales"
      >
        <p className="legal-modal__date">Dernière mise à jour : Février 2026</p>
        <MentionsLegalesContent />
      </LegalModal>

      <LegalModal
        isOpen={activeModal === "confidentialite"}
        onClose={closeModal}
        title="Politique de Confidentialité"
      >
        <p className="legal-modal__date">Dernière mise à jour : Février 2026</p>
        <PolitiqueConfidentialiteContent />
      </LegalModal>
    </LegalModalsContext.Provider>
  );
};

export default LegalModalsProvider;
