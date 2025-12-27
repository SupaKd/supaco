import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  HiOutlineMail, 
  HiOutlineLocationMarker, 
  HiOutlineClock,
  HiOutlinePaperAirplane
} from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';
import { HiCheck, HiXMark } from 'react-icons/hi2';

// ⚠️ REMPLACE CES VALEURS PAR LES TIENNES (depuis emailjs.com)
const EMAILJS_SERVICE_ID = 'service_z9k3dwd';
const EMAILJS_TEMPLATE_ID = 'template_qr0hizb';
const EMAILJS_PUBLIC_KEY = 'crjyM7CbUuPkyfBTT';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Prépare les données pour EmailJS
    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      phone: formState.phone || 'Non renseigné',
      service: getServiceLabel(formState.service),
      budget: getBudgetLabel(formState.budget),
      message: formState.message,
      // Pour l'email de réponse
      reply_to: formState.email,
    };

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email envoyé avec succès:', response);
      setSubmitStatus('success');
      
      // Reset le formulaire
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
      });

    } catch (error) {
      console.error('Erreur envoi email:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error.text || 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convertit les valeurs en labels lisibles
  const getServiceLabel = (value) => {
    const services = {
      'vitrine': 'Site Vitrine',
      'ecommerce': 'E-Commerce',
      'app': 'Application Web',
      'autre': 'Autre projet',
    };
    return services[value] || value || 'Non spécifié';
  };

  const getBudgetLabel = (value) => {
    const budgets = {
      '500-1000': '500€ - 1 000€',
      '1000-2500': '1 000€ - 2 500€',
      '2500-5000': '2 500€ - 5 000€',
      '5000+': 'Plus de 5 000€',
    };
    return budgets[value] || value || 'Non spécifié';
  };

  const resetForm = () => {
    setSubmitStatus(null);
    setErrorMessage('');
  };

  const contactDetails = [
    { icon: <HiOutlineMail size={24} />, label: 'Email', value: 'contact@supaco.digital.com' },
    { icon: <HiOutlineLocationMarker size={24} />, label: 'Localisation', value: 'Pays de Gex, France' },
    { icon: <HiOutlineClock size={24} />, label: 'Réponse', value: 'Sous 24 heures' },
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
              <a href="#" className="contact__social" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <span>Suivez-nous !</span>
            </div>
          </motion.div>

          <motion.div
            className="contact__form"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Message de succès */}
            {submitStatus === 'success' && (
              <div className="contact__success">
                <motion.div
                  className="contact__success-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <HiCheck size={48} />
                </motion.div>
                <h3 className="contact__success-title">Message envoyé !</h3>
                <p className="contact__success-text">
                  Merci pour votre message. Nous vous répondrons dans les 24 heures.
                </p>
                <button 
                  className="contact__form-submit contact__form-submit--secondary"
                  onClick={resetForm}
                >
                  Envoyer un autre message
                </button>
              </div>
            )}

            {/* Message d'erreur */}
            {submitStatus === 'error' && (
              <div className="contact__error">
                <motion.div
                  className="contact__error-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <HiXMark size={48} />
                </motion.div>
                <h3 className="contact__error-title">Erreur d'envoi</h3>
                <p className="contact__error-text">{errorMessage}</p>
                <p className="contact__error-alternative">
                  Vous pouvez aussi nous contacter directement à{' '}
                  <a href="mailto:contact@supaco.digital">contact@supaco.digital</a>
                </p>
                <button 
                  className="contact__form-submit"
                  onClick={resetForm}
                >
                  Réessayer
                </button>
              </div>
            )}

            {/* Formulaire */}
            {submitStatus === null && (
              <form ref={formRef} onSubmit={handleSubmit}>
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
                      <HiOutlinePaperAirplane size={20} style={{ transform: 'rotate(90deg)' }} />
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