import { useEffect, lazy, Suspense } from "react";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lazy load les composants below-the-fold
const Services = lazy(() => import("./components/Service"));
const Technologies = lazy(() => import("./components/Technologies"));
const Projects = lazy(() => import("./components/Projects"));
const Pricing = lazy(() => import("./components/Pricing"));
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
      background: "#0a0a0a",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "3px solid rgba(0, 212, 255, 0.2)",
        borderTopColor: "#00d4ff",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  </div>
);

function App() {
  useEffect(() => {
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
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Services />
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
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default App;
