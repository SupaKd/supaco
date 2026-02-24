import { memo, useRef, useState, useCallback, useEffect } from "react";
import { motion as Motion, useInView, AnimatePresence } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi";

const features = [
  "Adapté à tous les écrans — mobile, tablette, desktop",
  "Navigation fluide et intuitive sur smartphone",
  "Temps de chargement optimisé sur mobile",
  "Expérience utilisateur cohérente sur tous les appareils",
];

// ---- Écrans simulés ----

const ScreenHome = memo(() => (
  <div className="phone-screen__home">
    <div className="phone-screen__home-hero">
      <div className="phone-screen__home-badge" />
      <div className="phone-screen__home-title" />
      <div className="phone-screen__home-title phone-screen__home-title--short" />
      <div className="phone-screen__home-sub" />
      <div className="phone-screen__home-cta">Démarrer →</div>
    </div>

    <div className="phone-screen__home-stats">
      {[
        { value: "15+", label: "Projets" },
        { value: "98%", label: "Satisfaits" },
        { value: "5★", label: "Note" },
      ].map(({ value, label }) => (
        <div key={label} className="phone-screen__home-stat">
          <span className="phone-screen__home-stat-value">{value}</span>
          <span className="phone-screen__home-stat-label">{label}</span>
        </div>
      ))}
    </div>

    <div className="phone-screen__home-section-label">Derniers projets</div>
    <div className="phone-screen__home-projects">
      <div className="phone-screen__home-project phone-screen__home-project--cyan">
        <div className="phone-screen__home-project-tag">Site Vitrine</div>
        <div className="phone-screen__home-project-line" />
      </div>
      <div className="phone-screen__home-project phone-screen__home-project--blue">
        <div className="phone-screen__home-project-tag">E-Commerce</div>
        <div className="phone-screen__home-project-line" />
      </div>
    </div>
  </div>
));

const ScreenServices = memo(() => (
  <div className="phone-screen__services">
    <div className="phone-screen__section-label">Nos services</div>
    {[
      { label: "Site Vitrine" },
      { label: "E-Commerce" },
      { label: "App Web" },
    ].map(({ label }) => (
      <div key={label} className="phone-screen__service-card">
        <div className="phone-screen__service-icon" />
        <div className="phone-screen__service-text">
          <div className="phone-screen__service-name">{label}</div>
          <div className="phone-screen__service-line" />
          <div className="phone-screen__service-line phone-screen__service-line--short" />
        </div>
        <div className="phone-screen__service-arrow">›</div>
      </div>
    ))}
  </div>
));

const ScreenContact = memo(() => (
  <div className="phone-screen__contact">
    <div className="phone-screen__section-label">Nous contacter</div>
    <div className="phone-screen__input">
      <div className="phone-screen__input-label">Nom</div>
      <div className="phone-screen__input-field" />
    </div>
    <div className="phone-screen__input">
      <div className="phone-screen__input-label">Email</div>
      <div className="phone-screen__input-field" />
    </div>
    <div className="phone-screen__input">
      <div className="phone-screen__input-label">Message</div>
      <div className="phone-screen__input-field phone-screen__input-field--textarea" />
    </div>
    <div className="phone-screen__contact-btn">Envoyer</div>
  </div>
));

ScreenHome.displayName = "ScreenHome";
ScreenServices.displayName = "ScreenServices";
ScreenContact.displayName = "ScreenContact";

const SCREENS = [
  { id: "home", label: "Accueil", Component: ScreenHome },
  { id: "services", label: "Services", Component: ScreenServices },
  { id: "contact", label: "Contact", Component: ScreenContact },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  }),
};

// ---- Mockup interactif (desktop/tablet uniquement) ----

const PhoneMockup = memo(() => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const containerRef = useRef(null);
  const isVisibleRef = useRef(false);

  const goToManual = useCallback(
    (idx) => {
      setActive((prev) => {
        setDir(idx > prev ? 1 : -1);
        return idx;
      });
      isPausedRef.current = true;
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 3000);
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const interval = setInterval(() => {
      if (!isPausedRef.current && isVisibleRef.current) {
        setDir(1);
        setActive((prev) => (prev + 1) % SCREENS.length);
      }
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(resumeTimerRef.current);
      observer.disconnect();
    };
  }, []);

  const { Component } = SCREENS[active];

  return (
    <div className="responsive__phone" ref={containerRef}>
      <div className="responsive__phone-frame">
        <div className="responsive__phone-btn responsive__phone-btn--vol-up" />
        <div className="responsive__phone-btn responsive__phone-btn--vol-down" />
        <div className="responsive__phone-btn responsive__phone-btn--power" />

        <div className="responsive__phone-screen">
          <div className="responsive__phone-notch" />

          <div className="responsive__ui-navbar">
            <img
              src="/newlogo.png"
              alt="logo"
              className="responsive__ui-logo"
              loading="lazy"
            />
            <div className="responsive__ui-nav-links">
              {SCREENS.map(({ id, label }, idx) => (
                <button
                  key={id}
                  className={`responsive__ui-nav-link${
                    active === idx ? " responsive__ui-nav-link--active" : ""
                  }`}
                  onClick={() => goToManual(idx)}
                  aria-label={label}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="responsive__ui-content">
            <AnimatePresence custom={dir} mode="popLayout" initial={false}>
              <Motion.div
                key={active}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="responsive__ui-screen"
              >
                <Component />
              </Motion.div>
            </AnimatePresence>
          </div>

          <div className="responsive__ui-bottombar">
            {SCREENS.map(({ id }, idx) => (
              <button
                key={id}
                className={`responsive__ui-dot${
                  active === idx ? " responsive__ui-dot--active" : ""
                }`}
                onClick={() => goToManual(idx)}
                aria-label={`Écran ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="responsive__phone-glow" />
    </div>
  );
});

PhoneMockup.displayName = "PhoneMockup";

// ---- Placeholder statique pour mobile ----

const MobileIllustration = memo(() => (
  <div className="responsive__mobile-illustration">
    <div className="responsive__mobile-devices">
      <div className="responsive__mobile-device responsive__mobile-device--phone">
        <div className="responsive__mobile-device-screen">
          <div className="responsive__mobile-device-line" />
          <div className="responsive__mobile-device-line responsive__mobile-device-line--short" />
          <div className="responsive__mobile-device-line responsive__mobile-device-line--shorter" />
        </div>
      </div>
      <div className="responsive__mobile-device responsive__mobile-device--tablet">
        <div className="responsive__mobile-device-screen">
          <div className="responsive__mobile-device-line" />
          <div className="responsive__mobile-device-line responsive__mobile-device-line--short" />
          <div className="responsive__mobile-device-line responsive__mobile-device-line--shorter" />
        </div>
      </div>
    </div>
  </div>
));

MobileIllustration.displayName = "MobileIllustration";

// ---- Section principale ----

const Responsive = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section className="responsive" ref={ref} id="responsive">
      <div className="responsive__container">
        <Motion.div
          className="responsive__visual"
          variants={fadeLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Mockup animé sur desktop/tablet, illustration statique sur mobile */}
          <div className="responsive__desktop-only">
            <PhoneMockup />
          </div>
          <div className="responsive__mobile-only">
            <MobileIllustration />
          </div>
        </Motion.div>

        <Motion.div
          className="responsive__content"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Motion.h2 className="responsive__title" variants={fadeUp}>
            Votre site, <span className="gradient-text">partout,</span> toujours
            parfait
          </Motion.h2>

          <Motion.p className="responsive__description" variants={fadeUp}>
            Chaque site que nous créons s&apos;adapte automatiquement à tous les
            appareils. Que vos visiteurs naviguent sur téléphone, tablette ou
            ordinateur, ils profitent d&apos;une expérience optimale sans aucun
            compromis.
          </Motion.p>

          <Motion.ul className="responsive__features" variants={fadeUp}>
            {features.map((feature) => (
              <li key={feature} className="responsive__feature">
                <HiOutlineCheckCircle className="responsive__feature-icon" />
                <span>{feature}</span>
              </li>
            ))}
          </Motion.ul>
        </Motion.div>
      </div>
    </section>
  );
};

export default memo(Responsive);
