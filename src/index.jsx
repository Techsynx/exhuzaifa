import React from 'react';
import { createRoot } from 'react-dom/client';
import FrameBackground from './components/background/FrameBackground';
import AboutMe from './components/about/AboutMe';
import WhatIDo from './components/WhatIDo/WhatIDo';
import SkillsSection from './components/skills/SkillsSection';
import OriginalsScroll from './components/projects/OriginalsScroll';
import ExperienceTimeline from './components/experience/ExperienceTimeline';
import { ContactSection } from './components/contact/ContactSection';
import FooterSection from './components/footer/FooterSection';
import { BRAND_NAME } from './data/portfolioData';

// Sync navbar brand logo text with BRAND_NAME constant
document.querySelectorAll('.logo').forEach((el) => {
  const brandText = BRAND_NAME.endsWith('.') ? BRAND_NAME.slice(0, -1) : BRAND_NAME;
  el.innerHTML = `${brandText}<span class="brand-dot" style="color: #ffb02e;">.</span>`;
  el.setAttribute('aria-label', BRAND_NAME);
});

// Mount Crisp Fixed 2560px WebP Frame Sequence Background
const bgMountNode = document.getElementById('bg-root');
if (bgMountNode) {
  const bgRoot = createRoot(bgMountNode);
  bgRoot.render(<FrameBackground />);
}

// Mount AboutMe Section Island
const aboutMountNode = document.getElementById('about-root');
if (aboutMountNode) {
  const aboutRoot = createRoot(aboutMountNode);
  aboutRoot.render(<AboutMe />);
}

// Mount WhatIDo Section Island
const mountNode = document.getElementById('services-root');
if (mountNode) {
  const root = createRoot(mountNode);
  root.render(<WhatIDo />);
}

// Mount Skills Section Island
const skillsMountNode = document.getElementById('skills-root');
if (skillsMountNode) {
  const skillsRoot = createRoot(skillsMountNode);
  skillsRoot.render(<SkillsSection />);
}

// Mount OriginalsScroll Projects Section Island
const projectsMountNode = document.getElementById('projects-root');
if (projectsMountNode) {
  const projectsRoot = createRoot(projectsMountNode);
  projectsRoot.render(<OriginalsScroll />);
}

// Mount Experience Section Island
const experienceMountNode = document.getElementById('experience-root');
if (experienceMountNode) {
  const experienceRoot = createRoot(experienceMountNode);
  experienceRoot.render(<ExperienceTimeline />);
}

// Mount Contact Section Island
const contactMountNode = document.getElementById('contact-root');
if (contactMountNode) {
  const contactRoot = createRoot(contactMountNode);
  contactRoot.render(<ContactSection />);
}

// Mount Footer Section Island
const footerMountNode = document.getElementById('footer-root');
if (footerMountNode) {
  const footerRoot = createRoot(footerMountNode);
  footerRoot.render(<FooterSection />);
}
