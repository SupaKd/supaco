import { memo, useRef, useMemo, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineGlobeAlt,
  HiOutlineShoppingCart,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
} from "react-icons/hi";

const SERVICES = [
  {
    id: "vitrine",
    icon: HiOutlineGlobeAlt,
    label: "Site Vitrine",
    title: "Site Vitrine",
    description:
      "Je conçois votre site de A à Z pour refléter votre image et convaincre vos visiteurs de vous contacter.",
    features: [
      "Design sur-mesure",
      "Responsive mobile",
      "Optimisation SEO",
      "Formulaire de contact",
    ],
    price: "890€",
    stat: { value: "5j", label: "Livraison moyenne" },
    color: "var(--color-accent-primary)",
  },
  {
    id: "ecommerce",
    icon: HiOutlineShoppingCart,
    label: "E-Commerce",
    title: "E-Commerce",
    description:
      "Je construis votre boutique en ligne pour que vos clients achètent facilement — même pendant que vous dormez.",
    features: [
      "Catalogue produits",
      "Paiement sécurisé",
      "Gestion des stocks",
      "Suivi commandes",
    ],
    price: "1 490€",
    stat: { value: "14j", label: "Livraison moyenne" },
    color: "var(--color-accent-primary)",
  },
  {
    id: "app",
    icon: HiOutlineLightningBolt,
    label: "App Web",
    title: "Application Web",
    description:
      "Quand un outil standard ne suffit plus, je développe exactement ce dont vous avez besoin — rien de plus, rien de moins.",
    features: [
      "Développement React",
      "Base de données",
      "API sur-mesure",
      "Dashboard admin",
    ],
    price: "2 990€",
    stat: { value: "30j", label: "Livraison moyenne" },
    color: "var(--color-accent-primary)",
  },
  {
    id: "crm-erp",
    icon: HiOutlineChartBar,
    label: "CRM / ERP",
    title: "CRM / ERP",
    description:
      "Je centralise tout ce qui compte pour vous : vos clients, vos ventes, votre activité — dans un seul outil pensé pour vous.",
    features: [
      "Gestion des contacts",
      "Suivi des ventes",
      "Gestion des stocks",
      "Tableaux de bord",
    ],
    price: "3 990€",
    stat: { value: "30j", label: "Livraison moyenne" },
    color: "var(--color-accent-primary)",
  },
];

function getPosition(idx, active, total) {
  const diff = (idx - active + total) % total;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === total - 1) return "left";
  return "far-left";
}

const cardVariants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 10,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  left: {
    x: "-72%",
    scale: 0.82,
    opacity: 0.55,
    zIndex: 5,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  right: {
    x: "72%",
    scale: 0.82,
    opacity: 0.55,
    zIndex: 5,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  "far-left": {
    x: "-130%",
    scale: 0.68,
    opacity: 0,
    zIndex: 1,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

// ---- Card ----

const ServiceCard = memo(({ service, position, active, onClick }) => {
  const Icon = service.icon;
  const isCenter = position === "center";

  return (
    <motion.div
      className={`services__card services__card--${position}`}
      variants={cardVariants}
      animate={position}
      onClick={!isCenter ? onClick : undefined}
      style={{ cursor: isCenter ? "default" : "pointer" }}
    >
      {service.badge && isCenter && (
        <span className="services__card-badge">{service.badge}</span>
      )}

      <div
        className="services__card-topline"
        style={{
          background: `linear-gradient(90deg, ${service.color}, transparent)`,
        }}
      />

      {/* Icône + titre sur la même ligne */}
      <div className="services__card-header">
        <div
          className={`services__card-icon${
            isCenter ? " services__card-icon--center" : ""
          }`}
          style={{ color: service.color }}
        >
          <Icon />
        </div>
        <h3 className="services__card-title">{service.title}</h3>
      </div>

      {/* Description */}
      <p className="services__card-description">{service.description}</p>

      {/* Corps */}
      <div
        className="services__card-body"
        aria-hidden={false}
        style={{ visibility: "visible" }}
      >
        <motion.div
          key={active}
          initial={isCenter ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="services__card-body-inner"
        >
          <ul className="services__card-features">
            {service.features.map((f) => (
              <li key={f} className="services__card-feature">
                <HiOutlineCheckCircle className="services__card-feature-icon" />
                {f}
              </li>
            ))}
          </ul>

          {/* Prix + paiement */}
          <div className="services__card-pricing">
            <div className="services__card-price">
              <span className="services__card-price-from">À partir de</span>
              <span
                className="services__card-price-value"
                style={{ color: service.color }}
              >
                {service.price}
              </span>
            </div>
            <span className="services__card-installment">
              Possibilité de paiement en 3 ou 4 fois sans frais
            </span>
          </div>

          <div className="services__card-stat">
            <span
              className="services__card-stat-value"
              style={{ color: service.color }}
            >
              {service.stat.value}
            </span>
            <span className="services__card-stat-label">
              {service.stat.label}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = "ServiceCard";

// ---- Tabs ----

const ServiceTabs = memo(({ services, active, onSelect }) => (
  <div className="services__tabs">
    {services.map((s, idx) => {
      const Icon = s.icon;
      return (
        <button
          key={s.id}
          className={`services__tab${
            active === idx ? " services__tab--active" : ""
          }`}
          onClick={() => onSelect(idx)}
          style={active === idx ? { "--tab-color": s.color } : {}}
        >
          <Icon className="services__tab-icon" />
          <span>{s.label}</span>
        </button>
      );
    })}
  </div>
));

ServiceTabs.displayName = "ServiceTabs";

// ---- Section ----

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  const handleSelect = useCallback((idx) => setActive(idx), []);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setActive((prev) =>
        diff > 0
          ? (prev + 1) % SERVICES.length
          : (prev - 1 + SERVICES.length) % SERVICES.length
      );
    }
    touchStartX.current = null;
  }, []);

  const headerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
      },
    }),
    []
  );

  return (
    <section className="services" id="services" ref={ref}>
      <div className="services__bg" aria-hidden="true">
        <div className="services__bg-orb services__bg-orb--1" />
        <div className="services__bg-orb services__bg-orb--2" />
        <div className="services__bg-grid" />
      </div>

      <div className="services__container">
        <motion.div
          className="services__header"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="services__title">Ce que je propose</h2>
          <p className="services__subtitle">
            Des solutions web adaptées à vos besoins et à votre budget, livrées
            rapidement avec un accompagnement personnalisé.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ServiceTabs
            services={SERVICES}
            active={active}
            onSelect={handleSelect}
          />
        </motion.div>

        <motion.div
          className="services__carousel"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {SERVICES.map((service, idx) => {
            const position = getPosition(idx, active, SERVICES.length);
            return (
              <ServiceCard
                key={service.id}
                service={service}
                position={position}
                active={active}
                onClick={() => handleSelect(idx)}
              />
            );
          })}
        </motion.div>

        <motion.div
          className="services__dots"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {SERVICES.map((s, idx) => (
            <button
              key={s.id}
              className={`services__dot${
                active === idx ? " services__dot--active" : ""
              }`}
              onClick={() => handleSelect(idx)}
              aria-label={s.label}
              style={active === idx ? { "--dot-color": s.color } : {}}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Services);
