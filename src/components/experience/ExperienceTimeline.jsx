import { useEffect, useRef } from "react";
import { GROUPS } from "../../data/portfolioData";
import "./ExperienceTimeline.css";

export { GROUPS };

// Flat list: automatically computes group index, item number, group total, and section divider
const FLAT = GROUPS.flatMap((g, gi) =>
  g.items.map((x, i) => ({
    ...x,
    gi,
    n: i + 1,
    total: g.items.length,
    first: i === 0,
    label: g.label,
  }))
);

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n).padStart(2, "0");

export default function ExperienceTimeline() {
  const root = useRef(null);
  const list = useRef(null);
  const fill = useRef(null);
  const side = useRef(null);

  useEffect(() => {
    const items = Array.from(list.current.querySelectorAll(".ex-item"));

    // Ensure sticky pinning works by replacing any restrictive overflow on ancestors
    const restored = [];
    for (let el = root.current.parentElement; el; el = el.parentElement) {
      const cs = getComputedStyle(el);
      const bad = [cs.overflowX, cs.overflowY].some((v) => ["hidden", "auto", "scroll"].includes(v));
      const scroller = el !== document.body && el !== document.documentElement && el.scrollHeight > el.clientHeight + 5;
      if (bad && !scroller) {
        restored.push([el, el.style.overflowX, el.style.overflowY]);
        el.style.overflowX = "clip";
        el.style.overflowY = "visible";
      }
    }

    // Single-trigger reveal on intersect
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { threshold: 0.2 });
    items.forEach((i) => io.observe(i));

    let raf = 0, ticking = false, last = -1;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight, lr = list.current.getBoundingClientRect();
      fill.current.style.transform = `scaleY(${clamp((vh * 0.5 - lr.top) / lr.height, 0, 1)})`;
      let best = 0, bd = Infinity;
      items.forEach((it, i) => {
        const r = it.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - vh * 0.5);
        if (d < bd) { bd = d; best = i; }
        it.classList.toggle("is-passed", r.top < vh * 0.5);
      });
      if (best !== last && FLAT[best]) {
        last = best;
        items.forEach((it, i) => it.classList.toggle("is-active", i === best));
        side.current.style.setProperty("--i", best);
        side.current.dataset.g = FLAT[best].gi;
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; raf = requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      restored.forEach(([el, x, y]) => { el.style.overflowX = x; el.style.overflowY = y; });
    };
  }, []);

  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={root} id="experience" className="ex-root" aria-label="Experience and education">
      <div className="ex-grid">
        <aside ref={side} className="ex-side" data-g="0">
          <div className="ex-groups">
            {GROUPS.map((g, gi) => (
              <button
                key={g.label}
                type="button"
                className={`ex-title ex-g${gi}`}
                onClick={() =>
                  list.current
                    .querySelectorAll(".ex-item")[FLAT.findIndex((f) => f.gi === gi)]
                    ?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
              >
                {g.label}
              </button>
            ))}
          </div>
          <div className="ex-count">
            <div className="ex-roll">
              <div className="ex-col">
                {FLAT.map((f, i) => (
                  <span key={i}>{pad(f.n)}</span>
                ))}
              </div>
            </div>
            <div className="ex-roll ex-total">
              <div className="ex-col">
                {FLAT.map((f, i) => (
                  <span key={i}>/ {pad(f.total)}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="ex-roll ex-co">
            <div className="ex-col">
              {FLAT.map((f, i) => (
                <span key={i}>{f.company}</span>
              ))}
            </div>
          </div>
        </aside>

        <div ref={list} className="ex-list">
          <div className="ex-line">
            <i ref={fill} />
          </div>
          {FLAT.map((x, idx) => (
            <article key={`${x.company}-${x.role}-${idx}`} className="ex-item" data-g={x.gi}>
              {x.first && (
                <div className="ex-divider" id={`ex-${x.label.toLowerCase()}`}>
                  {x.label}
                </div>
              )}
              <span className="ex-dot" />
              <div className="ex-card" onMouseMove={spot}>
                {(x.period || x.place) && (
                  <div className="ex-meta">
                    {x.period && <span>{x.period}</span>}
                    {x.place && <span>{x.place}</span>}
                  </div>
                )}
                <h3 className="ex-mask">
                  <span>{x.role}</span>
                </h3>
                <p className="ex-company">{x.company}</p>
                {x.points && x.points.length > 0 && (
                  <ul>
                    {x.points.map((p, k) => (
                      <li key={k} style={{ "--k": k }}>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {x.stack && x.stack.length > 0 && (
                  <div className="ex-tags">
                    {x.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
