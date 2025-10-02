import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CascadePage from "./CascadePage";
gsap.registerPlugin(ScrollTrigger);

type Photo = { src: string; alt?: string };
type Props = { photos: Photo[] };

function splitIntoRows(photos: Photo[], rows = 4): Photo[][] {
  const buckets: Photo[][] = Array.from({ length: rows }, () => []);
  photos.forEach((p, i) => buckets[i % rows].push(p));
  return buckets;
}

export default function PhotoGallery({ photos }: Props) {
  const [row1, row2, row3, row4] = splitIntoRows(photos, 4);

  return (
    <main className=" w-full">
      {/* Intro spacer so Row 1 isn’t visible at page load */}

      <RowStrip title="[ Row 1 ]" photos={row1} />
      <RowStrip title="[ Row 2 ]" photos={row2} />
      <RowStrip title="[ Row 3 ]" photos={row3} />
      <RowStrip title="[ Row 4 ]" photos={row4} />

      {/* Outro spacer */}
      <section className="w-full min-h-[40vh]" />
    </main>
  );
}

function RowStrip({
  photos,
  title = "Category",
  reverse = false,
}: {
  photos: Photo[];
  title?: string; // <-- use this as the category text (e.g., "Category 1")
  reverse?: boolean;
}) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const labelRef = React.useRef<HTMLDivElement | null>(null); // <-- NEW

  React.useLayoutEffect(() => {
    // Always return a cleanup function, even if refs are not ready
    let ctx: gsap.Context | null = null;
    let onResize: (() => void) | null = null;

    if (sectionRef.current && trackRef.current) {
      ctx = gsap.context(() => {
        const distance = () =>
          Math.max(0, trackRef.current!.scrollWidth - window.innerWidth);

        // start hidden
        gsap.set(trackRef.current, { autoAlpha: 0 });
        gsap.set(labelRef.current, { autoAlpha: 0, y: -4 });

        const tween = gsap.fromTo(
          trackRef.current,
          { x: () => (reverse ? -distance() : 0) },
          {
            x: () => (reverse ? 0 : -distance()),
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "center center",
              end: () => `=${distance()}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,

              // ✅ fade row title in at start, fade out when leaving back
              onToggle: (self) => {
                const row = trackRef.current as gsap.DOMTarget;
                const label = labelRef.current as gsap.DOMTarget | null;
                if (row) {
                  gsap.to(row, {
                    autoAlpha: self.isActive ? 1 : 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
                if (label) {
                  gsap.to(label, {
                    autoAlpha: self.isActive ? 1 : 0,
                    y: self.isActive ? 0 : -8,
                    duration: 0.35,
                    ease: "power2.out",
                  });
                }
              },

              onRefresh: () => {
                gsap.set(trackRef.current!, { x: reverse ? -distance() : 0 });
              },
            },
          }
        );

        // Get the ScrollTrigger instance created by the tween
        const st = (tween as any).scrollTrigger as ScrollTrigger;

        // 2) Category label show/hide while pinned
        if (labelRef.current) {
          // Ensure hidden initially
          gsap.set(labelRef.current, { autoAlpha: 0, y: -8 });
        }

        onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
      }, sectionRef);
    }

    // Always return cleanup function
    return () => {
      if (onResize) {
        window.removeEventListener("resize", onResize);
      }
      if (ctx) {
        ctx.revert();
      }
    };
  }, [photos.length, reverse]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100vh]">
      {/* Floating category label that appears when pinned */}
      <div
        ref={labelRef}
        className="
          pointer-events-none absolute pl-30
          top-[15vh] z-20 opacity-0
        "
      >
        <span className="px-4 py-1.5 text-3xl text-white">{title}</span>
      </div>

      {/* (Optional) non-sticky pre-title; it scrolls away before pin */}
      {/* <div className="px-6 pt-10 pb-4 text-sm tracking-wide text-slate-600">{title}</div> */}

      {/* Pin area: keep row vertically centered while pinned */}
      <div className="h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center gap-10 px-20"
          style={{ willChange: "transform" }}
        >
          {photos.map((p, i) => (
            <article
              key={i}
              className=" w-[80vh] h-[50vh] shrink-0 rounded-sm overflow-hidden hover:shadow-2xl hover:shadow-slate-500"
            >
              <div className="relative w-full h-full bg-yellow-700 rounded-sm overflow-hidden">
                <img
                  src={p.src}
                  alt={p.alt ?? ""}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
