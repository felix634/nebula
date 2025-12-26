import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Component for the labels
const ComponentLabel = ({ 
    title, 
    desc, 
    subDesc, 
    topPosition, 
    width, 
    lineProgress, 
    textOpacity   
}: { 
    title: string, desc: string, subDesc?: string, topPosition: string, width: string, lineProgress: any, textOpacity: any 
}) => {
    
    // Line Width Logic
    const currentWidth = useTransform(lineProgress, [0, 1], ["0px", width]);

    // Dot Visibility: Appears instantly when line starts growing
    const dotOpacity = useTransform(lineProgress, [0, 0.05], [0, 1]);

    return (
        <div 
            className={`absolute right-0 flex items-center z-50 pointer-events-none pr-2 md:pr-0`} 
            style={{ top: topPosition }}
        >
            {/* TEXT CONTAINER */}
            <motion.div 
                style={{ opacity: textOpacity }} 
                className="w-[180px] md:w-[300px] text-right pr-3 md:pr-6"
            >
                <h3 className="text-sm md:text-2xl font-bold text-nebula-blue mb-1 tracking-wider uppercase drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">{title}</h3>
                <p className="text-[10px] md:text-sm text-gray-300 font-medium leading-tight">{desc}</p>
                {subDesc && <p className="hidden md:block text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">{subDesc}</p>}
            </motion.div>
            
            {/* GLOWING LINE */}
            <motion.div 
                className="h-[2px] bg-nebula-blue shadow-[0_0_15px_#00f3ff] relative"
                style={{ 
                    width: currentWidth, 
                    originX: 1 
                }}
            >
                {/* THE DOT */}
                <motion.div 
                    style={{ opacity: dotOpacity }} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_15px_#00f3ff,0_0_30px_#00f3ff]"
                ></motion.div>
            </motion.div>
        </div>
    );
}

export default function ExplodedView() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- TRANSFORMS ---

  // 1. Vertical Spread (Car Parts)
  const yBody = useTransform(scrollYProgress, [0, 0.75], [0, -180]); 
  const yBattery = useTransform(scrollYProgress, [0, 0.75], [0, 0]);
  const yChassis = useTransform(scrollYProgress, [0, 0.75], [0, 180]);

  // 2. Main Title & Full Car Fade OUT (0% - 20%)
  // This finishes BEFORE the lines start growing to avoid clutter.
  const fullCarOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0]);
  
  // 3. Line Growth (20% - 35%)
  // Lines start shooting out right as the title disappears.
  const lineGrowthProgress = useTransform(scrollYProgress, [0.20, 0.35], [0, 1]);
  
  // 4. Text Reveal (35% - 45%)
  // Text fades in after lines are mostly extended.
  const textRevealProgress = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]); 

  return (
    <section ref={containerRef} className="h-[250vh] relative bg-nebula-dark text-white">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center relative h-full px-4">
            
            {/* --- LEFT COLUMN --- */}
            <div className="absolute inset-0 w-full md:relative md:w-1/2 h-full flex flex-col justify-center z-50 pointer-events-none md:pointer-events-auto pr-4 md:pr-20">
                
                {/* Original Title (Linked to fullCarOpacity) */}
                <motion.div style={{ opacity: fullCarOpacity }} className="absolute right-4 md:right-0 text-right pr-0 md:pr-10 top-[15%] md:top-auto">
                    <h2 className="text-4xl md:text-7xl font-bold mb-2 md:mb-6 tracking-tighter">Total<br/>Transparency.</h2>
                    <p className="text-sm md:text-lg text-gray-300 max-w-[200px] md:max-w-md ml-auto leading-relaxed">
                      Aerospace-grade aluminum meets solid-state power.
                    </p>
                </motion.div>

                {/* Component Labels */}
                <div className="absolute inset-y-0 right-0 md:right-[-10px] w-full h-full flex flex-col justify-center relative">
                    <ComponentLabel 
                        title="Carbon Body" 
                        desc="Ultra-lightweight weave structure."
                        subDesc="7000 Series Alloy / Drag Coeff 0.19"
                        topPosition="25%" 
                        width="180px"  
                        lineProgress={lineGrowthProgress} 
                        textOpacity={textRevealProgress}
                    />
                    <ComponentLabel 
                        title="Solid-State Battery" 
                        desc="150kWh cobalt-free architecture."
                        subDesc="Liquid Cooled / 800V Architecture"
                        topPosition="50%"
                        width="240px" 
                        lineProgress={lineGrowthProgress} 
                        textOpacity={textRevealProgress}
                    />
                     <ComponentLabel 
                        title="Active Chassis" 
                        desc="Integrated dual-motor powertrain."
                        subDesc="Air Suspension / Torque Vectoring"
                        topPosition="75%"
                        width="200px" 
                        lineProgress={lineGrowthProgress} 
                        textOpacity={textRevealProgress}
                    />
                </div>
            </div>


            {/* --- RIGHT COLUMN --- */}
            <div className="w-full md:w-1/2 h-full relative flex items-center justify-center md:justify-start pl-0 md:pl-10">
                
                {/* Full Car (Fades OUT) */}
                <motion.img 
                  src="/layers/full-car.png" 
                  alt="Nebula One Assembled"
                  style={{ opacity: fullCarOpacity }}
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-40 pointer-events-none object-contain drop-shadow-2xl"
                />

                {/* Layers (Fade IN logic handled by gap between fullCarOpacity and textReveal) */}
                {/* Note: In this sequential logic, we actually want the layers to appear AS the full car disappears. 
                    So we invert 'fullCarOpacity' for the layers' base visibility. */}
                
                <motion.img 
                  style={{ y: yBody, opacity: useTransform(scrollYProgress, [0, 0.20], [0, 1]) }}
                  src="/layers/body.png" alt="Body Shell"
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-30 object-contain drop-shadow-[0_-20px_30px_rgba(0,0,0,0.5)]" 
                />
                <motion.img 
                  style={{ y: yBattery, opacity: useTransform(scrollYProgress, [0, 0.20], [0, 1]) }}
                  src="/layers/battery.png" alt="Battery Pack"
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-20 object-contain drop-shadow-[0_0_30px_rgba(0,243,255,0.2)]" 
                />
                <motion.img 
                  style={{ y: yChassis, opacity: useTransform(scrollYProgress, [0, 0.20], [0, 1]) }}
                  src="/layers/chassis.png" alt="Chassis Frame"
                  className="absolute w-[90%] md:w-full max-w-[600px] max-h-[50vh] md:max-h-[70vh] z-10 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
                />
            </div>
        </div>

      </div>
    </section>
  );
}