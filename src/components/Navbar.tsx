import {NavLink} from 'react-router-dom'


/**
 * Bracket Component
 * Renders the opening bracket "[" for active navigation items
 * @param active - Boolean indicating if the nav item is currently active
 */
function Bracket({ active }: { active?: boolean }) {
    return <span className="tabular-nums">{active ? '[' : ''}</span>
  }
  
  function NavItem({ to, children }: { to: string, children: React.ReactNode }) {
    return (
      <NavLink
        to={to}
        // Dynamic className that changes based on active state
        className={({ isActive }) => {
          return `tracking-wider uppercase text-sm md:text-base px-2 transition no-underline hover:no-underline ${isActive ? 'text-fg' : 'text-slate-400 hover:text-slate-300'}`
        }}
      >
        {/* Render bracket + text + closing bracket for active items */}
        {({ isActive }) => {
          return <span><Bracket active={isActive} />{children}{isActive ? ']' : ''}</span>
        }}
      </NavLink>
    )
  }


export default function Navbar(){
    return (
        <header className="py-6 px-4 md:px-8 flex items-center justify-between">
            <a href="/app" className="font-semibold tracking-wider uppercase">ANON</a>
            <nav className="flex gap-3 md:gap-6 items-center">
            <NavItem to="/app/narrative">Narrative</NavItem>
            <NavItem to="/app/videography">Videography</NavItem>
            <NavItem to="/app/photography">Photography</NavItem>
            <NavItem to="/app/contact">Contact</NavItem>
            </nav>
      </header>
    );
    
}