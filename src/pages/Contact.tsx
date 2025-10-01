// Contact.tsx
import React from "react";
import ContactForm from "@/components/ContactForm";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import CleanCalendar from "@/components/CleanCalendar";
import CalendlyInline from "@/components/CalendlyInline";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";

// Logo types
type LogoItem = {
  name: string;
  src: string;
  href?: string;
  alt?: string;
};

export const logos: LogoItem[] = [
  {
    name: "Adobe Dreamweaver Icon",
    src: "/logos/Adobe Dreamweaver Icon.svg",
    alt: "Adobe Dreamweaver",
  },
  {
    name: "Adobe Lightroom SVG",
    src: "/logos/Adobe Lightroom SVG.svg",
    alt: "Adobe Lightroom",
  },
  {
    name: "Adobe Photoshop SVG Icons",
    src: "/logos/Adobe Photoshop SVG Icons.svg",
    alt: "Adobe Photoshop",
  },
  {
    name: "Adobe SVG Icon",
    src: "/logos/Adobe SVG Icon.svg",
    alt: "Adobe logo",
  },
  {
    name: "Adobe SVG Icons (1)",
    src: "/logos/Adobe SVG Icons (1).svg",
    alt: "Adobe logo",
  },
  {
    name: "Adobe SVG Icons",
    src: "/logos/Adobe SVG Icons.svg",
    alt: "Adobe logo",
  },
  {
    name: "After Effects Logo",
    src: "/logos/After Effects Logo.svg",
    alt: "Adobe After Effects",
  },
  {
    name: "Bootstrap SVG Icons",
    src: "/logos/Bootstrap SVG Icons.svg",
    alt: "Bootstrap",
  },
  { name: "CSS SVG Icons", src: "/logos/CSS SVG Icons.svg", alt: "CSS" },
  {
    name: "Figma SVG Vectors and Icons",
    src: "/logos/Figma SVG Vectors and Icons.svg",
    alt: "Figma",
  },
  { name: "HTML SVG Icons", src: "/logos/HTML SVG Icons.svg", alt: "HTML" },
  {
    name: "Javascript SVG Icons",
    src: "/logos/Javascript SVG Icons.svg",
    alt: "JavaScript",
  },
  {
    name: "MongoDB SVG Icons",
    src: "/logos/MongoDB SVG Icons.svg",
    alt: "MongoDB",
  },
  {
    name: "Tailwind CSS Icon",
    src: "/logos/Tailwind CSS Icon.svg",
    alt: "Tailwind CSS",
  },
];

// --- Animation presets ---
// parent controls the stagger
const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.1, // small lead-in before the first child
      staggerChildren: 0.35, // gap between each child’s start
    },
  },
};

export const fadeJump = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 1.1 },
  },
};

export default function Contact() {
  const prefersReduced = useReducedMotion();

  return (
    <MotionConfig>
      <div className="max-w-5xl mx-auto">
        {/* THIS parent wraps the 3 main blocks to stagger them */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* 1st child */}
          <motion.div variants={fadeJump} className="md:col-span-3">
            <InfiniteMarquee
              items={logos}
              speedSeconds={30}
              gapClass="gap-10"
              fadeEdges
              renderItem={(logo) => (
                <a
                  href={logo.href || "#"}
                  aria-label={logo.name}
                  className="inline-flex items-center"
                  tabIndex={-1}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt ?? logo.name}
                    loading="lazy"
                    className="h-10 w-auto opacity-80 hover:opacity-100 hover:grayscale-0 transition"
                  />
                </a>
              )}
            />
          </motion.div>

          {/* 2nd child */}
          <motion.div variants={fadeJump} className="w-full md:col-span-2">
            <ContactForm />
          </motion.div>

          {/* 3rd child */}
          <motion.div variants={fadeJump} className="w-full">
            <CleanCalendar />
          </motion.div>
        </motion.section>
      </div>
    </MotionConfig>
  );
}
