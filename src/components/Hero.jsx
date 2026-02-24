import { memo, useCallback } from "react";
import { ArrowRight } from "lucide-react";

const badges = [
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Réponse < 24h",
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: "Livraison rapide",
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "98% de satisfaction",
  },
];

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
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
          className="hero__bg-logo hero__bg-logo--1"
        />
        <img
          src="/android-chrome-512x512.png"
          alt=""
          width="250"
          height="250"
          loading="lazy"
          decoding="async"
          className="hero__bg-logo hero__bg-logo--2"
        />
        <img
          src="/newlogo.png"
          alt=""
          width="200"
          height="60"
          loading="lazy"
          decoding="async"
          className="hero__bg-logo hero__bg-logo--3"
        />
        <img
          src="/newlogo.png"
          alt=""
          width="200"
          height="60"
          loading="lazy"
          decoding="async"
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
        {/* Colonne gauche — photo */}
        <div className="hero__left">
          <div className="hero__profile-card">
            {/* Badge disponibilité */}

            {/* Photo ronde */}
            <div className="hero__photo-wrapper">
              <div className="hero__photo">
                <img
                  src="/supa.jpeg"
                  alt="Kevin - Développeur web Supaco Digital"
                  width="200"
                  height="200"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
                <circle cx="12" cy="7" r="4" />
              </div>
            </div>

            {/* Stats sous la photo */}
            <div className="hero__stats">
              <div className="hero__stat">
                <strong>+15</strong>
                <span>Projets livrés</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <strong>7j</strong>
                <span>Livraison express</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <strong>98%</strong>
                <span>Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite — description profil */}
        <div className="hero__right">
          <h1 className="hero__title">
            Bonjour, je suis <span className="gradient-text">Kevin</span>{" "}
          </h1>

          <p className="hero__subtitle">
            J’accompagne les PME et indépendants du Pays de Gex dans la création
            de sites web sur-mesure. Un interlocuteur unique du brief à la mise
            en ligne — sans intermédiaire, sans délais inutiles.
          </p>

          <p className="hero__bio">
            J’aime prendre le temps de comprendre votre activité, vos objectifs
            et votre vision. Mon rôle ne se limite pas à créer un site, mais à
            construire avec vous un outil qui attire des clients, simplifie
            votre quotidien et soutient votre croissance. Chaque projet est
            pensé pour convertir, évoluer et réussir sur le long terme.
          </p>

          {/* Badges valeurs */}
          <div className="hero__value-badges">
            {badges.map((badge) => (
              <span key={badge.label} className="hero__value-badge">
                <span className="hero__value-badge-icon">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>

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
              Voir mes réalisations
            </a>
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
