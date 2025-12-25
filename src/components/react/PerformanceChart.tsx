import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { time: '0s', nebula: 0, gas: 0 },
  { time: '1s', nebula: 30, gas: 15 },
  { time: '2s', nebula: 60, gas: 35 },
  { time: '3s', nebula: 85, gas: 55 },
  { time: '4s', nebula: 100, gas: 70 }, // 0-100 in ~4s
  { time: '5s', nebula: 120, gas: 90 },
];

export default function PerformanceChart() {
  const [hoverVal, setHoverVal] = useState(0);

  return (
    <div className="w-full max-w-4xl bg-nebula-dark/50 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-light">0-100 km/h Acceleration</h3>
        <div className="flex gap-4 text-sm">
            <span className="text-nebula-blue">● Nebula One</span>
            <span className="text-gray-500">● Competitor</span>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
                contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                itemStyle={{ color: '#fff' }}
            />
            <Line 
                type="monotone" 
                dataKey="nebula" 
                stroke="#00f3ff" 
                strokeWidth={3} 
                dot={{ r: 6, fill: '#00f3ff' }}
                activeDot={{ r: 8 }}
            />
            <Line 
                type="monotone" 
                dataKey="gas" 
                stroke="#444" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-between text-center">
          <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Top Speed</p>
              <p className="text-3xl font-bold">250 <span className="text-base text-nebula-blue">mph</span></p>
          </div>
          <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">0-60 mph</p>
              <p className="text-3xl font-bold">1.9 <span className="text-base text-nebula-blue">sec</span></p>
          </div>
          <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Range</p>
              <p className="text-3xl font-bold">520 <span className="text-base text-nebula-blue">mi</span></p>
          </div>
      </div>
    </div>
  );
}