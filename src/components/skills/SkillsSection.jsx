import React from "react";
import { SKILLS_ROW_1, SKILLS_ROW_2 } from "../../data/portfolioData";
import "./SkillsSection.css";

function TechIcon({ name }) {
  switch (name) {
    case "laravel":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.5 5.5l-8.5-5-8.5 5 8.5 5 8.5-5zm-8.5 7.2l8-4.7v7.5l-8 4.7v-7.5zm-2 7.5l-8-4.7V8l8 4.7v7.5z" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="1.8" />
        </svg>
      );
    case "php":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 7h4c2.2 0 3.5 1.1 3.5 3s-1.3 3-3.5 3H7.5L6.5 17H4L6 7zm2.4 4.3h1.8c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1H8.9l-.5 2.2zm7.6-4.3h4c2.2 0 3.5 1.1 3.5 3s-1.3 3-3.5 3h-2.5l-1 4H14l2-10zm2.4 4.3h1.8c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1h-1.3l-.5 2.2z" />
        </svg>
      );
    case "mysql":
    case "database":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.5 3 2 5.2 2 8v8c0 2.8 4.5 5 10 5s10-2.2 10-5V8c0-2.8-4.5-5-10-5zm0 2c4.4 0 8 1.5 8 3s-3.6 3-8 3-8-1.5-8-3 3.6-3 8-3zm8 6c0 1.5-3.6 3-8 3s-8-1.5-8-3v-1.2c2.1 1.4 5 2.2 8 2.2s5.9-.8 8-2.2V11zm0 5c0 1.5-3.6 3-8 3s-8-1.5-8-3v-1.2c2.1 1.4 5 2.2 8 2.2s5.9-.8 8-2.2V16z" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M9 6h6a3 3 0 013 3v6" />
          <path d="M6 9v6a3 3 0 003 3h6" />
        </svg>
      );
    case "sanctum":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "stripe":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.52.5 6.85.5 3.1 3.58 3.1 8.528c0 5.433 4.887 7.234 8.761 8.71 2.378.905 3.189 1.545 3.189 2.502 0 .977-.852 1.488-2.28 1.488-2.585 0-5.32-1.127-7.228-2.247l-.924 5.568c1.927.915 4.872 1.451 8.152 1.451 5.918 0 9.851-2.915 9.851-7.989 0-5.462-4.747-7.24-8.645-8.861z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
        </svg>
      );
    case "realtime":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m13 2-2 10h4l-2 10 7-12h-4l3-8z" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M10 8v8c0 1.5-.8 2-2 2-1 0-1.7-.4-2-1l1-1.3c.3.5.6.7 1 .7.4 0 .7-.1.7-.7V8h1.3zm6.5 0c1.8 0 2.5 1 2.5 2.2 0 1.5-.9 2.1-1.8 2.5-.7.3-1.1.5-1.1 1 0 .4.3.7.9.7.6 0 1-.3 1.3-.7l1 1.2c-.5.8-1.3 1.1-2.3 1.1-1.6 0-2.5-.9-2.5-2.2 0-1.4.9-2.1 1.8-2.5.7-.3 1.1-.5 1.1-1 0-.4-.3-.6-.8-.6-.5 0-.9.2-1.2.6L14.2 9c.5-.7 1.3-1 2.3-1z" fill="#09050b" />
        </svg>
      );
    case "blade":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.9 2c-4 0-3.8 1.7-3.8 1.7l.1 1.8h3.8v.5H6.5S4 5.7 4 9.8c0 4 2.2 3.9 2.2 3.9h1.3v-1.8s-.1-2.2 2.2-2.2h3.7s2.1 0 2.1-2.1V4.1S15.8 2 11.9 2zm-1.1 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm1.3 18.8c4 0 3.8-1.7 3.8-1.7l-.1-1.8h-3.8v-.5h5.5s2.5.3 2.5-3.8c0-4-2.2-3.9-2.2-3.9h-1.3v1.8s.1 2.2-2.2 2.2h-3.7s-2.1 0-2.1 2.1v3.5s-.3 2.1 3.6 2.1zm1.1-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
        </svg>
      );
    case "ai":
    case "rag":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    default:
      return <span className="sk-fallback-dot" aria-hidden="true" />;
  }
}

export default function SkillsSection() {
  return (
    <section id="skills" className="sk-section" aria-label="Skills & Technologies">
      {/* Subtle ambient lighting for smooth blend */}
      <div className="sk-glow-ambient" aria-hidden="true" />

      {/* Infinite Marquee Lines (Row 1 left, Row 2 right) — No bottom boxes */}
      <div className="sk-marquee-wrap" aria-label="Highlighted Skills Stream">
        {/* Row 1: Moves Left */}
        <div className="sk-marquee-row sk-marquee-left">
          <div className="sk-marquee-track">
            {SKILLS_ROW_1.map((skill, i) => (
              <div
                key={`r1-a-${i}`}
                className="sk-marquee-pill"
                style={{ "--item-accent": skill.accent }}
              >
                <span className="sk-icon">
                  <TechIcon name={skill.icon} />
                </span>
                <span className="sk-name">{skill.name}</span>
              </div>
            ))}
          </div>
          {/* Duplicated track for seamless infinite loop */}
          <div className="sk-marquee-track" aria-hidden="true">
            {SKILLS_ROW_1.map((skill, i) => (
              <div
                key={`r1-b-${i}`}
                className="sk-marquee-pill"
                style={{ "--item-accent": skill.accent }}
              >
                <span className="sk-icon">
                  <TechIcon name={skill.icon} />
                </span>
                <span className="sk-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="sk-marquee-row sk-marquee-right">
          <div className="sk-marquee-track">
            {SKILLS_ROW_2.map((skill, i) => (
              <div
                key={`r2-a-${i}`}
                className="sk-marquee-pill"
                style={{ "--item-accent": skill.accent }}
              >
                <span className="sk-icon">
                  <TechIcon name={skill.icon} />
                </span>
                <span className="sk-name">{skill.name}</span>
              </div>
            ))}
          </div>
          {/* Duplicated track for seamless infinite loop */}
          <div className="sk-marquee-track" aria-hidden="true">
            {SKILLS_ROW_2.map((skill, i) => (
              <div
                key={`r2-b-${i}`}
                className="sk-marquee-pill"
                style={{ "--item-accent": skill.accent }}
              >
                <span className="sk-icon">
                  <TechIcon name={skill.icon} />
                </span>
                <span className="sk-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
