import { useRef, memo, useMemo, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineRocketLaunch,
  HiOutlineFaceSmile,
  HiOutlineClock,
  HiOutlineBolt,
} from "react-icons/hi2";
import { useLanguage } from "../context/LanguageContext";

const useScrambleCount = (target, isInView, duration = 2000) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const scrambleDuration = duration * 0.45;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const settled = Math.round(eased * target);

      if (elapsed < scrambleDuration) {
        setDisplay(Math.floor(Math.random() * (target + 1)));
      } else {
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
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = useMemo(
    () => [
      { icon: <HiOutlineRocketLaunch size={28} />, value: 9, suffix: "+", prefix: "", label: t.stats.projects },
      { icon: <HiOutlineFaceSmile size={28} />, value: 100, suffix: "%", prefix: "", label: t.stats.clients },
      { icon: <HiOutlineClock size={28} />, value: 24, suffix: "h", prefix: "<", label: t.stats.response },
      { icon: <HiOutlineBolt size={28} />, value: 5, suffix: "j", prefix: "", label: t.stats.delivery },
    ],
    [t.stats]
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
        transition: { duration: 0.28, ease: "easeOut" },
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
          <StatItem key={stat.label} stat={stat} isInView={isInView} variants={itemVariants} />
        ))}
      </motion.div>
    </section>
  );
};

export default memo(Stats);
