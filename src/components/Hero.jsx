import { memo, useCallback } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = memo(() => {
  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Logos flottants en arrière-plan */}
      <div className="hero__bg-logos">
        <img
          src="/android-chrome-512x512.png"
          alt=""
          className="hero__bg-logo hero__bg-logo--1"
        />
        <img
          src="/android-chrome-512x512.png"
          alt=""
          className="hero__bg-logo hero__bg-logo--2"
        />
        <img
          src="/newlogo.png"
          alt=""
          className="hero__bg-logo hero__bg-logo--3"
        />
        <img
          src="/newlogo.png"
          alt=""
          className="hero__bg-logo hero__bg-logo--4"
        />
      </div>

      {/* Particules décoratives */}
      <div className="hero__particles">
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
      </div>

      <div className="hero__container">
        {/* Badge premium */}
        <div className="hero__badge">
          <Sparkles size={14} />
          <span>Agence Web </span>
        </div>

        {/* Titre accrocheur */}
        <h1 className="hero__title">
          Des sites sur-mesure pour booster votre activité <br />
        </h1>

        {/* Sous-titre impactant */}
        <p className="hero__subtitle">
          De l'idée au lancement en 72h. Design moderne, code propre, résultats
          mesurables. Votre succès digital commence ici.
        </p>

        {/* CTAs */}
        <div className="hero__actions">
          <a href="#contact" className="hero__cta" onClick={scrollToContact}>
            Lancer mon projet
            <ArrowRight size={20} strokeWidth={2.5} />
          </a>

          <a
            href="#projects"
            className="hero__secondary"
            onClick={scrollToProjects}
          >
            Voir nos réalisations
          </a>
        </div>

        {/* Stats avec badges */}
        <div className="hero__stats">
          <div className="hero__stat">
            <strong>+15</strong>
            <span>Projets livrés</span>
          </div>

          <div className="hero__stat-divider"></div>

          <div className="hero__stat">
            <strong>72h</strong>
            <span>Livraison express</span>
          </div>

          <div className="hero__stat-divider"></div>

          <div className="hero__stat">
            <strong>100%</strong>
            <span>Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Gradient décoratif */}
      <div className="hero__gradient"></div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
