import { useEffect } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Service';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for better browser support
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add cursor style for body
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;