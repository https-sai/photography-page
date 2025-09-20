import React from "react";

// Netflix‑Style Video Gallery (React + Tailwind, no external libs)
// Drop into a Vite + React + Tailwind project.
// Route this page and you're done. Replace sample data with your own.

// 1) Add this small CSS helper to your global CSS (e.g., index.css):
// .no-scrollbar { scrollbar-width: none; }
// .no-scrollbar::-webkit-scrollbar { display: none; }

// 2) Usage:
//   <NetflixGalleryPage rows={demoRows} onPlay={(v) => console.log('play', v)} />

export type Video = {
  id: string;
  title: string;
  poster: string; // image URL
  preview?: string; // short muted video for hover preview (mp4/webm)
  badges?: string[]; // e.g., ["NEW EPISODES", "TOP 10"]
  progress?: number; // 0..1 for Continue Watching
};

export type VideoRow = {
  id: string;
  title: string;
  items: Video[];
};

// --- Demo data (swap with your own) ---
const demoRows: VideoRow[] = [
  {
    id: "my-list",
    title: "My List",
    items: [
      { id: "v1", title: "Mob Psycho 100", poster: thumb(1), badges: ["NEW EPISODES"] },
      { id: "v2", title: "Black Clover", poster: thumb(2) },
      { id: "v3", title: "Queen", poster: thumb(3), badges: ["TOP 10"] },
      { id: "v4", title: "Demon Slayer", poster: thumb(4) },
      { id: "v5", title: "The Sinner", poster: thumb(5) },
      { id: "v6", title: "Lovebirds", poster: thumb(6) },
    ],
  },
  {
    id: "continue",
    title: "Continue Watching",
    items: [
      { id: "v7", title: "Tanu Weds Manu", poster: thumb(7), progress: 0.72 },
      { id: "v8", title: "The Protector", poster: thumb(8), progress: 0.34 },
      { id: "v9", title: "Mob Psycho 100", poster: thumb(1), progress: 0.89 },
      { id: "v10", title: "Luna Nera", poster: thumb(9), progress: 0.18 },
      { id: "v11", title: "Patriot Act", poster: thumb(10), progress: 0.51 },
      { id: "v12", title: "The Crown", poster: thumb(11), progress: 0.05 },
    ],
  },
  {
    id: "trending",
    title: "Trending Now",
    items: [
      { id: "v13", title: "Dark", poster: thumb(12), badges: ["TOP 10"] },
      { id: "v14", title: "Penalty", poster: thumb(13), badges: ["TOP 10"] },
      { id: "v15", title: "Warrior Nun", poster: thumb(14) },
      { id: "v16", title: "Bulbbul", poster: thumb(15) },
      { id: "v17", title: "Our Planet", poster: thumb(16) },
      { id: "v18", title: "Arcane", poster: thumb(17) },
    ],
  },
];

function thumb(i: number) {
  // Unsplash placeholders—swap with real posters
  const urls = [
    "photo-1517816743773-6e0fd518b4a6", // 1
    "photo-1542202229-7d93c33f5b30",
    "photo-1517602302552-471fe67acf66",
    "photo-1485841890310-6a055c88698a",
    "photo-1535016120720-40c646be5580",
    "photo-1500530855697-b586d89ba3ee",
    "photo-1542204625-ca9961d2653a",
    "photo-1524985069026-dd778a71c7b4",
    "photo-1529101091764-c3526daf38fe",
    "photo-1513351105270-0f9ea5d0f88b",
    "photo-1495562569060-2eec283d3391",
    "photo-1495567720989-cebdbdd97913",
    "photo-1505682634904-d6c975a16ee7",
    "photo-1485163819542-13adeb5e0060",
    "photo-1489599849927-2ee91cede3ba",
    "photo-1505685296765-3a2736de412f",
    "photo-1526900913101-79f8ab7ebc59",
  ];
  const key = urls[(i - 1) % urls.length];
  return `https://images.unsplash.com/${key}?w=1200&q=80&auto=format&fit=crop`;
}

export default function NetflixGalleryPage({
  rows = demoRows,
  onPlay,
}: {
  rows?: VideoRow[];
  onPlay?: (video: Video) => void;
}) {
  return (
    <div className="min-h-screen w-full text-white">
      <main className="mx-auto max-w-[1400px] px-6 pb-20">
        {/* Optional hero/featured area */}
        <Featured />

        {rows.map((row) => (
          <Row key={row.id} title={row.title} items={row.items} onPlay={onPlay} />)
        )}
      </main>
    </div>
  );
}


function Featured() {
  return (
    <section className="mb-8 mt-4 overflow-hidden rounded-xl border border-white/10 bg-[url('https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
      <div className="bg-gradient-to-r from-black/80 to-black/0">
        <div className="px-8 py-12 md:px-12 md:py-16">
          <h1 className="max-w-xl text-3xl font-bold md:text-5xl">Featured Title</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">
            A short description of the featured video goes here. Keep it concise for a cinematic feel.
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => {}} primary><IconPlay className="mr-2"/>Play</Button>
            <Button onClick={() => {}}><IconInfo className="mr-2"/>More Info</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ title, items, onPlay }: { title: string; items: Video[]; onPlay?: (v: Video) => void }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  const updateArrows = React.useCallback(() => {
    const el = ref.current; if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  React.useEffect(() => { updateArrows(); }, [items, updateArrows]);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current; if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="mb-8">
      <h2 className="mb-2 px-2 text-lg font-semibold md:px-1">{title}</h2>
      <div className="relative">
        {canLeft && (
          <ArrowButton side="left" onClick={() => scrollBy(-1)} />
        )}
        {canRight && (
          <ArrowButton side="right" onClick={() => scrollBy(1)} />
        )}

        <div
          ref={ref}
          className="no-scrollbar scroll-smooth overflow-x-auto px-1 py-2"
        >
          <div className="flex gap-3">
            {items.map((v) => (
              <VideoCard key={v.id} video={v} onPlay={() => onPlay?.(v)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, onPlay }: { video: Video; onPlay?: () => void }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className="group relative aspect-[16/9] w-[220px] shrink-0 snap-start overflow-hidden rounded-md bg-zinc-800 ring-1 ring-white/10 transition-transform duration-200 hover:z-10 hover:scale-[1.04] md:w-[260px] lg:w-[300px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Poster / Preview */}
      {hover && video.preview ? (
        <video
          src={video.preview}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          autoPlay
          loop
        />
      ) : (
        <img
          src={video.poster}
          alt={video.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}

      {/* Top badges */}
      {video.badges?.length ? (
        <div className="pointer-events-none absolute left-2 top-2 flex gap-1">
          {video.badges.map((b) => (
            <span key={b} className="rounded bg-white text-black px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow">
              {b}
            </span>
          ))}
        </div>
      ) : null}

      {/* Bottom gradient + controls */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2">
        <div className="flex items-center justify-between">
          <p className="line-clamp-1 pr-2 text-sm font-medium">{video.title}</p>
          <div className="flex items-center gap-1 opacity-90">
            <IconAdd className="hover:opacity-100" />
            <IconChevronDown className="hover:opacity-100" />
          </div>
        </div>

        {/* Continue Watching progress */}
        {typeof video.progress === 'number' && (
          <div className="mt-2">
            <div className="h-1.5 w-full rounded-full bg-white/20">
              <div className="h-full rounded-full bg-red-600" style={{ width: `${Math.max(0, Math.min(1, video.progress)) * 100}%` }} />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Button size="sm" onClick={onPlay}><IconPlay className="mr-1"/>Play</Button>
              <span className="text-xs text-white/70">{Math.round((video.progress ?? 0) * 100)}% watched</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ArrowButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === 'left' ? 'Scroll left' : 'Scroll right'}
      className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-0' : 'right-0'} z-20 rounded-full bg-black/60 p-2 ring-1 ring-white/20 hover:bg-black/80`}
    >
      {side === 'left' ? <IconChevronLeft /> : <IconChevronRight />}
    </button>
  );
}

function Button({ children, onClick, primary, size = 'md' }: { children: React.ReactNode; onClick?: () => void; primary?: boolean; size?: 'sm' | 'md' }) {
  const sizing = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  const base = primary ? 'bg-white text-black hover:bg-white/90' : 'bg-white/20 text-white hover:bg-white/30';
  return (
    <button onClick={onClick} className={`inline-flex items-center rounded ${sizing} ${base} font-semibold`}>{children}</button>
  );
}

// --- Minimal inline icons ---
function IconPlay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function IconInfo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="currentColor" {...props}>
      <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2z" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor"/> 
    </svg>
  );
}
function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="currentColor" {...props}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}
function IconBell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="currentColor" {...props}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 10-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}
function IconAdd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="currentColor" {...props}>
      <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}
function IconChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="currentColor" {...props}>
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}
function IconChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="currentColor" {...props}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}
function IconChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="currentColor" {...props}>
      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
    </svg>
  );
}
