import { useEffect, useRef } from "react";
import "./FrameBackground.css";

const TOTAL_FRAMES = 190;
const END_ID = "services";

function getFrameUrl(index) {
  const n = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${n}.jpg`;
}

export default function FrameBackground() {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images = new Array(TOTAL_FRAMES);
    const loaded = new Uint8Array(TOTAL_FRAMES);

    let targetProgress = 0;
    let currentProgress = 0;
    let lastRenderedFrame = -1;
    let needsRedraw = true;
    let animId = 0;

    let lastWidth = 0;
    let lastHeight = 0;

    // Quality: Canvas sized to innerWidth/innerHeight x devicePixelRatio (capped at 2.0 on mobile, 2.5 on desktop)
    const resizeCanvas = (force = false) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const isMobile =
        width <= 768 ||
        (width / height < 1.0 && width <= 1024);

      // Prevent mobile address bar show/hide micro-resizes from causing canvas jump/stretch
      if (!force && isMobile && lastWidth > 0) {
        const dW = Math.abs(width - lastWidth);
        const dH = Math.abs(height - lastHeight);
        if (dW === 0 && dH < 140) {
          return;
        }
      }

      lastWidth = width;
      lastHeight = height;

      const maxDpr = isMobile ? 2.0 : 2.5;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      // Set internal buffer size
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Explicitly sync CSS display dimensions to avoid ANY browser stretching
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      needsRedraw = true;
      if (lastRenderedFrame !== -1) {
        drawFrame(lastRenderedFrame);
      }
    };

    // Find current or nearest loaded image to prevent flickering
    const getLoadedImage = (idx) => {
      if (loaded[idx]) return images[idx];

      let bestIdx = -1;
      let bestDist = Infinity;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (loaded[i]) {
          const dist = Math.abs(i - idx);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        }
      }

      return bestIdx !== -1 ? images[bestIdx] : null;
    };

    // Draw frame: on mobile uses stable top-anchored layout with face centering and bottom fade;
    // on desktop uses slightly reduced proportion (~13% smaller) so the body is perfectly framed.
    const drawFrame = (idx) => {
      const img = getLoadedImage(idx);
      if (!img || !img.naturalWidth) return false;

      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return false;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const isMobile =
        window.innerWidth <= 768 ||
        (window.innerWidth / window.innerHeight < 1.0 && window.innerWidth <= 1024);

      if (isMobile) {
        // 1. Fill entire canvas with dark maroon studio background #0d040a first
        ctx.fillStyle = "#0d040a";
        ctx.fillRect(0, 0, cw, ch);

        // 2. Scale frame: width-based stable anchor so scrolling doesn't stretch or distort
        const scale = Math.max((ch * 0.48) / ih, (cw * 1.50) / iw);
        const dw = iw * scale;
        const dh = ih * scale;

        // 3. Center horizontally
        const dx = (cw - dw) / 2;

        // 4. Place near top, just below navbar
        const dy = Math.max(14, ch * 0.04);

        // 5. Draw full uncropped frame: face completely visible, hair intact
        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);

        // 6. Smooth fade bottom edge into dark maroon background
        const fadeStart = dy + dh * 0.68;
        const fadeEnd = dy + dh;
        const grad = ctx.createLinearGradient(0, fadeStart, 0, fadeEnd);
        grad.addColorStop(0, "rgba(13, 4, 10, 0)");
        grad.addColorStop(1, "#0d040a");
        ctx.fillStyle = grad;
        ctx.fillRect(0, fadeStart, cw, dh * 0.32 + 2);

        // 7. Solid #0d040a below image
        ctx.fillStyle = "#0d040a";
        ctx.fillRect(0, fadeEnd - 1, cw, Math.max(0, ch - fadeEnd + 2));

        return true;
      }

      // DESKTOP: (screens > 768px): Original 100% cover-fit (0% scale down) with full headroom and hair intact
      const sx = 0;
      const sy = 0;
      const sw = iw;
      const sh = ih;

      const canvasRatio = cw / ch;
      const imageRatio = sw / sh;

      let dw, dh, dx, dy;

      if (canvasRatio > imageRatio) {
        dw = cw;
        dh = cw / imageRatio;
        dx = 0;
        dy = (ch - dh) * 0.12;
      } else {
        dh = ch;
        dw = ch * imageRatio;
        dx = (cw - dw) / 2;
        dy = 0;
      }

      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
      return true;
    };

    // Animation runs through Hero, About, and ALL of "What I do" (including its 500% pin),
    // and becomes static (freezes on frame 190) once "What I do" ends and Projects begins.
    const calculateProgress = () => {
      const scrollY = window.scrollY;
      let endScroll = 0;

      // The true end of "What I do" is the top of the next section (#skills-root or #skills)
      // which sits below GSAP's pin-spacer in the document flow.
      const nextSection =
        document.getElementById("skills-root") ||
        document.getElementById("skills") ||
        document.getElementById("projects-root") ||
        document.getElementById("projects");
      if (nextSection) {
        const nextTop = nextSection.getBoundingClientRect().top + scrollY;
        endScroll = nextTop - window.innerHeight;
      }

      // Fallback: check pin-spacer of #services
      if (endScroll <= 0) {
        const servicesEl = document.getElementById(END_ID);
        const pinSpacer = servicesEl?.closest(".pin-spacer") || servicesEl?.parentElement;
        if (pinSpacer && pinSpacer !== document.body) {
          const spacerBottom = pinSpacer.getBoundingClientRect().bottom + scrollY;
          endScroll = spacerBottom - window.innerHeight;
        }
      }

      // Fallback: unpinned #services or scrollable height
      if (endScroll <= 0) {
        const endSection = document.getElementById(END_ID) || document.getElementById("services-root");
        if (endSection) {
          const rect = endSection.getBoundingClientRect();
          endScroll = rect.bottom + scrollY - window.innerHeight;
        }
      }

      if (endScroll <= 0) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        endScroll = maxScroll > 0 ? maxScroll : 1;
      }

      // Clamped 0 to 1: stays static at 1 (final frame) after "What I do" ends
      return Math.min(1, Math.max(0, scrollY / endScroll));
    };

    // Always compute from calculateProgress() (ignore any e.progress from other scroll libraries)
    const handleScroll = () => {
      targetProgress = calculateProgress();
    };

    // Dynamic readability overlay on mobile: smoothly darkens background as user scrolls past hero
    const updateMobileOverlay = () => {
      if (!overlayRef.current) return;
      const isMobile =
        window.innerWidth <= 768 ||
        (window.innerWidth / window.innerHeight < 1.0 && window.innerWidth <= 1024);
      if (isMobile) {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight * 0.9;
        const opacity = Math.min(0.7, Math.max(0, (scrollY / (maxScroll || 1)) * 0.7));
        overlayRef.current.style.opacity = opacity.toFixed(3);
      } else {
        overlayRef.current.style.opacity = "0";
      }
    };

    // Animation Loop with lerp for silky smooth transitions
    const tick = () => {
      updateMobileOverlay();

      currentProgress += (targetProgress - currentProgress) * 0.12;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastRenderedFrame || needsRedraw) {
        const ok = drawFrame(frameIndex);
        if (ok) {
          lastRenderedFrame = frameIndex;
          needsRedraw = false;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    // Load single frame helper
    const loadSingleFrame = (i) => {
      return new Promise((resolve) => {
        if (images[i] && loaded[i]) return resolve(images[i]);

        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          images[i] = img;
          loaded[i] = 1;
          needsRedraw = true;
          if (lastRenderedFrame === -1) {
            drawFrame(i);
            lastRenderedFrame = i;
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Staged eager preloader:
    // 1. Frame 1 first immediately
    // 2. Keyframes spaced out for instant scrub readiness
    // 3. Batch preload all remaining frames
    const preloadAllFrames = async () => {
      // 1. First frame immediately
      const firstImg = await loadSingleFrame(0);
      if (firstImg) {
        drawFrame(0);
        lastRenderedFrame = 0;
        needsRedraw = false;
      }

      // 2. Keyframes spaced out every 5 frames
      const keyframes = [];
      for (let i = 4; i < TOTAL_FRAMES; i += 5) {
        keyframes.push(loadSingleFrame(i));
      }
      await Promise.all(keyframes);

      // 3. Remaining frames in batches
      const batchSize = 16;
      const remaining = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!loaded[i]) {
          remaining.push(i);
        }
      }

      for (let b = 0; b < remaining.length; b += batchSize) {
        const chunk = remaining.slice(b, b + batchSize);
        await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
      }
    };

    const onResize = () => {
      resizeCanvas(true);
      handleScroll();
      updateMobileOverlay();
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Connect to Lenis smooth scroll if available (always call handleScroll)
    if (window.lenis) {
      window.lenis.on("scroll", handleScroll);
    }

    resizeCanvas(true);
    updateMobileOverlay();
    targetProgress = calculateProgress();
    currentProgress = targetProgress;
    preloadAllFrames();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      if (window.lenis) {
        window.lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="fb-root" aria-hidden="true">
      <canvas ref={canvasRef} className="fb-canvas" />
      <div className="fb-shade" />
      <div ref={overlayRef} className="fb-scroll-overlay" />
    </div>
  );
}
