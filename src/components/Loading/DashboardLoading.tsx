import React, { useState, useEffect } from 'react';
import { User, Shield, BarChart3, Settings } from 'lucide-react';

interface DashboardLoadingProps {
  onComplete?: () => void;
}

const DashboardLoading: React.FC<DashboardLoadingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: Shield, text: 'Vérification sécurité' },
    { icon: User, text: 'Chargement profil' },
    { icon: BarChart3, text: 'Préparation données' },
    { icon: Settings, text: 'Finalisation' }
  ];

  useEffect(() => {
    // Durée totale : 4 secondes
    const totalDuration = 3000;
    const stepDuration = totalDuration / steps.length; // 2000ms par étape
    
    // Progression des étapes
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    // Progression fluide de la barre
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        return 100;
      });
    }, totalDuration / 100); // 40ms par %

    // Fermeture après la durée totale
    const completeTimer = setTimeout(() => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      if (onComplete) {
        onComplete();
      }
    }, totalDuration);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, steps.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto">
        {/* Logo W simple */}
        <div className="relative mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-md animate-pulse">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          
          {/* Indicateur de statut */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
        </div>

        {/* Titre */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h2>
          <p className="text-gray-600 text-sm italic">Chargement en cours...</p>
        </div>

        {/* Étapes de chargement */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isStepCompleted = index < currentStep;
            
            return (
              <div 
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                  isActive ? 'bg-blue-50 border-2 border-blue-200 scale-105' : 
                  isStepCompleted ? 'bg-green-50 border-2 border-green-200' : 
                  'bg-white border-2 border-gray-200 opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-blue-100 animate-pulse' : 
                  isStepCompleted ? 'bg-green-100' : 
                  'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-blue-600' : 
                    isStepCompleted ? 'text-green-600' : 
                    'text-gray-400'
                  }`} />
                </div>
                
                <span className={`text-base font-medium flex-1 text-left ${
                  isActive ? 'text-blue-700' : 
                  isStepCompleted ? 'text-green-700' : 
                  'text-gray-500'
                }`}>
                  {step.text}
                </span>
                
                {/* Indicateur de statut */}
                <div className="flex items-center">
                  {isActive && (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isStepCompleted && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Barre de progression */}
        <div className="w-full mb-4">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {progress}% - Étape {currentStep + 1}/{steps.length}
          </div>
        </div>

        {/* Message de fin */}
        {progress === 100 && (
          <div className="text-green-600 text-sm font-medium animate-bounce">
            ✅ Chargement terminé !
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLoading;