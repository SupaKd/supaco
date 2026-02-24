import { useRef, memo, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Supaco+Digital+%7C+Agence+Web";

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

const TestimonialCard = memo(({ testimonial, variants }) => (
  <motion.div className="testimonials__card" variants={variants}>
    <StarRating rating={testimonial.rating} />
    <p className="testimonials__card-text">"{testimonial.text}"</p>
    <div className="testimonials__card-author">
      <div className="testimonials__card-avatar">
        {testimonial.name.charAt(0)}
      </div>
      <div className="testimonials__card-info">
        <span className="testimonials__card-name">{testimonial.name}</span>
        <span className="testimonials__card-role">{testimonial.role}</span>
      </div>
    </div>
  </motion.div>
));

TestimonialCard.displayName = "TestimonialCard";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = useMemo(
    () => [
      {
        name: "Jeremy Morel",
        role: "Artisan, Dépannage Gémeaux",
        rating: 5,
        text: "Professionnel, disponible et réactif. Les prestations sont de qualités. Je recommande !",
      },
      {
        name: "Béatrice S",

        rating: 5,
        text: "Très professionnel, rapide et rigoureux. Après un première échange, il a tout de suite compris notre projet et a su nous accompagner sur la création de notre boutique en ligne avec beaucoupde créativité !",
      },
      {
        name: "Khaled Z",
        role: "Fondateur, Bellifood",
        rating: 5,
        text: "Je ne connaissais rien au web et l'équipe m'a accompagnée de A à Z. Depuis le lancement du site, j'ai de nouveaux clients chaque semaine.",
      },
    ],
    []
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    }),
    []
  );

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

        <motion.div
          className="testimonials__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              variants={cardVariants}
            />
          ))}
        </motion.div>

        <motion.div
          className="testimonials__google"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
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
