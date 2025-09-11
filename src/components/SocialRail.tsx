import { Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

type LinkItem = { href: string; label: string; Icon: React.ComponentType<{ className?: string }> };

const SOCIAL_LINKS: LinkItem[] = [
  { href: "https://instagram.com/yourhandle", label: "Instagram", Icon: Instagram },
  { href: "https://youtube.com/@yourhandle", label: "YouTube", Icon: Youtube },
  { href: "https://x.com/yourhandle", label: "Twitter / X", Icon: Twitter },
  { href: "https://www.linkedin.com/in/yourhandle", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/yourhandle", label: "GitHub", Icon: Github },
];

export default function SocialRail() {
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
