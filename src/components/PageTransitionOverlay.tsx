import * as React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageTransitionOverlay() {
  const location = useLocation();
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    setKey((k) => k + 1);
  }, [location.pathname]);

  return (
    <motion.div
      key={key}
      className="pointer-events-none fixed inset-0 z-[60] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" }}
    />
  );
}
