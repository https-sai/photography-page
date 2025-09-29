// CascadePage.tsx
import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { animate } from "motion/react";

type Photo = { src: string; alt?: string };
type Props = { images: Photo[]; className?: string };

const animationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export default function CascadePage({ images, className = "" }: Props) {
  const root = React.useRef<HTMLDivElement>(null);

  // Track scroll progress for this section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });

  // --- Stagger mapping ---
  const N = images.length;

  // Lead-in: keep the grid perfectly still at the top (0–6% of scroll)
  const LEAD = 0.01;

  // Each card gets the same scroll "band" after the lead-in
  const BAND = (1 - LEAD) / Math.max(1, N);

  // Helpers
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep

  // For each image, derive y/scale/opacity from scrollYProgress with a per-item delay.
  const transforms = React.useMemo(
    () =>
      Array.from({ length: N }, (_, k) => {
        // For card k, start after LEAD + k*BAND
        const y = useTransform(scrollYProgress, (p) => {
          if (p <= LEAD) return 0; // frozen at the very top
          const start = LEAD + k * BAND;
          const local = clamp01((p - start) / BAND); // 0→1 during its band
          // Move up gently (tune 0→-32px as you like)
          return -32 * smooth(local);
        });

        const scaleRaw = useTransform(scrollYProgress, (p) => {
          if (p <= LEAD) return 0.96;
          const start = LEAD + k * BAND;
          const local = clamp01((p - start) / BAND);
          // Subtle scale-in (0.96 → 1.0)
          return 0.95 + 0.04 * smooth(local);
        });

        const opacityRaw = useTransform(scrollYProgress, (p) => {
          if (p <= LEAD) return 1; // already visible at the top
          const start = LEAD + k * BAND;
          const local = clamp01((p - start) / BAND);
          // Optional: slight fade-in to emphasize staggering
          return 0.8 + 0.2 * smooth(local);
        });

        // Springs make the motion feel nicer on quick scrolls
        const scale = useSpring(scaleRaw, {
          stiffness: 200,
          damping: 28,
          mass: 0.6,
        });
        const opacity = useSpring(opacityRaw, {
          stiffness: 120,
          damping: 24,
          mass: 0.6,
        });

        return { y, scale, opacity };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [N]
  );

  return (
    <main
      ref={root}
      className={`min-h-screen w-full text-slate-100 ${className}`}
    >
      {/* Top progress bar */}
      <motion.div
        className="fixed left-0 top-0 h-1 w-full origin-left bg-white/60 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <section className="cf-grid mx-auto max-w-6xl px-0.5 pb-24 pt-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {images.map((photo, i) => (
            <motion.figure
              key={i}
              style={transforms[i]} // <-- y / scale / opacity from scroll
              className="rounded-sm cf-card group relative overflow-hidden bg-slate-900/40 ring-1 ring-white/10 will-change-transform hover:scale-103
              hover:shadow-2xl hover:shadow-slate-500"
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              variants={animationVariants}
              initial={"initial"}
              animate={"animate"}
              custom={i}
            >
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={photo.src}
                  alt={photo.alt ?? `Photo ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
                  draggable={false}
                />
              </div>
            </motion.figure>
          ))}
        </div>
      </section>
    </main>
  );
}
