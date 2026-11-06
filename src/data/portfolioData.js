/**
 * =============================================================================
 * CENTRAL PORTFOLIO DATA (Single Source of Truth)
 * =============================================================================
 */

// 1. BRAND NAME
export const BRAND_NAME = "Huzaifa Malik.";

// 2. PERSONAL INFO
export const PERSONAL_INFO = {
  name: "Huzaifa Malik",
  role: "AI Engineer | AI Agents, Automation & RAG Systems",
  location: "Lahore, Pakistan",
  email: "exhuzaifa@gmail.com",
  phone: "+92-326-8282-409",
  github: "https://github.com/Techsynx",
  linkedin: "https://www.linkedin.com/in/exhuzaifa",
};

// 3. HERO SECTION
export const HERO_DATA = {
  tag: "Hey, I'm an",
  title: "AI Software Engineer",
  headline: "Intelligent systems,\nbuilt end to end.",
  subline: "I build production agentic workflows, RAG pipelines, and full-stack AI applications with LangChain, n8n, Python, FastAPI and React.",
  items: [
    { num: "// 01", name: "Agentic Workflows" },
    { num: "// 02", name: "RAG Pipelines" },
    { num: "// 03", name: "MLOps & Fine-Tuning" },
    { num: "// 04", name: "Full-Stack AI Apps" },
  ],
};

// 4. ABOUT SECTION
export const ABOUT_DATA = {
  lead: [
    { t: "I'm Huzaifa Malik, an AI Engineer with 3+ years designing and deploying production agentic workflows and " },
    { t: "Retrieval-Augmented Generation (RAG) pipelines", hl: true },
    { t: " (LangChain, n8n) that eliminate manual operational overhead for enterprise and SME clients." },
  ],
  secondParagraph: {
    start: "Full-stack engineering background (React, Python, FastAPI) supports end-to-end delivery from agent architecture to production deployment. ",
    highlight: "Recognized by NASA for disclosing a Severe (P1) vulnerability",
    end: " through their official Vulnerability Disclosure Program (Bugcrowd). Available for remote roles worldwide.",
  },
  chips: ["LangChain", "n8n", "RAG Pipelines", "FastAPI", "Python", "React", "Pinecone", "Docker"],
};

// 5. SERVICES SECTION (3D Cards)
export const hero = {
  label: "WHAT I DO",
  headlineBefore: "Building intelligent agents into ",
  headlineEm: "reality",
  headlineAfter: ".",
  paragraph: "I architect autonomous AI agents, enterprise RAG systems, and robust full-stack ML applications that automate complex human workflows.",
};

export const services = [
  {
    id: "agents",
    title: "AI Agents & Automation",
    desc: "Self-hostable agentic platforms with LangGraph, n8n, CrewAI, and Flowise orchestrating multi-step business workflows autonomously with sub-second decision making.",
    x: 4.3,
    y: -0.3,
    z: -8,
    rotY: -9,
    rotZ: 1.5,
  },
  {
    id: "rag",
    title: "Enterprise RAG Systems",
    desc: "High-accuracy Retrieval-Augmented Generation pipelines over vector databases (Pinecone) with semantic chunking, hybrid search, and domain-tuned retrieval.",
    x: -4.7,
    y: -1.5,
    z: -15,
    rotY: 9,
    rotZ: -2,
  },
  {
    id: "mlops",
    title: "Production MLOps & ML",
    desc: "Predictive ML pipelines (XGBoost, Scikit-learn, Hugging Face) containerized with Docker, served via FastAPI, with live SHAP explainability and data drift monitoring.",
    x: 4.4,
    y: 1.5,
    z: -22,
    rotY: -9,
    rotZ: 1.5,
  },
  {
    id: "fullstack",
    title: "Full-Stack AI Engineering",
    desc: "End-to-end delivery uniting modern React interfaces, robust Python / FastAPI backends, WebSockets for streaming token responses, and scalable cloud architectures.",
    x: -2.8,
    y: 0.7,
    z: -29,
    rotY: 9,
    rotZ: -1.5,
  },
];

export const cameraPath = [
  [0, 0, 6],
  [0.6, 0.2, -2],
  [-0.6, -0.1, -8],
  [0.6, 0.1, -14],
  [-0.3, 0, -18],
  [0, 0, -21.5],
];

// 6. SKILLS SECTION
export const SKILLS_ROW_1 = [
  { name: "LangChain", icon: "ai", accent: "#ff5c8a" },
  { name: "LangGraph", icon: "layers", accent: "#a78bfa" },
  { name: "n8n", icon: "realtime", accent: "#ff6a3d" },
  { name: "RAG Pipelines", icon: "rag", accent: "#ff5c8a" },
  { name: "Python", icon: "python", accent: "#a78bfa" },
  { name: "FastAPI", icon: "fastapi", accent: "#ff6a3d" },
  { name: "React.js", icon: "react", accent: "#a78bfa" },
  { name: "Docker", icon: "docker", accent: "#ff5c8a" },
  { name: "Git & GitHub", icon: "github", accent: "#ff6a3d" },
];

export const SKILLS_ROW_2 = [
  { name: "CrewAI", icon: "ai", accent: "#ff5c8a" },
  { name: "Flowise", icon: "layers", accent: "#a78bfa" },
  { name: "Pinecone", icon: "database", accent: "#ff6a3d" },
  { name: "Hugging Face", icon: "ai", accent: "#a78bfa" },
  { name: "PyTorch", icon: "python", accent: "#ff5c8a" },
  { name: "XGBoost", icon: "realtime", accent: "#ff6a3d" },
  { name: "SQL & ETL", icon: "database", accent: "#a78bfa" },
  { name: "REST APIs", icon: "api", accent: "#ff5c8a" },
  { name: "CI/CD & AWS", icon: "realtime", accent: "#ff6a3d" },
];

export const SKILLS = [...SKILLS_ROW_1, ...SKILLS_ROW_2];

// 7. PROJECTS SECTION
export const PROJECTS = [
  {
    id: 1,
    theme: "red",
    badge: "AGENTIC AI",
    title: "AutoFlow — Multi-Agent Platform",
    desc: "Self-hostable agentic AI platform orchestrating 12 automation workflows for 5 SME clients. Employs RAG retrieval over Pinecone with GPT-4o reasoning, slashing manual client operations by 60%.",
    tags: ["n8n", "LangGraph", "LangChain", "Pinecone", "FastAPI", "GPT-4o"],
    live: "https://exhuzaifa.vercel.app",
    repo: "https://github.com/Techsynx",
  },
  {
    id: 2,
    theme: "amber",
    badge: "MLOPS",
    title: "ChurnGuard — Production MLOps",
    desc: "End-to-end MLOps pipeline for bank customer churn prediction reaching 91% accuracy. Containerized with Docker and FastAPI, featuring a live SHAP explainability dashboard and automated retraining on data drift.",
    tags: ["XGBoost", "FastAPI", "Docker", "SHAP", "Evidently AI", "CI/CD"],
    live: "https://exhuzaifa.vercel.app",
    repo: "https://github.com/Techsynx",
  },
  {
    id: 3,
    theme: "blue",
    badge: "WEB3 & AI",
    title: "DeFi Sentinel — On-Chain Analytics",
    desc: "On-chain analytics platform querying Ethereum and Polygon via Web3.py and The Graph. Uses an Isolation Forest ML model to detect suspicious wallet activity and rug-pulls at 87% precision with Telegram alerts.",
    tags: ["Web3.py", "Solidity", "Isolation Forest", "Telegram Bot", "The Graph"],
    live: "https://exhuzaifa.vercel.app",
    repo: "https://github.com/Techsynx",
  },
  {
    id: 4,
    theme: "red",
    badge: "NLP & LLM",
    title: "Fraud AI — Real-Time Text Detector",
    desc: "Transformer-based NLP classifier detecting AI-generated text at 89%+ accuracy. Deployed as a public REST API handling 500+ daily requests with sub-200ms latency via ONNX model optimization.",
    tags: ["Transformers", "FastAPI", "ONNX", "Hugging Face", "NLP"],
    live: "https://exhuzaifa.vercel.app",
    repo: "https://github.com/Techsynx",
  },
  {
    id: 5,
    theme: "amber",
    badge: "SECURITY",
    title: "NASA VDP — Severe (P1) Disclosure",
    desc: "Officially recognized by the National Aeronautics and Space Administration (NASA) for discovering and responsibly reporting a Severe (P1) security vulnerability through their Vulnerability Disclosure Program.",
    tags: ["NASA VDP", "Bugcrowd", "P1 Severity", "Ethical Hacking", "Recognition"],
    live: "https://exhuzaifa.vercel.app",
    repo: "https://github.com/Techsynx",
  },
];

// 8. EXPERIENCE & EDUCATION SECTION
export const GROUPS = [
  {
    label: "EXPERIENCE",
    items: [
      {
        role: "AI Automation Engineer",
        company: "Etihad Town",
        place: "Lahore, Pakistan",
        period: "Jan 2025 — Present",
        points: [
          "Eliminated 18+ hours/week of manual back-office work by building LangChain + n8n agentic workflows across 3 operational teams.",
          "Deployed a RAG-powered WhatsApp chatbot (Flowise + OpenAI) resolving 70% of routine inquiries autonomously, cutting response time by 55%.",
          "Built ML-powered property pricing & forecasting models (Python, XGBoost, Scikit-learn) applied across 500+ active listings.",
          "Recovered 14+ analyst hours/month with automated ETL pipelines and deployed 10+ interactive Power BI/Python KPI dashboards.",
        ],
        stack: ["LangChain", "n8n", "RAG", "Python", "XGBoost", "FastAPI"],
      },
      {
        role: "Software Engineer & AI Automation Specialist",
        company: "Techsynx",
        place: "Lahore, Pakistan",
        period: "2023 — 2025",
        points: [
          "Delivered 25+ production web applications for international clients with a 100% on-scope delivery rate.",
          "Lifted average Google PageSpeed scores from 52 to 88+ via code splitting, lazy loading, and asset caching.",
          "Built an n8n CRM-to-email-to-invoicing automation layer cutting billing cycles from 5 days to same-day.",
          "Deployed Make.com + OpenAI content pipelines generating 30 SEO-optimized articles/month.",
        ],
        stack: ["React", "n8n", "FastAPI", "Make.com", "OpenAI", "CI/CD"],
      },
      {
        role: "Front-End Developer & Workflow Automation Lead",
        company: "Housecodies",
        place: "Lahore, Pakistan",
        period: "2022 — 2023",
        points: [
          "Reduced page load time by 25–30% across 30+ responsive, cross-browser UIs, achieving an 80% first-review client approval rate.",
          "Eliminated a 2-hour weekly manual reporting process via a Python + Google Sheets API live dashboard.",
          "Connected Trello, Slack, and client email via Zapier workflows, cutting inter-team handoff delays by 40%.",
        ],
        stack: ["React", "JavaScript", "Python", "Zapier", "REST APIs"],
      },
    ],
  },
  {
    label: "EDUCATION & CERTIFICATIONS",
    items: [
      {
        role: "BS Information Technology",
        company: "GC University Faisalabad",
        place: "Faisalabad, Pakistan",
        period: "Graduated",
        points: ["Focused on Artificial Intelligence, Data Engineering, and Distributed Software Systems."],
        stack: ["AI", "Data Structures", "Software Engineering"],
      },
      {
        role: "NASA Letter of Recognition",
        company: "NASA SAISO & OCIO",
        place: "Washington, DC",
        period: "October 2026",
        points: [
          "Officially commended by NASA Senior Agency Information Security Officer for detecting and responsibly disclosing a Severe (P1) vulnerability under NASA's Vulnerability Disclosure Policy.",
        ],
        stack: ["Cybersecurity", "Bugcrowd", "VDP"],
      },
      {
        role: "Industry Certifications & Vetted Profiles",
        company: "Global Accreditations",
        place: "Worldwide",
        period: "2024 — 2026",
        points: [
          "Microsoft Certified: Azure AI Fundamentals (AI-900)",
          "Microsoft: Data Visualization, Cyber Security & Data Analysis",
          "Cisco: Network Security, Ethical Hacking & Network Devices",
          "NAVTTC / Corvit Networks: Machine Learning & Deep Learning",
          "Vetted Engineer: Braintrust, micro1 (AI Engineer), Huzzle, Index.dev, Turing, Crossover",
        ],
        stack: ["Azure AI", "Cisco", "Machine Learning"],
      },
    ],
  },
];

// 9. CONTACT SECTION DATA
export const contactData = {
  label: "CONTACT",
  headline: "Let's build something <em>remarkable</em>.",
  bio: "AI Engineer specializing in autonomous agentic workflows, enterprise RAG systems, and production full-stack AI applications.",
  email: "exhuzaifa@gmail.com",
  emailDisplay: "exhuzaifa@gmail.com",
  phone: "+92-326-8282-409",
  phoneDisplay: "+92-326-8282-409",
  location: "Lahore, Pakistan",
  github: "https://github.com/Techsynx",
  githubDisplay: "github.com/Techsynx",
  linkedin: "https://www.linkedin.com/in/exhuzaifa",
  linkedinDisplay: "linkedin.com/in/exhuzaifa",
  topics: [
    "AI Agents & Automation",
    "Enterprise RAG Systems",
    "Full-Stack AI Application",
    "Just saying hi",
  ],
};

// 10. FOOTER DATA
export const FOOTER_BRAND = {
  tagline: "Building autonomous AI agents, enterprise RAG pipelines, and intelligent production software.",
};

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/Techsynx",
    icon: "github",
    accent: "#ff6a3d",
    isMailto: false,
  },
  {
    name: "Email",
    href: "mailto:exhuzaifa@gmail.com",
    icon: "email",
    accent: "#ff5c8a",
    isMailto: true,
  },
  {
    name: "Phone",
    href: "tel:+923268282409",
    icon: "phone",
    accent: "#ff6a3d",
    isMailto: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/exhuzaifa",
    icon: "linkedin",
    accent: "#0a66c2",
    isMailto: false,
  },
];
