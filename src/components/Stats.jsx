import { useRef, memo, useMemo, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineRocketLaunch,
  HiOutlineFaceSmile,
  HiOutlineClock,
  HiOutlineBolt,
} from "react-icons/hi2";

const useCountUp = (target, isInView, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return count;
};

const StatItem = memo(({ stat, isInView, variants }) => {
  const count = useCountUp(stat.value, isInView);

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
        value: 15,
        suffix: "+",
        prefix: "",
        label: "Projets livrés",
      },
      {
        icon: <HiOutlineFaceSmile size={28} />,
        value: 98,
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
        value: 72,
        suffix: "h",
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
