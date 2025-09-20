import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

// ---------------------------------------------
// Photographer Narrative Page (React + Tailwind + GSAP)
// ---------------------------------------------
// Install:
//   npm i gsap @gsap/react
// Drop this file into a Vite + React + Tailwind project, then render <PhotographerNarrative />.
// Replace the Unsplash images with your own.

// Register GSAP plugins
if (typeof window !== "undefined" && (gsap as any).plugins?.ScrollTrigger == null) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
}

// Demo image helpers (swap with your assets)
const heroImg =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"; // camera on table
const chapters = [
  {
    id: "c1",
    title: "Finding Light",
    copy:
      "I chase the quiet edges of a scene—where light turns a corner and you hear the frame before you see it.",
    img:
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "c2",
    title: "City Pulse",
    copy:
      "On the street, rhythm matters. Footsteps, bus brakes, a neon flicker—the shutter just keeps time.",
    img:
      "https://images.unsplash.com/photo-1497294815431-9365093b7331?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "c3",
    title: "Faces Between",
    copy:
      "Portraits happen in the breath between words—the soft places where people forget they’re being seen.",
    img:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1600&auto=format&fit=crop",
  },
];

const filmstrip = [
  "https://images.unsplash.com/photo-1520975934247-c8a3d77a3f3b?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520975934247-c8a3d77a3f3b?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=1600&auto=format&fit=crop",
];

export default function Narrative() {
  const root = React.useRef<HTMLDivElement | null>(null);
  const filmWrap = React.useRef<HTMLDivElement | null>(null);
  const filmInner = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // HERO: intro lines
      gsap.from(".hero-line", {
        yPercent: 30,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
      });

      // CHAPTER reveals on scroll
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      // PINNED STORYBOARD cross-fade
      const frames = gsap.utils.toArray<HTMLElement>(".story-frame");
      if (frames.length) {
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(frames[0], { autoAlpha: 1 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".storyboard",
            start: "top top",
            end: "+=2000", // length of the section
            scrub: true,
            pin: true,
          },
        });
        frames.forEach((frame, i) => {
          if (i === 0) return;
          tl.to(frames[i - 1], { autoAlpha: 0, duration: 0.5 }, ">")
            .to(frame, { autoAlpha: 1, duration: 0.5 }, "<");
        });
      }

      // PINNED HORIZONTAL FILMSTRIP scroll
      if (filmWrap.current && filmInner.current) {
        const getDistance = () =>
          -(filmInner.current!.scrollWidth - filmWrap.current!.clientWidth);

        gsap.to(filmInner.current, {
          x: getDistance,
          ease: "none",
          scrollTrigger: {
            trigger: filmWrap.current,
            start: "top top+=64", // leave room for a header
            end: "+=1500",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // PARALLAX on chapter images
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.5");
        gsap.to(el, {
          yPercent: () => -speed * 20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="min-h-screen w-full bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative h-[100svh] overflow-hidden">
        <img
          src={heroImg}
          alt="Camera on wooden table"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-end px-6 pb-16">
          <p className="hero-line text-sm uppercase tracking-[0.25em] text-slate-200/80">Saima Ahmed</p>
          <h1 className="hero-line mt-3 text-5xl font-black leading-[0.95] md:text-7xl">
            Stories in <span className="text-slate-300">Light</span>
          </h1>
          <p className="hero-line mt-4 max-w-xl text-slate-200/90">
            A scrollytelling demo for a photographer—built with GSAP ScrollTrigger, pinned scenes, and a filmstrip that moves with your story.
          </p>
          <div className="hero-line mt-6 flex gap-3">
            <a
              href="#chapters"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, { duration: 0.8, scrollTo: "#chapters", ease: "power2.out" });
              }}
              className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-white/90"
            >
              Begin
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, { duration: 0.8, scrollTo: "#contact", ease: "power2.out" });
              }}
              className="rounded-lg border border-white/20 px-4 py-2 font-semibold hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section id="chapters" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {chapters.map((c, i) => (
          <article key={c.id} className={`reveal mb-20 grid items-center gap-8 md:mb-28 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:(order-2 col-span-6) md:[&>*:last-child]:(order-1 col-span-6)" : ""}`}>
            <div className="col-span-6">
              <h2 className="text-3xl font-bold md:text-4xl">{c.title}</h2>
              <p className="mt-3 text-slate-300/90 md:text-lg">{c.copy}</p>
            </div>
            <div className="col-span-6 overflow-hidden rounded-xl border border-white/10">
              <div className="relative aspect-[16/10] w-full">
                <img
                  src={c.img}
                  alt={c.title}
                  data-parallax="0.6"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* STORYBOARD – pinned cross‑fade sequence */}
      <section className="storyboard relative h-[260vh]">
        <div className="sticky top-0 h-[100svh]">
          <div className="absolute inset-0">
            {chapters.map((c) => (
              <figure key={c.id} className="story-frame absolute inset-0">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
                <figcaption className="absolute bottom-8 left-1/2 w-[min(90%,46rem)] -translate-x-1/2 rounded-xl bg-black/55 p-4 text-center backdrop-blur">
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-200/90">{c.copy}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL FILMSTRIP – pinned and scrubbed */}
      <section className="relative h-[220vh]">
        <div ref={filmWrap} className="sticky top-16 z-10 mx-auto h-[calc(100svh-4rem)] w-full max-w-[110rem] overflow-hidden px-6">
          <h2 className="mb-2 text-sm uppercase tracking-[0.3em] text-slate-300/80">Selected Works</h2>
          <div className="h-[88%] rounded-xl border border-white/10 bg-slate-900/40 p-4">
            <div ref={filmInner} className="flex h-full items-center gap-4 will-change-transform">
              {filmstrip.map((src, i) => (
                <div key={i} className="relative aspect-[16/10] w-[50vw] max-w-[720px] shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10">
                  <img src={src} alt={`Frame ${i + 1}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2">
                    <p className="text-sm opacity-90">Frame {i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
        <div className="reveal rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          <h2 className="text-3xl font-bold">Let’s build your story</h2>
          <p className="mt-2 max-w-3xl text-slate-300/90">
            Weddings, portraits, editorial, or documentary—reach out with your idea. I’ll reply within 24 hours with availability and an initial moodboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:hello@example.com" className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-white/90">Email</a>
            <a href="#" className="rounded-lg border border-white/20 px-4 py-2 font-semibold hover:bg-white/10">Instagram</a>
            <a href="#" className="rounded-lg border border-white/20 px-4 py-2 font-semibold hover:bg-white/10">Portfolio PDF</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Saima Ahmed — GSAP Narrative Demo
      </footer>
    </main>
  );
}
