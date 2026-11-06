import { useEffect, useRef } from "react";
import { PROJECTS } from "../../data/portfolioData";
import "./OriginalsScroll.css";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export default function OriginalsScroll() {
  const work = useRef(null);
  const track = useRef(null);
  const intro = useRef(null);
  const fill = useRef(null);
  const pct = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(track.current.querySelectorAll(".og-card"));
    let max = 0, cur = 0, raf;

    const size = () => {
      max = Math.max(0, track.current.scrollWidth - window.innerWidth);
      work.current.style.setProperty("height", `${max + window.innerHeight}px`, "important");
    };

    const tick = () => {
      const top = -work.current.getBoundingClientRect().top;
      const target = (max ? clamp(top / max, 0, 1) : 0) * max;
      const vel = target - cur;
      cur += vel * (reduce ? 1 : 0.1);
      track.current.style.transform = `translate3d(${-cur}px,0,0)`;

      const skew = reduce ? 0 : clamp(-vel * 0.04, -8, 8);
      const mid = window.innerWidth / 2;
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid) / window.innerWidth;
        c.style.transform = `skewX(${skew}deg) scale(${1 - clamp(d, 0, 0.6) * 0.18})`;
        c.style.opacity = 1 - clamp(d, 0, 0.7) * 0.6;
      });
      intro.current.style.transform = `skewX(${skew}deg)`;
      intro.current.style.filter = reduce ? "none" : `blur(${Math.min(Math.abs(vel) * 0.02, 4)}px)`;

      const p = max ? cur / max : 0;
      fill.current.style.transform = `scaleX(${p})`;
      pct.current.textContent = String(Math.round(p * 100)).padStart(2, "0");
      raf = requestAnimationFrame(tick);
    };

    // position:sticky tootta hai jab koi parent overflow hidden/auto/scroll ho.
    // overflow-x:clip same clipping deta hai bina scroll-container banaye.
    const restored = [];
    for (let el = work.current.parentElement; el; el = el.parentElement) {
      const cs = getComputedStyle(el);
      const bad = [cs.overflowX, cs.overflowY].some((v) => v === "hidden" || v === "auto" || v === "scroll");
      const realScroller = el !== document.body && el !== document.documentElement && el.scrollHeight > el.clientHeight + 5;
      if (bad && !realScroller) {
        restored.push([el, el.style.overflowX, el.style.overflowY]);
        el.style.overflowX = "clip";
        el.style.overflowY = "visible";
      }
    }

    size();
    const ro = new ResizeObserver(size);
    ro.observe(track.current);
    window.addEventListener("resize", size);
    window.addEventListener("load", size);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      restored.forEach(([el, x, y]) => { el.style.overflowX = x; el.style.overflowY = y; });
      window.removeEventListener("resize", size);
      window.removeEventListener("load", size);
    };
  }, []);

  return (
    <section id="projects" ref={work} className="og-work" aria-label="Projects">
      <div className="og-pin">
        <div ref={track} className="og-track">
          <div ref={intro} className="og-intro">
            <div className="og-eyebrow">5 builds · 2026</div>
            <h2>BUILD'S</h2>
            <p>Full-stack projects — SaaS invoicing, e-commerce, booking, real-time chat and a REST API, built with Laravel, React and MySQL.</p>
          </div>

          {PROJECTS.map((p, i) => (
            <article key={p.id} className={`og-card og-${p.theme}`}>
              <span className="og-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="og-badge">{p.badge}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="og-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="og-btns">
                {p.live && p.live !== "" && <a href={p.live} target="_blank" rel="noopener noreferrer">▶ View Project</a>}
                {p.repo && p.repo !== "" && <a className="ghost" href={p.repo} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
              </div>
            </article>
          ))}
        </div>

        <div className="og-hud">
          <span>Scroll to browse →</span>
          <div className="og-bar"><i ref={fill} /></div>
          <span ref={pct}>00</span>
        </div>
      </div>
    </section>
  );
}
