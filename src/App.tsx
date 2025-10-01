// React Router imports for navigation and routing functionality
import { Outlet } from "react-router-dom";

import SocialRail from "./components/SocialRail";
import AnimatedNavbar from "./components/AnimatedNavbar";
import PageTransitionOverlay from "./components/PageTransitionOverlay";

import { useScroll, motion } from "framer-motion";
import React from "react";
import { fadeJump } from "./pages/Contact";

/**
 * Main App Component
 * Layout component that provides the overall structure for all pages
 * Includes header with navigation, main content area, and footer
 */
export default function App() {
  const root = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });
  return (
    // Main container with full viewport height, flex column layout, and dark background
    <div className="min-h-dvh flex flex-col grid-background-container">
      <PageTransitionOverlay />
      <motion.div
        className="fixed left-0 top-0 h-1 w-full origin-left bg-white/60 z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <section className="relative">
        <SocialRail />
      </section>

      {/** Navbar */}
      <section className="relative">
        <AnimatedNavbar />
      </section>

      {/** Main Content Area -> Outlet renders current child route component */}
      <main className="flex-1 py-2 px-4 md:px-8">
        <Outlet />
      </main>

      {/** Footer */}
      <footer className="px-4 md:px-8 py-8 text-xs text-slate-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} https-sai</span>
      </footer>
    </div>
  );
}
