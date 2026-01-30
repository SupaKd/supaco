import { useRef, memo, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const PricingCard = memo(({ plan, variants, onContactClick }) => (
  <motion.div
    className={`pricing__card ${plan.popular ? "pricing__card--popular" : ""}`}
    variants={variants}
    whileHover={{ y: -8 }}
  >
    {plan.popular && (
      <span className="pricing__card-badge">Le plus populaire</span>
    )}

    <div className="pricing__card-header">
      <h3 className="pricing__card-name">{plan.name}</h3>
      <p className="pricing__card-description">{plan.description}</p>
      <div className="pricing__card-price">
        <span className="pricing__card-price-amount">{plan.price}</span>
        <span className="pricing__card-price-currency">€</span>
      </div>
      <span className="pricing__card-duration">{plan.duration}</span>
    </div>

    <ul className="pricing__card-features">
      {plan.features.map((feature) => (
        <li key={feature} className="pricing__card-feature">
          <span className="pricing__card-feature-icon">✓</span>
          {feature}
        </li>
      ))}
    </ul>

    <motion.a
      href="#contact"
      className="pricing__card-cta"
      onClick={onContactClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Choisir cette offre
    </motion.a>
  </motion.div>
));

PricingCard.displayName = 'PricingCard';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = useMemo(() => [
    {
      name: "Essentiel",
      description: "Parfait pour démarrer votre présence en ligne",
      price: "500",
      duration: "Livré en 72h",
      features: [
        "Site one-page responsive",
        "Design moderne personnalisé",
        "Formulaire de contact",
        "Optimisation SEO de base",
      ],
    },
    {
      name: "Professionnel",
      description: "La solution complète pour votre entreprise",
      price: "1200",
      duration: "Livré en 5 jours",
      popular: true,
      features: [
        "Site multi-pages (jusqu'à 5)",
        "Design premium sur-mesure",
        "Animations et effets avancés",
        "SEO optimisé + Analytics",
        "Blog intégré",
        "Formation utilisation",
      ],
    },
    {
      name: "E-Commerce",
      description: "Vendez en ligne avec une boutique complète",
      price: "2500",
      duration: "Livré en 10 jours",
      features: [
        "Boutique en ligne complète",
        "Jusqu'à 50 produits",
        "Paiement Stripe/PayPal",
        "Gestion des stocks",
        "Emails automatiques",
      ],
    },
  ], []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }), []);

  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className="pricing__container">
        <motion.div
          className="pricing__header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="pricing__label">Tarifs</span>
          <h2 className="pricing__title">Des prix transparents</h2>
          <p className="pricing__subtitle">
            Pas de surprise ni de coûts cachés. Choisissez la formule adaptée à
            vos besoins et lancez votre projet dès aujourd'hui.
          </p>
        </motion.div>

        <motion.div
          className="pricing__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              variants={cardVariants}
              onContactClick={scrollToContact}
            />
          ))}
        </motion.div>

        <motion.div
          className="pricing__guarantee"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="pricing__guarantee-text">
            <strong>Exigence & excellence</strong> — Chaque prestation est
            ajustée avec soin afin de garantir un résultat à la hauteur de vos
            attentes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Pricing);