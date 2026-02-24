import { useRef, memo, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
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

const ProcessStep = memo(({ step, variants }) => (
  <motion.div className="process__step" variants={variants}>
    <div className="process__step-number">{step.number}</div>
    <div className="process__step-icon">{step.icon}</div>
    <h3 className="process__step-title">{step.title}</h3>
    <p className="process__step-description">{step.description}</p>
  </motion.div>
));

ProcessStep.displayName = "ProcessStep";

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
      },
    }),
    []
  );

  const stepVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    []
  );

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
          transition={{ duration: 0.8 }}
        >
          <span className="process__label">Comment ça marche</span>
          <h2 className="process__title">Un projet en 4 étapes</h2>
          <p className="process__subtitle">
            Chaque projet est unique. On s'adapte à vos besoins pour livrer un
            résultat sur-mesure.
          </p>
        </motion.div>

        <motion.div
          className="process__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step) => (
            <ProcessStep
              key={step.number}
              step={step}
              variants={stepVariants}
            />
          ))}
        </motion.div>

        <motion.div
          className="process__cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
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
