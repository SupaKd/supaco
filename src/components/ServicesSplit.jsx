import { memo, useState, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";

// Images Unsplash optimisées (800px wide) — remplaçables par tes propres visuels
const PANELS = [
  {
    id: "vitrine",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80&auto=format&fit=crop",
    label: "Le Classique",
  },
  {
    id: "ecommerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop",
    label: "La Boutique",
  },
  {
    id: "app",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop",
    label: "Sur-mesure",
  },
];

const ServicesSplit = () => {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(null);

  const handleEnter = useCallback((id) => setHovered(id), []);
  const handleLeave = useCallback(() => setHovered(null), []);

  const scrollToServices = useCallback((e) => {
    e.stopPropagation();
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="services-split" aria-label="Nos services">
      <div className="services-split__panels">
        {PANELS.map((panel, idx) => {
          const service = t.services.items[idx];
          const isHovered = hovered === panel.id;
          const isShrunken = hovered !== null && hovered !== panel.id;

          return (
            <div
              key={panel.id}
              className={`services-split__panel${isHovered ? " is-hovered" : ""}${isShrunken ? " is-shrunken" : ""}`}
              onMouseEnter={() => handleEnter(panel.id)}
              onMouseLeave={handleLeave}
              onClick={scrollToServices}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToServices(e)}
              aria-label={`Découvrir ${service.title}`}
            >
              {/* Image de fond */}
              <div
                className="services-split__panel-bg"
                style={{ backgroundImage: `url(${panel.image})` }}
              />

              {/* Overlay sombre dégradé vers le bas */}
              <div className="services-split__panel-overlay" />

              {/* Contenu texte en bas à gauche */}
              <div className="services-split__panel-content">
                <p className="services-split__panel-label">{panel.label}</p>
                <h2 className="services-split__panel-title">{service.title}</h2>
                <p className="services-split__panel-desc">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default memo(ServicesSplit);
