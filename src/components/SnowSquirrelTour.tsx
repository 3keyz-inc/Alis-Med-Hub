"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// A procedural, primitive-based 3D Mechanical Snow Squirrel
function SquirrelModel(props: any) {
  const group = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Smooth lookAt interaction
      const target = new THREE.Vector3(
        (state.pointer.x * state.viewport.width) / 4,
        (state.pointer.y * state.viewport.height) / 4,
        5
      );
      const dummy = new THREE.Object3D();
      dummy.position.copy(group.current.position);
      dummy.lookAt(target);
      group.current.quaternion.slerp(dummy.quaternion, 0.1);
      
      // Hovering
      group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }

    // Rotate holographic rings
    if (ringRef1.current) {
      ringRef1.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringRef1.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -state.clock.elapsedTime * 0.4;
      ringRef2.current.rotation.z = state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <group {...props} dispose={null}>
      
      {/* Floating Holographic Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh ref={ringRef2}>
        <torusGeometry args={[1.3, 0.01, 16, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.5} />
      </mesh>

      <group ref={group}>
        {/* Tactical Body - angular, sharp */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
        
        {/* Chest Armor Plate */}
        <mesh position={[0, 0.1, 0.22]}>
          <boxGeometry args={[0.4, 0.5, 0.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.3} />
        </mesh>
        
        {/* Glowing Core */}
        <mesh position={[0, 0.15, 0.28]}>
          <boxGeometry args={[0.15, 0.15, 0.05]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        
        {/* Head - angular */}
        <mesh position={[0, 0.55, 0.1]}>
          <boxGeometry args={[0.4, 0.35, 0.4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Cyber Visor */}
        <mesh position={[0, 0.6, 0.32]}>
          <boxGeometry args={[0.45, 0.12, 0.1]} />
          <meshStandardMaterial color="#000000" emissive="#10b981" emissiveIntensity={2} />
        </mesh>

        {/* Tactical Ears (Antennas) */}
        <mesh position={[-0.15, 0.8, 0.0]} rotation={[0, 0, 0.2]}>
           <boxGeometry args={[0.04, 0.3, 0.04]} />
           <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.15, 0.95, 0.0]} rotation={[0, 0, 0.2]}>
           <boxGeometry args={[0.02, 0.1, 0.02]} />
           <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
        </mesh>

        <mesh position={[0.15, 0.8, 0.0]} rotation={[0, 0, -0.2]}>
           <boxGeometry args={[0.04, 0.3, 0.04]} />
           <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.15, 0.95, 0.0]} rotation={[0, 0, -0.2]}>
           <boxGeometry args={[0.02, 0.1, 0.02]} />
           <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
        </mesh>

        {/* Mechanical / Segmented Tail */}
        <group position={[0, -0.2, -0.2]} rotation={[-0.6, 0, 0]}>
          <mesh position={[0, 0.3, -0.1]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.15, 0.6, 0.15]} />
            <meshStandardMaterial color="#ffffff" metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.7, -0.15]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.15, 0.5, 0.15]} />
            <meshStandardMaterial color="#ffffff" metalness={0.2} />
          </mesh>
          <mesh position={[0, 1.05, -0.25]} rotation={[0.7, 0, 0]}>
            <boxGeometry args={[0.1, 0.3, 0.1]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1} />
          </mesh>
        </group>

        {/* Robot Arms */}
        <mesh position={[-0.3, 0.1, 0.1]} rotation={[0.2, 0, 0.3]}>
           <boxGeometry args={[0.1, 0.4, 0.1]} />
           <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.3, 0.1, 0.1]} rotation={[0.2, 0, -0.3]}>
           <boxGeometry args={[0.1, 0.4, 0.1]} />
           <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

const TOUR_STEPS = [
  {
    target: "none",
    text: "👋 Hi Ali, I'm your Snow Squirrel assistant. Let's get your Treatment Hub ready.",
  },
  {
    target: "import",
    text: "❄️ To give you the most accurate and true treatment paths, I need data. Head over to the 'Data Import' section.",
  },
  {
    target: "import",
    text: "🗣️ Please import your Clinical Records, Genomic Data, and any Metabolic tracking files you have.",
  },
  {
    target: "none",
    text: "💥 Once you've uploaded your medical history, I will analyze the clinical literature and map out your best options.",
  },
  {
    target: "research",
    text: "📚 I will continuously track clinical trials and organize your lifestyle so you can live the best way possible.",
  },
  {
    target: "none",
    text: "🔁 Let's get started. Feel free to chat with me in the bottom left anytime!",
  }
];

export function SnowSquirrelTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  // Trigger tour automatically on mount
  useEffect(() => {
    try {
      const hasSeenTour = window.localStorage.getItem('hasSeenTour');
      if (!hasSeenTour) {
        setTimeout(() => setIsOpen(true), 1500);
        window.localStorage.setItem('hasSeenTour', 'true');
      }
    } catch (e) {
      // Fallback if local storage is unavailable
      setTimeout(() => setIsOpen(true), 1500);
    }

    const handleRestartTourEvent = () => {
      setStep(0);
      setIsOpen(true);
    };

    window.addEventListener('restart-tour', handleRestartTourEvent);
    return () => window.removeEventListener('restart-tour', handleRestartTourEvent);
  }, []);

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setIsOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[9998]">
        <button 
          onClick={handleRestart}
          className="h-12 w-12 rounded-sm border border-indigo-600/50 bg-white/90 flex items-center justify-center shadow-lg hover:border-indigo-500 hover:scale-110 transition-all duration-300 group"
          title="Summon Guide"
        >
          <div className="w-4 h-4 bg-indigo-600/20 group-hover:bg-indigo-600/50 rounded-sm absolute" />
          <div className="w-2 h-2 bg-indigo-600 rounded-sm animate-pulse z-10" />
          <span className="absolute -top-6 text-[8px] font-mono text-indigo-600 font-bold tracking-normal opacity-0 group-hover:opacity-100 transition-opacity ">Init</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9999] flex flex-col md:flex-row items-end gap-4 max-w-xl w-full"
          >
            {/* Dialogue Bubble */}
            <div className="bg-white/90 backdrop-blur-xl border border-indigo-600/50 rounded-sm p-4 md:p-6 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex-1 relative order-2 md:order-1 before:absolute before:inset-0 before:bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] before:bg-[size:10px_10px] before:pointer-events-none before:z-0">
              {/* Arrow pointing to squirrel */}
              <div className="absolute -bottom-3 right-8 w-6 h-6 bg-white border-b border-r border-indigo-600/50 rotate-45 transform md:hidden z-10" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white border-t border-r border-indigo-600/50 rotate-45 transform -translate-y-1/2 hidden md:block z-10" />

              <div className="flex items-center justify-between mb-4 relative z-10 border-b border-indigo-600/20 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-sm animate-ping" />
                  <span className="text-[10px] font-mono tracking-[0.2em] text-indigo-600  font-bold">Snow Squirrel <span className="text-blue-700">v2.0</span></span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-zinc-700" />
                  <div className="w-1 h-1 bg-zinc-700" />
                  <div className="w-1 h-1 bg-indigo-600" />
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-slate-800 text-sm font-sans leading-relaxed mb-6 min-h-[60px] border-l-2 border-indigo-600/30 pl-3">
                  {TOUR_STEPS[step].text}
                </p>
              </div>

              <div className="flex justify-between items-center mt-2 relative z-10 bg-slate-50 p-2 border border-slate-200 rounded-sm">
                <span className="text-[10px] text-indigo-700 font-mono tracking-normal">{step + 1} / {TOUR_STEPS.length}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 text-[9px] tracking-normal font-mono text-indigo-700 hover:text-indigo-900 transition-colors"
                  >
                    Skip Tour
                  </button>
                  <button 
                    onClick={handleNext}
                    className="px-6 py-1.5 bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-sm text-[9px] font-bold tracking-normal hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                    {step === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </div>

            {/* 3D Component Container */}
            <div className="w-[180px] h-[180px] bg-white/80 border border-indigo-600/50 rounded-sm relative overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] order-1 md:order-2 self-end group cursor-crosshair wild-squirrel">
              <div className="absolute top-2 left-2 flex gap-1 z-10 mix-blend-screen hair-wild">
                <div className="w-1 h-4 bg-indigo-600/50" />
                <div className="w-1 h-4 bg-indigo-600/20" />
              </div>
              <div className="absolute bottom-2 right-2 flex gap-1 z-10 mix-blend-screen">
                <div className="w-4 h-1 bg-indigo-600/20" />
                <div className="w-4 h-1 bg-indigo-600/50" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
              <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                  <SquirrelModel />
                </Float>
                <Environment preset="night" />
                <ContactShadows position={[0, -1, 0]} opacity={0.8} scale={5} blur={2} far={4} color="#10b981" />
              </Canvas>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
