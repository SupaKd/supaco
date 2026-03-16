import { lazy, Suspense } from "react";
import Blog from "../components/Blog";
import PageMeta from "../components/ui/PageMeta";

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

const BlogPage = () => (
  <main>
    <PageMeta
      title="Blog — Supaco Digital | Conseils web pour le Pays de Gex"
      description="Conseils SEO, tendances web et bonnes pratiques pour les entreprises du Pays de Gex et de Genève. Publié par Supaco Digital, agence web locale."
      canonical="https://supaco-digital.com/blog"
    />
    <Blog />
    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </main>
);

export default BlogPage;
