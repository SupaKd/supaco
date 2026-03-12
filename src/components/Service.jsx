import { memo, useRef, useMemo, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import RevealText from './ui/RevealText';
import {
  HiOutlineGlobeAlt,
  HiOutlineShoppingCart,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ICONS = [HiOutlineGlobeAlt, HiOutlineShoppingCart, HiOutlineLightningBolt];
const SERVICE_COLOR = "var(--color-accent-primary)";

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

const ServiceCard = memo(({ service, position, active, onClick, priceFrom }) => {
  const Icon = SERVICE_ICONS[service._idx];
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
        style={{ background: `linear-gradient(90deg, ${SERVICE_COLOR}, transparent)` }}
      />

      <div className="services__card-header">
        <div
          className={`services__card-icon${isCenter ? " services__card-icon--center" : ""}`}
          style={{ color: SERVICE_COLOR }}
        >
          <Icon />
        </div>
        <h3 className="services__card-title">{service.title}</h3>
      </div>

      <p className="services__card-description">{service.description}</p>

      <div className="services__card-body" aria-hidden={false} style={{ visibility: "visible" }}>
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

          <div className="services__card-pricing">
            <div className="services__card-price">
              <span className="services__card-price-from">{priceFrom}</span>
              <span className="services__card-price-value" style={{ color: SERVICE_COLOR }}>
                {service.price}
              </span>
            </div>
          </div>

          <div className="services__card-stat">
            <span className="services__card-stat-value" style={{ color: SERVICE_COLOR }}>
              {service.stat.value}
            </span>
            <span className="services__card-stat-label">{service.stat.label}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = "ServiceCard";

const ServiceTabs = memo(({ services, active, onSelect }) => (
  <div className="services__tabs">
    {services.map((s, idx) => {
      const Icon = SERVICE_ICONS[idx];
      return (
        <button
          key={s.id}
          className={`services__tab${active === idx ? " services__tab--active" : ""}`}
          onClick={() => onSelect(idx)}
          style={active === idx ? { "--tab-color": SERVICE_COLOR } : {}}
        >
          <Icon className="services__tab-icon" />
          <span>{s.label}</span>
        </button>
      );
    })}
  </div>
));

ServiceTabs.displayName = "ServiceTabs";

const Services = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  const services = useMemo(
    () => t.services.items.map((item, idx) => ({ ...item, _idx: idx })),
    [t.services.items]
  );

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
          ? (prev + 1) % services.length
          : (prev - 1 + services.length) % services.length
      );
    }
    touchStartX.current = null;
  }, [services.length]);

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
    <section className="services" id="services" ref={ref} aria-label="Nos services de création web">
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
          <RevealText className="services__title">{t.services.title}</RevealText>
          <p className="services__subtitle">{t.services.subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ServiceTabs services={services} active={active} onSelect={handleSelect} />
        </motion.div>

        <motion.div
          className="services__carousel"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((service, idx) => {
            const position = getPosition(idx, active, services.length);
            return (
              <ServiceCard
                key={service.id}
                service={service}
                position={position}
                active={active}
                onClick={() => handleSelect(idx)}
                priceFrom={t.services.priceFrom}
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
          {services.map((s, idx) => (
            <button
              key={s.id}
              className={`services__dot${active === idx ? " services__dot--active" : ""}`}
              onClick={() => handleSelect(idx)}
              aria-label={s.label}
              style={active === idx ? { "--dot-color": SERVICE_COLOR } : {}}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Services);
