import React, { useState, useEffect } from 'react';

interface SiteLoadingProps {
  onComplete: () => void;
}

const SiteLoading: React.FC<SiteLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);

    // Arrêter le chargement après 4 secondes
    const completeTimer = setTimeout(() => {
      setProgress(100);
      // Petit délai pour voir la completion puis appeler onComplete
      setTimeout(() => {
        onComplete();
      }, 200);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative">
      <div className="text-center">
        {/* Logo W simple avec stroke border */}
        <div className="relative mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-lg animate-stroke-draw">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
        </div>

        {/* Slogan */}
        <div className="mb-6">
          <p className="text-lg text-gray-700 italic font-light">
            On code sous le soleil de Nice
          </p>
        </div>

        {/* Barre de progression */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLoading;