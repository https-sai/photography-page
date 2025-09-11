import { PropsWithChildren, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function FadeLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const prefersReduce = useReducedMotion();

  // Skip animation on the very first paint
  const first = useRef(true);
  const initial = first.current ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 };
  if (first.current) first.current = false;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname} // remount on each route
        initial={prefersReduce ? false : initial}
        animate={prefersReduce ? {} : { opacity: 1, y: 0 }}
        exit={prefersReduce ? {} : { opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
