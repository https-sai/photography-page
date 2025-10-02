import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

type LinkDef = { to: string; label: string };

const LINKS: LinkDef[] = [
  { to: "/app/narrative", label: "Narrative" },
  { to: "/app/videography", label: "Videography" },
  { to: "/app/photography", label: "Photography" },
  { to: "/app/contact", label: "Contact" },
];

const BRACKET_PAD = 6;

export default function AnimatedNavbar() {
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null); // measures full bar height incl. padding
  const linkRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const { pathname } = useLocation();

  const [box, setBox] = React.useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    ready: false,
  });
  const [open, setOpen] = React.useState(false);
  const [offset, setOffset] = React.useState(0); // spacer height

  // lock scroll when mobile menu is open
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const measure = React.useCallback(() => {
    // bracket measure
    const nav = navRef.current;
    const active = linkRefs.current[pathname] ?? null;
    const hidden = !nav || (nav as HTMLElement).offsetParent === null;
    if (hidden || !active) {
      setBox((b) => ({ ...b, ready: false }));
    } else {
      const n = nav.getBoundingClientRect();
      const r = active.getBoundingClientRect();
      const x = r.left - n.left - BRACKET_PAD;
      const y = r.top - n.top;
      const w = r.width + BRACKET_PAD * 2;
      const h = r.height;
      setBox({ x, y, w, h, ready: true });
    }

    // spacer measure (full wrapper height)
    const h = wrapRef.current?.offsetHeight ?? 0;
    setOffset(h);
  }, [pathname]);

  React.useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (navRef.current) ro.observe(navRef.current);
    Object.values(linkRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const itemClass = ({ isActive }: { isActive: boolean }) =>
    [
      "group relative inline-block overflow-hidden px-2 uppercase tracking-wider",
      "text-sm md:text-base no-underline hover:no-underline",
      isActive ? "text-white" : "text-white/50",
    ].join(" ");

  return (
    <>
      {/* FIXED CONTAINER on top of everything */}
      <div className="fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top)] pointer-events-none">
        {/* pointer-events back on for the bar itself */}
        <div ref={wrapRef} className="items-center p-4 pointer-events-auto">
          <header className="w-full border border-white/50 rounded-2xl p-2 px-4 md:px-8 flex items-center justify-between bg-slate-950/40 backdrop-blur-sm">
            <NavLink
              to="/app"
              end
              className="font-semibold tracking-wider uppercase hover:scale-103"
            >
              ANON
            </NavLink>

            {/* Desktop nav */}
            <nav
              ref={navRef}
              className="relative isolate hidden md:flex gap-3 md:gap-6 items-center"
              aria-label="Primary"
            >
              {box.ready && (
                <motion.div
                  className="pointer-events-none absolute z-20 flex items-center justify-between"
                  initial={false}
                  animate={{
                    x: box.x,
                    y: box.y,
                    width: box.w,
                    height: box.h,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 550,
                    damping: 40,
                    mass: 0.6,
                  }}
                  style={{ left: 0, top: 0 }}
                >
                  <span className="tabular-nums">[</span>
                  <span className="tabular-nums">]</span>
                </motion.div>
              )}

              {LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  ref={(el) => (linkRefs.current[to] = el)}
                  className={itemClass}
                >
                  {({ isActive }) => (
                    <span className="relative inline-flex items-center">
                      {!isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 right-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_20px_rgba(255,255,255,0.35)] z-0"
                        />
                      )}
                      <motion.span
                        className={[
                          "relative z-10 inline-block",
                          isActive
                            ? "text-white"
                            : "text-white/70 mix-blend-difference",
                        ].join(" ")}
                        animate={{ scale: isActive ? 0.93 : 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 600,
                          damping: 40,
                          mass: 0.3,
                        }}
                        style={{ transformOrigin: "center" }}
                      >
                        {label}
                      </motion.span>
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-4 items-center justify-center text-slate-200"
            >
              <span
                className={`block h-[1.5px] w-4 bg-current transition-transform ${
                  open ? "rotate-45 translate-y-[2px]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-current my-1 transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-current transition-transform ${
                  open ? "-rotate-45 -translate-y-[2px]" : ""
                }`}
              />
            </button>
          </header>
        </div>

        {/* Mobile overlay sheet */}
        <motion.div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-[101]"
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            initial={false}
            animate={{ opacity: open ? 1 : 0.5 }}
          />
          <motion.div
            className="absolute left-3 right-3 top-20 rounded-2xl border border-white/15 bg-slate-900/90 p-3"
            initial={false}
            animate={{ y: open ? 0 : -12 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="grid gap-1">
              <li>
                <NavLink
                  to="/app"
                  end
                  className="block px-3 py-2 rounded-xl text-white uppercase tracking-wider"
                  onClick={() => setOpen(false)}
                >
                  Anon
                </NavLink>
              </li>
              {LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      [
                        "block px-3 py-2 rounded-xl uppercase tracking-wider transition",
                        isActive
                          ? "bg-white text-slate-900"
                          : "text-white/80 hover:text-white hover:bg-white/10",
                      ].join(" ")
                    }
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Spacer so content starts below the fixed bar */}
      <div style={{ height: offset }} aria-hidden />
    </>
  );
}
