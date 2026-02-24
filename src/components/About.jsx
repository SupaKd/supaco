import { useRef, memo, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const badges = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Réponse < 24h",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: "Livraison rapide",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "98% de satisfaction",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const About = memo(function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">
        {/* Colonne photo */}
        <motion.div
          className="about__photo-col"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="about__photo-wrapper">
            {/* Badge disponibilité */}
            <div className="about__badge-available">
              <span className="about__badge-dot" />
              Disponible
            </div>

            {/* Placeholder photo */}
            <div className="about__photo-placeholder">
              <svg
                className="about__photo-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <p className="about__photo-hint">Photo à venir</p>
            </div>
          </div>
        </motion.div>

        {/* Colonne texte */}
        <motion.div
          className="about__text-col"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          <span className="about__label">À propos</span>

          <h2 className="about__title">
            Le dev derrière
            <br />
            <span className="gradient-text">vos projets</span>
          </h2>

          <div className="about__bio">
            <p>
              Bonjour, je suis <strong>Kevin</strong> — développeur web freelance spécialisé dans la création de sites performants et sur-mesure pour les PME et indépendants.
            </p>
            <p>
              Ce qui me différencie des grandes agences ? Un interlocuteur unique du brief à la livraison, une communication directe, et un vrai suivi après mise en ligne. Pas de junior qui reprend votre dossier, pas de délais à rallonge.
            </p>
            <p>
              Mon objectif : que votre site travaille pour vous — en attirant des clients et en vous faisant gagner du temps.
            </p>
          </div>

          {/* Badges valeurs */}
          <motion.div
            className="about__badges"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {badges.map((badge) => (
              <motion.span
                key={badge.label}
                className="about__value-badge"
                variants={itemVariants}
              >
                <span className="about__value-badge-icon">{badge.icon}</span>
                {badge.label}
              </motion.span>
            ))}
          </motion.div>

          <button className="about__cta" onClick={handleContact}>
            Démarrer mon projet
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
});

export default About;
