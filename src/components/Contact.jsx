import { useState, useRef, memo, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import RevealText from './ui/RevealText';
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

const CALENDLY_URL = "https://calendly.com/supaco-digital";
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
  <div className={`copy-feedback${visible ? " copy-feedback--visible" : ""}`} aria-live="polite">
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </span>
    )}
  </div>
));

ContactDetail.displayName = "ContactDetail";

const TAB_ICONS = {
  message: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  calendly: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const getServiceLabel = useCallback((value) => {
    const services = {
      vitrine: t.contact.form.vitrine,
      ecommerce: t.contact.form.ecommerce,
      app: t.contact.form.app,
      autre: t.contact.form.other,
    };
    return services[value] || value || "—";
  }, [t.contact.form]);

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
        phone: formState.phone || "—",
        service: getServiceLabel(formState.service),
        has_site: "—",
        budget: "—",
        deadline: "—",
        message: formState.message,
        reply_to: formState.email,
      };

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
        setSubmitStatus("success");
        setFormState({ name: "", email: "", phone: "", service: "", message: "" });
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
      { icon: <HiOutlineMail size={24} />, label: t.contact.details.email, value: EMAIL, copyable: true },
      { icon: <HiOutlineLocationMarker size={24} />, label: t.contact.details.location, value: t.contact.details.locationValue },
      { icon: <HiOutlineClock size={24} />, label: t.contact.details.response, value: t.contact.details.responseValue },
    ],
    [t.contact.details]
  );

  const tabs = useMemo(
    () => [
      { id: "message", label: t.contact.tabs.message, icon: TAB_ICONS.message },
      { id: "calendly", label: t.contact.tabs.appointment, icon: TAB_ICONS.calendly },
    ],
    [t.contact.tabs]
  );

  return (
    <>
    <CopyFeedback visible={copied} />
    <section className="contact" id="contact" ref={ref} aria-label="Contactez Supaco Digital — Devis gratuit">
      <div className="contact__container">
        <div className="contact__wrapper">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35 }}
          >
            <span className="contact__label">{t.contact.label}</span>
            <RevealText className="contact__title">{t.contact.title}</RevealText>
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
              <a href="https://www.instagram.com/supa_c0/" className="contact__social" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <span>{t.contact.followUs}</span>
            </div>
          </motion.div>

          <motion.div
            className="contact__form"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <div className="contact__tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`contact__tab${activeTab === tab.id ? " contact__tab--active" : ""}`}
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
                    <motion.div className="contact__success-icon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                      <HiCheck size={48} />
                    </motion.div>
                    <h3 className="contact__success-title">{t.contact.success.title}</h3>
                    <p className="contact__success-text">{t.contact.success.text}</p>
                    <button className="contact__form-submit contact__form-submit--secondary" onClick={resetForm}>
                      {t.contact.success.another}
                    </button>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="contact__error">
                    <motion.div className="contact__error-icon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                      <HiXMark size={48} />
                    </motion.div>
                    <h3 className="contact__error-title">{t.contact.error.title}</h3>
                    <p className="contact__error-text">{errorMessage}</p>
                    <p className="contact__error-alternative">
                      {t.contact.error.alternative}{" "}
                      <a href="mailto:contact@supaco.digital">contact@supaco.digital</a>
                    </p>
                    <button className="contact__form-submit" onClick={resetForm}>
                      {t.contact.error.retry}
                    </button>
                  </div>
                )}

                {submitStatus === null && (
                  <form onSubmit={handleSubmit} className="contact__form-grid">
                    <div className="contact__form-group">
                      <label className="contact__form-label">{t.contact.form.fullName}</label>
                      <input type="text" name="name" value={formState.name} onChange={handleChange} className="contact__form-input" placeholder={t.contact.form.namePlaceholder} required />
                    </div>

                    <div className="contact__form-group">
                      <label className="contact__form-label">Email</label>
                      <input type="email" name="email" value={formState.email} onChange={handleChange} className="contact__form-input" placeholder={t.contact.form.emailPlaceholder} required />
                    </div>

                    <div className="contact__form-group">
                      <label className="contact__form-label">{t.contact.form.phone}</label>
                      <input type="tel" name="phone" value={formState.phone} onChange={handleChange} className="contact__form-input" placeholder={t.contact.form.phonePlaceholder} />
                    </div>

                    <div className="contact__form-group">
                      <label className="contact__form-label">{t.contact.form.service}</label>
                      <select name="service" value={formState.service} onChange={handleChange} className="contact__form-select" required>
                        <option value="">{t.contact.form.selectService}</option>
                        <option value="vitrine">{t.contact.form.vitrine}</option>
                        <option value="ecommerce">{t.contact.form.ecommerce}</option>
                        <option value="app">{t.contact.form.app}</option>
                        <option value="autre">{t.contact.form.other}</option>
                      </select>
                    </div>

                    <div className="contact__form-group contact__form-group--full">
                      <label className="contact__form-label">{t.contact.form.message}</label>
                      <textarea name="message" value={formState.message} onChange={handleChange} className="contact__form-textarea" placeholder={t.contact.form.messagePlaceholder} required />
                    </div>

                    <div className="contact__form-group contact__form-group--full">
                      <button type="submit" className="contact__form-submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="spinner" />
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
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default memo(Contact);
