import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExplodedView() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to Y separation
  const yBody = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yBattery = useTransform(scrollYProgress, [0, 1], [0, 0]); // Stays center
  const yChassis = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-white text-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Layer: Body */}
        <motion.img 
          style={{ y: yBody, opacity }}
          src="/layers/body.png" 
          className="absolute w-[600px] z-30" 
        />
        
        {/* Layer: Battery */}
        <motion.img 
          style={{ y: yBattery, opacity }}
          src="/layers/battery.png" 
          className="absolute w-[600px] z-20" 
        />
        
        {/* Layer: Chassis */}
        <motion.img 
          style={{ y: yChassis, opacity }}
          src="/layers/chassis.png" 
          className="absolute w-[600px] z-10" 
        />
        
        <div className="absolute left-10 top-1/2 -translate-y-1/2">
           <h2 className="text-6xl font-bold mb-4">Total Transparency.</h2>
           <p>Scroll to deconstruct the engineering.</p>
        </div>
      </div>
    </section>
  );
}