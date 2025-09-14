// React Router imports for navigation and routing functionality
import { Outlet} from 'react-router-dom'
import FadeLayout from './components/FadeLayout'
import SocialRail from './components/SocialRail'
import Navbar from './components/Navbar'



/**
 * Main App Component
 * Layout component that provides the overall structure for all pages
 * Includes header with navigation, main content area, and footer
 */
export default function App() {

  return (
    // Main container with full viewport height, flex column layout, and dark background
    <div className="min-h-dvh flex flex-col bg-slate-950">
      <section className="relative">
        <SocialRail />
        {/* your narrative content here */}
      </section>

      {/** Navbar */}
      <Navbar />

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
  )
}
