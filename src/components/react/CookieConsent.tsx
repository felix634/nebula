import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the shape of our consent object
type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // Default State: Only necessary is true, others false (Privacy by Default)
  const [preferences, setPreferences] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('nebula-consent-data');
    
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
        // Load their previous preferences into state (optional, if you want to allow re-opening later)
        setPreferences(JSON.parse(savedConsent));
    }
  }, []);

  const saveConsent = (finalPreferences: ConsentState) => {
    // Save the object to local storage
    localStorage.setItem('nebula-consent-data', JSON.stringify(finalPreferences));
    // Save a simple flag that they have interacted
    localStorage.setItem('nebula-consent', 'true');
    
    // Here is where you would trigger your scripts based on the result
    if (finalPreferences.analytics) {
        console.log("Initializing Analytics...");
        // window.gtag(...)
    }
    
    setIsVisible(false);
    setShowConfig(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveConfig = () => {
    saveConsent(preferences);
  };

  // Helper to toggle specific categories
  const togglePreference = (key: keyof ConsentState) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && !showConfig && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[100] w-[90%] md:w-[450px]"
        >
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            
            <div className="flex items-start gap-4 mb-6">
               <div className="p-2 bg-nebula-blue/10 rounded text-nebula-blue shrink-0">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
               </div>
               <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Privacy Protocols</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    We value your privacy. We use cookies to enhance your experience. 
                    "Strictly Necessary" cookies are required for the site to function. 
                    You may choose to allow additional tracking for analytics and marketing.
                  </p>
               </div>
            </div>

            {/* BUTTONS ROW */}
            <div className="flex flex-col md:flex-row gap-3 justify-end">
                <button 
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors border border-transparent hover:border-white/20 rounded"
                >
                  Reject All
                </button>
                <button 
                  onClick={() => setShowConfig(true)}
                  className="px-4 py-2 text-[10px] text-nebula-blue hover:text-white uppercase tracking-widest transition-colors border border-nebula-blue/30 hover:border-nebula-blue rounded"
                >
                  Configure
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-nebula-blue text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors rounded shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                >
                  Accept All
                </button>
            </div>

          </div>
        </motion.div>
      )}

      {/* --- CONFIGURATION MODAL --- */}
      {isVisible && showConfig && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg tracking-wide">Cookie Preferences</h3>
                    <button onClick={() => setShowConfig(false)} className="text-gray-500 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Toggles List */}
                <div className="p-6 space-y-6">
                    
                    {/* Item 1: Necessary */}
                    <div className="flex justify-between items-center opacity-70">
                        <div>
                            <p className="text-white font-bold text-sm">Strictly Necessary</p>
                            <p className="text-gray-500 text-xs mt-1">Required for the website to function.</p>
                        </div>
                        <div className="px-3 py-1 bg-white/10 rounded text-[10px] text-gray-400 font-bold uppercase tracking-widest border border-white/5">
                            Always On
                        </div>
                    </div>

                    {/* Item 2: Analytics */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-white font-bold text-sm">Analytics</p>
                            <p className="text-gray-500 text-xs mt-1">Help us improve by tracking usage.</p>
                        </div>
                        <Toggle 
                            active={preferences.analytics} 
                            onClick={() => togglePreference('analytics')} 
                        />
                    </div>

                    {/* Item 3: Marketing */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-white font-bold text-sm">Marketing</p>
                            <p className="text-gray-500 text-xs mt-1">Personalized offers and ads.</p>
                        </div>
                        <Toggle 
                            active={preferences.marketing} 
                            onClick={() => togglePreference('marketing')} 
                        />
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end gap-3">
                     <button 
                        onClick={handleRejectAll}
                        className="px-4 py-2 text-xs text-gray-400 hover:text-white transition-colors"
                     >
                        Reject All
                     </button>
                     <button 
                        onClick={handleSaveConfig}
                        className="px-6 py-2 bg-nebula-blue text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors"
                     >
                        Save Preferences
                     </button>
                </div>

            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Reusable Toggle Switch Component
const Toggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <div 
        onClick={onClick}
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${active ? 'bg-nebula-blue' : 'bg-gray-700'}`}
    >
        <motion.div 
            layout 
            className={`w-4 h-4 rounded-full shadow-md bg-white`}
            animate={{ x: active ? 24 : 0 }}
        />
    </div>
);

export default CookieConsent;