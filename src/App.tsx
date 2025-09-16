// React Router imports for navigation and routing functionality
import { Outlet, NavLink, useLocation } from "react-router-dom";
import FadeLayout from "./components/FadeLayout";
import SocialRail from "./components/SocialRail";

/**
 * Bracket Component
 * Renders the opening bracket "[" for active navigation items
 * @param active - Boolean indicating if the nav item is currently active
 */
function Bracket({ active }: { active?: boolean }) {
  return <span className="tabular-nums">{active ? "[" : ""}</span>;
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      // Dynamic className that changes based on active state
      className={({ isActive }) => {
        // Check if this is Narrative nav and we're on index route
        const isNarrativeOnIndex =
          to === "/app/narrative" && location.pathname === "/app";
        const isActiveOrNarrativeIndex = isActive || isNarrativeOnIndex;

        return `tracking-wider uppercase text-sm md:text-base px-2 transition no-underline hover:no-underline ${
          isActiveOrNarrativeIndex
            ? "text-fg"
            : "text-slate-400 hover:text-slate-300"
        }`;
      }}
    >
      {/* Render bracket + text + closing bracket for active items */}
      {({ isActive }) => {
        // Check if this is Narrative nav and we're on index route
        const isNarrativeOnIndex =
          to === "/app/narrative" && location.pathname === "/app";
        const isActiveOrNarrativeIndex = isActive || isNarrativeOnIndex;

        return (
          <span>
            <Bracket active={isActiveOrNarrativeIndex} />
            {children}
            {isActiveOrNarrativeIndex ? "]" : ""}
          </span>
        );
      }}
    </NavLink>
  );
}

/**
 * Main App Component
 * Layout component that provides the overall structure for all pages
 * Includes header with navigation, main content area, and footer
 */
export default function App() {
  // Get current location for potential future use (currently unused)
  const location = useLocation();

  return (
    // Main container with full viewport height, flex column layout, and dark background
    <div className="min-h-dvh flex flex-col bg-slate-950">
      <section className="relative">
        <SocialRail mode="mono" />
        {/* your narrative content here */}
      </section>

      {/** Navbar */}
      <header className="py-6 px-4 md:px-8 flex items-center justify-between">
        <a href="/app" className="font-semibold tracking-wider uppercase">
          ANON
        </a>
        <nav className="flex gap-3 md:gap-6 items-center">
          <NavItem to="/app/narrative">Narrative</NavItem>
          <NavItem to="/app/videography">Videography</NavItem>
          <NavItem to="/app/photography">Photography</NavItem>
          <NavItem to="/app/contact">Contact</NavItem>
        </nav>
      </header>

      {/** Main Content Area -> Outlet renders current child route component */}
      <main className="flex-1 py-8 px-4 md:px-8">
        <FadeLayout>
          <Outlet />
        </FadeLayout>
      </main>

      {/** Footer */}
      <footer className="px-4 md:px-8 py-8 text-xs text-slate-400 flex items-center justify-between border-t border-white/10">
        <span>© {new Date().getFullYear()} https-sai</span>
      </footer>
    </div>
  );
}
