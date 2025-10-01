import React from "react";
import { motion } from "framer-motion";
import { fadeJump } from "@/pages/Contact";

// Hover‑Play Video Gallery
// Tech: React + TailwindCSS (no external libs)
// Behavior: Grid of video thumbnails (16:9). On hover/focus, video auto‑plays
// (muted, inline) and pauses/resets when hover leaves or card exits viewport.
// Includes demo items using free, publicly hosted sample videos.

const animationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * index,
    },
  }),
};

export type VideoItem = {
  id: string;
  title: string;
  src: string; // mp4/webm URL
  poster: string; // fallback poster image
};

const demoItems: VideoItem[] = [
  {
    id: "bunny",
    title: "Big Buck Bunny",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: unsplash(1),
  },
  {
    id: "elephants",
    title: "Elephants Dream",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: unsplash(2),
  },
  {
    id: "escapes",
    title: "For Bigger Escapes",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: unsplash(3),
  },
  {
    id: "joyrides",
    title: "For Bigger Joyrides",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: unsplash(4),
  },
  {
    id: "meltdowns",
    title: "For Bigger Meltdowns",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    poster: unsplash(5),
  },
  {
    id: "blazes",
    title: "For Bigger Blazes",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: unsplash(6),
  },
  {
    id: "fun",
    title: "For Bigger Fun",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: unsplash(7),
  },
  {
    id: "sintel",
    title: "Sintel (Trailer)",
    src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    poster: unsplash(8),
  },
];

function unsplash(i: number) {
  const ids = [
    "photo-1500530855697-b586d89ba3ee",
    "photo-1520975934247-c8a3d77a3f3b",
    "photo-1495562569060-2eec283d3391",
    "photo-1499951360447-b19be8fe80f5",
    "photo-1519681393784-d120267933ba",
    "photo-1469474968028-56623f02e42e",
    "photo-1513151233558-d860c5398176",
    "photo-1517816743773-6e0fd518b4a6",
  ];
  return `https://images.unsplash.com/${
    ids[(i - 1) % ids.length]
  }?q=80&w=1600&auto=format&fit=crop`;
}

export default function HoverVideoGallery({
  items = demoItems,
  title = "Selected Works",
}: {
  items?: VideoItem[];
  title?: string;
}) {
  return (
    <main className="min-h-screen w-full  text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {items.map((v, i) => (
            <motion.div
              variants={animationVariants}
              initial={"initial"}
              animate={"animate"}
              custom={i}
            >
              <VideoCard key={v.id} item={v} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const play = React.useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    if (prefersReduced) return; // respect reduced motion
    try {
      await el.play();
    } catch {
      // Autoplay might be blocked; ignore
    }
  }, [prefersReduced]);

  const stop = React.useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    // Reset to start so poster is shown next time
    try {
      el.currentTime = 0;
    } catch {}
  }, []);

  // Pause when card leaves viewport
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) stop();
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stop]);

  return (
    <figure className="group">
      {/* Media */}
      <div
        className="rounded-sm relative aspect-[16/9] overflow-hidden bg-black ring-1 ring-white/10 transition-transform duration-200 group-hover:scale-[1.01] hover:shadow-2xl hover:shadow-slate-500"
        onMouseEnter={play}
        onMouseLeave={stop}
        onFocus={play}
        onBlur={stop}
        tabIndex={0}
        aria-label={`${item.title} preview`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={item.src}
          poster={item.poster}
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setLoaded(true)}
        />

        {/* subtle gradient + loading shimmer */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.03)_8%,rgba(255,255,255,0.06)_18%,rgba(255,255,255,0.03)_33%)] bg-[length:200%_100%]" />
        )}
      </div>
    </figure>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}
