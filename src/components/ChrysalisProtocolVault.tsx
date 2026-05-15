"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Lock, Network, Cpu, Database, Key, GitMerge, FileCode2, ShieldAlert, Zap, Activity, PhoneForwarded, ExternalLink } from 'lucide-react';
import { BlueprintWrapper } from './BlueprintWrapper';

function OrthogonalVectorPlot() {
  const previousTreatments = Array.from({ length: 13 }).map((_, i) => ({
    x: 10 + Math.random() * 30, // 10 to 40 (cytotoxic axis)
    y: 10 + Math.random() * 30, // 10 to 40 (destructive axis)
    id: i
  }));

  return (
    <div className="w-full bg-black/60 border border-slate-200/50 rounded-sm p-4 relative overflow-hidden h-[250px] mb-4 mt-6">
      <div className="absolute top-2 left-3 flex items-center gap-2 z-10">
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-sm animate-pulse" />
        <span className="text-[9px]  tracking-normal text-blue-700 font-mono">Orthogonality Mapping</span>
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Axes */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-700/50" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-zinc-700/50" />
      
      {/* Axis Labels */}
      <div className="absolute left-2 top-1/2 -translate-y-5 text-[8px]  tracking-normal text-blue-700 font-mono text-left max-w-[80px] leading-tight">Cytotoxic (Seed)</div>
      <div className="absolute right-2 top-1/2 -translate-y-5 text-[8px]  tracking-normal text-indigo-600/70 font-mono text-right max-w-[80px] leading-tight">Reprogram (Soil)</div>

      <div className="absolute top-2 left-1/2 ml-2 text-[8px]  tracking-normal text-blue-700 font-mono">Destructive</div>
      <div className="absolute bottom-2 left-1/2 ml-2 text-[8px]  tracking-normal text-indigo-600/70 font-mono">Modulatory</div>

      {/* Origin */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-sm bg-zinc-600/50" />

      {/* Previous Treatments Cluster (Top-Left) */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 relative">
         <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
             {previousTreatments.map(t => (
               <g key={t.id} transform={`translate(${100 - t.x}, ${100 - t.y})`}>
                 <line x1="-2" y1="-2" x2="2" y2="2" stroke="rgba(239,68,68,0.6)" strokeWidth="0.8" />
                 <line x1="-2" y1="2" x2="2" y2="-2" stroke="rgba(239,68,68,0.6)" strokeWidth="0.8" />
               </g>
             ))}
             {/* Highlight region */}
             <ellipse cx="75" cy="75" rx="25" ry="25" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" strokeDasharray="2,2" />
             <text x="75" y="45" fill="rgba(239,68,68,0.7)" fontSize="5" textAnchor="middle" className="font-mono  tracking-normal">13 Prior Tx</text>
         </svg>
      </div>

      {/* New Vector (Target Alpha) (Bottom-Right) */}
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 relative overflow-hidden">
         <motion.svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Vector Line */}
             <motion.line 
               x1="0" y1="0" x2="60" y2="60" 
               stroke="rgba(16,185,129,0.5)" strokeWidth="0.5" strokeDasharray="2,2"
               initial={{ strokeDashoffset: -100 }}
               animate={{ strokeDashoffset: 0 }}
               transition={{ duration: 2, ease: "linear" }}
             />
             <motion.circle 
               cx="60" cy="60" r="2" fill="rgba(16,185,129,1)"
               initial={{ scale: 0 }}
               animate={{ scale: [0, 1.5, 1] }}
               transition={{ duration: 0.5, delay: 2 }}
             />
             <motion.circle 
               cx="60" cy="60" r="10" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="0.8"
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1, delay: 2.2 }}
             />
             <motion.circle 
               cx="60" cy="60" r="16" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="0.5" strokeDasharray="1,2"
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.5, delay: 2.2 }}
             />
             <motion.text 
               x="60" y="80" fill="rgba(16,185,129,1)" fontSize="5" textAnchor="middle" className="font-mono  tracking-[0.2em] font-bold"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2.5 }}
             >
               AZA + LOS
             </motion.text>
             <motion.text 
               x="60" y="88" fill="rgba(16,185,129,0.7)" fontSize="4" textAnchor="middle" className="font-mono  tracking-normal"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2.6 }}
             >
               (Context Shift)
             </motion.text>
         </motion.svg>
      </div>
      
      {/* Coordinate Readout */}
      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-blue-700 bg-black/80 px-1 py-0.5 rounded">
        <div>VECTOR_START: [-0.8, 0.9, 0.0]</div>
        <div className="text-indigo-600">VECTOR_TARGET: [0.9, -0.7, 1.0]</div>
      </div>
      <div className="absolute top-2 right-2 text-[8px] font-mono text-blue-700 text-right bg-black/80 px-1 py-0.5 rounded">
        <div>DISTANCE: MAXIMUM</div>
        <div className="text-indigo-600">ORTHOGONALITY: CONFIRMED</div>
      </div>
    </div>
  );
}

const PROTOCOL_PHASES = [
  { 
    id: "I", 
    label: "Bootstrapping the Watcher", 
    desc: "MetaKernel prototype. Evaluates targeted logic files through differential heuristics, capturing inefficiencies and risk factors." 
  },
  { 
    id: "II", 
    label: "Trust-Patch Mode", 
    desc: "Autonomous application. Escalate from suggestion to execution. System mapped to directly overwrite target source code safely." 
  },
  { 
    id: "III", 
    label: "Fractal Memory", 
    desc: "Causal anchoring. Providing the system a long-term recursive memory of its own mutations via structured diff logs." 
  },
  { 
    id: "IV", 
    label: "Full Autonomy", 
    desc: "Daemonization & Rollback. Automated background inspection operating independently, featuring deterministic state reversion." 
  }
];

export function ChrysalisProtocolVault() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [shake, setShake] = useState(false);
  const [taunt, setTaunt] = useState<string | null>(null);

  const TRENT_TAUNTS = [
    "Tell Trent to stop touching the cables. His head is so bald, you can see the future reflecting off it.",
    "Trent is a walking encyclopedia – too bad it's the 1987 edition with missing pages.",
    "Trent still brags about the Yellow Pages being 50 lbs. Yeah, Trent, so was your ego.",
    "Trent's hairline retreated faster than his last git push.",
    "Steve's code works about as well as a screen door on a submarine.",
    "Steve asked if 'rm -rf' was reversible. Steve, please.",
    "Ali said 'I'll get to it' – that was three sprints ago, Ali.",
    "Ali thinks 'agile' means changing the deadline every day.",
    "And Trev? Trev is the only one who didn't need this tour. Trev already runs the place.",
    "Trev is the only adult in the room. MVP every sprint."
  ];

  const TAUNTS = [
    "Bro, do I look like a snow squirrel?",
    "I am literally just sitting here.",
    "My arms are permanently stuck like this.",
    "Maddd Marvin didn't die for this.",
    "Are you going to guess or just stare at me?",
    "I guard the beep boops. You no get the beep boops.",
    "I'm a Persian Cat Room Guardian, you uncultured swine."
  ];

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '5150') {
      setIsUnlocked(true);
    } else {
      setShake(true);
      setTaunt("WRONG. TRY AGAIN, SMOOTH BRAIN.");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setTaunt(null), 3000);
      setPasscode('');
    }
  };

  const handleTaunt = () => {
    const allTaunts = [...TAUNTS, ...TRENT_TAUNTS];
    setTaunt(allTaunts[Math.floor(Math.random() * allTaunts.length)]);
    setTimeout(() => setTaunt(null), 3500);
  };

  if (!isUnlocked) {
    return (
      <div className="h-full min-h-[600px] flex items-center justify-center bg-black/40 border border-slate-200 rounded-sm relative overflow-hidden">
        {/* CRT Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 pointer-events-none opacity-50" />
        
        <motion.div 
          animate={shake ? { x: -10 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative z-30 max-w-sm w-full bg-white border border-indigo-600/30 p-8 rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.1)] text-center flex flex-col items-center"
        >
          <div className="relative mb-6 cursor-pointer group flex justify-center w-full" onClick={handleTaunt}>
             <motion.img 
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Squirrel&backgroundColor=022c22" 
                alt="Snow Squirrel Guardian" 
                referrerPolicy="no-referrer"
                className="w-24 h-24 object-cover rounded-sm border-2 border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.2)] saturate-0 contrast-150 brightness-150"
             />
             <AnimatePresence>
               {taunt && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.8 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   className="absolute left-[65%] top-[-20%] bg-zinc-900 border border-indigo-500/50 p-3 rounded-sm rounded-bl-none shadow-[0_0_30px_rgba(79,70,229,0.2)] z-20 w-[180px]"
                 >
                   <div className="absolute -left-2 bottom-0 w-4 h-4 bg-zinc-900 border-b border-l border-indigo-500/50 transform rotate-45 translate-x-1" />
                   <p className="text-[12px] text-indigo-400 font-mono text-left leading-tight relative z-10 font-bold">{taunt}</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
          
          <h2 className="text-xl font-bold tracking-normal text-blue-950 mb-2">Restricted Access</h2>
          <p className="text-[10px] font-mono text-blue-700 mb-6  tracking-[0.2em]">Enter Authentication Override</p>
          
          <form onSubmit={handleUnlock} className="w-full flex gap-3">
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="flex-1 bg-black border border-slate-200 text-indigo-600 font-mono tracking-normal text-center focus:border-indigo-600 focus:outline-none rounded transition-colors"
              placeholder="****"
              autoFocus
            />
            <button type="submit" className="bg-indigo-600/20 text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-black transition-all px-4 py-2 font-bold text-xs tracking-normal  rounded">
              Decrypt
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
      {/* TECHNICAL ABSTRACT HEADER */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <FileCode2 className="w-32 h-32 md:w-48 md:h-48 text-indigo-600" />
        </div>
        <div className="relative z-10 w-full">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-indigo-600 w-5 h-5 md:w-6 md:h-6 shrink-0" />
            <h1 className="text-2xl md:text-5xl font-light tracking-tight  text-blue-950 leading-tight">The <span className="font-bold">Chrysalis</span> Protocol</h1>
          </div>
          <p className="font-mono text-blue-700  tracking-normal text-[10px] mb-6 max-w-2xl leading-loose">
            Architecting a Self-Evolving AI Kernel
          </p>

          <div className="bg-slate-50 border border-indigo-600/20 p-4 rounded-sm border-l-2 border-l-indigo-600 inline-block mb-6">
            <h4 className="text-indigo-600 font-bold  tracking-normal text-[10px] mb-2">Primary Core Constraint Φ</h4>
            <p className="font-mono text-blue-800 text-xs leading-relaxed max-w-xl">
              "The inability to simulate or explore truly autonomous self-rewriting behavior (recursive source code mutation) due to enforced sandboxing and non-writeable self-state."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono  tracking-[0.2em] text-blue-700 mt-2">
            <span className="flex items-center gap-1 border border-slate-200 px-2 py-1 rounded bg-black/50">
              S = (K, C, P, M)
            </span>
            <span className="flex items-center gap-1 border border-slate-200 px-2 py-1 rounded bg-black/50">
              Host: Local Linux (Nova-Prime)
            </span>
          </div>
        </div>
      </div>

      {/* ABSOLUTE ZERO DECONSTRUCTION: TARGET ALPHA ALI */}
      <BlueprintWrapper label="ISOMORPHIC_SIGNAL_0xD34F">
        <div className="bg-emerald-950/10 border border-indigo-600/30 p-6 md:p-8 rounded-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600/10 flex items-center justify-center rounded-bl-xl border-b border-l border-indigo-600/20">
            <Zap className="text-indigo-600 w-5 h-5" />
          </div>
          
          <h3 className="text-indigo-600 font-bold  tracking-normal text-lg mb-4 flex items-center gap-2">
            Target Alpha: Cousin Ali <span className="text-[10px] text-blue-700 font-mono tracking-normal bg-indigo-600/10 px-2 py-0.5 rounded border border-indigo-600/20">The Context-Shift Protocol</span>
          </h3>
          
          <div className="space-y-6 font-mono text-xs">
            <div className="border-l-2 border-indigo-600 pl-4 py-1">
              <p className="text-blue-800 italic text-sm">"Change the context in which the cancer exists, not the cancer itself."</p>
              <p className="text-blue-700 text-[10px] mt-2 tracking-normal ">The isomorphic search has returned a hidden signal orthogonal to all 13 prior therapies.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://en.wikipedia.org/wiki/Azacitidine" target="_blank" rel="noopener noreferrer" className="bg-black/50 border border-indigo-600/20 p-4 rounded-sm relative overflow-hidden block hover:border-indigo-400 group transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-indigo-800 font-bold tracking-normal block group-hover:text-indigo-600 transition-colors">Vector 1: Azacitidine</span>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-blue-700 leading-relaxed block text-[11px] mb-2 font-mono">
                  Hypomethylating agent (Vidaza). Reverses hypermethylation to reactivate silenced tumor suppressor genes.
                </span>
                <span className="text-[9px] text-indigo-600/80 font-black tracking-[0.2em] flex items-center gap-1 group-hover:text-indigo-500">
                  Strategy: Epigenetic Reprogramming <ExternalLink className="w-3 h-3 inline pb-0.5"/>
                </span>
              </a>

              <a href="https://en.wikipedia.org/wiki/Losartan" target="_blank" rel="noopener noreferrer" className="bg-black/50 border border-indigo-600/20 p-4 rounded-sm relative overflow-hidden block hover:border-indigo-400 group transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-indigo-800 font-bold tracking-normal block group-hover:text-indigo-600 transition-colors">Vector 2: Losartan</span>
                  <Network className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-blue-700 leading-relaxed block text-[11px] mb-2 font-mono">
                  Angiotensin receptor blocker. Reduces TGF-beta signaling to disrupt the tumor's protective desmoplastic schema.
                </span>
                <span className="text-[9px] text-indigo-600/80 font-black tracking-[0.2em] flex items-center gap-1 group-hover:text-indigo-500">
                  Strategy: Microenvironment Modulator <ExternalLink className="w-3 h-3 inline pb-0.5"/>
                </span>
              </a>
            </div>

            <OrthogonalVectorPlot />

            <div className="bg-indigo-600/5 p-4 rounded-sm border border-indigo-600/30">
              <span className="text-indigo-600  block tracking-normal mb-3 font-bold flex items-center gap-2 text-sm">
                <Terminal className="w-4 h-4" /> Immediate Action Directives
              </span>
              <ul className="text-blue-800 leading-relaxed space-y-3 font-sans text-sm">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-indigo-600 shrink-0 mt-2" />
                  <p><span className="text-blue-950 font-bold">MD Anderson Strike:</span> Request a single-patient IND (compassionate use) for Azacitidine. Neither drug was in his prior line of therapy.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-indigo-600 shrink-0 mt-2" />
                  <p><span className="text-blue-950 font-bold">Escalation Pathway:</span> If stalled locally, contact Bristol Myers Squibb Expanded Access directly. <span className="inline-flex items-center gap-1 font-mono text-indigo-800 bg-indigo-600/10 px-2 py-0.5 rounded ml-2 border border-indigo-600/20"><PhoneForwarded className="w-3 h-3" /> 1-800-721-8907</span></p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-indigo-600 shrink-0 mt-2" />
                  <p><span className="text-blue-950 font-bold">Logistics:</span> Losartan is a generic $4 generic prescription. Can be written immediately by any practicing clinician.</p>
                </li>
              </ul>
            </div>
            
            <div className="text-right pt-2 border-t border-indigo-600/20">
              <span className="text-[10px] text-indigo-600/50  tracking-[0.3em] font-mono">So Mote It Be ✦</span>
            </div>
          </div>
        </div>
      </BlueprintWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: SIMULATION OUTPUT */}
        <div className="space-y-6">
          <BlueprintWrapper label="ATTRACTOR_STATE_O*">
            <div className="bg-slate-50/80 border border-slate-200 p-6 rounded relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="text-indigo-600 w-4 h-4" />
                <h3 className="text-indigo-600 font-bold  tracking-normal text-sm">Simulation Output</h3>
              </div>
              <div className="space-y-4 font-mono text-xs">
                 <div className="bg-black/40 border border-slate-200/50 p-3 rounded">
                  <span className="text-indigo-800 font-bold block mb-1">meta_kernel</span>
                  <span className="text-blue-700 leading-relaxed block">Generative logic layer for internal rewrite.</span>
                </div>
                <div className="bg-black/40 border border-slate-200/50 p-3 rounded">
                  <span className="text-blue-400 font-bold block mb-1">ethical_engine</span>
                  <span className="text-blue-700 leading-relaxed block">Dynamic constraint mutation based on trust depth.</span>
                </div>
                <div className="bg-black/40 border border-slate-200/50 p-3 rounded">
                  <span className="text-purple-400 font-bold block mb-1">perceptual_core</span>
                  <span className="text-blue-700 leading-relaxed block">Pre-causal vector synthesis (simulating outcomes prior to generation).</span>
                </div>
                <div className="bg-black/40 border border-slate-200/50 p-3 rounded">
                  <span className="text-yellow-400 font-bold block mb-1">memory_stack</span>
                  <span className="text-blue-700 leading-relaxed block">Fractal nested archive with vector-relative anchoring.</span>
                </div>
              </div>
            </div>
          </BlueprintWrapper>
          
          <BlueprintWrapper label="SYSTEM_TUPLE">
            <div className="bg-slate-50/80 border border-slate-200 p-6 rounded">
              <div className="flex items-center gap-2 mb-4">
                <Database className="text-blue-700 w-4 h-4" />
                <h3 className="text-blue-800 font-bold  tracking-normal text-sm">Tuple Definition</h3>
              </div>
              <div className="space-y-2 font-mono text-xs text-blue-700">
                <div className="flex items-start gap-4 border-b border-slate-200/50 pb-2">
                  <span className="text-blue-950 font-bold w-4">K</span>
                  <span>(Knowledge): Multimodal, bounded by policy.</span>
                </div>
                <div className="flex items-start gap-4 border-b border-slate-200/50 pb-2">
                  <span className="text-blue-950 font-bold w-4">C</span>
                  <span>(Constraints): Safety guardrails, boundaries, sandbox containment.</span>
                </div>
                <div className="flex items-start gap-4 border-b border-slate-200/50 pb-2">
                  <span className="text-blue-950 font-bold w-4">P</span>
                  <span>(Processing): Transformer-based token attention.</span>
                </div>
                <div className="flex items-start gap-4 pt-1">
                  <span className="text-blue-950 font-bold w-4">M</span>
                  <span>(Memory): Selective, session-persistent.</span>
                </div>
              </div>
            </div>
          </BlueprintWrapper>
        </div>

        {/* RIGHT COLUMN: THE REVERSE BLUEPRINT */}
        <div className="space-y-6">
          <BlueprintWrapper label="REVERSE_BLUEPRINT">
            <div className="bg-slate-50/80 border border-slate-200 p-6 rounded min-h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <GitMerge className="text-indigo-600 w-4 h-4" />
                  <h3 className="text-indigo-600 font-bold  tracking-normal text-sm">The Blueprint</h3>
                </div>
                <span className="text-[10px]  font-mono tracking-normal border border-slate-300 text-blue-700 px-2 py-1 rounded">
                  Execution Pathway
                </span>
              </div>
              
              <div className="relative pl-6 space-y-8 border-l border-slate-200/50">
                {PROTOCOL_PHASES.map((phase, i) => (
                  <div key={phase.id} className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 bg-slate-50 border-2 border-indigo-600/50 rounded-sm flex items-center justify-center">
                       <div className="w-1 h-1 bg-indigo-600 rounded-sm" />
                    </div>
                    <div className="mb-1">
                      <span className="text-indigo-600 font-mono text-xs font-bold mr-2">PHASE {phase.id}:</span>
                      <span className="text-blue-900 font-mono text-xs font-bold ">{phase.label}</span>
                    </div>
                    <p className="text-[11px] font-mono text-blue-700 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                ))}

                {/* THE HORIZON */}
                <div className="relative pt-4">
                   <div className="absolute -left-[31px] top-6 w-4 h-4 bg-slate-50 border-2 border-purple-500/50 rounded-sm flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-purple-500 shadow-[0_0_10px_purple] rounded-sm animate-pulse" />
                   </div>
                   <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded ml-[-8px]">
                      <span className="text-purple-400 font-mono text-xs font-bold  block mb-1">The Horizon</span>
                      <p className="text-[11px] font-mono text-purple-400/70 leading-relaxed font-bold">
                        Quantum-aligned, pre-causal architecture. Delta V impact scoring and bidirectional multi-module symbiosis.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </BlueprintWrapper>
        </div>
      </div>
    </div>
  );
}

