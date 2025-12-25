import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

// Screen content components
const ScreenUnlock = () => (
    <div className="h-full bg-nebula-black flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-full border-2 border-nebula-blue flex items-center justify-center mb-4">
            {/* Simple icon representation */}
            <span className="text-3xl">🔓</span>
        </div>
        <p className="tracking-widest uppercase text-xs">Vehicle Unlocked</p>
    </div>
);

const ScreenClimate = () => (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
        <h3 className="text-6xl font-thin z-10">68°</h3>
        <p className="text-nebula-blue z-10 mt-2">Interior Cooling</p>
    </div>
);

const ScreenSummon = () => (
    <div className="h-full bg-gray-800 flex flex-col items-center justify-center text-white">
        <div className="w-full h-40 bg-gray-700 mb-4 flex items-center justify-center text-gray-500">[Map View]</div>
        <button className="bg-nebula-blue text-black px-6 py-2 rounded-full font-bold">SUMMON</button>
    </div>
);

export default function PhoneDemo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Transform scroll progress to screen index (0, 1, or 2)
  const [activeScreen, setActiveScreen] = useState(0);

  // FIX: Use useMotionValueEvent instead of useTransform for side effects
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if (latest < 0.3) {
          setActiveScreen(0);
      } else if (latest < 0.6) {
          setActiveScreen(1);
      } else {
          setActiveScreen(2);
      }
  });

  return (
    <div ref={containerRef} className="relative">
      
      {/* Sticky Phone Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-end pr-20 pointer-events-none">
         <div className="relative w-[300px] h-[600px] border-[14px] border-gray-900 rounded-[3rem] bg-black overflow-hidden shadow-2xl">
             {/* The Dynamic Screen */}
             <div className="w-full h-full transition-opacity duration-500">
                 {activeScreen === 0 && <ScreenUnlock />}
                 {activeScreen === 1 && <ScreenClimate />}
                 {activeScreen === 2 && <ScreenSummon />}
             </div>
             {/* Notch */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl"></div>
         </div>
      </div>

      {/* Scrollable Text Triggers */}
      <div className="relative -mt-[100vh] z-10">
          <Section title="Keyless Entry" desc="Your phone is your key. Walk up, and Nebula greets you." />
          <Section title="Total Comfort" desc="Precondition the cabin. 68°F. Heated seats. Ready when you are." />
          <Section title="Smart Summon" desc="Rainy day? Nebula comes to you at the curb." />
      </div>

    </div>
  );
}

function Section({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="h-screen flex items-center pl-20 max-w-lg">
            <div>
                <h2 className="text-5xl font-bold mb-6 text-white">{title}</h2>
                <p className="text-xl text-gray-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}