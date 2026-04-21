"use client";

import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const CodeShowcase = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-40 px-5 z-[20]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[1100px] flex flex-col items-center"
      >
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-[35px] md:text-[50px] font-thin text-white text-center mb-20 tracking-widest"
        >
          PURE <span className="font-bold opacity-80">INTELLIGENCE</span>
        </motion.div>

        <div className="relative w-full flex items-center justify-center h-[500px]">
          
          {/* Layer 1: Background Glass */}
          <motion.div 
            variants={slideInFromRight(1.2)}
            className="absolute w-[80%] h-[120%] bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 -rotate-3 z-0"
          ></motion.div>

          {/* Layer 2: Middle Glass */}
          <motion.div 
            variants={slideInFromLeft(1.0)}
            className="absolute w-[90%] h-[110%] bg-white/5 backdrop-blur-2xl rounded-[30px] border border-white/20 rotate-2 z-10 shadow-2xl"
          ></motion.div>

          {/* Layer 3: Top Glass */}
          <motion.div
            variants={slideInFromRight(0.8)}
            className="relative w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/30 z-20 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col gap-6"
          >
            {/* Window Controls */}
            <div className="flex gap-2.5 mb-2">
              <div className="w-3.5 h-3.5 rounded-full border border-white/40"></div>
              <div className="w-3.5 h-3.5 rounded-full border border-white/40"></div>
              <div className="w-3.5 h-3.5 rounded-full border border-white/40"></div>
            </div>

            {/* Code Content */}
            <pre className="font-mono text-sm md:text-xl leading-loose overflow-x-auto scrollbar-hidden">
              <code className="text-white/90">
                <span className="text-white font-bold">const</span> <span className="text-white/70">Huzaifa</span> = {"{"}<br/>
                {"  "}<span className="text-white/60">mission:</span> <span className="text-white/40">&quot;Architecting Intelligence&quot;</span>,<br/>
                {"  "}<span className="text-white/60">focus:</span> [<span className="text-white/40">&quot;Deep Learning&quot;</span>, <span className="text-white/40">&quot;Cyber Security&quot;</span>],<br/>
                {"  "}<span className="text-white/60">output:</span> <span className="text-white/40">&quot;Precision Solutions&quot;</span><br/>
                {"}"};<br/><br/>
                <span className="text-white/80 font-bold">async function</span> <span className="text-white/70">optimizeSystem</span>() {"{"}<br/>
                {"  "}<span className="text-white/80">await</span> NeuralCore.<span className="text-white/70">process</span>(globalData);<br/>
                {"  "}<span className="text-white/80">return</span> <span className="text-white/70">results</span>;<br/>
                {"}"}
              </code>
            </pre>

            {/* Subtle White Glows */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-[60px] pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
