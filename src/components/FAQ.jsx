import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import RevealText from "./ui/RevealText";

const FAQ_ITEMS = [
  {
    question: "Combien coûte la création d'un site web ?",
    answer:
      "Le tarif dépend du type de projet. Un site vitrine démarre à 1 490€, un site e-commerce à 2 490€, et une application web sur-mesure est devisée selon vos besoins. Chaque projet fait l'objet d'un devis gratuit et sans engagement.",
  },
  {
    question: "Combien de temps faut-il pour livrer un site ?",
    answer:
      "Un site vitrine est livré en moyenne en 5 jours, un e-commerce en 14 jours. Ces délais incluent la phase de conception, le développement et les retours. Tout dépend aussi de la rapidité avec laquelle vous me fournissez vos contenus (textes, photos).",
  },
  {
    question: "Est-ce que mon site sera responsive (mobile) ?",
    answer:
      "Oui, absolument. Tous les sites que je crée sont 100% responsive et optimisés pour mobile, tablette et desktop. C'est un standard non négociable dans mon process de développement.",
  },
  {
    question: "Est-ce que vous vous occupez du SEO ?",
    answer:
      "Oui, l'optimisation SEO de base est incluse dans chaque prestation : structure HTML sémantique, balises meta, performance (score Lighthouse 90+), sitemap et compatibilité avec Google Search Console. Pour du SEO avancé (stratégie de contenu, netlinking), c'est une option séparée.",
  },
  {
    question: "Que se passe-t-il après la livraison ?",
    answer:
      "Je reste disponible après la livraison pour corriger d'éventuels bugs ou faire des ajustements. Pour un suivi régulier (mises à jour, sauvegardes, évolutions), je propose des forfaits de maintenance mensuelle adaptés.",
  },
  {
    question:
      "Est-ce que vous travaillez avec des clients hors du Pays de Gex ?",
    answer:
      "Oui, je travaille avec des clients partout en France et en Suisse. Tout se fait à distance : échanges par visio, partage de fichiers en ligne. La distance n'est pas un obstacle.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "J'utilise React pour les interfaces, Node.js pour le backend, MySQL pour les bases de données, et Stripe pour les paiements. Tous les sites sont buildés avec Vite pour des performances maximales. Vous trouverez le détail de ma stack technique ci-dessous.",
  },
];

const FAQItem = ({ item, index, isOpen, onToggle }) => {
  return (
    <motion.div
      className={`faq__item${isOpen ? " faq__item--open" : ""}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className="faq__icon">
          {isOpen ? (
            <Minus size={18} strokeWidth={2} />
          ) : (
            <Plus size={18} strokeWidth={2} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq" id="faq" ref={ref}>
      <div className="faq__container">
        <motion.div
          className="faq__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="faq__label">FAQ</span>
          <RevealText className="faq__title">Questions fréquentes</RevealText>
          <p className="faq__subtitle">
            Tout ce que vous voulez savoir avant de démarrer votre projet.
          </p>
        </motion.div>

        <div className="faq__list">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
