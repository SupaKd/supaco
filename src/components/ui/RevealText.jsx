import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Révèle le texte mot par mot avec un clip-path qui s'ouvre vers le haut.
 * Usage : <RevealText as="h2" className="...">Mon titre</RevealText>
 */
const RevealText = memo(({ children, as: Tag = "h2", className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const words = typeof children === "string" ? children.split(" ") : [children];

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.25em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.07,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
});

RevealText.displayName = "RevealText";

export default RevealText;
