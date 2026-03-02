import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Surlignage animé qui s'étire sous le texte au scroll.
 * Usage : <HighlightText>convertit vos prospects en clients</HighlightText>
 */
const HighlightText = memo(({ children, color = "var(--color-accent-primary)", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref} style={{ position: "relative", display: "inline", isolation: "isolate" }}>
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-0.1em",
          left: "-0.1em",
          width: "calc(100% + 0.2em)",
          height: "1.1em",
          borderRadius: "3px",
          background: color,
          opacity: 0.3,
          zIndex: -1,
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      />
      {children}
    </span>
  );
});

HighlightText.displayName = "HighlightText";

export default HighlightText;
