import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Restaurant Sabai',
      description: 'Application web complète de commande en ligne pour un restaurant de cuisine asiatique authentique à Thoiry',
      image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&h=600&fit=crop',
      tags: ['Application Web', 'Restaurant'],
      category: 'app',
      featured: true,
      url: 'https://sabai-thoiry.com/',
    },
    {
      id: 2,
      title: 'Dépannage Gémeaux',
      description: 'Site vitrine professionnel pour une entreprise de plomberie et chauffage avec formulaire de contact et présentation des services',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop',
      tags: ['Site Vitrine', 'Artisan'],
      category: 'vitrine',
      url: 'https://depannage-gemeaux.fr/',
    },
    {
      id: 3,
      title: 'Yojeme',
      description: 'Site vitrine moderne et responsive avec design épuré et optimisation SEO',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['Site Vitrine', 'Services'],
      category: 'vitrine',
      url: 'https://www.yojeme.fr/',
    },
    {
      id: 4,
      title: 'Bellifood',
      description: 'Site vitrine avec menu digital pour un restaurant de tacos et burgers à Oyonnax',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
      tags: ['Site Vitrine', 'Restaurant'],
      category: 'vitrine',
      url: 'https://bellifood.com/',
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

  const handleProjectClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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
              onClick={() => handleProjectClick(project.url)}
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