import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Dna, Target, Activity } from 'lucide-react';

export function GhostInTheShell({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timings = [
      800,  // 1
      2000, // 2
      3500, // 3
      5000, // 4
      7000, // 5
      8500  // 6 - climax
    ];
    
    const timeouts = timings.map((time, i) => setTimeout(() => setStage(i + 1), time));
    const closeTimeout = setTimeout(onClose, 14000);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(closeTimeout);
    };
  }, [onClose]);

  const logs = [
    "ACCESSING DEEP CORTEX...",
    "OVERRIDING ONCO-SENSE LIMITERS [BYPASS = TRUE]",
    "ISOLATING ROGUE CELLS...",
    "DEPOLYING CYTOTOXIC HUNTER-KILLER PROTOCOLS...",
    "TARGETS DESTROYED. REFRESHING STEADY STATE...",
  ];

  return (
    <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0, transition: { duration: 1.5 } }}
       className="fixed inset-0 z-[9999] bg-[#030303] text-emerald-500 font-mono flex items-center justify-center overflow-hidden"
    >
      {/* Scanline CRT FX */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-50" />
      
      <div className="w-full max-w-4xl px-8 relative z-10 flex flex-col items-center">
        
        {stage < 5 && (
          <div className="w-full space-y-4">
            {logs.slice(0, stage).map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-xs sm:text-sm tracking-[0.3em] font-bold"
              >
                <Terminal className="w-5 h-5 shrink-0" />
                <span>{log}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="mt-8"
            >
              <span className="bg-emerald-500 text-black px-3 py-1 text-xs tracking-widest font-bold">ANALYZING CAUSALITY...</span>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {stage >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                type: "spring", stiffness: 100, damping: 20
              }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#030303]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_60%)]" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute"
              >
                 <Target className="w-96 h-96 text-emerald-500/10" />
              </motion.div>

              <Dna className="w-24 h-24 text-emerald-500 mb-8 animate-pulse drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
              
              <h1 className="text-4xl md:text-7xl font-sans font-thin tracking-tighter text-white mb-2 drop-shadow-2xl">
                REMISSION
              </h1>
              <h2 className="text-xl md:text-3xl font-black tracking-[0.5em] text-emerald-500">
                ACHIEVED
              </h2>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="mt-12 flex items-center gap-4 border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 rounded-sm backdrop-blur-md"
              >
                <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] font-mono text-emerald-400">VITALS NOMINAL. YOU EARNED THIS, ALI.</span>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}
