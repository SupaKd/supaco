import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ReadingProgress from "./components/ui/ReadingProgress";
import LegalModalsProvider from "./components/LegalModals";
import { LanguageProvider } from "./context/LanguageContext";

// Lazy load tous les composants below-the-fold
const AnnouncementBanner = lazy(() => import("./components/AnnouncementBanner"));
const Services = lazy(() => import("./components/Service"));
const Projects = lazy(() => import("./components/Projects"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Stats = lazy(() => import("./components/Stats"));
const Contact = lazy(() => import("./components/Contact"));
const Responsive = lazy(() => import("./components/Responsive"));
const Footer = lazy(() => import("./components/Footer"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const BackToTop = lazy(() => import("./components/ui/BackToTop"));

// Loading fallback minimaliste
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

function App() {
  useEffect(() => {
    // Initialiser le thème depuis localStorage
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme || "dark";
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light"
    );
  }, []);

  return (
    <LanguageProvider>
    <LegalModalsProvider>
      <Suspense fallback={null}>
        <AnnouncementBanner />
      </Suspense>
      <Navbar />
      <main>
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
          <Responsive />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </main>
      <ReadingProgress />
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </LegalModalsProvider>
    </LanguageProvider>
  );
}

export default App;
