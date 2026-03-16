import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import RevealText from "./ui/RevealText";
import BlogModal from "./BlogModal";

export const BLOG_POSTS = [
  {
    slug: "pourquoi-site-web-entreprise-pays-de-gex",
    title: "Pourquoi votre entreprise du Pays de Gex a besoin d'un site web en 2025",
    excerpt:
      "Dans une zone frontalière aussi dynamique que le Pays de Gex, ne pas avoir de site web, c'est laisser vos concurrents capter vos clients. Voici pourquoi c'est indispensable.",
    category: "Stratégie digitale",
    readTime: "5 min",
    date: "12 mars 2025",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop",
    tags: ["SEO", "Pays de Gex", "Création site web"],
  },
  {
    slug: "site-vitrine-vs-ecommerce-lequel-choisir",
    title: "Site vitrine ou e-commerce : lequel choisir pour votre activité ?",
    excerpt:
      "Site vitrine, boutique en ligne, application web… Les options sont nombreuses. On vous aide à choisir la solution adaptée à votre projet et à votre budget.",
    category: "Conseils",
    readTime: "4 min",
    date: "28 févr. 2025",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
    tags: ["E-commerce", "Site vitrine", "Conseil"],
  },
  {
    slug: "seo-local-gex-ferney-voltaire",
    title: "SEO local : comment apparaître en premier sur Google à Gex et Ferney-Voltaire",
    excerpt:
      "Le référencement local est la clé pour attirer des clients près de chez vous. Découvrez les techniques concrètes pour dominer les résultats de recherche locaux.",
    category: "SEO",
    readTime: "6 min",
    date: "14 févr. 2025",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80&auto=format&fit=crop",
    tags: ["SEO local", "Google My Business", "Gex"],
  },
  {
    slug: "combien-coute-site-web-freelance",
    title: "Combien coûte un site web chez un freelance en 2025 ?",
    excerpt:
      "Agence, freelance, no-code… Les prix varient du simple au quintuple. On décrypte les tarifs réels et ce que vous obtenez pour votre argent.",
    category: "Tarifs",
    readTime: "5 min",
    date: "3 févr. 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    tags: ["Prix", "Freelance", "Budget"],
  },
  {
    slug: "vitesse-chargement-site-web-performance",
    title: "Pourquoi la vitesse de votre site web est cruciale pour le SEO et les conversions",
    excerpt:
      "Un site lent perd des clients — 53% des visiteurs quittent une page qui met plus de 3 secondes à charger. Voici comment optimiser vos performances.",
    category: "Performance",
    readTime: "4 min",
    date: "20 janv. 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    tags: ["Performance", "Core Web Vitals", "Lighthouse"],
  },
  {
    slug: "site-web-restaurant-pays-de-gex",
    title: "Site web pour restaurant : ce qu'il faut absolument avoir en 2025",
    excerpt:
      "Menu en ligne, réservation, commande à emporter… Un bon site web peut doubler la visibilité de votre restaurant. Voici les essentiels.",
    category: "Secteurs",
    readTime: "5 min",
    date: "8 janv. 2025",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop",
    tags: ["Restaurant", "Site vitrine", "Réservation en ligne"],
  },
];

const BlogCard = ({ post, index, onOpen }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      className="blog__card"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <button className="blog__card-link" onClick={() => onOpen(post)} aria-label={post.title}>
        <div className="blog__card-image-wrap">
          <img
            src={post.image}
            alt={post.title}
            className="blog__card-image"
            loading="lazy"
          />
          <span className="blog__card-category">{post.category}</span>
        </div>

        <div className="blog__card-body">
          <div className="blog__card-meta">
            <span className="blog__card-date">{post.date}</span>
            <span className="blog__card-dot" />
            <Clock size={12} />
            <span>{post.readTime}</span>
          </div>

          <h2 className="blog__card-title">{post.title}</h2>
          <p className="blog__card-excerpt">{post.excerpt}</p>

          <div className="blog__card-tags">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="blog__card-tag">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          <span className="blog__card-cta">
            Lire l'article <ArrowRight size={14} strokeWidth={2} />
          </span>
        </div>
      </button>
    </motion.article>
  );
};

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activePost, setActivePost] = useState(null);

  const handleOpen = useCallback((post) => setActivePost(post), []);
  const handleClose = useCallback(() => setActivePost(null), []);

  return (
    <>
      <section className="blog" id="blog" ref={ref}>
        <div className="blog__container">
          <motion.div
            className="blog__header"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="blog__label">Blog</span>
            <RevealText className="blog__title">Conseils & ressources web</RevealText>
            <p className="blog__subtitle">
              Stratégie digitale, SEO local, création de site — des articles concrets pour développer votre visibilité en ligne.
            </p>
          </motion.div>

          <div className="blog__grid">
            {BLOG_POSTS.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} onOpen={handleOpen} />
            ))}
          </div>
        </div>
      </section>

      <BlogModal post={activePost} onClose={handleClose} />
    </>
  );
};

export default Blog;
