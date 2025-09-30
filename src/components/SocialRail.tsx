// SocialRail.tsx
import React from "react";
import { Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

type LinkItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const SOCIAL_LINKS: LinkItem[] = [
  {
    href: "https://instagram.com/yourhandle",
    label: "Instagram",
    Icon: Instagram,
  },
  { href: "https://youtube.com/@yourhandle", label: "YouTube", Icon: Youtube },
  { href: "https://x.com/yourhandle", label: "Twitter / X", Icon: Twitter },
  {
    href: "https://www.linkedin.com/in/yourhandle",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "https://github.com/yourhandle", label: "GitHub", Icon: Github },
];

export default function SocialRail() {
  return (
    <nav
      aria-label="Social links"
      className="fixed right-3 md:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
    >
      {SOCIAL_LINKS.map(({ href, label, Icon }, i) => {
        const rotateClass = i % 2 === 0 ? "hover:rotate-3" : "hover:-rotate-3";
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={[
              "group relative overflow-hidden cursor-pointer",
              "p-2.5 rounded-full backdrop-blur-lg",
              // glossy slate button
              "border ring-1 border-white/50",
              "bg-gradient-to-tr from-slate-950/50 to-slate-700/50",
              "shadow-sm hover:shadow-2xl hover:scale-110 active:scale-95 active:rotate-0",
              "transition-all duration-300 ease-out hover:border-white",
              rotateClass,
              // default icon color (inherited) + hover
              "text-slate-200 hover:text-white",
            ].join(" ")}
          >
            {/* center glow / shine (always on, subtle) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full]"
            />

            {/* sweeping flash on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full
             bg-gradient-to-r from-transparent via-white to-transparent
             opacity-100 group-hover:opacity-100
             group-hover:translate-x-full
             transition-[transform,opacity] duration-500 ease-out
             blur-lg mix-blend-screen"
            />

            {/* icon */}
            <span className="relative z-10 grid place-items-center">
              <Icon className="size-5 transition-colors duration-300 drop-shadow" />
            </span>

            <span className="sr-only">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
