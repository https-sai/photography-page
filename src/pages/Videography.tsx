import HoverVideoGallery from "@/components/HoverVideoGallery";
import { fadeJump } from "./Contact";
import { motion } from "framer-motion";

//<HoverVideoGallery />

export default function Videography() {
  return (
    <div>
      <motion.div variants={fadeJump} className="">
        <HoverVideoGallery />
      </motion.div>
    </div>
  );
}
