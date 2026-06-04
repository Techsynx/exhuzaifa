'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/models/endurance/endurance.glb')
  const ref = useRef()

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
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '500px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(28, 170, 217, 0.15)',
          boxShadow: '0 0 60px rgba(28, 170, 217, 0.08)',
          position: 'relative'
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas
            camera={{ position: [0, 2, 8], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color='#ffffff' />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color='#1CAAD9' />
            <pointLight position={[5, 5, 5]} intensity={0.3} color='#4fc3f7' />

            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />

            <Model />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={4}
              maxDistance={15}
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