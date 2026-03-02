import { useRef, memo, useMemo, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineRocketLaunch,
  HiOutlineFaceSmile,
  HiOutlineClock,
  HiOutlineBolt,
} from "react-icons/hi2";

const useScrambleCount = (target, isInView, duration = 2000) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    // Phase scramble : 40% du temps ; phase settle : 60%
    const scrambleDuration = duration * 0.45;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const settled = Math.round(eased * target);

      if (elapsed < scrambleDuration) {
        // Chiffre aléatoire dans la plage [0, target]
        setDisplay(Math.floor(Math.random() * (target + 1)));
      } else {
        // Converge vers la valeur finale avec un léger bruit qui diminue
        const noise = Math.round((1 - progress) * target * 0.3);
        const jitter = Math.random() < 0.5 ? noise : -noise;
        setDisplay(Math.max(0, Math.min(target, settled + (progress < 0.9 ? jitter : 0))));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return display;
};

const StatItem = memo(({ stat, isInView, variants }) => {
  const count = useScrambleCount(stat.value, isInView);

  return (
    <motion.div className="stats__item" variants={variants}>
      <div className="stats__item-icon">{stat.icon}</div>
      <div className="stats__item-value">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div className="stats__item-label">{stat.label}</div>
    </motion.div>
  );
});

StatItem.displayName = "StatItem";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = useMemo(
    () => [
      {
        icon: <HiOutlineRocketLaunch size={28} />,
        value: 9,
        suffix: "+",
        prefix: "",
        label: "Projets livrés",
      },
      {
        icon: <HiOutlineFaceSmile size={28} />,
        value: 100,
        suffix: "%",
        prefix: "",
        label: "Clients satisfaits",
      },
      {
        icon: <HiOutlineClock size={28} />,
        value: 24,
        suffix: "h",
        prefix: "<",
        label: "Temps de réponse",
      },
      {
        icon: <HiOutlineBolt size={28} />,
        value: 5,
        suffix: "j",
        prefix: "",
        label: "Livraison express",
      },
    ],
    []
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.28,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  return (
    <section className="stats" ref={ref}>
      <motion.div
        className="stats__container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat) => (
          <StatItem
            key={stat.label}
            stat={stat}
            isInView={isInView}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default memo(Stats);
