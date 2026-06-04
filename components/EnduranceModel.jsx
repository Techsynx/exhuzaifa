"use client"

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

function Model({ controlsRef, rotateEnabled }) {
  const { scene } = useGLTF('/models/endurance/endurance.glb')
  const ref = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (!scene) return

    // compute bounds
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    // desired visible size (scene units)
    const desired = 4
    const scale = maxDim > 0 ? desired / maxDim : 1
    scene.scale.setScalar(scale)

    // center model at origin
    const box2 = new Box3().setFromObject(scene)
    const center = box2.getCenter(new Vector3())
    scene.position.x += -center.x
    scene.position.y += -center.y
    scene.position.z += -center.z

    // position camera to fit the scaled model
    const fov = (camera.fov * Math.PI) / 180
    const cameraZ = Math.abs((desired / 2) / Math.tan(fov / 2)) * 1.6
    camera.position.set(0, desired * 0.25, cameraZ)
    camera.updateProjectionMatrix()

    if (controlsRef && controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
      controlsRef.current.saveState && controlsRef.current.saveState()
    }
  }, [scene, camera, controlsRef])

  useFrame(() => {
    if (ref.current && rotateEnabled) ref.current.rotation.y += 0.003
  })

  return <primitive ref={ref} object={scene} />
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
  const [rotateEnabled, setRotateEnabled] = useState(true)

  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      try {
        await el.requestFullscreen?.()
      } catch (e) {
        // ignore
      }
    } else {
      await document.exitFullscreen?.()
    }
  }

  const resetView = () => {
    if (controlsRef && controlsRef.current) {
      controlsRef.current.reset && controlsRef.current.reset()
      controlsRef.current.update()
    }
  }

  return (
    <section
      id="endurance"
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
        {/* Controls toolbar */}
        <div style={{ position: 'absolute', left: 12, bottom: 12, zIndex: 60, display: 'flex', gap: 8 }}>
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            style={{
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

          <button
            onClick={() => setRotateEnabled((v) => !v)}
            aria-label="Toggle rotation"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: 'none',
              background: rotateEnabled ? '#e2e8f0' : '#101219',
              color: rotateEnabled ? '#001219' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(0,0,0,0.18)'
            }}
          >
            ⟳
          </button>

          <button
            onClick={resetView}
            aria-label="Reset view"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: 'none',
              background: '#fff',
              color: '#001219',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
            }}
          >
            ⤾
          </button>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <Canvas
            camera={{ position: [0, 2, 12], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.0} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.4} color="#1CAAD9" />
            <pointLight position={[5, 5, 5]} intensity={0.25} color="#4fc3f7" />

            <Model controlsRef={controlsRef} rotateEnabled={rotateEnabled} />

            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.08}
              minDistance={0.5}
              maxDistance={200}
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
