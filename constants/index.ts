import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_ROW_1 = [
  {
    skill_name: "Python",
    image: "python.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Machine Learning",
    image: "pytorch.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Deep Learning",
    image: "tensorflow.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "NLP",
    image: "nlp.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Computer Vision",
    image: "opencv.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "WordPress",
    image: "wordpress.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Git & GitHub",
    image: "git.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
] as const;

export const SKILL_ROW_2 = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Cyber Security",
    image: "cyber.svg",
    width: 60,
    height: 60,
  },
  {
    skill_name: "Ethical Hacking",
    image: "hacking.svg",
    width: 60,
    height: 60,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
  {
    skill_name: "Kali Linux",
    image: "kali.svg",
    width: 60,
    height: 60,
  },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/exhuzaifa",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/exhuzaifa",
  },
] as const;



export const PROJECTS = [
  {
    title: "Fraud AI (Detect AI Content)",
    description:
      "An intelligent system designed to detect and flag AI-generated content, ensuring authenticity and transparency in digital media.",
    image: "/projects/fraud-ai.png",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "EXP-AI (YT Video Summarizer)",
    description:
      "An AI-powered tool that summarizes YouTube videos, providing key insights and saving time for users.",
    image: "/projects/exp-ai.png",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "Chessy (Predict Chess Moves)",
    description:
      "A deep learning project that predicts optimal chess moves based on historical game data and pattern recognition.",
    image: "/projects/chessy.png",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "Posture Tracking",
    description:
      "A computer vision application that tracks and analyzes body posture in real-time to promote better ergonomics.",
    image: "/projects/posture.png",
    link: "https://exhuzaifa.vercel.app",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Contact",
    data: [
      {
        name: "+92-3358084245",
        icon: null,
        link: "tel:+923358084245",
      },
      {
        name: "exhuzaifa@gmail.com",
        icon: null,
        link: "mailto:exhuzaifa@gmail.com",
      },
      {
        name: "Nawad Town Lahore",
        icon: null,
        link: "#",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/exhuzaifa",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/exhuzaifa",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Personal Portfolio",
        icon: null,
        link: "https://exhuzaifa.vercel.app",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "AI Assistant",
    link: "#ai-assistant",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/exhuzaifa/space-portfolio",
};

