import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Atom, 
  Server, 
  Database, 
  Zap, 
  Palette, 
  CreditCard,
  Rocket,
  Shield,
  Smartphone
} from 'lucide-react';

const Technologies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const technologies = [
    {
      name: 'React',
      Icon: Atom,
      description: 'Interfaces modernes et réactives',
      color: '#61DAFB',
    },
    {
      name: 'Node.js',
      Icon: Server,
      description: 'Backend performant et scalable',
      color: '#339933',
    },
    {
      name: 'MySQL',
      Icon: Database,
      description: 'Base de données robuste',
      color: '#4479A1',
    },
    {
      name: 'Vite',
      Icon: Zap,
      description: 'Build ultra-rapide',
      color: '#646CFF',
    },
    {
      name: 'SCSS',
      Icon: Palette,
      description: 'Styles maintenables',
      color: '#CC6699',
    },
    {
      name: 'Stripe',
      Icon: CreditCard,
      description: 'Paiements sécurisés',
      color: '#635BFF',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="technologies" id="technologies" ref={ref}>
      <div className="technologies__container">
        <motion.div
          className="technologies__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          <span className="technologies__label">Stack Technique</span>
          <h2 className="technologies__title">Technologies utilisées</h2>
          <p className="technologies__subtitle">
            Nous utilisons les technologies les plus modernes et performantes
            pour créer des sites web rapides, sécurisés et évolutifs.
          </p>
        </motion.div>

        <motion.div
          className="technologies__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              className="technologies__card"
              variants={itemVariants}
              style={{ '--tech-color': tech.color }}
            >
              <div className="technologies__card-icon">
                <tech.Icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="technologies__card-name">{tech.name}</h3>
              <p className="technologies__card-description">{tech.description}</p>
              <div className="technologies__card-glow" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="technologies__banner"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="technologies__banner-content">
            <span className="technologies__banner-icon">
              <Rocket size={28} />
            </span>
            <div className="technologies__banner-text">
              <strong>Performance garantie</strong>
              <span>Score Lighthouse 90+ sur tous nos sites</span>
            </div>
          </div>
          <div className="technologies__banner-content">
            <span className="technologies__banner-icon">
              <Shield size={28} />
            </span>
            <div className="technologies__banner-text">
              <strong>Sécurité maximale</strong>
              <span>HTTPS, protection DDoS, sauvegardes</span>
            </div>
          </div>
          <div className="technologies__banner-content">
            <span className="technologies__banner-icon">
              <Smartphone size={28} />
            </span>
            <div className="technologies__banner-text">
              <strong>100% Responsive</strong>
              <span>Parfait sur mobile, tablette et desktop</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;