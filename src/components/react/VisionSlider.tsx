import React, { useState, useRef, useEffect } from 'react';

const VisionSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage (0-100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Handle Mouse/Touch Move
  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let clientX;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as MouseEvent).clientX;
    }

    // Calculate percentage
    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    
    // Clamp between 0 and 100
    const clampedPos = Math.min(Math.max(position, 0), 100);
    setSliderPosition(clampedPos);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };

  // Global event listeners for smooth dragging outside the div
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging.current) handleMove(e);
    };
    const onUp = () => { isDragging.current = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize group"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* 1. MACHINE VISION LAYER (Background - Full Width) */}
      <div className="absolute inset-0 z-0">
        {/* Since you are photoshopping the frames, this image now contains everything */}
        <img 
          src="/vision-lidar.jpg" 
          alt="Nebula AI Vision" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. HUMAN VISION LAYER (Foreground - Clipped) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          // This cuts the image based on slider position
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
      >
        <img 
          src="/vision-human.jpg" 
          alt="Human Vision" 
          className="w-full h-full object-cover filter brightness-[0.4] blur-[1px]" 
        />
        {/* Dark Rain Overlay for extra mood */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 3. THE SLIDER HANDLE */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_20px_rgba(0,243,255,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* The Circle Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-nebula-blue rounded-full flex items-center justify-center shadow-[0_0_30px_#00f3ff]">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 17h8M6 12h12" />
          </svg>
        </div>
      </div>

      {/* 4. LABELS */}
      <div className="absolute bottom-10 left-10 z-30 pointer-events-none">
        <h3 className="text-white text-sm tracking-[0.4em] font-bold opacity-70">HUMAN DRIVER</h3>
        <p className="text-red-500 text-xs mt-1 font-mono">VISIBILITY: LOW</p>
      </div>

      <div className="absolute bottom-10 right-10 z-30 pointer-events-none text-right">
        <h3 className="text-nebula-blue text-sm tracking-[0.4em] font-bold shadow-black drop-shadow-md">NEBULA AI</h3>
        <p className="text-nebula-blue text-xs mt-1 font-mono">CONFIDENCE: 99.9%</p>
      </div>

    </div>
  );
};

export default VisionSlider;