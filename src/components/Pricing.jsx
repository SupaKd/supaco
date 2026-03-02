import { useRef, memo, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import RevealText from './ui/RevealText';
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlinePaintBrush,
  HiOutlineCodeBracket,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

const steps = [
  {
    number: "01",
    icon: <HiOutlineChatBubbleLeftRight size={28} />,
    title: "Échange",
    description:
      "On discute de votre projet, vos besoins et vos objectifs pour définir ensemble la meilleure approche.",
  },
  {
    number: "02",
    icon: <HiOutlinePaintBrush size={28} />,
    title: "Maquette",
    description:
      "On crée le design de votre site sur-mesure. Vous validez chaque étape avant de passer au développement.",
  },
  {
    number: "03",
    icon: <HiOutlineCodeBracket size={28} />,
    title: "Développement",
    description:
      "On code votre site avec les dernières technologies pour un résultat rapide, responsive et optimisé.",
  },
  {
    number: "04",
    icon: <HiOutlineRocketLaunch size={28} />,
    title: "Livraison",
    description:
      "Votre site est mis en ligne. On vous forme à son utilisation et on reste disponible pour le suivi.",
  },
];

// Carte sticky individuelle — scale + opacity pilotés par le scroll
const StickyStep = memo(({ step, index, total, containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Chaque carte occupe 1/total de la progression
  const start = index / total;
  const end = (index + 1) / total;

  // La carte en cours passe de 1 → 0.88 (se réduit quand la suivante arrive)
  const scale = useTransform(
    scrollYProgress,
    [start, end - 0.02, end],
    index < total - 1 ? [1, 1, 0.88] : [1, 1, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, end - 0.02, end],
    index < total - 1 ? [1, 1, 0.5] : [1, 1, 1]
  );

  return (
    <div className="process__sticky-slot">
      <motion.div
        className="process__step"
        style={{ scale, opacity }}
      >
        <div className="process__step-inner">
          <div className="process__step-left">
            <span className="process__step-number">{step.number}</span>
            <div className="process__step-icon">{step.icon}</div>
          </div>
          <div className="process__step-right">
            <h3 className="process__step-title">{step.title}</h3>
            <p className="process__step-description">{step.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

StickyStep.displayName = "StickyStep";

const Process = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="process" id="etapes" ref={ref}>
      <div className="process__container">
        <motion.div
          className="process__header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="process__label">Comment ça marche</span>
          <RevealText className="process__title">Un projet en 4 étapes</RevealText>
          <p className="process__subtitle">
            Chaque projet est unique. On s'adapte à vos besoins pour livrer un
            résultat sur-mesure.
          </p>
        </motion.div>

        {/* Zone sticky scroll */}
        <div className="process__scroll-container" ref={containerRef}>
          {steps.map((step, i) => (
            <StickyStep
              key={step.number}
              step={step}
              index={i}
              total={steps.length}
              containerRef={containerRef}
            />
          ))}
        </div>

        <motion.div
          className="process__cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="#contact"
            className="process__cta-btn"
            onClick={scrollToContact}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Demander un devis gratuit
          </motion.a>
          <p className="process__cta-note">
            Sans engagement · Réponse sous 24h
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Process);
