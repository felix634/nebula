import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export default function ChargerGlobe() {
  const globeEl = useRef();

  const arcsData = [
    { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278, color: '#00f3ff' }, // NY to London
    { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503, color: '#00f3ff' }, // London to Tokyo
  ];

  return (
    <div className="h-screen w-full bg-black cursor-move">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={4}
        arcDashAnimateTime={1000}
        backgroundColor="#050505"
      />
      <div className="absolute bottom-10 left-10 pointer-events-none">
         <h1 className="text-5xl font-sans text-nebula-blue">Global Network</h1>
         <p className="text-white">Supercharging available in 42 countries.</p>
      </div>
    </div>
  );
}