"use client";

import { motion, type Variants } from "framer-motion";
import { PROJECTS } from "@/constants";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const Projects = () => (
  <section
    id="projects"
    className="relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
  >
    {/* ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />

    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 mb-4"
    >
      My Projects
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-gray-400 text-center mb-14 max-w-xl"
    >
      A selection of AI &amp; data‑engineering projects built for real‑world impact.
    </motion.p>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl w-full"
    >
      {PROJECTS.map((project) => (
        <motion.div
          key={project.title}
          variants={cardVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          className="group relative flex flex-col gap-3 p-6 rounded-2xl border border-purple-500/20 bg-[#0d0d1a]/80 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300 hover:border-purple-400/50"
        >
          {/* card glow on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 pointer-events-none" />

          {/* pulsing node dot */}
          <div className="relative flex items-center gap-3 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500 shadow-[0_0_8px_2px_rgba(168,85,247,0.7)]" />
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-purple-400 uppercase opacity-70">
              Project
            </span>
          </div>

          <h2 className="text-lg font-bold text-white leading-snug group-hover:text-purple-200 transition-colors duration-300">
            {project.title}
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          {/* bottom accent line */}
          <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 mt-2 rounded-full" />
        </motion.div>
      ))}
    </motion.div>
  </section>
);
