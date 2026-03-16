import { useEffect } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const useFocusTrap = (ref, active) => {
  useEffect(() => {
    if (!active || !ref.current) return;

    const el = ref.current;
    const focusable = Array.from(el.querySelectorAll(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Focus le premier élément à l'ouverture
    first?.focus();

    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) { e.preventDefault(); return; }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, [ref, active]);
};

export default useFocusTrap;
