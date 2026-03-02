import { memo, useCallback, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMagnet } from "../hooks/useMagnet";
import HighlightText from "./ui/HighlightText";

const SWAP_WORDS = ["sites web", "boutiques en ligne", "applications web"];

const WordSwap = memo(() => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SWAP_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <span ref={ref} className="hero__word-swap" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="gradient-text"
          initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
        >
          {SWAP_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

const badges = [
  {
    icon: (
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Réponse < 24h",
  },
  {
    icon: (
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
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: "Livraison rapide",
  },
  {
    icon: (
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
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "100% de satisfaction",
  },
];

const Hero = memo(() => {
  const magnet = useMagnet(0.35);
  const { scrollY } = useScroll();
  // Fond et particules scrollent plus lentement
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  // Contenu principal remonte légèrement
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);

  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Logos flottants en arrière-plan */}
      <motion.div className="hero__bg-logos" style={{ y: bgY }}>
        <img
          src="/logo2026.png"
          alt=""
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
          className="hero__bg-logo hero__bg-logo--1"
        />
        <img
          src="/logo2026.png"
          alt=""
          width="250"
          height="250"
          loading="lazy"
          decoding="async"
          className="hero__bg-logo hero__bg-logo--2"
        />
        <img
          src="/logo2026.png"
          alt=""
          width="200"
          height="60"
          loading="lazy"
          decoding="async"
          className="hero__bg-logo hero__bg-logo--3"
        />
        <img
          src="/logo2026.png"
          alt=""
          width="200"
          height="60"
          loading="lazy"
          decoding="async"
          className="hero__bg-logo hero__bg-logo--4"
        />
      </motion.div>

      {/* Particules décoratives */}
      <motion.div className="hero__particles" style={{ y: bgY }}>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
      </motion.div>

      <motion.div className="hero__container" style={{ y: contentY }}>
        {/* Colonne gauche — photo */}
        <div className="hero__left">
          <div className="hero__profile-card">
            {/* Badge disponibilité */}

            {/* Photo ronde */}
            <div className="hero__photo-wrapper">
              <div className="hero__photo">
                <img
                  src="/kevin.png"
                  alt="Kevin - Développeur web Supaco Digital"
                  width="200"
                  height="200"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>

            {/* Description */}
            <div className="hero__profile-desc">
              <span className="hero__profile-name">Kevin</span>
              <span className="hero__profile-role">Développeur web freelance</span>
            </div>

            {/* Contacts */}
            <div className="hero__contacts">
              <a href="tel:+33600000000" className="hero__contact-item">
                <span className="hero__contact-icon">
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>+33 7 83 05 24 12</span>
              </a>
              <a
                href="https://www.instagram.com/supa_c0/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__contact-item"
              >
                <span className="hero__contact-icon">
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
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <span>@supa_c0</span>
              </a>
              <div className="hero__contact-item hero__contact-item--location">
                <span className="hero__contact-icon">
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
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>Pays de Gex &amp; Genève</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite — description profil */}
        <div className="hero__right">
          <h1 className="hero__title">
            Je crée vos <WordSwap />
          </h1>

          <p className="hero__subtitle">
            J'accompagne les PME et les indépendants du Pays de Gex dans la
            création de sites web sur-mesure, pensés pour générer des résultats
            concrets. <br />
            Mon approche est stratégique : Comprendre votre activité, vos enjeux
            et vos objectifs pour concevoir un site qui attire, rassure et{" "}
            <HighlightText delay={0.3}>convertit vos prospects en clients.</HighlightText>{" "}
            <br />
          </p>

          <p className="hero__bio">
            {" "}
            Un site internet renforce votre crédibilité et crée un canal
            d’acquisition disponible 24h/24. Si vos prospects ne vous trouvent
            pas en ligne, <HighlightText delay={0.5}>ils choisissent vos concurrents.</HighlightText>
          </p>

          {/* Badges valeurs */}
          <div className="hero__value-badges">
            {badges.map((badge) => (
              <span key={badge.label} className="hero__value-badge">
                <span className="hero__value-badge-icon">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero__actions">
            <motion.a
              ref={magnet.ref}
              href="#contact"
              className="hero__cta"
              onClick={scrollToContact}
              onMouseMove={magnet.handleMouseMove}
              onMouseLeave={magnet.handleMouseLeave}
              style={{ x: magnet.springX, y: magnet.springY }}
            >
              Lancer mon projet
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.a>
            <a
              href="#projects"
              className="hero__secondary"
              onClick={scrollToProjects}
            >
              Voir mes réalisations
            </a>
          </div>
        </div>
      </motion.div>

      {/* Gradient décoratif */}
      <div className="hero__gradient"></div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
