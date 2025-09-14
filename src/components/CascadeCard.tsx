import { motion, useInView } from "framer-motion";
import { useRef } from "react";


export default function CascadeCard(){
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { margin: "-10% 0px -10% 0px", amount: 0.25 });
    
    return (
        <motion.div
        ref={ref}
        // Use variants-like behavior via animate prop to allow in/out transitions
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.98 }}
        whileHover={{ scale: 1.03 }}
        
        className="group relative h-48 w-full rounded-md bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg ring-1 ring-white/5 overflow-hidden will-change-transform"
        >
            <img
                src={"/images/img1.jpeg"}                // pass this in from your items
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
            />

            {/* optional: bottom gradient to improve text contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />

            {/* your existing text overlay, just give it higher z-index */}
            <div className="absolute inset-0 z-10 flex items-end">
                <div className="w-full p-4 text-slate-200/90 text-sm tracking-wide flex items-center justify-between">
                    <span className="font-semibold">Frame</span>
                    <span className="opacity-70">{inView ? "in view" : "out"}</span>
                </div>
            </div>
        
            {/* subtle hover lift */}
            <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.02]" />
        </motion.div>
    );

}