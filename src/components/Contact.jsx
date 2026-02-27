import { useState, useRef, memo, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { HiCheck, HiXMark } from "react-icons/hi2";

const CALENDLY_URL = "https://calendly.com/supaco-digital";
const EMAILJS_SERVICE_ID = "service_z9k3dwd";
const EMAILJS_TEMPLATE_ID = "template_qr0hizb";
const EMAILJS_PUBLIC_KEY = "crjyM7CbUuPkyfBTT";

const ContactDetail = memo(({ icon, label, value }) => (
  <div className="contact__detail">
    <span className="contact__detail-icon">{icon}</span>
    <div className="contact__detail-content">
      <span className="contact__detail-label">{label}</span>
      <span className="contact__detail-value">{value}</span>
    </div>
  </div>
));

ContactDetail.displayName = "ContactDetail";

const TABS = [
  {
    id: "message",
    label: "Envoyer un message",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "calendly",
    label: "Rendez-vous",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("message");

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const getServiceLabel = useCallback((value) => {
    const services = {
      vitrine: "Site Vitrine",
      ecommerce: "E-Commerce",
      app: "Application Web",
      autre: "Autre projet",
    };
    return services[value] || value || "Non spécifié";
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);
      setErrorMessage("");

      const templateParams = {
        from_name: formState.name,
        company: "—",
        from_email: formState.email,
        phone: formState.phone || "Non renseigné",
        service: getServiceLabel(formState.service),
        has_site: "—",
        budget: "—",
        deadline: "—",
        message: formState.message,
        reply_to: formState.email,
      };

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
        setSubmitStatus("success");
        setFormState({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } catch (error) {
        setSubmitStatus("error");
        setErrorMessage(
          error.text ||
            "Une erreur est survenue. Veuillez réessayer ou nous contacter directement."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, getServiceLabel]
  );

  const resetForm = useCallback(() => {
    setSubmitStatus(null);
    setErrorMessage("");
  }, []);

  const contactDetails = useMemo(
    () => [
      {
        icon: <HiOutlineMail size={24} />,
        label: "Email",
        value: "contact@supaco.digital.com",
      },
      {
        icon: <HiOutlineLocationMarker size={24} />,
        label: "Localisation",
        value: "Pays de Gex, France",
      },
      {
        icon: <HiOutlineClock size={24} />,
        label: "Réponse",
        value: "Sous 24 heures",
      },
    ],
    []
  );

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__container">
        <div className="contact__wrapper">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35 }}
          >
            <span className="contact__label">Contact</span>
            <h2 className="contact__title">Parlons de votre projet</h2>
            <p className="contact__description">
              Une idée ? Un projet ? Contactez-nous pour un devis gratuit et
              sans engagement. Réponse garantie sous 24 heures.
            </p>

            <div className="contact__details">
              {contactDetails.map((detail) => (
                <ContactDetail key={detail.label} {...detail} />
              ))}
            </div>

            <div className="contact__socials">
              <a
                href="https://www.instagram.com/supa_c0/"
                className="contact__social"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <span>Suivez-nous !</span>
            </div>
          </motion.div>

          <motion.div
            className="contact__form"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            {/* Onglets */}
            <div className="contact__tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`contact__tab${
                    activeTab === tab.id ? " contact__tab--active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Onglet Calendly */}
            {activeTab === "calendly" && (
              <div className="contact__calendly">
                <iframe
                  className="contact__calendly-iframe"
                  src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=00d4ff`}
                  title="Réserver un appel"
                  frameBorder="0"
                  scrolling="no"
                  loading="lazy"
                />
              </div>
            )}

            {/* Onglet formulaire */}
            {activeTab === "message" && (
              <>
                {submitStatus === "success" && (
                  <div className="contact__success">
                    <motion.div
                      className="contact__success-icon"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiCheck size={48} />
                    </motion.div>
                    <h3 className="contact__success-title">Message envoyé !</h3>
                    <p className="contact__success-text">
                      Merci pour votre message. Nous vous répondrons dans les 24
                      heures.
                    </p>
                    <button
                      className="contact__form-submit contact__form-submit--secondary"
                      onClick={resetForm}
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="contact__error">
                    <motion.div
                      className="contact__error-icon"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiXMark size={48} />
                    </motion.div>
                    <h3 className="contact__error-title">
                      Erreur d&apos;envoi
                    </h3>
                    <p className="contact__error-text">{errorMessage}</p>
                    <p className="contact__error-alternative">
                      Vous pouvez aussi nous contacter directement à{" "}
                      <a href="mailto:contact@supaco.digital">
                        contact@supaco.digital
                      </a>
                    </p>
                    <button
                      className="contact__form-submit"
                      onClick={resetForm}
                    >
                      Réessayer
                    </button>
                  </div>
                )}

                {submitStatus === null && (
                  <form onSubmit={handleSubmit} className="contact__form-grid">
                    <div className="contact__form-group">
                      <label className="contact__form-label">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="contact__form-input"
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>

                    <div className="contact__form-group">
                      <label className="contact__form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="contact__form-input"
                        placeholder="jean@exemple.com"
                        required
                      />
                    </div>

                    <div className="contact__form-group">
                      <label className="contact__form-label">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="contact__form-input"
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>

                    <div className="contact__form-group">
                      <label className="contact__form-label">Service</label>
                      <select
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="contact__form-select"
                        required
                      >
                        <option value="">Sélectionnez un service</option>
                        <option value="vitrine">Site Vitrine</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="app">Application Web</option>
                        <option value="autre">Autre projet</option>
                      </select>
                    </div>

                    <div className="contact__form-group contact__form-group--full">
                      <label className="contact__form-label">
                        Votre message
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        className="contact__form-textarea"
                        placeholder="Décrivez votre projet, vos besoins..."
                        required
                      />
                    </div>

                    <div className="contact__form-group contact__form-group--full">
                      <button
                        type="submit"
                        className="contact__form-submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer ma demande
                            <HiOutlinePaperAirplane
                              size={20}
                              style={{ transform: "rotate(90deg)" }}
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
