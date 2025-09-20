import React from "react";

// -----------------------------
// Filmstrip Gallery (React + Tailwind)
// -----------------------------
// Drop this component into a Vite + React + Tailwind project.
// Usage:
//   <FilmstripGallery photos={myPhotos} />
// Where myPhotos: { id: string; src: string; alt?: string; caption?: string }[]

export type Photo = {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
};

// Demo photos (replace with yours)
const demoPhotos: Photo[] = [
  { id: "p1", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop", alt: "Mountains at golden hour", caption: "Golden peaks" },
  { id: "p2", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format&fit=crop", alt: "Laptop and coffee on desk", caption: "Studio vibes" },
  { id: "p4", src: "https://images.unsplash.com/photo-1504199367641-aba8151af406?w=1200&q=80&auto=format&fit=crop", alt: "Ocean cliffs", caption: "Sea cliff edge" },
  { id: "p5", src: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=1200&q=80&auto=format&fit=crop", alt: "Portrait in shadow", caption: "Low-key portrait" },
  { id: "p6", src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80&auto=format&fit=crop", alt: "Cactus close-up", caption: "Desert macro" },
  { id: "p7", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80&auto=format&fit=crop", alt: "Sunlit flowers", caption: "Bloom" },
  { id: "p8", src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop", alt: "Forest path", caption: "Moss trail" },
];

export default function FilmstripGallery({
  photos = demoPhotos,
  initialIndex = 0,
  expandAspect = 16 / 9, // change to 4/3, 1, etc.
}: {
  photos?: Photo[];
  initialIndex?: number;
  expandAspect?: number;
}) {
  const safeIndex = Math.min(Math.max(initialIndex, 0), Math.max(photos.length - 1, 0));
  const [active, setActive] = React.useState<number>(safeIndex);

  const thumbRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const stripRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Ensure active thumb stays in view
    const el = thumbRefs.current[active];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % Math.max(photos.length, 1));
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + Math.max(photos.length, 1)) % Math.max(photos.length, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos.length]);

  if (photos.length === 0) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-200">
        <p className="opacity-80">No photos yet. Pass a photos prop.</p>
      </div>
    );
  }

  const current = photos[active];

  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-100">
      {/* Top filmstrip (sticky) */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur">
        <div
          ref={stripRef}
          className="flex gap-2 overflow-x-auto px-3 py-2 snap-x snap-mandatory"
          aria-label="Photo thumbnails filmstrip"
        >
          {photos.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => setActive(i)}
              aria-selected={i === active}
              aria-controls="expanded-photo"
              className={`relative shrink-0 w-28 sm:w-32 md:w-36 aspect-[4/3]  overflow-hidden snap-start ring-2 transition-all duration-200 focus:outline-none focus-visible:ring-white/80 ${
                i === active ? "ring-white" : "ring-white/10 hover:ring-white/40"
              }`}
              title={p.alt || p.caption || `Photo ${i + 1}`}
            >
              <img
                src={p.src}
                alt={p.alt || p.caption || `Thumbnail ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              {/* Active indicator */}
              <div className={`absolute inset-x-0 bottom-0 h-1 ${i === active ? "bg-white" : "bg-transparent"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Expanded panel */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate text-sm md:text-base opacity-80">
            <span className="opacity-60">{active + 1}/{photos.length}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{current.caption || current.alt || "Untitled"}</span>
          </div>
          <div className="flex items-center gap-2">
            <NavButton onClick={() => setActive((i) => (i - 1 + photos.length) % photos.length)} label="" hotkey="←" />
            <NavButton onClick={() => setActive((i) => (i + 1) % photos.length)} label="" hotkey="→" />
          </div>
        </div>

        {/* Aspect-ratio wrapper for the expanded image */}
        <div
          id="expanded-photo"
          aria-live="polite"
          className="mt-3 relative w-full overflow-hidden bg-slate-950"
          style={{ aspectRatio: String(expandAspect) }}
        >
          {/* Fade swap via key change */}
          <FadeSwap key={current.id}>
            <img
              src={current.src}
              alt={current.alt || current.caption || "Expanded photo"}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </FadeSwap>
        </div>

        {/* (Optional) Caption block */}
        {(current.caption || current.alt) && (
          <p className="mt-3 text-sm md:text-base text-slate-300/90 leading-relaxed">
            {current.caption || current.alt}
          </p>
        )}
      </section>
    </main>
  );
}

function NavButton({ onClick, label, hotkey }: { onClick: () => void; label: string; hotkey?: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:border-white/40 hover:bg-white/5 active:scale-[0.98] transition"
    >
      {label}
      {hotkey ? <span className="ml-1 opacity-60">{hotkey}</span> : null}
    </button>
  );
}

// Simple fade transition between children (no external libs)
function FadeSwap({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.animate([
      { opacity: 0, transform: "scale(0.9)" },
      { opacity: 1, transform: "scale(1)" },
    ], { duration: 400, easing: "ease-out" });
  }, [children]);
  return <div ref={ref} className="absolute inset-0" aria-hidden={false}>{children}</div>;
}
