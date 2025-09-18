import ContactForm from "@/components/ContactForm"
import { Badge } from "@/components/ui/badge"
import { badgeVariants } from "@/components/ui/badge";
import InfiniteMarquee from "@/components/InfiniteMarquee";

const links = [
  { label: "Docs", href: "https://ui.shadcn.com/docs/components/badge" },
  { label: "React", href: "https://react.dev" },
  { label: "GitHub", href: "https://github.com/shadcn-ui/ui" },
  { label: "Shadcn UI", href: "https://ui.shadcn.com" },
  { label: "Contact", href: "mailto:hello@example.com" },
];

const items = [
  "Adobe Lightroom Classic",
  "Adobe Photoshop",
  "Adobe Camera Raw",
  "Capture One Pro",
  "Photo Mechanic",
  "Adobe Premiere Pro",
  "DaVinci Resolve",
  "Final Cut Pro",
  "Adobe After Effects",
  "Adobe Audition",
  "Adobe Media Encoder",
  "Frame.io",
  "Topaz Photo AI",
  "Topaz Video AI",
  "Helicon Focus",
  "LRTimelapse",
  "iZotope RX",
  "Logic Pro"
];

export default function Contact() {

  return (
    <div className="items-align justify-center max-w-5xl mx-auto ">
      <div>
        <ContactForm/>
      </div>
      
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col gap-12 p-8">

        <InfiniteMarquee
          items={items}
          speedSeconds={10}
          gapClass="gap-4"
          pauseOnHover
          fadeEdges
          renderItem={(item) => (
            <div className={`h-10 w-fit px-3 rounded-xl 
              group grid place-items-center
              border bg-black/20
              hover:shadow-2xl hover:bg-gradient-to-tr hover:to-black/40 
              active:scale-95 transition-all duration-300 ease-out cursor-pointer
              text-sm
              relative 
              border-white/20 hover:border-white/50 hover:shadow-white/30 hover:from-white/10 via-white/20 text-slate-300 hover:text-white`}>
              {item}
               
            </div>
          )}
        />

        
      </main>
      
      
    </div>
  )
}
