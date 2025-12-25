import { useEffect, useRef, useState } from 'react';

export default function LidarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverInfo, setHoverInfo] = useState<{x: number, y: number, text: string} | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let scanLineY = 0;
    
    // Fake object data
    const objects = [
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.6, w: 100, h: 200, label: 'PEDESTRIAN' },
      { x: window.innerWidth * 0.6, y: window.innerHeight * 0.65, w: 300, h: 150, label: 'VEHICLE' },
    ];

    const animate = () => {
      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Scan Line
      scanLineY += 5;
      if (scanLineY > canvas.height) scanLineY = 0;
      
      ctx.beginPath();
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 2;
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(canvas.width, scanLineY);
      ctx.stroke();

      // Draw Bounding Boxes
      objects.forEach(obj => {
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
        
        // Connecting lines to corners for "tech" look
        ctx.beginPath();
        ctx.fillStyle = '#00f3ff';
        ctx.arc(obj.x, obj.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Label
        ctx.font = '12px "Exo 2"';
        ctx.fillStyle = '#00f3ff';
        ctx.fillText(`${obj.label} [99.8%]`, obj.x, obj.y - 10);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}