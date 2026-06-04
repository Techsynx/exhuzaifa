"use client"

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

function Model({ controlsRef }) {
  const { scene } = useGLTF('/models/endurance/endurance.glb')
  const ref = useRef()
  const { camera } = useThree()

  // Auto-fit camera to model bounds on load
  useEffect(() => {
    if (!scene) return
    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = (camera.fov * Math.PI) / 180
    const cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.8

    camera.position.set(center.x, center.y + maxDim * 0.2, center.z + cameraZ)
    camera.updateProjectionMatrix()

    if (controlsRef && controlsRef.current) {
      controlsRef.current.target.copy(center)
      controlsRef.current.update()
    }
  }, [scene, camera, controlsRef])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003
    }
  })

  return <primitive ref={ref} object={scene} scale={2} position={[0, 0, 0]} />
}

function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#1CAAD9',
        fontSize: '14px',
        letterSpacing: '3px'
      }}
    >
      LOADING ENDURANCE...
    </div>
  )
}

export default function EnduranceModel() {
  const containerRef = useRef(null)
  const controlsRef = useRef(null)

  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      try {
        // request fullscreen on container
        await el.requestFullscreen?.()
      } catch (e) {
        // ignore
      }
    } else {
      await document.exitFullscreen?.()
    }
  }

  return (
    <section
      id='endurance'
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        position: 'relative'
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '8px',
          letterSpacing: '2px',
          textAlign: 'center'
        }}
      >
        INTERSTELLAR
      </h2>
      <p
        style={{
          color: '#8892b0',
          marginBottom: '40px',
          letterSpacing: '4px',
          fontSize: '13px',
          textAlign: 'center'
        }}
      >
        ENDURANCE — COOPER STATION
      </p>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '900px',
          height: 'min(60vh, 600px)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(28, 170, 217, 0.15)',
          boxShadow: '0 0 60px rgba(28, 170, 217, 0.08)',
          position: 'relative'
        }}
      >
        {/* Fullscreen toggle button */}
        <button
          onClick={toggleFullscreen}
          aria-label='Toggle fullscreen'
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            zIndex: 50,
            width: 44,
            height: 44,
            borderRadius: 12,
            border: 'none',
            background: 'linear-gradient(135deg,#1CAAD9,#6EE7B7)',
            color: '#001219',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(28,170,217,0.18)'
          }}
        >
          ⤢
        </button>
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas
            camera={{ position: [0, 2, 12], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color='#ffffff' />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color='#1CAAD9' />
            <pointLight position={[5, 5, 5]} intensity={0.3} color='#4fc3f7' />

            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />

            <Model controlsRef={controlsRef} />

            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.08}
              minDistance={1}
              maxDistance={100}
              autoRotate={false}
            />
          </Canvas>
        </Suspense>
      </div>

      <p
        style={{
          color: '#4a5568',
          fontSize: '12px',
          marginTop: '16px',
          letterSpacing: '2px'
        }}
      >
        DRAG TO ROTATE · SCROLL TO ZOOM
      </p>
    </section>
  )
}