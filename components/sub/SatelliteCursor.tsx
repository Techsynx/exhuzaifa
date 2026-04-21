"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const SatelliteCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    // Hide the default cursor globally
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10001] text-cyan-400"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 250,
        mass: 0.5,
      }}
    >
      {/* SVG Satellite Icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
      >
        <path
          d="M12 2L14.5 9H21L16 13L17.5 20L12 16L6.5 20L8 13L3 9H9.5L12 2Z"
          fill="currentColor"
          className="opacity-20"
        />
        <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" />
        <path d="M4 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 4V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 15V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
};
