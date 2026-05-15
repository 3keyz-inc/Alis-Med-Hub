"use client";
import { useState, useEffect, ReactNode, useRef } from 'react';
import { 
  Scan, 
  Cpu, 
  Zap, 
  Search, 
  Terminal, 
  Fingerprint, 
  Activity,
  Layers,
  Component as ComponentIcon,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
  Dna,
  BrainCircuit,
  Database,
  History as HistoryIcon,
  X,
  Sparkles,
  Command,
  Download,
  Share2,
  Lock,
  Eye,
  Microscope,
  Target,
  Scissors,
  Syringe,
  Clock,
  Send,
  Bot,
  Calendar,
  Beaker,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Cloud,
  Upload,
  Crosshair,
  Music,
  Heart,
  Sun,
  Moon,
  Network,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not set. Features requiring AI will not work.");
      // Dummy initialization to prevent crash on return, but API calls will fail later.
      return new GoogleGenAI({ apiKey: "missing-key" });
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// TYPES
interface TimelineItem {
  id: number;
  type: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: typeof Scissors;
}

interface Message {
  role: 'bot' | 'user';
  text: string;
  timestamp: number;
}

interface Persona {
  id: string;
  name: string;
  icon: ReactNode;
  desc: string;
}

const PERSONAS: Persona[] = [
  { id: 'architect', name: 'Treatment Scout', icon: <Layers size={14} />, desc: 'Finds the latest available medical treatments automatically.' },
  { id: 'biologist', name: 'Vitality Coach', icon: <Dna size={14} />, desc: 'Helps track health stats and optimize your way of living.' },
  { id: 'oracle', name: 'Snow Squirrel', icon: <Sparkles size={14} />, desc: 'Your friendly daily automated health sidekick.' },
];

const TREATMENTS: TimelineItem[] = [
  { id: 1, type: "Routine Checkup", date: "Jan 12, 2026", status: "completed", icon: Scan },
  { id: 2, type: "Diet Change Phase 1", date: "Feb 05, 2026", status: "completed", icon: Beaker },
  { id: 3, type: "Vitamin Supplementation", date: "Mar 10, 2026", status: "in-progress", icon: Syringe },
  { id: 4, type: "Physical Therapy (Waitlisted)", date: "Apr 15, 2026", status: "upcoming", icon: Scissors },
];

import { BlueprintWrapper } from './components/BlueprintWrapper';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './components/ui/dropdown-menu';

// COMPONENTS

function SectionHeader({ icon: Icon, title, desc }: { icon: any, title: string, desc?: string }) {
  return (
    <div className="space-y-1 mb-6">
      <div className="flex items-center gap-2 text-indigo-800">
        <Icon size={16} />
        <h3 className="text-xs font-semibold tracking-tight font-medium">{title}</h3>
      </div>
      {desc && <p className="text-[10px] text-blue-700 font-mono tracking-normal ">{desc}</p>}
    </div>
  );
}

// MAIN APP

interface Intervention {
  id: string;
  title: string;
  impact: number;
  status: 'pending' | 'active' | 'verified';
  priority: 'high' | 'medium' | 'low';
}

// myAvatar removed

const INITIAL_INTERVENTIONS: Intervention[] = [
  { id: '1', title: 'Better Diet', impact: 89, status: 'verified', priority: 'high' },
  { id: '2', title: 'Daily Exercise', impact: 72, status: 'active', priority: 'high' },
  { id: '3', title: 'Improved Sleep', impact: 45, status: 'pending', priority: 'medium' },
  { id: '4', title: 'Mindfulness', impact: 91, status: 'pending', priority: 'high' },
];

function NeuralCoreVisualizer({ score }: { score: number }) {
  const [nodes, setNodes] = useState(Array.from({ length: 20 }));

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes([...Array.from({ length: 20 })]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full min-h-[300px] w-full bg-white overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse:60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {nodes.map((_, i) => {
        const size = Math.random() * 4 + 2;
        return (
          <motion.div
            key={i}
            animate={{
              x: [Math.random() * 300 - 150, Math.random() * 300 - 150],
              y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 rounded-2xl bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
            style={{ width: size, height: size }}
          />
        );
      })}

      <motion.div 
        animate={{ scale: [1, 1.05, 1], filter: ["blur(2px)", "blur(0px)", "blur(2px)"] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl border border-indigo-500/30 flex items-center justify-center bg-white/50 backdrop-blur-md z-10"
      >
        <div className="text-center">
          <p className="text-[10px] text-indigo-800/70 tracking-tight font-medium font-mono">Health Score</p>
          <p className="text-2xl font-bold text-blue-950 tracking-tight">{score.toFixed(1)}%</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.5)] z-20"
      />
    </div>
  );
}

function PredictiveDataStream({ vitalData }: { vitalData: typeof INITIAL_VITAL_DATA }) {
  const latestData = vitalData[vitalData.length - 1];
  const dataPoints = [
    { icon: Dna, label: "Diet Consistency", value: latestData.stress < 2 ? "High / Optimal" : "Variable", status: "Active Analysis" },
    { icon: Activity, label: "Risk of Fatigue", value: latestData.fatigue > 30 ? "Elevated" : "Low Probability", status: "Safe Range" },
    { icon: Zap, label: "Activity Level", value: `${latestData.activity} / 100`, status: "Optimal" }
  ];

  return (
    <div className="space-y-3">
      {dataPoints.map((point, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative flex items-center justify-between p-3 rounded-2xl border border-slate-200/50 bg-slate-50/80 backdrop-blur-xl overflow-hidden hover:bg-white/5 transition-all duration-500 cursor-crosshair"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-white/40 border border-slate-200 text-indigo-800">
              <point.icon size={14} />
            </div>
            <div>
              <p className="text-[9px] tracking-tight font-medium text-blue-700">{point.label}</p>
              <p className="text-xs font-bold text-blue-900">{point.value}</p>
            </div>
          </div>

          <div className="relative">
            <p className="text-[8px] text-indigo-800 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
              {point.status}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const INITIAL_VITAL_DATA = [
  { day: '01', activity: 95, stress: 0.2, fatigue: 20 },
  { day: '05', activity: 88, stress: 0.8, fatigue: 35 },
  { day: '10', activity: 82, stress: 1.5, fatigue: 45 },
  { day: '15', activity: 75, stress: 2.8, fatigue: 30 },
  { day: '20', activity: 72, stress: 3.5, fatigue: 15 },
  { day: '25', activity: 70, stress: 4.2, fatigue: 10 },
];

import { TrinityNetwork } from "./components/TrinityNetwork";
import { ActionCenter } from "./components/ActionCenter";
import { BallisticArchives } from "./components/BallisticArchives";
import { NovaGracePlayer } from "./components/NovaGracePlayer";
import { SnowSquirrelTour } from "./components/SnowSquirrelTour";
import DevStudio from "./components/DevStudio";
import { DevStudioState, ViewMode } from "./types";
import { AutomatedResearchSystem } from "./components/AutomatedResearchSystem";
import { ClinicalTrialsTerminal } from "./components/ClinicalTrialsTerminal";
import { ChrysalisProtocolVault } from "./components/ChrysalisProtocolVault";
import { HelpSection } from "./components/HelpSection";
import { GhostInTheShell } from "./components/GhostInTheShell";
import aliPhoto from "./assets/images/regenerated_image_1778210234301.jpg";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedTheme = window.localStorage.getItem('theme');
        return storedTheme === 'dark' ||
          (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      } catch (e) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return true; // default to dark
  });
  const [activeTab, setActiveTab] = useState<'research' | 'vitals' | 'ledger' | 'import' | 'dossier' | 'media' | 'profile' | 'devstudio' | 'help'>('research');
  const [interventions, setInterventions] = useState<Intervention[]>(INITIAL_INTERVENTIONS);
  const [vitalData, setVitalData] = useState(INITIAL_VITAL_DATA);
  const [userProfile, setUserProfile] = useState({ name: 'Ali Shamise', status: 'Just a snow squirrel searching for the latest treatments 🐿️❄️', age: '28', weight: '210', height: '6\'6"', avatarUrl: aliPhoto });
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHUDActive, setIsHUDActive] = useState(true);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = window.localStorage.getItem('saved_chat_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse or access saved chat history:", e);
    }
    return [
      { role: 'bot', text: '<div class="message ai-msg"><strong>🐿️ Snow Squirrel</strong><br>Welcome, Ali! I\'ve fully automated your daily medical monitoring. I\'m fetching the latest updated treatments and breakthroughs to keep you ahead.</div>', timestamp: Date.now() },
      { role: 'bot', text: '<div class="message ai-msg">I am tracking clinical trials and organizing your lifestyle planner so you have <strong>the best way to live possible</strong>.<br><br>Tell me what you\'d like to check today: your health stats, new treatments, or lifestyle tips?</div>', timestamp: Date.now() + 1 }
    ];
  });
  const [chatInput, setChatInput] = useState('');
  const [isStripped, setIsStripped] = useState(false);
  const [isSurpriseActive, setIsSurpriseActive] = useState(false);
  const [activePersona, setActivePersona] = useState(PERSONAS[2]); // Snow Squirrel by default
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', impact: 50, priority: 'medium' as 'high' | 'medium' | 'low' });

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 2500);
    return () => clearTimeout(bootTimer);
  }, []);

  // Field Strip Easter Egg & RELOAD slam
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "f") {
        setIsStripped(prev => !prev);
      }
      if (e.ctrlKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setInterventions(prev => prev.map(item => ({ ...item, impact: Math.floor(Math.random() * 100) })));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleImport = (type: string) => {
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate complex ingestion
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    setTimeout(() => {
      setIsImporting(false);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Success: Document [${type.toUpperCase()}] imported. Secure processing completed at ${new Date().toLocaleTimeString()}.`, 
        timestamp: Date.now() 
      }]);
      setVitalData(prev => {
        const lastDayStr = prev.length > 0 ? prev[prev.length - 1].day : '00';
        const nextDay = (parseInt(lastDayStr) + 5).toString().padStart(2, '0');
        return [
          ...prev,
          {
            day: nextDay,
            activity: Math.floor(Math.random() * 40) + 60,
            stress: Number((Math.random() * 4).toFixed(1)),
            fatigue: Math.floor(Math.random() * 30) + 10,
          }
        ];
      });
    }, 2500);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImport(`FILE:${file.name}`);
    }
  };

  const handleSendMessage = async (e?: any) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: Message = { role: 'user', text: chatInput, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsCapturing(true);

    // Add a placeholder message for the bot that we'll stream into
    const botMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { role: 'bot', text: '', timestamp: botMsgId }]);

    try {
      const stream = await getAIClient().models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{
              text: `Assistant Persona: ${activePersona.name} (${activePersona.desc}). 
              CORE DIRECTIVE: Be helpful, friendly, and easy to understand. 
              Current Context: User is viewing tab: ${activeTab.toUpperCase()}.
              Query: ${chatInput}`
            }]
          }
        ],
        config: {
          systemInstruction: "You are a helpful, easy-to-understand lifestyle and health assistant. You provide simple, encouraging advice and summarize things without confusing jargon. Be friendly and conversational.",
        }
      });

      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages(prev => prev.map(msg => 
          msg.timestamp === botMsgId ? { ...msg, text: fullText } : msg
        ));
      }
    } catch (err) {
      setMessages(prev => prev.map(msg => 
        msg.timestamp === botMsgId ? { ...msg, text: 'Network Error: Connection lost. Please try again later.' } : msg
      ));
    } finally {
      setIsCapturing(false);
    }
  };

  const aiSynthesize = async (dataLabel: string) => {
    setIsCapturing(true);
    const botMsgId = Date.now();
    setMessages(prev => [...prev, { role: 'bot', text: `SYNTHESIZING_DATA: [${dataLabel}]...`, timestamp: botMsgId }]);

    try {
      const response = await getAIClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a 2-sentence friendly summary for a document labeled: "${dataLabel}". 
        Make it easy to understand for someone focusing on general personal health and lifestyle improvements.`
      });
      
      setMessages(prev => prev.map(msg => 
        msg.timestamp === botMsgId ? { ...msg, text: `Analysis: ${response.text}` } : msg
      ));
    } catch (err) {
      setMessages(prev => prev.map(msg => 
        msg.timestamp === botMsgId ? { ...msg, text: `Error: Synthesis failed for ${dataLabel}.` } : msg
      ));
    } finally {
      setIsCapturing(false);
    }
  };

  if (isBooting) {
    return (
      <div className="min-h-[100dvh] bg-[#030303] flex items-center justify-center font-mono relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20" />
        <div className="flex flex-col items-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-24 h-24 border-2 border-indigo-500/50 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)] relative group"
          >
            <div className="absolute inset-2 border border-indigo-500/20" />
             <Terminal className="text-indigo-800 w-10 h-10 animate-pulse" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-blue-950 text-3xl font-light tracking-[0.2em]  mb-2"
          >
            Valikor Systems <span className="font-bold text-indigo-800">INC.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-emerald-900 font-bold tracking-normal text-[10px]  mb-8"
          >
            Initializing Kernel...
          </motion.p>

          <div className="w-64 h-1 bg-slate-50 overflow-hidden rounded-full">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 2, ease: "linear" }}
               className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
             />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.2 }}
            className="mt-6 text-[8px] font-mono text-blue-700 tracking-normal space-y-1 text-center"
          >
            <p>MOUNTING VOLUME ................... [OK]</p>
            <p>LOADING TACTICAL MODULES .......... [OK]</p>
            <p>ESTABLISHING SNOW_SQUIRREL_LINK ... [OK]</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const devStudioStateMock: DevStudioState = {
    repoName: 'oncosense-os',
    fileTree: [
      { path: 'src/App.tsx', type: 'blob' },
      { path: 'src/components/DevStudio.tsx', type: 'blob' },
      { path: 'src/components/D3FlowChart.tsx', type: 'blob' },
      { path: 'src/services/geminiService.ts', type: 'blob' }
    ],
    graphData: {
      nodes: [
        { id: 'app', label: 'App.tsx', group: 1 },
        { id: 'devstudio', label: 'DevStudio.tsx', group: 2 },
        { id: 'd3flow', label: 'D3FlowChart.tsx', group: 3 },
        { id: 'gemini', label: 'geminiService.ts', group: 4 }
      ],
      links: [
        { source: 'app', target: 'devstudio', value: 1 },
        { source: 'devstudio', target: 'd3flow', value: 1 },
        { source: 'devstudio', target: 'gemini', value: 1 }
      ]
    }
  };

  return (
    <div className={`min-h-[100dvh] bg-[#030303] text-zinc-100 p-0 selection:bg-indigo-500/30 overflow-x-hidden font-sans flex flex-col h-[100dvh] ${isStripped ? 'grayscale opacity-70' : ''}`}>
      {/* Global scanline overlay */}
      
      <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
      
      {/* 1. SIMPLE MAIN HEADER */}
      <header className="flex justify-between items-center p-4 md:px-8 border-b border-slate-200/50 shrink-0 bg-white/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/50 flex items-center justify-center rounded-2xl relative overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Heart className="text-indigo-800 h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-light tracking-tight leading-none text-indigo-800 hidden sm:block">Ali's <span className="font-bold">Treatment Hub</span></h1>
            <h1 className="text-3xl font-bold tracking-tight leading-none text-indigo-800 sm:hidden">HUB</h1>
            <p className="text-[10px] font-mono tracking-normal text-indigo-800 mt-1 hidden sm:block">Automated Research & Lifestyle Assistant</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700 h-4 w-4" />
            <input 
              type="text" 
              placeholder="SEARCH TREATMENTS & LIFESTYLE TIPS..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2 pl-10 pr-4 text-[10px] font-mono tracking-normal text-indigo-800  outline-none focus:border-indigo-500/50 focus:bg-slate-50 transition-all placeholder:text-blue-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="text-blue-700 hover:text-indigo-800 hover:bg-indigo-500/10">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-6 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="flex flex-col text-right hidden md:block">
                  <span className="text-[9px] text-blue-700 tracking-tight font-medium font-mono">User Profile</span>
                  <span className="text-xs font-mono text-blue-800 font-bold tracking-wider">{userProfile.name}</span>
                </div>
                <Avatar className="h-10 w-10 border border-slate-200 rounded-2xl shadow-inner p-0.5 bg-slate-50 cursor-pointer">
                  <AvatarImage src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                  <AvatarFallback className="bg-slate-200 text-blue-700 font-mono text-xs rounded-2xl">AS</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border-indigo-500/30 text-indigo-800 font-mono text-xs rounded-2xl">
              <DropdownMenuLabel className="tracking-tight font-medium">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-indigo-500/20" />
              <DropdownMenuItem className="cursor-pointer hover:bg-indigo-500/20 focus:bg-indigo-500/20 focus:text-indigo-800" onClick={() => setActiveTab('profile')}>
                <Fingerprint className="mr-2 h-4 w-4" />
                <span>Full Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-indigo-500/20 focus:bg-indigo-500/20 focus:text-indigo-800" onClick={() => setActiveTab('ledger')}>
                <Target className="mr-2 h-4 w-4" />
                <span>Ledger Goals</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-indigo-500/20" />
              <DropdownMenuItem className="cursor-pointer hover:bg-destructive/20 focus:bg-destructive/20 text-red-500 focus:text-red-400">
                <Lock className="mr-2 h-4 w-4" />
                <span>Lock Terminal</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Tactical Bolt-Action Sidebar */}
        <aside className="w-full md:w-20 h-auto md:h-full bg-white border-b md:border-b-0 md:border-r border-slate-200/50 flex flex-row md:flex-col items-center justify-start md:justify-start py-4 md:py-6 px-4 md:px-0 gap-4 md:gap-6 shrink-0 overflow-x-auto custom-scrollbar z-40">
          {[
            { id: 'research', icon: Microscope, label: 'Dashboard' },
            { id: 'dossier', icon: ShieldCheck, label: 'Vault' },
            { id: 'ledger', icon: Target, label: 'Goals' },
            { id: 'import', icon: Database, label: 'Files' },
            { id: 'vitals', icon: Activity, label: 'Health' },
            { id: 'devstudio', icon: Network, label: 'AI Studio' },
            { id: 'media', icon: Bot, label: 'Avatar' },
            { id: 'help', icon: HelpCircle, label: 'Help & FAQ' },
          ].map((item, i) => (
            <BlueprintWrapper key={item.id} label={item.label}>
              <motion.button 
                id={`tour-target-${item.id}`}
                onClick={() => setActiveTab(item.id as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all relative ${
                  activeTab === item.id ? 'bg-indigo-500/10 text-indigo-800 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'text-blue-700 hover:text-blue-700'
                }`}
              >
                <item.icon size={18} />
                <span className="absolute bottom-1 right-1 text-[7px] font-mono opacity-30 select-none">0{i+1}</span>
              </motion.button>
            </BlueprintWrapper>
          ))}
          <div className="hidden md:flex mt-auto flex-col items-center gap-4 pb-4">
             <div className="w-1.5 h-1.5 rounded-2xl bg-indigo-500 animate-pulse" />
             <div className="w-px h-8 bg-slate-200" />
          </div>
        </aside>

        <motion.main 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-10 scroll-smooth custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.03),transparent_40%)]"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'research' ? (
              <motion.div 
                key="research"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12 max-w-[1600px] mx-auto"
              >
                {/* 2. THE TRINITY NETWORK (STRATEGIC OVERVIEW) */}
                <section className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Microscope className="w-4 h-4 text-indigo-800" />
                    <h2 className="text-xs font-mono  tracking-[0.3em] text-blue-700">Live Automated Treatments Map</h2>
                  </div>
                  
                  <div className="w-full h-[500px] border border-slate-200 rounded-2xl overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                     <TrinityNetwork />
                  </div>
                </section>

                {/* 3. MODULAR SYSTEMS & DATA ARCHIVES */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                  
                  {/* Left Column: Mechanical Loadout */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-200/50 pb-2">
                      <h2 className="text-4xl font-light tracking-tight ">Latest Automated <span className="font-bold">Treatments</span></h2>
                    </div>
                    
                    <ActionCenter />

                    {/* Integrated Intelligence Interface */}
                    <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 h-[400px] flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold tracking-tight font-medium text-indigo-800">AI Assistant</span>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {PERSONAS.map(p => (
                            <button 
                              key={p.id}
                              onClick={() => setActivePersona(p)}
                              className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                                activePersona.id === p.id ? 'bg-indigo-500 border-indigo-500 text-black' : 'bg-white border-slate-200 text-blue-700'
                              }`}
                            >
                              {p.icon}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 mb-4">
                        {messages.map((m, i) => (
                           <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                             <div 
                               className={`max-w-[85%] p-3 rounded text-[10px] font-mono leading-relaxed ${
                                m.role === 'user' ? 'bg-indigo-500/10 text-indigo-800 border border-indigo-500/20' : 'bg-white/40 text-blue-700 border border-slate-200'
                               }`}
                               dangerouslySetInnerHTML={{ __html: m.text }}
                             />
                           </div>
                        ))}
                        {isCapturing && (
                           <div className="h-4 flex gap-1 items-center">
                              <div className="w-1 h-1 bg-indigo-500 rounded-2xl animate-bounce" />
                              <div className="w-1 h-1 bg-indigo-500 rounded-2xl animate-bounce delay-75" />
                              <div className="w-1 h-1 bg-indigo-500 rounded-2xl animate-bounce delay-150" />
                           </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-auto">
                        <form onSubmit={handleSendMessage} className="relative flex-1">
                          <input 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-[10px] font-mono focus:border-indigo-500/50 outline-none placeholder:opacity-30"
                          />
                          <button type="submit" className="absolute right-2 top-2 p-1.5 text-indigo-800 hover:text-indigo-800">
                            <Send size={14} />
                          </button>
                        </form>
                        <button 
                          onClick={() => {
                            try {
                              window.localStorage.setItem('saved_chat_history', JSON.stringify(messages));
                              alert('Chat history saved successfully!');
                            } catch (e) {
                              alert('Unable to save chat history. Third-party cookies/storage might be blocked.');
                            }
                          }}
                          className="p-3 bg-white border border-slate-200 rounded text-indigo-800 hover:bg-slate-50 transition-colors"
                          title="Save Chat History"
                        >
                          <Database size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Clinical Trials & Literature Connection */}
                    <div className="mt-6 md:mt-8">
                       <ClinicalTrialsTerminal />
                    </div>
                  </div>

                  {/* Right Column: Encrypted Data */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-200/50 pb-2">
                      <h2 className="text-4xl font-light tracking-tight ">New Medical <span className="font-bold">Findings</span></h2>
                    </div>
                    
                    <BallisticArchives onSynthesize={aiSynthesize} searchQuery={searchQuery} />

                    {/* Automated Research Updating System */}
                    <div className="h-[400px]">
                      <AutomatedResearchSystem />
                    </div>

                    {/* Tactical Overlay Preview */}
                    <div className="rounded-2xl overflow-hidden border border-slate-200 h-[250px] relative">
                       <NeuralCoreVisualizer score={vitalData[vitalData.length - 1].activity} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                       <div className="absolute bottom-4 left-4">
                          <div className="text-[8px] font-mono text-indigo-800 bg-white/80 px-2 py-1 border border-indigo-500/30 rounded">
                             MONITORING: ACTIVE
                          </div>
                       </div>
                    </div>
                    
                    <div className="mt-6 border-t border-slate-200/50 pt-6">
                      <div className="flex justify-between items-end border-b border-slate-200/50 pb-2 mb-4">
                        <h2 className="text-4xl font-light tracking-tight ">Lifestyle <span className="font-bold">Predictor</span></h2>
                      </div>
                      <PredictiveDataStream vitalData={vitalData} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'ledger' ? (
              <motion.div 
                key="ledger"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 max-w-[1200px]"
              >
                <SectionHeader icon={Target} title="Treatment Goals" desc="Track your progress and interventions" />
                <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-light tracking-tight text-blue-900">Active <span className="font-bold">Interventions</span></h3>
                      <button 
                         onClick={() => setIsAddingGoal(!isAddingGoal)}
                         className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition"
                      >
                        {isAddingGoal ? 'Cancel' : 'Add Goal'}
                      </button>
                   </div>
                   {isAddingGoal && (
                     <div className="mb-6 p-4 border border-slate-200 bg-white rounded-xl space-y-4">
                       <input 
                         type="text" 
                         placeholder="New goal or treatment..."
                         value={newGoal.title}
                         onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm text-blue-900 focus:outline-none focus:border-indigo-400"
                       />
                       <div className="flex gap-4 items-center">
                          <label className="text-xs text-blue-700 font-bold">Priority:</label>
                          <select 
                             value={newGoal.priority}
                             onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as any})}
                             className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-xs"
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                          <button 
                             onClick={() => {
                                if (newGoal.title.trim()) {
                                  setInterventions([...interventions, { id: Date.now().toString(), title: newGoal.title, impact: 50, priority: newGoal.priority, status: 'pending' }]);
                                  setNewGoal({ title: '', impact: 50, priority: 'medium' });
                                  setIsAddingGoal(false);
                                }
                             }}
                             className="ml-auto px-4 py-2 bg-indigo-100 text-indigo-700 text-xs font-bold py-2 rounded-lg hover:bg-indigo-200"
                          >
                             Save
                          </button>
                       </div>
                     </div>
                   )}
                   <div className="space-y-4">
                      {interventions.map((item, i) => (
                         <div key={item.id} className="border border-slate-200 bg-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-indigo-400 transition cursor-pointer group">
                             <div className="flex items-center gap-4">
                               <div className="h-10 w-10 bg-indigo-50 flex items-center justify-center rounded-lg text-indigo-600">
                                  <Target size={20} />
                               </div>
                               <div>
                                  <div className="text-sm font-bold text-blue-900 group-hover:text-indigo-600 transition-colors">{item.title}</div>
                                  <div className="text-xs text-blue-700 font-mono tracking-tight flex items-center gap-2">
                                     <span className={`inline-block w-2 h-2 rounded-full ${item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                                     Priority: {item.priority.toUpperCase()}
                                  </div>
                               </div>
                             </div>
                             <div className="flex gap-4 items-center">
                                <div className="text-right">
                                   <div className="text-xs text-blue-700 font-mono mb-1">Impact Potential</div>
                                   <div className="text-lg font-black text-indigo-600">{item.impact}%</div>
                                </div>
                                <div className="px-3 py-1 bg-slate-100 rounded-md text-xs font-mono text-slate-600 border border-slate-200 border-opacity-50 min-w-[80px] text-center">
                                   {item.status.toUpperCase()}
                                </div>
                             </div>
                         </div>
                      ))}
                      {interventions.length === 0 && (
                        <div className="py-12 text-center text-blue-700 font-mono text-xs">
                          No active interventions found.
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            ) : activeTab === 'dossier' ? (
              <motion.div 
                key="dossier" 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 max-w-[1200px]"
              >
                <ChrysalisProtocolVault />
              </motion.div>
            ) : activeTab === 'import' ? (
              <motion.div 
                key="import"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-[1200px] mx-auto space-y-8"
              >
                <SectionHeader icon={Database} title="File Uploads" desc="Add your documents here" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Upload Methods */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-4 text-left">
                       <h4 className="text-sm font-bold text-indigo-950 mb-2">Starting Guide: The True Way of Treatment</h4>
                       <p className="text-indigo-800 text-[11px] leading-relaxed mb-4">
                         To give you the most personalized, accurate, and up-to-date treatment plan possible, the AI assistant requires complete context about your health history. Please import the following:
                       </p>
                       <ul className="text-left text-indigo-950 text-[11px] space-y-2 mb-4 mx-auto md:mx-0 max-w-xl list-disc pl-5">
                         <li><strong>Clinical Reports & Doctor Notes:</strong> PDFs or Word Docs containing your diagnosis, previous treatments, and physician insights.</li>
                         <li><strong>Genomic/Biomarker Data:</strong> DNA sequencing results or tumor profiling reports (CSV, JSON, PDF).</li>
                         <li><strong>Metabolic & Vital Data:</strong> Continuous tracking data from wearables (vital for identifying side effects and lifestyle optimization).</li>
                       </ul>
                       <p className="text-[10px] text-indigo-700 italic">
                         * The more data you provide, the better we can synthesize a true, comprehensive treatment path.
                       </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent_70%)]" />
                       
                       <div className="relative z-10">
                         <div className="flex justify-center mb-8">
                            <div className="relative">
                               <motion.div 
                                 animate={isImporting ? { rotate: 360 } : {}}
                                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                 className={`w-28 h-28 border border-dashed rounded-2xl flex items-center justify-center ${isImporting ? 'border-indigo-500' : 'border-slate-200'}`}
                               >
                                  <Database size={40} className={isImporting ? "text-indigo-800 animate-pulse" : "text-blue-700"} />
                               </motion.div>
                            </div>
                         </div>
                         
                         <h3 className="text-xl font-bold tracking-tight font-medium mb-4">Upload Portal</h3>
                         <p className="text-blue-700 font-mono text-[10px] max-w-sm mx-auto tracking-tight font-medium leading-loose mb-10">
                            Support for lab results (PDF), doctor notes (DOCX), and fitness data (CSV).
                         </p>

                         {isImporting ? (
                           <div className="max-w-md mx-auto space-y-4">
                              <div className="flex justify-between text-[8px] font-mono text-indigo-800 ">
                                 <span>Processing Bitstream...</span>
                                 <span>{importProgress}%</span>
                              </div>
                              <div className="h-1 w-full bg-slate-200 rounded-2xl overflow-hidden">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${importProgress}%` }}
                                   className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                 />
                              </div>
                              <div className="text-[8px] font-mono text-blue-700  animate-pulse">
                                 Scanning for malicious checksums... verified.
                              </div>
                           </div>
                         ) : (
                           <div className="flex flex-wrap justify-center gap-4">
                              <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={onFileChange} 
                                className="hidden" 
                              />
                              <button 
                                onClick={triggerFileUpload}
                                className="group px-8 py-4 bg-indigo-500 text-black rounded-2xl text-[10px] font-semibold tracking-tight font-medium flex items-center gap-3 hover:brightness-110 active:scale-95 transition-all"
                              >
                                 <Upload size={14} />
                                 LOCAL_UPLOAD
                              </button>
                              <button 
                                onClick={() => handleImport('CLOUD_UPLINK')}
                                className="group px-8 py-4 bg-white border border-slate-200 text-blue-800 rounded-2xl text-[10px] font-semibold tracking-tight font-medium flex items-center gap-3 hover:border-blue-500/50 hover:text-blue-400 active:scale-95 transition-all"
                              >
                                 <Cloud size={14} />
                                 CLOUD_SYNC_ACTIVE
                              </button>
                           </div>
                         )}
                       </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <button onClick={() => handleImport('GENOMIC_SET')} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500/30 transition-all text-left group">
                          <Fingerprint className="text-blue-700 group-hover:text-indigo-800 mb-4" size={24} />
                          <div className="text-[10px] font-semibold  text-blue-900 tracking-normal">Lab Results</div>
                          <p className="text-[8px] text-blue-700 font-mono mt-2 leading-relaxed">Blood work, vitamin levels</p>
                       </button>
                       <button onClick={() => handleImport('CLINICAL_REPORT')} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500/30 transition-all text-left group">
                          <Microscope className="text-blue-700 group-hover:text-indigo-800 mb-4" size={24} />
                          <div className="text-[10px] font-semibold  text-blue-900 tracking-normal">Doctor Notes</div>
                          <p className="text-[8px] text-blue-700 font-mono mt-2 leading-relaxed">Appointments, summaries</p>
                       </button>
                       <button onClick={() => handleImport('METABOLIC_BINARY')} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500/30 transition-all text-left group">
                          <Activity className="text-blue-700 group-hover:text-indigo-800 mb-4" size={24} />
                          <div className="text-[10px] font-semibold  text-blue-900 tracking-normal">Fitness Data</div>
                          <p className="text-[8px] text-blue-700 font-mono mt-2 leading-relaxed">Step counts, sleep logs</p>
                       </button>
                    </div>
                  </div>

                  {/* Right Column: Recent Activity */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col h-full">
                       <div className="flex items-center gap-2 mb-6 text-blue-700 border-b border-slate-200/50 pb-4">
                          <HistoryIcon size={14} />
                          <span className="text-[10px] font-semibold tracking-tight font-medium">Recent Activity Log</span>
                       </div>
                       <div className="flex-1 space-y-4 font-mono text-[9px]">
                          {[
                            { time: '14:20', event: 'UPLINK_SUCCESS', id: '0x92-F' },
                            { time: '13:05', event: 'SYNC_COMPLETED', id: '0x17-A' },
                            { time: '09:44', event: 'METABOLIC_SCAN_REF', id: '0x44-C' },
                          ].map((log, i) => (
                            <div key={i} className="flex justify-between items-start text-blue-700 border-l border-slate-200 pl-3">
                               <div>
                                  <div className="text-indigo-800 font-bold">SUCCESS</div>
                                  <div className="opacity-50">FILE_ID: {log.id}</div>
                               </div>
                               <div className="opacity-30">{log.time}</div>
                            </div>
                          ))}
                       </div>
                       <div className="mt-8 pt-4 border-t border-slate-200/50">
                          <div className="flex justify-between items-center text-[8px] text-blue-700 font-mono tracking-tight font-medium">
                             <span>Storage Used</span>
                             <span>42.4 / 100 GB</span>
                          </div>
                          <div className="mt-2 h-0.5 w-full bg-slate-50 rounded-2xl overflow-hidden">
                             <div className="h-full bg-blue-500 w-[42%]" />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'vitals' ? (
              <motion.div 
                key="vitals"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 max-w-[1200px]"
              >
                <SectionHeader icon={Activity} title="Health Summary" desc="Vital Signs" />
                <div className="h-[500px] w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
                   <div className="flex justify-between items-center mb-8">
                      <div>
                         <div className="text-xs font-bold text-blue-700 tracking-tight font-medium">Activity and Stress Levels</div>
                         <div className="text-[10px] text-blue-700 font-mono">Sync: 0.2ms // Nodes: 4,092</div>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-2xl bg-indigo-500" />
                            <span className="text-[10px] font-mono text-blue-700">ACTIVITY</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-2xl bg-zinc-700" />
                            <span className="text-[10px] font-mono text-blue-700">STRESS</span>
                         </div>
                      </div>
                   </div>
                   <ResponsiveContainer width="100%" height="80%">
                      <AreaChart data={vitalData}>
                        <defs>
                          <linearGradient id="colorKet" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="day" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="activity" stroke="#6366f1" fillOpacity={1} fill="url(#colorKet)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
              </motion.div>
            ) : activeTab === 'devstudio' ? (
              <motion.div 
                key="devstudio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <DevStudio initialState={devStudioStateMock} onNavigate={() => setActiveTab('research')} />
              </motion.div>
            ) : activeTab === 'media' ? (
              <motion.div 
                key="media"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center min-h-[600px]"
              >
                <NovaGracePlayer />
              </motion.div>
            ) : activeTab === 'profile' ? (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8 max-w-[1200px]"
              >
                <SectionHeader icon={ShieldCheck} title="User Profile" desc="Account Settings" />
                
                <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-2xl shadow-xl">
                  <div className="flex items-center gap-6 mb-8 border-b border-slate-200/50 pb-8">
                    <div className="h-24 w-24 rounded-2xl overflow-hidden border-2 border-indigo-500/30">
                      <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-light tracking-tight ">Identity <span className="font-bold">Matrix</span></h3>
                      <p className="text-[10px] text-blue-700 font-mono tracking-normal  mt-1">Status: {userProfile.status}</p>
                    </div>
                  </div>

                  {isEditingProfile ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-2">Display Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-sm text-blue-900 outline-none focus:border-indigo-500/50" 
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-2">Age</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-sm text-blue-900 outline-none focus:border-indigo-500/50" 
                            value={userProfile.age}
                            onChange={(e) => setUserProfile({ ...userProfile, age: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-2">Weight</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-sm text-blue-900 outline-none focus:border-indigo-500/50" 
                            value={userProfile.weight}
                            onChange={(e) => setUserProfile({ ...userProfile, weight: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-2">Height</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-sm text-blue-900 outline-none focus:border-indigo-500/50" 
                            value={userProfile.height}
                            onChange={(e) => setUserProfile({ ...userProfile, height: e.target.value })}
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-2">Avatar URL</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-sm text-blue-900 outline-none focus:border-indigo-500/50" 
                            value={userProfile.avatarUrl}
                            onChange={(e) => setUserProfile({ ...userProfile, avatarUrl: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-4 pt-4 border-t border-slate-200/50">
                        <button onClick={() => setIsEditingProfile(false)} className="px-6 py-2 bg-indigo-500/10 text-indigo-800 text-[10px] tracking-tight font-medium font-bold rounded-2xl border border-indigo-500/30 hover:bg-indigo-500 hover:text-black transition-all">
                          Save Profile
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-1">Display Name</div>
                          <div className="text-blue-900  tracking-wider">{userProfile.name}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-1">Age</div>
                          <div className="text-blue-900  tracking-wider">{userProfile.age}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-1">Weight</div>
                          <div className="text-blue-900  tracking-wider">{userProfile.weight}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-blue-700 tracking-tight font-medium mb-1">Height</div>
                          <div className="text-blue-900  tracking-wider">{userProfile.height}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 pt-4 border-t border-slate-200/50">
                        <button onClick={() => setIsEditingProfile(true)} className="px-6 py-2 bg-slate-50 text-blue-700 text-[10px] tracking-tight font-medium font-bold rounded-2xl hover:text-blue-950 border border-slate-200 hover:border-slate-300 transition-all">
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : activeTab === 'help' ? (
              <motion.div 
                key="help"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center justify-center w-full min-h-[500px]"
              >
                <HelpSection />
              </motion.div>
            ) : (
               <div className="h-full flex items-center justify-center opacity-20 italic font-mono text-xs">
                  Module 0{activeTab} Secured // Clearance Level 5 Required
               </div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Persistence Ledger Footer */}
      <footer className="h-10 border-t border-slate-200/50 bg-white flex items-center justify-between px-6 z-40 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-2xl bg-indigo-500 animate-pulse" />
            <span className="text-[8px] font-mono text-blue-700 tracking-tight font-medium leading-none">Status: Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-2xl bg-blue-500" />
            <span className="text-[8px] font-mono text-blue-700 tracking-tight font-medium leading-none">Mode: Standard</span>
          </div>
        </div>
        <div className="text-[8px] text-blue-700 font-mono tracking-normal font-semibold flex items-center gap-2 group">
          <Heart size={10} /> // (C) 2026 VALIKOR SYSTEMS INC.
          <button 
             onClick={() => setIsSurpriseActive(true)}
             className="ml-2 w-4 h-4 rounded flex items-center justify-center text-transparent hover:text-indigo-600 border border-transparent hover:border-indigo-600/30 transition-all font-serif italic"
             title="Ghost in the Shell"
          >
             Ω
          </button>
        </div>
      </footer>

      {/* GLOBAL HUD OVERLAYS */}
      <TacticalHUD isActive={isHUDActive} />
      <SnowSquirrelTour />
      <AnimatePresence>
        {isSurpriseActive && <GhostInTheShell onClose={() => setIsSurpriseActive(false)} />}
      </AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-overlay opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}

// Tactical HUD Component
function TacticalHUD({ isActive }: { isActive: boolean }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden select-none">
       {/* Scanning Line */}
       <motion.div 
         initial={{ top: '-10%' }}
         animate={{ top: '110%' }}
         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
         className="absolute left-0 right-0 h-px bg-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-50"
       />

       {/* Corner Brackets */}
       <div className="absolute inset-8 border border-slate-200/50 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500/30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-500/30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-500/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500/30" />
       </div>

       {/* Dynamic Readouts */}
       <div className="absolute top-20 left-10 space-y-1">
          <div className="text-[7px] font-mono text-indigo-800/50 tracking-tight font-medium">Cursor_Position</div>
          <div className="text-[9px] font-mono text-indigo-800/80 bg-white/40 px-2 py-0.5 border border-indigo-500/20">
             X: {coords.x.toString().padStart(4, '0')} // Y: {coords.y.toString().padStart(4, '0')}
          </div>
       </div>

       <div className="absolute bottom-20 right-10 flex flex-col items-end gap-2">
          <div className="flex gap-1.5 h-6 items-end">
             {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                   key={i}
                   animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                   transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                   className="w-0.5 bg-indigo-500/20 rounded-2xl"
                />
             ))}
          </div>
          <div className="text-[7px] font-mono text-indigo-800/50 tracking-tight font-medium">Focus_Mode</div>
       </div>

       {/* Central Reticle */}
       <motion.div 
         animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
         transition={{ duration: 4, repeat: Infinity }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
       >
          <div className="relative w-64 h-64 border border-indigo-500/10 rounded-2xl">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-indigo-500/30" />
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-indigo-500/30" />
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-indigo-500/30" />
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-px bg-indigo-500/30" />
          </div>
       </motion.div>

       {/* CRT Flicker Overlay */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-overlay mix-blend-overlay" />
    </div>
  );
}

// HELPERS

function HeaderStat({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col items-end">
      <span className="text-[8px] text-blue-700  font-semibold tracking-tight leading-none mb-1">{label}</span>
      <span className={`text-[10px] font-bold font-mono tracking-tight leading-none ${color}`}>{value}</span>
    </div>
  );
}

function StatsBlock({ label, value, color, icon: Icon }: { label: string, value: string, color: string, icon: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-200 transition-colors group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[8px] text-blue-700  font-bold tracking-normal">{label}</span>
        <Icon size={12} className="text-zinc-800 group-hover:text-blue-700 transition-colors" />
      </div>
      <div className={`text-lg font-semibold tracking-tight ${color} font-mono`}>{value}</div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-[8px] font-semibold tracking-normal transition-all ${
        active ? 'bg-indigo-500 text-zinc-950 shadow-lg' : 'text-blue-700 hover:text-blue-700'
      }`}
    >
      {label}
    </button>
  );
}

function ImportTile({ icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group w-full"
    >
       <div className="text-blue-700 group-hover:text-indigo-800 transition-colors">{icon}</div>
       <span className="text-[9px] font-semibold tracking-tight font-medium text-blue-700 group-hover:text-blue-900">{label}</span>
    </button>
  );
}

function ImportCategory({ icon, label, desc, loading, onClick }: { icon: any, label: string, desc: string, loading?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col items-start gap-3 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group text-left disabled:opacity-50"
    >
       <div className="text-blue-700 group-hover:text-indigo-800 transition-colors">{icon}</div>
       <div>
         <div className="text-[10px] font-semibold tracking-tight font-medium text-blue-900">{label}</div>
         <div className="text-[8px] font-mono text-blue-700  mt-0.5">{desc}</div>
       </div>
    </button>
  );
}

function DossierCard({ title, items, color, icon }: { title: string, items: string[], color: string, icon?: ReactNode }) {
  return (
    <div className={`border rounded-2xl p-5 space-y-4 ${color}`}>
       <div className="flex items-center gap-2">
          {icon || <ShieldCheck size={14} className="text-indigo-800" />}
          <h4 className="text-[10px] font-semibold tracking-tight font-medium text-blue-950">{title}</h4>
       </div>
       <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
               <div className="mt-1.5 w-1 h-1 rounded-2xl bg-zinc-700 shrink-0" />
               <p className="text-[10px] text-blue-700 font-mono leading-relaxed">{item}</p>
            </li>
          ))}
       </ul>
    </div>
  );
}
