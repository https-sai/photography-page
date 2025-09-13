import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type CascadeCardProps = {
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: (index: number) => void;
};

export default function CascadeCard({ index, hovered, setHovered, onClick }: CascadeCardProps){
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.2, margin: "-100px" });
    
    return (
        <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onClick(index)}
        // Simple animation based on inView
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
        transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: (index % 8) * 0.1, // Reduced stagger
        }}
        className={cn(
            "group relative h-48 w-full rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg ring-1 ring-white/5 overflow-hidden cursor-pointer",
            "transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98] brightness-75"
        )}
        >
            <img
                src={`https://picsum.photos/400/300?random=${index + 1}`}
                alt={`Photography sample ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
            />

            {/* optional: bottom gradient to improve text contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />

            {/* Text overlay with hover effect */}
            <div className={cn(
                "absolute inset-0 bg-black/50 flex items-end transition-opacity duration-300",
                hovered === index ? "opacity-100" : "opacity-0"
            )}>
                <div className="w-full p-4">
                    <div className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                        Frame {index + 1}
                    </div>
                    <div className="text-sm text-slate-300/70 mt-1">
                        Photography Collection
                    </div>
                </div>
            </div>
        
        </motion.div>
    );

}