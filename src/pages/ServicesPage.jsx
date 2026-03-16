import { lazy, Suspense } from "react";
import ServicesSplit from "../components/ServicesSplit";
import PageMeta from "../components/ui/PageMeta";

const Services = lazy(() => import("../components/Service"));
const Footer = lazy(() => import("../components/Footer"));

const SectionLoader = () => (
  <div
    style={{
      minHeight: "50vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-bg-primary)",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "3px solid var(--glass-border)",
        borderTopColor: "var(--color-accent-primary)",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  </div>
);

const ServicesPage = () => (
  <main>
    <PageMeta
      title="Nos Services — Supaco Digital | Pays de Gex & Genève"
      description="Site vitrine, boutique e-commerce ou application sur mesure : découvrez nos offres web adaptées aux entreprises du Pays de Gex et de la région genevoise."
      canonical="https://supaco-digital.com/services"
    />
    <ServicesSplit />
    <Suspense fallback={<SectionLoader />}>
      <Services />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </main>
);

export default ServicesPage;
