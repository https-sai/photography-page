import { Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

type LinkItem = { 
  href: string; 
  label: string; 
  Icon: React.ComponentType<{ className?: string }>;
  color: 'pink' | 'red' | 'blue' | 'indigo' | 'slate';
};

type SocialRailProps = {
  mode?: 'original' | 'mono' | 'color';
};

const SOCIAL_LINKS: LinkItem[] = [
  { href: "https://instagram.com/yourhandle", label: "Instagram", Icon: Instagram, color: "pink" },
  { href: "https://youtube.com/@yourhandle", label: "YouTube", Icon: Youtube, color: "red" },
  { href: "https://x.com/yourhandle", label: "Twitter / X", Icon: Twitter, color: "blue" },
  { href: "https://www.linkedin.com/in/yourhandle", label: "LinkedIn", Icon: Linkedin, color: "indigo" },
  { href: "https://github.com/yourhandle", label: "GitHub", Icon: Github, color: "slate" },
];

export default function SocialRail({ mode = 'color' }: SocialRailProps) {
  const colorClasses = {
    pink: "border-pink-500/20 hover:border-pink-500/50 hover:shadow-pink-500/30 hover:from-pink-500/10 via-pink-400/20 text-pink-500 hover:text-pink-400",
    red: "border-red-500/20 hover:border-red-500/50 hover:shadow-red-500/30 hover:from-red-500/10 via-red-400/20 text-red-500 hover:text-red-400",
    blue: "border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/30 hover:from-blue-500/10 via-blue-400/20 text-blue-500 hover:text-blue-400",
    indigo: "border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-indigo-500/30 hover:from-indigo-500/10 via-indigo-400/20 text-indigo-500 hover:text-indigo-400",
    slate: "border-white/20 hover:border-white/50 hover:shadow-white/30 hover:from-white/10 via-white/20 text-white hover:text-white/90"
  };

  const monoClass = "border-white/20 hover:border-white/50 hover:shadow-white/30 hover:from-white/10 via-white/20 text-slate-300 hover:text-white";

  if (mode === 'original') {
    return (
      <nav
        aria-label="Social links"
        className="fixed right-3 md:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2"
      >
        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group grid place-items-center size-10 rounded-full border border-white/10
                       bg-slate-700 backdrop-blur transition hover:bg-slate-900 hover:scale-95
                       shadow-lg hover:shadow-xl
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                       focus-visible:ring-offset-2 ring-offset-background"
          >
            <Icon className="size-5 text-slate-300 transition group-hover:text-white" />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Social links"
      className="fixed right-3 md:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
    >
      {SOCIAL_LINKS.map(({ href, label, Icon, color }, i) => {
        const rotateClass = i % 2 === 0 ? "hover:rotate-3" : "hover:-rotate-3";
        const currentColorClass = mode === 'mono' ? monoClass : colorClasses[color];
        
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`group p-2.5 rounded-full backdrop-blur-lg border bg-gradient-to-tr from-black/60 to-black/40 shadow-lg hover:shadow-2xl hover:scale-110 ${rotateClass} active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:bg-gradient-to-tr hover:to-black/40 relative overflow-hidden ${currentColorClass}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${currentColorClass}`}></div>
            <div className="relative z-10 grid place-items-center">
              <Icon className="size-5 transition-colors duration-300" />
            </div>
            <span className="sr-only">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
