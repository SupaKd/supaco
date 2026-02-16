import { useEffect, lazy, Suspense } from "react";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";
import LegalModalsProvider from "./components/LegalModals";

// Lazy load les composants below-the-fold
const Services = lazy(() => import("./components/Service"));
const Technologies = lazy(() => import("./components/Technologies"));
const Projects = lazy(() => import("./components/Projects"));
const Stats = lazy(() => import("./components/Stats"));
const Pricing = lazy(() => import("./components/Pricing"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
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

    // Smooth scroll
    document.documentElement.style.scrollBehavior = "smooth";

    // Hide cursor only on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      document.body.style.cursor = "none";
    }

    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <LegalModalsProvider>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Stats />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Technologies />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </main>
      <CookieConsent />
      <WhatsAppButton />
    </LegalModalsProvider>
  );
}

export default App;
