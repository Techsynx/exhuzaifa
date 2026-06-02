// Clean Projects component with animated cards
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants";

export const Projects = () => (
  <section id="projects" className="flex flex-col items-center justify-center py-12 px-4 bg-gray-900">
    <h1 className="text-4xl md:text-5xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 mb-8">
      My Projects
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
      {PROJECTS.map((project) => (
        <motion.div
          key={project.title}
          className="p-6 bg-gradient-to-br from-purple-700 to-indigo-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-105"
          whileHover={{ scale: 1.03, y: -5 }}
        >
          <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-gray-200 text-sm">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block mt-4 text-sm text-cyan-300 underline"
          >
            Learn more
          </a>
        </motion.div>
      ))}
    </div>
  </section>
);

import { PROJECTS } from "@/constants";

export const Projects = () => (
  <section id="projects" className="flex flex-col items-center justify-center py-12 px-4 bg-gray-900">
    <h1 className="text-4xl md:text-5xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 mb-8">
      My Projects
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
      {PROJECTS.map((project) => (
        <motion.div
          key={project.title}
          className="p-6 bg-gradient-to-br from-purple-700 to-indigo-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-105"
          whileHover={{ scale: 1.03, y: -5 }}
        >
          <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-gray-200 text-sm">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block mt-4 text-sm text-cyan-300 underline"
          >
            Learn more
          </a>
        </motion.div>
      ))}
    </div>
  </section>
);
