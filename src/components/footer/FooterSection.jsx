import React, { useEffect, useRef } from "react";
import { BRAND_NAME, FOOTER_BRAND, SOCIAL_LINKS } from "../../data/portfolioData";
import "./FooterSection.css";

export { FOOTER_BRAND, SOCIAL_LINKS };

export const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function SocialIcon({ name }) {
  switch (name) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FooterSection() {
  const rootRef = useRef(null);

  // IntersectionObserver for staggered reveal on scroll
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ft-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const reveals = rootEl.querySelectorAll(".ft-reveal");
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    if (window.lenis) {
      if (href === "#home" || href === "#") {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        if (el) window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
      }
    } else {
      if (href === "#home" || href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBackToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const brandText = BRAND_NAME.endsWith('.') ? BRAND_NAME.slice(0, -1) : BRAND_NAME;

  return (
    <footer ref={rootRef} id="footer" className="ft-root" aria-label="Site Footer">
      {/* Top ambient radial glow */}
      <div className="ft-glow-ambient" aria-hidden="true" />

      <div className="ft-container">
        {/* Main 3-Column Grid */}
        <div className="ft-grid">
          {/* Col 1: Brand */}
          <div className="ft-col ft-col-brand ft-reveal">
            <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="ft-logo" aria-label={BRAND_NAME}>
              {brandText}
              <span className="brand-dot" style={{ color: "#ffb02e" }}>.</span>
            </a>
            <p className="ft-tagline">{FOOTER_BRAND.tagline}</p>
          </div>

          {/* Col 2: Navigation Quick Links */}
          <nav className="ft-col ft-col-nav ft-reveal" aria-label="Footer Quick Links">
            <h3 className="ft-col-title">Navigation</h3>
            <ul className="ft-nav-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="ft-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Social Links */}
          <div className="ft-col ft-col-social ft-reveal">
            <h3 className="ft-col-title">Connect</h3>
            <p className="ft-social-sub">Get in touch directly or follow my work on GitHub.</p>
            <div className="ft-social-row">
              {SOCIAL_LINKS.filter((social) => social.href && social.href !== "TODO").map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="ft-social-btn"
                  aria-label={social.name}
                  style={{ "--social-accent": social.accent }}
                  {...(!social.isMailto && !social.href.startsWith("tel:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="ft-divider ft-reveal" />

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="ft-bottom-bar ft-reveal">
          <p className="ft-copyright">
            © {new Date().getFullYear()} {brandText}. All rights reserved.
          </p>
          <button type="button" onClick={handleBackToTop} className="ft-top-btn">
            <span>Back to top</span>
            <span className="ft-top-arrow" aria-hidden="true">↑</span>
          </button>
        </div>

        {/* Outlined Oversized Shimmer Wordmark (Decorative) */}
        <div className="ft-wordmark ft-reveal" aria-hidden="true">
          <span>{BRAND_NAME.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
