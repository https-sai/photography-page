import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { GradualSpacing } from "@/components/gradual-spacing";
import InfiniteMarquee from "@/components/InfiniteMarquee";

// ---------- Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---------- Helpers
function SplitLetters({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="inline-block will-change-transform"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

function SectionHeading({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div className="mb-6">
      {kicker && (
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-300/90">
          {kicker}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function RevealOnView({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ---------- Hero
function NameHero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);

  return (
    <section className="relative h-[88vh] w-full overflow-hidden">
      <motion.div
        style={{ scale, opacity }}
        className="grid h-full place-items-center"
      >
        <div className="text-center">
          <SplitLetters
            text="anonymous"
            className="select-none text-6xl font-extrabold tracking-tight text-transparent md:text-8xl bg-gradient-to-br from-white via-emerald-200 to-cyan-200 bg-clip-text drop-shadow-[0_2px_12px_rgba(16,185,129,0.25)]"
          />
          <motion.p
            className="mt-4 text-white/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
          >
            photography · film · motion
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60"
      >
        <div className="flex items-center gap-2">
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}

// ---------- About & Experience (tailored for photographer/filmmaker)
function AboutExperience() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading kicker="About" title="Who I am" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RevealOnView>
          <motion.article
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-sm border border-white/10 bg-white/5 p-6 hover:bg-white/10 text-white/80"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">
              Photographer & Filmmaker
            </h3>
            <p>
              I capture human moments with cinematic restraint—clean frames,
              natural light, and motion that serves the story. My work spans
              brand films, music videos, editorial portraits, and short-form
              documentaries. I’m comfortable on small, fast crews or building
              out a larger set with lighting, audio, and production support.
            </p>
            <ul className="mt-4 grid list-disc gap-1 pl-5 text-sm">
              <li>Directing · Cinematography · Editorial Photography</li>
              <li>Color in DaVinci Resolve · Edit in Premiere Pro</li>
              <li>Lighting: Aputure, Nanlite · Grip basics</li>
              <li>Camera: Sony FX3/FX30 · Canon R-series · DJI gimbal/drone</li>
            </ul>
          </motion.article>
        </RevealOnView>

        <RevealOnView delay={0.1}>
          <motion.article
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 p-6 text-white/80"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">
              Selected Experience
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-medium text-white">
                  Commercial & Brand Films
                </span>{" "}
                · Short spots and product stories for startups and local
                businesses—nimble crews, fast turnarounds.
              </li>
              <li>
                <span className="font-medium text-white">Music & Culture</span>{" "}
                · Performance sessions and visualizers; run-and-gun coverage
                with clean sound.
              </li>
              <li>
                <span className="font-medium text-white">
                  Documentary & Narrative
                </span>{" "}
                · Character-led shorts with intimate coverage and restrained
                camera moves.
              </li>
              <li>
                <span className="font-medium text-white">Post‑Production</span>{" "}
                · Efficient edit pipelines, tasteful grades, delivery for
                web/social/festival.
              </li>
            </ul>
          </motion.article>
        </RevealOnView>
      </div>
    </section>
  );
}

// ---------- Mini Gallery Card
type MiniGallery = {
  title: string;
  tag: string;
  skills: string[];
  images: { src: string; alt?: string }[];
};

function MiniGalleryCard({ project }: { project: MiniGallery }) {
  const [idx, setIdx] = useState(0);
  const total = project.images.length;

  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  return (
    <motion.article
      variants={card}
      className="group relative overflow-hidden rounded-sm border border-white/10 bg-white/5 hover:bg-white/10"
    >
      <div className="relative aspect-[4/3] w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={idx}
            src={project.images[idx].src}
            alt={project.images[idx].alt ?? project.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
          />
        </AnimatePresence>

        {/* gradient scrim for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-80" />

        {/* Left/Right click zones */}
        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-0 top-0 h-full w-1/3 cursor-pointer bg-black/0 transition-colors "
        />
        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-0 top-0 h-full w-1/3 cursor-pointer bg-black/0 transition-colors "
        />

        {/* arrows */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3 text-white/80">
          <span className="select-none text-xl">←</span>
          <span className="select-none text-xl">→</span>
        </div>

        {/* dots */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1">
          {project.images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                i === idx ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <div className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/60">
          <span className=" py-0.5">{project.tag}</span>
        </div>

        <div className="text-xs">
          <InfiniteMarquee
            items={project.skills}
            speedSeconds={10}
            gapClass="gap-3"
            fadeEdges={true}
            pauseOnHover={true}
            renderItem={(skill) => (
              <div className="rounded-full border border-white/10 px-2 py-0.5">
                {skill}
              </div>
            )}
          />
        </div>
      </div>
    </motion.article>
  );
}

// ---------- Projects (3 mini galleries)
const PROJECTS: MiniGallery[] = [
  {
    title: "Neon City Nights",
    tag: "Music Video",
    skills: ["Sony FX3", "Adobe", "Framer", "iMovie"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1520975938310-24e0ee3f5f2d?q=80&w=1200&auto=format&fit=crop",
        alt: "Neon alley portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1200&auto=format&fit=crop",
        alt: "City at night",
      },
      {
        src: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1200&auto=format&fit=crop",
        alt: "Club lights",
      },
    ],
  },
  {
    title: "Quiet Mornings",
    tag: "Editorial",
    skills: ["Sony FX3", "Adobe", "Framer", "iMovie"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop",
        alt: "Soft window light",
      },
      {
        src: "https://images.unsplash.com/photo-1518081461904-9ac4b91f9e50?q=80&w=1200&auto=format&fit=crop",
        alt: "Coffee and journal",
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
        alt: "Calm lake",
      },
    ],
  },
  {
    title: "Pulse",
    tag: "Brand Film",
    skills: ["Sony FX3", "Adobe", "Framer", "iMovie"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1200&auto=format&fit=crop",
        alt: "Runner at dawn",
      },
      {
        src: "https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?q=80&w=1200&auto=format&fit=crop",
        alt: "Studio product",
      },
      {
        src: "https://images.unsplash.com/photo-1451187403803-7c878ab3b613?q=80&w=1200&auto=format&fit=crop",
        alt: "Abstract motion",
      },
    ],
  },
];

function ProjectsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <SectionHeading kicker="Work" title="Selected Projects" />
      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((p, i) => (
          <MiniGalleryCard key={i} project={p} />
        ))}
      </motion.div>
    </section>
  );
}

// ---------- Page wrapper
export default function Narrative() {
  return (
    <main className="min-h-screen text-white">
      <div id="name" className="relative h-[70vh] pt-40">
        <GradualSpacing text="Anonymous Inc." />
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <div className="flex items-center gap-2">
            <motion.span
              className="text-5xl"
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>

      <div id="about">
        <AboutExperience />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>
    </main>
  );
}
