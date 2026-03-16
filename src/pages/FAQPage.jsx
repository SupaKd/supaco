import { lazy, Suspense } from "react";
import FAQ from "../components/FAQ";
import PageMeta from "../components/ui/PageMeta";

const Technologies = lazy(() => import("../components/Technologies"));
const Responsive = lazy(() => import("../components/Responsive"));
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

const FAQPage = () => (
  <main>
    <PageMeta
      title="FAQ — Supaco Digital | Questions fréquentes sur la création web"
      description="Toutes les réponses à vos questions sur la création de site web, les délais, les tarifs et les technologies utilisées par Supaco Digital dans le Pays de Gex."
      canonical="https://supaco-digital.com/faq"
    />
    <FAQ />
    <Suspense fallback={<SectionLoader />}>
      <Technologies />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </main>
);

export default FAQPage;
