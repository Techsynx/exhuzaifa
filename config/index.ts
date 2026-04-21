import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Huzaifa Malik | AI Engineer Portfolio",
  description: "Personal portfolio of Huzaifa Malik, a Machine Learning and AI Engineer.",
  keywords: [
    "Machine Learning",
    "Deep Learning",
    "AI Engineer",
    "Python",
    "Data Analysis",
    "React",
    "Next.js",
    "Portfolio",
  ] as Array<string>,
  authors: {
    name: "Huzaifa Malik",
    url: "https://exhuzaifa.vercel.app",
  },
} as const;
