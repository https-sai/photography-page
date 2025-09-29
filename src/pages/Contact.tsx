import ContactForm from "@/components/ContactForm";
import { Calendar } from "@/components/ui/calendar";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import React from "react";
import CleanCalendar from "@/components/CleanCalendar";

// Logo types
type LogoItem = {
  name: string;
  src: string; // path to your logo (prefer SVG)
  href?: string; // optional link to the product site
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

export default function Contact() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="items-align justify-center max-w-5xl mx-auto ">
      <div className="flex flex-col gap-2 p-8">
        <InfiniteMarquee
          items={logos}
          speedSeconds={40}
          gapClass="gap-10"
          fadeEdges
          renderItem={(logo) => (
            <a
              href={logo.href || "#"}
              aria-label={logo.name}
              className="inline-flex items-center"
              tabIndex={-1} // avoid too many focus stops if you duplicate the list
            >
              <img
                src={logo.src}
                alt={logo.alt ?? logo.name}
                loading="lazy"
                className="h-10 w-auto opacity-80 hover:opacity-300 hover:border-white hover:grayscale-0 transition"
                // If some logos look too tall, add 'max-h-10' to clamp them
              />
            </a>
          )}
        />
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Get In Touch</h1>
        <p className="text-slate-400">Let's discuss your next project</p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="w-full col-span-2">
          <ContactForm />
        </div>
        <div className="w-full">
          <CleanCalendar />
        </div>
      </div>
    </div>
  );
}
