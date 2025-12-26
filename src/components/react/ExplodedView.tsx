import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Component for the labels
const ComponentLabel = ({ title, desc, subDesc, topPosition, width, opacity }: { title: string, desc: string, subDesc?: string, topPosition: string, width: string, opacity: any }) => (
  <motion.div 
    style={{ opacity: opacity, top: topPosition }} 
    // MOBILE FIX: Added max-w-[50vw] to prevent text from overflowing screen width
    // MOBILE FIX: Added pr-2 to reduce padding on small screens
    className={`absolute right-0 flex items-center z-50 pointer-events-none pr-2 md:pr-0`} 
  >
      {/* Text Container: Smaller width on mobile, Full on Desktop */}
      <div className="w-[180px] md:w-[300px] text-right pr-3 md:pr-6">
          {/* Responsive Text Sizes */}
          <h3 className="text-sm md:text-2xl font-bold text-nebula-blue mb-1 tracking-wider uppercase">{title}</h3>
          <p className="text-[10px] md:text-sm text-gray-300 font-medium leading-tight">{desc}</p>
          {subDesc && <p className="hidden md:block text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">{subDesc}</p>}
      </div>
      
      {/* Glowing Line */}
      <div 
        className="h-[1px] bg-nebula-blue shadow-[0_0_10px_#00f3ff] relative origin-left max-w-[20vw] md:max-w-none"
        style={{ width: width }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-nebula-blue rounded-full shadow-[0_0_8px_#00f3ff]"></div>
      </div>
  </motion.div>
);

export default function ExplodedView() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- TRANSFORMS ---
  const yBody = useTransform(scrollYProgress, [0, 0.75], [0, -180]); 
  const yBattery = useTransform(scrollYProgress, [0, 0.75], [0, 0]);
  const yChassis = useTransform(scrollYProgress, [0, 0.75], [0, 180]);

  const fullCarOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const layersOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]); 

  return (
    <section ref={containerRef} className="h-[250vh] relative bg-nebula-dark text-white">
      
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* MOBILE LAYOUT: flex-col (Stack) vs DESKTOP: flex-row (Side-by-side) */}
        {/* Actually, for the Overlay effect, we keep them mostly overlapping on mobile */}
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center relative h-full px-4">
            
            {/* --- TEXT COLUMN --- */}
            {/* Mobile: absolute inset-0 (Overlays the car) | Desktop: relative width-1/2 */}
            <div className="absolute inset-0 w-full md:relative md:w-1/2 h-full flex flex-col justify-center z-50 pointer-events-none md:pointer-events-auto pr-4 md:pr-20">
                
                {/* 1. Original Title */}
                <motion.div style={{ opacity: fullCarOpacity }} className="absolute right-4 md:right-0 text-right pr-0 md:pr-10 top-[15%] md:top-auto">
                    <h2 className="text-4xl md:text-7xl font-bold mb-2 md:mb-6 tracking-tighter">Total<br/>Transparency.</h2>
                    <p className="text-sm md:text-lg text-gray-300 max-w-[200px] md:max-w-md ml-auto leading-relaxed">
                      Aerospace-grade aluminum meets solid-state power.
                    </p>
                </motion.div>

                {/* 2. Component Labels */}
                <div className="absolute inset-y-0 right-0 md:right-[-10px] w-full h-full flex flex-col justify-center relative">
                    <ComponentLabel 
                        title="Carbon Body" 
                        desc="Ultra-lightweight weave."
                        subDesc="7000 Series Alloy"
                        topPosition="25%" 
                        width="180px"  
                        opacity={layersOpacity} 
                    />
                    <ComponentLabel 
                        title="Solid-State Battery" 
                        desc="150kWh cobalt-free."
                        subDesc="800V Architecture"
                        topPosition="50%"
                        width="240px" 
                        opacity={layersOpacity} 
                    />
                     <ComponentLabel 
                        title="Active Chassis" 
                        desc="Dual-motor powertrain."
                        subDesc="Torque Vectoring"
                        topPosition="75%"
                        width="200px" 
                        opacity={layersOpacity} 
                    />
                </div>
            </div>


            {/* --- CAR COLUMN --- */}
            {/* Mobile: w-full (Centered) | Desktop: w-1/2 */}
            <div className="w-full md:w-1/2 h-full relative flex items-center justify-center md:justify-start pl-0 md:pl-10">
                
                <motion.img 
                  src="/layers/full-car.png" 
                  alt="Nebula One Assembled"
                  style={{ opacity: fullCarOpacity }}
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-40 pointer-events-none object-contain drop-shadow-2xl"
                />

                <motion.img 
                  style={{ y: yBody, opacity: layersOpacity }}
                  src="/layers/body.png" alt="Body Shell"
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-30 object-contain drop-shadow-[0_-20px_30px_rgba(0,0,0,0.5)]" 
                />
                <motion.img 
                  style={{ y: yBattery, opacity: layersOpacity }}
                  src="/layers/battery.png" alt="Battery Pack"
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-20 object-contain drop-shadow-[0_0_30px_rgba(0,243,255,0.2)]" 
                />
                <motion.img 
                  style={{ y: yChassis, opacity: layersOpacity }}
                  src="/layers/chassis.png" alt="Chassis Frame"
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-10 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
                />
            </div>
        </div>

      </div>
    </section>
  );
}