import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import AnnouncementBanner from "./components/AnnouncementBanner";
import Hero from "./components/Hero";
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/ui/BackToTop";
import LegalModalsProvider from "./components/LegalModals";
import Testimonials from "./components/Testimonials";

// Lazy load les composants below-the-fold
const Services = lazy(() => import("./components/Service"));
const Projects = lazy(() => import("./components/Projects"));
const Stats = lazy(() => import("./components/Stats"));
const Contact = lazy(() => import("./components/Contact"));
const Responsive = lazy(() => import("./components/Responsive"));
const Footer = lazy(() => import("./components/Footer"));

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
    <LegalModalsProvider>
      <AnnouncementBanner />
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
          <Footer />
        </Suspense>
      </main>
      <CookieConsent />
      <BackToTop />
      <WhatsAppButton />
    </LegalModalsProvider>
  );
}

export default App;
