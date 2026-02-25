import { useState, useRef, memo, useCallback, useMemo, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HiOutlineExternalLink, HiOutlineArrowRight } from "react-icons/hi";

// Ajoute &fm=webp&auto=format aux URLs Unsplash pour forcer le format WebP
const optimizeUnsplashUrl = (url) => {
  if (!url.includes("unsplash.com")) return url;
  const u = new URL(url);
  u.searchParams.set("fm", "webp");
  u.searchParams.set("auto", "format");
  u.searchParams.set("q", "70");
  return u.toString();
};

// Composant Image avec lazy loading + overlay hover
const ProjectImage = memo(({ src, alt }) => {
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
          Voir le projet
        </span>
      </div>
    </div>
  );
});

ProjectImage.displayName = "ProjectImage";

const ProjectItem = memo(({ project, index, variants, onProjectClick }) => {
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
      aria-label={`Voir le projet ${project.title}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <span className="projects__item-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <ProjectImage src={project.image} alt={project.title} />

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
    </motion.article>
  );
});

ProjectItem.displayName = "ProjectItem";

const Projects = () => {
  const ref = useRef(null);
  const listRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const INITIAL_COUNT = 3;

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 30) setShowSwipeHint(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const projects = useMemo(
    () => [
      {
        id: 2,
        title: "Bellifood",
        description:
          "Site vitrine avec menu digital pour un restaurant de tacos et burgers à Oyonnax",
        image:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&q=75",
        tags: ["Site Vitrine", "Restaurant"],
        category: "vitrine",
        url: "https://bellifood.com/",
      },
      {
        id: 7,
        title: "Lucie Conseil",
        description:
          "Site vitrine professionnel pour une conseillère en investissements, avec présentation des services et prise de contact",
        image:
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop&q=75",
        tags: ["Site Vitrine", "Finance"],
        category: "vitrine",
        url: "https://bea-gamma.vercel.app/",
      },
      {
        id: 4,
        title: "Dépannage Gémeaux",
        description:
          "Site vitrine professionnel pour une entreprise de plomberie et chauffage avec formulaire de contact et présentation des services",
        image:
          "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop&q=75",
        tags: ["Site Vitrine", "Artisan"],
        category: "vitrine",
        url: "https://depannage-gemeaux.fr/",
      },
      {
        id: 6,
        title: "Le Comptoir",
        description:
          "Site vitrine élégant pour un restaurant, avec présentation du menu et ambiance soignée",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=75",
        tags: ["Site Vitrine", "Restaurant"],
        category: "vitrine",
        url: "https://restaurant-t.vercel.app/",
      },
      {
        id: 5,
        title: "Yojeme",
        description:
          "Site vitrine moderne et responsive avec design épuré et optimisation SEO",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=75",
        tags: ["Site Vitrine", "Services"],
        category: "vitrine",
        url: "https://www.yojeme.fr/",
      },

      {
        id: 3,
        title: "Optical Store",
        description:
          "Landing page moderne avec effet 3D pour une boutique de lunettes à Lyon",
        image: "/optical.webp",
        tags: ["Site Vitrine", "Lunettes"],
        category: "vitrine",
        url: "https://cms-xi-self.vercel.app/",
      },

      {
        id: 1,
        title: "Restaurant Sabai",
        description:
          "Application web complète de commande en ligne pour un restaurant de cuisine asiatique authentique à Thoiry",
        image:
          "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=400&fit=crop&q=75",
        tags: ["Application Web", "Restaurant"],
        category: "app",
        url: "https://sabai-thoiry.com/",
      },
    ],
    []
  );

  const filters = useMemo(
    () => [
      { id: "all", label: "Tous" },
      { id: "vitrine", label: "Sites Vitrine" },
      { id: "ecommerce", label: "E-Commerce" },
      { id: "app", label: "Applications" },
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter);
    return showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  }, [activeFilter, projects, showAll, INITIAL_COUNT]);

  const totalFiltered = useMemo(
    () =>
      activeFilter === "all"
        ? projects.length
        : projects.filter((p) => p.category === activeFilter).length,
    [activeFilter, projects]
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

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
    setShowAll(false);
  }, []);

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects__container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <div className="projects__header-content">
            <span className="projects__label">Portfolio</span>
            <h2 className="projects__title">Nos réalisations</h2>
          </div>

          <motion.div
            className="projects__filter"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`projects__filter-btn${
                  activeFilter === filter.id
                    ? " projects__filter-btn--active"
                    : ""
                }`}
                onClick={() => handleFilterChange(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="projects__list-wrapper">
          <motion.div
            className="projects__list"
            ref={listRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  index={index}
                  variants={itemVariants}
                  onProjectClick={handleProjectClick}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Indicateur swipe — mobile uniquement */}
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
                <span>Glissez pour voir plus</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {totalFiltered > INITIAL_COUNT && (
          <div className="projects__show-more">
            <button
              className="projects__show-more-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll
                ? "Voir moins"
                : `Voir plus (${totalFiltered - INITIAL_COUNT} projets)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
