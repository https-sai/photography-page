import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
};

export default function ImageModal({ isOpen, onClose, imageSrc, title }: ImageModalProps) {
  const [enable3D, setEnable3D] = useState(true);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3D || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rotateYValue = ((mouseX - width / 2) / width) * 20;
    const rotateXValue = -((mouseY - height / 2) / height) * 20;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card Container */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl overflow-hidden"
              style={{
                perspective: enable3D ? "1000px" : "none",
              }}
            >
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEnable3D(!enable3D)}
                    className={`p-2 rounded-lg transition-all ${
                      enable3D
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-slate-700/50 text-slate-400 border border-slate-600/30"
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-white transition-all border border-slate-600/30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div
                className="relative z-10 overflow-hidden rounded-xl"
                style={{
                  transform: enable3D
                    ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                    : "none",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.1s ease",
                }}
              >
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                  style={{
                    transform: enable3D ? "translateZ(50px)" : "none",
                  }}
                />
                
                {/* Gradient overlay for 3D effect */}
                {enable3D && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                )}
              </div>

              {/* Info text */}
              <div className="relative z-10 mt-4 text-center">
                <p className="text-slate-400 text-sm">
                  {enable3D ? "Move your mouse to see 3D effect" : "3D effect disabled"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}