"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const GlobeToAtom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked transformations
  const globeOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const atomOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.9], [0, 1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  
  const globeScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const atomScale = useTransform(scrollYProgress, [0.4, 0.8], [0.4, 1]);
  
  const globeRotate = useTransform(scrollYProgress, [0, 0.5], [0, 180]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-black overflow-visible"
      id="globe-atom"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Deep Space Background Glow */}
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[200px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative w-[320px] h-[320px] md:w-[650px] md:h-[650px] flex items-center justify-center">
          
          {/* Realistic Earth Section */}
          <motion.div
            style={{ 
              opacity: globeOpacity, 
              scale: globeScale,
              rotate: globeRotate
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* The Globe */}
            <div className="relative w-full h-full rounded-full shadow-[0_0_80px_rgba(34,211,238,0.3),inset_-20px_-20px_60px_rgba(0,0,0,0.8)] overflow-hidden bg-[#000411]">
              {/* Earth Surface Texture */}
              <motion.div 
                animate={{ backgroundPositionX: ["0%", "100%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen"
                style={{
                  backgroundImage: `url('https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_1280.jpg')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "repeat-x"
                }}
              />
              {/* Atmosphere/Reflection Layer */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
              {/* Dark Side Shadow */}
              <div className="absolute inset-0 shadow-[inset_-50px_-50px_100px_rgba(0,0,0,0.9)]"></div>
            </div>
            
            {/* Outer Atmospheric Blue Glow */}
            <div className="absolute inset-[-20px] rounded-full border border-blue-500/10 blur-2xl"></div>
            <div className="absolute inset-[-1px] rounded-full border border-cyan-400/20"></div>
          </motion.div>

          {/* Morphing Into Atom Section */}
          <motion.div
            style={{ opacity: atomOpacity, scale: atomScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Nucleus */}
            <div className="relative group">
                <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 via-purple-400 to-cyan-400 rounded-full shadow-[0_0_60px_rgba(147,51,234,0.6)] z-10 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/5 rounded-full animate-pulse border border-white/10"></div>
                </div>
                {/* Nucleus Core Glow */}
                <div className="absolute inset-0 w-full h-full bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            
            {/* Atomic Orbits */}
            {[0, 60, 120].map((rot, i) => (
              <motion.div
                key={i}
                animate={{ rotate: [rot, rot + 360] }}
                transition={{ duration: 3 - (i * 0.5), repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-[40%] border-[1.5px] border-purple-500/10 rounded-[100%] z-0"
              >
                {/* High-Speed Electron */}
                <div
                  className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] border border-white/40"
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Titles */}
        <div className="absolute bottom-[15%] w-full text-center px-10 pointer-events-none">
            <motion.div style={{ opacity: globeOpacity }}>
                <h2 className="text-5xl md:text-8xl font-black text-white/90 tracking-tighter uppercase italic">
                    Universal Scale
                </h2>
            </motion.div>
            
            <motion.div style={{ opacity: atomOpacity }} className="absolute inset-0 flex flex-col items-center">
                <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 tracking-tighter uppercase italic mb-8">
                    Atomic Detail
                </h2>
                
                <motion.p 
                    style={{ opacity: textOpacity }}
                    className="text-2xl md:text-4xl font-extralight text-purple-400 italic tracking-widest drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]"
                >
                    &quot;Precision in every particle.&quot;
                </motion.p>
            </motion.div>
        </div>
      </div>
    </section>
  );
};
