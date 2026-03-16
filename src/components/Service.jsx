import { memo, useRef, useMemo, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import RevealText from "./ui/RevealText";
import {
  HiOutlineGlobeAlt,
  HiOutlineShoppingCart,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiCheck,
  HiMinus,
  HiArrowRight,
} from "react-icons/hi";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ICONS = [
  HiOutlineGlobeAlt,
  HiOutlineShoppingCart,
  HiOutlineLightningBolt,
];
const SERVICE_COLOR = "var(--color-accent-primary)";

const COMPARE_ROWS = [
  {
    labelFr: "Design personnalisé",
    labelEn: "Custom design",
    vitrine: true,
    ecommerce: true,
    app: true,
  },
  {
    labelFr: "Responsive mobile",
    labelEn: "Mobile responsive",
    vitrine: true,
    ecommerce: true,
    app: true,
  },
  {
    labelFr: "Optimisation SEO",
    labelEn: "SEO optimisation",
    vitrine: true,
    ecommerce: true,
    app: true,
  },
  {
    labelFr: "Formulaire de contact",
    labelEn: "Contact form",
    vitrine: true,
    ecommerce: true,
    app: true,
  },
  {
    labelFr: "Boutique en ligne",
    labelEn: "Online store",
    vitrine: false,
    ecommerce: true,
    app: true,
  },
  {
    labelFr: "Paiement sécurisé",
    labelEn: "Secure payment",
    vitrine: false,
    ecommerce: true,
    app: true,
  },
  {
    labelFr: "Gestion des stocks",
    labelEn: "Stock management",
    vitrine: false,
    ecommerce: true,
    app: true,
  },
  {
    labelFr: "Interface d'admin",
    labelEn: "Admin dashboard",
    vitrine: false,
    ecommerce: false,
    app: true,
  },
  {
    labelFr: "Logique métier sur mesure",
    labelEn: "Custom business logic",
    vitrine: false,
    ecommerce: false,
    app: true,
  },
  {
    labelFr: "Intégrations API tierces",
    labelEn: "Third-party API integrations",
    vitrine: false,
    ecommerce: false,
    app: true,
  },
];

const CompareTable = memo(({ lang, items }) => {
  const cols = ["vitrine", "ecommerce", "app"];
  return (
    <div className="services__compare">
      <table className="services__compare-table" role="table">
        <thead>
          <tr>
            <th className="services__compare-th services__compare-th--feature" />
            {items.map((s) => (
              <th key={s.id} className="services__compare-th">
                <span className="services__compare-th-label">{s.label}</span>
                <span className="services__compare-th-price">{s.price}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row) => (
            <tr key={row.labelFr} className="services__compare-row">
              <td className="services__compare-feature">
                {lang === "fr" ? row.labelFr : row.labelEn}
              </td>
              {cols.map((col) => (
                <td key={col} className="services__compare-cell">
                  {row[col] ? (
                    <HiCheck className="services__compare-check" />
                  ) : (
                    <HiMinus className="services__compare-minus" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
CompareTable.displayName = "CompareTable";

const Services = () => {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [showCompare, setShowCompare] = useState(false);

  const services = useMemo(
    () => t.services.items.map((item, idx) => ({ ...item, _idx: idx })),
    [t.services.items]
  );

  const handleSelect = useCallback((idx) => setActive(idx), []);

  const scrollToContact = useCallback(() => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const service = services[active];
  const Icon = SERVICE_ICONS[active];

  return (
    <section
      className="services"
      id="services"
      ref={ref}
      aria-label="Nos services de création web"
    >
      <div className="services__bg" aria-hidden="true">
        <div className="services__bg-orb services__bg-orb--1" />
        <div className="services__bg-orb services__bg-orb--2" />
      </div>

      {/* Zone 100vh — layout split */}
      <div className="services__split">
        {/* Gauche */}
        <motion.div
          className="services__left"
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <RevealText className="services__title">
            {t.services.title}
          </RevealText>
          <p className="services__subtitle">{t.services.subtitle}</p>

          <nav className="services__nav" aria-label="Choisir un service">
            {services.map((s, idx) => {
              const NavIcon = SERVICE_ICONS[idx];
              return (
                <button
                  key={s.id}
                  className={`services__nav-item${
                    active === idx ? " services__nav-item--active" : ""
                  }`}
                  onClick={() => handleSelect(idx)}
                  aria-current={active === idx ? "true" : undefined}
                >
                  <span className="services__nav-icon">
                    <NavIcon />
                  </span>
                  <span className="services__nav-text">
                    <span className="services__nav-label">{s.label}</span>
                    <span className="services__nav-desc">
                      {s.description.split(".")[0]}.
                    </span>
                  </span>
                  <HiArrowRight className="services__nav-arrow" />
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Droite — card active */}
        <div className="services__right">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="services__card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div
                className="services__card-topline"
                style={{
                  background: `linear-gradient(90deg, ${SERVICE_COLOR}, transparent)`,
                }}
              />

              <div className="services__card-header">
                <div
                  className="services__card-icon"
                  style={{ color: SERVICE_COLOR }}
                >
                  <Icon />
                </div>
                <div>
                  <h3 className="services__card-title">{service.title}</h3>
                  <p className="services__card-description">
                    {service.description}
                  </p>
                </div>
              </div>

              <ul className="services__card-features">
                {service.features.map((f) => (
                  <li key={f} className="services__card-feature">
                    <HiOutlineCheckCircle className="services__card-feature-icon" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="services__card-footer">
                <div className="services__card-pricing">
                  <span className="services__card-price-from">
                    {t.services.priceFrom}
                  </span>
                  <span
                    className="services__card-price-value"
                    style={{ color: SERVICE_COLOR }}
                  >
                    {service.price}
                  </span>
                </div>
                <div className="services__card-stat">
                  <span
                    className="services__card-stat-value"
                    style={{ color: SERVICE_COLOR }}
                  >
                    {service.stat.value}
                  </span>
                  <span className="services__card-stat-label">
                    {service.stat.label}
                  </span>
                </div>
              </div>

              <button className="services__card-cta" onClick={scrollToContact}>
                {lang === "fr" ? "Demander un devis" : "Get a quote"}
                <HiArrowRight />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tableau comparatif — hors 100vh */}
      <div className="services__container">
        <motion.div
          className="services__compare-toggle-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <button
            className="services__compare-toggle"
            onClick={() => setShowCompare((v) => !v)}
            aria-expanded={showCompare}
          >
            {showCompare
              ? lang === "fr"
                ? "Masquer la comparaison"
                : "Hide comparison"
              : lang === "fr"
              ? "Comparer les offres"
              : "Compare plans"}
            <span
              className={`services__compare-toggle-arrow${
                showCompare ? " services__compare-toggle-arrow--up" : ""
              }`}
            >
              ▾
            </span>
          </button>

          <AnimatePresence>
            {showCompare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <CompareTable lang={lang} items={services} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Services);
