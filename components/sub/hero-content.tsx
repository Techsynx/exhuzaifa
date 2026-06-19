"use client";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

const GlitchMalik = () => {
  const [hovered, setHovered] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [displayText, setDisplayText] = useState("Malik");

  const glitchChars = "laikopertyudsfg";

  useEffect(() => {
    if (hovered) {
      setGlitching(true);
      const target = "Kali";
      const original = "Malik";
      let iteration = 0;
      const maxIterations = 10;

      const interval = setInterval(() => {
        if (iteration >= maxIterations) {
          setDisplayText(target);
          setGlitching(false);
          clearInterval(interval);
          return;
        }
        // random glitch characters same length as "Malik"
        setDisplayText(
          original
            .split("")
            .map((_, i) => {
              if (iteration > maxIterations * 0.6 && i >= original.length - target.length) {
                return target[i - (original.length - target.length)] ?? glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join("")
        );
        iteration++;
      }, 50);

      return () => clearInterval(interval);
    } else {
      // glitch back to Malik on mouse leave
      setGlitching(true);
      const target = "Malik";
      let iteration = 0;
      const maxIterations = 8;

      const interval = setInterval(() => {
        if (iteration >= maxIterations) {
          setDisplayText(target);
          setGlitching(false);
          clearInterval(interval);
          return;
        }
        setDisplayText(
          target
            .split("")
            .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
            .join("")
        );
        iteration++;
      }, 40);

      return () => clearInterval(interval);
    }
  }, [hovered]);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-pointer select-none"
      style={{
        color: "white",
        textShadow: hovered
          ? "0 0 8px #fff, 0 0 20px #e0f0ff, 0 0 40px #a8d8ff, 0 0 60px #7bc8ff"
          : "0 0 6px #fff, 0 0 15px #c8e8ff, 0 0 30px #6bb8ff",
        transition: "text-shadow 0.3s ease",
        fontFamily: glitching ? "monospace" : "inherit",
        letterSpacing: glitching ? "0.05em" : "inherit",
      }}
    >
      {displayText}
    </span>
  );
};

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative flex flex-col md:flex-row items-center justify-center px-4 md:px-20 mt-28 md:mt-20 w-full z-[20] max-md:pb-10 max-md:mt-28"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">AI Engineer Portfolio</h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          variants={slideInFromLeft(0.5)}
        >
          <span>
            Huzaifa <GlitchMalik />
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          AI Automation Engineer and Data Scientist with 3+ years delivering production-grade ML systems, agentic AI pipelines, and full-stack automation
solutions across real estate and technology sectors. Proven track record building end-to-end RAG systems, RPA bots, and LLM-powered workflows

        </motion.p>

        <motion.a
  href="/huzaifa.malik.pdf"
  download="Huzaifa_Malik_Resume.pdf"
  variants={slideInFromLeft(1)}
  className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
>
  Download Resume
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-10 md:mt-0 max-md:mt-8"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none max-md:w-full max-md:max-w-[450px] max-md:h-auto"
        />
      </motion.div>
    </motion.div>
  );
};
