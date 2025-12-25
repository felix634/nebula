import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Configurator() {
  const [color, setColor] = useState('Midnight Black');
  const [price, setPrice] = useState(89000);

  const colors = [
    { name: 'Midnight Black', hex: '#000' },
    { name: 'Nebula Blue', hex: '#00f3ff' },
    { name: 'Mars Red', hex: '#ff3333' }
  ];

  return (
    <div className="h-screen w-full flex">
      <div className="w-1/2">
        {/* Car placeholder - The Astro PersistentCar fills this visual space */}
      </div>
      
      <div className="w-1/2 bg-nebula-dark/90 backdrop-blur-md p-12 flex flex-col justify-center border-l border-white/10">
        <h2 className="text-4xl font-light mb-8 font-sans">Configure Your One.</h2>
        
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Select Paint</p>
          <div className="flex gap-4">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${color === c.name ? 'border-nebula-blue scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <p className="mt-2 text-xl">{color}</p>
        </div>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex justify-between items-end">
             <div>
               <p className="text-gray-400">Total Price</p>
               <p className="text-3xl font-bold">${price.toLocaleString()}</p>
             </div>
             <button className="bg-nebula-blue text-black px-8 py-3 font-bold uppercase hover:bg-white transition-colors">
               Order Now
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}