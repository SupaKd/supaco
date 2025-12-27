import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Restaurant Le Gourmet',
      description: 'Site vitrine avec réservation en ligne pour un restaurant gastronomique',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      tags: ['Site Vitrine', 'Restaurant'],
      category: 'vitrine',
      featured: true,
    },
    {
      id: 2,
      title: 'Boutique Mode Éthique',
      description: 'E-commerce complet pour une marque de vêtements durables',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      tags: ['E-Commerce', 'Mode'],
      category: 'ecommerce',
    },
    {
      id: 3,
      title: 'Cabinet Médical',
      description: 'Plateforme de prise de rendez-vous pour un cabinet de médecins',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop',
      tags: ['Application', 'Santé'],
      category: 'app',
    },
    {
      id: 4,
      title: 'Agence Immobilière',
      description: 'Site avec catalogue de biens et formulaires de contact avancés',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      tags: ['Site Vitrine', 'Immobilier'],
      category: 'vitrine',
    },
  ];

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'vitrine', label: 'Sites Vitrine' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'app', label: 'Applications' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects__container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="projects__header-content">
            <span className="projects__label">Portfolio</span>
            <h2 className="projects__title">Nos réalisations</h2>
          </div>

          <motion.div
            className="projects__filter"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`projects__filter-btn ${activeFilter === filter.id ? 'projects__filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              className={`projects__card ${project.featured ? 'projects__featured' : ''}`}
              variants={cardVariants}
              layout
              data-cursor-hover
            >
              <img
                src={project.image}
                alt={project.title}
                className="projects__card-image"
              />
              <div className="projects__card-content">
                <div className="projects__card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="projects__card-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__card-description">{project.description}</p>
              </div>
              <motion.div
                className="projects__card-arrow"
                whileHover={{ scale: 1.1 }}
              >
                ↗
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;