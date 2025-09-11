// src/pages/Loading.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

export default function Loading() {
  const navigate = useNavigate();

  const [percent, setPercent] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Fade in on mount - always reset and fade in
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // Small delay to ensure reset happens first
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!doneTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setPercent(i);
      if (i >= 100) {
        clearInterval(interval);
        // Navigate to app once counter reaches 100%
        setTimeout(() => {
          navigate("/app");
        }, 500); // Small delay to show 100% before navigating
      }
    }, 30); // 10ms → 0→100 in 1s
    return () => clearInterval(interval);
  }, [doneTyping, navigate]);


  return (
    <div className={`min-h-screen bg-slate-950 text-white font-mono flex items-center justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-5xl">
            {/* Block 1 - left aligned */}
            <div className="space-y-4">
                <p className="uppercase">//portfolio</p>
                <p className="uppercase text-3xl">[Anonymous Person]</p>
            </div>

            {/* Block 2 - indented to the right */}
            <div className="mt-8 ml-24 space-y-4">
                <p className="text-2xl">[#]PHOTOGRAPHER & VIDEOGRAPHER:</p>
                <div className="flex items-baseline gap-4">
                    <span className="text-xl">LOADING</span>
                    {/* Animated dots */}
                    <ReactTyped
                    strings={["................"]}
                    typeSpeed={70}
                    backSpeed={0}
                    showCursor={false}
                    loop={false} //only once
                    onComplete={() => setDoneTyping(true)} // trigger counter when done
                    />

                    {/* Percent counter */}
                    {doneTyping && (
                        <span className="text-xl tabular-nums">{percent}%</span>
                    )}
                </div>
            </div>
        </div>
    </div>
    
  );
}
