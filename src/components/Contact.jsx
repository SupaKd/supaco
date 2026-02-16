import { useState, useRef, memo, useCallback, useMemo } from 'react';
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

const EMAILJS_SERVICE_ID = 'service_z9k3dwd';
const EMAILJS_TEMPLATE_ID = 'template_qr0hizb';
const EMAILJS_PUBLIC_KEY = 'crjyM7CbUuPkyfBTT';

const ContactDetail = memo(({ icon, label, value }) => (
  <div className="contact__detail">
    <span className="contact__detail-icon">{icon}</span>
    <div className="contact__detail-content">
      <span className="contact__detail-label">{label}</span>
      <span className="contact__detail-value">{value}</span>
    </div>
  </div>
));

ContactDetail.displayName = 'ContactDetail';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    hasSite: '',
    siteUrl: '',
    budget: '',
    deadline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const getServiceLabel = useCallback((value) => {
    const services = {
      'vitrine': 'Site Vitrine',
      'ecommerce': 'E-Commerce',
      'app': 'Application Web',
      'autre': 'Autre projet',
    };
    return services[value] || value || 'Non spécifié';
  }, []);

  const getBudgetLabel = useCallback((value) => {
    const budgets = {
      '500-1000': '500€ - 1 000€',
      '1000-2500': '1 000€ - 2 500€',
      '2500-5000': '2 500€ - 5 000€',
      '5000+': 'Plus de 5 000€',
    };
    return budgets[value] || value || 'Non spécifié';
  }, []);

  const getDeadlineLabel = useCallback((value) => {
    const deadlines = {
      'urgent': "Moins d'1 mois",
      'normal': '1 à 3 mois',
      'flexible': 'Pas de rush',
    };
    return deadlines[value] || value || 'Non spécifié';
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const templateParams = {
      from_name: formState.name,
      company: formState.company || 'Non renseigné',
      from_email: formState.email,
      phone: formState.phone || 'Non renseigné',
      service: getServiceLabel(formState.service),
      has_site: formState.hasSite === 'oui' ? `Oui — ${formState.siteUrl || 'URL non renseignée'}` : formState.hasSite === 'non' ? 'Non (création)' : 'Non spécifié',
      budget: getBudgetLabel(formState.budget),
      deadline: getDeadlineLabel(formState.deadline),
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

      setSubmitStatus('success');
      setFormState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        hasSite: '',
        siteUrl: '',
        budget: '',
        deadline: '',
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
  }, [formState, getServiceLabel, getBudgetLabel, getDeadlineLabel]);

  const resetForm = useCallback(() => {
    setSubmitStatus(null);
    setErrorMessage('');
  }, []);

  const contactDetails = useMemo(() => [
    { icon: <HiOutlineMail size={24} />, label: 'Email', value: 'contact@supaco.digital.com' },
    { icon: <HiOutlineLocationMarker size={24} />, label: 'Localisation', value: 'Pays de Gex, France' },
    { icon: <HiOutlineClock size={24} />, label: 'Réponse', value: 'Sous 24 heures' },
  ], []);

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
                <ContactDetail key={detail.label} {...detail} />
              ))}
            </div>

            <div className="contact__socials">
              <a href="https://www.instagram.com/supa_c0/" className="contact__social" aria-label="Instagram">
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
                    <label className="contact__form-label">Entreprise / Activité</label>
                    <input
                      type="text"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="contact__form-input"
                      placeholder="Nom de votre entreprise ou activité"
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

                  <div className="contact__form-group">
                    <label className="contact__form-label">Avez-vous déjà un site ?</label>
                    <select
                      name="hasSite"
                      value={formState.hasSite}
                      onChange={handleChange}
                      className="contact__form-select"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="non">Non, c'est une création</option>
                      <option value="oui">Oui, c'est une refonte</option>
                    </select>
                  </div>

                  {formState.hasSite === 'oui' && (
                    <div className="contact__form-group contact__form-group--full">
                      <label className="contact__form-label">URL de votre site actuel</label>
                      <input
                        type="url"
                        name="siteUrl"
                        value={formState.siteUrl}
                        onChange={handleChange}
                        className="contact__form-input"
                        placeholder="https://www.monsite.com"
                      />
                    </div>
                  )}

                  <div className="contact__form-group">
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

                  <div className="contact__form-group">
                    <label className="contact__form-label">Délai souhaité</label>
                    <select
                      name="deadline"
                      value={formState.deadline}
                      onChange={handleChange}
                      className="contact__form-select"
                    >
                      <option value="">Sélectionnez un délai</option>
                      <option value="urgent">Moins d'1 mois</option>
                      <option value="normal">1 à 3 mois</option>
                      <option value="flexible">Pas de rush</option>
                    </select>
                  </div>

                  <div className="contact__form-group contact__form-group--full">
                    <label className="contact__form-label">Votre message</label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      className="contact__form-textarea"
                      placeholder="Décrivez votre projet, vos besoins..."
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

export default memo(Contact);