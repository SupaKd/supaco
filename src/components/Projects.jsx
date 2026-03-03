import { useState, useRef, memo, useCallback, useMemo, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import RevealText from './ui/RevealText';
import {
  HiOutlineExternalLink,
  HiOutlineArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { useLanguage } from "../context/LanguageContext";

const PROJECT_IMAGES = {
  1: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=400&fit=crop&q=75",
  7: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop&q=75",
  2: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&q=75",
  4: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop&q=75",
  6: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=75",
  5: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=75",
  3: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop&q=75",
};

const PROJECT_URLS = {
  1: "https://sabai-thoiry.com/",
  7: "https://mb-beige-six.vercel.app/",
  2: "https://bellifood.com/",
  4: "https://depannage-gemeaux.fr/",
  6: "https://restaurant-t.vercel.app/",
  5: "https://www.yojeme.fr/",
  3: "https://cms-xi-self.vercel.app/",
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

const ProjectImage = memo(({ src, alt, overlayText }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedSrc = optimizeUnsplashUrl(src);

  return (
    <div className="projects__item-image-wrapper">
      {!isLoaded && <div className="projects__item-placeholder" />}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`projects__item-image ${isLoaded ? "projects__item-image--loaded" : ""}`}
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

const BentoCard = memo(({ project, variants, onProjectClick, categoryLabels }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedSrc = optimizeUnsplashUrl(project.image);
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    rotateY.set(x * 14);
    rotateX.set(-y * 14);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const handleClick = useCallback(() => {
    onProjectClick(project.url);
  }, [project.url, onProjectClick]);

  return (
    <motion.article
      ref={cardRef}
      className="projects__bento-card"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-cursor-hover
      onClick={handleClick}
      role="link"
      tabIndex={0}
      aria-label={`${project.title}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
        className={`projects__bento-bg${isLoaded ? " projects__bento-bg--loaded" : ""}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />

      <div className="projects__bento-gradient" />

      <div className="projects__bento-content">
        <h3 className="projects__bento-title">{project.title}</h3>
        <span className={`projects__bento-badge projects__bento-badge--${project.category}`}>
          {categoryLabels[project.category]}
        </span>
      </div>
    </motion.article>
  );
});

BentoCard.displayName = "BentoCard";

const ProjectItem = memo(({ project, index, variants, onProjectClick, overlayText }) => {
  const handleClick = useCallback(() => {
    onProjectClick(project.url);
  }, [project.url, onProjectClick]);

  return (
    <motion.article
      className="projects__item"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-cursor-hover
      onClick={handleClick}
      role="link"
      tabIndex={0}
      aria-label={`${project.title}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <span className="projects__item-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <ProjectImage src={project.image} alt={project.title} overlayText={overlayText} />

      <div className="projects__item-content">
        <div className="projects__item-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="projects__item-tag">{tag}</span>
          ))}
        </div>
        <h3 className="projects__item-title">{project.title}</h3>
        <p className="projects__item-description">{project.description}</p>
      </div>

      <div className="projects__item-arrow">
        <HiOutlineExternalLink className="projects__item-arrow-icon" />
      </div>
    </motion.article>
  );
});

ProjectItem.displayName = "ProjectItem";

const Projects = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const listRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const scrollBy = useCallback((dir) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }, []);

  const projects = useMemo(
    () => t.projects.items.map((item) => ({
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

  const handleProjectClick = useCallback((url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects__container">
        <div className="projects__desktop-layout">
          <motion.div
            className="projects__sidebar"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="projects__label">{t.projects.label}</span>
            <RevealText className="projects__title">{t.projects.title}</RevealText>
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
                  onProjectClick={handleProjectClick}
                  categoryLabels={t.projects.categoryLabels}
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
                  onProjectClick={handleProjectClick}
                  overlayText={t.projects.label}
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
    </section>
  );
};

export default Projects;
