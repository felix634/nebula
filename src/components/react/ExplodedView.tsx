import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Component for the labels
const ComponentLabel = ({ title, desc, subDesc, topPosition, width, opacity }: { title: string, desc: string, subDesc?: string, topPosition: string, width: string, opacity: any }) => (
  <motion.div 
    style={{ opacity: opacity, top: topPosition }} 
    className={`absolute right-0 flex items-center z-50 pointer-events-none`} 
  >
      {/* Increased width to 300px to accommodate more text */}
      <div className="w-[300px] text-right pr-6">
          <h3 className="text-xl md:text-2xl font-bold text-nebula-blue mb-1 tracking-wider uppercase">{title}</h3>
          <p className="text-sm text-gray-300 font-medium">{desc}</p>
          {/* New Sub-description for extra detail */}
          {subDesc && <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">{subDesc}</p>}
      </div>
      
      <div 
        className="h-[1px] bg-nebula-blue shadow-[0_0_10px_#00f3ff] relative origin-left"
        style={{ width: width }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-nebula-blue rounded-full shadow-[0_0_8px_#00f3ff]"></div>
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

  // 1. Vertical Spread (Kept large to match your "Top/Bottom" lines)
  const yBody = useTransform(scrollYProgress, [0, 0.75], [0, -180]); 
  const yBattery = useTransform(scrollYProgress, [0, 0.75], [0, 0]);
  const yChassis = useTransform(scrollYProgress, [0, 0.75], [0, 180]);

  // 2. Opacity Logic
  const fullCarOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const layersOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]); 

  return (
    <section ref={containerRef} className="h-[250vh] relative bg-nebula-dark text-white">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="container mx-auto max-w-6xl flex items-center relative h-full px-4">
            
            {/* --- LEFT COLUMN: TEXT --- */}
            {/* Added pr-20 to push the whole text column further LEFT */}
            <div className="w-1/2 h-full relative flex flex-col justify-center z-50 pr-10 md:pr-20">
                
                {/* 1. Original Title */}
                <motion.div style={{ opacity: fullCarOpacity }} className="absolute right-0 text-right pr-4 md:pr-10">
                    <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tighter">Total<br/>Transparency.</h2>
                    <p className="text-sm md:text-lg text-gray-300 max-w-xs md:max-w-md ml-auto leading-relaxed">
                      Aerospace-grade aluminum meets solid-state power. Scroll to deconstruct.
                    </p>
                </motion.div>

                {/* 2. Component Labels */}
                <div className="absolute inset-y-0 right-[-10px] w-full h-full flex flex-col justify-center relative">
                    {/* SPREAD ADJUSTMENTS:
                        Carbon Body: Moved UP to 25% (was 30%)
                        Battery: Kept at 50%
                        Chassis: Moved DOWN to 75% (was 70%)
                        
                        WIDTH ADJUSTMENTS:
                        Increased width values to bridge the new gap since we pushed text left.
                    */}
                    <ComponentLabel 
                        title="Carbon Body" 
                        desc="Ultra-lightweight weave structure."
                        subDesc="7000 Series Alloy / Drag Coeff 0.19"
                        topPosition="25%" 
                        width="100px" 
                        opacity={layersOpacity} 
                    />
                    <ComponentLabel 
                        title="Solid-State Battery" 
                        desc="150kWh cobalt-free architecture."
                        subDesc="Liquid Cooled / 800V Architecture"
                        topPosition="50%"
                        width="160px"
                        opacity={layersOpacity} 
                    />
                     <ComponentLabel 
                        title="Active Chassis" 
                        desc="Integrated dual-motor powertrain."
                        subDesc="Air Suspension / Torque Vectoring"
                        topPosition="75%"
                        width="120px"
                        opacity={layersOpacity} 
                    />
                </div>
            </div>


            {/* --- RIGHT COLUMN: THE CARS --- */}
            <div className="w-1/2 h-full relative flex items-center justify-start pl-2 md:pl-10">
                
                {/* The Full Car */}
                <motion.img 
                  src="/layers/full-car.png" 
                  alt="Nebula One Assembled"
                  style={{ opacity: fullCarOpacity }}
                  className="absolute w-full max-w-[600px] max-h-[70vh] z-40 pointer-events-none object-contain drop-shadow-2xl"
                />

                {/* The Layers */}
                <motion.img 
                  style={{ y: yBody, opacity: layersOpacity }}
                  src="/layers/body.png" alt="Body Shell"
                  className="absolute w-full max-w-[600px] max-h-[70vh] z-30 object-contain drop-shadow-[0_-20px_30px_rgba(0,0,0,0.5)]" 
                />
                <motion.img 
                  style={{ y: yBattery, opacity: layersOpacity }}
                  src="/layers/battery.png" alt="Battery Pack"
                  className="absolute w-full max-w-[600px] max-h-[70vh] z-20 object-contain drop-shadow-[0_0_30px_rgba(0,243,255,0.2)]" 
                />
                <motion.img 
                  style={{ y: yChassis, opacity: layersOpacity }}
                  src="/layers/chassis.png" alt="Chassis Frame"
                  className="absolute w-full max-w-[600px] max-h-[70vh] z-10 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
                />
            </div>
        </div>

      </div>
    </section>
  );
}