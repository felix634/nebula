import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot
} from 'recharts';

const data = [
  { time: '0s', nebula: 0, competitor: 0 },
  { time: '1s', nebula: 45, competitor: 28 },
  { time: '1.9s', nebula: 100, competitor: 55 }, 
  { time: '3s', nebula: 160, competitor: 95 },
  { time: '4s', nebula: 220, competitor: 140 },
  { time: '5s', nebula: 280, competitor: 180 },
];

const PerformanceChart = () => {
  return (
    <div className="w-full h-[500px] bg-white/5 border border-white/10 rounded-xl p-4 md:p-8 relative overflow-hidden backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h3 className="text-3xl font-bold text-white tracking-tight">0-100 km/h Acceleration</h3>
          <p className="text-gray-400 text-sm mt-1 font-mono">TEST CONDITIONS: DRY ASPHALT / 22°C / 98% SOC</p>
        </div>
        <div className="flex gap-6">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-nebula-blue shadow-[0_0_10px_#00f3ff]"></div>
                <span className="text-nebula-blue font-bold text-sm uppercase tracking-wider">Nebula One</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">Competitor</span>
            </div>
        </div>
      </div>

      {/* The Chart */}
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={true} horizontal={true} />
          
          <XAxis 
            dataKey="time" 
            stroke="#666" 
            tick={{ fill: '#666', fontSize: 12, fontFamily: 'monospace' }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#666" 
            tick={{ fill: '#666', fontSize: 12, fontFamily: 'monospace' }} 
            tickLine={false} 
            axisLine={false}
            unit=" km/h"
          />
          
          <Tooltip 
            contentStyle={{ backgroundColor: '#09090b', border: '1px solid #333', borderRadius: '4px' }}
            itemStyle={{ color: '#fff', fontFamily: 'monospace', fontSize: '12px' }}
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
          />

          {/* 1. Competitor Line */}
          <Line 
            type="monotone" 
            dataKey="competitor" 
            stroke="#4b5563" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            dot={false}
            activeDot={{ r: 6, fill: '#4b5563' }}
            isAnimationActive={true}
          />

          {/* 2. THE GLOW LINE (The Fix) */}
          {/* This is a thick, transparent line behind the main one. It renders instantly without glitching. */}
          <Line 
            type="monotone" 
            dataKey="nebula" 
            stroke="#00f3ff" 
            strokeWidth={12} 
            strokeOpacity={0.15}
            dot={false}
            isAnimationActive={true}
          />

          {/* 3. The Main Sharp Line */}
          <Line 
            type="monotone" 
            dataKey="nebula" 
            stroke="#00f3ff" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#000', stroke: '#00f3ff', strokeWidth: 2 }} 
            activeDot={{ r: 6, fill: '#00f3ff', stroke: '#fff' }}
            isAnimationActive={true}
          />

          <ReferenceDot x="1.9s" y={100} r={5} fill="#fff" stroke="none" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;