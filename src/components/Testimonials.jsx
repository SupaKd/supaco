import { useRef, memo, useMemo, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import RevealText from './ui/RevealText';
import { HiStar } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useLanguage } from "../context/LanguageContext";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Supaco+Digital+%7C+Agence+Web";

const AVATAR_COLORS = ["#1a73e8", "#ea4335", "#34a853", "#fbbc04", "#9334e6"];

const TESTIMONIALS_DATA = [
  {
    name: "Sabai Thoiry",
    rating: 5,
    date: { fr: "il y a 2 mois", en: "2 months ago" },
    color: AVATAR_COLORS[0],
    text: {
      fr: "Super expérience du début à la fin. À l'écoute, réactif et très pro, mon site correspond exactement à ce que je voulais. Je recommande les yeux fermés.",
      en: "Great experience from start to finish. Attentive, responsive and very professional, my site is exactly what I wanted. I recommend without hesitation.",
    },
  },
  {
    name: "Béatrice",
    rating: 5,
    date: { fr: "il y a 3 mois", en: "3 months ago" },
    color: AVATAR_COLORS[1],
    text: {
      fr: "Très professionnel, rapide et rigoureux. Après un premier échange, il a tout de suite compris notre projet et a su nous accompagner sur la création de notre boutique en ligne avec beaucoup de créativité !",
      en: "Very professional, fast and thorough. After an initial chat, he immediately understood our project and guided us through creating our online store with a lot of creativity!",
    },
  },
  {
    name: "Gémeaux",
    rating: 5,
    date: { fr: "il y a 4 mois", en: "4 months ago" },
    color: AVATAR_COLORS[2],
    text: {
      fr: "Professionnel, disponible et réactif. Les prestations sont de qualité. Je recommande !",
      en: "Professional, available and responsive. The services are of high quality. I recommend!",
    },
  },
  {
    name: "Bellifood",
    rating: 5,
    date: { fr: "il y a 5 mois", en: "5 months ago" },
    color: AVATAR_COLORS[3],
    text: {
      fr: "Je ne connaissais rien au web et l'équipe m'a accompagnée de A à Z. Depuis le lancement du site, j'ai de nouveaux clients chaque semaine.",
      en: "I knew nothing about the web and the team guided me from A to Z. Since the site launched, I get new clients every week.",
    },
  },
  {
    name: "Kenneth Lam",
    rating: 5,
    date: { fr: "il y a 6 mois", en: "6 months ago" },
    color: AVATAR_COLORS[4],
    text: {
      fr: "Compétent et professionnel.",
      en: "Competent and professional.",
    },
  },
];

const StarRating = memo(({ rating }) => (
  <div className="testimonials__stars">
    {Array.from({ length: 5 }, (_, i) => (
      <HiStar
        key={i}
        size={16}
        className={i < rating ? "testimonials__star--filled" : "testimonials__star--empty"}
      />
    ))}
  </div>
));
StarRating.displayName = "StarRating";

const TestimonialCard = memo(({ t: testimonial, contributor }) => (
  <div className="testimonials__card">
    <div className="testimonials__card-header">
      <div className="testimonials__card-avatar" style={{ background: testimonial.color }}>
        {testimonial.name.charAt(0)}
      </div>
      <div className="testimonials__card-info">
        <span className="testimonials__card-name">{testimonial.name}</span>
        <span className="testimonials__card-contributions">{contributor}</span>
      </div>
      <FcGoogle size={24} className="testimonials__card-google" />
    </div>
    <div className="testimonials__card-meta">
      <StarRating rating={testimonial.rating} />
      <span className="testimonials__card-date">{testimonial.date}</span>
    </div>
    <p className="testimonials__card-text">{testimonial.text}</p>
  </div>
));
TestimonialCard.displayName = "TestimonialCard";

const InfiniteCarousel = memo(({ items, contributor }) => {
  const [paused, setPaused] = useState(false);
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div
      className="testimonials__carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`testimonials__carousel-track${paused ? " testimonials__carousel-track--paused" : ""}`}>
        {tripled.map((t, i) => (
          <div className="testimonials__carousel-item" key={i}>
            <TestimonialCard t={t} contributor={contributor} />
          </div>
        ))}
      </div>
    </div>
  );
});
InfiniteCarousel.displayName = "InfiniteCarousel";

const MobileSlider = memo(({ testimonials, prevLabel, nextLabel, contributor }) => {
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
      <button className="testimonials__arrow testimonials__arrow--left" onClick={prev} aria-label={prevLabel}>
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
            <TestimonialCard t={t} contributor={contributor} />
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="testimonials__arrow testimonials__arrow--right" onClick={next} aria-label={nextLabel}>
        <HiChevronRight />
      </button>

      <div className="testimonials__dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonials__dot${i === current ? " testimonials__dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
});
MobileSlider.displayName = "MobileSlider";

const Testimonials = () => {
  const { lang, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = useMemo(
    () => TESTIMONIALS_DATA.map((item) => ({
      ...item,
      text: item.text[lang],
      date: item.date[lang],
    })),
    [lang]
  );

  return (
    <section className="testimonials" id="testimonials" ref={ref} aria-label="Avis clients Google">
      <div className="testimonials__container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <span className="testimonials__label">{t.testimonials.label}</span>
          <RevealText className="testimonials__title">{t.testimonials.title}</RevealText>
          <p className="testimonials__subtitle">{t.testimonials.subtitle}</p>
        </motion.div>

        <motion.div
          className="testimonials__carousel-wrapper"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <InfiniteCarousel items={testimonials} contributor={t.testimonials.contributor} />
        </motion.div>

        <motion.div
          className="testimonials__slider-wrapper"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MobileSlider
            testimonials={testimonials}
            prevLabel={t.testimonials.prevAriaLabel}
            nextLabel={t.testimonials.nextAriaLabel}
            contributor={t.testimonials.contributor}
          />
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
            <span>{t.testimonials.googleLink}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
