import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <motion.div
        className="hero__container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__badge" variants={itemVariants}>
          <span className="hero__badge-dot" />
          <span className="hero__badge-text">Disponible pour nouveaux projets</span>
        </motion.div>

        <motion.h1 className="hero__title" variants={itemVariants}>
          Votre site web<br />
          livré en <span className="highlight">72 heures</span>
        </motion.h1>

        <motion.p className="hero__subtitle" variants={itemVariants}>
          Agence web spécialisée dans la création de sites modernes et performants
          pour les entreprises locales. Prix transparents, résultats garantis.
        </motion.p>

        <motion.div className="hero__ctas" variants={itemVariants}>
          <motion.a
            href="#contact"
            className="hero__cta-primary"
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Obtenir un devis gratuit
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
          <motion.a
            href="#projects"
            className="hero__cta-secondary"
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir nos réalisations
          </motion.a>
        </motion.div>

        <motion.div
          className="hero__stats"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <motion.div className="hero__stat" variants={statVariants}>
            <span className="hero__stat-value">72h</span>
            <span className="hero__stat-label">Délai de livraison</span>
          </motion.div>
          <motion.div className="hero__stat" variants={statVariants}>
            <span className="hero__stat-value">500€</span>
            <span className="hero__stat-label">À partir de</span>
          </motion.div>
          <motion.div className="hero__stat" variants={statVariants}>
            <span className="hero__stat-value">100%</span>
            <span className="hero__stat-label">Satisfaction client</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;