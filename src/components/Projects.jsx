import { useState, useRef, memo, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import useFocusTrap from "../hooks/useFocusTrap";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import RevealText from "./ui/RevealText";
import {
  HiOutlineExternalLink,
  HiOutlineArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiX,
} from "react-icons/hi";
import { useLanguage } from "../context/LanguageContext";

const PROJECT_IMAGES = {
  1: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=400&fit=crop&q=75",
  7: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop&q=75",
  2: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&q=75",
  4: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop&q=75",
  6: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=75",
  5: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=75",
  3: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&q=75",
};

// Images pour le modal : chaque projet a des captures desktop et mobile
const PROJECT_MODAL_IMAGES = {
  1: {
    desktop: ["/projets/sabaidesktop.png", "/projets/sabaidesktop2.png"],
    mobile: ["/projets/sabaimobile.png", "/projets/sabaimobile2.png"],
  },
  7: {
    desktop: ["/projets/mbdestop.png"],
    mobile: ["/projets/mbmobile.png"],
  },
  2: {
    desktop: ["/projets/bellidesktop.png"],
    mobile: ["/projets/bellimobile.png"],
  },
  4: {
    desktop: ["/projets/gemeauxdesktop.png"],
    mobile: ["/projets/gemeauxmobile.png"],
  },
  6: {
    desktop: ["/projets/restodesktop.png"],
    mobile: ["/projets/restomobilee.png"],
  },
  5: {
    desktop: ["/projets/photodesktop.png"],
    mobile: ["/projets/photomobile.png"],
  },
  3: {
    desktop: ["/projets/photodesktop.png"],
    mobile: ["/projets/photomobile.png"],
  },
};

const PROJECT_URLS = {
  1: "https://sabai-thoiry.com/",
  7: "https://mb-patrimoine-finance.fr/",
  2: "https://bellifood.com/",
  4: "https://depannage-gemeaux.fr/",
  6: "https://restaurant-t.vercel.app/",
  5: "https://www.yojeme.fr/",
  3: "https://photographe-six.vercel.app/",
};

const PROJECT_CATEGORIES = {
  1: "app",
  7: "vitrine",
  2: "vitrine",
  4: "vitrine",
  6: "vitrine",
  5: "vitrine",
  3: "vitrine",
};

const optimizeUnsplashUrl = (url) => {
  if (!url.includes("unsplash.com")) return url;
  const u = new URL(url);
  u.searchParams.set("fm", "webp");
  u.searchParams.set("auto", "format");
  u.searchParams.set("q", "70");
  return u.toString();
};

// ---- Modal projet ----
const ProjectModal = memo(({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("desktop");
  const [currentIndex, setCurrentIndex] = useState(0);
  const panelRef = useRef(null);
  const modalImages = PROJECT_MODAL_IMAGES[project.id] || {
    desktop: [project.image],
    mobile: [project.image],
  };
  const images = modalImages[activeTab] || [];

  useFocusTrap(panelRef, true);

  // Fermeture au clic sur backdrop
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  // Fermeture avec Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset index quand on change d'onglet
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  return createPortal(
    <motion.div
      className="project-modal__backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        ref={panelRef}
        className="project-modal__panel"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Header */}
        <div className="project-modal__header">
          <div className="project-modal__header-info">
            <h2 className="project-modal__title">{project.title}</h2>
            <div className="project-modal__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-modal__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="project-modal__header-actions">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal__visit-btn"
              aria-label="Voir le site"
            >
              <HiOutlineExternalLink size={16} />
              Voir le site
            </a>
            <button
              className="project-modal__close"
              onClick={onClose}
              aria-label="Fermer"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>

        {/* Tabs Desktop / Mobile */}
        <div className="project-modal__tabs">
          <button
            className={`project-modal__tab${
              activeTab === "desktop" ? " project-modal__tab--active" : ""
            }`}
            onClick={() => handleTabChange("desktop")}
          >
            Desktop
          </button>
          <button
            className={`project-modal__tab${
              activeTab === "mobile" ? " project-modal__tab--active" : ""
            }`}
            onClick={() => handleTabChange("mobile")}
          >
            Mobile
          </button>
        </div>

        {/* Slider images */}
        <div
          className={`project-modal__slider project-modal__slider--${activeTab}`}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`${activeTab}-${currentIndex}`}
              src={optimizeUnsplashUrl(images[currentIndex])}
              alt={`${project.title} — ${activeTab} ${currentIndex + 1}`}
              className="project-modal__img"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              loading="lazy"
              decoding="async"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                className="project-modal__arrow project-modal__arrow--left"
                onClick={prev}
                aria-label="Image précédente"
              >
                <HiChevronLeft size={22} />
              </button>
              <button
                className="project-modal__arrow project-modal__arrow--right"
                onClick={next}
                aria-label="Image suivante"
              >
                <HiChevronRight size={22} />
              </button>
              <div className="project-modal__dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`project-modal__dot${
                      i === currentIndex ? " project-modal__dot--active" : ""
                    }`}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <div className="project-modal__description">
          <p>{project.description}</p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
});

ProjectModal.displayName = "ProjectModal";

const ProjectImage = memo(({ src, alt, overlayText }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedSrc = optimizeUnsplashUrl(src);

  return (
    <div className="projects__item-image-wrapper">
      {!isLoaded && <div className="projects__item-placeholder" />}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`projects__item-image ${
          isLoaded ? "projects__item-image--loaded" : ""
        }`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="projects__item-overlay">
        <span className="projects__item-overlay-text">
          <HiOutlineExternalLink size={18} />
          {overlayText}
        </span>
      </div>
    </div>
  );
});

ProjectImage.displayName = "ProjectImage";

const BentoCard = memo(({ project, variants, categoryLabels, onOpen }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedSrc = optimizeUnsplashUrl(project.image);
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      rotateY.set(x * 14);
      rotateX.set(-y * 14);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.button
      ref={cardRef}
      className="projects__bento-card"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-cursor-hover
      aria-label={project.title}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
    >
      {!isLoaded && <div className="projects__bento-placeholder" />}
      <img
        src={optimizedSrc}
        alt={project.title}
        className={`projects__bento-bg${
          isLoaded ? " projects__bento-bg--loaded" : ""
        }`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />

      <div className="projects__bento-gradient" />

      <div className="projects__bento-content">
        <h3 className="projects__bento-title">{project.title}</h3>
        <span
          className={`projects__bento-badge projects__bento-badge--${project.category}`}
        >
          {categoryLabels[project.category]}
        </span>
      </div>
    </motion.button>
  );
});

BentoCard.displayName = "BentoCard";

const ProjectItem = memo(
  ({ project, index, variants, overlayText, onOpen }) => {
    return (
      <motion.button
        className="projects__item"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        data-cursor-hover
        aria-label={project.title}
        onClick={() => onOpen(project)}
      >
        <span className="projects__item-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <ProjectImage
          src={project.image}
          alt={project.title}
          overlayText={overlayText}
        />

        <div className="projects__item-content">
          <div className="projects__item-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="projects__item-tag">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="projects__item-title">{project.title}</h3>
          <p className="projects__item-description">{project.description}</p>
        </div>

        <div className="projects__item-arrow">
          <HiOutlineExternalLink className="projects__item-arrow-icon" />
        </div>
      </motion.button>
    );
  }
);

ProjectItem.displayName = "ProjectItem";

const Projects = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const listRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const updateArrows = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 30) setShowSwipeHint(false);
      updateArrows();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    updateArrows();
    return () => el.removeEventListener("scroll", onScroll);
  }, [updateArrows]);

  // Bloquer le scroll body quand modal ouvert
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "clip";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const scrollBy = useCallback((dir) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }, []);

  const projects = useMemo(
    () =>
      t.projects.items.map((item) => ({
        ...item,
        image: PROJECT_IMAGES[item.id],
        url: PROJECT_URLS[item.id],
        category: PROJECT_CATEGORIES[item.id],
      })),
    [t.projects.items]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.15 },
      },
    }),
    []
  );

  const handleOpen = useCallback((project) => setSelectedProject(project), []);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <section
      className="projects"
      id="projects"
      ref={ref}
      aria-label="Portfolio — Nos réalisations web"
    >
      <div className="projects__container">
        <div className="projects__desktop-layout">
          <motion.div
            className="projects__sidebar"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="projects__label">{t.projects.label}</span>
            <RevealText className="projects__title">
              {t.projects.title}
            </RevealText>
            <p className="projects__subtitle">{t.projects.subtitle}</p>
            <p className="projects__description">{t.projects.description}</p>
          </motion.div>

          <motion.div
            className="projects__bento"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <BentoCard
                  key={project.id}
                  project={project}
                  variants={itemVariants}
                  categoryLabels={t.projects.categoryLabels}
                  onOpen={handleOpen}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          className="projects__header-mobile"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <span className="projects__label">{t.projects.label}</span>
          <h2 className="projects__title">{t.projects.title}</h2>
        </motion.div>

        <div className="projects__list-wrapper">
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                className="projects__nav-arrow projects__nav-arrow--left"
                onClick={() => scrollBy(-1)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                aria-label="Previous projects"
              >
                <HiChevronLeft />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.div
            className="projects__list"
            ref={listRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  index={index}
                  variants={itemVariants}
                  overlayText={t.projects.label}
                  onOpen={handleOpen}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                className="projects__nav-arrow projects__nav-arrow--right"
                onClick={() => scrollBy(1)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                aria-label="Next projects"
              >
                <HiChevronRight />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                className="projects__swipe-hint"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <HiOutlineArrowRight className="projects__swipe-hint-icon" />
                <span>{t.projects.swipeHint}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
