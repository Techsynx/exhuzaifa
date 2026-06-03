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
      className="flex flex-row md:flex-row items-start justify-between gap-3 px-4 md:px-20 pt-[34vh] md:pt-0 mt-0 md:mt-20 w-full z-[20]"
    >
      <div className="flex flex-col gap-5 justify-center flex-1 min-w-0 text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            AI Engineer Portfolio
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 mt-2 text-3xl sm:text-4xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
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
          className="text-sm sm:text-base md:text-lg text-gray-400 my-3 md:my-5 max-w-[600px]"
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

      <motion.div
        variants={slideInFromRight(0.8)}
        className="flex-shrink-0 flex justify-center items-start pt-1 md:flex-1 md:items-center md:pt-0"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none w-[120px] sm:w-[150px] h-auto opacity-95 md:w-[650px] md:opacity-100"
        />
      </motion.div>
    </motion.div>
  );
};
