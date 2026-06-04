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
    link: "https://pk.linkedin.com/in/huzaifa-malikk",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/exhuzaifa",
  },
] as const;



export const PROJECTS = [
  {
    title: "PropertyVault",
    description: "Real‑time property valuation & market analytics pipeline (10K+ listings) with interpretable ML models.",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "SentinelAI",
    description: "Predicts high‑risk properties using XGBoost, with live model monitoring and interactive dashboards.",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "DataBridge",
    description: "Automates daily ingestion of 500K+ records via Airflow, with validation and alerting to cut manual processing.",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "InsightLens",
    description: "Demand forecasting with Prophet & LSTM, delivering 85% accuracy through an interactive Streamlit UI.",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "ClusterX",
    description: "Unsupervised market segmentation into 7 clusters, boosting targeted marketing ROI 3×.",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "AutoML Analytics",
    description: "Automated model selection & hyper‑parameter tuning, shortening model dev time from days to hours.",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "ReportGenix",
    description: "Generates 500+ PDFs/Excel reports daily via FastAPI & Celery, enabling self‑service analytics.",
    link: "https://exhuzaifa.vercel.app",
  },
  {
    title: "AnomalyGuard",
    description: "Real‑time anomaly detection on property data streams, improving data quality by 41%.",
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
        link: "https://pk.linkedin.com/in/huzaifa-malikk",
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

