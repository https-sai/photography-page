import * as React from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionOverlay() {
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Start the transition
    setIsVisible(true);

    // After a brief delay, hide the overlay to reveal the new page
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Scroll to top when transition completes
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] bg-black"
          initial={{ opacity: 1 }}
          //animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "linear",
          }}
        />
      )}
    </AnimatePresence>
  );
}
