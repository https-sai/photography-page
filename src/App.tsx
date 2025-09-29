// React Router imports for navigation and routing functionality
import { Outlet } from "react-router-dom";

import SocialRail from "./components/SocialRail";
import Navbar from "./components/Navbar";

/**
 * Main App Component
 * Layout component that provides the overall structure for all pages
 * Includes header with navigation, main content area, and footer
 */
export default function App() {
  return (
    // Main container with full viewport height, flex column layout, and dark background
    <div className="min-h-dvh flex flex-col grid-background-container">
      <section className="relative">
        <SocialRail mode="color" />
      </section>

      {/** Navbar */}
      <Navbar />

      {/** Main Content Area -> Outlet renders current child route component */}
      <main className="flex-1 py-8 px-4 md:px-8">
        <Outlet />
      </main>

      {/** Footer */}
      <footer className="px-4 md:px-8 py-8 text-xs text-slate-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} https-sai</span>
      </footer>
    </div>
  );
}
