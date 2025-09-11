import ContactForm from "@/components/ContactForm"
import { Badge } from "@/components/ui/badge"
import { badgeVariants } from "@/components/ui/badge";

const links = [
  { label: "Docs", href: "https://ui.shadcn.com/docs/components/badge" },
  { label: "React", href: "https://react.dev" },
  { label: "GitHub", href: "https://github.com/shadcn-ui/ui" },
  { label: "Shadcn UI", href: "https://ui.shadcn.com" },
  { label: "Contact", href: "mailto:hello@example.com" },
];

export default function Contact() {
  return (
    <div className="items-align justify-center max-w-3xl mx-auto ">
      <div>
        <ContactForm/>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary" className="bg-blue-600">Secondary</Badge>
        <Badge variant="destructive" className="bg-blue-600">Destructive</Badge>
        <Badge variant="outline" className="bg-blue-600">Outline</Badge>
        {links.map((l, i) => (
          <a
            key={i}
            className={badgeVariants({ variant: i === 2 ? "outline" : "secondary" })}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {l.label}
          </a>
        ))}
        
      </div>
      
    </div>
  )
}
