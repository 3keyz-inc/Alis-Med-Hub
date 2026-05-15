"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Beaker, Brain, Database, RefreshCw, Zap } from 'lucide-react';
import { BlueprintWrapper } from './BlueprintWrapper';

const MOCK_RESEARCH_CONCEPTS = [
  "CRISPR targeted delivery vectors for solid tumors",
  "Metabolic reprogramming in cancer stem cells",
  "Nanoparticle-mediated immunotherapy enhancements",
  "AI-driven protein folding for novel antibodies",
  "Gut microbiome impact on systemic inflammation",
  "Neuroplasticity induced by transcranial magnetic stimulation",
  "Telomere lengthening via reverse transcriptase activation",
  "Epigenetic clock reversal using senolytics",
  "Synthetic blood substitutes with enhanced oxygen capacity",
  "Quantum dot imaging for real-time cellular tracking"
];

const MOCK_INSIGHTS = [
  "Efficacy variance detected (+14.2% over baseline).",
  "Anomaly identified in control group; re-evaluating parameters.",
  "Synergistic interaction observed in combination therapy.",
  "Pathway suppression confirmed in vitro.",
  "Toxicity limits pushed, recommend new dosage constraints."
];

interface ResearchUpdate {
  id: string;
  timestamp: number;
  concept: string;
  insight: string;
  type: 'discovery' | 'analysis' | 'synthesis';
  confidence: number;
  link: string;
}

export function AutomatedResearchSystem() {
  const [updates, setUpdates] = useState<ResearchUpdate[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial updates
    const initialUpdates: ResearchUpdate[] = Array.from({ length: 3 }).map((_, i) => ({
      id: `ini-${Date.now()}-${i}`,
      timestamp: Date.now() - (3 - i) * 15000,
      concept: MOCK_RESEARCH_CONCEPTS[Math.floor(Math.random() * MOCK_RESEARCH_CONCEPTS.length)],
      insight: MOCK_INSIGHTS[Math.floor(Math.random() * MOCK_INSIGHTS.length)],
      type: ['discovery', 'analysis', 'synthesis'][Math.floor(Math.random() * 3)] as any,
      confidence: 70 + Math.floor(Math.random() * 29),
      link: 'https://clinicaltrials.gov/'
    }));
    setUpdates(initialUpdates.reverse());

    const interval = setInterval(() => {
      setUpdates(prev => {
        const newUpdate: ResearchUpdate = {
          id: `upd-${Date.now()}`,
          timestamp: Date.now(),
          concept: MOCK_RESEARCH_CONCEPTS[Math.floor(Math.random() * MOCK_RESEARCH_CONCEPTS.length)],
          insight: MOCK_INSIGHTS[Math.floor(Math.random() * MOCK_INSIGHTS.length)],
          type: ['discovery', 'analysis', 'synthesis'][Math.floor(Math.random() * 3)] as any,
          confidence: 80 + Math.floor(Math.random() * 19),
          link: 'https://clinicaltrials.gov/'
        };
        // Keep only last 10
        return [newUpdate, ...prev].slice(0, 10);
      });
      
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 500);
      
    }, 8000 + Math.random() * 4000); // Every 8-12 seconds

    return () => clearInterval(interval);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discovery': return <Zap className="text-indigo-600 w-4 h-4" />;
      case 'analysis': return <Activity className="text-blue-500 w-4 h-4" />;
      case 'synthesis': return <Beaker className="text-purple-500 w-4 h-4" />;
      default: return <Brain className="text-blue-700 w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-50/30 border border-slate-200 rounded-sm p-4 md:p-6 h-full flex flex-col relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-indigo-600 shrink-0" />
          <h2 className="text-lg md:text-xl font-light tracking-tight ">Automated Treatment <span className="font-bold">Finder</span></h2>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-[10px] font-mono tracking-normal  text-indigo-600">Live Gathering</span>
          <motion.div
            animate={{ rotate: isProcessing ? 360 : 0 }}
            transition={{ duration: 1, repeat: isProcessing ? Infinity : 0, ease: "linear" }}
          >
            <RefreshCw className={`w-4 h-4 ${isProcessing ? 'text-indigo-600' : 'text-blue-700'}`} />
          </motion.div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 relative z-10" ref={containerRef}>
        <AnimatePresence mode="popLayout">
          {updates.map((update) => (
            <motion.div
              key={update.id}
              layout
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <BlueprintWrapper label={`LOG_${new Date(update.timestamp).getTime().toString().slice(-6)}`}>
                <a 
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-slate-200/50 bg-white/80 p-3 rounded group hover:border-indigo-600/30 transition-colors block cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(update.type)}
                      <span className="text-[10px] font-mono tracking-normal text-blue-700 ">
                        {update.type}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-700">
                      {new Date(update.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-blue-900 mb-1 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
                    {update.concept}
                  </h4>
                  
                  <p className="text-[11px] font-mono text-blue-700 mb-2 leading-relaxed">
                    &gt; {update.insight}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/50">
                    <div className="h-1 flex-1 bg-slate-200 rounded overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${update.confidence}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-indigo-600" 
                      />
                    </div>
                    <span className="text-[9px] font-mono text-indigo-600 font-bold tracking-normal">
                      {update.confidence}% CONF
                    </span>
                  </div>
                </a>
              </BlueprintWrapper>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
