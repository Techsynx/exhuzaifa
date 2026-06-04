"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF, Float } from "@react-three/drei";
import { Box3, Group, PerspectiveCamera, Vector3 } from "three";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon, UserIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

function PlanetModel() {
  const { scene } = useGLTF("/planet/scene.gltf");
  const ref = useRef<Group | null>(null);
  const { camera, size } = useThree();

  useEffect(() => {
    if (!scene) return;

    const box = new Box3().setFromObject(scene);
    const sizeVec = box.getSize(new Vector3());
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
    const target = size.width < 768 ? 2.8 : 3.8;
    const scale = maxDim > 0 ? target / maxDim : 1;

    scene.scale.setScalar(scale);

    const centeredBox = new Box3().setFromObject(scene);
    const center = centeredBox.getCenter(new Vector3());
    scene.position.x += -center.x;
    scene.position.y += -center.y;
    scene.position.z += -center.z;

    const fov = ((camera as PerspectiveCamera).fov * Math.PI) / 180;
    const cameraZ = Math.abs((target / 2) / Math.tan(fov / 2)) * (size.width < 768 ? 2.2 : 1.95);
    camera.position.set(0, 0.1, cameraZ);
    camera.updateProjectionMatrix();
  }, [scene, camera, size.width]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0025;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.15}>
      <primitive ref={ref} object={scene} />
    </Float>
  );
}

function PlanetFallback() {
  return <div className="h-full w-full" />;
}

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // Web3Forms Public Access Key - Users can get their own at https://web3forms.com/
    formData.append("access_key", "17b7edb6-d0af-461f-b19f-d59407576076");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative flex flex-col items-center justify-center py-10 px-4 md:px-6 z-[20]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center"
      >
        <motion.div variants={slideInFromLeft(0.5)} className="relative min-h-[480px] sm:min-h-[620px] lg:min-h-[760px]">
          <div className="absolute inset-0 pointer-events-none bg-transparent" />
          <Suspense fallback={<PlanetFallback />}>
            <Canvas
              shadows
              camera={{ position: [0, 0.1, 10], fov: 45 }}
              gl={{ alpha: true, antialias: true }}
              style={{ background: "transparent", width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.85} />
              <directionalLight position={[8, 10, 5]} intensity={1.4} color="#ffffff" castShadow />
              <pointLight position={[-6, -4, -5]} intensity={0.25} color="#1CAAD9" />

              <PlanetModel />

              <ContactShadows
                position={[0, -1.35, 0]}
                opacity={0.22}
                scale={8}
                blur={3.2}
                far={5}
                resolution={128}
                color="#000000"
              />

              <OrbitControls
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.08}
                enableZoom={false}
                minDistance={1}
                maxDistance={1}
                autoRotate={false}
              />
            </Canvas>
          </Suspense>
        </motion.div>

        <motion.div variants={slideInFromRight(0.8)} className="relative w-full flex flex-col items-stretch">
          {/* Success Overlay */}
          {success && (
            <div className="absolute inset-0 bg-[#030014]/90 z-20 flex flex-col items-center justify-center text-center p-10 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
              <p className="text-gray-400">Huzaifa will get back to you across the cosmic void soon.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-8 text-purple-400 hover:text-purple-300 underline"
              >
                Send another message
              </button>
            </div>
          )}

          <div className="mb-6 text-3xl md:text-[40px] font-bold text-white text-left">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Huzaifa</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Huzaifa Malik"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Phone Number</label>
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="exhuzaifa@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Your Message</label>
              <div className="relative">
                <ChatBubbleBottomCenterTextIcon className="absolute left-4 top-5 w-5 h-5 text-gray-500" />
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="How can we build the future together?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            >
              {isSubmitting ? "Sending to Orbit..." : "Launch Message"}
            </button>
          </form>

        </motion.div>
      </motion.div>
    </section>
  );
};
