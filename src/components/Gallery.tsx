import CascadeCard from "./CascadeCard"; 
import {motion} from "framer-motion";



function Card(){
    return(
        <div className="group relative h-50 w-full hover:scale-[1.02]">
            <img
                src={"/images/img1.jpeg"}                // pass this in from your items
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
            />
                    
        </div>
    );
    
}



export default function Gallery(){
    const indices = Array.from({ length: 24 }, (_, i) => i);

    return(
        <section className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-1">
            {indices.map((i) => (
                <Card/>
            ))}

            <motion.div>
                
            </motion.div>

        </section>
    );
}