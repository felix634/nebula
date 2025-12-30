import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
  {
    id: 'access',
    title: 'Keyless Entry',
    desc: 'Your phone is your key. Walk up, and Nebula greets you. Walk away, and it locks automatically.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    )
  },
  {
    id: 'climate',
    title: 'Remote Climate',
    desc: 'Pre-condition the cabin temperature. Warm up the battery on cold mornings for peak range.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    )
  },
  {
    id: 'summon',
    title: 'Smart Summon',
    desc: 'Retrieve your Nebula One from tight parking spots or have it come to you in the rain.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )
  },
  {
    id: 'charge',
    title: 'Live Charging',
    desc: 'Monitor charge status, set limits, and view real-time supercharging speeds.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )
  }
];

const PhoneDemo = () => {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0]);

  return (
    // UPDATED CONTAINER: 
    // - Removed h-full (let flexbox handle it)
    // - Added items-center to perfectly align Text and Phone vertically
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 px-4 lg:px-8">
      
      {/* --- LEFT: TEXT CONTENT --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
        <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-tighter text-white mb-3">Total Control.</h1>
            <p className="text-gray-400 text-lg max-w-md">The Nebula App connects you to your vehicle from anywhere in the world.</p>
        </div>

        <div className="flex flex-col gap-3">
            {FEATURES.map((feature) => (
                <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature)}
                    className={`text-left p-5 rounded-xl border transition-all duration-300 group w-full lg:max-w-lg ${activeFeature.id === feature.id ? 'bg-white/10 border-nebula-blue' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                    <div className="flex items-center gap-4 mb-1">
                        <div className={`p-2 rounded-lg transition-colors ${activeFeature.id === feature.id ? 'bg-nebula-blue text-black' : 'bg-white/5 text-gray-500 group-hover:text-white'}`}>
                            {feature.icon}
                        </div>
                        <h3 className={`font-bold text-lg transition-colors ${activeFeature.id === feature.id ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                            {feature.title}
                        </h3>
                    </div>
                    
                    {/* Expand Description */}
                    <AnimatePresence>
                        {activeFeature.id === feature.id && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="text-sm text-gray-300 pl-[3.5rem] pt-1 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            ))}
        </div>
      </div>

      {/* --- RIGHT: PHONE MOCKUP --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
        
        {/* PHONE FRAME 
            - max-h-[80vh]: Ensures it never gets taller than the screen allows.
            - aspect-ratio: Maintains shape if it shrinks.
        */}
        <div className="relative w-[300px] h-[600px] max-h-[75vh] bg-[#1a1a1a] rounded-[3rem] border-8 border-[#333] shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden shrink-0 transform transition-transform duration-500 hover:scale-[1.02]">
            
            {/* Dynamic Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>

            {/* SCREEN CONTENT AREA */}
            <div className="w-full h-full bg-black relative overflow-hidden flex flex-col">
                
                {/* Status Bar */}
                <div className="w-full h-12 flex justify-between items-center px-6 pt-3 text-white/80 text-xs font-medium z-40">
                    <span>9:41</span>
                    <div className="flex gap-1.5">
                        <div className="w-4 h-2.5 border border-white/40 rounded-[2px] flex items-center px-[1px]">
                            <div className="w-full h-full bg-white rounded-[1px]"></div>
                        </div>
                    </div>
                </div>

                {/* APP SCREENS */}
                <AnimatePresence mode="wait">
                    
                    {/* 1. ACCESS */}
                    {activeFeature.id === 'access' && (
                        <motion.div 
                            key="access"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-6"
                        >
                            <div className="w-32 h-32 rounded-full border-4 border-nebula-blue/30 flex items-center justify-center relative mb-8">
                                <div className="absolute inset-0 rounded-full border-t-4 border-nebula-blue animate-spin"></div>
                                <svg className="w-12 h-12 text-nebula-blue drop-shadow-[0_0_10px_#00f3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                            </div>
                            <h2 className="text-2xl text-white font-bold tracking-tight">Unlocked</h2>
                            <p className="text-gray-500 text-sm mt-2">Nebula One Connected</p>
                        </motion.div>
                    )}

                    {/* 2. CLIMATE */}
                    {activeFeature.id === 'climate' && (
                        <motion.div 
                            key="climate"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#0a0a0a]"
                        >
                             <div className="text-6xl font-thin text-white mb-2 tracking-tighter">22°</div>
                             <p className="text-nebula-blue text-sm font-bold uppercase tracking-widest mb-12">Interior</p>
                             
                             <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></div>
                                <div className="w-12 h-12 rounded-full bg-nebula-blue flex items-center justify-center text-black shadow-[0_0_15px_#00f3ff]"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
                             </div>
                        </motion.div>
                    )}

                    {/* 3. SUMMON */}
                    {activeFeature.id === 'summon' && (
                        <motion.div 
                            key="summon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gray-900"
                        >
                             <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                 <div className="w-4 h-4 bg-nebula-blue rounded-full shadow-[0_0_20px_#00f3ff] animate-pulse"></div>
                                 <div className="mt-2 bg-black/80 px-3 py-1 rounded text-[10px] text-white border border-white/10 backdrop-blur-md">
                                     NEBULA ONE
                                 </div>
                             </div>
                             <div className="absolute bottom-8 left-6 right-6">
                                 <button className="w-full py-3 bg-white text-black font-bold rounded-lg shadow-lg text-sm">COME TO ME</button>
                             </div>
                        </motion.div>
                    )}

                    {/* 4. CHARGE */}
                    {activeFeature.id === 'charge' && (
                        <motion.div 
                            key="charge"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <div className="w-32 h-56 border-4 border-white/20 rounded-2xl p-2 relative mb-6">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-12 h-4 bg-white/20 rounded-t-sm"></div>
                                <motion.div 
                                    initial={{ height: '0%' }}
                                    animate={{ height: '80%' }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="w-full bg-gradient-to-t from-nebula-blue to-[#00f3ff] rounded-lg absolute bottom-2 left-2 right-2 w-[calc(100%-16px)] shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                                ></motion.div>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-1">820<span className="text-lg text-gray-400 font-normal ml-1">km</span></h2>
                            <p className="text-green-400 text-xs font-mono uppercase tracking-widest animate-pulse">Charging Superfast</p>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Bottom Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;