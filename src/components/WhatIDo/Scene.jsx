import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { services, cameraPath } from './data'

const { smoothstep, damp, clamp } = THREE.MathUtils

/* ---------- small helpers ---------- */
function makeTexture(stops) {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  stops.forEach(([o, a]) => grd.addColorStop(o, `rgba(255,255,255,${a})`))
  g.fillStyle = grd
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/* Dots flowing along any curve. getPoint(t, out) fills `out` for t in 0..1 */
function FlowDots({ count, px, opacity, color, speed, getPoint, texture, reveal }) {
  const geo = useRef()
  const mat = useRef()
  const dpr = useThree((st) => st.viewport.dpr)
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const tmp = useMemo(() => new THREE.Vector3(), [])
  useFrame(({ clock }) => {
    const shift = clock.elapsedTime * speed
    for (let i = 0; i < count; i++) {
      getPoint((i / count + shift) % 1, tmp)
      positions[i * 3] = tmp.x
      positions[i * 3 + 1] = tmp.y
      positions[i * 3 + 2] = tmp.z
    }
    if (geo.current) geo.current.attributes.position.needsUpdate = true
    if (mat.current) mat.current.opacity = opacity * reveal.current
  })
  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        map={texture}
        size={px * dpr}
        sizeAttenuation={false}
        transparent
        opacity={0}
        color={color}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

function Dust({ count, reveal }) {
  const mat = useRef()
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 22
      a[i * 3 + 1] = (Math.random() - 0.5) * 12
      a[i * 3 + 2] = 8 - Math.random() * 48
    }
    return a
  }, [count])
  const tex = useMemo(() => makeTexture([[0, 1], [0.5, 1], [0.6, 0]]), [])
  useFrame(() => { if (mat.current) mat.current.opacity = 0.45 * reveal.current })
  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={mat} map={tex} size={0.035} sizeAttenuation transparent opacity={0}
        color="#ff9ec0" depthWrite={false} toneMapped={false} />
    </points>
  )
}

/* ---------- everything that moves lives here (one useFrame) ---------- */
function World({ progress, activeIndex, setActiveIndex, isMobile }) {
  const { camera, pointer } = useThree()
  const aspect = useThree((st) => st.size.width / st.size.height)
  // narrow screens: pull items toward the center and spread them vertically so cards fit
  const xScale = aspect < 1 ? 0.08 : clamp(aspect / 1.78, 0.5, 1)
  const yScale = aspect < 1 ? 1.3 : 1

  const camCurve = useMemo(
    () => new THREE.CatmullRomCurve3(cameraPath.map((p) => new THREE.Vector3(p[0] * xScale, p[1], p[2])), false, 'catmullrom', 0.5),
    [xScale]
  )
  const itemPos = useMemo(() => services.map((s) => new THREE.Vector3(s.x * xScale, s.y * yScale, s.z)), [xScale, yScale])
  const chainCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [new THREE.Vector3(0, -0.6, 0), ...services.map((s) => new THREE.Vector3(s.x * xScale * 0.9, s.y * yScale - 0.5, s.z))],
        false, 'catmullrom', 0.5
      ),
    [xScale, yScale]
  )

  const dotTex = useMemo(() => makeTexture([[0, 1], [0.55, 1], [0.7, 0]]), [])
  const glowTex = useMemo(() => makeTexture([[0, 0.9], [0.25, 0.35], [1, 0]]), [])
  const orbColor = useMemo(() => new THREE.Color(3.2, 0.55, 1.25), [])

  const orb = useRef()
  const itemEls = useRef([])
  const smooth = useRef(0)
  const revealRef = useRef(0)
  const activeRef = useRef(0)
  const orbPos = useRef(new THREE.Vector3())
  const arcEnd = useRef(itemPos[0].clone())
  const arcCtrl = useRef(new THREE.Vector3())

  const v = useMemo(() => new THREE.Vector3(), [])
  const fwd = useMemo(() => new THREE.Vector3(), [])
  const tan = useMemo(() => new THREE.Vector3(), [])
  const camPos = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])

  const getChain = useMemo(() => (t, out) => chainCurve.getPointAt(t, out), [chainCurve])
  const getArc = useMemo(
    () => (t, out) => {
      const a = orbPos.current, b = arcEnd.current, c = arcCtrl.current
      const u = 1 - t
      out.set(
        u * u * a.x + 2 * u * t * c.x + t * t * b.x,
        u * u * a.y + 2 * u * t * c.y + t * t * b.y,
        u * u * a.z + 2 * u * t * c.z + t * t * b.z
      )
    },
    []
  )

  useFrame((state, delta) => {
    const p = progress.current
    const reveal = smoothstep(p, 0.1, 0.27)
    revealRef.current = reveal

    // 1) camera glides along the curve (scroll 0.2 -> 0.9, then holds)
    const target = clamp((p - 0.2) / 0.7, 0, 1)
    smooth.current = damp(smooth.current, target, 4, delta)
    const t = smooth.current
    camCurve.getPointAt(t, camPos)
    camCurve.getTangentAt(t, tan)
    look.copy(camPos).addScaledVector(tan, 10)
    camera.position.set(camPos.x + pointer.x * 0.25 * xScale, camPos.y + pointer.y * 0.15, camPos.z)
    camera.lookAt(look.x + pointer.x * 0.5 * xScale, look.y + pointer.y * 0.25, look.z)
    camera.updateMatrixWorld()

    // 2) orb is pinned to a fixed screen spot (slightly below center)
    if (orb.current) {
      orb.current.position.set(0, -0.35, -6).applyMatrix4(camera.matrixWorld)
      orb.current.scale.setScalar(reveal * (1 + 0.12 * Math.sin(state.clock.elapsedTime * 5.2)))
      orbPos.current.copy(orb.current.position)
    }

    // 3) which item is "active"? nearest one still in front of the camera
    camera.getWorldDirection(fwd)
    let best = -1, bestD = Infinity
    itemPos.forEach((ip, i) => {
      const d = v.copy(ip).sub(camera.position).dot(fwd)
      if (d > 6.2 && d < bestD) { bestD = d; best = i }
    })
    if (best === -1) best = services.length - 1
    if (best !== activeRef.current) { activeRef.current = best; setActiveIndex(best) }

    // 4) arc from orb to active card (end point eases to the new card)
    arcEnd.current.lerp(itemPos[best], 1 - Math.exp(-delta * 5))
    arcCtrl.current.copy(orbPos.current).add(arcEnd.current).multiplyScalar(0.5)
    arcCtrl.current.y += 1.8

    // 5) per-item opacity / blur from distance
    itemPos.forEach((ip, i) => {
      const el = itemEls.current[i]
      if (!el) return
      const d = v.copy(ip).sub(camera.position).dot(fwd)
      const nearFade = smoothstep(d, 1.5, 5.5)
      const farFade = 1 - smoothstep(d, 16, 32) * 0.75
      const base = i === best ? 1 : 0.55 * farFade
      el.style.opacity = (reveal * nearFade * base).toFixed(3)
      const blur = i === best ? 0 : smoothstep(d, 9, 26) * 1.4
      el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
    })
  })

  const df = isMobile ? 6.3 : 8.3

  return (
    <>
      {/* dotted path through all items + brighter arc orb -> active card */}
      <FlowDots count={140} px={2.6} opacity={0.4} color="#ff4d85" speed={0.02} getPoint={getChain} texture={dotTex} reveal={revealRef} />
      <FlowDots count={34} px={4.2} opacity={0.95} color="#ff5c8a" speed={0.18} getPoint={getArc} texture={dotTex} reveal={revealRef} />

      <Dust count={isMobile ? 160 : 420} reveal={revealRef} />

      {/* the glowing orb */}
      <group ref={orb}>
        <mesh>
          <sphereGeometry args={[0.03, 24, 24]} />
          <meshBasicMaterial color={orbColor} toneMapped={false} />
        </mesh>
        <sprite scale={[0.5, 0.5, 1]}>
          <spriteMaterial map={glowTex} color="#ff2d6f" transparent opacity={0.5}
            blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </sprite>
      </group>

      {/* the 4 service items (real HTML in 3D space) */}
      {services.map((s, i) => (
        <Html key={s.id} position={itemPos[i]} center distanceFactor={df}
          zIndexRange={[10, 0]} wrapperClass="wid-html" style={{ pointerEvents: 'none' }}>
          <article
            ref={(el) => (itemEls.current[i] = el)}
            className={`wid-item${activeIndex === i ? ' is-active' : ''}`}
            style={{ '--ry': `${s.rotY}deg`, '--rz': `${s.rotZ}deg`, opacity: 0 }}
          >
            <div className="wid-meta"><span>/ 0{i + 1}</span><i /></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        </Html>
      ))}

      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.85} luminanceThreshold={0.2} luminanceSmoothing={0.25} mipmapBlur radius={0.6} />
        </EffectComposer>
      )}
    </>
  )
}

export default function Scene({ progress, active, isMobile }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, isMobile ? 1.5 : 1.75]}
      camera={{ fov: 45, near: 0.1, far: 120, position: [0, 0, 6] }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
    >
      <World progress={progress} activeIndex={activeIndex} setActiveIndex={setActiveIndex} isMobile={isMobile} />
    </Canvas>
  )
}
