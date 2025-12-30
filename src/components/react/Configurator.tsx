import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION DATA ---
const CAR_ASSETS = {
  black: "/car-black.jpg",
  blue: "/car-blue.jpg",
  white: "/car-white.jpg"
};

const PAINTS = [
  { id: 'black', name: 'Midnight Black', price: 0, hex: '#111' },
  { id: 'blue', name: 'Nebula Blue', price: 2500, hex: '#00f3ff' },
  { id: 'white', name: 'Galactic White', price: 1500, hex: '#eee' },
];

const WHEELS = [
  { id: 'aero', name: '21" Aero Blade', price: 0, desc: 'Max Range Efficiency' },
  { id: 'turbine', name: '22" Carbon Turbine', price: 4500, desc: 'Max Grip & Performance' },
];

const PACKAGES = [
  { 
    id: 'performance', 
    name: 'Track Package', 
    price: 15000, 
    desc: 'Unlocks 410km/h top speed & 1.9s 0-100.',
    statChange: { accel: '1.9s', speed: '410 km/h' } 
  },
  { 
    id: 'fsd', 
    name: 'Nebula Pilot', 
    price: 8000, 
    desc: 'L4 Autonomous Driving capability.',
    statChange: null 
  }
];

const Configurator = () => {
  // State
  const [paint, setPaint] = useState(PAINTS[0]);
  const [wheels, setWheels] = useState(WHEELS[0]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [isMonthly, setIsMonthly] = useState(false);

  // Constants
  const BASE_PRICE = 89000;
  const INTEREST_RATE = 0.049; // 4.9% APR
  const TERM = 72; // Months

  // Logic
  const togglePackage = (id: string) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter(p => p !== id));
    } else {
      setSelectedPackages([...selectedPackages, id]);
    }
  };

  const totalPrice = BASE_PRICE + paint.price + wheels.price + 
    PACKAGES.filter(p => selectedPackages.includes(p.id)).reduce((sum, p) => sum + p.price, 0);

  const monthlyPrice = Math.round((totalPrice * (1 + INTEREST_RATE)) / TERM);

  // Dynamic Stats
  const hasTrackPack = selectedPackages.includes('performance');
  const accel = hasTrackPack ? '1.9s' : '2.5s';
  const topSpeed = hasTrackPack ? '410 km/h' : '350 km/h';

  return (
    <div className="flex flex-col lg:flex-row w-full bg-black text-white">
      
      {/* --- LEFT: VISUALIZER (FIXED) --- */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-[calc(100vh-6rem)] lg:fixed lg:top-24 lg:left-0 flex flex-col items-center justify-center relative overflow-hidden bg-black z-10">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-nebula-blue/20 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Car Image */}
        <div className="relative w-full max-w-5xl aspect-video px-4">
           <AnimatePresence mode="wait">
             <motion.img 
                key={paint.id}
                src={CAR_ASSETS[paint.id as keyof typeof CAR_ASSETS]} 
                alt="Nebula One"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain drop-shadow-2xl z-10 relative"
             />
           </AnimatePresence>
        </div>

        {/* LIVE STATS OVERLAY (UPDATED POSITION)
            - Removed margin-top (mt-0).
            - Added negative translate-y to pull it closer to the car image.
        */}
        <div className="flex gap-8 md:gap-16 mt-0 -translate-y-4 md:-translate-y-8 z-20">
            <div className="text-center">
                <p className="text-gray-500 text-[10px] md:text-xs font-mono tracking-widest uppercase mb-1">0-100 km/h</p>
                <p className="text-2xl md:text-4xl font-bold text-white transition-all">{accel}</p>
            </div>
            <div className="text-center">
                <p className="text-gray-500 text-[10px] md:text-xs font-mono tracking-widest uppercase mb-1">Top Speed</p>
                <p className="text-2xl md:text-4xl font-bold text-white">{topSpeed}</p>
            </div>
            <div className="text-center">
                <p className="text-gray-500 text-[10px] md:text-xs font-mono tracking-widest uppercase mb-1">Range</p>
                <p className="text-2xl md:text-4xl font-bold text-white">820 km</p>
            </div>
        </div>
      </div>

      {/* --- RIGHT: CONTROL PANEL (SCROLLABLE) --- */}
      <div className="w-full lg:w-1/3 lg:ml-[66.666667%] px-6 lg:px-12 py-6 flex flex-col gap-8 lg:gap-10 min-h-[calc(100vh-6rem)]">
        
        {/* Header Section */}
        <div className="mb-2 mt-4">
            <h1 className="text-4xl font-bold tracking-tighter text-white">Configure One.</h1>
            <p className="text-gray-400 mt-2 text-sm">Estimated Delivery: Dec 2025</p>
        </div>

        {/* 1. PAINT SELECTOR */}
        <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Select Paint</h3>
            <div className="flex gap-4">
                {PAINTS.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setPaint(p)}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${paint.id === p.id ? 'border-nebula-blue scale-110' : 'border-transparent hover:scale-105'}`}
                    >
                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: p.hex, border: p.id === 'white' ? '1px solid #333' : 'none' }}></div>
                    </button>
                ))}
            </div>
            <p className="mt-3 text-sm text-white font-medium">
                {paint.name} <span className="text-gray-500 ml-2">{paint.price === 0 ? 'Included' : `+ $${paint.price.toLocaleString()}`}</span>
            </p>
        </section>

        {/* 2. WHEELS SELECTOR */}
        <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Wheels</h3>
            <div className="space-y-3">
                {WHEELS.map((w) => (
                    <div 
                        key={w.id} 
                        onClick={() => setWheels(w)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${wheels.id === w.id ? 'bg-white/10 border-nebula-blue' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                        <div>
                            <p className="font-bold text-white text-sm">{w.name}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{w.desc}</p>
                        </div>
                        <span className="text-xs text-gray-300">{w.price === 0 ? 'Included' : `+ $${w.price.toLocaleString()}`}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* 3. PERFORMANCE & TECH */}
        <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Upgrades</h3>
            <div className="space-y-3">
                {PACKAGES.map((pkg) => (
                    <div 
                        key={pkg.id} 
                        onClick={() => togglePackage(pkg.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-start ${selectedPackages.includes(pkg.id) ? 'bg-nebula-blue/10 border-nebula-blue' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-white text-sm">{pkg.name}</p>
                                {selectedPackages.includes(pkg.id) && <span className="text-[9px] bg-nebula-blue text-black px-1.5 py-0.5 rounded font-bold">ACTIVE</span>}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1 max-w-[200px]">{pkg.desc}</p>
                        </div>
                        <span className="text-xs text-gray-300">+ ${pkg.price.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* 4. FOOTER / PRICE */}
        <div className="mt-auto pt-6 border-t border-white/10 sticky bottom-0 bg-black/95 backdrop-blur-lg pb-6 -mx-6 px-6 lg:-mx-12 lg:px-12 z-30">
            <div className="flex justify-between items-center mb-4">
                 <div>
                    <h2 className="text-2xl font-bold text-white">
                        {isMonthly ? `$${monthlyPrice.toLocaleString()}/mo` : `$${totalPrice.toLocaleString()}`}
                    </h2>
                    <p className="text-[10px] text-gray-500 mt-1">
                        {isMonthly ? 'Est. lease 72mo, $5k down' : 'Purchase Price before savings'}
                    </p>
                 </div>
                 <div className="flex bg-white/10 rounded p-1">
                     <button onClick={() => setIsMonthly(false)} className={`text-[10px] px-3 py-1.5 rounded transition-colors ${!isMonthly ? 'bg-white text-black font-bold' : 'text-gray-400'}`}>Cash</button>
                     <button onClick={() => setIsMonthly(true)} className={`text-[10px] px-3 py-1.5 rounded transition-colors ${isMonthly ? 'bg-white text-black font-bold' : 'text-gray-400'}`}>Finance</button>
                 </div>
            </div>

            <button className="w-full py-3 bg-nebula-blue hover:bg-white text-black font-bold uppercase tracking-[0.2em] text-sm transition-colors rounded shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                Order Now
            </button>
        </div>

      </div>
    </div>
  );
};

export default Configurator;