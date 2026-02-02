import { memo, useCallback, useMemo } from "react";

const Hero = memo(() => {
  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const stats = useMemo(
    () => [
      { value: "72h", label: "Délai de livraison" },
      { value: "500€", label: "À partir de" },
      { value: "100%", label: "Satisfaction client" },
    ],
    []
  );

  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <h1 className="hero__title">
          Votre site web
          <br />
          livré en <span className="highlight">72 heures</span>
        </h1>

        <p className="hero__subtitle">
          Agence web spécialisée dans la création de sites modernes et
          performants pour les entreprises locales. Prix transparents, résultats
          garantis.
        </p>

        <div className="hero__ctas">
          <a
            href="#contact"
            className="hero__cta-primary"
            onClick={scrollToContact}
          >
            Obtenir un devis gratuit
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#projects"
            className="hero__cta-secondary"
            onClick={scrollToProjects}
          >
            Voir nos réalisations
          </a>
        </div>

        <div className="hero__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <br />
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
