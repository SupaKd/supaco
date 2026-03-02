import { useRef, memo, useMemo, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Supaco+Digital+%7C+Agence+Web";

const AVATAR_COLORS = ["#1a73e8", "#ea4335", "#34a853", "#fbbc04", "#9334e6"];

const TESTIMONIALS = [
  {
    name: "Sabai Thoiry",
    rating: 5,
    date: "il y a 2 mois",
    color: AVATAR_COLORS[0],
    text: "Super expérience du début à la fin. À l'écoute, réactif et très pro, mon site correspond exactement à ce que je voulais. Je recommande les yeux fermés.",
  },
  {
    name: "Béatrice",
    rating: 5,
    date: "il y a 3 mois",
    color: AVATAR_COLORS[1],
    text: "Très professionnel, rapide et rigoureux. Après un premier échange, il a tout de suite compris notre projet et a su nous accompagner sur la création de notre boutique en ligne avec beaucoup de créativité !",
  },
  {
    name: "Gémeaux",
    rating: 5,
    date: "il y a 4 mois",
    color: AVATAR_COLORS[2],
    text: "Professionnel, disponible et réactif. Les prestations sont de qualités. Je recommande !",
  },
  {
    name: "Bellifood",
    rating: 5,
    date: "il y a 5 mois",
    color: AVATAR_COLORS[3],
    text: "Je ne connaissais rien au web et l'équipe m'a accompagnée de A à Z. Depuis le lancement du site, j'ai de nouveaux clients chaque semaine.",
  },
  {
    name: "Kenneth Lam",
    rating: 5,
    date: "il y a 6 mois",
    color: AVATAR_COLORS[4],
    text: "Compétent et professionnel.",
  },
];

const StarRating = memo(({ rating }) => (
  <div className="testimonials__stars">
    {Array.from({ length: 5 }, (_, i) => (
      <HiStar
        key={i}
        size={16}
        className={
          i < rating
            ? "testimonials__star--filled"
            : "testimonials__star--empty"
        }
      />
    ))}
  </div>
));
StarRating.displayName = "StarRating";

const TestimonialCard = memo(({ t }) => (
  <div className="testimonials__card">
    <div className="testimonials__card-header">
      <div className="testimonials__card-avatar" style={{ background: t.color }}>
        {t.name.charAt(0)}
      </div>
      <div className="testimonials__card-info">
        <span className="testimonials__card-name">{t.name}</span>
        <span className="testimonials__card-contributions">Contributeur local</span>
      </div>
      <FcGoogle size={24} className="testimonials__card-google" />
    </div>
    <div className="testimonials__card-meta">
      <StarRating rating={t.rating} />
      <span className="testimonials__card-date">{t.date}</span>
    </div>
    <p className="testimonials__card-text">{t.text}</p>
  </div>
));
TestimonialCard.displayName = "TestimonialCard";

// ---- Desktop : carousel infini ----
const InfiniteCarousel = memo(() => {
  const [paused, setPaused] = useState(false);
  // Dupliquer 3x pour un scroll sans accroc
  const items = useMemo(() => [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS], []);

  return (
    <div
      className="testimonials__carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`testimonials__carousel-track${paused ? " testimonials__carousel-track--paused" : ""}`}>
        {items.map((t, i) => (
          <div className="testimonials__carousel-item" key={i}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </div>
  );
});
InfiniteCarousel.displayName = "InfiniteCarousel";

// ---- Mobile : slider 1 carte ----
const MobileSlider = memo(({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const goTo = useCallback(
    (i) => {
      setDirection(i > current ? 1 : -1);
      setCurrent(i);
    },
    [current]
  );

  // Auto-play mobile
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      transition: { duration: 0.25, ease: "easeIn" },
    }),
  };

  const t = testimonials[current];

  return (
    <div className="testimonials__slider">
      <button className="testimonials__arrow testimonials__arrow--left" onClick={prev} aria-label="Avis précédent">
        <HiChevronLeft />
      </button>

      <div className="testimonials__slide-wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <TestimonialCard t={t} />
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="testimonials__arrow testimonials__arrow--right" onClick={next} aria-label="Avis suivant">
        <HiChevronRight />
      </button>

      <div className="testimonials__dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonials__dot${i === current ? " testimonials__dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Aller à l'avis ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
});
MobileSlider.displayName = "MobileSlider";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="testimonials__container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <span className="testimonials__label">Témoignages</span>
          <h2 className="testimonials__title">Ce que disent nos clients</h2>
          <p className="testimonials__subtitle">
            La satisfaction de nos clients est notre meilleure carte de visite.
          </p>
        </motion.div>

        {/* Desktop : carousel infini */}
        <motion.div
          className="testimonials__carousel-wrapper"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <InfiniteCarousel />
        </motion.div>

        {/* Mobile : slider 1 carte */}
        <motion.div
          className="testimonials__slider-wrapper"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MobileSlider testimonials={TESTIMONIALS} />
        </motion.div>

        <motion.div
          className="testimonials__google"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="testimonials__google-link"
          >
            <FcGoogle size={24} />
            <span>Voir tous nos avis sur Google</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
