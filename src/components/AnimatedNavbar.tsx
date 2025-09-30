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

export default function Navbar() {
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const linkRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const { pathname } = useLocation();

  const [box, setBox] = React.useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    ready: false,
  });

  const measure = React.useCallback(() => {
    const nav = navRef.current;
    const active = linkRefs.current[pathname] ?? null;
    if (!nav || !active) {
      setBox((b) => ({ ...b, ready: false }));
      return;
    }
    const n = nav.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    const x = r.left - n.left - BRACKET_PAD;
    const y = r.top - n.top;
    const w = r.width + BRACKET_PAD * 2;
    const h = r.height;
    setBox({ x, y, w, h, ready: true });
  }, [pathname]);

  React.useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
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

  return (
    <main className="p-4">
      <header className="border border-white/50 rounded-2xl p-2 md:px-8 flex items-center justify-between">
        <a
          href="/app"
          className="font-semibold tracking-wider uppercase hover:scale-103"
        >
          ANON
        </a>

        {/* isolate to keep blend effects predictable within nav */}
        <nav
          ref={navRef}
          className="relative isolate flex gap-3 md:gap-6 items-center"
          aria-label="Primary"
        >
          {/* gliding brackets */}
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
              className={({ isActive }) =>
                [
                  // make each anchor a hover group + clipping context
                  "group relative inline-block overflow-hidden px-2 uppercase tracking-wider",
                  "text-sm md:text-base no-underline hover:no-underline",
                  isActive ? "text-white" : "text-white/50",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <span className="relative inline-flex items-center">
                  {/* HOVER SWEEP — white slab grows left->right behind the text */}
                  {!isActive && (
                    <span
                      aria-hidden
                      className={[
                        "absolute inset-y-0 left-0 right-0",
                        "bg-white",
                        // animate scaleX from 0 -> 100% on hover
                        "origin-left scale-x-0 group-hover:scale-x-100",
                        "transition-transform duration-300 ease-out",
                        // add a bit of glow so it really looks like a highlight
                        "shadow-[0_0_20px_rgba(255,255,255,0.35)]",
                        // ensure it's behind text but below brackets
                        "z-0",
                      ].join(" ")}
                    />
                  )}

                  {/* TEXT — use difference so over the white sweep it appears black */}
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
      </header>
    </main>
  );
}
