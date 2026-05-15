"use client";
import React, { useState } from 'react';
import { Network, Microscope, FileText, ChevronRight, Activity, Database, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlueprintWrapper } from './BlueprintWrapper';

const MARKERS = [
  { id: 'TP53', label: 'TP53 Mutation', category: 'Genomic' },
  { id: 'BRAF', label: 'BRAF V600E', category: 'Genomic' },
  { id: 'KRAS', label: 'KRAS G12C', category: 'Genomic' },
  { id: 'CD8', label: 'CD8+ T-Cell Exhaustion', category: 'Immunological' },
  { id: 'MYC', label: 'MYC Amplification', category: 'Genomic' },
  { id: 'MTOR', label: 'mTOR Overactivation', category: 'Metabolic' },
];

const CLINICAL_DATA: Record<string, { papers: any[], trials: any[] }> = {
  'TP53': {
    papers: [
      { id: 'P01', title: 'p53 Reactivation Strategies in Refractory Solid Tumors', year: 2025, journal: 'Nature Oncology', citations: 412, link: 'https://pubmed.ncbi.nlm.nih.gov/' },
      { id: 'P02', title: 'Targeting the TP53-MDM2 Interaction via Nano-delivery', year: 2026, journal: 'Cell', citations: 89, link: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    trials: [
      { id: 'NCT082214', phase: 'Phase II', status: 'Recruiting', title: 'APR-246 in Combination with Pembrolizumab for Mutant p53 Solid Tumors', location: 'MD Anderson', link: 'https://clinicaltrials.gov/study/NCT082214' },
      { id: 'NCT089921', phase: 'Phase I/II', status: 'Active', title: 'CAR-T Cell Therapy Targeting p53 Neoantigens', location: 'Memorial Sloan Kettering', link: 'https://clinicaltrials.gov/study/NCT089921' },
    ]
  },
  'BRAF': {
    papers: [
      { id: 'P03', title: 'Overcoming Resistance to BRAF Inhibitors', year: 2025, journal: 'Lancet Oncology', citations: 215, link: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    trials: [
      { id: 'NCT091223', phase: 'Phase III', status: 'Enrolling By Invitation', title: 'Combination BRAF/MEK Inhibition vs Monotherapy', location: 'Multi-center', link: 'https://clinicaltrials.gov/study/NCT091223' },
    ]
  },
  'KRAS': {
    papers: [
      { id: 'P04', title: 'Next-Generation KRAS G12C Inhibitors', year: 2026, journal: 'Science', citations: 65, link: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    trials: [
      { id: 'NCT088192', phase: 'Phase II', status: 'Recruiting', title: 'Sotorasib Efficacy in Refractory Patient Populations', location: 'Dana-Farber', link: 'https://clinicaltrials.gov/study/NCT088192' },
    ]
  },
  'CD8': {
    papers: [
      { id: 'P05', title: 'Reversing T-Cell Exhaustion via Epigenetic Modifiers', year: 2025, journal: 'Immunology Today', citations: 156, link: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    trials: [
      { id: 'NCT077122', phase: 'Phase I', status: 'Active', title: 'TIGIT Inhibitor in Conjunction with Anti-PD-1', location: 'Johns Hopkins', link: 'https://clinicaltrials.gov/study/NCT077122' },
    ]
  },
  'MYC': {
    papers: [
      { id: 'P06', title: 'Direct Targeting of MYC: A Synthetic Lethality Approach', year: 2024, journal: 'Cancer Discovery', citations: 521, link: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    trials: [
      { id: 'NCT065431', phase: 'Phase I', status: 'Recruiting', title: 'MYC-Inhibitory Peptides in Advanced Malignancies', location: 'UCSF', link: 'https://clinicaltrials.gov/study/NCT065431' },
    ]
  },
  'MTOR': {
    papers: [
      { id: 'P07', title: 'Dual mTORC1/2 Inhibitors in Metabolic Rewiring', year: 2026, journal: 'Cell Metabolism', citations: 94, link: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    trials: [
      { id: 'NCT094333', phase: 'Phase II', status: 'Active', title: 'Sirolimus and Metformin combination for mTOR hyperactivation', location: 'Mayo Clinic', link: 'https://clinicaltrials.gov/study/NCT094333' },
    ]
  }
};

export function ClinicalTrialsTerminal() {
  const [activeMarker, setActiveMarker] = useState(MARKERS[0]);

  const activeData = CLINICAL_DATA[activeMarker.id] || { papers: [], trials: [] };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 md:p-6 h-auto md:h-[400px] flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <Microscope className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-light tracking-tight ">Latest <span className="font-bold">Findings</span></h2>
        </div>
        <div className="flex gap-2">
           <span className="text-[10px] font-mono tracking-normal  text-blue-700 border border-slate-200 px-2 py-1 rounded bg-white hidden md:inline-block">DB: Treatment Database</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0 relative z-10 w-full overflow-hidden">
        {/* Left Column: Marker Selection */}
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200/50 pb-4 md:pb-0 md:pr-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto custom-scrollbar shrink-0">
          {MARKERS.map((marker) => (
            <button
              key={marker.id}
              onClick={() => setActiveMarker(marker)}
              className={`flex items-center justify-between p-2 md:p-3 border rounded text-left transition-all shrink-0 md:shrink items-center ${
                activeMarker.id === marker.id 
                ? 'bg-indigo-600/10 border-indigo-600/50 text-indigo-800' 
                : 'bg-white border-slate-200/50 text-blue-700 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold tracking-normal  mb-1 md:mb-1 leading-none">{marker.id}</div>
                <div className="text-[9px] font-mono opacity-70 hidden md:block">{marker.category}</div>
              </div>
              <ChevronRight className={`w-4 h-4 hidden md:block ${activeMarker.id === marker.id ? 'text-indigo-600' : 'text-blue-700'}`} />
            </button>
          ))}
        </div>

        {/* Right Column: Data Display */}
        <div className="md:w-2/3 md:pl-2 flex flex-col gap-4 overflow-y-auto custom-scrollbar md:pr-2">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeMarker.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="space-y-4"
              >
                 {/* Clinical Trials */}
                 <div>
                    <h3 className="text-[10px] font-mono text-blue-700  tracking-normal mb-2 flex items-center gap-2">
                       <Activity className="w-3 h-3 text-red-500" /> Active Clinical Trials
                    </h3>
                    <div className="space-y-2">
                        {activeData.trials.map(trial => (
                          <BlueprintWrapper key={trial.id} label={`TRIAL_${trial.id}`}>
                            <a 
                              href={trial.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-black/40 border border-slate-200 p-3 rounded group hover:border-red-500/30 transition-colors cursor-pointer block"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-indigo-600 font-mono text-[10px] font-bold border border-indigo-600/30 px-1 rounded bg-indigo-600/10">{trial.id}</span>
                                <span className="text-[9px] font-mono  tracking-normal text-blue-700">[{trial.phase}]</span>
                              </div>
                              <h4 className="text-sm font-medium text-blue-900 mb-1 leading-tight group-hover:text-red-500 transition-colors">{trial.title}</h4>
                              <div className="flex justify-between items-center mt-2">
                                 <span className="text-[10px] text-blue-700 font-mono">{trial.location}</span>
                                 <span className="text-[9px] text-red-400  tracking-normal font-bold flex items-center gap-1 group-hover:text-red-500">
                                   {trial.status} <ExternalLink className="w-3 h-3" />
                                 </span>
                              </div>
                            </a>
                          </BlueprintWrapper>
                       ))}
                    </div>
                 </div>

                 {/* Research Papers */}
                 <div>
                    <h3 className="text-[10px] font-mono text-blue-700  tracking-normal mb-2 flex items-center gap-2 mt-4">
                       <FileText className="w-3 h-3 text-blue-500" /> Academic Literature
                    </h3>
                    <div className="space-y-2">
                       {activeData.papers.map(paper => (
                          <BlueprintWrapper key={paper.id} label={`PUB_${paper.id}`}>
                            <a 
                              href={paper.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-black/40 border border-slate-200 p-3 rounded group hover:border-blue-500/30 transition-colors cursor-pointer block"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-blue-500 font-mono text-[10px] font-bold">{paper.journal}</span>
                                <span className="text-[9px] font-mono  tracking-normal text-blue-700">[{paper.year}]</span>
                              </div>
                              <h4 className="text-sm font-medium text-blue-900 mb-2 leading-tight group-hover:text-blue-500 transition-colors">{paper.title}</h4>
                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/50">
                                 <Database className="w-3 h-3 text-blue-700" />
                                 <span className="text-[9px] text-blue-700  tracking-normal">Citations: {paper.citations}</span>
                                 <div className="flex-1" />
                                 <span className="text-[9px] text-blue-500 font-bold flex items-center gap-1">
                                    Read <ExternalLink className="w-3 h-3 text-blue-700 group-hover:text-blue-500 transition-colors" />
                                 </span>
                              </div>
                            </a>
                          </BlueprintWrapper>
                       ))}
                    </div>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
