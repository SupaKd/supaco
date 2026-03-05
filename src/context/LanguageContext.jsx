import { createContext, useContext, useState, useCallback } from "react";

const LanguageContext = createContext(null);

export const translations = {
  fr: {
    // Navbar
    nav: {
      services: "Services",
      projects: "Projets",
      contact: "Contact",
      startProject: "Démarrer un projet",
      lightMode: "Mode clair",
      darkMode: "Mode sombre",
    },
    // Hero
    hero: {
      swapWords: ["sites web", "boutiques en ligne", "applications web"],
      badges: {
        response: "Réponse < 24h",
        delivery: "Livraison rapide",
        satisfaction: "100% de satisfaction",
      },
      role: "Développeur web freelance",
      subtitle:
        "J'accompagne les PME et les indépendants du Pays de Gex dans la création de sites web sur-mesure, pensés pour générer des résultats concrets. Mon approche est stratégique : Comprendre votre activité, vos enjeux et vos objectifs pour concevoir un site qui attire, rassure et",
      subtitleHighlight: "convertit vos prospects en clients.",
      bio: "Un site internet renforce votre crédibilité et crée un canal d'acquisition disponible 24h/24. Si vos prospects ne vous trouvent pas en ligne,",
      bioHighlight: "ils choisissent vos concurrents.",
      cta: "Lancer mon projet",
      secondary: "Voir mes réalisations",
      titlePrefix: "Je crée vos",
    },
    // Services
    services: {
      title: "Ce que je propose",
      subtitle:
        "Des solutions web adaptées à vos besoins et à votre budget, livrées rapidement avec un accompagnement personnalisé.",
      priceFrom: "À partir de",
      deliveryLabel: "Livraison moyenne",
      items: [
        {
          id: "vitrine",
          label: "Site Vitrine",
          title: "Site Vitrine",
          description:
            "Je conçois votre site de A à Z pour refléter votre image et convaincre vos visiteurs de vous contacter.",
          features: [
            "Identité visuelle unique",
            "Responsive mobile",
            "Optimisation SEO",
            "Intégration réseaux sociaux",
          ],
          price: "1 490€",
          stat: { value: "5j", label: "Livraison moyenne" },
        },
        {
          id: "ecommerce",
          label: "E-Commerce",
          title: "E-Commerce",
          description:
            "Je construis votre boutique en ligne pour que vos clients achètent facilement — même pendant que vous dormez.",
          features: [
            "Catalogue produits",
            "Paiement sécurisé",
            "Gestion des stocks",
            "Suivi commandes",
          ],
          price: "2 500€",
          stat: { value: "14j", label: "Livraison moyenne" },
        },
        {
          id: "app",
          label: "App Web",
          title: "Application Web",
          description:
            "Quand un outil standard ne suffit plus, je développe exactement ce dont vous avez besoin — rien de plus, rien de moins.",
          features: [
            "CRM / ERP",
            "Portail professionnel",
            "Interface clients",
            "Dashboard admin",
          ],
          price: "Sur devis",
          stat: { value: "30j", label: "Livraison moyenne" },
        },
      ],
    },
    // Projects
    projects: {
      label: "Portfolio",
      title: "Mes réalisations",
      subtitle:
        "Des projets livrés pour de vraies entreprises — du site vitrine à l'application web sur-mesure.",
      description:
        "Chaque réalisation est conçue avec une approche stratégique : comprendre votre activité, analyser vos objectifs et créer une expérience utilisateur claire et efficace. L'objectif n'est pas seulement d'avoir un beau site, mais un outil performant, rapide et optimisé pour transformer vos visiteurs en clients.",
      swipeHint: "Glissez pour voir plus",
      categoryLabels: {
        app: "Application Web",
        ecommerce: "E-Commerce",
        vitrine: "Site Vitrine",
      },
      items: [
        {
          id: 1,
          title: "Restaurant Sabai",
          description:
            "Application web complète de commande en ligne pour un restaurant de cuisine asiatique authentique à Thoiry",
          tags: ["Application Web", "Restaurant"],
        },
        {
          id: 7,
          title: "MB - Patrimoine & Finance",
          description:
            "Site vitrine professionnel pour une conseillère en investissements, avec présentation des services et prise de contact",
          tags: ["Site Vitrine", "Finance"],
        },
        {
          id: 2,
          title: "Bellifood",
          description:
            "Site vitrine avec menu digital pour un restaurant de tacos et burgers à Oyonnax",
          tags: ["Site Vitrine", "Restaurant"],
        },
        {
          id: 4,
          title: "Dépannage Gémeaux",
          description:
            "Site vitrine professionnel pour une entreprise de plomberie et chauffage avec formulaire de contact et présentation des services",
          tags: ["Site Vitrine", "Artisan"],
        },
        {
          id: 6,
          title: "Le Comptoir",
          description:
            "Site vitrine élégant pour un restaurant, avec présentation du menu et ambiance soignée",
          tags: ["Site Vitrine", "Restaurant"],
        },
        {
          id: 5,
          title: "Yojeme",
          description:
            "Site vitrine moderne et responsive avec design épuré et optimisation SEO",
          tags: ["Site Vitrine", "Services"],
        },
        {
          id: 3,
          title: "Optical Store",
          description:
            "Landing page moderne avec effet 3D pour une boutique de lunettes à Lyon",
          tags: ["Site Vitrine", "Lunettes"],
        },
      ],
    },
    // Testimonials
    testimonials: {
      label: "Témoignages",
      title: "Ce que disent nos clients",
      subtitle:
        "La satisfaction de nos clients est notre meilleure carte de visite.",
      contributor: "Contributeur local",
      googleLink: "Voir tous nos avis sur Google",
      prevAriaLabel: "Avis précédent",
      nextAriaLabel: "Avis suivant",
    },
    // Contact
    contact: {
      label: "Contact",
      title: "Parlons de votre projet",
      description:
        "Une idée ? Un projet ? Contactez-nous pour un devis gratuit et sans engagement. Réponse garantie sous 24 heures.",
      details: {
        email: "Email",
        location: "Localisation",
        locationValue: "Pays de Gex, France",
        response: "Réponse",
        responseValue: "Sous 24 heures",
      },
      followUs: "Suivez-nous !",
      tabs: {
        message: "Envoyer un message",
        appointment: "Rendez-vous",
      },
      form: {
        fullName: "Nom complet",
        namePlaceholder: "Jean Dupont",
        emailPlaceholder: "jean@exemple.com",
        phone: "Téléphone",
        phonePlaceholder: "+33 6 12 34 56 78",
        service: "Service",
        selectService: "Sélectionnez un service",
        vitrine: "Site Vitrine",
        ecommerce: "E-Commerce",
        app: "Application Web",
        other: "Autre projet",
        message: "Votre message",
        messagePlaceholder: "Décrivez votre projet, vos besoins...",
        submit: "Envoyer ma demande",
        sending: "Envoi en cours...",
      },
      success: {
        title: "Message envoyé !",
        text: "Merci pour votre message. Nous vous répondrons dans les 24 heures.",
        another: "Envoyer un autre message",
      },
      error: {
        title: "Erreur d'envoi",
        alternative: "Vous pouvez aussi nous contacter directement à",
        retry: "Réessayer",
        fallback:
          "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
      },
    },
    // Stats
    stats: {
      projects: "Projets livrés",
      clients: "Clients satisfaits",
      response: "Temps de réponse",
      delivery: "Livraison express",
    },
    // Footer
    footer: {
      tagline:
        "Votre partenaire pour une présence web professionnelle. Sites livrés en 5 jours, prix transparents, satisfaction garantie.",
      emailPlaceholder: "Votre email",
      subscribe: "S'abonner",
      servicesTitle: "Services",
      companyTitle: "Entreprise",
      legalTitle: "Légal",
      copyright: "Tous droits réservés.",
      links: {
        services: [
          { label: "Site Vitrine", href: "#services" },
          { label: "E-Commerce", href: "#services" },
          { label: "Application Web", href: "#services" },
          { label: "Maintenance", href: "#contact" },
        ],
        company: [
          { label: "À propos", href: "#" },
          { label: "Portfolio", href: "#projects" },
          { label: "Tarifs", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
    },
  },
  en: {
    // Navbar
    nav: {
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      startProject: "Start a project",
      lightMode: "Light mode",
      darkMode: "Dark mode",
    },
    // Hero
    hero: {
      swapWords: ["websites", "online stores", "web applications"],
      badges: {
        response: "Response < 24h",
        delivery: "Fast delivery",
        satisfaction: "100% satisfaction",
      },
      role: "Freelance web developer",
      subtitle:
        "I help SMEs and freelancers in the Pays de Gex area build custom websites designed to generate real results. My approach is strategic: understanding your business, challenges, and goals to design a site that attracts, reassures and",
      subtitleHighlight: "converts your prospects into clients.",
      bio: "A website strengthens your credibility and creates an acquisition channel available 24/7. If your prospects can't find you online,",
      bioHighlight: "they choose your competitors.",
      cta: "Launch my project",
      secondary: "See my work",
      titlePrefix: "I build your",
    },
    // Services
    services: {
      title: "What I offer",
      subtitle:
        "Web solutions tailored to your needs and budget, delivered quickly with personalised support.",
      priceFrom: "Starting from",
      deliveryLabel: "Average delivery",
      items: [
        {
          id: "vitrine",
          label: "Showcase Site",
          title: "Showcase Site",
          description:
            "I design your site from A to Z to reflect your brand and convince visitors to contact you.",
          features: [
            "Unique visual identity",
            "Mobile responsive",
            "SEO optimisation",
            "Social media integration",
          ],
          price: "€890",
          stat: { value: "5d", label: "Average delivery" },
        },
        {
          id: "ecommerce",
          label: "E-Commerce",
          title: "E-Commerce",
          description:
            "I build your online store so your customers can buy easily — even while you sleep.",
          features: [
            "Product catalogue",
            "Secure payment",
            "Stock management",
            "Order tracking",
          ],
          price: "€1,990",
          stat: { value: "14d", label: "Average delivery" },
        },
        {
          id: "app",
          label: "Web App",
          title: "Web Application",
          description:
            "When off-the-shelf tools aren't enough, I develop exactly what you need — nothing more, nothing less.",
          features: [
            "CRM / ERP",
            "Professional portal",
            "Client interface",
            "Admin dashboard",
          ],
          price: "On quote",
          stat: { value: "30d", label: "Average delivery" },
        },
      ],
    },
    // Projects
    projects: {
      label: "Portfolio",
      title: "My work",
      subtitle:
        "Projects delivered for real businesses — from showcase sites to custom web applications.",
      description:
        "Each project is built with a strategic approach: understanding your business, analysing your goals and creating a clear and effective user experience. The goal isn't just a beautiful site, but a high-performing, fast and optimised tool to turn your visitors into clients.",
      swipeHint: "Swipe to see more",
      categoryLabels: {
        app: "Web Application",
        ecommerce: "E-Commerce",
        vitrine: "Showcase Site",
      },
      items: [
        {
          id: 1,
          title: "Restaurant Sabai",
          description:
            "Complete online ordering web application for an authentic Asian restaurant in Thoiry",
          tags: ["Web Application", "Restaurant"],
        },
        {
          id: 7,
          title: "MB - Wealth & Finance",
          description:
            "Professional showcase site for an investment advisor, with service presentation and contact form",
          tags: ["Showcase Site", "Finance"],
        },
        {
          id: 2,
          title: "Bellifood",
          description:
            "Showcase site with digital menu for a tacos and burgers restaurant in Oyonnax",
          tags: ["Showcase Site", "Restaurant"],
        },
        {
          id: 4,
          title: "Gémeaux Repairs",
          description:
            "Professional showcase site for a plumbing and heating company with contact form and service presentation",
          tags: ["Showcase Site", "Craftsman"],
        },
        {
          id: 6,
          title: "Le Comptoir",
          description:
            "Elegant showcase site for a restaurant, with menu presentation and refined atmosphere",
          tags: ["Showcase Site", "Restaurant"],
        },
        {
          id: 5,
          title: "Yojeme",
          description:
            "Modern and responsive showcase site with clean design and SEO optimisation",
          tags: ["Showcase Site", "Services"],
        },
        {
          id: 3,
          title: "Optical Store",
          description:
            "Modern landing page with 3D effect for an eyewear boutique in Lyon",
          tags: ["Showcase Site", "Eyewear"],
        },
      ],
    },
    // Testimonials
    testimonials: {
      label: "Testimonials",
      title: "What our clients say",
      subtitle: "Our clients' satisfaction is our best business card.",
      contributor: "Local guide",
      googleLink: "See all our reviews on Google",
      prevAriaLabel: "Previous review",
      nextAriaLabel: "Next review",
    },
    // Contact
    contact: {
      label: "Contact",
      title: "Let's talk about your project",
      description:
        "An idea? A project? Contact us for a free, no-obligation quote. Reply guaranteed within 24 hours.",
      details: {
        email: "Email",
        location: "Location",
        locationValue: "Pays de Gex, France",
        response: "Response",
        responseValue: "Within 24 hours",
      },
      followUs: "Follow us!",
      tabs: {
        message: "Send a message",
        appointment: "Book a call",
      },
      form: {
        fullName: "Full name",
        namePlaceholder: "John Smith",
        emailPlaceholder: "john@example.com",
        phone: "Phone",
        phonePlaceholder: "+44 7700 900000",
        service: "Service",
        selectService: "Select a service",
        vitrine: "Showcase Site",
        ecommerce: "E-Commerce",
        app: "Web Application",
        other: "Other project",
        message: "Your message",
        messagePlaceholder: "Describe your project and needs...",
        submit: "Send my request",
        sending: "Sending...",
      },
      success: {
        title: "Message sent!",
        text: "Thank you for your message. We will reply within 24 hours.",
        another: "Send another message",
      },
      error: {
        title: "Sending error",
        alternative: "You can also contact us directly at",
        retry: "Try again",
        fallback: "An error occurred. Please try again or contact us directly.",
      },
    },
    // Stats
    stats: {
      projects: "Projects delivered",
      clients: "Satisfied clients",
      response: "Response time",
      delivery: "Express delivery",
    },
    // Footer
    footer: {
      tagline:
        "Your partner for a professional web presence. Sites delivered in 5 days, transparent pricing, satisfaction guaranteed.",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      servicesTitle: "Services",
      companyTitle: "Company",
      legalTitle: "Legal",
      copyright: "All rights reserved.",
      links: {
        services: [
          { label: "Showcase Site", href: "#services" },
          { label: "E-Commerce", href: "#services" },
          { label: "Web Application", href: "#services" },
          { label: "Maintenance", href: "#contact" },
        ],
        company: [
          { label: "About", href: "#" },
          { label: "Portfolio", href: "#projects" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
    },
  },
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "fr");

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
