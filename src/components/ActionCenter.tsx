"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Target } from 'lucide-react';
import { BlueprintWrapper } from './BlueprintWrapper';

const LOADOUTS = [
  { id: '1', name: 'Dietary Adjustments', category: 'Nutrition', impact: 89, efficiency: 94, link: 'https://pubmed.ncbi.nlm.nih.gov/?term=dietary+adjustments+cancer' },
  { id: '2', name: 'Lifestyle Plan', category: 'Habits', impact: 72, efficiency: 88, link: 'https://clinicaltrials.gov/search?term=lifestyle+intervention' },
  { id: '3', name: 'Workout Routine', category: 'Fitness', impact: 91, efficiency: 97, link: 'https://pubmed.ncbi.nlm.nih.gov/?term=exercise+oncology' },
];

export function ActionCenter() {
  return (
    <div className="space-y-4">
      {LOADOUTS.map((item, i) => (
        <BlueprintWrapper key={item.id} label={`TREATMENT_${item.id}`}>
          <motion.a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-slate-50 border border-slate-200 rounded-sm p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-indigo-600/30 transition-all cursor-pointer overflow-hidden block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/5 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center gap-4 relative w-full md:w-auto">
              <div className="w-12 h-12 bg-white/50 border border-slate-300 flex items-center justify-center rounded-sm text-indigo-600 shrink-0">
                 {i === 0 ? <Shield size={20} /> : i === 1 ? <Target size={20} /> : <Zap size={20} />}
              </div>
              <div>
                <h3 className="text-sm font-black  tracking-normal text-blue-900 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                <p className="text-[10px] font-mono text-blue-700 ">{item.category}</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-8 relative w-full md:w-auto justify-end border-t border-slate-200/50 pt-3 md:border-t-0 md:pt-0">
              <div className="text-right">
                <span className="text-[9px] text-blue-700  font-mono tracking-normal block mb-1">Effectiveness</span>
                <div className="text-lg font-black text-indigo-600 leading-none">{item.impact}%</div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-blue-700  font-mono tracking-normal block mb-1">Precision</span>
                <div className="text-lg font-black text-blue-500 leading-none">{item.efficiency}%</div>
              </div>
            </div>
          </motion.a>
        </BlueprintWrapper>
      ))}
      
      <button className="w-full py-4 border border-dashed border-slate-200 rounded-sm text-[10px] font-black tracking-normal  text-blue-700 hover:border-indigo-600/30 hover:text-indigo-600 transition-all">
        + Add New Treatment
      </button>
    </div>
  );
}
