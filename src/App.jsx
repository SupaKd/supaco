import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import ReadingProgress from "./components/ui/ReadingProgress";
import ScrollToTop from "./components/ui/ScrollToTop";
import PageTransition from "./components/ui/PageTransition";
import LegalModalsProvider from "./components/LegalModals";
import { LanguageProvider } from "./context/LanguageContext";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";

const AnnouncementBanner = lazy(() =>
  import("./components/AnnouncementBanner")
);
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const BackToTop = lazy(() => import("./components/ui/BackToTop"));

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme || "light";
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light"
    );
  }, []);

  return (
    <HelmetProvider>
    <BrowserRouter>
      <LanguageProvider>
        <LegalModalsProvider>
          <Suspense fallback={null}>
            <AnnouncementBanner />
          </Suspense>
          <Navbar />
          <ScrollToTop />
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projets" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </PageTransition>
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
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
