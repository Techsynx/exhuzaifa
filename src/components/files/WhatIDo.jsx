import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hero, services } from './data'
import './whatIDo.css'

gsap.registerPlugin(ScrollTrigger)
const Scene = lazy(() => import('./Scene'))

function webglOK() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function WhatIDo() {
  const root = useRef(null)
  const progress = useRef(0)
  const [mode, setMode] = useState('pending')
  const [inView, setInView] = useState(true)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMode(reduce || !webglOK() ? 'static' : '3d')
  }, [])

  // Render loop only runs while the section is near the screen
  useEffect(() => {
    if (mode !== '3d') return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px' })
    if (root.current) io.observe(root.current)
    return () => io.disconnect()
  }, [mode])

  useLayoutEffect(() => {
    if (mode !== '3d' || !root.current) return

    // Ensure no ancestor has overflow:hidden that breaks sticky/pinning
    const restored = []
    for (let el = root.current.parentElement; el; el = el.parentElement) {
      const cs = getComputedStyle(el)
      const bad = [cs.overflowX, cs.overflowY].some((v) => ['hidden', 'auto', 'scroll'].includes(v))
      const scroller = el !== document.body && el !== document.documentElement && el.scrollHeight > el.clientHeight + 5
      if (bad && !scroller) {
        restored.push([el, el.style.overflowX, el.style.overflowY])
        el.style.overflowX = 'clip'
        el.style.overflowY = 'visible'
      }
    }

    const navH = () => document.querySelector('.header')?.offsetHeight || 74

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root.current)

      // Heading is visible first with smooth initial entrance
      gsap.from(q('.wid-row1'), {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.1,
      })

      // Pinned timeline starting directly below the fixed navbar
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: () => `top ${navH()}px`,
          end: '+=500%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress
          },
        },
      })

      // Cards animate in one by one inside the stage below it as user scrolls
      tl.set({}, {}, 1)

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    }, root)

    return () => {
      ctx.revert()
      restored.forEach(([el, x, y]) => {
        el.style.overflowX = x
        el.style.overflowY = y
      })
    }
  }, [mode])

  if (mode === 'static') {
    return (
      <section ref={root} id="services" className="wid wid--static" aria-label="What I do">
        <div className="wid-pinned wid-pinned--static">
          <div className="wid-row1">
            <div className="wid-head">
              <p className="wid-label"><span>{hero.label}</span></p>
              <h2 className="wid-title">
                {hero.headlineBefore}<em>{hero.headlineEm}</em>{hero.headlineAfter}
              </h2>
            </div>
            <div className="wid-para">
              <p>{hero.paragraph}</p>
            </div>
          </div>

          <div className="wid-stage">
            <ul className="wid-static-list">
              {services.map((s, i) => (
                <li key={s.id} className="wid-item is-active">
                  <div className="wid-meta"><span>/ 0{i + 1}</span><i /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={root} id="services" className="wid" aria-label="What I do">
      <div className="wid-pinned">
        {/* Row 1: Eyebrow, Heading, Paragraph in normal flow (not absolute), placed at the top */}
        <div className="wid-row1">
          <div className="wid-head">
            <div className="wid-label">
              <span>{hero.label}</span>
            </div>
            <h2 className="wid-title">
              {hero.headlineBefore}<em>{hero.headlineEm}</em>{hero.headlineAfter}
            </h2>
          </div>

          <div className="wid-para">
            <p>{hero.paragraph}</p>
          </div>
        </div>

        {/* Row 2: Stage (position: relative; overflow: hidden; min-height: 0) containing ALL cards, lines & dots */}
        <div className="wid-stage">
          {mode === '3d' && (
            <div className="wid-canvas">
              <Suspense fallback={null}>
                <Scene progress={progress} active={inView} isMobile={isMobile} />
              </Suspense>
            </div>
          )}
          <div className="wid-vignette" />
        </div>
      </div>
    </section>
  )
}
