import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
window.ScrollTrigger = ScrollTrigger;

// Force page to always start at Hero Section on load/reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash && window.location.hash !== '#home' && window.location.hash !== '#') {
  history.replaceState(null, '', window.location.pathname);
}
window.scrollTo(0, 0);

// Setup smooth scrolling with Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.25,
  infinite: false,
});

window.lenis = lenis;
lenis.scrollTo(0, { immediate: true });

// Synchronize Lenis with GSAP ScrollTrigger ticker for buttery smoothness
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: true });
  }
  ScrollTrigger.refresh();
});
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Smooth anchor navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const id = anchor.getAttribute('href');
    if (id === '#home' || id === '#') {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      const el = document.querySelector(id);
      if (el) lenis.scrollTo(el, { offset: -60, duration: 1.4 });
    }
  });
});

// Mobile navigation toggle (3 lines hamburger)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNavOverlay = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNavOverlay) {
  const toggleMobileNav = (open) => {
    const isCurrentlyActive = mobileMenuBtn.classList.contains('is-active');
    const willOpen = open !== undefined ? open : !isCurrentlyActive;

    mobileMenuBtn.classList.toggle('is-active', willOpen);
    mobileNavOverlay.classList.toggle('is-open', willOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(willOpen));
    mobileNavOverlay.setAttribute('aria-hidden', String(!willOpen));

    if (willOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
  };

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileNav();
  });

  // Close when clicking any link inside the mobile drawer
  mobileNavOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileNav(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuBtn.classList.contains('is-active')) {
      toggleMobileNav(false);
    }
  });

  // Close if user clicks the dark backdrop outside content
  mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay) {
      toggleMobileNav(false);
    }
  });
}

// Keep navbar transparent
const header = document.querySelector('.header');
if (header) {
  header.style.background = 'transparent';
  header.style.backdropFilter = 'none';
  header.style.webkitBackdropFilter = 'none';
  header.style.borderBottom = 'none';
}

// Reveal animation with GSAP ScrollTrigger for Projects section heading block
function initProjectsHeaderReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const headerBlock = document.querySelector('.projects-header-block');
  const items = document.querySelectorAll('.projects-reveal-item');
  if (!headerBlock || items.length === 0) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: headerBlock,
      start: 'top 85%',
      once: true,
    },
    y: 24,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out',
  });
}

// Interactive Cursor Glow Controller for Hero Heading (Desktop Hover Only)
function initHeroHeadingGlow() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;
  if (prefersReduced || isTouchDevice) return;

  const heroSection = document.querySelector('.hero-section');
  const heading = document.querySelector('.hero-title');
  const lineInners = document.querySelectorAll('.hero-title-inner');
  if (!heroSection || !heading || lineInners.length === 0) return;

  let lineRects = [];
  let headingRect = null;

  const measure = () => {
    headingRect = heading.getBoundingClientRect();
    lineRects = Array.from(lineInners).map((el) => el.getBoundingClientRect());
  };

  // Defer measure to requestIdleCallback / RAF to eliminate initial render forced reflow
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => measure(), { timeout: 1500 });
  } else {
    setTimeout(measure, 500);
  }

  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('scroll', measure, { passive: true });

  let isPointerOver = false;
  let targetX = -999;
  let targetY = -999;
  let currentX = -999;
  let currentY = -999;
  let currentOpacity = 0;
  let targetOpacity = 0;
  let rafId = null;
  let isTabHidden = document.hidden;
  let autoStartTime = performance.now();
  const loopDuration = 7000;

  const ensureLoop = () => {
    if (!rafId && !isTabHidden) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const onPointerMove = (e) => {
    isPointerOver = true;
    targetX = e.clientX;
    targetY = e.clientY;
    targetOpacity = 1;
    ensureLoop();
  };

  const onPointerLeave = () => {
    isPointerOver = false;
    // Smoothly hand auto-drift from current glow position
    if (headingRect && headingRect.width > 0) {
      const relX = (currentX - headingRect.left) / headingRect.width;
      const progress = Math.max(0, Math.min(1, (relX + 0.15) / 1.3));
      autoStartTime = performance.now() - progress * loopDuration;
    }
    ensureLoop();
  };

  const onVisibilityChange = () => {
    isTabHidden = document.hidden;
    if (isTabHidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    } else {
      autoStartTime = performance.now();
      ensureLoop();
    }
  };

  heroSection.addEventListener('pointermove', onPointerMove);
  heroSection.addEventListener('pointerenter', onPointerMove);
  heroSection.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);

  const tick = (now = performance.now()) => {
    rafId = null;
    if (isTabHidden) return;

    if (isPointerOver && !isTouchDevice) {
      if (currentX === -999) {
        currentX = targetX;
        currentY = targetY;
        currentOpacity = 1;
      } else {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        currentOpacity += (targetOpacity - currentOpacity) * 0.15;
      }
    } else {
      if (headingRect && headingRect.width > 0) {
        const elapsed = (now - autoStartTime) % loopDuration;
        const progress = elapsed / loopDuration;
        const sweepX = headingRect.left + (progress * 1.3 - 0.15) * headingRect.width;
        const sweepY = headingRect.top + headingRect.height * 0.5;

        if (currentX === -999) {
          currentX = sweepX;
          currentY = sweepY;
          currentOpacity = 1;
        } else {
          currentX += (sweepX - currentX) * 0.08;
          currentY += (sweepY - currentY) * 0.08;
          currentOpacity += (1 - currentOpacity) * 0.1;
        }
      }
    }

    lineInners.forEach((el, index) => {
      const rect = lineRects[index];
      if (rect) {
        const mx = currentX - rect.left;
        const my = currentY - rect.top;
        el.style.setProperty('--mx', `${mx.toFixed(1)}px`);
        el.style.setProperty('--my', `${my.toFixed(1)}px`);
        el.style.setProperty('--o', currentOpacity.toFixed(3));
      }
    });

    rafId = requestAnimationFrame(tick);
  };

  ensureLoop();
}

function initAll() {
  initProjectsHeaderReveal();
  initHeroHeadingGlow();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
