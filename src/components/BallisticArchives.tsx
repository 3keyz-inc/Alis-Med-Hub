"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Database, FileText, Lock, Eye, Sparkles, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { BlueprintWrapper } from './BlueprintWrapper';

const ARCHIVES = [
  { id: 'A1', title: 'Genome_Dataset_92', date: 'May 07, 2026', size: '1.2GB', status: 'Decrypted' },
  { id: 'A2', title: 'Pathology_Report_04', date: 'May 01, 2026', size: '840MB', status: 'Active' },
  { id: 'A3', title: 'Metabolic_Scan_Summary', date: 'April 28, 2026', size: '2.4GB', status: 'Locked' },
];

type SortKey = 'title' | 'date' | 'size';

export function BallisticArchives({ onSynthesize, searchQuery = "" }: { onSynthesize?: (label: string) => void, searchQuery?: string }) {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredArchives = ARCHIVES.filter(file => 
    file.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    file.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedArchives = [...filteredArchives].sort((a, b) => {
    let aValue: any = a[sortKey];
    let bValue: any = b[sortKey];

    if (sortKey === 'size') {
      const parseSize = (s: string) => parseFloat(s) * (s.includes('GB') ? 1024 : 1);
      aValue = parseSize(a.size);
      bValue = parseSize(b.size);
    } else if (sortKey === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    } else {
       aValue = String(a.title).toLowerCase();
       bValue = String(b.title).toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-slate-50/30 border border-slate-200 rounded-sm p-4 md:p-6 space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database size={14} className="text-indigo-600" />
          <span className="text-[10px] font-black  tracking-normal text-blue-700">Secure Document Storage</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-2 py-1 bg-slate-200 hover:bg-indigo-600/20 text-blue-800 hover:text-indigo-600 text-[10px]  font-bold tracking-normal rounded transition-colors border border-transparent hover:border-indigo-600/50">
            <Plus size={10} /> Add Doc
          </button>
          <span className="text-[8px] font-mono text-blue-700">DB.VER_04.1</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[10px] font-mono tracking-normal text-blue-700  pb-2 border-b border-slate-200/50">
        <span>Sort by:</span>
        <button 
          onClick={() => handleSort('title')}
          className={`flex items-center gap-1 hover:text-indigo-600 transition-colors ${sortKey === 'title' ? 'text-indigo-600' : ''}`}
        >
          Title
          {sortKey === 'title' && (sortDirection === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}
        </button>
        <button 
          onClick={() => handleSort('date')}
          className={`flex items-center gap-1 hover:text-indigo-600 transition-colors ${sortKey === 'date' ? 'text-indigo-600' : ''}`}
        >
          Date
          {sortKey === 'date' && (sortDirection === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}
        </button>
        <button 
          onClick={() => handleSort('size')}
          className={`flex items-center gap-1 hover:text-indigo-600 transition-colors ${sortKey === 'size' ? 'text-indigo-600' : ''}`}
        >
          Size
          {sortKey === 'size' && (sortDirection === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
        {sortedArchives.map((file) => (
          <BlueprintWrapper key={file.id} label={`DOC_${file.id}`}>
            <div className="flex items-center justify-between p-3 border border-slate-200/50 bg-black/20 rounded hover:bg-indigo-600/5 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText size={14} className="text-blue-700 group-hover:text-indigo-600" />
                <div>
                  <div className="text-[10px] font-bold  text-blue-800">{file.title}</div>
                  <div className="text-[8px] font-mono text-blue-700">{file.date} // {file.size}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {file.status !== 'Locked' && onSynthesize && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSynthesize(file.title);
                    }}
                    className="p-1.5 rounded bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-black transition-all"
                    title="AI Synthesize"
                  >
                    <Sparkles size={12} />
                  </button>
                )}
                {file.status === 'Locked' ? <Lock size={12} className="text-zinc-700" /> : <Eye size={12} className="text-indigo-600 opacity-50" />}
              </div>
            </div>
          </BlueprintWrapper>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-200">
        <div className="bg-indigo-600/5 border border-indigo-600/20 p-4 rounded-sm">
          <div className="text-[10px] font-bold text-indigo-600  tracking-normal mb-1">Privacy Notice</div>
          <p className="text-[9px] text-blue-700 font-mono leading-relaxed">Your data is securely stored and isolated. Only authorized users and your AI coach have access.</p>
        </div>
      </div>
    </div>
  );
}
