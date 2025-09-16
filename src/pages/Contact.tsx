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

const items = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));

export default function Contact() {

  const rotateClass = "hover:rotate-3" 
  const monoClass = "border-white/20 hover:border-white/50 hover:shadow-white/30 hover:from-white/10 via-white/10 text-slate-300 hover:text-white";
  const currentColorClass = monoClass;

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
            <div className={`h-10 w-20 rounded-xl 
              group grid place-items-center
              backdrop-blur-lg border bg-gradient-to-tr from-black/60 to-black/40 shadow-lg 
              hover:shadow-2xl hover:bg-gradient-to-tr hover:to-black/40 
              active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer
              
              relative ${currentColorClass}`}>
              Hello
               
            </div>
          )}
        />

        
      </main>
      
      
    </div>
  )
}
