import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExplodedView() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Movement Transforms (Separating the layers)
  // At scroll 0, y is 0 (merged). At scroll 1, they move apart.
  const yBody = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const yBattery = useTransform(scrollYProgress, [0, 1], [0, 0]); // Stays centered
  const yChassis = useTransform(scrollYProgress, [0, 1], [0, 250]);

  // 2. Opacity Transforms (The Cross-Fade)
  // "Full Car" is visible at start (0) and fades out quickly by 15% scroll.
  const fullCarOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // "Layers" are hidden at start (to hide seams) and fade in as the full car disappears.
  const layersOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-white text-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* --- THE FULL CAR (Perfect State) --- */}
        {/* Z-Index 40 ensures it sits on top of everything else when visible */}
        <motion.img 
          src="/layers/full-car.png" 
          alt="Nebula One Assembled"
          style={{ opacity: fullCarOpacity }}
          className="absolute w-[600px] z-40 pointer-events-none object-contain"
        />

        {/* --- THE EXPLODED LAYERS --- */}
        
        {/* Layer: Body Shell (Moves Up) */}
        <motion.img 
          style={{ y: yBody, opacity: layersOpacity }}
          src="/layers/body.png" 
          alt="Body Shell"
          className="absolute w-[600px] z-30 object-contain" 
        />
        
        {/* Layer: Battery Pack (Stays Center) */}
        <motion.img 
          style={{ y: yBattery, opacity: layersOpacity }}
          src="/layers/battery.png" 
          alt="Battery Pack"
          className="absolute w-[600px] z-20 object-contain" 
        />
        
        {/* Layer: Chassis (Moves Down) */}
        <motion.img 
          style={{ y: yChassis, opacity: layersOpacity }}
          src="/layers/chassis.png" 
          alt="Chassis Frame"
          className="absolute w-[600px] z-10 object-contain" 
        />
        
        {/* Text Overlay */}
        <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-50 pointer-events-none mix-blend-difference text-white md:text-black md:mix-blend-normal">
           <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">Total Transparency.</h2>
           <p className="text-xl opacity-80 max-w-md">
             Scroll to deconstruct the engineering. Aerospace-grade aluminum meets solid-state power.
           </p>
        </div>

      </div>
    </section>
  );
}