import { useState, useEffect, useRef } from 'react';

const TRAIL_LENGTH = 12;

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const dotRef = useRef(null);
  const trailRefs = useRef([]);
  const rafRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const trail = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })));

  useEffect(() => {
    const updateCursor = () => {
      const { x, y } = mousePos.current;

      // Met à jour le dot principal
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Décale la traîne : chaque point suit le précédent avec inertie
      const t = trail.current;
      t.unshift({ x, y });
      t.length = TRAIL_LENGTH;

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = t[i] ?? t[t.length - 1];
        const scale = 1 - i / TRAIL_LENGTH;
        const opacity = (1 - i / TRAIL_LENGTH) * 0.6;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = opacity;
      });

      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setIsHovering(true);
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setIsHovering(false);
    };

    rafRef.current = requestAnimationFrame(updateCursor);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const cursorClasses = [
    'cursor',
    isHovering && 'cursor--hover',
    isClicking && 'cursor--clicking',
  ].filter(Boolean).join(' ');

  return (
    <div className={cursorClasses}>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="cursor__trail"
          style={{ zIndex: TRAIL_LENGTH - i }}
        />
      ))}
      <div ref={dotRef} className="cursor__dot" />
    </div>
  );
};

export default Cursor;
