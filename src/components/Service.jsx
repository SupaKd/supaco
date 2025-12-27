import { memo, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineGlobeAlt, HiOutlineShoppingCart, HiOutlineLightningBolt } from 'react-icons/hi';

const ServiceCard = memo(({ service, variants }) => (
  <motion.div
    className="services__card"
    variants={variants}
    whileHover={{ y: -8 }}
  >
    <div className="services__card-icon">{service.icon}</div>
    <h3 className="services__card-title">{service.title}</h3>
    <p className="services__card-description">{service.description}</p>
    <ul className="services__card-features">
      {service.features.map((feature) => (
        <li key={feature} className="services__card-feature">
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
));

ServiceCard.displayName = 'ServiceCard';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = useMemo(() => [
    {
      icon: <HiOutlineGlobeAlt />,
      title: 'Site Vitrine',
      description: 'Un site web professionnel qui présente votre activité et convertit vos visiteurs en clients.',
      features: ['Design sur-mesure', 'Responsive mobile', 'Optimisation SEO', 'Formulaire de contact'],
    },
    {
      icon: <HiOutlineShoppingCart />,
      title: 'E-Commerce',
      description: 'Vendez vos produits en ligne avec une boutique moderne et sécurisée.',
      features: ['Catalogue produits', 'Paiement sécurisé', 'Gestion des stocks', 'Suivi commandes'],
    },
    {
      icon: <HiOutlineLightningBolt />,
      title: 'Application Web',
      description: 'Des applications sur-mesure pour digitaliser et automatiser votre activité.',
      features: ['Développement React', 'Base de données', 'API sur-mesure', 'Dashboard admin'],
    },
  ], []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }), []);

  return (
    <section className="services" id="services" ref={ref}>
      <div className="services__container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="services__label">Services</span>
          <h2 className="services__title">Ce que nous proposons</h2>
          <p className="services__subtitle">
            Des solutions web adaptées à vos besoins et à votre budget,
            livrées rapidement et avec un accompagnement personnalisé.
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Services);