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
      className="relative z-[20] flex flex-col md:flex-row items-center md:items-start justify-between gap-10 px-4 md:px-16 lg:px-24 pt-28 md:pt-36 pb-16 md:pb-24 w-full max-w-7xl mx-auto min-h-screen"
    >
      <div className="w-full md:max-w-[580px] flex flex-col gap-5 md:rounded-3xl md:border md:border-purple-500/10 md:bg-[#030014]/40 md:backdrop-blur-md md:p-8 md:shadow-[0_0_40px_rgba(42,14,97,0.35)]">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">AI Engineer Portfolio</h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
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
          className="text-base md:text-lg text-gray-300 leading-relaxed"
        >
          Aspiring Machine Learning and AI Engineer with a strong foundation in
          web development, Computer Science, and data analysis. Passionate about
          building intelligent, data-driven solutions.
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          href="#skills"
          className="py-2.5 px-6 button-primary text-center text-white cursor-pointer rounded-lg w-fit mt-2"
        >
          Learn more
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden lg:flex flex-1 justify-end items-center opacity-80"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={520}
          width={520}
          draggable={false}
          className="select-none drop-shadow-[0_0_30px_rgba(112,66,248,0.25)]"
        />
      </motion.div>
    </motion.div>
  );
};
