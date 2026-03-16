import { lazy, Suspense } from "react";
import PageMeta from "../components/ui/PageMeta";

const Projects = lazy(() => import("../components/Projects"));
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

const ProjectsPage = () => (
  <main>
    <PageMeta
      title="Nos Projets — Supaco Digital | Agence Web Pays de Gex"
      description="Découvrez les réalisations de Supaco Digital : sites vitrines, boutiques en ligne et applications web créés pour des clients du Pays de Gex et de Genève."
      canonical="https://supaco-digital.com/projets"
    />
    <Suspense fallback={<SectionLoader />}>
      <Projects />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </main>
);

export default ProjectsPage;
