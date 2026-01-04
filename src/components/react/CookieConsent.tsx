import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem('nebula-consent');
    if (!consent) {
      // Small delay so it doesn't pop up instantly on load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nebula-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[100] w-[90%] md:w-[400px]"
        >
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            
            <div className="flex items-start gap-4">
               <div className="p-2 bg-nebula-blue/10 rounded text-nebula-blue">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
               </div>
               <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">System Protocols</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    We use cookies to optimize vehicle telemetry and website performance. 
                    Continuing implies consent to our digital infrastructure.
                  </p>
               </div>
            </div>

            <div className="flex gap-2 mt-6 justify-end">
                <button 
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-2 text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Decline
                </button>
                <button 
                  onClick={handleAccept}
                  className="px-6 py-2 bg-nebula-blue text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Acknowledge
                </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;