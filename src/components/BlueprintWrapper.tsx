"use client";
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BlueprintMetadata {
  latency?: string;
  load?: string;
  checksum?: string;
  version?: string;
}

export function BlueprintWrapper({ children, label, metadata }: { children: ReactNode, label: string, metadata?: BlueprintMetadata }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="relative group cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none bg-blue-900/10 border border-blue-500/30 backdrop-blur-[1px] overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 blueprint-grid opacity-20" />
            <div className="absolute top-2 left-2 bg-blue-600 text-[8px] text-white px-1.5 py-0.5 font-mono uppercase font-black tracking-tighter shadow-lg">SPEC_ID: {label}</div>
            <div className="absolute top-2 right-2 flex flex-col items-end gap-0.5 opacity-60">
              <span className="text-[7px] font-mono text-blue-400 uppercase">LATENCY: {metadata?.latency || "4ms"}</span>
              <span className="text-[7px] font-mono text-blue-400 uppercase">LOAD: {metadata?.load || "0.02%"}</span>
            </div>
            <div className="absolute bottom-2 left-2 text-blue-400 text-[8px] font-mono font-bold flex flex-col">
              <span>H-FREQ: 44.1kHz</span>
              <span>V-SYNC: LOCKED</span>
            </div>
            <div className="absolute bottom-2 right-2 text-blue-400 text-[8px] font-mono font-extrabold uppercase bg-blue-900/40 px-1 border border-blue-500/20">
              CHKSUM: {metadata?.checksum || "0x7F4A"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
