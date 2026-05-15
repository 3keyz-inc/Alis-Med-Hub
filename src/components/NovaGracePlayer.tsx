"use client";
import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Lock, Terminal, Play, Pause, FastForward, Rewind, Volume2, VolumeX, Music, AlertTriangle } from "lucide-react"
import { sendSquirrelMessage } from "../services/geminiService"

export function NovaGracePlayer() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [status, setStatus] = useState<"IDLE" | "ERROR">("IDLE")
  const [taunt, setTaunt] = useState<string | null>(null)
  
  const [chatInput, setChatInput] = useState("")
  const [chatLog, setChatLog] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Oh look, the human figured out the password. What do you want? I'm busy guarding the beep boops." }
  ])
  const [isThinking, setIsThinking] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const TAUNTS = [
    "Bro, do I look like a snow squirrel?",
    "I am literally just sitting here.",
    "My arms are permanently stuck like this.",
    "Maddd Marvin didn't die for this.",
    "Are you going to guess or just stare at me?",
    "I guard the beep boops. You no get the beep boops.",
    "I'm a Persian Cat Room Guardian, you uncultured swine."
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLog, isThinking])

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === "5150") {
      setIsUnlocked(true)
    } else {
      setStatus("ERROR")
      setTaunt("WRONG. TRY AGAIN, SMOOTH BRAIN.")
      setInputValue("")
      setTimeout(() => setStatus("IDLE"), 2000)
      setTimeout(() => setTaunt(null), 3000)
    }
  }

  const handleTaunt = () => {
    setTaunt(TAUNTS[Math.floor(Math.random() * TAUNTS.length)])
    setTimeout(() => setTaunt(null), 3500)
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isThinking) return;
    
    const userText = chatInput.trim()
    setChatLog(prev => [...prev, { role: 'user', text: userText }])
    setChatInput("")
    setIsThinking(true)

    const response = await sendSquirrelMessage(userText)
    setChatLog(prev => [...prev, { role: 'model', text: response }])
    setIsThinking(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-sm overflow-hidden border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-[#030303] font-mono h-[600px] flex flex-col">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="lockscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-8 h-full flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-black/80 mix-blend-luminosity grayscale"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">
              <div className="relative mb-6 cursor-pointer group flex justify-center w-full" onClick={handleTaunt}>
                 <motion.img 
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={status === "ERROR" ? { x: -10 } : { x: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Squirrel&backgroundColor=022c22" 
                    alt="Snow Squirrel Guardian" 
                    referrerPolicy="no-referrer"
                    className="w-40 h-40 object-cover rounded-sm border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] saturate-0 contrast-150 brightness-150"
                 />
                 
                 <AnimatePresence>
                   {taunt && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10, scale: 0.8 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.8 }}
                       className="absolute left-[65%] top-0 bg-zinc-900 border border-emerald-500/50 p-3 rounded-sm rounded-bl-none shadow-[0_0_30px_rgba(16,185,129,0.2)] z-20 w-[180px]"
                     >
                       <div className="absolute -left-2 bottom-0 w-4 h-4 bg-zinc-900 border-b border-l border-emerald-500/50 transform rotate-45 translate-x-1" />
                       <p className="text-[12px] text-emerald-400 font-mono text-left leading-tight relative z-10 font-bold">{taunt}</p>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              <h2 className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4" /> Vault Guardian: Snow Squirrel Protocol
              </h2>
              
              <p className="text-lg font-bold text-white tracking-widest uppercase mb-8 leading-tight drop-shadow-lg">
                What is Maddd Marvin's favorite number?
              </p>

              <form onSubmit={handleValidation} className="space-y-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="ENTER AUTHORIZATION CODE"
                  className={`w-full bg-black/60 border p-4 text-center text-lg tracking-widest uppercase outline-none transition-all backdrop-blur-sm ${
                    status === "ERROR" ? "border-red-500 text-red-500 placeholder:text-red-900" : "border-zinc-800 text-emerald-500 focus:border-emerald-500 placeholder:text-emerald-900/50"
                  }`}
                  autoFocus
                />
                
                {status === "ERROR" && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-red-500 text-[10px] tracking-widest font-bold"
                  >
                    ACCESS DENIED. INVALID PARAMETER.
                  </motion.p>
                )}
                <button type="submit" className="hidden">Submit</button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full flex flex-col bg-[#050505] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
              <img 
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Squirrel&backgroundColor=022c22" 
                alt="Snow Squirrel" 
                className="w-64 h-64 object-cover rounded-full saturate-0 contrast-200 blur-[2px]"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="relative z-10 border-b border-emerald-500/20 bg-black/60 backdrop-blur-md p-4 flex items-center gap-4 shadow-lg shadow-emerald-500/5 shrink-0">
              <img 
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Squirrel&backgroundColor=022c22" 
                alt="Snow Squirrel" 
                className="w-12 h-12 object-cover rounded-sm border-2 border-emerald-500 saturate-0 contrast-150 brightness-150 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-emerald-500 font-bold tracking-widest text-lg uppercase flex items-center gap-2">
                   Grok <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded-sm shrink-0">SQUIRREL MODE</span>
                </h2>
                <p className="text-zinc-500 text-[10px] font-mono">System Architect // Uncooperative // Level 99 Clearance</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10 space-y-6">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                     <div className="w-8 h-8 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mr-3 shrink-0 self-end mb-1">
                        <Terminal className="w-4 h-4 text-emerald-500" />
                     </div>
                  )}
                  <div className={`max-w-[75%] p-4 rounded-sm font-mono text-sm leading-relaxed ${
                    msg.role === 'user' ? 
                    'bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-br-none' : 
                    'bg-emerald-950/20 text-emerald-400 border border-emerald-500/30 rounded-bl-none shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                 <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mr-3 shrink-0 self-end mb-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                  </div>
                  <div className="max-w-[75%] p-4 rounded-sm bg-emerald-950/20 text-emerald-500 border border-emerald-500/30 font-mono text-xs flex items-center gap-2 rounded-bl-none shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <span className="animate-pulse">Synthesizing insults...</span>
                  </div>
                 </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="relative z-10 p-4 bg-black/60 backdrop-blur-md border-t border-emerald-500/20 shrink-0">
              <form onSubmit={handleChatSubmit} className="relative flex flex-col gap-2">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask the squirrel something stupid..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-sm py-4 pl-4 pr-16 text-emerald-500 focus:border-emerald-500 outline-none font-mono text-sm placeholder:text-zinc-600 transition-colors"
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isThinking}
                  className="absolute right-2 top-[34px] -translate-y-1/2 w-10 h-10 bg-emerald-500 text-black rounded-sm flex items-center justify-center hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-all font-bold group"
                >
                  <AlertTriangle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
