"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ShieldCheck, Database, Target, Map } from 'lucide-react';
import { BlueprintWrapper } from './BlueprintWrapper';

const faqs = [
  {
    question: "How do I add my clinical data?",
    answer: "Navigate to the 'Files' tab (database icon). From there, you can upload clinical reports, genomic data, metabolics, or sync directly from cloud sources like EHR platforms. Ensure documents are clear PDFs, CSV, or standard medical imaging formats for best results."
  },
  {
    question: "What does the 'Vault' icon mean?",
    answer: "The 'Vault' represents Chrysalis Protocol, where all potential treatments, vectors, and interventions are analyzed. It plots multiple drug and lifestyle vectors and estimates probability of success based on current leading data and clinical literature."
  },
  {
    question: "How do I set goals in the app?",
    answer: "Go to the 'Goals' tab (target icon). There you can manage active interventions. Click 'Add Goal' to create a new health objective, assign its priority (High/Medium/Low), and visually track it alongside automated lifestyle adjustments."
  },
  {
    question: "Why should I use the 'Snow Squirrel' AI chat?",
    answer: "The AI agent (bottom right) is constantly hunting for new trials, tracking your imported vitals, and curating your daily routine based on your medical profile. It acts as an orchestrator helping you map out your best options seamlessly."
  },
  {
    question: "Are the clinical trials listed real?",
    answer: "Yes, the trials and papers shown in the 'Dashboard' are sourced. Clicking a trial will usually display links or details sourced from ClinicalTrials.gov or PubMed indices (dependent on the provided external uplinks)."
  }
];

export function HelpSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-8 max-w-[1000px] w-full">
      <div className="flex items-center gap-4 mb-2">
         <div className="h-10 w-10 border border-indigo-500/30 bg-indigo-50 flex items-center justify-center rounded text-indigo-700">
           <HelpCircle size={24} />
         </div>
         <div>
            <h2 className="text-xl font-bold tracking-tight text-blue-900">Help & FAQ</h2>
            <p className="text-sm font-mono text-blue-700/70 tracking-tight">System Navigation and Operations Manual</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
           {faqs.map((faq, i) => (
             <BlueprintWrapper key={i} label={`FAQ_${i+1}`}>
               <div className="border border-slate-200 bg-white rounded-xl overflow-hidden text-left shadow-sm">
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-sm font-bold text-blue-900">{faq.question}</span>
                    <ChevronDown size={16} className={`text-indigo-600 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white"
                      >
                         <p className="p-4 text-sm text-blue-700 leading-relaxed font-mono">
                           {faq.answer}
                         </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
             </BlueprintWrapper>
           ))}
        </div>

        <div className="space-y-4">
           <BlueprintWrapper label="SUPPORT_OPS">
             <div className="p-5 border border-indigo-200 bg-indigo-50 rounded-xl flex flex-col gap-4 text-left shadow-sm">
                <h3 className="text-indigo-900 font-bold text-sm">Need Direct Assistance?</h3>
                <p className="text-xs text-indigo-700 font-mono leading-relaxed">
                  If you encounter an anomaly or need guidance navigating experimental treatments, our specialists are online.
                </p>
                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold font-mono tracking-tight transition-colors rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                   INITIATE COMM LINK
                </button>
             </div>
           </BlueprintWrapper>
           
           <BlueprintWrapper label="TUTORIAL">
             <div className="p-5 border border-slate-200 bg-white rounded-xl flex flex-col gap-4 text-left group hover:border-indigo-400 transition-colors cursor-pointer shadow-sm"
                  onClick={() => {
                     // Fire custom event to restart tour if needed
                     const evt = new CustomEvent('restart-tour');
                     window.dispatchEvent(evt);
                  }}
             >
                <div className="flex items-center gap-3">
                   <Map className="text-indigo-500 group-hover:text-indigo-600 transition-colors" size={20} />
                   <h3 className="text-blue-900 font-bold text-sm transition-colors">Restart System Tour</h3>
                </div>
                <p className="text-xs text-blue-700 font-mono leading-relaxed transition-colors">
                  Summon the Snow Squirrel to guide you through the UI components once more. 
                </p>
             </div>
           </BlueprintWrapper>
        </div>
      </div>
    </div>
  );
}
