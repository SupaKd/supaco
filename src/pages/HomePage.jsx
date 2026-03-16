import { lazy, Suspense } from "react";
import Hero from "../components/Hero";
import PageMeta from "../components/ui/PageMeta";

const Services = lazy(() => import("../components/Service"));
const Projects = lazy(() => import("../components/Projects"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Stats = lazy(() => import("../components/Stats"));
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

const HomePage = () => (
  <main>
    <PageMeta
      title="Supaco Digital — Agence Web Pays de Gex & Genève"
      description="Création de sites web professionnels dans le Pays de Gex et à Genève. Sites vitrines, e-commerce et applications sur mesure. Devis gratuit en 24h."
      canonical="https://supaco-digital.com/"
    />
    <Hero />
    <Suspense fallback={<SectionLoader />}>
      <Services />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Projects />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Testimonials />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Contact />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Stats />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </main>
);

export default HomePage;
