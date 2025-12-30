import React, { useRef, useState } from 'react';

// Define the shape of the data prop
interface SpecItem {
  label: string;
  value: string;
  desc: string;
}

interface GlowingCardProps {
  category: string;
  items: SpecItem[];
}

const GlowingCard: React.FC<GlowingCardProps> = ({ category, items }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-colors duration-500 group"
    >
      {/* THE DYNAMIC GLOW EFFECT 
        This div sits behind the content. Its background is a radial gradient
        positioned precisely where the mouse cursor is via the inline styles.
      */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 243, 255, 0.15), transparent 40%)`,
        }}
      />

      {/* THE BORDER GLOW 
        A slightly sharper gradient to highlight the edges near the cursor.
      */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0, 243, 255, 0.4), transparent 40%)`,
          // Use a mask to only show this gradient on the border area
          maskImage: 'linear-gradient(#fff,#fff), linear-gradient(#fff,#fff)',
          maskClip: 'content-box, border-box',
          maskComposite: 'xor',
           // @ts-ignore (WebkitMaskComposite works but TS complains sometimes)
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* CARD CONTENT (Relative z-index to sit above the glow) */}
      <div className="relative z-10">
        {/* Card Header */}
        <h3 className="text-nebula-blue font-bold tracking-widest text-sm mb-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-nebula-blue shadow-[0_0_8px_#00f3ff] transition-transform duration-500 group-hover:scale-125"></span>
          {category}
        </h3>

        {/* Specs List */}
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-gray-300 text-sm font-bold uppercase tracking-wide">
                  {item.label}
                </span>
                <span className="text-xl font-bold text-white font-mono">
                  {item.value}
                </span>
              </div>
              {/* Description Line */}
              <p className="text-gray-500 text-xs leading-relaxed font-mono group-hover:text-gray-400 transition-colors">
                {item.desc}
              </p>

              {/* Subtle divider */}
              <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-white/5 group-hover:bg-white/20 transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlowingCard;