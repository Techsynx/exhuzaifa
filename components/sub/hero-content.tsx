"use client";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative flex flex-col md:flex-row items-center justify-center px-4 md:px-20 w-full z-[20] min-h-screen"
    >
      {/* TEXT COLUMN — padded down below navbar on both mobile & desktop */}
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start pt-32 md:pt-24 pb-10 relative z-10">
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
            Huzaifa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Malik
            </span>
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Aspiring Machine Learning and AI Engineer with a strong foundation in
          web development, Computer Science, and data analysis. Passionate about
          building intelligent, data-driven solutions.
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          Learn more
        </motion.a>
      </div>

      {/* IMAGE — absolute on mobile (behind text), normal flow on desktop */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="
          absolute top-0 left-0 w-full h-full flex justify-center items-center -z-0 pointer-events-none
          md:relative md:inset-auto md:w-full md:h-full md:z-auto md:pointer-events-auto md:mt-0
        "
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none 
            w-[420px] h-auto opacity-40 mt-0
            md:w-full md:max-w-[650px] md:opacity-100"
        />
      </motion.div>
    </motion.div>
  );
};
