import { useState, useRef, memo, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import RevealText from "./ui/RevealText";
import emailjs from "@emailjs/browser";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { HiCheck, HiXMark } from "react-icons/hi2";
import { useLanguage } from "../context/LanguageContext";

const CALENDLY_URL =
  "https://calendly.com/supaco-digital/discutons-ensemble-de-votre-projet";
const EMAILJS_SERVICE_ID = "service_z9k3dwd";
const EMAILJS_TEMPLATE_ID = "template_qr0hizb";
const EMAILJS_PUBLIC_KEY = "crjyM7CbUuPkyfBTT";

const EMAIL = "contact@supaco-digital.com";

const useCopyFeedback = () => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);
  return { copied, copy };
};

const CopyFeedback = memo(({ visible }) => (
  <div
    className={`copy-feedback${visible ? " copy-feedback--visible" : ""}`}
    aria-live="polite"
  >
    ✓ Copié !
  </div>
));
CopyFeedback.displayName = "CopyFeedback";

const ContactDetail = memo(({ icon, label, value, onCopy, copyable }) => (
  <div
    className={`contact__detail${copyable ? " contact__detail--copyable" : ""}`}
    onClick={copyable ? onCopy : undefined}
    title={copyable ? "Cliquez pour copier" : undefined}
    data-tooltip={copyable ? "Cliquez pour copier" : undefined}
    style={{ cursor: copyable ? "pointer" : "default" }}
  >
    <span className="contact__detail-icon">{icon}</span>
    <div className="contact__detail-content">
      <span className="contact__detail-label">{label}</span>
      <span className="contact__detail-value">{value}</span>
    </div>
    {copyable && (
      <span className="contact__detail-copy-icon" aria-hidden="true">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </span>
    )}
  </div>
));

ContactDetail.displayName = "ContactDetail";

const TAB_ICONS = {
  message: (
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
  calendly: (
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
};

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("message");
  const { copied, copy } = useCopyFeedback();

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
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Le nom doit contenir au moins 2 caractères." : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Adresse email invalide." : "";
      case "service":
        return !value ? "Veuillez sélectionner un service." : "";
      case "message":
        return value.trim().length < 10 ? "Le message doit contenir au moins 10 caractères." : "";
      default:
        return "";
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, [validateField]);

  const getServiceLabel = useCallback(
    (value) => {
      const services = {
        vitrine: t.contact.form.vitrine,
        ecommerce: t.contact.form.ecommerce,
        app: t.contact.form.app,
        autre: t.contact.form.other,
      };
      return services[value] || value || "—";
    },
    [t.contact.form]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validation complète avant envoi
      const errors = {
        name: validateField("name", formState.name),
        email: validateField("email", formState.email),
        service: validateField("service", formState.service),
        message: validateField("message", formState.message),
      };
      setFieldErrors(errors);
      if (Object.values(errors).some(Boolean)) return;

      setIsSubmitting(true);
      setSubmitStatus(null);
      setErrorMessage("");

      const templateParams = {
        from_name: formState.name,
        company: "—",
        from_email: formState.email,
        phone: formState.phone || "—",
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
        setErrorMessage(error.text || t.contact.error.fallback);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, getServiceLabel, t.contact.error.fallback]
  );

  const resetForm = useCallback(() => {
    setSubmitStatus(null);
    setErrorMessage("");
  }, []);

  const contactDetails = useMemo(
    () => [
      {
        icon: <HiOutlineMail size={24} />,
        label: t.contact.details.email,
        value: EMAIL,
        copyable: true,
      },
      {
        icon: <HiOutlineLocationMarker size={24} />,
        label: t.contact.details.location,
        value: t.contact.details.locationValue,
      },
      {
        icon: <HiOutlineClock size={24} />,
        label: t.contact.details.response,
        value: t.contact.details.responseValue,
      },
    ],
    [t.contact.details]
  );

  const tabs = useMemo(
    () => [
      { id: "message", label: t.contact.tabs.message, icon: TAB_ICONS.message },
      {
        id: "calendly",
        label: t.contact.tabs.appointment,
        icon: TAB_ICONS.calendly,
      },
    ],
    [t.contact.tabs]
  );

  return (
    <>
      <CopyFeedback visible={copied} />
      <section
        className="contact"
        id="contact"
        ref={ref}
        aria-label="Contactez Supaco Digital — Devis gratuit"
      >
        <div className="contact__container">
          <div className="contact__wrapper">
            <motion.div
              className="contact__info"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35 }}
            >
              <span className="contact__label">{t.contact.label}</span>
              <RevealText className="contact__title">
                {t.contact.title}
              </RevealText>
              <p className="contact__description">{t.contact.description}</p>

              <div className="contact__details">
                {contactDetails.map((detail) => (
                  <ContactDetail
                    key={detail.label}
                    {...detail}
                    onCopy={detail.copyable ? () => copy(EMAIL) : undefined}
                  />
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
                <span>{t.contact.followUs}</span>
              </div>
            </motion.div>

            <motion.div
              className="contact__right"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <div className="contact__form">
                <div className="contact__tabs">
                  {tabs.map((tab) => (
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

                {activeTab === "calendly" && (
                  <div className="contact__calendly">
                    <iframe
                      className="contact__calendly-iframe"
                      src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=00d4ff`}
                      title={t.contact.tabs.appointment}
                      frameBorder="0"
                      scrolling="no"
                      loading="lazy"
                    />
                  </div>
                )}

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
                        <h3 className="contact__success-title">
                          {t.contact.success.title}
                        </h3>
                        <p className="contact__success-text">
                          {t.contact.success.text}
                        </p>
                        <button
                          className="contact__form-submit contact__form-submit--secondary"
                          onClick={resetForm}
                        >
                          {t.contact.success.another}
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
                          {t.contact.error.title}
                        </h3>
                        <p className="contact__error-text">{errorMessage}</p>
                        <p className="contact__error-alternative">
                          {t.contact.error.alternative}{" "}
                          <a href="mailto:contact@supaco-digital.com">
                            contact@supaco-digital.com
                          </a>
                        </p>
                        <button
                          className="contact__form-submit"
                          onClick={resetForm}
                        >
                          {t.contact.error.retry}
                        </button>
                      </div>
                    )}

                    {submitStatus === null && (
                      <form
                        onSubmit={handleSubmit}
                        className="contact__form-grid"
                        noValidate
                        aria-live="polite"
                      >
                        <div className={`contact__form-group${fieldErrors.name ? " contact__form-group--error" : ""}`}>
                          <label htmlFor="contact-name" className="contact__form-label">
                            {t.contact.form.fullName}
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className="contact__form-input"
                            placeholder={t.contact.form.namePlaceholder}
                            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                            aria-invalid={!!fieldErrors.name}
                          />
                          {fieldErrors.name && <span id="contact-name-error" className="contact__form-error" role="alert">{fieldErrors.name}</span>}
                        </div>

                        <div className={`contact__form-group${fieldErrors.email ? " contact__form-group--error" : ""}`}>
                          <label htmlFor="contact-email" className="contact__form-label">Email</label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className="contact__form-input"
                            placeholder={t.contact.form.emailPlaceholder}
                            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                            aria-invalid={!!fieldErrors.email}
                          />
                          {fieldErrors.email && <span id="contact-email-error" className="contact__form-error" role="alert">{fieldErrors.email}</span>}
                        </div>

                        <div className="contact__form-group">
                          <label htmlFor="contact-phone" className="contact__form-label">
                            {t.contact.form.phone}
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="contact__form-input"
                            placeholder={t.contact.form.phonePlaceholder}
                          />
                        </div>

                        <div className={`contact__form-group${fieldErrors.service ? " contact__form-group--error" : ""}`}>
                          <label htmlFor="contact-service" className="contact__form-label">
                            {t.contact.form.service}
                          </label>
                          <select
                            id="contact-service"
                            name="service"
                            value={formState.service}
                            onChange={handleChange}
                            className="contact__form-select"
                            aria-describedby={fieldErrors.service ? "contact-service-error" : undefined}
                            aria-invalid={!!fieldErrors.service}
                          >
                            <option value="">{t.contact.form.selectService}</option>
                            <option value="vitrine">{t.contact.form.vitrine}</option>
                            <option value="ecommerce">{t.contact.form.ecommerce}</option>
                            <option value="app">{t.contact.form.app}</option>
                            <option value="autre">{t.contact.form.other}</option>
                          </select>
                          {fieldErrors.service && <span id="contact-service-error" className="contact__form-error" role="alert">{fieldErrors.service}</span>}
                        </div>

                        <div className={`contact__form-group contact__form-group--full${fieldErrors.message ? " contact__form-group--error" : ""}`}>
                          <label htmlFor="contact-message" className="contact__form-label">
                            {t.contact.form.message}
                          </label>
                          <textarea
                            id="contact-message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            className="contact__form-textarea"
                            placeholder={t.contact.form.messagePlaceholder}
                            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                            aria-invalid={!!fieldErrors.message}
                          />
                          {fieldErrors.message && <span id="contact-message-error" className="contact__form-error" role="alert">{fieldErrors.message}</span>}
                        </div>

                        <div className="contact__form-group contact__form-group--full">
                          <button
                            type="submit"
                            className="contact__form-submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner" aria-hidden="true" />
                                {t.contact.form.sending}
                              </>
                            ) : (
                              <>
                                {t.contact.form.submit}
                                <HiOutlinePaperAirplane size={20} style={{ transform: "rotate(90deg)" }} />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>

              {/* Google Avis */}
              <a
                href="https://www.google.com/search?q=Supaco+Digital+%7C+Agence+Web"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__google-reviews"
              >
                <svg
                  className="contact__google-logo"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <div className="contact__google-text">
                  <div className="contact__google-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#FBBC05"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="contact__google-label">
                    5,0 · 5 avis Google
                  </span>
                </div>
                <svg
                  className="contact__google-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Contact);
