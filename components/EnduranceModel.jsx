"use client"

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Float } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

function Model({ controlsRef }) {
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
    const desired = 3
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
    if (ref.current) ref.current.rotation.y += 0.003
  })

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.12}>
      <primitive ref={ref} object={scene} />
    </Float>
  )
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
  const controlsRef = useRef(null)

  return (
    <section
      id="endurance"
      style={{
        width: '100%',
        minHeight: '70vh',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          shadows
          camera={{ position: [0, 1.75, 10], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent', width: '100%', height: '100%', minHeight: '70vh' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 12, 6]} intensity={1.2} color="#ffffff" castShadow />
          <pointLight position={[-8, -6, -5]} intensity={0.35} color="#1CAAD9" />

          <Model controlsRef={controlsRef} />

          <ContactShadows
            position={[0, -1.75, 0]}
            opacity={0.24}
            scale={8}
            blur={2.8}
            far={4}
            resolution={256}
            color="#000000"
          />

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
    </section>
  )
}
