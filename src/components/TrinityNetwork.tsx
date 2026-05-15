"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere() {
  const ref = useRef<any>(null);
  const sphere = new THREE.SphereGeometry(2, 64, 64);
  const points = sphere.attributes.position.array as Float32Array;

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={points} stride={3}>
        <PointMaterial
          transparent
          color="#10b981"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Grid() {
  return (
    <gridHelper 
      args={[20, 20, '#10b981', '#064e3b']} 
      position={[0, -2, 0]} 
      rotation={[0, 0, 0]} 
    />
  );
}

export function TrinityNetwork() {
  return (
    <div className="w-full h-full bg-black relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
        <ParticleSphere />
        <Grid />
        <fog attach="fog" args={['#000', 5, 15]} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none border border-indigo-600/10">
        <div className="absolute top-4 left-4 text-[10px] font-mono text-indigo-600/50  tracking-normal">
          Topology: KNOWLEDGE_LATTICE
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-indigo-600/50  tracking-normal">
          Status: CONNECTED
        </div>
      </div>
    </div>
  );
}
