import { memo, useState, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";

// Images Unsplash optimisées (800px wide) — remplaçables par tes propres visuels
const PANELS = [
  {
    id: "vitrine",
    image: "/service/vitrine.jpg",
    label: "Le Classique",
  },
  {
    id: "ecommerce",
    image: "/service/ecom.jpg",
    label: "La Boutique",
  },
  {
    id: "app",
    image: "/service/appweb.jpg",
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
