import { lazy, Suspense } from "react";
import PageMeta from "../components/ui/PageMeta";

const Contact = lazy(() => import("../components/Contact"));
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

const ContactPage = () => (
  <main>
    <PageMeta
      title="Contactez-nous — Supaco Digital | Devis Gratuit"
      description="Demandez un devis gratuit pour votre projet web. Nous répondons sous 24h. Basés dans le Pays de Gex, nous travaillons avec des clients en France et en Suisse."
      canonical="https://supaco-digital.com/contact"
    />
    <Suspense fallback={<SectionLoader />}>
      <Contact />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </main>
);

export default ContactPage;
