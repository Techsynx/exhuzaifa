import { useEffect, useRef } from "react";
import { ABOUT_DATA } from "../../data/portfolioData";
import "./AboutMe.css";

// Lead paragraph: hl:true wale hisse orange highlight honge
const LEAD = ABOUT_DATA.lead;
const WORDS = LEAD.flatMap((s) => s.t.split(/\s+/).filter(Boolean).map((w) => ({ w, hl: !!s.hl })));
const FOCUS = ABOUT_DATA.chips;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// Default: section transparent hai, site ka animated background (tumhari photo) nazar aata hai.
// Agar sirf is section ke liye apni photo chahiye to <AboutMe image={photo} /> do.
export default function AboutMe({ image }) {
  const root = useRef(null);
  const bg = useRef(null);
  const lead = useRef(null);

  useEffect(() => {
    if (!lead.current || !root.current) return;
    const words = Array.from(lead.current.querySelectorAll(".ab-w"));
    const reveals = Array.from(root.current.querySelectorAll(".ab-rv"));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { threshold: 0.2 });
    reveals.forEach((n) => io.observe(n));

    let raf = 0, ticking = false;
    const update = () => {
      ticking = false;
      if (!lead.current || !root.current) return;
      const vh = window.innerHeight;
      // lead text: scroll ke saath lafz ek ek karke roshan hote hain
      const lr = lead.current.getBoundingClientRect();
      const p = clamp((vh * 0.9 - lr.top) / (vh * 0.3), 0, 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
      // photo ka halka parallax
      if (bg.current) {
        const rr = root.current.getBoundingClientRect();
        const q = clamp((vh - rr.top) / (vh + rr.height), 0, 1) - 0.5;
        bg.current.style.transform = `translate3d(0,${q * -70}px,0) scale(1.08)`;
      }
    };
    const on = () => { if (!ticking) { ticking = true; raf = requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  return (
    <section ref={root} id="about" className="ab-root" aria-label="About me">
      {image && (
        <div className="ab-photo" aria-hidden="true">
          <div ref={bg} className="ab-bg" style={{ backgroundImage: `url(${image})` }} />
          <div className="ab-shade" />
        </div>
      )}

      {/* Heading above the two-column paragraph grid */}
      <header className="ab-head ab-rv">
        <p className="ab-know">Know</p>
        <h2>ABOUT ME
          <svg className="ab-spark" viewBox="0 0 48 48" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1="24" y1="4" x2="24" y2="14" transform={`rotate(${i * 45} 24 24)`} />
            ))}
          </svg>
        </h2>
      </header>

      <div className="ab-grid">
        {/* LEFT: quote mark + lead paragraph */}
        <div className="ab-col ab-left">
          <div className="ab-quote ab-rv">
            <svg className="ab-mark" viewBox="0 0 64 48" aria-hidden="true">
              <path d="M0 48V26C0 10 10 2 26 0v10c-8 2-12 6-12 14h12v24zM36 48V26C36 10 46 2 62 0v10c-8 2-12 6-12 14h12v24z" />
            </svg>
            <p ref={lead} className="ab-lead">
              {WORDS.map((x, i) => (
                <span key={i} className={`ab-w${x.hl ? " hl" : ""}`}>{x.w} </span>
              ))}
            </p>
          </div>
        </div>

        <div className="ab-mid" aria-hidden="true" />

        {/* RIGHT: second paragraph + chips */}
        <div className="ab-col ab-right">
          <div className="ab-rv ab-body">
            <p>
              {ABOUT_DATA.secondParagraph.start}
              <span className="ab-hl">{ABOUT_DATA.secondParagraph.highlight}</span>
              {ABOUT_DATA.secondParagraph.end}
            </p>
            <ul className="ab-chips">{FOCUS.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
