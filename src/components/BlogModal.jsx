import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Tag, ArrowRight } from "lucide-react";
import { BLOG_CONTENT } from "../data/blog-content";
import useFocusTrap from "../hooks/useFocusTrap";

const BlogModal = ({ post, onClose }) => {
  const content = post ? BLOG_CONTENT[post.slug] : null;
  const panelRef = useRef(null);
  useFocusTrap(panelRef, !!post);

  // Fermer avec Escape + bloquer le scroll
  useEffect(() => {
    if (!post) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [post, onClose]);

  const handleBackdrop = useCallback(
    (e) => { if (e.target === e.currentTarget) onClose(); },
    [onClose]
  );

  const navigate = useNavigate();

  const scrollToContact = useCallback(() => {
    onClose();
    navigate("/contact");
  }, [onClose, navigate]);

  return (
    <AnimatePresence>
      {post && content && (
        <motion.div
          className="blog-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={post.title}
        >
          <motion.div
            ref={panelRef}
            className="blog-modal__panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={post.title}
          >
            {/* Bouton fermer */}
            <button className="blog-modal__close" onClick={onClose} aria-label="Fermer">
              <X size={20} strokeWidth={2} />
            </button>

            {/* Image hero */}
            <div className="blog-modal__hero">
              <img src={post.image} alt={post.title} loading="lazy" />
              <div className="blog-modal__hero-overlay" />
              <span className="blog-modal__category">{post.category}</span>
            </div>

            {/* Contenu scrollable */}
            <div className="blog-modal__body">
              {/* Meta */}
              <div className="blog-modal__meta">
                <span>{post.date}</span>
                <span className="blog-modal__dot" />
                <Clock size={13} />
                <span>{post.readTime} de lecture</span>
              </div>

              {/* Titre */}
              <h1 className="blog-modal__title">{post.title}</h1>

              {/* Tags */}
              <div className="blog-modal__tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-modal__tag">
                    <Tag size={11} /> {tag}
                  </span>
                ))}
              </div>

              {/* Intro */}
              <p className="blog-modal__intro">{content.intro}</p>

              {/* Sections */}
              {content.sections.map((section, i) => (
                <div key={i} className="blog-modal__section">
                  <h2 className="blog-modal__section-heading">{section.heading}</h2>
                  <p className="blog-modal__section-content">{section.content}</p>
                </div>
              ))}

              {/* Conclusion */}
              <div className="blog-modal__conclusion">
                <p>{content.conclusion}</p>
              </div>

              {/* CTA */}
              <button className="blog-modal__cta" onClick={scrollToContact}>
                {content.cta}
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
