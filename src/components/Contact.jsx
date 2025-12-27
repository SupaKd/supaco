import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactDetails = [
    { icon: '📧', label: 'Email', value: 'contact@supaco.digital' },
    { icon: '📍', label: 'Localisation', value: 'Pays de Gex, France' },
    { icon: '⏰', label: 'Réponse', value: 'Sous 24 heures' },
  ];

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__container">
        <div className="contact__wrapper">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="contact__label">Contact</span>
            <h2 className="contact__title">Parlons de votre projet</h2>
            <p className="contact__description">
              Une idée ? Un projet ? Contactez-nous pour un devis gratuit
              et sans engagement. Réponse garantie sous 24 heures.
            </p>

            <div className="contact__details">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="contact__detail">
                  <span className="contact__detail-icon">{detail.icon}</span>
                  <div className="contact__detail-content">
                    <span className="contact__detail-label">{detail.label}</span>
                    <span className="contact__detail-value">{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__socials">
              <a href="#" className="contact__social" aria-label="LinkedIn">in</a>
              <a href="#" className="contact__social" aria-label="Twitter">𝕏</a>
              <a href="#" className="contact__social" aria-label="Instagram">📷</a>
            </div>
          </motion.div>

          <motion.div
            className="contact__form"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="contact__success">
                <motion.div
                  className="contact__success-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  ✓
                </motion.div>
                <h3 className="contact__success-title">Message envoyé !</h3>
                <p className="contact__success-text">
                  Merci pour votre message. Nous vous répondrons dans les 24 heures.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contact__form-grid">
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
                    <label className="contact__form-label">Budget estimé</label>
                    <select
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="contact__form-select"
                    >
                      <option value="">Sélectionnez un budget</option>
                      <option value="500-1000">500€ - 1 000€</option>
                      <option value="1000-2500">1 000€ - 2 500€</option>
                      <option value="2500-5000">2 500€ - 5 000€</option>
                      <option value="5000+">Plus de 5 000€</option>
                    </select>
                  </div>

                  <div className="contact__form-group contact__form-group--full">
                    <label className="contact__form-label">Votre message</label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      className="contact__form-textarea"
                      placeholder="Décrivez votre projet, vos besoins, vos délais..."
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="contact__form-submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;